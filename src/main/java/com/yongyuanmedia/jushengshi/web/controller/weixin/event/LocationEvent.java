package com.yongyuanmedia.jushengshi.web.controller.weixin.event;

/**
 * �ϱ�����λ���¼�
 * 
 * @author liufeng
 * @date 2013-11-02
 */
public class LocationEvent extends BaseEvent {
	// ����λ��γ��
	private String Latitude;

	// ����λ�þ���
	private String Longitude;

	// ����λ�þ���
	private String Precision;

	public String getLatitude() {
		return Latitude;
	}

	public String getLongitude() {
		return Longitude;
	}

	public String getPrecision() {
		return Precision;
	}

	public void setLatitude(String latitude) {
		Latitude = latitude;
	}

	public void setLongitude(String longitude) {
		Longitude = longitude;
	}

	public void setPrecision(String precision) {
		Precision = precision;
	}
}
