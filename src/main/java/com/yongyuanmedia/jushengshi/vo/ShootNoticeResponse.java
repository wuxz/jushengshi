package com.yongyuanmedia.jushengshi.vo;

public class ShootNoticeResponse {
	int code;

	String msg;

	Object data;

	int security;

	public int getCode() {
		return code;
	}

	public Object getData() {
		return data;
	}

	public String getMsg() {
		return msg;
	}

	public int getSecurity() {
		return security;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public void setSecurity(int security) {
		this.security = security;
	}
}
