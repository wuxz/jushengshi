package com.yongyuanmedia.jushengshi.db.entities;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Date;


/**
 * The persistent class for the rounds database table.
 * 
 */
@Entity
@Table(name="rounds")
@NamedQuery(name="Round.findAll", query="SELECT r FROM Round r")
public class Round implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;

	private String actor;

	private String address;

	@Temporal(TemporalType.TIMESTAMP)
	private Date createtime;

	private String cuserid;

	@Column(name="day_night")
	private short dayNight;

	@Column(name="main_role")
	private String mainRole;

	private int mode;

	private String remark;

	private String round;

	private String scene;

	private short side;

	private String staffid;

	private short status;

	private String summary;

	@Temporal(TemporalType.TIMESTAMP)
	private Date uptime;

	private String uuserid;

	public Round() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getActor() {
		return this.actor;
	}

	public void setActor(String actor) {
		this.actor = actor;
	}

	public String getAddress() {
		return this.address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Date getCreatetime() {
		return this.createtime;
	}

	public void setCreatetime(Date createtime) {
		this.createtime = createtime;
	}

	public String getCuserid() {
		return this.cuserid;
	}

	public void setCuserid(String cuserid) {
		this.cuserid = cuserid;
	}

	public short getDayNight() {
		return this.dayNight;
	}

	public void setDayNight(short dayNight) {
		this.dayNight = dayNight;
	}

	public String getMainRole() {
		return this.mainRole;
	}

	public void setMainRole(String mainRole) {
		this.mainRole = mainRole;
	}

	public int getMode() {
		return this.mode;
	}

	public void setMode(int mode) {
		this.mode = mode;
	}

	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getRound() {
		return this.round;
	}

	public void setRound(String round) {
		this.round = round;
	}

	public String getScene() {
		return this.scene;
	}

	public void setScene(String scene) {
		this.scene = scene;
	}

	public short getSide() {
		return this.side;
	}

	public void setSide(short side) {
		this.side = side;
	}

	public String getStaffid() {
		return this.staffid;
	}

	public void setStaffid(String staffid) {
		this.staffid = staffid;
	}

	public short getStatus() {
		return this.status;
	}

	public void setStatus(short status) {
		this.status = status;
	}

	public String getSummary() {
		return this.summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	public Date getUptime() {
		return this.uptime;
	}

	public void setUptime(Date uptime) {
		this.uptime = uptime;
	}

	public String getUuserid() {
		return this.uuserid;
	}

	public void setUuserid(String uuserid) {
		this.uuserid = uuserid;
	}

}