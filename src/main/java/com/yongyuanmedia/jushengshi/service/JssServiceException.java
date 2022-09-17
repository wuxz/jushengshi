package com.yongyuanmedia.jushengshi.service;

/*
 * 公用异常类
 */
public class JssServiceException extends RuntimeException {
	/**
	 * 
	 */
	private static final long serialVersionUID = 2340209736248688215L;

	public String reason;

	public int status;

	public JssServiceException() {
		status = 0;
	}

	public JssServiceException(int status, String reason) {
		super(reason);

		this.status = status;
		this.reason = reason;
	}
}
