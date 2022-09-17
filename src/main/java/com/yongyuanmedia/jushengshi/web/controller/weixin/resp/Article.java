package com.yongyuanmedia.jushengshi.web.controller.weixin.resp;

/**
 * ͼ��model
 * 
 * @author liufeng
 * @date 2013-09-11
 */
public class Article {
	// ͼ����Ϣ����
	private String Description;

	// ͼƬ���ӣ�֧��JPG��PNG��ʽ���Ϻõ�Ч��Ϊ��ͼ640*320��Сͼ80*80
	private String PicUrl;

	// ͼ����Ϣ����
	private String Title;

	// ���ͼ����Ϣ��ת����
	private String Url;

	public String getDescription() {
		return null == Description ? "" : Description;
	}

	public String getPicUrl() {
		return null == PicUrl ? "" : PicUrl;
	}

	public String getTitle() {
		return Title;
	}

	public String getUrl() {
		return null == Url ? "" : Url;
	}

	public void setDescription(String description) {
		Description = description;
	}

	public void setPicUrl(String picUrl) {
		PicUrl = picUrl;
	}

	public void setTitle(String title) {
		Title = title;
	}

	public void setUrl(String url) {
		Url = url;
	}
}
