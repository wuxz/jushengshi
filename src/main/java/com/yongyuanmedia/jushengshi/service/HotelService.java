/**
 *
 */
package com.yongyuanmedia.jushengshi.service;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yongyuanmedia.jushengshi.db.dao.HotelInfoDao;
import com.yongyuanmedia.jushengshi.db.dao.StaffHotelDao;
import com.yongyuanmedia.jushengshi.db.entities.HotelInfo;
import com.yongyuanmedia.jushengshi.db.entities.StaffHotel;
import com.yongyuanmedia.jushengshi.db.entities.StaffMember;
import com.yongyuanmedia.jushengshi.vo.HotelInfoData;
import com.yongyuanmedia.jushengshi.vo.StaffHotelData;

/**
 * @author wuxz
 *
 */
@Service
@Transactional
public class HotelService {
	static final Logger logger = LoggerFactory.getLogger(HotelService.class);

	@Autowired
	StaffHotelDao shDao;

	@Autowired
	HotelInfoDao hiDao;

	@Autowired
	UserService userService;

	@Autowired
	StaffMemberService smService;

	public void createHotelInfo(HotelInfo hi) {
		final StaffHotel sh = shDao.findLatest(hi.getStaffid());
		if (sh == null) {
			return;
		}

		hi.setStaffHotelId(sh.getId());
		hiDao.save(hi);
	}

	public void deleteHotelInfo(String staffId, int id) {
		hiDao.deleteByStaffId(staffId, id);
	}

	public void deleteStaffHotel(String staffId, int id) {
		hiDao.deleteByStaffHotel(staffId, id);
		shDao.deleteByStaffId(staffId, id);
	}

	public List<StaffHotelData> findStaffHotel(String staffid) {
		final List<StaffHotel> shs = shDao
				.findByStaffidOrderByCdateDesc(staffid);
		final List<StaffHotelData> result = new ArrayList<>(shs.size());
		for (final StaffHotel sh : shs) {
			final StaffHotelData shd = new StaffHotelData();

			shd.setId(sh.getId());
			shd.setCreateTime(sh.getCdate());
			shd.setName(sh.getName());

			result.add(shd);
		}

		return result;
	}

	public StaffHotel getStaffHotel(int id) {
		return shDao.findOne(id);
	}

	/**
	 * 从通讯录中导入所有联系人，并添加到HotelInfo表中。忽略已经存在的联系人。
	 *
	 * @param staffId
	 * @param staffHotelId
	 */
	public void importHotelInfo(String staffId, int staffHotelId) {
		final List<StaffMember> sms = smService
				.findByStaffidOrderByRealname(staffId);
		final List<HotelInfo> his = hiDao
				.findByStaffHotelIdOrderByIdAsc(staffHotelId);
		for (final StaffMember sm : sms) {
			if (StringUtils.isEmpty(sm.getUserid())) {
				continue;
			}

			boolean found = false;
			for (final HotelInfo hi : his) {
				if (hi.getUserid().equals(sm.getUserid())) {
					found = true;
					break;
				}
			}

			if (!found) {
				final HotelInfo hi = new HotelInfo();
				hi.setGender((short) sm.getGender());
				hi.setRealname(sm.getRealname());
				hi.setStaffHotelId(staffHotelId);
				hi.setStaffid(sm.getStaffid());
				hi.setUserid(sm.getUserid());
				hi.setMobile(sm.getMobile());

				hiDao.save(hi);
			}
		}
	}

	/**
	 * 从通讯录中导入指定的联系人，并添加到HotelInfo表中。
	 *
	 * @param staffId
	 * @param staffHotelId
	 * @param userIds
	 */
	public void importUser2HotelInfo(String staffId, int staffHotelId,
			List<String> userIds) {
		if ((userIds == null) || (userIds.size() == 0)) {
			return;
		}

		final List<Object[]> uis = userService.fetchUserInfoBatch(staffId,
				userIds);
		final List<HotelInfo> his = hiDao
				.findByStaffHotelIdOrderByIdAsc(staffHotelId);
		for (final Object[] line : uis) {
			final String userId = (String) line[0];
			boolean found = false;
			for (final HotelInfo hi : his) {
				if (hi.getUserid().equals(userId)) {
					found = true;
					break;
				}
			}

			if (!found) {
				final HotelInfo hi = new HotelInfo();
				hi.setGender((short) (int) line[2]);
				hi.setRealname((String) line[1]);
				hi.setStaffHotelId(staffHotelId);
				hi.setStaffid(staffId);
				hi.setUserid(userId);
				hi.setMobile((String) line[3]);

				hiDao.save(hi);
			}
		}
	}

	public void saveHotelInfo(String staffId, HotelInfoData hid) {
		final HotelInfo hi = hiDao.findOne(hid.getId());
		if (!hi.getStaffid().equals(staffId)) {
			return;
		}

		hi.setHotelDaynum(hid.getDays());
		hi.setHotelInDate(hid.getInDate());
		hi.setHotelLeaveDate(hid.getLeaveDate());
		hi.setHotelName(hid.getHotelName());
		hi.setHotelNum(hid.getRoomNum());
		hi.setHotelPrice(hid.getPrice());
		hi.setHotelTotal(hid.getTotalPrice());
		hi.setHotelType(hid.getRoomType());

		hiDao.save(hi);
	}

	public StaffHotel saveStaffHotel(StaffHotel sh) {
		return shDao.save(sh);
	}

	public List<HotelInfoData> searchHotelInfo(String staffId, int staffHotelId,
			String keyword) {
		List<HotelInfo> his = null;
		if (StringUtils.isEmpty(keyword)) {
			his = hiDao.findByStaffHotelIdOrderByIdAsc(staffHotelId);
		} else {
			his = hiDao.search(staffId, staffHotelId, "%" + keyword + "%");
		}

		final List<HotelInfoData> result = new ArrayList<>(his.size());
		for (final HotelInfo hi : his) {
			final HotelInfoData hid = new HotelInfoData();
			hid.setId(hi.getId());

			if ((hi.getHotelInDate() != null)
					&& (hi.getHotelLeaveDate() != null)) {
				hid.setDays((int) ((hi.getHotelLeaveDate().getTime()
						/ (1000l * 24 * 60 * 60))
						- (hi.getHotelInDate().getTime()
								/ (1000l * 24 * 60 * 60))));
				hid.setTotalPrice(hi.getHotelPrice() * hid.getDays());
			}

			hid.setUserId(hi.getUserid());
			hid.setGender(hi.getGender());
			hid.setHotelName(hi.getHotelName());
			hid.setInDate(hi.getHotelInDate());
			hid.setLeaveDate(hi.getHotelLeaveDate());
			hid.setPrice(hi.getHotelPrice());
			hid.setRealname(hi.getRealname());
			hid.setRoomNum(hi.getHotelNum());
			hid.setRoomType(hi.getHotelType());
			hid.setTotalPrice(hid.getPrice() * hid.getDays());

			result.add(hid);
		}

		return result;
	}
}
