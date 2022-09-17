package com.yongyuanmedia.jushengshi.vo;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

public class HotelInfoData {
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
	Date inDate;

	String roomNum;

	String realname;

	String staffId;

	int staffHotelId;

	int gender;

	String hotelName;

	String roomType;

	String userId;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
	Date leaveDate;

	int days;

	float price;

	float totalPrice;

	int id;

	public int getDays() {
		return days;
	}

	public int getGender() {
		return gender;
	}

	public String getHotelName() {
		return hotelName;
	}

	public int getId() {
		return id;
	}

	public Date getInDate() {
		return inDate;
	}

	public Date getLeaveDate() {
		return leaveDate;
	}

	public float getPrice() {
		return price;
	}

	public String getRealname() {
		return realname;
	}

	public String getRoomNum() {
		return roomNum;
	}

	public String getRoomType() {
		return roomType;
	}

	public int getStaffHotelId() {
		return staffHotelId;
	}

	public String getStaffId() {
		return staffId;
	}

	public float getTotalPrice() {
		return totalPrice;
	}

	public String getUserId() {
		return userId;
	}

	public void setDays(int days) {
		this.days = days;
	}

	public void setGender(int gender) {
		this.gender = gender;
	}

	public void setHotelName(String hotelName) {
		this.hotelName = hotelName;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setInDate(Date inDate) {
		this.inDate = inDate;
	}

	public void setLeaveDate(Date leaveDate) {
		this.leaveDate = leaveDate;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public void setRealname(String realname) {
		this.realname = realname;
	}

	public void setRoomNum(String roomNum) {
		this.roomNum = roomNum;
	}

	public void setRoomType(String roomType) {
		this.roomType = roomType;
	}

	public void setStaffHotelId(int staffHotelId) {
		this.staffHotelId = staffHotelId;
	}

	public void setStaffId(String staffId) {
		this.staffId = staffId;
	}

	public void setTotalPrice(float totalPrice) {
		this.totalPrice = totalPrice;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}
}
