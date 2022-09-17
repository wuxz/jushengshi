/**
 *
 */
package com.yongyuanmedia.jushengshi.service;

import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.LinkedBlockingQueue;

import org.apache.cxf.common.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.yongyuanmedia.jushengshi.db.dao.WeiXinAccessTokenDao;
import com.yongyuanmedia.jushengshi.db.entities.WeiXinAccessToken;
import com.yongyuanmedia.jushengshi.util.AccessTokenHolder;
import com.yongyuanmedia.jushengshi.util.Constants;
import com.yongyuanmedia.jushengshi.web.controller.weixin.AdvancedUtil;
import com.yongyuanmedia.jushengshi.web.controller.weixin.pojo.SNSUserInfo;
import com.yongyuanmedia.jushengshi.web.controller.weixin.util.CommonUtil;

import net.sf.json.JSONObject;

/**
 * @author wuxz
 *
 */
@Service
@Transactional
public class WeiXinService {
	class GeneralTask extends NotifyTask {
		String openid;

		String title;

		String content;

		int type;

		int dataId;

		String extra;

		GeneralTask(String openid, int type, String title, String content,
				int dataId, String extra) {
			this.content = content;
			this.dataId = dataId;
			this.openid = openid;
			this.title = title;
			this.type = type;
			this.extra = extra;
		}
	}

	class Notify4User {
		private ValuePair first = new ValuePair();

		private ValuePair keyword1 = new ValuePair();

		private ValuePair keyword2 = new ValuePair();

		private ValuePair remark = new ValuePair();

		public ValuePair getFirst() {
			return first;
		}

		public ValuePair getKeyword1() {
			return keyword1;
		}

		public ValuePair getKeyword2() {
			return keyword2;
		}

		public ValuePair getRemark() {
			return remark;
		}

		public void setFirst(ValuePair first) {
			this.first = first;
		}

		public void setKeyword1(ValuePair keyword1) {
			this.keyword1 = keyword1;
		}

		public void setKeyword2(ValuePair keyword2) {
			this.keyword2 = keyword2;
		}

		public void setRemark(ValuePair remark) {
			this.remark = remark;
		}
	}

	abstract class NotifyTask {
	}

	class SenderThread extends Thread {
		@Override
		public void run() {
			while (true) {
				try {
					final NotifyTask task = tasks.take();

					if (task instanceof GeneralTask) {
						final GeneralTask gt = (GeneralTask) task;
						sendMessage2User(gt.openid, gt.type, gt.title,
								gt.content, gt.dataId, gt.extra);

						logger.debug("sent 1 message, openid:{}", gt.openid);
					}
				} catch (final Throwable e) {
					logger.error("SenderThread error", e);
				}
			}
		}
	}

	class TemplateMessage {
		private Object data;

		private String template_id;

		private String topcolor = "#FF0000";

		private String touser;

		private String url;

		public Object getData() {
			return data;
		}

		public String getTemplate_id() {
			return template_id;
		}

		public String getTopcolor() {
			return topcolor;
		}

		public String getTouser() {
			return touser;
		}

		public String getUrl() {
			return url;
		}

		public void setData(Object data) {
			this.data = data;
		}

		public void setTemplate_id(String template_id) {
			this.template_id = template_id;
		}

		public void setTopcolor(String topcolor) {
			this.topcolor = topcolor;
		}

		public void setTouser(String touser) {
			this.touser = touser;
		}

		public void setUrl(String url) {
			this.url = url;
		}
	}

	class ValuePair {
		private String color = "#173177";

		private String value;

		public String getColor() {
			return color;
		}

		public String getValue() {
			return value;
		}

		public void setColor(String color) {
			this.color = color;
		}

		public void setValue(String value) {
			this.value = value;
		}
	}

	static final Logger logger = LoggerFactory.getLogger(WeiXinService.class);

	static SenderThread sender;

	static LinkedBlockingQueue<NotifyTask> tasks = new LinkedBlockingQueue<>();

	static WeiXinAccessToken token4Srv;

	private final ThreadLocal<Integer> resendTimes = new ThreadLocal<Integer>() {
		@Override
		public Integer initialValue() {
			return 0;
		}
	};

	@Autowired
	WeiXinAccessTokenDao wxatDao;

	public WeiXinService() {
		if (sender == null) {
			sender = new SenderThread();
			sender.start();
		}
	}

	void addTask(NotifyTask task) {
		tasks.add(task);
	}

	public SNSUserInfo getSNSUserInfo(String accessToken, String openId) {
		return AdvancedUtil.getSNSUserInfo(accessToken, openId);
	}

	/**
	 * @return
	 */
	public synchronized String getToken() {
		if (token4Srv == null) {
			token4Srv = wxatDao.findOne(1);
		}

		if (token4Srv.getExpireTime().getTime() < System.currentTimeMillis()) {
			refreshToken();
		}

		return token4Srv.getToken();
	}

	private void refreshToken() {
		token4Srv = null;

		String requestUrl = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=SECRET";
		requestUrl = requestUrl.replace("APPID", AccessTokenHolder.appId);
		requestUrl = requestUrl.replace("SECRET", AccessTokenHolder.secret);

		final JSONObject jsonObject = CommonUtil.httpsRequest(requestUrl, "GET",
				null);
		if (null != jsonObject) {
			try {
				final String tokenData = jsonObject.getString("access_token");
				final int expiresIn = jsonObject.getInt("expires_in");

				token4Srv = wxatDao.findOne(1);

				token4Srv.setToken(tokenData);
				token4Srv.setExpireTime(new Date(System.currentTimeMillis()
						+ ((expiresIn - 60) * 1000)));

				token4Srv = wxatDao.save(token4Srv);

				logger.debug("got new token, token:{}", token4Srv.getToken());
			} catch (final Throwable e) {
				final int errorCode = jsonObject.getInt("errcode");
				final String errorMsg = jsonObject.getString("errmsg");
				logger.error("获取网页授权凭证失败 errcode:{} errmsg:{}", errorCode,
						errorMsg);
			}
		}
	}

	/**
	 * 给指定的用户下发通知。<br>
	 *
	 * @param openIds
	 *            用户ID的列表
	 * @param type
	 *            通知类型：0 普通消息 1 通知 2 通告
	 * @param title
	 *            标题
	 * @param content
	 *            正文
	 * @param dataId
	 *            type为0时为消息ID，为1时为通知ID，2时为通告ID
	 * @param extra
	 *            附加数据
	 */
	public void sendMessage(Set<String> openIds, int type, String title,
			String content, int dataId, String extra) {
		if ((openIds == null) || (openIds.size() == 0)) {
			return;
		}

		for (final String openId : openIds) {
			if (StringUtils.isEmpty(openId)) {
				continue;
			}
			sendMessage(openId, type, title, content, dataId, extra);
		}
	}

	/**
	 * 通过微信服务号，向用户发送消息。
	 *
	 * @param openid
	 * @param type
	 * @param title
	 * @param content
	 * @param dataId
	 */
	public void sendMessage(String openid, int type, String title,
			String content, int dataId, String extra) {
		tasks.add(new GeneralTask(openid, type, title, content, dataId, extra));
	}

	@SuppressWarnings("unchecked")
	private void sendMessage2User(String openid, int type, String title,
			String content, int dataId, String extra) {
		try {
			final ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
			objectMapper.configure(
					SerializationFeature.ORDER_MAP_ENTRIES_BY_KEYS, true);
			objectMapper.configure(
					SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
			objectMapper.configure(
					SerializationFeature.WRITE_DATE_TIMESTAMPS_AS_NANOSECONDS,
					false);
			objectMapper
					.setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));

			final TemplateMessage message = new TemplateMessage();
			message.setTemplate_id(
					"c-VSskpb84pvhCvciCvy83dXaHUp84oqHYI6kdb8Ky4");
			if (type == Constants.MESSAGE_TYPE_TONGGAO) {
				final ObjectMapper jsonMapper = new ObjectMapper();
				final Map<String, Object> extraObj = jsonMapper.readValue(extra,
						Map.class);
				if (extraObj.get("msg_type").toString().equals("6")) {
					final String msgId = extraObj.get("msg_id").toString();
					final String staffId = extraObj.get("staff_id").toString();
					final String state = URLEncoder.encode("tong_gao?tongGaoId="
							+ msgId + "&staffId=" + staffId, "UTF-8");

					message.setUrl(
							"https://open.weixin.qq.com/connect/oauth2/authorize?appid="
									+ AccessTokenHolder.appId
									+ "&redirect_uri=http%3A%2F%2F"
									+ "service.jushengshier.com%2Fweixin%2Fcallback&response_type=code&scope=snsapi_base&state="
									+ state + "#wechat_redirect");
				}
			} else {
				final ObjectMapper jsonMapper = new ObjectMapper();
				final Map<String, Object> extraObj = jsonMapper.readValue(extra,
						Map.class);
				//				String staffId = "";
				if (extraObj.get("msg_type").toString().equals("1")) {
					//					staffId = extraObj.get("staff_id").toString();
					final String state = URLEncoder.encode("invite_list",
							"UTF-8");
					message.setUrl(
							"https://open.weixin.qq.com/connect/oauth2/authorize?appid="
									+ AccessTokenHolder.appId
									+ "&redirect_uri=http%3A%2F%2F"
									+ "service.jushengshier.com%2Fweixin%2Fcallback&response_type=code&scope=snsapi_base&state="
									+ state + "#wechat_redirect");
				}
			}

			final Notify4User data = new Notify4User();
			data.getFirst().setValue("您好，您有新的消息");
			data.getKeyword1().setValue(title);
			data.getKeyword2()
					.setValue(MessageService.getMessageTypeDescription(type));
			data.getRemark().setValue(content);
			message.setData(data);

			message.setTouser(openid);

			final String json = objectMapper.writeValueAsString(message);

			JSONObject jsonObject = sendMessageByWxSrv(json);
			logger.debug("senMessage2User, openid:{}, content:{}, result:{}",
					openid, json, jsonObject.toString());
			if (jsonObject.getInt("errcode") == 40001) {
				if (resendTimes.get().intValue() == 0) {
					resendTimes.set(resendTimes.get().intValue() + 1);
					refreshToken();
					jsonObject = sendMessageByWxSrv(json);
					logger.debug(
							"retry senMessage2User, openid:{}, content:{}, result:{}",
							openid, json, jsonObject.toString());
				}
			}

			resendTimes.set(0);

		} catch (final Throwable e) {
			logger.error("sendDingDanNotification error. ", e);
		}
	}

	private JSONObject sendMessageByWxSrv(final String json) {
		String requestUrl = "https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=ACCESS_TOKEN";
		requestUrl = requestUrl.replace("ACCESS_TOKEN", getToken());
		final JSONObject jsonObject = CommonUtil.httpsRequest(requestUrl,
				"POST", json);
		return jsonObject;
	}
}
