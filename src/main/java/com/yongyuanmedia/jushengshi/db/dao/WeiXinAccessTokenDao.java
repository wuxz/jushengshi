/**
 *
 */
package com.yongyuanmedia.jushengshi.db.dao;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.yongyuanmedia.jushengshi.db.entities.WeiXinAccessToken;

/**
 * @author wuxz
 *
 */
@Repository
@Transactional
public interface WeiXinAccessTokenDao
		extends PagingAndSortingRepository<WeiXinAccessToken, Integer>,
		JpaSpecificationExecutor<WeiXinAccessToken> {
}
