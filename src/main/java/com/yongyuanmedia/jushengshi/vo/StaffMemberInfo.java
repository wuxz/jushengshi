package com.yongyuanmedia.jushengshi.vo;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

public class StaffMemberInfo {
	/**
	 * staff_member表的ID
	 */
	int staffMemberId;

	/**
	 * 用户ID
	 */
	String userId;

	/**
	 * 真实姓名
	 */
	String realName;

	/**
	 * 性别 1男，2女，3未填
	 */
	int gender;

	/**
	 * 手机号
	 */
	String mobile;

	/**
	 * 手机状态
	 */
	String mobileStatus;

	/**
	 * 职务的列表
	 */
	String[] jobs;

	/**
	 * 分组的列表
	 */
	String[] teams;

	/**
	 * 身份证号
	 */
	String idNumber;

	/**
	 * 地址
	 */
	String address;

	/**
	 * 银行账号
	 */
	String bankNumber;

	/**
	 * 开户银行
	 */
	String sourceBank;

	/**
	 * 是否是创建者 1否 2是
	 */
	int isCreate;

	/**
	 * 是否管理员 1否 2是
	 *
	 */
	int isAdmin;

	/**
	 * 是否部门长 1否，2是
	 */
	int isLeader;

	/**
	 * 是否是司机 1否，2是
	 */
	int isDriver;

	/**
	 * 在组状态：1离组 2在组 3 拒绝 4 邀请中 5删除
	 */
	int inStatus;

	/**
	 * 是否允许看剧本 1否，2是
	 */
	int canViewScreenplay;

	/**
	 * 车型
	 */
	String carType;

	/**
	 * 车牌号
	 */
	String carNumber;

	/**
	 * 是否允许看分场表 1否，2是
	 */
	int canViewRound;

	/**
	 * 是否允许看期表 1否，2是
	 */
	int canViewSchedule;

	/**
	 * 进组时间
	 */
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
	Date inDate;

	/**
	 * 离组时间
	 */
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
	Date leaveDate;

	/**
	 * 角色的列表
	 */
	String[] roles;

	public String getAddress() {
		return address;
	}

	public String getBankNumber() {
		return bankNumber;
	}

	public int getCanViewRound() {
		return canViewRound;
	}

	public int getCanViewSchedule() {
		return canViewSchedule;
	}

	public int getCanViewScreenplay() {
		return canViewScreenplay;
	}

	public String getCarNumber() {
		return carNumber;
	}

	public String getCarType() {
		return carType;
	}

	public int getGender() {
		return gender;
	}

	public String getIdNumber() {
		return idNumber;
	}

	public Date getInDate() {
		return inDate;
	}

	public int getInStatus() {
		return inStatus;
	}

	public int getIsAdmin() {
		return isAdmin;
	}

	public int getIsCreate() {
		return isCreate;
	}

	public int getIsDriver() {
		return isDriver;
	}

	public int getIsLeader() {
		return isLeader;
	}

	public String[] getJobs() {
		return jobs;
	}

	public Date getLeaveDate() {
		return leaveDate;
	}

	public String getMobile() {
		return mobile;
	}

	public String getMobileStatus() {
		return mobileStatus;
	}

	public String getRealName() {
		return realName;
	}

	public String[] getRoles() {
		return roles;
	}

	public String getSourceBank() {
		return sourceBank;
	}

	public int getStaffMemberId() {
		return staffMemberId;
	}

	public String[] getTeams() {
		return teams;
	}

	public String getUserId() {
		return userId;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public void setBankNumber(String bankNumber) {
		this.bankNumber = bankNumber;
	}

	public void setCanViewRound(int canViewRound) {
		this.canViewRound = canViewRound;
	}

	public void setCanViewSchedule(int canViewSchedule) {
		this.canViewSchedule = canViewSchedule;
	}

	public void setCanViewScreenplay(int canViewScreenplay) {
		this.canViewScreenplay = canViewScreenplay;
	}

	public void setCarNumber(String carNumber) {
		this.carNumber = carNumber;
	}

	public void setCarType(String carType) {
		this.carType = carType;
	}

	public void setGender(int gender) {
		this.gender = gender;
	}

	public void setIdNumber(String idNumber) {
		this.idNumber = idNumber;
	}

	public void setInDate(Date inDate) {
		this.inDate = inDate;
	}

	public void setInStatus(int inStatus) {
		this.inStatus = inStatus;
	}

	public void setIsAdmin(int isAdmin) {
		this.isAdmin = isAdmin;
	}

	public void setIsCreate(int isCreate) {
		this.isCreate = isCreate;
	}

	public void setIsDriver(int isDriver) {
		this.isDriver = isDriver;
	}

	public void setIsLeader(int isLeader) {
		this.isLeader = isLeader;
	}

	public void setJobs(String[] jobs) {
		this.jobs = jobs;
	}

	public void setLeaveDate(Date leaveDate) {
		this.leaveDate = leaveDate;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public void setMobileStatus(String mobileStatus) {
		this.mobileStatus = mobileStatus;
	}

	public void setRealName(String realName) {
		this.realName = realName;
	}

	public void setRoles(String[] roles) {
		this.roles = roles;
	}

	public void setSourceBank(String sourceBank) {
		this.sourceBank = sourceBank;
	}

	public void setStaffMemberId(int staffMemberId) {
		this.staffMemberId = staffMemberId;
	}

	public void setTeams(String[] teams) {
		this.teams = teams;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}
}
