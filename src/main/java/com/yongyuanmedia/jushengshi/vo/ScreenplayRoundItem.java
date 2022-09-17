/**
 *
 */
package com.yongyuanmedia.jushengshi.vo;

/**
 * @author wuxiangzheng
 *
 */
public class ScreenplayRoundItem {
	int id;

	String staffid;

	int mode;

	String round;

	String scene;

	short side;

	short day_night;

	int status;

	int diff_p_status;

	String address;

	int version;

	String nowcontent;

	String precontent;

	int isRelease;

	String mainRole;

	String actor;

	String summary;

	/**
	 * 上一场的ID
	 */
	int prev;

	/**
	 * 下一场的ID
	 */
	int next;

	public String getActor() {
		return actor;
	}

	public String getAddress() {
		return address;
	}

	public short getDay_night() {
		return day_night;
	}

	public int getDiff_p_status() {
		return diff_p_status;
	}

	public int getId() {
		return id;
	}

	public int getIsRelease() {
		return isRelease;
	}

	public String getMainRole() {
		return mainRole;
	}

	public int getMode() {
		return mode;
	}

	public int getNext() {
		return next;
	}

	public String getNowcontent() {
		return nowcontent;
	}

	public String getPrecontent() {
		return precontent;
	}

	public int getPrev() {
		return prev;
	}

	public String getRound() {
		return round;
	}

	public String getScene() {
		return scene;
	}

	public short getSide() {
		return side;
	}

	public String getStaffid() {
		return staffid;
	}

	public int getStatus() {
		return status;
	}

	public String getSummary() {
		return summary;
	}

	public int getVersion() {
		return version;
	}

	public void setActor(String actor) {
		this.actor = actor;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public void setDay_night(short day_night) {
		this.day_night = day_night;
	}

	public void setDiff_p_status(int diff_p_status) {
		this.diff_p_status = diff_p_status;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setIsRelease(int isRelease) {
		this.isRelease = isRelease;
	}

	public void setMainRole(String mainRole) {
		this.mainRole = mainRole;
	}

	public void setMode(int mode) {
		this.mode = mode;
	}

	public void setNext(int next) {
		this.next = next;
	}

	public void setNowcontent(String nowcontent) {
		this.nowcontent = nowcontent;
	}

	public void setPrecontent(String precontent) {
		this.precontent = precontent;
	}

	public void setPrev(int prev) {
		this.prev = prev;
	}

	public void setRound(String round) {
		this.round = round;
	}

	public void setScene(String scene) {
		this.scene = scene;
	}

	public void setSide(short side) {
		this.side = side;
	}

	public void setStaffid(String staffid) {
		this.staffid = staffid;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	public void setVersion(int version) {
		this.version = version;
	}
}
