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

import com.yongyuanmedia.jushengshi.db.entities.Schedule;
import com.yongyuanmedia.jushengshi.db.entities.ScheduleLog;
import com.yongyuanmedia.jushengshi.db.entities.ScheduleRecord;

/**
 * @author wuxz
 *
 */
@Repository
@Transactional
public interface ScheduleDao
		extends PagingAndSortingRepository<Schedule, Integer>,
		JpaSpecificationExecutor<Schedule> {
	@Query("select sc from Schedule sc where staffid = ?1 and ((?2 = 0 and version = ?3) or version = (select max(version) from ScheduleRecord where staffid = ?1 and (status = ?2 or (20 = ?2 and status = 30)))) order by pdate asc")
	public List<Schedule> findLatestByStaffidAndStatusOrVersion(String staffid,
			int status, String version);

	@Query("select sr from ScheduleRecord sr where staffid = ?1 and version = ?2")
	public ScheduleRecord findRecordByVersion(String staffId, String version);

	@Query("select sl from ScheduleLog sl where staffid = ?1 and version = ?2 order by round.id")
	public List<ScheduleLog> listLogByVersion(String staffId, String version);

	@Query("select sl from ScheduleLog sl where staffid = ?1 group by version order by version desc ")
	public List<ScheduleLog> summaryLog(String staffId);
}
