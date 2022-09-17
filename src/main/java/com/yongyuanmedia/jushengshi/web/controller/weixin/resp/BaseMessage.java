package com.yongyuanmedia.jushengshi.web.controller.weixin.resp;

/**
 * ��Ϣ���ࣨ�����ʺ� -> ��ͨ�û���
 * 
 * @author liufeng
 * @date 2013-09-11
 */
public class BaseMessage {
	// ��Ϣ����ʱ�� �����ͣ�
	private long CreateTime;

	// ������΢�ź�
	private String FromUserName;

	// ��Ϣ����
	private String MsgType;

	// ���շ��ʺţ��յ���OpenID��
	private String ToUserName;

	public BaseMessage() {
		CreateTime = System.currentTimeMillis();
	}

	public long getCreateTime() {
		return CreateTime;
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
