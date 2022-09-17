/**
 *
 */
package com.yongyuanmedia.jushengshi.web.controller.api;

import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFDataFormat;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.document.AbstractExcelView;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.io.Files;
import com.yongyuanmedia.jushengshi.db.entities.HotelInfo;
import com.yongyuanmedia.jushengshi.db.entities.Round;
import com.yongyuanmedia.jushengshi.db.entities.ScreenplayRound;
import com.yongyuanmedia.jushengshi.db.entities.ScreenplayUpload;
import com.yongyuanmedia.jushengshi.db.entities.StaffHotel;
import com.yongyuanmedia.jushengshi.db.entities.StaffMember;
import com.yongyuanmedia.jushengshi.service.HotelService;
import com.yongyuanmedia.jushengshi.service.MessageService;
import com.yongyuanmedia.jushengshi.service.ScreenplayService;
import com.yongyuanmedia.jushengshi.service.StaffMemberService;
import com.yongyuanmedia.jushengshi.service.UserService;
import com.yongyuanmedia.jushengshi.util.Utils;
import com.yongyuanmedia.jushengshi.util.ZipUtils;
import com.yongyuanmedia.jushengshi.vo.CommonResponse;
import com.yongyuanmedia.jushengshi.vo.HotelInfoData;
import com.yongyuanmedia.jushengshi.vo.ScheduleHistorySummaryItem;
import com.yongyuanmedia.jushengshi.vo.ScheduleItem;
import com.yongyuanmedia.jushengshi.vo.ScreenplayRoundItem;
import com.yongyuanmedia.jushengshi.vo.ShootNoticeResponse;
import com.yongyuanmedia.jushengshi.vo.StaffMemberInfo;

/**
 * @author wuxz
 *
 */
@Controller
@RequestMapping("")
public class ApiWebController {
	class ScheduleExcelView extends AbstractExcelView {
		@SuppressWarnings("unchecked")
		@Override
		public void buildExcelDocument(Map<String, Object> model,
				HSSFWorkbook workbook, HttpServletRequest request,
				HttpServletResponse response) throws Exception {
			final SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd HHmm");

			final String excelName = "schedule.xls";
			// 设置response方式,使执行此controller时候自动出现下载页面,而非直接使用excel打开
			response.setContentType("APPLICATION/OCTET-STREAM");
			response.setHeader("Content-Disposition", "attachment; filename="
					+ URLEncoder.encode(excelName, "UTF-8"));
			final HSSFCellStyle cellStyle = workbook.createCellStyle();
			cellStyle.setDataFormat(
					//					HSSFDataFormat.getBuiltinFormat("m/d/yy h:mm"));
					HSSFDataFormat.getBuiltinFormat("m/d/yy"));

			final List<ScheduleItem> sis = (List<ScheduleItem>) model
					.get("sis");

			String version = "";
			HSSFSheet sheet = null;
			int rowNum = 1;
			for (final ScheduleItem si : sis) {
				if (!si.getVersion().equals(version)) {
					// 新的一组版本
					version = si.getVersion();

					// 产生Excel表头
					sheet = workbook.createSheet(sdf.format(si.getUpTime()));
					final HSSFRow header = sheet.createRow(0); // 第0行

					// 产生标题列
					int column = 0;
					rowNum = 1;

					header.createCell(column++).setCellValue("拍摄日期");
					header.createCell(column++).setCellValue("场次");
					header.createCell(column++).setCellValue("场景");
					header.createCell(column++).setCellValue("日/夜");
					header.createCell(column++).setCellValue("内/外");
					header.createCell(column++).setCellValue("拍摄地点");
				}

				// 填充数据

				for (final Round round : si.getRounds()) {
					final HSSFRow row = sheet.createRow(rowNum++);

					int column = 0;
					row.createCell(column).setCellValue(si.getPdate());
					row.getCell(column++).setCellStyle(cellStyle);
					row.createCell(column++)
							.setCellValue((round.getMode() == 0 ? ""
									: "" + round.getMode() + "-")
									+ round.getRound());
					row.createCell(column++).setCellValue(round.getScene());
					row.createCell(column++).setCellValue(round.getSide() == 1
							? "内" : round.getSide() == 2 ? "外" : "内/外");
					row.createCell(column++)
							.setCellValue(round.getDayNight() == 1 ? "日"
									: round.getDayNight() == 2 ? "夜"
											: round.getDayNight() == 3 ? "晨"
													: round.getDayNight() == 4
															? "昏" : "其他");
					row.createCell(column++).setCellValue(round.getAddress());
				}

				if (si.getRounds().size() > 1) {
					sheet.addMergedRegion(new CellRangeAddress(
							(rowNum - si.getRounds().size()), rowNum - 1,
							(short) 0, (short) 0));
				}
			}
		}
		//
		//		// 列总和计算
		//		HSSFRow row = sheet.createRow(rowNum);
		//		row.createCell(0).setCellValue("TOTAL:");
		//		String formual = "SUM(D2:D" + rowNum + ")"; // D2到D[rowNum]单元格起(count数据)
		//		row.createCell(3).setCellFormula(formual);
	}

	class StaffExcelView extends AbstractExcelView {
		@SuppressWarnings("unchecked")
		@Override
		public void buildExcelDocument(Map<String, Object> model,
				HSSFWorkbook workbook, HttpServletRequest request,
				HttpServletResponse response) throws Exception {
			final String excelName = "staff.xls";
			// 设置response方式,使执行此controller时候自动出现下载页面,而非直接使用excel打开
			response.setContentType("APPLICATION/OCTET-STREAM");
			response.setHeader("Content-Disposition", "attachment; filename="
					+ URLEncoder.encode(excelName, "UTF-8"));
			final HSSFCellStyle cellStyle = workbook.createCellStyle();
			cellStyle.setDataFormat(HSSFDataFormat.getBuiltinFormat("m/d/yy"));

			final List<StaffMemberInfo> staffs = (List<StaffMemberInfo>) model
					.get("staffs");

			// 产生Excel表头
			final HSSFSheet sheet = workbook.createSheet("剧组通讯录");
			final HSSFRow header = sheet.createRow(0); // 第0行
			// 产生标题列
			int column = 0;
			header.createCell(column++).setCellValue("姓名");
			header.createCell(column++).setCellValue("性别");
			header.createCell(column++).setCellValue("身份证号");
			header.createCell(column++).setCellValue("手机号");
			header.createCell(column++).setCellValue("部门");
			header.createCell(column++).setCellValue("职务");
			header.createCell(column++).setCellValue("进组日期");
			header.createCell(column++).setCellValue("地址");
			header.createCell(column++).setCellValue("在组状态");
			header.createCell(column++).setCellValue("饰演角色");

			// 填充数据
			int rowNum = 1;
			for (final StaffMemberInfo mi : staffs) {
				final HSSFRow row = sheet.createRow(rowNum++);

				column = 0;
				row.createCell(column++).setCellValue(mi.getRealName());
				row.createCell(column++).setCellValue(mi.getGender() == 1 ? "男"
						: mi.getGender() == 2 ? "女" : "未知");
				row.createCell(column++).setCellValue(mi.getIdNumber());
				row.createCell(column++).setCellValue(mi.getMobile());
				row.createCell(column++)
						.setCellValue(Utils.array2String(mi.getTeams(), ","));
				row.createCell(column++)
						.setCellValue(Utils.array2String(mi.getJobs(), ","));
				row.createCell(column).setCellValue(mi.getInDate());
				row.getCell(column++).setCellStyle(cellStyle);
				row.createCell(column++).setCellValue(mi.getAddress());
				row.createCell(column++)
						.setCellValue(mi.getInStatus() == 1 ? "离组"
								: mi.getInStatus() == 2 ? "在组"
										: mi.getInStatus() == 3 ? "拒绝" : "邀请中");
				row.createCell(column++)
						.setCellValue(Utils.array2String(mi.getRoles(), ","));

			}
			//
			//		// 列总和计算
			//		HSSFRow row = sheet.createRow(rowNum);
			//		row.createCell(0).setCellValue("TOTAL:");
			//		String formual = "SUM(D2:D" + rowNum + ")"; // D2到D[rowNum]单元格起(count数据)
			//		row.createCell(3).setCellFormula(formual);
		}
	}

	static final Logger logger = LoggerFactory
			.getLogger(ApiWebController.class);

	@Value("${juben.path:/Users/wuxiangzheng/software/apache-tomcat-8.0.15/juben}")
	private String juBenPath;

	@Autowired
	ScreenplayService screenplayService;

	@Autowired
	StaffMemberService staffMemberService;

	@Autowired
	HotelService hotelService;

	@Autowired
	MessageService messageService;

	@Autowired
	UserService userService;

	@Value("${nda.path.pattern}")
	private String ndaPathTemplate;

	@Value("${api.url}")
	private String apiUrl;

	@RequestMapping(value = "/api/android_upgrade")
	public @ResponseBody CommonResponse appAndroidUpgrade(
			HttpServletRequest request, HttpServletResponse response,
			String version, Model model) throws Exception {
		response.setContentType("application/json; charset=utf-8");
		response.setCharacterEncoding("UTF-8");
		final CommonResponse respResult = new CommonResponse();

		try {
			respResult.getData().put("versionNumber", 2);
			respResult.getData().put("version", "1.1");
			respResult.getData().put("description", "修改了一些BUG");
			respResult.getData().put("isForce", 0);
			respResult.getData().put("url",
					"http://static.jushengshier.com/download/jss.1.1.2.apk");

			respResult.setCode(0);
			//			respResult.setCode(-1);
		} catch (final Exception e) {
			logger.error("", e);
			respResult.setMsg(e.getMessage());
			respResult.setCode(-1);
		}

		return respResult;
	}

	@RequestMapping(value = "/app/nda")
	public String appNda(HttpServletRequest request,
			HttpServletResponse response, String staffId, Model model)
			throws Exception {
		try {
			createNda(staffId);
		} catch (final Exception e) {
			logger.error("", e);
		}

		return "redirect:http://static.jushengshier.com/nda_" + staffId
				+ ".html";
	}

	/**
	 * APP总览
	 *
	 * @param request
	 * @param response
	 * @param model
	 * @param roundId
	 * @return
	 */
	@RequestMapping(value = "/app/overview")
	public String appOverview(HttpServletRequest request,
			HttpServletResponse response, Model model) {
		final List<NameValuePair> paramsList = new ArrayList<NameValuePair>();

		final CommonResponse respObj = callService(request, response, model,
				"/data/index", paramsList);
		if (respObj.getCode() == 0) {
			model.addAttribute("data", respObj.getData());
			model.addAttribute("userName",
					userService.findByStaffIdAndUserId(
							request.getHeader("staffId"),
							request.getHeader("userId")).getRealname());

			return "app/overview";
		} else {
			model.addAttribute("data", respObj.getMsg());

			return "app/error";
		}
	}

	/**
	 * APP总览
	 *
	 * @param request
	 * @param response
	 * @param model
	 * @param roundId
	 * @return
	 */
	@RequestMapping(value = "/app/round_detail")
	public String appRoundDetail(HttpServletRequest request,
			HttpServletResponse response, Model model, String roundId,
			String mode, String round) {
		final List<NameValuePair> paramsList = new ArrayList<NameValuePair>();
		if (StringUtils.isNotEmpty(roundId)) {
			paramsList.add(new BasicNameValuePair("id", roundId));
		} else {
			paramsList.add(new BasicNameValuePair("mode", mode));
			paramsList.add(new BasicNameValuePair("round", round));
		}

		final CommonResponse respObj = callService(request, response, model,
				"/rounds/detail", paramsList);
		if (respObj.getCode() == 0) {
			model.addAttribute("data", respObj.getData());
			final int modeVal = Integer
					.parseInt((String) respObj.getData().get("mode"));
			round = (String) respObj.getData().get("round");
			final ScreenplayRound sr = screenplayService
					.findScreenplayRoundPublished(request.getHeader("staffId"),
							modeVal, round);
			model.addAttribute("srId", sr == null ? 0 : sr.getId());
			model.addAttribute("userName",
					userService.findByStaffIdAndUserId(
							request.getHeader("staffId"),
							request.getHeader("userId")).getRealname());

			return "app/round_detail";
		} else {
			model.addAttribute("data", respObj.getMsg());

			return "app/error";
		}
	}

	/**
	 * APP剧本场次详情
	 *
	 * @param request
	 * @param response
	 * @param model
	 * @param roundId
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@RequestMapping(value = "/app/screenplay_round_detail")
	public String appScreenPlayRoundDetail(HttpServletRequest request,
			HttpServletResponse response, Model model, String roundId,
			String mode, String round, String staffId, String userId,
			String userToken, String deviceAgent, String deviceType) {
		final List<NameValuePair> paramsList = new ArrayList<NameValuePair>();
		if (StringUtils.isNotEmpty(roundId)) {
			paramsList.add(new BasicNameValuePair("id", roundId));
		} else {
			paramsList.add(new BasicNameValuePair("mode", mode));
			paramsList.add(new BasicNameValuePair("round", round));
		}
		if (StringUtils.isEmpty(staffId)) {
			staffId = request.getHeader("staffId");
		}
		if (StringUtils.isEmpty(userId)) {
			userId = request.getHeader("userId");
		}
		if (StringUtils.isEmpty(userToken)) {
			userToken = request.getHeader("userToken");
		} else {
			try {
				userToken = URLEncoder.encode(userToken, "UTF-8");
			} catch (final UnsupportedEncodingException e) {
				model.addAttribute("data", e.getMessage());

				return "app/error";
			}
		}
		if (StringUtils.isEmpty(deviceAgent)) {
			deviceAgent = request.getHeader("deviceAgent");
		}
		if (StringUtils.isEmpty(deviceType)) {
			deviceType = request.getHeader("deviceType");
		}

		final CommonResponse respObj = callService(request, response, model,
				"/screenplay/detail", paramsList, staffId, userId, userToken,
				deviceAgent, deviceType);
		if (respObj.getCode() == 0) {
			model.addAttribute("data", respObj.getData());
			model.addAttribute("userName", userService
					.findByStaffIdAndUserId(staffId, userId).getRealname());
			model.addAttribute("staffId", staffId);
			model.addAttribute("userId", userId);
			model.addAttribute("userToken", userToken);
			model.addAttribute("deviceAgent", deviceAgent);
			model.addAttribute("deviceType", deviceType);

			return "app/screenplay_round_detail";
		} else {
			model.addAttribute("data", respObj.getMsg());

			return "app/error";
		}
	}

	/**
	 * 调用专为后端服务提供的内部接口
	 *
	 * @param module
	 *            模块名称
	 * @param paramsList
	 *            参数列表
	 * @return
	 */
	protected CommonResponse callInternalService(String module,
			List<NameValuePair> paramsList) {
		CommonResponse respResult = new CommonResponse();

		final CloseableHttpClient httpclient = HttpClients.createDefault();

		try {
			final HttpPost httpPost = new HttpPost(apiUrl + "/auth/data");

			paramsList.add(new BasicNameValuePair("appid", "service"));
			paramsList.add(new BasicNameValuePair("secret",
					"c95f6983a9af9c0db157d1db8c2dde88"));
			paramsList.add(new BasicNameValuePair("module", module));

			UrlEncodedFormEntity postEntity = null;
			try {
				postEntity = new UrlEncodedFormEntity(paramsList, "UTF-8");
			} catch (final UnsupportedEncodingException e) {
			}
			httpPost.setEntity(postEntity);

			final HttpResponse targetResponse = httpclient.execute(httpPost);
			final int status = targetResponse.getStatusLine().getStatusCode();
			if (status != 200) {
				logger.error(
						"call internal service failed, target:{}, param:{}, status={}",
						httpPost.getURI(), paramsList.toString(), status);

				respResult.setCode(-1);
				return respResult;
			}

			final String entity = EntityUtils
					.toString(targetResponse.getEntity(), "UTF-8");

			logger.debug(
					"call internal service ok, target:{}, param:{}, returns {}",
					httpPost.getURI(), paramsList.toString(), entity);

			final ObjectMapper jsonMapper = new ObjectMapper();
			respResult = jsonMapper.readValue(entity, respResult.getClass());

			return respResult;
		} catch (final Throwable e) {
			logger.error("call intenal service exception, module:{}", module,
					e);

			respResult.setCode(-2);
			return respResult;
		} finally {
			try {
				httpclient.close();
			} catch (final IOException e) {
			}
		}
	}

	/**
	 * 调用后端为APP端提供的接口<br>
	 * 根据当前会话中的用户数据，主动填充Header。因为WEB版应用没有默认剧组，所以不在会话中保存当前剧组，剧组参数由每次请求时的参数中提供，
	 * 填充到Header中。
	 *
	 * @param request
	 * @param response
	 * @param model
	 * @param targetUrl
	 * @param paramsList
	 * @return
	 */
	protected CommonResponse callService(HttpServletRequest request,
			HttpServletResponse response, Model model, String targetUrl,
			List<NameValuePair> paramsList) {
		return callService(request, response, model, targetUrl, paramsList, "",
				"", "", null, null);

	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	protected CommonResponse callService(HttpServletRequest request,
			HttpServletResponse response, Model model, String targetUrl,
			List<NameValuePair> paramsList, String staffId, String userId,
			String userToken, String deviceAgent, String deviceType) {
		CommonResponse respResult = new CommonResponse();

		UserSessionData usd = request.getSession(false) == null ? null
				: (UserSessionData) request.getSession(false)
						.getAttribute("usd");
		final CloseableHttpClient httpclient = HttpClients.createDefault();

		try {
			final HttpPost httpPost = new HttpPost(apiUrl + targetUrl);
			fillHeader(request, httpPost, "deviceAgent",
					deviceAgent == null ? "win7" : deviceAgent);
			fillHeader(request, httpPost, "deviceType",
					deviceType == null ? "chrome" : deviceType);
			fillHeader(request, httpPost, "deviceVersion", "50.0");
			fillHeader(request, httpPost, "deviceId", "web");
			fillHeader(request, httpPost, "appchannel", "web");
			fillHeader(request, httpPost, "appversion", "1.0.1");
			fillHeader(request, httpPost, "staffId", staffId);
			fillHeader(request, httpPost, "userId",
					usd == null ? userId : usd.getUserId());
			fillHeader(request, httpPost, "userToken",
					usd == null ? userToken : usd.getToken());

			UrlEncodedFormEntity postEntity = null;
			try {
				postEntity = new UrlEncodedFormEntity(paramsList, "UTF-8");
			} catch (final UnsupportedEncodingException e) {
			}
			httpPost.setEntity(postEntity);

			final HttpResponse targetResponse = httpclient.execute(httpPost);
			final int status = targetResponse.getStatusLine().getStatusCode();
			if (status != 200) {
				logger.error("proxy failed, target:{}, param:{}, status={}",
						httpPost.getURI(), paramsList.toString(), status);

				respResult.setCode(-1);
				return respResult;
			}

			final String entity = EntityUtils
					.toString(targetResponse.getEntity(), "UTF-8");

			logger.debug("proxy ok, target:{}, header:{}, param:{}, returns {}",
					httpPost.getURI(),
					Utils.array2String(httpPost.getAllHeaders(), ","),
					paramsList.toString(), entity);

			final ObjectMapper jsonMapper = new ObjectMapper();
			respResult = jsonMapper.readValue(entity, respResult.getClass());

			if (targetUrl.endsWith("/account/login")
					|| targetUrl.endsWith("/account/register")) {
				logger.debug("login/register finished.");

				// 注册或登录，记下用户的信息
				if (respResult.getCode() == 0) {
					if (usd == null) {
						usd = new UserSessionData();
						request.getSession(true).setAttribute("usd", usd);
					}

					final Map<String, Object> data = respResult.getData();

					usd.setToken(data.get("userToken").toString());
					usd.setUserId(data.get("userId").toString());
					final Map<String, Object> userInfo = (Map) data
							.get("userinfo");
					usd.setRealname(userInfo.get("realname").toString());
					usd.setMobile(userInfo.get("mobile").toString());

					logger.debug("got new token, token:{}, userId:{}",
							usd.getToken(), usd.getUserId());
				}
			}

			return respResult;
		} catch (final Throwable e) {
			logger.error("proxy exception, target:{}",
					request.getParameter("targetUrl"), e);

			respResult.setMsg(e.getMessage());
			respResult.setCode(-2);
			return respResult;
		} finally {
			try {
				httpclient.close();
			} catch (final IOException e) {
			}
		}
	}

	protected ShootNoticeResponse callService2(HttpServletRequest request,
			HttpServletResponse response, Model model, String targetUrl,
			List<NameValuePair> paramsList) {
		ShootNoticeResponse respResult = new ShootNoticeResponse();

		final UserSessionData usd = request.getSession(false) == null ? null
				: (UserSessionData) request.getSession(false)
						.getAttribute("usd");
		final CloseableHttpClient httpclient = HttpClients.createDefault();

		try {
			final HttpPost httpPost = new HttpPost(apiUrl + targetUrl);
			fillHeader(request, httpPost, "deviceAgent", "win7");
			fillHeader(request, httpPost, "deviceType", "chrome");
			fillHeader(request, httpPost, "deviceVersion", "50.0");
			fillHeader(request, httpPost, "deviceId", "web");
			fillHeader(request, httpPost, "appchannel", "web");
			fillHeader(request, httpPost, "appversion", "1.0.1");
			fillHeader(request, httpPost, "staffId", "");
			fillHeader(request, httpPost, "userId",
					usd == null ? "" : usd.getUserId());
			fillHeader(request, httpPost, "userToken",
					usd == null ? "" : usd.getToken());

			UrlEncodedFormEntity postEntity = null;
			try {
				postEntity = new UrlEncodedFormEntity(paramsList, "UTF-8");
			} catch (final UnsupportedEncodingException e) {
			}
			httpPost.setEntity(postEntity);

			final HttpResponse targetResponse = httpclient.execute(httpPost);
			final int status = targetResponse.getStatusLine().getStatusCode();
			if (status != 200) {
				logger.error("proxy failed, target:{}, param:{}, status={}",
						httpPost.getURI(), paramsList.toString(), status);

				respResult.setCode(-1);
				return respResult;
			}

			final String entity = EntityUtils
					.toString(targetResponse.getEntity(), "UTF-8");

			logger.debug("proxy ok, target:{}, header:{}, param:{}, returns {}",
					httpPost.getURI(),
					Utils.array2String(httpPost.getAllHeaders(), ","),
					paramsList.toString(), entity);

			final ObjectMapper jsonMapper = new ObjectMapper();
			respResult = jsonMapper.readValue(entity, respResult.getClass());

			return respResult;
		} catch (

		final Throwable e) {
			logger.error("proxy exception, target:{}",
					request.getParameter("targetUrl"), e);

			respResult.setMsg(e.getMessage());
			respResult.setCode(-2);
			return respResult;
		} finally {
			try {
				httpclient.close();
			} catch (final IOException e) {
			}
		}
	}

	/**
	 * 检查当前会话中的用户登录状态。如果尚未登录，则把请求重定向到登录页面。
	 *
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 * @throws Exception
	 */
	private UserSessionData checkUserStatus(HttpServletRequest request,
			HttpServletResponse response, String staffId, Model model)
			throws Exception {
		if (StringUtils.isNotEmpty(request.getHeader("userId"))
				&& StringUtils.isNotEmpty(request.getHeader("userToken"))) {
			final UserSessionData usd = new UserSessionData();
			usd.setToken(request.getHeader("userToken"));
			usd.setUserId(request.getHeader("userId"));

			return usd;
		}

		final UserSessionData usd = (UserSessionData) request.getSession(true)
				.getAttribute("usd");
		if ((usd == null) || StringUtils.isEmpty(usd.getUserId())) {
			throw new Exception("你尚未登录");
		}

		if (StringUtils.isNotEmpty(staffId)) {
			final StaffMember sm = staffMemberService
					.findByStaffidAndUserid(staffId, usd.getUserId());
			if ((sm == null)
					|| ((sm.getIscreate() != 2) && (sm.getIsadmin() != 2))) {
				throw new Exception("你没有操作权");
			}
		}

		if (StringUtils.isNotEmpty(request.getParameter("staffId"))) {
			model.addAttribute("staffId", request.getParameter("staffId"));
		}

		return usd;
	}

	/**
	 * 把保密协议的模板拷贝一份，作为指定剧组的保密协议文件。<br>
	 * 如果协议文件已经存在，则直接返回。
	 *
	 * @param staffId
	 * @throws IOException
	 */
	private void createNda(final String staffId) throws IOException {
		final String ndaFilePath = String.format(ndaPathTemplate, staffId);
		if (new File(ndaFilePath).exists()) {
			return;
		}
		final String ndaSource = ndaFilePath.substring(0,
				ndaFilePath.lastIndexOf("/")) + "/nda.html";
		Files.copy(new File(ndaSource), new File(ndaFilePath));

		logger.info("自动创建了用户协议 source:[{}], dest:[{}]", ndaSource, ndaFilePath);
	}

	/**
	 * 删除住宿信息表的单条记录
	 *
	 * @param request
	 * @param response
	 * @param staffId
	 * @param hotelInfoId
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/api/delete_hotel_info")
	public @ResponseBody CommonResponse deleteHotelInfo(
			HttpServletRequest request, HttpServletResponse response,
			String staffId, int hotelInfoId, Model model) throws Exception {
		response.setContentType("application/json; charset=utf-8");
		response.setCharacterEncoding("UTF-8");
		final CommonResponse respResult = new CommonResponse();

		try {
			if (!Utils.staffIdPattern.matcher(staffId).matches()) {
				throw new Exception("invalid staffid");
			}

			checkUserStatus(request, response, staffId, model);

			hotelService.deleteHotelInfo(staffId, hotelInfoId);

			respResult.setCode(0);
		} catch (final Exception e) {
			logger.error("", e);
			respResult.setMsg(e.getMessage());
			respResult.setCode(-1);
		}

		return respResult;
	}

	/**
	 * 删除指定某集的剧本的文件。
	 *
	 * @param request
	 * @param response
	 * @param staffId
	 * @param jiId
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/api/delete_juben")
	public @ResponseBody CommonResponse deleteJuBen(HttpServletRequest request,
			HttpServletResponse response, String staffId, int jiId, Model model)
			throws Exception {
		response.setContentType("application/json; charset=utf-8");
		response.setCharacterEncoding("UTF-8");
		final CommonResponse respResult = new CommonResponse();

		try {
			if (!Utils.staffIdPattern.matcher(staffId).matches()) {
				throw new Exception("invalid staffid");
			}

			checkUserStatus(request, response, staffId, model);

			final int version = screenplayService
					.getScreenplayUploadLatestVersionByStaffid(staffId);
			screenplayService.deleteJuBen(staffId, jiId, version);

			respResult.setCode(0);
		} catch (final Exception e) {
			logger.error("", e);
			respResult.setMsg(e.getMessage());
			respResult.setCode(-1);
		}

		return respResult;
	}

	/**
	 * 删除指定版本的剧本上传记录文件和剧本场次
	 *
	 * @param request
	 * @param response
	 * @param staffId
	 * @param version
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/api/delete_screenplay")
	public @ResponseBody CommonResponse deleteScreenplay(
			HttpServletRequest request, HttpServletResponse response,
			String staffId, int version, Model model) throws Exception {
		response.setContentType("application/json; charset=utf-8");
		response.setCharacterEncoding("UTF-8");
		final CommonResponse respResult = new CommonResponse();

		try {
			if (!Utils.staffIdPattern.matcher(staffId).matches()) {
				throw new Exception("invalid staffid");
			}

			checkUserStatus(request, response, staffId, model);

			screenplayService.deleteScreenplay(staffId, version);

			respResult.setCode(0);
		} catch (final Exception e) {
			logger.error("", e);
			respResult.setMsg(e.getMessage());
			respResult.setCode(-1);
		}

		return respResult;
	}

	/**
	 * 删除剧本的指定场次
	 *
	 * @param request
	 * @param response
	 * @param staffId
	 * @param id
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/api/delete_screenplay_round")
	public @ResponseBody CommonResponse deleteScreenplayRound(
			HttpServletRequest request, HttpServletResponse response,
			String staffId, int id, Model model) throws Exception {
		response.setContentType("application/json; charset=utf-8");
		response.setCharacterEncoding("UTF-8");
		final CommonResponse respResult = new CommonResponse();

		try {
			if (!Utils.staffIdPattern.matcher(staffId).matches()) {
				throw new Exception("invalid staffid");
			}

			checkUserStatus(request, response, staffId, model);

			screenplayService.deleteScreenplayRound(staffId, id);

			respResult.setCode(0);
		} catch (final Exception e) {
			logger.error("", e);
			respResult.setMsg(e.getMessage());
			respResult.setCode(-1);
		}

		return respResult;
	}

	/**
	 * 删除住宿信息表
	 *
	 * @param request
	 * @param response
	 * @param staffId
	 * @param staffHotelId
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/api/delete_staff_hotel")
	public @ResponseBody CommonResponse deleteStaffHotel(
			HttpServletRequest request, HttpServletResponse response,
			String staffId, int staffHotelId, Model model) throws Exception {
		response.setContentType("application/json; charset=utf-8");
		response.setCharacterEncoding("UTF-8");
		final CommonResponse respResult = new CommonResponse();

		try {
			if (!Utils.staffIdPattern.matcher(staffId).matches()) {
				throw new Exception("invalid staffid");
			}

			checkUserStatus(request, response, staffId, model);

			hotelService.deleteStaffHotel(staffId, staffHotelId);

			respResult.setCode(0);
		} catch (final Exception e) {
			logger.error("", e);
			respResult.setMsg(e.getMessage());
			respResult.setCode(-1);
		}

		return respResult;
	}

	/**
	 * 导出期表数据
	 *
	 * @param request
	 * @param response
	 * @param staffId
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/web/schedule_export")
	public ModelAndView exporSchedule(HttpServletRequest request,
			HttpServletResponse response, String staffId, Model model)
			throws Exception {
		if (!Utils.staffIdPattern.matcher(staffId).matches()) {
			throw new Exception("invalid staffid");
		}

		final UserSessionData usd = (UserSessionData) request.getSession(true)
				.getAttribute("usd");
		if ((usd == null) || StringUtils.isEmpty(usd.getUserId())) {
			throw new Exception("会话过期，请重新登录");
		} else {
			final List<ScheduleItem> sis = screenplayService
					.listLatestSchedule(staffId, 40, "");
			model.addAttribute("sis", sis);

			return new ModelAndView(new ScheduleExcelView(), model.asMap());
		}
	}

	/**
	 * 导出期表历史记录
	 *
	 * @param request
	 * @param response
	 * @param staffId
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/web/schedule_history_export")
	public ModelAndView exporScheduleHistory(HttpServletRequest request,
			HttpServletResponse response, String staffId, Model model)
			throws Exception {
		if (!Utils.staffIdPattern.matcher(staffId).matches()) {
			throw new Exception("invalid staffid");
		}

		final UserSessionData usd = (UserSessionData) request.getSession(true)
				.getAttribute("usd");
		if ((usd == null) || StringUtils.isEmpty(usd.getUserId())) {
			throw new Exception("会话过期，请重新登录");
		} else {
			final List<ScheduleItem> sis = screenplayService
					.listScheduleHistory(staffId);
			model.addAttribute("sis", sis);

			return new ModelAndView(new ScheduleExcelView(), model.asMap());
		}
	}

	/**
	 * 导出通讯录
	 *
	 * @param request
	 * @param response
	 * @param staffId
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/web/staff_export")
	public ModelAndView exporStaff(HttpServletRequest request,
			HttpServletResponse response, String staffId, Model model)
			throws Exception {
		if (!Utils.staffIdPattern.matcher(staffId).matches()) {
			throw new Exception("invalid staffid");
		}

		final UserSessionData usd = (UserSessionData) request.getSession(true)
				.getAttribute("usd");
		if ((usd == null) || StringUtils.isEmpty(usd.getUserId())) {
			throw new Exception("会话过期，请重新登录");
		} else {
			final List<StaffMemberInfo> staffs = staffMemberService
					.search(staffId, (short) -2, -2, -2, -2, null, null);
			model.addAttribute("staffs", staffs);

			return new ModelAndView(new StaffExcelView(), model.asMap());
		}
	}

	/**
	 * 打开反馈的页面
	 *
	 * @param request
	 * @param response
	 * @param staffId
	 * @param content
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/api/feedback")
	public @ResponseBody CommonResponse feedback(HttpServletRequest request,
			HttpServletResponse response, String content, Model model)
			throws Exception {
		response.setContentType("application/json; charset=utf-8");
		response.setCharacterEncoding("UTF-8");
		final CommonResponse respResult = new CommonResponse();

		try {
			final UserSessionData usd = checkUserStatus(request, response, null,
					model);

			userService.saveFeedback(usd.getUserId(), content);

			respResult.setCode(0);
		} catch (final Exception e) {
			logger.error("", e);
			respResult.setMsg(e.getMessage());
			respResult.setCode(-1);
		}

		return respResult;
	}

	/**
	 * 从用户请求中获得Header数据，并填充到内部的请求中。如果用户请求中没有指定的Header，则使用默认值。
	 *
	 * @param request
	 *            用户请求
	 * @param httpPost
	 *            内部请求
	 * @param field
	 *            Header名称
	 * @param defaultValue
	 *            默认值
	 */
	protected void fillHeader(HttpServletRequest request,
			final HttpPost httpPost, String field, String defaultValue) {
		if (StringUtils.isEmpty(request.getHeader(field))) {
			if (StringUtils.isNotEmpty(defaultValue)) {
				httpPost.addHeader(field, defaultValue);
			}
		} else {
			httpPost.addHeader(field, request.getHeader(field));
		}
	}

	/**
	 * 获得剧本历史数据
	 *
	 * @param request
	 * @param response
	 * @param staffId
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/api/juben_history")
	public @ResponseBody CommonResponse getJuBenHistory(
			HttpServletRequest request, HttpServletResponse response,
			String staffId, Model model) {
		response.setContentType("application/json; charset=utf-8");
		response.setCharacterEncoding("UTF-8");
		final CommonResponse respResult = new CommonResponse();

		try {
			if (!Utils.staffIdPattern.matcher(staffId).matches()) {
				throw new Exception("invalid staffid");
			}

			checkUserStatus(request, response, staffId, model);

			respResult.getData().put("list",
					screenplayService.summaryModification(staffId));

			respResult.setCode(0);
		} catch (final Exception e) {
			logger.error("", e);
			respResult.setMsg(e.getMessage());
			respResult.setCode(-1);
		}

		return respResult;
	}

	/**
	 * 获得指定场次的剧本详情
	 *
	 * @param request
	 * @param response
	 * @param staffId
	 * @param id
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/api/screenplay_detail")
	public @ResponseBody CommonResponse getScreenplayDetail(
			HttpServletRequest request, HttpServletResponse response,
			String staffId, int id, Model model) throws Exception {
		response.setContentType("application/json; charset=utf-8");
		response.setCharacterEncoding("UTF-8");
		final CommonResponse respResult = new CommonResponse();

		try {
			if (!Utils.staffIdPattern.matcher(staffId).matches()) {
				throw new Exception("invalid staffid");
			}

			checkUserStatus(request, response, staffId, model);

			respResult.getData().put("data",
					screenplayService.getScreenplayRound(staffId, id));

			respResult.setCode(0);
		} catch (final Exception e) {
			logger.error("", e);
			respResult.setMsg(e.getMessage());
			respResult.setCode(-1);
		}

		return respResult;
	}

	/**
	 * 从通讯录中导入数据到住宿信息表中
	 *
	 * @param request
	 * @param response
	 * @param staffId
	 * @param staffHotelId
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/api/import_staff_hotel")
	public @ResponseBody CommonResponse importStaffHotel(
			HttpServletRequest request, HttpServletResponse response,
			String staffId, int staffHotelId, String userIds, Model model)
			throws Exception {
		response.setContentType("application/json; charset=utf-8");
		response.setCharacterEncoding("UTF-8");
		final CommonResponse respResult = new CommonResponse();

		try {
			if (!Utils.staffIdPattern.matcher(staffId).matches()) {
				throw new Exception("invalid staffid");
			}

			checkUserStatus(request, response, staffId, model);

			final String[] uidArr = userIds.split(",");
			final List<String> uids = new ArrayList<>(uidArr.length);
			for (final String userId : uidArr) {
				if (StringUtils.isNotEmpty(userId)) {
					uids.add(userId);
				}
			}

			hotelService.importUser2HotelInfo(staffId, staffHotelId, uids);

			respResult.setCode(0);
		} catch (final Exception e) {
			logger.error("", e);
			respResult.setMsg(e.getMessage());
			respResult.setCode(-1);
		}

		return respResult;
	}

	/**
	 * 列出所有的住宿信息表
	 *
	 * @param request
	 * @param response
	 * @param staffId
	 * @param staffHotelId
	 * @param keyword
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/api/list_hotel_info")
	public @ResponseBody CommonResponse listHotelInfo(
			HttpServletRequest request, HttpServletResponse response,
			String staffId, @RequestParam(defaultValue = "0") int staffHotelId,
			String keyword, Model model) throws Exception {
		response.setContentType("application/json; charset=utf-8");
		response.setCharacterEncoding("UTF-8");
		final CommonResponse respResult = new CommonResponse();

		try {
			if (!Utils.staffIdPattern.matcher(staffId).matches()) {
				throw new Exception("invalid staffid");
			}

			checkUserStatus(request, response, staffId, model);

			respResult.getData().put("staffHotel",
					hotelService.getStaffHotel(staffHotelId));
			respResult.getData().put("list", hotelService
					.searchHotelInfo(staffId, staffHotelId, keyword));

			respResult.setCode(0);
		} catch (final Exception e) {
			logger.error("", e);
			respResult.setMsg(e.getMessage());
			respResult.setCode(-1);
		}

		return respResult;
	}

	/**
	 * 查询最新的期表列表
	 *
	 * @param request
	 * @param response
	 * @param staffId
	 * @param status
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/api/schedule_list")
	public @ResponseBody CommonResponse listLatestSchedule(
			HttpServletRequest request, HttpServletResponse response,
			String staffId, int status, String version, Model model)
			throws Exception {
		response.setContentType("application/json; charset=utf-8");
		response.setCharacterEncoding("UTF-8");
		final CommonResponse respResult = new CommonResponse();

		try {
			if (!Utils.staffIdPattern.matcher(staffId).matches()) {
				throw new Exception("invalid staffid");
			}

			checkUserStatus(request, response, staffId, model);

			final List<ScheduleItem> data = screenplayService
					.listLatestSchedule(staffId, status, version);
			respResult.getData().put("list", data);

			respResult.setCode(0);
		} catch (final Exception e) {
			logger.error("", e);
			respResult.setMsg(e.getMessage());
			respResult.setCode(-1);
		}

		return respResult;
	}

	/**
	 * 查询历史的期表列表
	 *
	 * @param request
	 * @param response
	 * @param staffId
	 * @param status
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/api/schedule_history_list")
	public @ResponseBody CommonResponse listScheduleHistory(
			HttpServletRequest request, HttpServletResponse response,
			String staffId, String version, Model model) throws Exception {
		response.setContentType("application/json; charset=utf-8");
		response.setCharacterEncoding("UTF-8");
		final CommonResponse respResult = new CommonResponse();

		try {
			if (!Utils.staffIdPattern.matcher(staffId).matches()) {
				throw new Exception("invalid staffid");
			}

			checkUserStatus(request, response, staffId, model);

			final List<ScheduleItem> data = screenplayService
					.listScheduleHistory(staffId, version);
			respResult.getData().put("list", data);

			respResult.setCode(0);
		} catch (final Exception e) {
			logger.error("", e);
			respResult.setMsg(e.getMessage());
			respResult.setCode(-1);
		}

		return respResult;
	}

	/**
	 * 查询剧本场次的列表，支持翻页。
	 *
	 * @param request
	 * @param response
	 * @param staffId
	 * @param isPublished
	 * @param dayNight
	 * @param side
	 * @param status
	 * @param beginPage
	 * @param pageSize
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/api/screenplay_list")
	public @ResponseBody CommonResponse listScreenplayRound(
			HttpServletRequest request, HttpServletResponse response,
			String staffId, boolean isPublished,
			@RequestParam(defaultValue = "0") short dayNight,
			@RequestParam(defaultValue = "0") short side,
			@RequestParam(defaultValue = "0") int status,
			@RequestParam(defaultValue = "0") int beginPage,
			@RequestParam(defaultValue = "20") int pageSize, Model model)
			throws Exception {
		response.setContentType("application/json; charset=utf-8");
		response.setCharacterEncoding("UTF-8");
		final CommonResponse respResult = new CommonResponse();

		try {
			if (!Utils.staffIdPattern.matcher(staffId).matches()) {
				throw new Exception("invalid staffid");
			}

			checkUserStatus(request, response, staffId, model);

			final List<ScreenplayRoundItem> data = screenplayService
					.listScreenplayRound(staffId, isPublished, dayNight, side,
							status, beginPage, pageSize);
			respResult.getData().put("list", data);

			respResult.setCode(0);
		} catch (final Exception e) {
			logger.error("", e);
			respResult.setMsg(e.getMessage());
			respResult.setCode(-1);
		}

		return respResult;
	}

	/**
	 * 列出所有的住宿信息表
	 *
	 * @param request
	 * @param response
	 * @param staffId
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/api/list_staff_hotel")
	public @ResponseBody CommonResponse listStaffHotel(
			HttpServletRequest request, HttpServletResponse response,
			String staffId, Model model) throws Exception {
		response.setContentType("application/json; charset=utf-8");
		response.setCharacterEncoding("UTF-8");
		final CommonResponse respResult = new CommonResponse();

		try {
			if (!Utils.staffIdPattern.matcher(staffId).matches()) {
				throw new Exception("invalid staffid");
			}

			checkUserStatus(request, response, staffId, model);

			respResult.getData().put("list",
					hotelService.findStaffHotel(staffId));

			respResult.setCode(0);
		} catch (final Exception e) {
			logger.error("", e);
			respResult.setMsg(e.getMessage());
			respResult.setCode(-1);
		}

		return respResult;
	}

	/**
	 * 列出最新的已上传、未发布的剧本场次数据。
	 *
	 * @param request
	 * @param response
	 * @param staffId
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/api/list_unpublished_juben")
	public @ResponseBody CommonResponse listUnpublishJuBen(
			HttpServletRequest request, HttpServletResponse response,
			String staffId, Model model) throws Exception {
		response.setContentType("application/json; charset=utf-8");
		response.setCharacterEncoding("UTF-8");
		final CommonResponse respResult = new CommonResponse();

		try {
			if (!Utils.staffIdPattern.matcher(staffId).matches()) {
				throw new Exception("invalid staffid");
			}

			checkUserStatus(request, response, staffId, model);
			final List<ScreenplayRound> srs = screenplayService
					.getLatestUnpublishedJuBen(staffId);
			respResult.setCode(0);
			respResult.getData().put("flag", "1");
			respResult.getData().put("upload", srs.size() > 0 ? "1" : "0");
			final Map<String, Object>[] list = new Map[srs.size()];
			respResult.getData().put("flag", "1");
			respResult.getData().put("flag", "1");
			respResult.getData().put("list", list);
			for (int i = 0; i < srs.size(); i++) {
				final Map<String, Object> item = new HashMap<>();
				final ScreenplayRound sr = srs.get(i);
				item.put("id", sr.getId());
				item.put("mode", sr.getMode());
				item.put("round", sr.getRound());
				item.put("scene", sr.getScene());
				item.put("side", sr.getSide());
				item.put("day_night", sr.getDayNight());
				item.put("status", sr.getStatus());
				item.put("diff_p_status", sr.getDiffPStatus());
				item.put("del", sr.getDel());
				item.put("cursor", i);

				list[i] = item;
			}
		} catch (final Exception e) {
			logger.error("", e);
			respResult.setMsg(e.getMessage());
			respResult.setCode(-1);
		}

		return respResult;
	}

	/**
	 * 解析剧本
	 *
	 * @param request
	 * @param response
	 * @param staffId
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/api/parse_juben")
	public @ResponseBody CommonResponse parseJuBen(HttpServletRequest request,
			HttpServletResponse response, String staffId, Model model)
			throws Exception {
		response.setContentType("application/json; charset=utf-8");
		response.setCharacterEncoding("UTF-8");
		final CommonResponse respResult = new CommonResponse();

		try {
			if (!Utils.staffIdPattern.matcher(staffId).matches()) {
				throw new Exception("invalid staffid");
			}

			final UserSessionData usd = checkUserStatus(request, response,
					staffId, model);

			final int version = screenplayService
					.getScreenplayUploadLatestVersionByStaffid(staffId);
			final boolean hasJob = screenplayService.parseJuben(staffId,
					version, usd.getUserId());

			if (hasJob) {
				respResult.setCode(0);
			} else {
				respResult.setCode(-1000);
				respResult.setMsg("没有未解析的剧本");
			}
		} catch (final Exception e) {
			logger.error("", e);
			respResult.setMsg(e.getMessage());
			respResult.setCode(-1);
		}

		return respResult;
	}

	/**
	 * 代理请求，把请求转发到后端，把后端的响应结果返回给调用者。
	 *
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/api/proxy")
	public @ResponseBody Object proxy(HttpServletRequest request,
			HttpServletResponse response, Model model) throws Exception {
		response.setContentType("application/json; charset=utf-8");
		response.setCharacterEncoding("UTF-8");

		final List<NameValuePair> paramsList = new ArrayList<NameValuePair>();
		for (final Map.Entry<String, String[]> entry : request.getParameterMap()
				.entrySet()) {
			final String key = entry.getKey();
			if (key.equals("targetUrl")) {
				continue;
			}

			for (final String value : entry.getValue()) {
				paramsList.add(new BasicNameValuePair(key, value));
			}
		}

		final String targetUrl = request.getParameter("targetUrl");
		if (targetUrl.startsWith("/shootnotice/")
				|| targetUrl.startsWith("/audit/list")
				|| targetUrl.startsWith("/audit/cancel")) {
			final ShootNoticeResponse respResult = callService2(request,
					response, null, targetUrl, paramsList);

			return respResult;
		} else if (targetUrl.startsWith("/staff/addmember")) {
			final CommonResponse respResult = callService(request, response,
					null, targetUrl, paramsList);
			if (respResult.getCode() == 0) {
				// 添加了剧组成员，自动同步到住宿信息表
				final HotelInfo hi = new HotelInfo();
				hi.setGender(Short.parseShort(request.getParameter("gender")));
				hi.setRealname(request.getParameter("realname"));
				hi.setStaffid(request.getHeader("staffId"));
				hi.setMobile(request.getParameter("mobile"));
			}

			return respResult;
		} else if (targetUrl.startsWith("/staff/create")) {
			final CommonResponse respResult = callService(request, response,
					null, targetUrl, paramsList);
			if (respResult.getCode() == 0) {
				// 添加了剧组成员，自动同步到住宿信息表
				final String staffId = (String) respResult.getData()
						.get("staffid");
				createNda(staffId);
			}

			return respResult;
		}

		final CommonResponse respResult = callService(request, response, null,
				targetUrl, paramsList);

		return respResult;
	}

	/**
	 * 发布剧本
	 *
	 * @param request
	 * @param response
	 * @param staffId
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/api/publish_juben")
	public @ResponseBody CommonResponse publishJuBen(HttpServletRequest request,
			HttpServletResponse response, String staffId, Model model)
			throws Exception {
		response.setContentType("application/json; charset=utf-8");
		response.setCharacterEncoding("UTF-8");
		final CommonResponse respResult = new CommonResponse();

		try {
			if (!Utils.staffIdPattern.matcher(staffId).matches()) {
				throw new Exception("invalid staffid");
			}

			final UserSessionData usd = checkUserStatus(request, response,
					staffId, model);

			final boolean shouldNotify = screenplayService
					.publishJuBen(usd.getUserId(), staffId);
			if (shouldNotify) {
				final List<NameValuePair> paramsList = new ArrayList<NameValuePair>();
				paramsList.add(new BasicNameValuePair("staffid", staffId));
				final CommonResponse respObj = callInternalService(
						"staffviewscreenplayuser", paramsList);
				final List<String> userIds = (List<String>) respObj.getData()
						.get("userids");

				paramsList.clear();
				paramsList.add(new BasicNameValuePair("staffid", staffId));
				paramsList
						.add(new BasicNameValuePair("userid", usd.getUserId()));
				paramsList.add(
						new BasicNameValuePair("username", usd.getRealname()));
				paramsList.add(new BasicNameValuePair("title",
						request.getSession().getAttribute("staffName")
								+ "剧组新剧本通知"));
				paramsList.add(new BasicNameValuePair("receiver", "相关人员"));
				paramsList.add(new BasicNameValuePair("receiverid",
						Utils.collection2String(userIds, ",")));
				paramsList.add(new BasicNameValuePair("type", "1"));
				paramsList.add(new BasicNameValuePair("content", "有新剧本发布，请查看"));
				callService(request, response, model, "/notice/add",
						paramsList);

				respResult.setCode(0);
			} else {
				respResult.setCode(-1000);
				respResult.setMsg("没有未发布的剧本");
			}
		} catch (final Exception e) {
			logger.error("", e);
			respResult.setMsg(e.getMessage());
			respResult.setCode(-1);
		}

		return respResult;
	}

	/**
	 * 保存住宿信息表的单条记录
	 *
	 * @param request
	 * @param response
	 * @param hid
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/api/save_hotel_info")
	public @ResponseBody CommonResponse saveHotelInfo(
			HttpServletRequest request, HttpServletResponse response,
			@RequestBody HotelInfoData hid, Model model) throws Exception {
		response.setContentType("application/json; charset=utf-8");
		response.setCharacterEncoding("UTF-8");
		final CommonResponse respResult = new CommonResponse();

		try {
			if (!Utils.staffIdPattern.matcher(hid.getStaffId()).matches()) {
				throw new Exception("invalid staffid");
			}

			checkUserStatus(request, response, hid.getStaffId(), model);

			hotelService.saveHotelInfo(hid.getStaffId(), hid);

			respResult.setCode(0);
		} catch (final Exception e) {
			logger.error("", e);
			respResult.setMsg(e.getMessage());
			respResult.setCode(-1);
		}

		return respResult;
	}

	/**
	 * 保存剧本内容
	 *
	 */
	/**
	 * @param request
	 * @param response
	 * @param staffId
	 * @param id
	 * @param mode
	 * @param round
	 * @param scene
	 * @param side
	 * @param dayNight
	 * @param content
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/api/save_screenplay_round")
	public @ResponseBody CommonResponse saveScreenplayRound(
			HttpServletRequest request, HttpServletResponse response,
			String staffId, @RequestParam(defaultValue = "0") int id,
			@RequestParam(defaultValue = "0") int mode, String round,
			String scene, short side, short dayNight, String content,
			String mainRole, String actor, String summary, Model model)
			throws Exception {
		response.setContentType("application/json; charset=utf-8");
		response.setCharacterEncoding("UTF-8");
		final CommonResponse respResult = new CommonResponse();

		try {
			if (!Utils.staffIdPattern.matcher(staffId).matches()) {
				throw new Exception("invalid staffid");
			}

			checkUserStatus(request, response, staffId, model);

			screenplayService.saveScreenplayRound(staffId, id, mode, round,
					scene, side, dayNight, content, mainRole, actor, summary);

			respResult.setCode(0);
		} catch (final Exception e) {
			logger.error("", e);
			respResult.setMsg(e.getMessage());
			respResult.setCode(-1);
		}

		return respResult;
	}

	/**
	 * 搜索剧组成员
	 *
	 * @param request
	 * @param response
	 * @param staffId
	 * @param inStatus
	 *            在组状态：-2 全部 在组状态：1离组 2在组 3 拒绝 4 邀请中
	 * @param privilege
	 *            权限 -2 全部 0创建者 1管理员 2其它成员
	 * @param canViewScreenplay
	 *            是否可看全部剧本 -2全部 1否 2是
	 * @param team
	 *            部门名称
	 * @param keyword
	 *            关键字
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/api/search_staff_member")
	public @ResponseBody CommonResponse searchStaffMember(
			HttpServletRequest request, HttpServletResponse response,
			String staffId, short inStatus, int privilege,
			int canViewScreenplay, String team, String keyword, Model model)
			throws Exception {
		response.setContentType("application/json; charset=utf-8");
		response.setCharacterEncoding("UTF-8");
		final CommonResponse respResult = new CommonResponse();

		try {
			if (!Utils.staffIdPattern.matcher(staffId).matches()) {
				throw new Exception("invalid staffid");
			}

			checkUserStatus(request, response, staffId, model);

			int isCreate = -2;
			int isAdmin = -2;
			switch (privilege) {
				case 0:
					isCreate = 2;
					break;
				case 1:
					isAdmin = 2;
					break;
				case 2:
					isCreate = 1;
					isAdmin = 1;
					break;
				default:
					isCreate = -2;
					isAdmin = -2;
					break;
			}

			respResult.getData().put("list",
					staffMemberService.search(staffId, inStatus, isCreate,
							isAdmin, canViewScreenplay, team, keyword));

			respResult.setCode(0);
		} catch (final Exception e) {
			logger.error("", e);
			respResult.setMsg(e.getMessage());
			respResult.setCode(-1);
		}

		return respResult;
	}

	/**
	 * 剧本首页
	 *
	 * @param request
	 * @param response
	 * @param staffId
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/web/staff_home")
	public String staffHome(HttpServletRequest request,
			HttpServletResponse response, String staffId, Model model)
			throws Exception {
		if (!Utils.staffIdPattern.matcher(staffId).matches()) {
			throw new Exception("invalid staffid");
		}

		final UserSessionData usd = (UserSessionData) request.getSession(true)
				.getAttribute("usd");
		if ((usd == null) || StringUtils.isEmpty(usd.getUserId())) {
			return "web/login";
		} else {
			//取剧组名称并保存到会话中
			final String staffName = staffMemberService
					.getNameFromStaff(staffId);
			request.getSession().setAttribute("staffName", staffName);
		}

		if (usd != null) {
			model.addAttribute("staffName",
					request.getSession().getAttribute("staffName"));
			model.addAttribute("userId", usd.getUserId());
			if (StringUtils.isNotEmpty(request.getParameter("staffId"))) {
				model.addAttribute("staffId", request.getParameter("staffId"));
			}
		}
		for (final Entry<String, String[]> entry : request.getParameterMap()
				.entrySet()) {
			model.addAttribute(entry.getKey(), entry.getValue()[0]);
		}

		return request.getServletPath();
	}

	/**
	 * 查询历史的期表总结
	 *
	 * @param request
	 * @param response
	 * @param staffId
	 * @param status
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/api/schedule_history_summary")
	public @ResponseBody CommonResponse summaryScheduleHistory(
			HttpServletRequest request, HttpServletResponse response,
			String staffId, Model model) throws Exception {
		response.setContentType("application/json; charset=utf-8");
		response.setCharacterEncoding("UTF-8");
		final CommonResponse respResult = new CommonResponse();

		try {
			if (!Utils.staffIdPattern.matcher(staffId).matches()) {
				throw new Exception("invalid staffid");
			}

			checkUserStatus(request, response, staffId, model);

			final List<ScheduleHistorySummaryItem> data = screenplayService
					.summaryScheduleHistory(staffId);
			respResult.getData().put("list", data);

			respResult.setCode(0);
		} catch (final Exception e) {
			logger.error("", e);
			respResult.setMsg(e.getMessage());
			respResult.setCode(-1);
		}

		return respResult;
	}

	/**
	 * 更新住宿信息表的内容
	 *
	 * @param request
	 * @param response
	 * @param staffId
	 * @param id
	 * @param name
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/api/update_staff_hotel")
	public @ResponseBody CommonResponse updateStaffHotel(
			HttpServletRequest request, HttpServletResponse response,
			String staffId, int id, String name, Model model) throws Exception {
		response.setContentType("application/json; charset=utf-8");
		response.setCharacterEncoding("UTF-8");
		final CommonResponse respResult = new CommonResponse();

		try {
			if (!Utils.staffIdPattern.matcher(staffId).matches()) {
				throw new Exception("invalid staffid");
			}

			checkUserStatus(request, response, staffId, model);

			final StaffHotel sh = hotelService.getStaffHotel(id);
			if (!sh.getStaffid().equals(staffId)) {
				throw new Exception("invalid staffid");
			}

			sh.setName(name);
			hotelService.saveStaffHotel(sh);

			respResult.setCode(0);
		} catch (final Exception e) {
			logger.error("", e);
			respResult.setMsg(e.getMessage());
			respResult.setCode(-1);
		}

		return respResult;
	}

	/**
	 * 上传剧本文件
	 *
	 * @param request
	 * @param response
	 * @param staffId
	 * @param jiId
	 * @param juBenFile
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/api/upload_juben")
	public @ResponseBody CommonResponse uploadJuBen(HttpServletRequest request,
			HttpServletResponse response, String staffId,
			@RequestParam(defaultValue = "0") int jiId, MultipartFile juBenFile,
			Model model) throws Exception {
		response.setContentType("application/json; charset=utf-8");
		response.setCharacterEncoding("UTF-8");
		final CommonResponse respResult = new CommonResponse();

		logger.debug("uploadJuBen, staffId:{}, jiId:{}, file:{}", staffId, jiId,
				juBenFile.getOriginalFilename());

		try {
			if (!Utils.staffIdPattern.matcher(staffId).matches()) {
				throw new Exception("invalid staffid");
			}

			final UserSessionData usd = checkUserStatus(request, response,
					staffId, model);

			int version;
			if (jiId == 0) {
				version = screenplayService
						.getNextScreenplayUploadVersion(staffId);
			} else {
				version = screenplayService
						.getScreenplayUploadLatestVersionByStaffid(staffId);
			}

			if (!juBenFile.getOriginalFilename().endsWith(".doc")
					&& !juBenFile.getOriginalFilename().endsWith(".docx")
					&& !juBenFile.getOriginalFilename().endsWith(".pdf")
					&& !juBenFile.getOriginalFilename().endsWith(".zip")) {
				throw new Exception("invalid file type");
			}

			final List<NameValuePair> paramsList = new ArrayList<NameValuePair>();
			paramsList.add(new BasicNameValuePair("staffid", staffId));
			final CommonResponse respObj = callService(request, response, model,
					"/staff/detail", paramsList);
			if (respObj.getCode() != 0) {
				return respObj;
			}

			final Map<String, Object> data = respObj.getData();
			final int juBenType = Integer
					.parseInt(data.get("screenplay_type").toString());
			if ((juBenType == 1) && ((jiId != 0)
					|| juBenFile.getOriginalFilename().endsWith(".zip"))) {
				throw new Exception("此剧本不支持分集或多个文件, 收到的文件名："
						+ juBenFile.getOriginalFilename());
			} else if ((juBenType == 2) && (jiId == 0)
					&& !juBenFile.getOriginalFilename().endsWith(".zip")) {
				throw new Exception("多集剧本，请传输压缩文件, 收到的文件名："
						+ juBenFile.getOriginalFilename());
			}

			final Map<Integer, String> files = new HashMap<>(100);
			if (juBenFile.getOriginalFilename().endsWith(".zip")) {
				if ((juBenType == 2) && (jiId != 0)) {
					throw new Exception("单集剧本不支持多文件, 上传文件名："
							+ juBenFile.getOriginalFilename());
				}

				final File zipFile = File.createTempFile("juben_", "zip");
				juBenFile.transferTo(zipFile);
				final String folderPath = String.format("%s/%s/%s/", juBenPath,
						staffId, version);
				new File(folderPath).mkdirs();
				try {
					ZipUtils.decompress(zipFile, folderPath);
				} finally {
					zipFile.delete();
				}

				final File folder = new File(folderPath);
				for (final File fileItem : folder.listFiles(
						(FilenameFilter) (dir, name) -> name.endsWith(".doc")
								|| name.endsWith(".docx")
								|| name.endsWith(".pdf"))) {
					final int currentJiId = Utils
							.getJiIdFromName(fileItem.getName());
					if (currentJiId <= 0) {
						throw new Exception(
								"无法从文件名(" + fileItem.getName() + ")中判断是第几集");
					}
					files.put(currentJiId, fileItem.getAbsolutePath());
				}

				if ((juBenType == 2) && (jiId == 0) && (files.size() <= 1)) {
					throw new Exception(
							"多集剧本，不支持单个文件。请按集组织剧本文件。收到的文件数量：" + files.size());
				}
			} else {
				final String filePath = String.format("%s/%s/%s/%s", juBenPath,
						staffId, version, juBenFile.getOriginalFilename());
				final File destFile = new File(filePath);
				ZipUtils.fileProber(destFile);
				juBenFile.transferTo(destFile);

				files.put(jiId, filePath);
			}

			screenplayService.saveJuBenFile(usd.getUserId(), staffId, version,
					files);

			respResult.getData().put("juBenType", juBenType);

			final List<ScreenplayUpload> sus = screenplayService
					.findScreenplayUpload(staffId, version);

			final Map<String, Object>[] items = new Map[sus.size()];
			for (int i = 0; i < items.length; i++) {
				final HashMap<String, Object> item = new HashMap<>();
				items[i] = item;
				final ScreenplayUpload su = sus.get(i);

				item.put("ji", su.getMode());
				item.put("fileName", new File(su.getFilepath()).getName());
			}
			respResult.getData().put("items", items);

			respResult.setCode(0);
		} catch (final Exception e) {
			logger.error("", e);
			respResult.setMsg(e.getMessage());
			respResult.setCode(-1);
		}

		return respResult;
	}
}