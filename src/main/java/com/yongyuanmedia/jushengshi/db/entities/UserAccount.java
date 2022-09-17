package com.yongyuanmedia.jushengshi.db.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * The persistent class for the user_account database table.
 *
 */
@Entity
@Table(name = "user_account")
@NamedQuery(name = "UserAccount.findAll", query = "SELECT u FROM UserAccount u")
public class UserAccount implements Serializable {
	private static final long serialVersionUID = 1L;

	private int id;

	private String account;

	private String appid;

	private String bindmobile;

	private Date bindtime;

	private String binduserid;

	private String loginAppVersion;

	private String loginDeviceAgent;

	private String loginDeviceChannel;

	private String loginDeviceId;

	private String loginDeviceType;

	private String loginDeviceVersion;

	private Date loginTime;

	private String passwd;

	private String regAppVersion;

	private String regDeviceAgent;

	private String regDeviceChannel;

	private String regDeviceId;

	private String regDeviceType;

	private String regDeviceVersion;

	private Date regTime;

	private String source;

	private short status;

	private String userid;

	public UserAccount() {
	}

	@Column(nullable = false, length = 100)
	public String getAccount() {
		return this.account;
	}

	@Column(nullable = false, length = 30)
	public String getAppid() {
		return this.appid;
	}

	@Column(nullable = false, length = 30)
	public String getBindmobile() {
		return this.bindmobile;
	}

	@Temporal(TemporalType.TIMESTAMP)
	public Date getBindtime() {
		return this.bindtime;
	}

	@Column(nullable = false, length = 50)
	public String getBinduserid() {
		return this.binduserid;
	}

	@Id
	@Column(unique = true, nullable = false)
	public int getId() {
		return this.id;
	}

	@Column(name = "login_app_version", nullable = false, length = 30)
	public String getLoginAppVersion() {
		return this.loginAppVersion;
	}

	@Column(name = "login_device_agent", nullable = false, length = 50)
	public String getLoginDeviceAgent() {
		return this.loginDeviceAgent;
	}

	@Column(name = "login_device_channel", nullable = false, length = 50)
	public String getLoginDeviceChannel() {
		return this.loginDeviceChannel;
	}

	@Column(name = "login_device_id", nullable = false, length = 50)
	public String getLoginDeviceId() {
		return this.loginDeviceId;
	}

	@Column(name = "login_device_type", nullable = false, length = 50)
	public String getLoginDeviceType() {
		return this.loginDeviceType;
	}

	@Column(name = "login_device_version", nullable = false, length = 30)
	public String getLoginDeviceVersion() {
		return this.loginDeviceVersion;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "login_time")
	public Date getLoginTime() {
		return this.loginTime;
	}

	@Column(nullable = false, length = 100)
	public String getPasswd() {
		return this.passwd;
	}

	@Column(name = "reg_app_version", nullable = false, length = 30)
	public String getRegAppVersion() {
		return this.regAppVersion;
	}

	@Column(name = "reg_device_agent", nullable = false, length = 50)
	public String getRegDeviceAgent() {
		return this.regDeviceAgent;
	}

	@Column(name = "reg_device_channel", nullable = false, length = 50)
	public String getRegDeviceChannel() {
		return this.regDeviceChannel;
	}

	@Column(name = "reg_device_id", nullable = false, length = 50)
	public String getRegDeviceId() {
		return this.regDeviceId;
	}

	@Column(name = "reg_device_type", nullable = false, length = 50)
	public String getRegDeviceType() {
		return this.regDeviceType;
	}

	@Column(name = "reg_device_version", nullable = false, length = 30)
	public String getRegDeviceVersion() {
		return this.regDeviceVersion;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "reg_time")
	public Date getRegTime() {
		return this.regTime;
	}

	@Column(nullable = false, length = 50)
	public String getSource() {
		return this.source;
	}

	@Column(nullable = false)
	public short getStatus() {
		return this.status;
	}

	@Column(nullable = false, length = 50)
	public String getUserid() {
		return this.userid;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	public void setAppid(String appid) {
		this.appid = appid;
	}

	public void setBindmobile(String bindmobile) {
		this.bindmobile = bindmobile;
	}

	public void setBindtime(Date bindtime) {
		this.bindtime = bindtime;
	}

	public void setBinduserid(String binduserid) {
		this.binduserid = binduserid;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setLoginAppVersion(String loginAppVersion) {
		this.loginAppVersion = loginAppVersion;
	}

	public void setLoginDeviceAgent(String loginDeviceAgent) {
		this.loginDeviceAgent = loginDeviceAgent;
	}

	public void setLoginDeviceChannel(String loginDeviceChannel) {
		this.loginDeviceChannel = loginDeviceChannel;
	}

	public void setLoginDeviceId(String loginDeviceId) {
		this.loginDeviceId = loginDeviceId;
	}

	public void setLoginDeviceType(String loginDeviceType) {
		this.loginDeviceType = loginDeviceType;
	}

	public void setLoginDeviceVersion(String loginDeviceVersion) {
		this.loginDeviceVersion = loginDeviceVersion;
	}

	public void setLoginTime(Date loginTime) {
		this.loginTime = loginTime;
	}

	public void setPasswd(String passwd) {
		this.passwd = passwd;
	}

	public void setRegAppVersion(String regAppVersion) {
		this.regAppVersion = regAppVersion;
	}

	public void setRegDeviceAgent(String regDeviceAgent) {
		this.regDeviceAgent = regDeviceAgent;
	}

	public void setRegDeviceChannel(String regDeviceChannel) {
		this.regDeviceChannel = regDeviceChannel;
	}

	public void setRegDeviceId(String regDeviceId) {
		this.regDeviceId = regDeviceId;
	}

	public void setRegDeviceType(String regDeviceType) {
		this.regDeviceType = regDeviceType;
	}

	public void setRegDeviceVersion(String regDeviceVersion) {
		this.regDeviceVersion = regDeviceVersion;
	}

	public void setRegTime(Date regTime) {
		this.regTime = regTime;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public void setStatus(short status) {
		this.status = status;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}
}