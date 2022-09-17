/**
 *
 */
package com.yongyuanmedia.jushengshi.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yongyuanmedia.jushengshi.db.entities.UserAccount;
import com.yongyuanmedia.jushengshi.util.Constants;
import com.yongyuanmedia.jushengshi.vo.PushResultItem;

/**
 * @author wuxz
 *
 */
@Service
@Transactional
public class MessageService {
	static final Logger logger = LoggerFactory.getLogger(MessageService.class);

	/**
	 * 根据指定的消息类型，获得类型描述。
	 *
	 * @param type
	 * @return
	 */
	public static String getMessageTypeDescription(int type) {
		switch (type) {
			case Constants.MESSAGE_TYPE_COMMON:
				return "消息";

			case Constants.MESSAGE_TYPE_NOTICE:
				return "通知";

			case Constants.MESSAGE_TYPE_TONGGAO:
				return "通告";

			default:
				return "";
		}
	}

	@Autowired
	UserService userService;

	@Autowired
	SMSService smsService;

	@Autowired
	PushService pushService;

	@Autowired
	WeiXinService wxService;

	/**
	 * 给指定的用户下发通知。<br>
	 * 根据用户使用服务的方式，决定通过何种方式（PushServer、微信、短信）下发。 <br>
	 * 如果用户72小时内未使用过APP，则认为用户已经卸载APP。
	 *
	 * @param userIds
	 *            用户ID的列表
	 * @param mobiles
	 *            通过短信下发的手机号的列表
	 * @param type
	 *            通知类型：0 普通消息 1 通知 2 通告
	 * @param title
	 *            标题
	 * @param content
	 *            正文
	 * @param dataId
	 *            type为0时为消息ID，为1时为通知ID，2时为通告ID
	 * @param extra
	 * @param badge
	 * @return
	 */
	public Map<String, Object> sendMessage(List<String> userIds,
			List<String> mobiles, int type, String title, String content,
			int dataId, String extra, int badge) {
		final Map<String, Object> resultData = new HashMap<>();
		if ((mobiles.size() == 0) && (userIds.size() == 0)) {
			return resultData;
		}

		logger.debug(
				"sendMessage, userIds:{}, mobiles:{} size:{}, type:{}, title:{}, content:{}, dataId:{}, extra:{}",
				userIds.toString(), mobiles.toString(),
				mobiles == null ? 0 : mobiles.size(), type, title, content,
				dataId, extra);

		// 使用PushServer的用户ID列表
		final Set<String> pushUserIds = new HashSet<String>(userIds.size());

		// 使用微信的用户ID列表
		final Map<String, String> wxUserId2WxUids = new HashMap<>(
				userIds.size());

		// 使用短信r的用户ID列表
		final Map<String, String> smsUserId2Mobiles = new HashMap<>(
				userIds.size());

		final Map<String, Integer> pushResults = new HashMap<>();

		try {
			if (userIds.size() > 0) {
				final List<UserAccount> uas = userService
						.find4PushByUserIds(userIds);
				for (final UserAccount ua : uas) {
					if (Constants.USER_SOURCE_MOBILE.equals(ua.getSource())
							&& (Constants.USER_LOGIN_AGENT_ANDROID
									.equalsIgnoreCase(ua.getLoginDeviceAgent())
									|| Constants.USER_LOGIN_AGENT_IPHONE
											.equalsIgnoreCase(
													ua.getLoginDeviceAgent()))
							&& (ua.getLoginTime() != null)
							&& ((System.currentTimeMillis()
									- ua.getLoginTime().getTime()) < (72 * 3600
											* 1000l))) {
						// 需要满足的条件：SOURCE是手机，登录设备是手机，登录时间是最近几天。才认为是APP推送可达的记录。
						pushUserIds.add(ua.getBinduserid());

						pushResults.put(ua.getBinduserid(), 1);
					} else if (Constants.USER_SOURCE_WEIXINSRV
							.equals(ua.getSource())
							&& StringUtils.isNotEmpty(ua.getAccount())) {
						logger.info(
								"userId:{}, source:{}, loginDeviceAgent:{}, loginTime:{} can not use push service, using weixin",
								ua.getUserid(), ua.getSource(),
								ua.getLoginDeviceAgent(), ua.getLoginTime());

						wxUserId2WxUids.put(ua.getBinduserid(),
								ua.getAccount());

						pushResults.put(ua.getBinduserid(), 2);
					} else {
						logger.info(
								"userId:{} can not use push service, using sms",
								ua.getUserid());

						smsUserId2Mobiles.put(ua.getBinduserid(),
								ua.getBindmobile());

						if (!pushResults.containsKey(ua.getBinduserid())) {
							pushResults.put(ua.getBinduserid(), 3);
						}
					}
				}

				for (final String userId : wxUserId2WxUids.keySet()) {
					// 能够微信推送的，即使强制要求发短信，也不发。
					final String mobile = smsUserId2Mobiles.get(userId);
					mobiles.remove(mobile);

					// 所有可以推送微信的userId，都不再推送短信。
					smsUserId2Mobiles.remove(userId);
				}

				for (final String userId : pushUserIds) {
					// 能够APP推送的，就不再做微信推送。
					wxUserId2WxUids.remove(userId);
				}
			}

			final Set<String> smsMobiles = new HashSet<>(mobiles.size());
			smsMobiles.addAll(mobiles);
			smsMobiles.addAll(smsUserId2Mobiles.values());

			final Set<String> wxUserIds = new HashSet<>(
					smsUserId2Mobiles.size());
			wxUserIds.addAll(wxUserId2WxUids.values());

			pushService.sendMessage(pushUserIds, type, title, content, dataId,
					extra, badge);
			wxService.sendMessage(wxUserIds, type, title, content, dataId,
					extra);
			smsService.sendMessage(smsMobiles, type, title, content, dataId);

			final List<PushResultItem> items = new ArrayList<>(
					pushResults.size());
			for (final Map.Entry<String, Integer> entry : pushResults
					.entrySet()) {
				final PushResultItem item = new PushResultItem();
				item.setUserId(entry.getKey());
				item.setPushType(entry.getValue());
				items.add(item);
			}

			resultData.put("pushResult", items.toArray());
		} catch (final Exception e) {
			logger.error("sendMessage failed.", e);
		}

		return resultData;
	}
}
