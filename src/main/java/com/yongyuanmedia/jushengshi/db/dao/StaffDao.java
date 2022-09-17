/**
 *
 */
package com.yongyuanmedia.jushengshi.db.dao;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.yongyuanmedia.jushengshi.db.entities.Staff;

/**
 * @author wuxz
 *
 */
@Repository
@Transactional
public interface StaffDao extends PagingAndSortingRepository<Staff, Integer>,
		JpaSpecificationExecutor<Staff> {
	@Query("select staffname from Staff where staffid = ?1")
	String getNameFromStaff(String staffId);
}
