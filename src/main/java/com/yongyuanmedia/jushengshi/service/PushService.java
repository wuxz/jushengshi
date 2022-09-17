/**
 *
 */
package com.yongyuanmedia.jushengshi.service;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang.StringUtils;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.yongyuanmedia.jushengshi.util.Utils;

class PushResponse {
	private int status_code;

	private String reason;

	public String getReason() {
		return reason;
	}

	public int getStatus_code() {
		return status_code;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public void setStatus_code(int status_code) {
		this.status_code = status_code;
	}
}

/**
 * @author wuxz
 *
 *         Push服务
 */
@Service
public class PushService {
	static final Logger logger = LoggerFactory.getLogger(PushService.class);

	private final HttpClient httpClient;

	private final ObjectMapper jsonMapper = new ObjectMapper();

	@Value("${push.url}")
	private String pushUrl;

	@Value("${push.appKey:j9FRBFwFUKl8yJO}")
	private String appKey;

	public PushService() {
		final PoolingHttpClientConnectionManager cm = new PoolingHttpClientConnectionManager();
		cm.setMaxTotal(50);
		httpClient = HttpClients.custom().setConnectionManager(cm).build();
	}

	/**
	 * 给指定的用户下发通知。<br>
	 *
	 * @param userIds
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
	 * @param badge
	 */
	public void sendMessage(Set<String> userIds, int type, String title,
			String content, int dataId, String extra, int badge) {
		if ((userIds == null) || (userIds.size() == 0)) {
			return;
		}

		final String sevicePath = "/push/message";
		URI pushUri = null;
		try {
			pushUri = new URIBuilder(pushUrl).setPath(sevicePath).build();
		} catch (final URISyntaxException e) {
		}

		final HttpPost post = new HttpPost(pushUri);
		final RequestConfig requestConfig = RequestConfig.custom()
				.setSocketTimeout(2000).setConnectTimeout(2000).build();//设置请求和传输超时时间
		post.setConfig(requestConfig);

		final List<NameValuePair> paramsList = new ArrayList<NameValuePair>();
		paramsList.add(new BasicNameValuePair("app_key", appKey));

		if (userIds != null) {
			paramsList.add(new BasicNameValuePair("user_ids",
					Utils.collection2String(userIds, ",")));
		}

		paramsList.add(new BasicNameValuePair("push_type",
				"" + 1/*Commons.PushType.ACTIVEDEVICE*/));
		UrlEncodedFormEntity postEntity = null;
		String msgText = "";
		try {
			final ObjectMapper jsonMapper = new ObjectMapper();
			final Map<String, Object> msg = new HashMap<>();
			if (StringUtils.isNotEmpty(title)) {
				msg.put("title", title);
			}
			if (StringUtils.isNotEmpty(content)) {
				msg.put("content", content);
			}
			if (StringUtils.isNotEmpty(extra)) {
				msg.put("extra", extra);
			}

			msg.put("badge", badge);
			msg.put("notificationType", 0);

			msgText = jsonMapper.writeValueAsString(msg);
			paramsList.add(new BasicNameValuePair("msg", msgText));

			postEntity = new UrlEncodedFormEntity(paramsList, "UTF-8");
		} catch (final Exception e) {
			logger.error("", e);
		}

		post.setEntity(postEntity);
		try {
			final PushResponse pushResponse = httpClient.execute(post,
					httpResponse -> {
						final int httpStatus = httpResponse.getStatusLine()
								.getStatusCode();
						PushResponse response1 = null;
						if ((httpStatus >= 200) && (httpStatus <= 300)) {
							final String respText = EntityUtils.toString(
									httpResponse.getEntity(), "UTF-8");
							response1 = jsonMapper.readValue(respText,
									PushResponse.class);
						} else {
							response1 = new PushResponse();
							response1.setStatus_code(httpStatus);
						}

						return response1;
					});

			if (pushResponse.getStatus_code() == 0) {
				logger.debug("push ok, userIds:{}, msg:{}", userIds.toString(),
						msgText);
			} else {
				logger.debug(
						"push failed, userIds:{}, msg:{}, code:{}, reason:{}",
						userIds.toString(), msgText,
						pushResponse.getStatus_code(),
						pushResponse.getReason());
			}
		} catch (final Exception e) {
			logger.error("push failed, pushUrl:{}", pushUrl, e.toString());
			logger.error("", e);
		} finally {
			post.releaseConnection();
		}
	}
}
