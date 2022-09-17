package com.yongyuanmedia.jushengshi.vo;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

public class ScheduleHistorySummaryItem {
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "GMT+8")
	Date pubTime;

	String version;

	public Date getPubTime() {
		return pubTime;
	}

	public String getVersion() {
		return version;
	}

	public void setPubTime(Date pubTime) {
		this.pubTime = pubTime;
	}

	public void setVersion(String version) {
		this.version = version;
	}
}
