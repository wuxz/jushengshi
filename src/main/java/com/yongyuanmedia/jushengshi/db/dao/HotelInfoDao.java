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

import com.yongyuanmedia.jushengshi.db.entities.HotelInfo;

/**
 * @author wuxz
 *
 */
@Repository
@Transactional
public interface HotelInfoDao
		extends PagingAndSortingRepository<HotelInfo, Integer>,
		JpaSpecificationExecutor<HotelInfo> {
	@Modifying
	@Query("delete from HotelInfo where staffid = ?1 and staffHotelId = ?2")
	void deleteByStaffHotel(String staffId, int staffHotelId);

	@Modifying
	@Query("delete from HotelInfo where staffid = ?1 and id = ?2")
	void deleteByStaffId(String staffId, int id);

	List<HotelInfo> findByStaffHotelIdOrderByIdAsc(int staffHotelId);

	@Query("select hi from HotelInfo hi where staffid = ?1 and staffHotelId = ?2 and realname like ?3 order by id asc")
	List<HotelInfo> search(String staffId, int staffHotelId, String keyword);
}
