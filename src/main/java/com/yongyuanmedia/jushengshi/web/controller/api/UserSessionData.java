package com.yongyuanmedia.jushengshi.web.controller.api;

import java.io.Serializable;

/**
 * 用户登录后的信息
 *
 * @author wuxiangzheng
 *
 */
public class UserSessionData implements Serializable {
	/**
	 *
	 */
	private static final long serialVersionUID = 8561526824716508837L;

	private String userId;

	private String realname;

	private String mobile;

	private String token;

	private String openId;

	public UserSessionData() {

	}

	public String getMobile() {
		return mobile;
	}

	public String getOpenId() {
		return openId;
	}

	public String getRealname() {
		return realname;
	}

	public String getToken() {
		return token;
	}

	public String getUserId() {
		return userId;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public void setOpenId(String openId) {
		this.openId = openId;
	}

	public void setRealname(String realname) {
		this.realname = realname;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}
}
