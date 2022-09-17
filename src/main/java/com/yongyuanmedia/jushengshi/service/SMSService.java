/**
 *
 */
package com.yongyuanmedia.jushengshi.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.apache.cxf.common.util.StringUtils;
import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.yongyuanmedia.jushengshi.service.sms.httpclient.SDKHttpClient;
import com.yongyuanmedia.jushengshi.util.Constants;
import com.yongyuanmedia.jushengshi.util.Utils;

/**
 * @author wuxz
 *
 *         短信服务
 */
@Service
public class SMSService {
	public static String accesskey, secretkey, urlTemplate, yanZhengMaTemplate;

	static final Logger logger = LoggerFactory.getLogger(SMSService.class);

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
	 */
	public void sendMessage(Set<String> phoneNumbers, int type, String title,
			String content, int dataId) {
		if ((phoneNumbers == null)
				|| (phoneNumbers.isEmpty() || (phoneNumbers.size() == 0))) {
			return;
		}

		logger.debug(
				"sendMessage, phoneNumber:[{}], type:{}, title:{} content:{}",
				phoneNumbers.toString(), type, title, content);

		sendSMSByJss(Utils.collection2String(phoneNumbers, ","),
				"【剧省事儿】" + content + "。查看详情，请下载剧省事儿APP：http://t.cn/R5CJAYd");
	}

	private boolean sendSMSByJss(String phoneNumber, String content) {
		if (StringUtils.isEmpty(phoneNumber)) {
			return true;
		}

		final String sn = "8SDK-EMY-6699-RGWSR";// 软件序列号,请通过亿美销售人员获取
		final String password = "198361";// 密码,请通过亿美销售人员获取
		final String baseUrl = "http://hprpt2.eucp.b2m.cn:8080/sdkproxy/";

		try {
			final String code = "888";
			final long seqId = System.currentTimeMillis();
			final List<NameValuePair> paramsList = new ArrayList<>();
			paramsList.add(new BasicNameValuePair("cdkey", sn));
			paramsList.add(new BasicNameValuePair("password", password));
			paramsList.add(new BasicNameValuePair("phone", phoneNumber));
			paramsList.add(new BasicNameValuePair("message", content));
			paramsList.add(new BasicNameValuePair("addserial", code));
			paramsList.add(new BasicNameValuePair("seqid", "" + seqId));

			final String url = baseUrl + "sendsms.action";
			final String response = SDKHttpClient.sendSMS(url, paramsList);

			logger.debug("sendSMS, phoneNumber:{}, content:{}, returns:{}",
					phoneNumber, content, response);

			return (response != null) && response.contains("<error>0</error>");
		} catch (final Exception e) {
			logger.error("", e);

			return false;
		}
	}

	public void sendYanZhengMa(String phoneNumber, String yanZhengMa)
			throws Exception {
		yanZhengMa = String.format(yanZhengMaTemplate, yanZhengMa);

		if (!sendSMSByJss(phoneNumber, yanZhengMa)) {
			throw new JssServiceException(Constants.STATUS_EXCEPTION,
					"发送验证码失败，请稍后重试");
		}
	}
}
