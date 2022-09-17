package com.yongyuanmedia.jushengshi.db.dao;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.apache.commons.lang.StringUtils;

import com.yongyuanmedia.jushengshi.util.Utils;
import com.yongyuanmedia.jushengshi.vo.StaffMemberInfo;

@Transactional
public class StaffMemberDaoImpl {
	@PersistenceContext
	private EntityManager em;

	@SuppressWarnings("unchecked")
	public List<StaffMemberInfo> search(String staffId, short inStatus,
			int isCreate, int isAdmin, int canViewscreenplay, String team,
			String keyword) {
		String hql = "select id, userid, iscreate, isadmin, isleader, isperformer, isdriver, realname, gender, mobile, mobilestatus, jobs, teams, indate, idnumber, sourcebank, banknumber, address, instatus, isviewscreenplay, performers, carType, carNum, leaveDate, isviewrounds, isschedule from StaffMember sm where staffid = :staffId and instatus <> 5";
		if (inStatus > -2) {
			hql += " and instatus = :inStatus";
		}

		if (isCreate > 0) {
			hql += " and iscreate = 2";
		}

		if (isAdmin > 0) {
			hql += " and isadmin = 2";
		}

		if (canViewscreenplay > 0) {
			hql += " and isviewscreenplay = :canViewscreenplay";
		}

		if (StringUtils.isNotEmpty(team)) {
			hql += " and (teams like :team)";
		}

		if (StringUtils.isNotEmpty(keyword)) {
			hql += " and (realname like :keyword or jobs like :keyword)";
		}

		hql += " order by realname";

		final Query q = em.createQuery(hql);

		q.setParameter("staffId", staffId);

		if (inStatus > -2) {
			q.setParameter("inStatus", inStatus);
		}

		if (StringUtils.isNotEmpty(team)) {
			q.setParameter("team", "%" + team + "%");
		}

		if (StringUtils.isNotEmpty(keyword)) {
			q.setParameter("keyword", "%" + keyword + "%");
		}

		if (canViewscreenplay > 0) {
			q.setParameter("canViewscreenplay", canViewscreenplay);
		}

		q.setMaxResults(100);

		final List<Object[]> lines = q.getResultList();
		final List<StaffMemberInfo> result = new ArrayList<>(lines.size());
		for (final Object[] row : lines) {
			final StaffMemberInfo smi = new StaffMemberInfo();

			smi.setStaffMemberId((int) row[0]);
			smi.setUserId((String) row[1]);
			smi.setIsCreate((int) row[2]);
			smi.setIsAdmin((int) row[3]);
			smi.setIsLeader((int) row[4]);
			smi.setIsDriver((int) row[6]);
			smi.setRealName((String) row[7]);
			smi.setGender((int) row[8]);
			smi.setMobile((String) row[9]);
			smi.setMobileStatus((String) row[10]);
			smi.setJobs(Utils.split((String) row[11], ","));
			smi.setTeams(Utils.split((String) row[12], ","));
			smi.setInDate((Date) row[13]);
			smi.setIdNumber((String) row[14]);
			smi.setSourceBank((String) row[15]);
			smi.setBankNumber((String) row[16]);
			smi.setAddress((String) row[17]);
			smi.setInStatus((short) row[18]);
			smi.setCanViewScreenplay((int) row[19]);
			smi.setRoles(Utils.split((String) row[20], ","));
			smi.setCarType((String) row[21]);
			smi.setCarNumber((String) row[22]);
			smi.setLeaveDate((Date) row[23]);
			smi.setCanViewRound((int) row[24]);
			smi.setCanViewSchedule((int) row[25]);

			result.add(smi);
		}

		return result;
	}
}
