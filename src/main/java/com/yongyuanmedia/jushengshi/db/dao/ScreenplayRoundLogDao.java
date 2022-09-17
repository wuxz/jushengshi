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

import com.yongyuanmedia.jushengshi.db.entities.ScreenplayRoundLog;

/**
 * @author wuxz
 *
 */
@Repository
@Transactional
public interface ScreenplayRoundLogDao
		extends PagingAndSortingRepository<ScreenplayRoundLog, Integer>,
		JpaSpecificationExecutor<ScreenplayRoundLog> {
	@Modifying
	@Query("insert into ScreenplayRoundLog (staffid, mode, round, address, scene, side, dayNight, status, version, preversion, diffPStatus, nowcontent, precontent, diffcontent, mainRole, actor, summary, templateData, isRelease, releasetime, del) select staffid, mode, round, address, scene, side, dayNight, status, version, preversion, diffPStatus, nowcontent, precontent, diffcontent, mainRole, actor, summary, templateData, isRelease, releasetime, del from ScreenplayRound where staffid = ?1 and isRelease = 2")
	public void copyFromScreenplayRound(String staffid);

	@Query("select version, releasetime, mode, round, diffPStatus, version as vnum from ScreenplayRoundLog srl where staffid = ?1 and diffPStatus > 1 order by vnum desc, diffPStatus asc, id asc")
	public List<Object[]> findAllModifiedByStaffid(String staffId);
}
