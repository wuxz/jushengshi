package com.yongyuanmedia.jushengshi.db.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * The persistent class for the screenplay_upload database table.
 *
 */
@Entity
@Table(name = "screenplay_upload")
@NamedQuery(name = "ScreenplayUpload.findAll",
		query = "SELECT s FROM ScreenplayUpload s")
public class ScreenplayUpload implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	@Column(name = "create_userid")
	private String createUserid;

	@Temporal(TemporalType.TIMESTAMP)
	private Date ctime;

	private String filepath;

	@Temporal(TemporalType.TIMESTAMP)
	private Date handletime;

	private int ishandle;

	private int mode;

	@Temporal(TemporalType.TIMESTAMP)
	private Date publishtime;

	private String staffid;

	private int status;

	private int version;

	public ScreenplayUpload() {
	}

	public String getCreateUserid() {
		return this.createUserid;
	}

	public Date getCtime() {
		return this.ctime;
	}

	public String getFilepath() {
		return this.filepath;
	}

	public Date getHandletime() {
		return this.handletime;
	}

	public int getId() {
		return this.id;
	}

	public int getIshandle() {
		return this.ishandle;
	}

	public int getMode() {
		return this.mode;
	}

	public Date getPublishtime() {
		return this.publishtime;
	}

	public String getStaffid() {
		return this.staffid;
	}

	public int getStatus() {
		return this.status;
	}

	public int getVersion() {
		return this.version;
	}

	public void setCreateUserid(String createUserid) {
		this.createUserid = createUserid;
	}

	public void setCtime(Date ctime) {
		this.ctime = ctime;
	}

	public void setFilepath(String filepath) {
		this.filepath = filepath;
	}

	public void setHandletime(Date handletime) {
		this.handletime = handletime;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setIshandle(int ishandle) {
		this.ishandle = ishandle;
	}

	public void setMode(int mode) {
		this.mode = mode;
	}

	public void setPublishtime(Date publishtime) {
		this.publishtime = publishtime;
	}

	public void setStaffid(String staffid) {
		this.staffid = staffid;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public void setVersion(int version) {
		this.version = version;
	}

}