/**
 * Mo.java
 *
 * This file was auto-generated from WSDL by the Apache Axis 1.4 Apr 22, 2006
 * (06:55:48 PDT) WSDL2Java emitter.
 */

package com.yongyuanmedia.jushengshi.service.sms.bean;

public class Mo implements java.io.Serializable {
	/**
	 *
	 */
	private static final long serialVersionUID = -7308594537381153302L;

	private java.lang.String addSerial;

	private java.lang.String addSerialRev;

	private java.lang.String channelnumber;

	private java.lang.String mobileNumber;

	private java.lang.String sentTime;

	private java.lang.String smsContent;

	public Mo() {
	}

	public Mo(java.lang.String addSerial, java.lang.String addSerialRev,
			java.lang.String channelnumber, java.lang.String mobileNumber,
			java.lang.String sentTime, java.lang.String smsContent) {
		this.addSerial = addSerial;
		this.addSerialRev = addSerialRev;
		this.channelnumber = channelnumber;
		this.mobileNumber = mobileNumber;
		this.sentTime = sentTime;
		this.smsContent = smsContent;
	}

	/**
	 * Gets the addSerial value for this Mo.
	 * 
	 * @return addSerial
	 */
	public java.lang.String getAddSerial() {
		return addSerial;
	}

	/**
	 * Gets the addSerialRev value for this Mo.
	 * 
	 * @return addSerialRev
	 */
	public java.lang.String getAddSerialRev() {
		return addSerialRev;
	}

	/**
	 * Gets the channelnumber value for this Mo.
	 * 
	 * @return channelnumber
	 */
	public java.lang.String getChannelnumber() {
		return channelnumber;
	}

	/**
	 * Gets the mobileNumber value for this Mo.
	 * 
	 * @return mobileNumber
	 */
	public java.lang.String getMobileNumber() {
		return mobileNumber;
	}

	/**
	 * Gets the sentTime value for this Mo.
	 * 
	 * @return sentTime
	 */
	public java.lang.String getSentTime() {
		return sentTime;
	}

	/**
	 * Gets the smsContent value for this Mo.
	 * 
	 * @return smsContent
	 */
	public java.lang.String getSmsContent() {
		return smsContent;
	}

	/**
	 * Sets the addSerial value for this Mo.
	 * 
	 * @param addSerial
	 */
	public void setAddSerial(java.lang.String addSerial) {
		this.addSerial = addSerial;
	}

	/**
	 * Sets the addSerialRev value for this Mo.
	 * 
	 * @param addSerialRev
	 */
	public void setAddSerialRev(java.lang.String addSerialRev) {
		this.addSerialRev = addSerialRev;
	}

	/**
	 * Sets the channelnumber value for this Mo.
	 * 
	 * @param channelnumber
	 */
	public void setChannelnumber(java.lang.String channelnumber) {
		this.channelnumber = channelnumber;
	}

	/**
	 * Sets the mobileNumber value for this Mo.
	 * 
	 * @param mobileNumber
	 */
	public void setMobileNumber(java.lang.String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	/**
	 * Sets the sentTime value for this Mo.
	 * 
	 * @param sentTime
	 */
	public void setSentTime(java.lang.String sentTime) {
		this.sentTime = sentTime;
	}

	/**
	 * Sets the smsContent value for this Mo.
	 * 
	 * @param smsContent
	 */
	public void setSmsContent(java.lang.String smsContent) {
		this.smsContent = smsContent;
	}

	@Override
	public String toString() {
		return addSerial + "|" + addSerialRev + "|" + channelnumber + "|"
				+ mobileNumber + "|" + sentTime + "|" + smsContent;
	}

}
