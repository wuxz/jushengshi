/**
 *
 */
package com.yongyuanmedia.jushengshi.db.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.yongyuanmedia.jushengshi.db.entities.StaffMember;

/**
 * @author wuxz
 *
 */
@Repository
@Transactional
public interface StaffMemberDao
		extends PagingAndSortingRepository<StaffMember, Integer>,
		JpaSpecificationExecutor<StaffMember> {
	@Query("select sm from StaffMember sm where staffid = ?1 and userid = ?2 and instatus <> 5")
	StaffMember findByStaffidAndUserid(String staffid, String userid);

	@Query("select sm from StaffMember sm where staffid = ?1 and instatus <> 5 order by realname asc")
	List<StaffMember> findByStaffidOrderByRealnameAsc(String staffid);
}
