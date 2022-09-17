package com.yongyuanmedia.jushengshi.vo;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * 剧本历史总结
 *
 * @author wuxiangzheng
 *
 */
public class ScreenplayModificationSummary {
	/**
	 * 版本号
	 */
	int version;

	/**
	 * 发布时间
	 */
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
	Date releaseTime;

	/**
	 * 修改场次的列表
	 */
	List<String> modifiedRounds = new ArrayList<>();

	/**
	 * 新增场次的列表
	 */
	List<String> newRounds = new ArrayList<>();

	/**
	 * 删除场次的列表
	 */
	List<String> deletedRounds = new ArrayList<>();

	public List<String> getDeletedRounds() {
		return deletedRounds;
	}

	public List<String> getModifiedRounds() {
		return modifiedRounds;
	}

	public List<String> getNewRounds() {
		return newRounds;
	}

	public Date getReleaseTime() {
		return releaseTime;
	}

	public int getVersion() {
		return version;
	}

	public void setDeletedRounds(List<String> deletedRounds) {
		this.deletedRounds = deletedRounds;
	}

	public void setModifiedRounds(List<String> modifiedRounds) {
		this.modifiedRounds = modifiedRounds;
	}

	public void setNewRounds(List<String> newRounds) {
		this.newRounds = newRounds;
	}

	public void setReleaseTime(Date releaseTime) {
		this.releaseTime = releaseTime;
	}

	public void setVersion(int version) {
		this.version = version;
	}
}
