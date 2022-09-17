/**
 *
 */
package com.yongyuanmedia.jushengshi.util;

/**
 * 常量定义
 *
 * @author wuxz
 *
 */
public class Constants {

	/**
	 * 注册成功的提示
	 */
	public static final String MESSAGE_REGISTER = "注册成功";

	/**
	 * 接口调用结果：用户认证失败
	 */
	public static final int STATUS_AUTH_FAILED = 4;

	/**
	 * 接口调用结果：未知异常
	 */
	public static final int STATUS_EXCEPTION = 2;

	/**
	 * 接口调用结果：数据已过期
	 */
	public static final int STATUS_EXPIRED = 9;

	/**
	 * 接口调用结果：有敏感词
	 */
	public static final int STATUS_FORBIDDEN_KEYWORD = 13;

	/**
	 * 接口调用结果：用户未完成注册
	 */
	public static final int STATUS_INCOMPLETE_REGISTRATION = 302;

	/**
	 * 接口调用结果：无效的请求
	 */
	public static final int STATUS_INVALID_REQUEST = 1;

	/**
	 * 接口调用结果：昵称重复
	 */
	public static final int STATUS_NICHENG_EXISTS = 11;

	/**
	 * 接口调用结果：昵称无效
	 */
	public static final int STATUS_NICHENG_INVALID = 12;

	/**
	 * 接口调用结果：没找到
	 */
	public static final int STATUS_NOT_FOUND = 3;

	/**
	 * 接口调用结果：操作不被允许
	 */
	public static final int STATUS_NOT_PERMITTED = 5;

	/**
	 * 接口调用结果：成功
	 */
	public static final int STATUS_OK = 0;

	/**
	 * 接口调用结果：用户积分不足
	 */
	public static final int STATUS_POINT_INSUFFICIENT = 6;

	/**
	 * 接口调用结果：不允许重复操作
	 */
	public static final int STATUS_REPEAT_ACTION = 7;

	/**
	 * 接口调用结果：特卖不可用
	 */
	public static final int STATUS_TEMAI_NOTAVAILABLE = 8;

	/**
	 * 接口调用结果：验证码错误
	 */
	public static final int STATUS_YANZHENGMA_ERROR = 10;

	/**
	 * 验证码有效时长，单位毫秒。
	 */
	public static final int YANZHENGMA_TIMEOUT_MILLIS = 10 * 60 * 1000;

	/**
	 * 用户状态：禁言
	 */
	public static final byte YONGHU_ZHUANGTAI_JINYAN = 3;

	/**
	 * 用户状态：禁用
	 */
	public static final byte YONGHU_ZHUANGTAI_JINYONG = 2;

	/**
	 * 用户状态：正常
	 */
	public static final byte YONGHU_ZHUANGTAI_NORMAL = 0;

	/**
	 * 用户状态：注册未完成
	 */
	public static final byte YONGHU_ZHUANGTAI_WEIWANCHENG = 1;

	/**
	 * 消息类型：普通消息
	 */
	public static final int MESSAGE_TYPE_COMMON = 0;

	/**
	 * 消息类型：通知
	 */
	public static final int MESSAGE_TYPE_NOTICE = 1;

	/**
	 * 消息类型：通告
	 */
	public static final int MESSAGE_TYPE_TONGGAO = 2;

	/**
	 * 用户来源：微信服务号
	 */
	public static final String USER_SOURCE_WEIXINSRV = "weixin";

	/**
	 * 用户来源：手机注册
	 */
	public static final String USER_SOURCE_MOBILE = "mobile";

	/**
	 * 用户登录设备类型：iphone
	 */
	public static final String USER_LOGIN_AGENT_IPHONE = "iphone";

	/**
	 * 用户登录设备类型：android
	 */
	public static final String USER_LOGIN_AGENT_ANDROID = "android";
}
