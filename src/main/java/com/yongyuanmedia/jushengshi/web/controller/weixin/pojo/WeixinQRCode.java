package com.yongyuanmedia.jushengshi.web.controller.weixin.pojo;

/**
 * ��ʱ��ά����Ϣ
 * 
 * @author liufeng
 * @date 2013-11-10
 */
public class WeixinQRCode {
	// ��ά�����Чʱ�䣬��λΪ�룬��󲻳���1800
	private int expireSeconds;

	// ��ȡ�Ķ�ά��ticket
	private String ticket;

	public int getExpireSeconds() {
		return expireSeconds;
	}

	public String getTicket() {
		return ticket;
	}

	public void setExpireSeconds(int expireSeconds) {
		this.expireSeconds = expireSeconds;
	}

	public void setTicket(String ticket) {
		this.ticket = ticket;
	}
}
