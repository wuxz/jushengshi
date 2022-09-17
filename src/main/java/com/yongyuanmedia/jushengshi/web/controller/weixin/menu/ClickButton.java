package com.yongyuanmedia.jushengshi.web.controller.weixin.menu;

/**
 * click���͵İ�ť
 * 
 * @author liufeng
 * @date 2013-10-14
 */
public class ClickButton extends Button {
	private String key;

	private String type;

	public String getKey() {
		return key;
	}

	public String getType() {
		return type;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public void setType(String type) {
		this.type = type;
	}
}