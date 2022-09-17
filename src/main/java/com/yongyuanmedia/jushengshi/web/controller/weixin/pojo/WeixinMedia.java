package com.yongyuanmedia.jushengshi.web.controller.weixin.pojo;

/**
 * ý���ļ���Ϣ
 * 
 * @author liufeng
 * @date 2013-11-09
 */
public class WeixinMedia {
	// ý���ļ��ϴ���ʱ��
	private int createdAt;

	// ý���ļ���ʶ������ͼ��ý���ļ���ʶ
	private String mediaId;

	// ý���ļ�����
	private String type;

	public int getCreatedAt() {
		return createdAt;
	}

	public String getMediaId() {
		return mediaId;
	}

	public String getType() {
		return type;
	}

	public void setCreatedAt(int createdAt) {
		this.createdAt = createdAt;
	}

	public void setMediaId(String mediaId) {
		this.mediaId = mediaId;
	}

	public void setType(String type) {
		this.type = type;
	}
}
