package com.yongyuanmedia.jushengshi.web.controller.weixin.req;

/**
 * ������Ϣ���ࣨ��ͨ�û� -> �����ʺţ�
 * 
 * @author liufeng
 * @date 2013-09-11
 */
public class BaseMessage {
	// ��Ϣ����ʱ�� �����ͣ�
	private long CreateTime;

	// ���ͷ��ʺţ�һ��OpenID��
	private String FromUserName;

	// ��Ϣid��64λ����
	private long MsgId;

	// ��Ϣ����
	private String MsgType;

	// ������΢�ź�
	private String ToUserName;

	public long getCreateTime() {
		return CreateTime;
	}

	public String getFromUserName() {
		return FromUserName;
	}

	public long getMsgId() {
		return MsgId;
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

	public void setFromUserName(String fromUserName) {
		FromUserName = fromUserName;
	}

	public void setMsgId(long msgId) {
		MsgId = msgId;
	}

	public void setMsgType(String msgType) {
		MsgType = msgType;
	}

	public void setToUserName(String toUserName) {
		ToUserName = toUserName;
	}
}
