package com.yongyuanmedia.jushengshi.db.entities;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Date;


/**
 * The persistent class for the schedule_record database table.
 * 
 */
@Entity
@Table(name="schedule_record")
@NamedQuery(name="ScheduleRecord.findAll", query="SELECT s FROM ScheduleRecord s")
public class ScheduleRecord implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;

	@Temporal(TemporalType.TIMESTAMP)
	private Date createtime;

	private String cuserid;

	private String preversion;

	private String staffid;

	private int status;

	@Temporal(TemporalType.TIMESTAMP)
	private Date uptime;

	private String version;

	public ScheduleRecord() {
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

	public int getStatus() {
		return this.status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public Date getUptime() {
		return this.uptime;
	}

	public void setUptime(Date uptime) {
		this.uptime = uptime;
	}

	public String getVersion() {
		return this.version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

}