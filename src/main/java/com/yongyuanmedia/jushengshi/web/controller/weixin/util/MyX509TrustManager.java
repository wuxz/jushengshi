package com.yongyuanmedia.jushengshi.web.controller.weixin.util;

import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;

import javax.net.ssl.X509TrustManager;

/**
 * ���ι�����
 * 
 * @author liufeng
 * @date 2013-04-10
 */
public class MyX509TrustManager implements X509TrustManager {

	// ���ͻ���֤��
	@Override
	public void checkClientTrusted(X509Certificate[] chain, String authType)
			throws CertificateException {
	}

	// ����������֤��
	@Override
	public void checkServerTrusted(X509Certificate[] chain, String authType)
			throws CertificateException {
	}

	// ���������ε�X509֤������
	@Override
	public X509Certificate[] getAcceptedIssuers() {
		return null;
	}
}
