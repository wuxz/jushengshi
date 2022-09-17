package com.yongyuanmedia.jushengshi.db.entities;

import java.io.Serializable;
import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;


/**
 * The persistent class for the staff_member database table.
 * 
 */
@Entity
@Table(name="staff_member")
@NamedQuery(name="StaffMember.findAll", query="SELECT s FROM StaffMember s")
public class StaffMember implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;

	private String address;

	private String avatar;

	private String banknumber;

	private String bindmobile;

	@Column(name="car_num")
	private String carNum;

	@Column(name="car_type")
	private String carType;

	@Temporal(TemporalType.TIMESTAMP)
	private Date cdate;

	private String content;

	@Lob
	private String extra;

	@Lob
	private String flags;

	private int gender;

	@Column(name="hotel_daynum")
	private int hotelDaynum;

	@Temporal(TemporalType.DATE)
	@Column(name="hotel_in_date")
	private Date hotelInDate;

	@Temporal(TemporalType.DATE)
	@Column(name="hotel_leave_date")
	private Date hotelLeaveDate;

	@Column(name="hotel_name")
	private String hotelName;

	@Column(name="hotel_num")
	private String hotelNum;

	@Column(name="hotel_price")
	private BigDecimal hotelPrice;

	@Column(name="hotel_total")
	private BigDecimal hotelTotal;

	@Column(name="hotel_type")
	private String hotelType;

	private String idnumber;

	@Temporal(TemporalType.DATE)
	@Column(name="in_date")
	private Date inDate;

	@Temporal(TemporalType.TIMESTAMP)
	private Date indate;

	private short instatus;

	private int isadmin;

	private int iscreate;

	private int isdriver;

	private int isleader;

	private int isperformer;

	private int isprotocol;

	private int isschedule;

	private int isviewrounds;

	private int isviewscreenplay;

	private String jobs;

	@Temporal(TemporalType.TIMESTAMP)
	private Date lastactivetime;

	@Temporal(TemporalType.DATE)
	@Column(name="leave_date")
	private Date leaveDate;

	private String letter;

	private String mobile;

	private String mobilestatus;

	private String nickname;

	private String performers;

	@Temporal(TemporalType.TIMESTAMP)
	private Date protocoltime;

	private String quanpin;

	private String realname;

	private String remarks;

	private String sign;

	private String sourcebank;

	@Column(name="staff_default")
	private int staffDefault;

	@Column(name="staff_status")
	private int staffStatus;

	private String staffid;

	private int status;

	private String teams;

	private String userid;

	public StaffMember() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getAddress() {
		return this.address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getAvatar() {
		return this.avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public String getBanknumber() {
		return this.banknumber;
	}

	public void setBanknumber(String banknumber) {
		this.banknumber = banknumber;
	}

	public String getBindmobile() {
		return this.bindmobile;
	}

	public void setBindmobile(String bindmobile) {
		this.bindmobile = bindmobile;
	}

	public String getCarNum() {
		return this.carNum;
	}

	public void setCarNum(String carNum) {
		this.carNum = carNum;
	}

	public String getCarType() {
		return this.carType;
	}

	public void setCarType(String carType) {
		this.carType = carType;
	}

	public Date getCdate() {
		return this.cdate;
	}

	public void setCdate(Date cdate) {
		this.cdate = cdate;
	}

	public String getContent() {
		return this.content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getExtra() {
		return this.extra;
	}

	public void setExtra(String extra) {
		this.extra = extra;
	}

	public String getFlags() {
		return this.flags;
	}

	public void setFlags(String flags) {
		this.flags = flags;
	}

	public int getGender() {
		return this.gender;
	}

	public void setGender(int gender) {
		this.gender = gender;
	}

	public int getHotelDaynum() {
		return this.hotelDaynum;
	}

	public void setHotelDaynum(int hotelDaynum) {
		this.hotelDaynum = hotelDaynum;
	}

	public Date getHotelInDate() {
		return this.hotelInDate;
	}

	public void setHotelInDate(Date hotelInDate) {
		this.hotelInDate = hotelInDate;
	}

	public Date getHotelLeaveDate() {
		return this.hotelLeaveDate;
	}

	public void setHotelLeaveDate(Date hotelLeaveDate) {
		this.hotelLeaveDate = hotelLeaveDate;
	}

	public String getHotelName() {
		return this.hotelName;
	}

	public void setHotelName(String hotelName) {
		this.hotelName = hotelName;
	}

	public String getHotelNum() {
		return this.hotelNum;
	}

	public void setHotelNum(String hotelNum) {
		this.hotelNum = hotelNum;
	}

	public BigDecimal getHotelPrice() {
		return this.hotelPrice;
	}

	public void setHotelPrice(BigDecimal hotelPrice) {
		this.hotelPrice = hotelPrice;
	}

	public BigDecimal getHotelTotal() {
		return this.hotelTotal;
	}

	public void setHotelTotal(BigDecimal hotelTotal) {
		this.hotelTotal = hotelTotal;
	}

	public String getHotelType() {
		return this.hotelType;
	}

	public void setHotelType(String hotelType) {
		this.hotelType = hotelType;
	}

	public String getIdnumber() {
		return this.idnumber;
	}

	public void setIdnumber(String idnumber) {
		this.idnumber = idnumber;
	}

	public Date getInDate() {
		return this.inDate;
	}

	public void setInDate(Date inDate) {
		this.inDate = inDate;
	}

	public Date getIndate() {
		return this.indate;
	}

	public void setIndate(Date indate) {
		this.indate = indate;
	}

	public short getInstatus() {
		return this.instatus;
	}

	public void setInstatus(short instatus) {
		this.instatus = instatus;
	}

	public int getIsadmin() {
		return this.isadmin;
	}

	public void setIsadmin(int isadmin) {
		this.isadmin = isadmin;
	}

	public int getIscreate() {
		return this.iscreate;
	}

	public void setIscreate(int iscreate) {
		this.iscreate = iscreate;
	}

	public int getIsdriver() {
		return this.isdriver;
	}

	public void setIsdriver(int isdriver) {
		this.isdriver = isdriver;
	}

	public int getIsleader() {
		return this.isleader;
	}

	public void setIsleader(int isleader) {
		this.isleader = isleader;
	}

	public int getIsperformer() {
		return this.isperformer;
	}

	public void setIsperformer(int isperformer) {
		this.isperformer = isperformer;
	}

	public int getIsprotocol() {
		return this.isprotocol;
	}

	public void setIsprotocol(int isprotocol) {
		this.isprotocol = isprotocol;
	}

	public int getIsschedule() {
		return this.isschedule;
	}

	public void setIsschedule(int isschedule) {
		this.isschedule = isschedule;
	}

	public int getIsviewrounds() {
		return this.isviewrounds;
	}

	public void setIsviewrounds(int isviewrounds) {
		this.isviewrounds = isviewrounds;
	}

	public int getIsviewscreenplay() {
		return this.isviewscreenplay;
	}

	public void setIsviewscreenplay(int isviewscreenplay) {
		this.isviewscreenplay = isviewscreenplay;
	}

	public String getJobs() {
		return this.jobs;
	}

	public void setJobs(String jobs) {
		this.jobs = jobs;
	}

	public Date getLastactivetime() {
		return this.lastactivetime;
	}

	public void setLastactivetime(Date lastactivetime) {
		this.lastactivetime = lastactivetime;
	}

	public Date getLeaveDate() {
		return this.leaveDate;
	}

	public void setLeaveDate(Date leaveDate) {
		this.leaveDate = leaveDate;
	}

	public String getLetter() {
		return this.letter;
	}

	public void setLetter(String letter) {
		this.letter = letter;
	}

	public String getMobile() {
		return this.mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getMobilestatus() {
		return this.mobilestatus;
	}

	public void setMobilestatus(String mobilestatus) {
		this.mobilestatus = mobilestatus;
	}

	public String getNickname() {
		return this.nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getPerformers() {
		return this.performers;
	}

	public void setPerformers(String performers) {
		this.performers = performers;
	}

	public Date getProtocoltime() {
		return this.protocoltime;
	}

	public void setProtocoltime(Date protocoltime) {
		this.protocoltime = protocoltime;
	}

	public String getQuanpin() {
		return this.quanpin;
	}

	public void setQuanpin(String quanpin) {
		this.quanpin = quanpin;
	}

	public String getRealname() {
		return this.realname;
	}

	public void setRealname(String realname) {
		this.realname = realname;
	}

	public String getRemarks() {
		return this.remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public String getSign() {
		return this.sign;
	}

	public void setSign(String sign) {
		this.sign = sign;
	}

	public String getSourcebank() {
		return this.sourcebank;
	}

	public void setSourcebank(String sourcebank) {
		this.sourcebank = sourcebank;
	}

	public int getStaffDefault() {
		return this.staffDefault;
	}

	public void setStaffDefault(int staffDefault) {
		this.staffDefault = staffDefault;
	}

	public int getStaffStatus() {
		return this.staffStatus;
	}

	public void setStaffStatus(int staffStatus) {
		this.staffStatus = staffStatus;
	}

	public String getStaffid() {
		return this.staffid;
	}

	public void setStaffid(String staffid) {
		this.staffid = staffid;
	}

	public int getStatus() {
		return this.status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public String getTeams() {
		return this.teams;
	}

	public void setTeams(String teams) {
		this.teams = teams;
	}

	public String getUserid() {
		return this.userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

}