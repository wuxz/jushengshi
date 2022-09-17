package com.yongyuanmedia.jushengshi.db.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * The persistent class for the screenplay_round database table.
 *
 */
@Entity
@Table(name = "screenplay_round")
@NamedQuery(name = "ScreenplayRound.findAll",
		query = "SELECT s FROM ScreenplayRound s")
public class ScreenplayRound implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	private String actor;

	private String address;

	@Temporal(TemporalType.TIMESTAMP)
	private Date ctime;

	@Column(name = "day_night")
	private short dayNight;

	@Column(name = "status_date")
	private Date statusDate;

	private int del;

	@Column(name = "diff_p_status")
	private int diffPStatus;

	@Lob
	private String diffcontent;

	@Lob
	private String extra;

	@Column(name = "is_release")
	private int isRelease;

	@Column(name = "main_role")
	private String mainRole;

	private int mode;

	@Lob
	private String nowcontent;

	@Lob
	private String precontent;

	private int preversion;

	@Temporal(TemporalType.TIMESTAMP)
	private Date releasetime;

	private String round;

	private String scene;

	private short side;

	private String staffid;

	private int status;

	@Lob
	private String summary;

	@Lob
	@Column(name = "template_data")
	private String templateData;

	@Temporal(TemporalType.TIMESTAMP)
	private Date uptime;

	private int version;

	public ScreenplayRound() {
	}

	public String getActor() {
		return this.actor;
	}

	public String getAddress() {
		return this.address;
	}

	public Date getCtime() {
		return this.ctime;
	}

	public short getDayNight() {
		return this.dayNight;
	}

	public int getDel() {
		return this.del;
	}

	public String getDiffcontent() {
		return this.diffcontent;
	}

	public int getDiffPStatus() {
		return this.diffPStatus;
	}

	public String getExtra() {
		return this.extra;
	}

	public int getId() {
		return this.id;
	}

	public int getIsRelease() {
		return this.isRelease;
	}

	public String getMainRole() {
		return this.mainRole;
	}

	public int getMode() {
		return this.mode;
	}

	public String getNowcontent() {
		return this.nowcontent;
	}

	public String getPrecontent() {
		return this.precontent;
	}

	public int getPreversion() {
		return this.preversion;
	}

	public Date getReleasetime() {
		return this.releasetime;
	}

	public String getRound() {
		return this.round;
	}

	public String getScene() {
		return this.scene;
	}

	public short getSide() {
		return this.side;
	}

	public String getStaffid() {
		return this.staffid;
	}

	public int getStatus() {
		return this.status;
	}

	public Date getStatusDate() {
		return statusDate;
	}

	public String getSummary() {
		return this.summary;
	}

	public String getTemplateData() {
		return this.templateData;
	}

	public Date getUptime() {
		return this.uptime;
	}

	public int getVersion() {
		return this.version;
	}

	public void setActor(String actor) {
		this.actor = actor;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public void setCtime(Date ctime) {
		this.ctime = ctime;
	}

	public void setDayNight(short dayNight) {
		this.dayNight = dayNight;
	}

	public void setDel(int del) {
		this.del = del;
	}

	public void setDiffcontent(String diffcontent) {
		this.diffcontent = diffcontent;
	}

	public void setDiffPStatus(int diffPStatus) {
		this.diffPStatus = diffPStatus;
	}

	public void setExtra(String extra) {
		this.extra = extra;
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

	public void setNowcontent(String nowcontent) {
		this.nowcontent = nowcontent;
	}

	public void setPrecontent(String precontent) {
		this.precontent = precontent;
	}

	public void setPreversion(int preversion) {
		this.preversion = preversion;
	}

	public void setReleasetime(Date releasetime) {
		this.releasetime = releasetime;
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

	public void setStatusDate(Date statusDate) {
		this.statusDate = statusDate;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	public void setTemplateData(String templateData) {
		this.templateData = templateData;
	}

	public void setUptime(Date uptime) {
		this.uptime = uptime;
	}

	public void setVersion(int version) {
		this.version = version;
	}

}