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

import com.yongyuanmedia.jushengshi.db.entities.ScreenplayUpload;

/**
 * @author wuxz
 *
 */
@Repository
@Transactional
public interface ScreenplayUploadDao
		extends PagingAndSortingRepository<ScreenplayUpload, Integer>,
		JpaSpecificationExecutor<ScreenplayUpload> {
	/**
	 * 删除与指定的版本相同的记录。
	 *
	 * @param staffid
	 * @param version
	 */
	@Modifying
	@Query("delete from ScreenplayUpload su where staffid = ?1 and version = ?2 and status = 10")
	public void deleteAllUnpublishedByVersion(String staffid, int version);

	public ScreenplayUpload findByStaffidAndModeAndVersion(String staffid,
			int mode, int version);

	public List<ScreenplayUpload> findByStaffidAndVersionOrderByModeAsc(
			String staffid, int version);

	@Query("select max(version) from ScreenplayUpload su where staffid = ?1 and not publishtime is null")
	public Integer getLatestPublishedVersionByStaffid(String staffid);

	@Query("select max(version) from ScreenplayUpload su where staffid = ?1")
	public Integer getLatestVersionByStaffid(String staffid);

	/**
	 * 查询当前最新已发布剧本的数量
	 *
	 * @return
	 */
	@Query("select count(*) from ScreenplayUpload su where staffid = ?1 and status = 20")
	public int getPublishedCount(String staffid);

	@Modifying
	@Query("update ScreenplayUpload set publishTime = CURRENT_TIMESTAMP(), status = 20 where staffid = ?1 and version = ?2 and status != 20)")
	public int publishByStaffid(String staffid, int version);
}
