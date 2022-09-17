package com.yongyuanmedia.jushengshi.web.controller.weixin.event;

/**
 * �¼�����
 * 
 * @author liufeng
 * @date 2013-11-02
 */
public class BaseEvent {
	// ��Ϣ����ʱ�� �����ͣ�
	private long CreateTime;

	// �¼�����
	private String Event;

	// ���ͷ��ʺţ�һ��OpenID��
	private String FromUserName;

	// ��Ϣ����
	private String MsgType;

	// ������΢�ź�
	private String ToUserName;

	public long getCreateTime() {
		return CreateTime;
	}

	public String getEvent() {
		return Event;
	}

	public String getFromUserName() {
		return FromUserName;
	}

	public String getMsgType() {
		return MsgType;
	}

	public String getToUserName() {
		return ToUserName;
	}

	public void setCreateTime(long createTime) {
		CreateTime = createTime;
	}

	public void setEvent(String event) {
		Event = event;
	}

	public void setFromUserName(String fromUserName) {
		FromUserName = fromUserName;
	}

	public void setMsgType(String msgType) {
		MsgType = msgType;
	}

	public void setToUserName(String toUserName) {
		ToUserName = toUserName;
	}
}
