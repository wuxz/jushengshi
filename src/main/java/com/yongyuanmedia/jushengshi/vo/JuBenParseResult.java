package com.yongyuanmedia.jushengshi.vo;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * 剧本解析的结果
 *
 * @author wuxiangzheng
 *
 */
public class JuBenParseResult {
	@JsonProperty("Title")
	String title;

	@JsonProperty("Items")
	JuBenParseItem[] items;

	public JuBenParseItem[] getItems() {
		return items;
	}

	public String getTitle() {
		return title;
	}

	public void setItems(JuBenParseItem[] items) {
		this.items = items;
	}

	public void setTitle(String title) {
		this.title = title;
	}
}
