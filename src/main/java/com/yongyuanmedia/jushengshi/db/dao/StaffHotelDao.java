/**
 *
 */
package com.yongyuanmedia.jushengshi.db.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.yongyuanmedia.jushengshi.db.entities.StaffHotel;

/**
 * @author wuxz
 *
 */
@Repository
@Transactional
public interface StaffHotelDao
		extends PagingAndSortingRepository<StaffHotel, Integer>,
		JpaSpecificationExecutor<StaffHotel> {
	@Modifying
	@Query("delete from StaffHotel where staffid = ?1 and id = ?2")
	void deleteByStaffId(String staffId, int id);

	List<StaffHotel> findByStaffidOrderByCdateDesc(String staffid);

	@Query("select sh from StaffHotel sh where staffid = ?1 and id = (select max(id) from StaffHotel where staffid = ?1)")
	StaffHotel findLatest(String staffid);
}
