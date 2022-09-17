package com.yongyuanmedia.jushengshi.db.entities;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Date;


/**
 * The persistent class for the schedule_log database table.
 * 
 */
@Entity
@Table(name="schedule_log")
@NamedQuery(name="ScheduleLog.findAll", query="SELECT s FROM ScheduleLog s")
public class ScheduleLog implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
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

	private String version;

	//uni-directional many-to-one association to Round
	@ManyToOne
	@JoinColumn(name="roundid")
	private Round round;

	public ScheduleLog() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
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

	public String getExtra() {
		return this.extra;
	}

	public void setExtra(String extra) {
		this.extra = extra;
	}

	public String getPagenum() {
		return this.pagenum;
	}

	public void setPagenum(String pagenum) {
		this.pagenum = pagenum;
	}

	public Date getPdate() {
		return this.pdate;
	}

	public void setPdate(Date pdate) {
		this.pdate = pdate;
	}

	public String getPday() {
		return this.pday;
	}

	public void setPday(String pday) {
		this.pday = pday;
	}

	public String getPreversion() {
		return this.preversion;
	}

	public void setPreversion(String preversion) {
		this.preversion = preversion;
	}

	public String getStaffid() {
		return this.staffid;
	}

	public void setStaffid(String staffid) {
		this.staffid = staffid;
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

	public String getVersion() {
		return this.version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public Round getRound() {
		return this.round;
	}

	public void setRound(Round round) {
		this.round = round;
	}

}