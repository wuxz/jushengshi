/**
 *
 */
package com.yongyuanmedia.jushengshi.service;

import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yongyuanmedia.jushengshi.db.dao.FeedbackDao;
import com.yongyuanmedia.jushengshi.db.dao.StaffMemberDao;
import com.yongyuanmedia.jushengshi.db.dao.UserAccountDao;
import com.yongyuanmedia.jushengshi.db.dao.UserInfoDao;
import com.yongyuanmedia.jushengshi.db.entities.Feedback;
import com.yongyuanmedia.jushengshi.db.entities.StaffMember;
import com.yongyuanmedia.jushengshi.db.entities.UserAccount;
import com.yongyuanmedia.jushengshi.db.entities.UserInfo;
import com.yongyuanmedia.jushengshi.util.Constants;

/**
 * @author wuxz
 *
 */
@Service
@Transactional
public class UserService {
	static final Logger logger = LoggerFactory.getLogger(UserService.class);

	@Autowired
	UserAccountDao uaDao;

	@Autowired
	StaffMemberDao smDao;

	@Autowired
	UserInfoDao uiDao;

	@Autowired
	FeedbackDao feedbackDao;

	public List<Object[]> fetchUserInfoBatch(String staffId,
			List<String> userIds) {
		return uaDao.fetchUserInfoBatch(staffId, userIds);
	}

	public List<UserAccount> find4PushByUserIds(List<String> userIds) {
		return uaDao.find4PushByUserIds(userIds);
	}

	public StaffMember findByStaffIdAndUserId(String staffId, String userId) {
		return smDao.findByStaffidAndUserid(staffId, userId);
	}

	public UserAccount findByWxOpenId(String openId) {
		return uaDao.findBySourceAndAccount(Constants.USER_SOURCE_WEIXINSRV,
				openId);
	}

	public void saveFeedback(String userId, String content) throws Exception {
		final UserInfo ui = uiDao.findByUserid(userId);
		if (ui == null) {
			throw new Exception("用户不存在");
		}

		final Feedback feedback = new Feedback();
		feedback.setContent(content);
		feedback.setCreateTime(new Date());
		feedback.setUserId(userId);

		feedbackDao.save(feedback);
	}
}
