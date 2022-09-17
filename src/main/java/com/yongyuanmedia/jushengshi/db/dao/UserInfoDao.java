/**
 *
 */
package com.yongyuanmedia.jushengshi.db.dao;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.yongyuanmedia.jushengshi.db.entities.UserInfo;

/**
 * @author wuxz
 *
 */
@Repository
@Transactional
public interface UserInfoDao
		extends PagingAndSortingRepository<UserInfo, Integer>,
		JpaSpecificationExecutor<UserInfo> {
	UserInfo findByUserid(String userId);
}
