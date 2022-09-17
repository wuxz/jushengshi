package com.yongyuanmedia.jushengshi.web.controller.weixin.pojo;

/**
 * ��ҳ��Ȩ��Ϣ
 * 
 * @author liufeng
 * @date 2013-11-09
 */
public class WeixinOauth2Token {
	// ��ҳ��Ȩ�ӿڵ���ƾ֤
	private String accessToken;

	// ƾ֤��Чʱ��
	private int expiresIn;

	// �û���ʶ
	private String openId;

	// ����ˢ��ƾ֤
	private String refreshToken;

	// �û���Ȩ������
	private String scope;

	public String getAccessToken() {
		return accessToken;
	}

	public int getExpiresIn() {
		return expiresIn;
	}

	public String getOpenId() {
		return openId;
	}

	public String getRefreshToken() {
		return refreshToken;
	}

	public String getScope() {
		return scope;
	}

	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}

	public void setExpiresIn(int expiresIn) {
		this.expiresIn = expiresIn;
	}

	public void setOpenId(String openId) {
		this.openId = openId;
	}

	public void setRefreshToken(String refreshToken) {
		this.refreshToken = refreshToken;
	}

	public void setScope(String scope) {
		this.scope = scope;
	}
}
