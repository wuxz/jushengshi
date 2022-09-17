/**
 *
 */
package com.yongyuanmedia.jushengshi.web.controller.api;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yongyuanmedia.jushengshi.service.MessageService;
import com.yongyuanmedia.jushengshi.vo.CommonResponse;

/**
 * @author wuxz
 *
 */
@Controller
@RequestMapping("/service")
public class MessageWebController {
	static final Logger logger = LoggerFactory
			.getLogger(MessageWebController.class);

	@Autowired
	MessageService msgService;

	/**
	 * 限制访问的客户端IP列表，逗号分隔。
	 */
	@Value("${client_ip}")
	private String clientIp;

	private Set<String> clientIps;

	@PostConstruct
	private void init() {
		clientIps = new HashSet<>();
		if (clientIp == null) {
			return;
		}

		for (final String ip : clientIp.split(",")) {
			clientIps.add(ip);
		}
	}

	@RequestMapping(value = "/message")
	public @ResponseBody CommonResponse sendMessage(HttpServletRequest request,
			HttpServletResponse response,
			@RequestParam(defaultValue = "") String userIds,
			@RequestParam(defaultValue = "") String mobiles,
			@RequestParam(defaultValue = "0") int type, String title,
			String content, @RequestParam(defaultValue = "0") int dataId,
			String extra, @RequestParam(defaultValue = "0") int badge,
			Model model) throws Exception {
		response.setContentType("application/json; charset=utf-8");
		response.setCharacterEncoding("UTF-8");
		final CommonResponse result = new CommonResponse();
		if ((clientIp != null) && (clientIps.size() > 0)
				&& !clientIps.contains(request.getRemoteHost())) {
			logger.warn("invalid client ip:{}", request.getRemoteHost());
			//			response.sendError(403);
			//
			//			return null;
		}

		try {
			final List<String> userIdList = new ArrayList<>();
			for (final String id : userIds.split(",")) {
				userIdList.add(id);
			}

			final List<String> mobileList = new ArrayList<>();
			for (final String id : mobiles.split(",")) {
				mobileList.add(id);
			}

			final Map<String, Object> resultData = msgService.sendMessage(
					userIdList, mobileList, type, title, content, dataId, extra,
					badge);
			result.setCode(0);
			result.setMsg("OK");
			result.setData(resultData);

			return result;
		} catch (final Throwable e) {
			logger.error("proxy exception, target:{}",
					request.getParameter("targetUrl"), e);

			result.setCode(-2);
			result.setMsg(e.getMessage());

			return result;
		}
	}
}
