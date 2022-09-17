package com.yongyuanmedia.jushengshi.vo;

public class PushResultItem {
	String userId;

	int pushType;

	public int getPushType() {
		return pushType;
	}

	public String getUserId() {
		return userId;
	}

	public void setPushType(int pushType) {
		this.pushType = pushType;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}
}
