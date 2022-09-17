package com.yongyuanmedia.jushengshi.service;

import java.util.List;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yongyuanmedia.jushengshi.db.dao.StaffDao;
import com.yongyuanmedia.jushengshi.db.dao.StaffMemberDao;
import com.yongyuanmedia.jushengshi.db.dao.StaffMemberDaoImpl;
import com.yongyuanmedia.jushengshi.db.entities.StaffMember;
import com.yongyuanmedia.jushengshi.vo.StaffMemberInfo;

/**
 * @author wuxz
 *
 *         剧本服务
 */
@Service
@Transactional
public class StaffMemberService {
	static final Logger logger = LoggerFactory
			.getLogger(StaffMemberService.class);

	@Autowired
	StaffMemberDaoImpl smDaoImpl;

	@Autowired
	StaffMemberDao smDao;

	@Autowired
	StaffDao staffDao;

	public StaffMember findByStaffidAndUserid(String staffId, String userId) {
		return smDao.findByStaffidAndUserid(staffId, userId);
	}

	public List<StaffMember> findByStaffidOrderByRealname(String staffid) {
		return smDao.findByStaffidOrderByRealnameAsc(staffid);
	}

	public String getNameFromStaff(String staffId) {
		return staffDao.getNameFromStaff(staffId);
	}

	public List<StaffMemberInfo> search(String staffId, short inStatus,
			int isCreate, int isAdmin, int canViewscreenplay, String team,
			String keyword) {
		return smDaoImpl.search(staffId, inStatus, isCreate, isAdmin,
				canViewscreenplay, team, keyword);
	}
}
