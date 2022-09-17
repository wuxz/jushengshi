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
 * The persistent class for the wei_xin_access_token database table.
 *
 */
@Entity
@Table(name = "wei_xin_access_token")
@NamedQuery(name = "WeiXinAccessToken.findAll",
		query = "SELECT w FROM WeiXinAccessToken w")
public class WeiXinAccessToken implements Serializable {
	private static final long serialVersionUID = 1L;

	private int id;

	private Date expireTime;

	private String token;

	public WeiXinAccessToken() {
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(nullable = false)
	public Date getExpireTime() {
		return this.expireTime;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(unique = true, nullable = false)
	public int getId() {
		return this.id;
	}

	@Column(nullable = false, length = 1000)
	public String getToken() {
		return this.token;
	}

	public void setExpireTime(Date expireTime) {
		this.expireTime = expireTime;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setToken(String token) {
		this.token = token;
	}

}