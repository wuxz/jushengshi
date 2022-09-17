package com.yongyuanmedia.jushengshi.web.controller.weixin.pojo;

/**
 * ƾ֤
 * 
 * @author liufeng
 * @date 2013-10-17
 */
public class Token {
	// �ӿڷ���ƾ֤
	private String accessToken;

	// ƾ֤��Ч�ڣ���λ����
	private int expiresIn;

	public String getAccessToken() {
		return accessToken;
	}

	public int getExpiresIn() {
		return expiresIn;
	}

	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}

	public void setExpiresIn(int expiresIn) {
		this.expiresIn = expiresIn;
	}
}