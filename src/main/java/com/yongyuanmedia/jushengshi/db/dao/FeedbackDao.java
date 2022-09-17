/**
 *
 */
package com.yongyuanmedia.jushengshi.db.dao;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.yongyuanmedia.jushengshi.db.entities.Feedback;

/**
 * @author wuxz
 *
 */
@Repository
@Transactional
public interface FeedbackDao
		extends PagingAndSortingRepository<Feedback, Integer>,
		JpaSpecificationExecutor<Feedback> {
}
