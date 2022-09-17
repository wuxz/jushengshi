package com.yongyuanmedia.jushengshi.web.controller.weixin.resp;

/**
 * �ı���Ϣ
 * 
 * @author liufeng
 * @date 2013-09-11
 */
public class TextMessage extends BaseMessage {
	// �ظ�����Ϣ����
	private String Content;

	public TextMessage() {
		setMsgType("text");
	}

	public String getContent() {
		return Content;
	}

	public void setContent(String content) {
		Content = content;
	}
}
