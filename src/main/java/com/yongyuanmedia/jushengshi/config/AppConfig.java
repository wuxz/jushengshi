/**
 *
 */
package com.yongyuanmedia.jushengshi.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.concurrent.ConcurrentMapCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.context.annotation.FilterType;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.core.env.Environment;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

/**
 * @author wuxz
 *
 */
@Configuration
@ComponentScan(basePackages = { "com.yongyuanmedia.jushengshi" },
		excludeFilters = @ComponentScan.Filter(type = FilterType.REGEX,
				pattern = { "com.yongyuanmedia.jushengshi.web.*" }))
@PropertySource(value = { "classpath:application.properties" })
@EnableScheduling
@EnableAspectJAutoProxy
@EnableCaching
public class AppConfig {
	@Bean
	public static PropertySourcesPlaceholderConfigurer placeHolderConfigurer() {
		final PropertySourcesPlaceholderConfigurer result = new PropertySourcesPlaceholderConfigurer();
		//result.setLocation(new ClassPathResource("application.properties"));
		return result;
	}

	@Autowired
	private Environment env;

	@Bean
	public CacheManager cacheManager() {
		return new ConcurrentMapCacheManager();
	}

	@Bean
	public CommonsMultipartResolver multipartResolver() {
		return new CommonsMultipartResolver();
	}
}
