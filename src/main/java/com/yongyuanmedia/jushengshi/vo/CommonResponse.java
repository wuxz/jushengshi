package com.yongyuanmedia.jushengshi.vo;

import java.util.HashMap;
import java.util.Map;

public class CommonResponse {
	int code;

	String msg;

	Map<String, Object> data = new HashMap<>();

	int security;

	public int getCode() {
		return code;
	}

	public Map<String, Object> getData() {
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

	public void setData(Map<String, Object> data) {
		this.data = data;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public void setSecurity(int security) {
		this.security = security;
	}
}
