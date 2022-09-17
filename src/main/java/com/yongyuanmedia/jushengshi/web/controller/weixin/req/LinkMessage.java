package com.yongyuanmedia.jushengshi.web.controller.weixin.req;

/**
 * ������Ϣ
 * 
 * @author liufeng
 * @date 2013-09-11
 */
public class LinkMessage extends BaseMessage {
	// ��Ϣ����
	private String Description;

	// ��Ϣ����
	private String Title;

	// ��Ϣ����
	private String Url;

	public String getDescription() {
		return Description;
	}

	public String getTitle() {
		return Title;
	}

	public String getUrl() {
		return Url;
	}

	public void setDescription(String description) {
		Description = description;
	}

	public void setTitle(String title) {
		Title = title;
	}

	public void setUrl(String url) {
		Url = url;
	}
}
