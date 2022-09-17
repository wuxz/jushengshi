package com.yongyuanmedia.jushengshi.vo;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.yongyuanmedia.jushengshi.db.entities.Round;

public class ScheduleItem {
	int id;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
	Date pdate;

	String version;

	int status;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
	Date upTime;

	String address;

	List<Round> rounds = new ArrayList<>();

	public int getId() {
		return id;
	}

	public Date getPdate() {
		return pdate;
	}

	public List<Round> getRounds() {
		return rounds;
	}

	public int getStatus() {
		return status;
	}

	public Date getUpTime() {
		return upTime;
	}

	public String getVersion() {
		return version;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setPdate(Date pdate) {
		this.pdate = pdate;
	}

	public void setRounds(List<Round> rounds) {
		this.rounds = rounds;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public void setUpTime(Date upTime) {
		this.upTime = upTime;
	}

	public void setVersion(String version) {
		this.version = version;
	}

}
