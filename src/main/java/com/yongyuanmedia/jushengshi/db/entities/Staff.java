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
 * The persistent class for the staff database table.
 *
 */
@Entity
@Table(name = "staff")
@NamedQuery(name = "Staff.findAll", query = "SELECT s FROM Staff s")
public class Staff implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	private String addressbookversion;

	@Column(name = "create_userid")
	private String createUserid;

	@Temporal(TemporalType.TIMESTAMP)
	private Date ctime;

	@Lob
	private String extra;

	@Temporal(TemporalType.TIMESTAMP)
	private Date opentime;

	@Column(name = "screenplay_type")
	private int screenplayType;

	@Column(name = "screenplay_version")
	private String screenplayVersion;

	@Column(name = "staff_img")
	private String staffImg;

	@Column(name = "staff_make")
	private String staffMake;

	@Column(name = "staff_type")
	private String staffType;

	private String staffid;

	private String staffname;

	private int status;

	private int usercount;

	public Staff() {
	}

	public String getAddressbookversion() {
		return this.addressbookversion;
	}

	public String getCreateUserid() {
		return this.createUserid;
	}

	public Date getCtime() {
		return this.ctime;
	}

	public String getExtra() {
		return this.extra;
	}

	public int getId() {
		return this.id;
	}

	public Date getOpentime() {
		return this.opentime;
	}

	public int getScreenplayType() {
		return this.screenplayType;
	}

	public String getScreenplayVersion() {
		return this.screenplayVersion;
	}

	public String getStaffid() {
		return this.staffid;
	}

	public String getStaffImg() {
		return this.staffImg;
	}

	public String getStaffMake() {
		return this.staffMake;
	}

	public String getStaffname() {
		return this.staffname;
	}

	public String getStaffType() {
		return this.staffType;
	}

	public int getStatus() {
		return this.status;
	}

	public int getUsercount() {
		return this.usercount;
	}

	public void setAddressbookversion(String addressbookversion) {
		this.addressbookversion = addressbookversion;
	}

	public void setCreateUserid(String createUserid) {
		this.createUserid = createUserid;
	}

	public void setCtime(Date ctime) {
		this.ctime = ctime;
	}

	public void setExtra(String extra) {
		this.extra = extra;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setOpentime(Date opentime) {
		this.opentime = opentime;
	}

	public void setScreenplayType(int screenplayType) {
		this.screenplayType = screenplayType;
	}

	public void setScreenplayVersion(String screenplayVersion) {
		this.screenplayVersion = screenplayVersion;
	}

	public void setStaffid(String staffid) {
		this.staffid = staffid;
	}

	public void setStaffImg(String staffImg) {
		this.staffImg = staffImg;
	}

	public void setStaffMake(String staffMake) {
		this.staffMake = staffMake;
	}

	public void setStaffname(String staffname) {
		this.staffname = staffname;
	}

	public void setStaffType(String staffType) {
		this.staffType = staffType;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public void setUsercount(int usercount) {
		this.usercount = usercount;
	}

}