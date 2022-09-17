package com.yongyuanmedia.jushengshi.web.controller.weixin.pojo;

/**
 * ΢���û��Ļ�����Ϣ
 *
 * @author liufeng
 * @date 2013-11-09
 */
public class WeixinUserInfo {
	// �û����ڳ���
	private String city;

	// �û����ڹ���
	private String country;

	// �û�ͷ��
	private String headImgUrl;

	// �û������ԣ���������Ϊzh_CN
	private String language;

	// �ǳ�
	private String nickname;

	// �û��ı�ʶ
	private String openId;

	// �û�����ʡ��
	private String province;

	// �û����Ա�1�����ԣ�2��Ů�ԣ�0��δ֪��
	private int sex;

	// ��ע״̬��1�ǹ�ע��0��δ��ע����δ��עʱ��ȡ����������Ϣ
	private int subscribe;

	// �û���עʱ�䣬Ϊʱ���������û�����ι�ע����ȡ����עʱ��
	private Long subscribeTime;

	private String unionId;

	public String getCity() {
		return city;
	}

	public String getCountry() {
		return country;
	}

	public String getHeadImgUrl() {
		return headImgUrl;
	}

	public String getLanguage() {
		return language;
	}

	public String getNickname() {
		return nickname;
	}

	public String getOpenId() {
		return openId;
	}

	public String getProvince() {
		return province;
	}

	public int getSex() {
		return sex;
	}

	public int getSubscribe() {
		return subscribe;
	}

	public Long getSubscribeTime() {
		return subscribeTime;
	}

	public String getUnionId() {
		return unionId;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public void setHeadImgUrl(String headImgUrl) {
		this.headImgUrl = headImgUrl;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public void setOpenId(String openId) {
		this.openId = openId;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public void setSex(int sex) {
		this.sex = sex;
	}

	public void setSubscribe(int subscribe) {
		this.subscribe = subscribe;
	}

	public void setSubscribeTime(Long subscribeTime) {
		this.subscribeTime = subscribeTime;
	}

	public void setUnionId(String unionId) {
		this.unionId = unionId;
	}
}
