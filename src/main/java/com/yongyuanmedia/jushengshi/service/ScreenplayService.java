package com.yongyuanmedia.jushengshi.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.transaction.Transactional;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yongyuanmedia.jushengshi.db.dao.RoundDao;
import com.yongyuanmedia.jushengshi.db.dao.ScheduleDao;
import com.yongyuanmedia.jushengshi.db.dao.ScreenplayRoundDao;
import com.yongyuanmedia.jushengshi.db.dao.ScreenplayRoundDaoImpl;
import com.yongyuanmedia.jushengshi.db.dao.ScreenplayRoundLogDao;
import com.yongyuanmedia.jushengshi.db.dao.ScreenplayUploadDao;
import com.yongyuanmedia.jushengshi.db.entities.Round;
import com.yongyuanmedia.jushengshi.db.entities.Schedule;
import com.yongyuanmedia.jushengshi.db.entities.ScheduleLog;
import com.yongyuanmedia.jushengshi.db.entities.ScreenplayRound;
import com.yongyuanmedia.jushengshi.db.entities.ScreenplayUpload;
import com.yongyuanmedia.jushengshi.util.Utils;
import com.yongyuanmedia.jushengshi.vo.JuBenParseItem;
import com.yongyuanmedia.jushengshi.vo.JuBenParseResult;
import com.yongyuanmedia.jushengshi.vo.ScheduleHistorySummaryItem;
import com.yongyuanmedia.jushengshi.vo.ScheduleItem;
import com.yongyuanmedia.jushengshi.vo.ScreenplayModificationSummary;
import com.yongyuanmedia.jushengshi.vo.ScreenplayRoundItem;

/**
 * @author wuxz
 *
 *         剧本服务
 */
@Service
@Transactional
public class ScreenplayService {
	static final Logger logger = LoggerFactory
			.getLogger(ScreenplayService.class);

	@Autowired
	ScreenplayRoundDao srDao;

	@Autowired
	ScreenplayRoundLogDao srlDao;

	@Autowired
	RoundDao roundDao;

	@Autowired
	ScheduleDao scheduleDao;

	@Autowired
	ScreenplayUploadDao suDao;

	@Autowired
	SMSService smsService;

	@Autowired
	ScreenplayRoundDaoImpl screenplayRoundDaoImpl;

	/**
	 * 把剧本场次表中最新的已发布数据拷贝到分场表中。如果分场表的对应场次已经被用户修改过，则不覆盖。
	 *
	 * @param staffId
	 * @param userId
	 */
	private void copyScreenplayRound2Round(String staffId, String userId) {
		// 更新分场表的数据
		final List<ScreenplayRound> newSrs = srDao
				.findLatestPublishedRoundByStaffidOrderByModeAndId(staffId);
		final List<Round> rounds = roundDao
				.findByStaffidOrderByModeAndRoundAsc(staffId);
		final Map<String, Round> roundSet = new HashMap<>(rounds.size());
		for (final Round round : rounds) {
			roundSet.put("" + round.getMode() + "-" + round.getRound(), round);
		}

		for (final ScreenplayRound sr : newSrs) {
			Round round = roundSet.get("" + sr.getMode() + "-" + sr.getRound());
			if (round == null) {
				round = new Round();
				round.setStaffid(staffId);
				round.setMode(sr.getMode());
				round.setRound(sr.getRound());
				round.setCreatetime(sr.getCtime());
				round.setCuserid(userId);
				round.setUptime(round.getCreatetime());
			} else if ((round.getUptime() != null) && (round.getUptime()
					.getTime() == round.getCreatetime().getTime())) {
				continue;
			}

			round.setActor(sr.getActor());
			round.setAddress("");
			round.setDayNight(sr.getDayNight());
			round.setMainRole(sr.getMainRole());
			round.setRemark(sr.getExtra() == null ? "" : sr.getExtra());
			round.setScene(sr.getScene());
			round.setSide(sr.getSide());
			round.setStatus((sr.getDiffPStatus() == 4) || (sr.getDel() == 2)
					? (short) -1 : 10);
			round.setSummary(sr.getSummary() == null ? "" : sr.getSummary());
			round.setUuserid("");

			roundDao.save(round);
		}
	}

	/**
	 * 创建新的剧本场次记录，同时计算与上一版本的差异。<br>
	 * 算法：先取出旧的全部场次，遍历场次，在新的集合里查找相同集和相同场次的记录。找不到的是已删除，找到的是修改。把修改的记录从新集合中去除。
	 * 遍历结束后， 新集合中剩余的场次为新增。
	 *
	 * @param staffId
	 * @param version
	 * @param srs
	 * @param userId
	 */
	private void createScreenplayRound(String staffId, int version,
			Map<Integer, Map<String, ScreenplayRound>> srs, String userId) {
		// 如果之前没有发布过剧本，则本版本的场次都不算新增而是普通。
		final Integer publishedVersion = suDao
				.getLatestPublishedVersionByStaffid(staffId);

		final List<ScreenplayRound> oldSrs = srDao
				.findLatestPublishedRoundByStaffidOrderByModeAndId(staffId);
		for (final ScreenplayRound oldSr : oldSrs) {
			// 如果该场已经被删除，则忽略
			if ((oldSr.getDel() == 2) || (oldSr.getDiffPStatus() == 4)) {
				continue;
			}

			final int jiId = oldSr.getMode();
			final Map<String, ScreenplayRound> srsInJi = srs.get(jiId);
			if ((srsInJi == null) || (srsInJi.get(oldSr.getRound()) == null)) {
				// 整集都没找到，或者这一场次没找到。场次状态为删除。
				final ScreenplayRound sr = new ScreenplayRound();

				sr.setActor(oldSr.getActor());
				sr.setAddress(oldSr.getAddress());
				sr.setDayNight(oldSr.getDayNight());
				sr.setDel(oldSr.getDel());
				sr.setDiffcontent("");
				sr.setIsRelease(1);
				sr.setStatus(oldSr.getStatus());
				sr.setStatusDate(new Date());
				sr.setMainRole(oldSr.getMainRole());
				sr.setNowcontent("");
				sr.setPrecontent(oldSr.getNowcontent());
				sr.setReleasetime(oldSr.getReleasetime());
				sr.setScene(oldSr.getScene());
				sr.setSide(oldSr.getSide());
				sr.setSummary("");
				sr.setCtime(new Date());
				sr.setDiffPStatus(sr.getDiffPStatus() == 4 ? 1 : 4); //跟上一场比就是删除的，这一场如果还是不存在，状态就是没变化。
				if (sr.getDiffPStatus() == 4) {
					sr.setDel(2);
				}
				sr.setMode(oldSr.getMode());
				sr.setPreversion(oldSr.getVersion());
				sr.setRound(oldSr.getRound());
				sr.setVersion(version);
				sr.setStaffid(staffId);

				srDao.save(sr);
			} else {
				// 找到了。场次状态为无或编辑
				final ScreenplayRound sr = srsInJi.get(oldSr.getRound());

				sr.setDiffPStatus(oldSr.getNowcontent().hashCode() == sr
						.getNowcontent().hashCode() ? 1 : 3);
				sr.setPrecontent(oldSr.getNowcontent());
				sr.setPreversion(oldSr.getVersion());
				sr.setStatus(oldSr.getStatus());

				srDao.save(sr);

				// 从场景集合中去除
				srsInJi.remove(oldSr.getRound());
			}
		}

		// 剩下的都是新增的场次
		for (final Map<String, ScreenplayRound> srsInJi : srs.values()) {
			for (final ScreenplayRound sr : srsInJi.values()) {
				sr.setDiffPStatus(publishedVersion == null ? 1 : 2);

				srDao.save(sr);
			}
		}
	}

	/**
	 * 删除指定某集的剧本的文件。如果指定的剧本当前最新的剧本已经发布，则不允许删除。
	 *
	 * @param staffId
	 * @param jiId
	 * @param version
	 * @throws Exception
	 */
	public void deleteJuBen(String staffId, int jiId, int version)
			throws Exception {
		final ScreenplayUpload su = suDao
				.findByStaffidAndModeAndVersion(staffId, jiId, version);
		if ((su == null) || (su.getIshandle() == 2)) {
			throw new Exception("剧本不存在或已经解析完毕，不能删除。");
		}

		suDao.delete(su);
	}

	/**
	 * 删除指定版本的剧本上传记录文件和剧本场次
	 *
	 * @param staffId
	 * @param version
	 * @throws Exception
	 */
	public void deleteScreenplay(String staffId, int version) throws Exception {
		suDao.deleteAllUnpublishedByVersion(staffId, version);

		srDao.deleteAllUnpublishedByVersion(staffId, version);
	}

	/**
	 * 删除剧本的场次，仅针对未发布的剧本。
	 *
	 * @param id
	 * @throws Exception
	 */
	public void deleteScreenplayRound(String staffId, int id) throws Exception {
		final ScreenplayRound sr = srDao.findOne(id);
		if ((sr == null) || !sr.getStaffid().equals(staffId)
				|| (sr.getIsRelease() != 1)) {
			throw new Exception("剧本已经发布，不可删除");
		}

		srDao.delete(id);
	}

	/**
	 * 查找指定场次的已发布剧本场次
	 *
	 * @param staffid
	 * @param mode
	 * @param round
	 * @return
	 */
	public ScreenplayRound findScreenplayRoundPublished(String staffid,
			int mode, String round) {
		return srDao.findPublished(staffid, mode, round);
	}

	public List<ScreenplayUpload> findScreenplayUpload(String staffId,
			int version) {
		return suDao.findByStaffidAndVersionOrderByModeAsc(staffId, version);
	}

	/**
	 * 列出最新的已上传、未发布的剧本场次列表。
	 *
	 * @param staffId
	 * @return 场次数据列表。如果最新上传的剧本已经发布，则返回空集合。
	 */
	public List<ScreenplayRound> getLatestUnpublishedJuBen(String staffId) {
		final List<ScreenplayRound> srs = srDao
				.findLatestRoundByStaffidOrderByModeAndId(staffId);
		if ((srs.size() > 0) && (srs.get(0).getIsRelease() != 1)) {
			return new ArrayList<ScreenplayRound>();
		}

		return srs;
	}

	/**
	 * 取剧本的下一个版本
	 *
	 * @param staffid
	 * @return
	 */
	public int getNextScreenplayUploadVersion(String staffid) {
		final Integer currVer = suDao.getLatestVersionByStaffid(staffid);
		int result = 0;
		if ((currVer != null) && (currVer.intValue() > 0)) {
			result = currVer.intValue();
		}

		return result + 1;
	}

	/**
	 * 把给出的期表场次数据按天组织成相应的数据
	 *
	 * @param schedules
	 * @param status
	 * @return
	 */
	private List<ScheduleItem> getScheduleItems(final List<Schedule> schedules,
			int status) {
		final List<ScheduleItem> result = new ArrayList<>();

		Date pdateNow = new Date(0);
		ScheduleItem si = null;
		for (final Schedule schedule : schedules) {
			if (schedule.getPdate().getTime() != pdateNow.getTime()) {
				// 新的一天
				pdateNow = schedule.getPdate();

				si = new ScheduleItem();

				si.setId(schedule.getId());
				si.setPdate(schedule.getPdate());
				si.setVersion(schedule.getVersion());
				si.setStatus(status);
				si.setUpTime(schedule.getUptime());

				result.add(si);
			}

			si.getRounds().add(schedule.getRound());
		}

		return result;
	}

	/**
	 * 把给出的期表场次数据按天组织成相应的数据
	 *
	 * @param schedules
	 * @param status
	 * @return
	 */
	private List<ScheduleItem> getScheduleItems(
			final List<ScheduleLog> schedules) {
		final List<ScheduleItem> result = new ArrayList<>();

		Date pdateNow = new Date(0);
		ScheduleItem si = null;
		for (final ScheduleLog schedule : schedules) {
			if (schedule.getUptime().getTime() != pdateNow.getTime()) {
				// 新的一天
				pdateNow = schedule.getUptime();

				si = new ScheduleItem();

				si.setId(schedule.getId());
				si.setPdate(schedule.getPdate());
				si.setVersion(schedule.getVersion());
				si.setStatus(40);
				si.setUpTime(schedule.getUptime());

				result.add(si);
			}

			si.getRounds().add(schedule.getRound());
		}

		return result;
	}

	private List<ScheduleItem> getScheduleLogItems(
			final List<ScheduleLog> schedules) {
		final List<ScheduleItem> result = new ArrayList<>();

		Date pdateNow = new Date(0);
		ScheduleItem si = null;
		for (final ScheduleLog schedule : schedules) {
			if (schedule.getPdate().getTime() != pdateNow.getTime()) {
				// 新的一天
				pdateNow = schedule.getPdate();

				si = new ScheduleItem();

				si.setId(schedule.getId());
				si.setPdate(schedule.getPdate());
				si.setVersion(schedule.getVersion());

				result.add(si);
			}

			si.getRounds().add(schedule.getRound());
		}

		return result;
	}

	/**
	 * 获得指定场次的剧本详情
	 *
	 * @param staffId
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public ScreenplayRoundItem getScreenplayRound(String staffId, int id)
			throws Exception {
		final ScreenplayRound sr = srDao.findOne(id);
		if (!sr.getStaffid().equals(staffId)) {
			throw new Exception("你没有操作权限");
		}

		if (sr.getIsRelease() != 1) {
			throw new Exception("剧本已经发布，不可更改");
		}

		final List<Integer> ids = srDao.selectIdsByVersion(staffId,
				sr.getVersion());
		int i = 0;
		for (i = 0; i < ids.size(); i++) {
			if (ids.get(i).intValue() == sr.getId()) {
				break;
			}
		}

		final ScreenplayRoundItem result = new ScreenplayRoundItem();
		result.setAddress(sr.getAddress());
		result.setDay_night(sr.getDayNight());
		result.setDiff_p_status(sr.getDiffPStatus());
		result.setId(sr.getId());
		result.setIsRelease(sr.getIsRelease());
		result.setMode(sr.getMode());
		result.setNowcontent(sr.getNowcontent());
		result.setPrecontent(sr.getPrecontent());
		result.setRound(sr.getRound());
		result.setScene(sr.getScene());
		result.setSide(sr.getSide());
		result.setStaffid(sr.getStaffid());
		result.setStatus(sr.getStatus());
		result.setVersion(sr.getVersion());
		result.setPrev(i == 0 ? 0 : ids.get(i - 1));
		result.setNext(i >= (ids.size() - 1) ? 0 : ids.get(i + 1));
		result.setActor(sr.getActor());
		result.setMainRole(sr.getMainRole());
		result.setSummary(sr.getSummary());

		return result;
	}

	/**
	 * 获得剧组的最新剧本的版本号，包括已发布和未发布的。
	 *
	 * @param staffid
	 * @return
	 */
	public int getScreenplayUploadLatestVersionByStaffid(String staffid) {
		final Integer result = suDao.getLatestVersionByStaffid(staffid);
		return result == null ? 0 : result.intValue();
	}

	/**
	 * 查询最新版本的期表数据
	 *
	 * @param staffId
	 * @param status
	 * @return
	 */
	public List<ScheduleItem> listLatestSchedule(String staffId, int status,
			String version) {
		final List<Schedule> schedules = scheduleDao
				.findLatestByStaffidAndStatusOrVersion(staffId, status,
						version);
		return getScheduleItems(schedules, status);
	}

	/**
	 * 总结历史版本的期表
	 *
	 * @param staffId
	 * @return
	 */
	public List<ScheduleItem> listScheduleHistory(String staffId) {
		final List<ScheduleLog> schedules = scheduleDao.summaryLog(staffId);
		return getScheduleItems(schedules);
	}

	/**
	 * 查询历史版本的期表列表
	 *
	 * @param staffId
	 * @return
	 */
	public List<ScheduleItem> listScheduleHistory(String staffId,
			String version) {
		final List<ScheduleLog> schedules = scheduleDao
				.listLogByVersion(staffId, version);

		return getScheduleLogItems(schedules);
	}

	/**
	 * 按照指定的过滤条件，列出全部的剧本场次
	 *
	 * @param staffId
	 * @param isPublished
	 * @param dayNight
	 * @param side
	 * @param status
	 * @param beginPage
	 * @param pageSize
	 * @return
	 */
	public List<ScreenplayRoundItem> listScreenplayRound(String staffId,
			boolean isPublished, short dayNight, short side, int status,
			int beginPage, int pageSize) {
		return screenplayRoundDaoImpl.search(staffId, isPublished, dayNight,
				side, status, beginPage, pageSize);
	}

	/**
	 * 根据上传文件的记录，解析剧本内容，并保存到剧本表中。
	 *
	 * @param staffId
	 * @param version
	 * @param userId
	 * @return true为有剧本需要解析，false为没有。
	 * @throws Exception
	 */
	public boolean parseJuben(String staffId, int version, String userId)
			throws Exception {
		boolean result = false;

		final List<ScreenplayUpload> sus = suDao
				.findByStaffidAndVersionOrderByModeAsc(staffId, version);

		// 全部的场次 集序号->场次序号->场次信息
		final Map<Integer, Map<String, ScreenplayRound>> srs = new LinkedHashMap<>();

		for (final ScreenplayUpload su : sus) {
			if (su.getHandletime() != null) {
				// 剧本已经处理过，不再重复处理。
				continue;
			}

			final int jiId = su.getMode();
			// 一集中的全部场次 场次序号->场次信息
			final Map<String, ScreenplayRound> srsInJi = new LinkedHashMap<>();
			srs.put(jiId, srsInJi);

			final JuBenParseResult parseResult = Utils
					.parseJuBen(su.getFilepath());
			if ((parseResult == null) || (parseResult.getItems().length == 0)) {
				final Set<String> mobiles = new HashSet<>();
				mobiles.add("13910178665");
				smsService.sendMessage(mobiles, 1, "剧本解析错误", String.format(
						"剧本解析错误 staffId:%s version:%s", staffId, version), 0);
				throw new Exception("您的剧本需要1~3天完成解析并自动生成分场表");
			}

			final Set<String> actors = new HashSet<>();
			final Set<String> mainActors = new HashSet<>();
			for (final JuBenParseItem item : parseResult.getItems()) {
				item.setId(item.getId().replaceAll("[\\\\.\\\\?-]", ""));
				if (!Utils.roundIdPattern.matcher(item.getId()).matches()) {
					logger.warn("round error, skip it. round:{}", item.getId());

					continue;
				}

				for (final Map.Entry<String, Integer> userEntry : item
						.getUsers().entrySet()) {
					if (userEntry.getValue().intValue() == 1) {
						actors.add(userEntry.getKey());
					} else {
						mainActors.add(userEntry.getKey());
					}
				}

				final ScreenplayRound sr = new ScreenplayRound();

				//				sr.setActor(Utils.collection2String(actors, ","));
				sr.setActor("");
				sr.setAddress(
						item.getAddress().equals("?") ? "" : item.getAddress());
				sr.setCtime(new Date());
				sr.setDayNight(Utils.parseDayNight(item.getnType()));
				//				sr.setMainRole(Utils.collection2String(mainActors, ","));
				sr.setMainRole("");
				sr.setMode(jiId);
				sr.setNowcontent(item.getnText());
				sr.setRound(item.getId());
				sr.setScene(
						item.getAddress().equals("?") ? "" : item.getAddress());
				sr.setSide(Utils.parseSide(item.getNeiWai()));
				sr.setStaffid(staffId);
				//				sr.setSummary(item.getSummary());
				sr.setSummary("");
				sr.setVersion(version);
				sr.setPrecontent("");
				sr.setPreversion(0);
				sr.setDiffPStatus(1);
				sr.setIsRelease(1);
				sr.setStatus(1);
				sr.setDel(1);

				srsInJi.put(sr.getRound(), sr);

				result = true;
			}

			// 保存剧本文件的处理状态
			su.setHandletime(new Date());
			su.setIshandle(2);

			suDao.save(su);
		}

		createScreenplayRound(staffId, version, srs, userId);

		srDao.deleteAllUnpublished(staffId, version);

		return result;
	}

	/**
	 * 发布目前已有的未发布的剧本的最新版本。<br>
	 * 算法：<br>
	 * 1 在上传文件的记录中，查找最新版本。<br>
	 * 2 如果这个版本已经发布，则直接返回。<br>
	 * 3 否则把剧本场次的已发布记录挪到log表中，最新版本的状态设为已发布。<br>
	 * 4 把上传文件的记录状态改为已发布。 <br>
	 *
	 * @param userId
	 * @param staffId
	 *
	 * @return true为有需要发布的剧本，false为没有。
	 * @throws Exception
	 */
	public boolean publishJuBen(String userId, String staffId)
			throws Exception {
		final Integer version = suDao.getLatestVersionByStaffid(staffId);
		// 更新上传记录的状态

		final List<ScreenplayUpload> sus = suDao
				.findByStaffidAndVersionOrderByModeAsc(staffId,
						version == null ? 0 : version.intValue());
		for (final ScreenplayUpload su : sus) {
			if (su.getIshandle() != 2) {
				throw new Exception("剧本解析失败，不能发布");
			}
		}

		final int count = suDao.publishByStaffid(staffId,
				version == null ? 0 : version.intValue());
		if (count == 0) {
			return false;
		}

		// 先把已发布的拷贝到log表
		srlDao.copyFromScreenplayRound(staffId);

		// 删除已经发布的场次
		srDao.deleteAllPublished(staffId);

		// 剩下的就是待发布的场次
		srDao.publishAll(staffId);

		copyScreenplayRound2Round(staffId, userId);

		return count > 0;
	}

	/**
	 * 保存剧本文件的上传记录
	 *
	 * @param files
	 */
	public void saveJuBenFile(String userId, String staffId, int version,
			Map<Integer, String> files) {
		for (final Map.Entry<Integer, String> entry : files.entrySet()) {
			ScreenplayUpload su = suDao.findByStaffidAndModeAndVersion(staffId,
					entry.getKey(), version);
			if (su == null) {
				su = new ScreenplayUpload();
				su.setCreateUserid(userId);
				su.setMode(entry.getKey());
				su.setStaffid(staffId);
				su.setStatus(10);
				su.setVersion(version);
			}

			su.setCtime(new Date());
			su.setFilepath(entry.getValue());
			su.setIshandle(1);

			suDao.save(su);
		}
	}

	/**
	 * 保存剧本，仅针对未发布的剧本。
	 *
	 */
	public void saveScreenplayRound(String staffId, int id, int mode,
			String round, String scene, short side, short dayNight,
			String content, String mainRole, String actor, String summary)
			throws Exception {
		ScreenplayRound sr = id == 0 ? null : srDao.findOne(id);

		if (sr == null) {
			sr = new ScreenplayRound();
			sr.setMode(mode);
			sr.setRound(round);
			sr.setIsRelease(1);
			sr.setStatus(1);
			sr.setDiffPStatus(2);
			sr.setPreversion(0);
		}

		if (!sr.getStaffid().equals(staffId)) {
			throw new Exception("你没有操作权限");
		}

		if (sr.getIsRelease() != 1) {
			throw new Exception("剧本已经发布，不可更改");
		}

		sr.setDayNight(dayNight);
		sr.setNowcontent(content);
		sr.setScene(scene);
		sr.setSide(side);
		sr.setActor(actor);
		sr.setMainRole(mainRole);
		sr.setSummary(summary);

		if ((sr.getDiffPStatus() == 1) || (sr.getDiffPStatus() == 3)) {
			sr.setDiffPStatus(StringUtils.isNotEmpty(sr.getPrecontent())
					&& (sr.getPrecontent().hashCode() == sr.getNowcontent()
							.hashCode()) ? 1 : 3);
		}

		srDao.save(sr);
	}

	/**
	 * 获得历史版本的修改总结
	 *
	 * @param staffId
	 * @return
	 */
	public List<ScreenplayModificationSummary> summaryModification(
			String staffId) {
		final List<Object[]> datas = srlDao.findAllModifiedByStaffid(staffId);
		final List<ScreenplayModificationSummary> result = new ArrayList<>();

		int versionNow = 0;
		ScreenplayModificationSummary item = null;
		for (final Object[] line : datas) {
			final int version = (int) line[0];
			if (version != versionNow) {
				versionNow = version;
				item = new ScreenplayModificationSummary();
				result.add(item);
				item.setVersion(version);
				item.setReleaseTime((Date) line[1]);
			}

			final int mode = (int) line[2];
			String round = (String) line[3];
			if (mode > 0) {
				round = mode + "-" + round;
			}

			final int diffStatus = (Integer) line[4];
			switch (diffStatus) {
				case 2:
					item.getNewRounds().add(round);
					break;

				case 3:
					item.getModifiedRounds().add(round);
					break;

				case 4:
					item.getDeletedRounds().add(round);
					break;

				default:
					break;
			}
		}

		return result;
	}

	/**
	 * 总结历史版本的期表
	 *
	 * @param staffId
	 * @return
	 */
	public List<ScheduleHistorySummaryItem> summaryScheduleHistory(
			String staffId) {
		final List<ScheduleLog> schedules = scheduleDao.summaryLog(staffId);
		final List<ScheduleHistorySummaryItem> result = new ArrayList<>();

		for (final ScheduleLog log : schedules) {
			final ScheduleHistorySummaryItem item = new ScheduleHistorySummaryItem();

			item.setPubTime(log.getUptime());
			item.setVersion(log.getVersion());

			result.add(item);
		}

		return result;
	}
}
