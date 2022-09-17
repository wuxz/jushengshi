package com.yongyuanmedia.jushengshi.vo;

import java.util.Map;

import com.fasterxml.jackson.annotation.JsonProperty;

public class JuBenParseItem {
	@JsonProperty("ID")
	String id;

	@JsonProperty("Address")
	String address;

	@JsonProperty("NType")
	String nType;

	@JsonProperty("NeiWai")
	String neiWai;

	@JsonProperty("Users")
	Map<String, Integer> users;

	@JsonProperty("NText")
	String nText;

	@JsonProperty("RealUsers")
	String realUsers;

	@JsonProperty("UsersString")
	String usersString;

	@JsonProperty("SYM")
	String summary;

	@JsonProperty("KeyWord")
	String[] keyword;

	public String getAddress() {
		return address;
	}

	public String getId() {
		return id;
	}

	public String[] getKeyword() {
		return keyword;
	}

	public String getNeiWai() {
		return neiWai;
	}

	public String getnText() {
		return nText;
	}

	public String getnType() {
		return nType;
	}

	public String getRealUsers() {
		return realUsers;
	}

	public String getSummary() {
		return summary;
	}

	public Map<String, Integer> getUsers() {
		return users;
	}

	public String getUsersString() {
		return usersString;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public void setId(String id) {
		this.id = id;
	}

	public void setKeyword(String[] keyword) {
		this.keyword = keyword;
	}

	public void setNeiWai(String neiWai) {
		this.neiWai = neiWai;
	}

	public void setnText(String nText) {
		this.nText = nText;
	}

	public void setnType(String nType) {
		this.nType = nType;
	}

	public void setRealUsers(String realUsers) {
		this.realUsers = realUsers;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	public void setUsers(Map<String, Integer> users) {
		this.users = users;
	}

	public void setUsersString(String usersString) {
		this.usersString = usersString;
	}
}
