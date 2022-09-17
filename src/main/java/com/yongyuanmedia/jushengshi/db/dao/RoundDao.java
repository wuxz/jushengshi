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

import com.yongyuanmedia.jushengshi.db.entities.Round;

/**
 * @author wuxz
 *
 */
@Repository
@Transactional
public interface RoundDao extends PagingAndSortingRepository<Round, Integer>,
		JpaSpecificationExecutor<Round> {
	//	@Query("select r from Round r where staffid = ?1 and mode = ?2 and round = ?3")
	public Round findByStaffidAndModeAndRound(String staffid, int mode,
			String round);

	@Query("select r from Round r where staffid = ?1 order by mode, round asc")
	public List<Round> findByStaffidOrderByModeAndRoundAsc(String staffid);
}
