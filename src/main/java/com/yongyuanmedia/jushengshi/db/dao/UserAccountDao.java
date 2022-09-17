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

import com.yongyuanmedia.jushengshi.db.entities.UserAccount;

/**
 * @author wuxz
 *
 */
@Repository
@Transactional
public interface UserAccountDao
		extends PagingAndSortingRepository<UserAccount, Integer>,
		JpaSpecificationExecutor<UserAccount> {
	@Query("select ui.userid, ui.realname, ui.gender, sm.mobile from UserInfo ui, StaffMember sm where sm.staffid = ?1 and sm.userid = ui.userid and ui.userid in (?2)")
	List<Object[]> fetchUserInfoBatch(String staffId, List<String> userIds);

	@Query("select ua from UserAccount ua where (userid in ?1 and source = 'mobile') or (binduserid in ?1 and source <> 'mobile') order by userid, binduserid")
	public List<UserAccount> find4PushByUserIds(List<String> userIds);

	public UserAccount findBySourceAndAccount(String source, String account);
}
