package com.yongyuanmedia.jushengshi.web.controller.weixin.pojo;

import java.util.List;

/**
 * ͨ����ҳ��Ȩ��ȡ���û���Ϣ
 * 
 * @author liufeng
 * @date 2013-11-09
 */
public class SNSUserInfo {
	// ����
	private String city;

	// ����
	private String country;

	// �û�ͷ������
	private String headImgUrl;

	// �û��ǳ�
	private String nickname;

	// �û���ʶ
	private String openId;

	// �û���Ȩ��Ϣ
	private List<String> privilegeList;

	// ʡ��
	private String province;

	// �Ա�1�����ԣ�2��Ů�ԣ�0��δ֪��
	private int sex;

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

	public String getNickname() {
		return nickname;
	}

	public String getOpenId() {
		return openId;
	}

	public List<String> getPrivilegeList() {
		return privilegeList;
	}

	public String getProvince() {
		return province;
	}

	public int getSex() {
		return sex;
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

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public void setOpenId(String openId) {
		this.openId = openId;
	}

	public void setPrivilegeList(List<String> privilegeList) {
		this.privilegeList = privilegeList;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public void setSex(int sex) {
		this.sex = sex;
	}

	public void setUnionId(String unionId) {
		this.unionId = unionId;
	}
}
