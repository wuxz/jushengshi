/**
 *
 */
package com.yongyuanmedia.jushengshi.util;

import java.io.IOException;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Access Token的维护工具。
 *
 * @author wuxz
 *
 */
public class AccessTokenHolder {
	public static String appId;

	static final Logger logger = LoggerFactory
			.getLogger(AccessTokenHolder.class);

	public static String secret;

	static {
		final Properties props = new Properties();
		try {
			props.load(AccessTokenHolder.class
					.getResourceAsStream("/application.properties"));
		} catch (final IOException e) {
			logger.error("load property file error", e);
		}

		appId = props.getProperty("weixin.appId", "wx5320a5f3041984d5");
		secret = props.getProperty("weixin.secret",
				"dfc602870d6331c51cf67a059ad53ef1");
	}
}
