package com.yongyuanmedia.jushengshi.service.sms.httpclient;

import java.io.UnsupportedEncodingException;
import java.util.List;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HttpClientUtil {
	private static class ClientUtilInstance {
		private static final HttpClientUtil ClientUtil = new HttpClientUtil();
	}

	static final Logger logger = LoggerFactory.getLogger(HttpClientUtil.class);

	private static HttpClient httpClient = null;

	public static HttpClientUtil getInstance() {
		return ClientUtilInstance.ClientUtil;
	}

	public static void main(String[] args) {
		//		final String url = "http://esms.etonenet.com/sms/mt?spid=3060&sppassword=hbkj3060&das=8618611178949&command=MULTI_MT_REQUEST&sm=a1beccd4b1a6a1bf20cda8b5c0bdd3c8ebcdeab3c9a3a1&dc=15";
		// System.out.println(doGetRequest(url));
	}

	// 构造单例
	private HttpClientUtil() {
		final PoolingHttpClientConnectionManager cm = new PoolingHttpClientConnectionManager();
		cm.setMaxTotal(50);
		cm.setDefaultConnectionConfig(cm.getDefaultConnectionConfig());
		httpClient = HttpClients.custom().setConnectionManager(cm).build();
	}

	/**
	 * 发送http GET请求，并返回http响应字符串
	 *
	 * @param urlstr
	 *            完整的请求url字符串
	 * @return
	 */
	public String doGetRequest(String urlstr) {
		final HttpGet httpget = new HttpGet(urlstr);
		final RequestConfig requestConfig = RequestConfig.custom()
				.setSocketTimeout(2000).setConnectTimeout(2000).build();//设置请求和传输超时时间
		httpget.setConfig(requestConfig);

		try {
			final HttpResponse response = httpClient.execute(httpget);
			final int status = response.getStatusLine().getStatusCode();
			if (status != 200) {
				logger.error("http get error, url:{}, status:{}", urlstr,
						status);

				return "";
			}

			return EntityUtils.toString(response.getEntity(), "UTF-8");
		} catch (final Throwable e) {
			logger.error("http get error.", e);
			return "";
		} finally {
			httpget.releaseConnection();
		}
	}

	public String doPostRequest(String url, List<NameValuePair> paramsList)
			throws Exception {
		final CloseableHttpClient httpclient = HttpClients.createDefault();
		final HttpPost httpPost = new HttpPost(url);
		final RequestConfig requestConfig = RequestConfig.custom()
				.setSocketTimeout(10000).setConnectTimeout(2000).build();//设置请求和传输超时时间
		httpPost.setConfig(requestConfig);

		UrlEncodedFormEntity postEntity = null;
		try {
			postEntity = new UrlEncodedFormEntity(paramsList, "UTF-8");
		} catch (final UnsupportedEncodingException e) {
		}
		httpPost.setEntity(postEntity);
		final HttpResponse targetResponse = httpclient.execute(httpPost);
		final int status = targetResponse.getStatusLine().getStatusCode();
		if (status != 200) {
			throw new Exception("http post failed. status:{" + status + "}");
		}

		final String entity = EntityUtils.toString(targetResponse.getEntity(),
				"UTF-8");

		return entity;
	}
}
