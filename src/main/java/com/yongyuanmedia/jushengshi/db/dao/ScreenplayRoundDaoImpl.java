package com.yongyuanmedia.jushengshi.db.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

import com.yongyuanmedia.jushengshi.vo.ScreenplayRoundItem;

@Transactional
public class ScreenplayRoundDaoImpl {
	@PersistenceContext
	private EntityManager em;

	@SuppressWarnings("unchecked")
	public List<ScreenplayRoundItem> search(String staffId, boolean isPublished,
			short dayNight, short side, int status, int beginPage,
			int pageSize) {
		String hql = "select id, staffid, mode, round, address, scene, side, dayNight, status, version, diffPStatus from ScreenplayRound sr where staffid = :staffId and del <> 2";
		if (isPublished) {
			hql += " and isRelease = 2";
		} else {
			hql += " and isRelease = 1";
		}

		if (dayNight > 0) {
			hql += " and dayNight = :dayNight";
		}

		if (side > 0) {
			hql += " and side = :side";
		}

		if (status > 0) {
			hql += " and status = :status";
		}

		hql += " order by id";

		final Query q = em.createQuery(hql);

		q.setParameter("staffId", staffId);

		if (dayNight > 0) {
			q.setParameter("dayNight", dayNight);
		}

		if (side > 0) {
			q.setParameter("side", side);
		}

		if (status > 0) {
			q.setParameter("status", status);
		}

		q.setFirstResult(pageSize * beginPage);
		q.setMaxResults(pageSize);

		final List<Object[]> lines = q.getResultList();
		final List<ScreenplayRoundItem> result = new ArrayList<>(lines.size());
		for (final Object[] row : lines) {
			final ScreenplayRoundItem sr = new ScreenplayRoundItem();

			sr.setId((int) row[0]);
			sr.setStaffid((String) row[1]);
			sr.setMode((int) row[2]);
			sr.setRound((String) row[3]);
			sr.setAddress((String) row[4]);
			sr.setScene((String) row[5]);
			sr.setSide((short) row[6]);
			sr.setDay_night((short) row[7]);
			sr.setStatus((int) row[8]);
			sr.setVersion((int) row[9]);
			sr.setDiff_p_status((int) row[10]);

			result.add(sr);
		}

		return result;
	}
}
