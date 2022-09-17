package com.yongyuanmedia.jushengshi.web.controller.weixin.pojo;

import java.util.List;

/**
 * ��ע�û��б�
 * 
 * @author liufeng
 * @date 2013-11-09
 */
public class WeixinUserList {
	// ��ȡ��OpenID����
	private int count;

	// ��ȡ�б�ĺ�һ���û���OPENID
	private String nextOpenId;

	// OpenID�б�
	private List<String> openIdList;

	// �����˺ŵ��ܹ�ע�û���
	private int total;

	public int getCount() {
		return count;
	}

	public String getNextOpenId() {
		return nextOpenId;
	}

	public List<String> getOpenIdList() {
		return openIdList;
	}

	public int getTotal() {
		return total;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public void setNextOpenId(String nextOpenId) {
		this.nextOpenId = nextOpenId;
	}

	public void setOpenIdList(List<String> openIdList) {
		this.openIdList = openIdList;
	}

	public void setTotal(int total) {
		this.total = total;
	}
}
