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

import com.yongyuanmedia.jushengshi.db.entities.ScreenplayRound;

/**
 * @author wuxz
 *
 */
@Repository
@Transactional
public interface ScreenplayRoundDao
		extends PagingAndSortingRepository<ScreenplayRound, Integer>,
		JpaSpecificationExecutor<ScreenplayRound> {
	/**
	 * 删除所有已经发布的场次
	 *
	 * @param staffid
	 */
	@Modifying
	@Query("delete from ScreenplayRound sr where staffid = ?1 and isRelease = 2")
	public void deleteAllPublished(String staffid);

	/**
	 * 在所有未发布的场次中，删除与指定的版本不同的记录。
	 *
	 * @param staffid
	 * @param version
	 */
	@Modifying
	@Query("delete from ScreenplayRound sr where staffid = ?1 and version <> ?2 and isRelease = 1")
	public void deleteAllUnpublished(String staffid, int version);

	/**
	 * 在所有未发布的场次中，删除与指定的版本相同的记录。
	 *
	 * @param staffid
	 * @param version
	 */
	@Modifying
	@Query("delete from ScreenplayRound sr where staffid = ?1 and version = ?2 and isRelease = 1")
	public void deleteAllUnpublishedByVersion(String staffid, int version);

	@Query("select sr from ScreenplayRound sr where staffid = ?1 and version = (select max(version) from ScreenplayRound where staffid = ?1 and is_release = 2) order by mode, id")
	public List<ScreenplayRound> findLatestPublishedRoundByStaffidOrderByModeAndId(
			String staffid);

	@Query("select sr from ScreenplayRound sr where staffid = ?1 and version = (select max(version) from ScreenplayRound where staffid = ?1) order by mode, id")
	public List<ScreenplayRound> findLatestRoundByStaffidOrderByModeAndId(
			String staffid);

	@Query("select sr from ScreenplayRound sr where staffid = ?1 and mode = ?2 and round = ?3 and is_release = 2")
	public ScreenplayRound findPublished(String staffid, int mode,
			String round);

	@Modifying
	@Query("update ScreenplayRound sr set isRelease = 2, releaseTime = CURRENT_TIMESTAMP() where staffid = ?1")
	public void publishAll(String staffid);

	@Query("select sr.id from ScreenplayRound sr where staffid = ?1 and version = ?2 order by id asc")
	public List<Integer> selectIdsByVersion(String staffId, int version);
}
