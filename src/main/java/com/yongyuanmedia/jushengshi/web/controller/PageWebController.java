/**
 *
 */
package com.yongyuanmedia.jushengshi.web.controller;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.Date;
import java.util.Enumeration;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.google.common.io.Files;
import com.yongyuanmedia.jushengshi.db.entities.StaffHotel;
import com.yongyuanmedia.jushengshi.service.HotelService;
import com.yongyuanmedia.jushengshi.util.Utils;
import com.yongyuanmedia.jushengshi.web.controller.api.UserSessionData;

/**
 * @author wuxz
 *
 */
@Controller
@RequestMapping({ "/web" })
public class PageWebController {
	static final Logger logger = LoggerFactory
			.getLogger(PageWebController.class);

	@Autowired
	HotelService hotelService;

	@Value("${nda.path.pattern}")
	private String ndaPathTemplate;

	@RequestMapping(value = "/after_juben_upload")
	public String afterJuBenUpload(HttpServletRequest request,
			HttpServletResponse response, String staffId, Model model)
			throws Exception {
		if (!Utils.staffIdPattern.matcher(staffId).matches()) {
			throw new Exception("invalid staffid");
		}

		final String target = checkUserStatus(request, response, model);
		if (target != null) {
			return target;
		}

		return request.getServletPath();
	}

	private String checkUserStatus(HttpServletRequest request,
			HttpServletResponse response, Model model) {
		if (StringUtils.isNotEmpty(request.getHeader("userId"))
				&& StringUtils.isNotEmpty(request.getHeader("userToken"))) {
			return null;
		}

		final String uri = request.getRequestURI();
		if (uri.equals("/web/login")) {
			return "/web/login";
		}

		final UserSessionData usd = (UserSessionData) request.getSession(true)
				.getAttribute("usd");
		if ((usd == null) || StringUtils.isEmpty(usd.getUserId())) {
			return "redirect:/web/login";
		}

		model.addAttribute("userId", usd.getUserId());
		model.addAttribute("mobile", usd.getMobile());
		if (StringUtils.isNotEmpty(request.getParameter("staffId"))) {
			model.addAttribute("staffId", request.getParameter("staffId"));
		}

		return null;
	}

	@RequestMapping(value = "/create_staff_hotel")
	public String createStaffHotel(HttpServletRequest request,
			HttpServletResponse response, String staffId, Model model)
			throws Exception {
		if (!Utils.staffIdPattern.matcher(staffId).matches()) {
			throw new Exception("invalid staffid");
		}

		final String target = checkUserStatus(request, response, model);
		if (target != null) {
			return target;
		}

		StaffHotel sh = new StaffHotel();
		sh.setCdate(new Date());
		sh.setName("未命名住宿信息表");
		sh.setStaffid(staffId);
		sh = hotelService.saveStaffHotel(sh);

		hotelService.importHotelInfo(staffId, sh.getId());

		return "redirect:/web/staff_hotel_edit?staffId=" + staffId
				+ "&staffHotelId=" + sh.getId();
	}

	@RequestMapping(value = "/feedback")
	public String feedback(HttpServletRequest request,
			HttpServletResponse response, Model model) throws Exception {
		final String target = checkUserStatus(request, response, model);
		if (target != null) {
			return target;
		}

		for (final Enumeration<String> enumHeader = request
				.getHeaderNames(); enumHeader.hasMoreElements();) {
			final String headerName = enumHeader.nextElement();
			model.addAttribute(headerName, request.getHeader(headerName));
		}

		return request.getServletPath();
	}

	@RequestMapping(value = "/nda")
	public String nda(HttpServletRequest request, HttpServletResponse response,
			String staffId, Model model) throws Exception {
		if (!Utils.staffIdPattern.matcher(staffId).matches()) {
			throw new Exception("invalid staffid");
		}

		final String target = checkUserStatus(request, response, model);
		if (target != null) {
			return target;
		}

		for (final Entry<String, String[]> entry : request.getParameterMap()
				.entrySet()) {
			model.addAttribute(entry.getKey(), entry.getValue()[0]);
		}

		final File ndaFile = new File(String.format(ndaPathTemplate, staffId));
		final StringBuffer sb = new StringBuffer();
		if (!ndaFile.exists()) {
			final String ndaFilePath = String.format(ndaPathTemplate, staffId);
			final String ndaSource = ndaFilePath.substring(0,
					ndaFilePath.lastIndexOf("/")) + "/nda.html";
			Files.copy(new File(ndaSource), new File(ndaFilePath));
		}

		if (ndaFile.exists()) {
			final BufferedReader bfr = new BufferedReader(new InputStreamReader(
					new FileInputStream(ndaFile), "UTF-8"));
			try {
				String line = bfr.readLine();
				while (line != null) {
					sb.append(line);
					sb.append(System.lineSeparator());
					line = bfr.readLine();
				}
			} finally {
				bfr.close();
			}
		}

		model.addAttribute("zhengWen", sb.toString());

		return request.getServletPath();
	}

	@RequestMapping(value = "/*")
	public String page(HttpServletRequest request, HttpServletResponse response,
			Model model) throws Exception {
		final String target = checkUserStatus(request, response, model);
		if (target != null) {
			return target;
		}

		for (final Entry<String, String[]> entry : request.getParameterMap()
				.entrySet()) {
			model.addAttribute(entry.getKey(), entry.getValue()[0]);
		}

		return request.getServletPath();
	}

	@RequestMapping(value = "/nda/save")
	public String saveNda(HttpServletRequest request,
			HttpServletResponse response, String staffId, String zhengWen,
			Model model) throws Exception {
		if (!Utils.staffIdPattern.matcher(staffId).matches()) {
			throw new Exception("invalid staffid");
		}

		if (zhengWen.toLowerCase().contains("<script")
				|| zhengWen.toLowerCase().contains("<object")) {
			throw new Exception("invalid content");
		}

		final String target = checkUserStatus(request, response, model);
		if (target != null) {
			return target;
		}

		final File ndaFile = new File(String.format(ndaPathTemplate, staffId));
		final BufferedWriter bfr = new BufferedWriter(
				new OutputStreamWriter(new FileOutputStream(ndaFile), "UTF-8"));
		try {
			bfr.write("<html>\r\n" + "<head>\r\n"
					+ "<meta charset=\"UTF-8\">\r\n"
					+ "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n"
					+ "<meta name=\"description\" content=\"\">\r\n"
					+ "<meta name=\"author\" content=\"\">\r\n" + "<body>");
			bfr.write(zhengWen);
			bfr.write("</body>\r\n" + "</html>");
		} finally {
			bfr.close();
		}

		return "redirect:/web/staff_home";
	}
}
