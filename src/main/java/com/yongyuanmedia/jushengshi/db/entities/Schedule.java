package com.yongyuanmedia.jushengshi.db.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * The persistent class for the schedule database table.
 *
 */
@Entity
@Table(name = "schedule")
@NamedQuery(name = "Schedule.findAll", query = "SELECT s FROM Schedule s")
public class Schedule implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	@Temporal(TemporalType.TIMESTAMP)
	private Date createtime;

	private String cuserid;

	@Lob
	private String extra;

	private String pagenum;

	@Temporal(TemporalType.DATE)
	private Date pdate;

	private String pday;

	private String preversion;

	private String staffid;

	@Temporal(TemporalType.TIMESTAMP)
	private Date uptime;

	private String uuserid;

	@Column(insertable = false, updatable = false)
	private String version;

	//uni-directional many-to-one association to Round
	@ManyToOne
	@JoinColumn(name = "roundid")
	private Round round;

	public Schedule() {
	}

	public Date getCreatetime() {
		return this.createtime;
	}

	public String getCuserid() {
		return this.cuserid;
	}

	public String getExtra() {
		return this.extra;
	}

	public int getId() {
		return this.id;
	}

	public String getPagenum() {
		return this.pagenum;
	}

	public Date getPdate() {
		return this.pdate;
	}

	public String getPday() {
		return this.pday;
	}

	public String getPreversion() {
		return this.preversion;
	}

	public Round getRound() {
		return this.round;
	}

	public String getStaffid() {
		return this.staffid;
	}

	public Date getUptime() {
		return this.uptime;
	}

	public String getUuserid() {
		return this.uuserid;
	}

	public String getVersion() {
		return this.version;
	}

	public void setCreatetime(Date createtime) {
		this.createtime = createtime;
	}

	public void setCuserid(String cuserid) {
		this.cuserid = cuserid;
	}

	public void setExtra(String extra) {
		this.extra = extra;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setPagenum(String pagenum) {
		this.pagenum = pagenum;
	}

	public void setPdate(Date pdate) {
		this.pdate = pdate;
	}

	public void setPday(String pday) {
		this.pday = pday;
	}

	public void setPreversion(String preversion) {
		this.preversion = preversion;
	}

	public void setRound(Round round) {
		this.round = round;
	}

	public void setStaffid(String staffid) {
		this.staffid = staffid;
	}

	public void setUptime(Date uptime) {
		this.uptime = uptime;
	}

	public void setUuserid(String uuserid) {
		this.uuserid = uuserid;
	}

	public void setVersion(String version) {
		this.version = version;
	}

}