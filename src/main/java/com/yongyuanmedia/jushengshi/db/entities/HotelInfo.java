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
 * The persistent class for the hotel_info database table.
 *
 */
@Entity
@Table(name = "hotel_info")
@NamedQuery(name = "HotelInfo.findAll", query = "SELECT h FROM HotelInfo h")
public class HotelInfo implements Serializable {
	private static final long serialVersionUID = 1L;

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	private short gender;

	private String mobile;

	@Column(name = "hotel_daynum")
	private int hotelDaynum;

	@Temporal(TemporalType.DATE)
	@Column(name = "hotel_in_date")
	private Date hotelInDate;

	@Temporal(TemporalType.DATE)
	@Column(name = "hotel_leave_date")
	private Date hotelLeaveDate;

	@Column(name = "hotel_name")
	private String hotelName;

	@Column(name = "hotel_num")
	private String hotelNum;

	@Column(name = "hotel_price")
	private float hotelPrice;

	@Column(name = "hotel_total")
	private float hotelTotal;

	@Column(name = "hotel_type")
	private String hotelType;

	private String realname;

	@Column(name = "staff_hotel_id")
	private int staffHotelId;

	private String staffid;

	private String userid;

	public HotelInfo() {
	}

	public short getGender() {
		return this.gender;
	}

	public int getHotelDaynum() {
		return this.hotelDaynum;
	}

	public Date getHotelInDate() {
		return this.hotelInDate;
	}

	public Date getHotelLeaveDate() {
		return this.hotelLeaveDate;
	}

	public String getHotelName() {
		return this.hotelName;
	}

	public String getHotelNum() {
		return this.hotelNum;
	}

	public float getHotelPrice() {
		return this.hotelPrice;
	}

	public float getHotelTotal() {
		return this.hotelTotal;
	}

	public String getHotelType() {
		return this.hotelType;
	}

	public int getId() {
		return this.id;
	}

	public String getMobile() {
		return mobile;
	}

	public String getRealname() {
		return this.realname;
	}

	public int getStaffHotelId() {
		return this.staffHotelId;
	}

	public String getStaffid() {
		return this.staffid;
	}

	public String getUserid() {
		return this.userid;
	}

	public void setGender(short gender) {
		this.gender = gender;
	}

	public void setHotelDaynum(int hotelDaynum) {
		this.hotelDaynum = hotelDaynum;
	}

	public void setHotelInDate(Date hotelInDate) {
		this.hotelInDate = hotelInDate;
	}

	public void setHotelLeaveDate(Date hotelLeaveDate) {
		this.hotelLeaveDate = hotelLeaveDate;
	}

	public void setHotelName(String hotelName) {
		this.hotelName = hotelName;
	}

	public void setHotelNum(String hotelNum) {
		this.hotelNum = hotelNum;
	}

	public void setHotelPrice(float hotelPrice) {
		this.hotelPrice = hotelPrice;
	}

	public void setHotelTotal(float hotelTotal) {
		this.hotelTotal = hotelTotal;
	}

	public void setHotelType(String hotelType) {
		this.hotelType = hotelType;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public void setRealname(String realname) {
		this.realname = realname;
	}

	public void setStaffHotelId(int staffHotelId) {
		this.staffHotelId = staffHotelId;
	}

	public void setStaffid(String staffid) {
		this.staffid = staffid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

}