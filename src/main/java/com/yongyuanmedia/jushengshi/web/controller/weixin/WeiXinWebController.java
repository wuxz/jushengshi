/**
 *
 */
package com.yongyuanmedia.jushengshi.web.controller.weixin;

import java.net.URLDecoder;
import java.net.URLEncoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.plexus.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.yongyuanmedia.jushengshi.db.entities.UserAccount;
import com.yongyuanmedia.jushengshi.service.JssServiceException;
import com.yongyuanmedia.jushengshi.service.UserService;
import com.yongyuanmedia.jushengshi.service.WeiXinService;
import com.yongyuanmedia.jushengshi.util.AccessTokenHolder;
import com.yongyuanmedia.jushengshi.util.Constants;
import com.yongyuanmedia.jushengshi.web.controller.api.UserSessionData;
import com.yongyuanmedia.jushengshi.web.controller.weixin.pojo.SNSUserInfo;
import com.yongyuanmedia.jushengshi.web.controller.weixin.pojo.WeixinOauth2Token;
import com.yongyuanmedia.jushengshi.web.controller.weixin.pojo.WeixinUserInfo;

/**
 * @author wuxz
 *
 */
@Controller
@RequestMapping("/weixin")
public class WeiXinWebController {
	static final Logger logger = LoggerFactory
			.getLogger(WeiXinWebController.class);

	public static SNSUserInfo getCurrentUserInfo(HttpServletRequest request,
			HttpServletResponse response) {
		final String code = request.getParameter("code"); // 用户同意授权
		if (!"authdeny".equals(code)) {
			// 获取网页授权access_token
			final WeixinOauth2Token weixinOauth2Token = AdvancedUtil
					.getOauth2AccessToken(AccessTokenHolder.appId,
							AccessTokenHolder.secret, code);
			// 网页授权接口访问凭证
			final String accessToken = weixinOauth2Token.getAccessToken();
			// 用户标识
			final String openId = weixinOauth2Token.getOpenId();
			// 获取用户信息
			final SNSUserInfo snsUserInfo = AdvancedUtil
					.getSNSUserInfo(accessToken, openId); // 设置要传递的参数

			logger.info(
					"weixin oauth succeeded, openId:{}, nicheng:{}, touxiang:{}, unionid:{}",
					openId, snsUserInfo.getNickname(),
					snsUserInfo.getHeadImgUrl(), snsUserInfo.getUnionId());

			return snsUserInfo;
		}

		return null;
	}

	@Autowired
	private WeiXinService wxService;

	@Autowired
	UserService userService;

	/**
	 * 是否为测试模式
	 */
	@Value("${test_mode}")
	private String testMode;

	@RequestMapping(value = { "/bind_mobile" })
	public String bindMobile(HttpServletRequest request, Model model)
			throws Exception {
		return process(request, model);
	}

	private String getCurrentUserOpenId(HttpServletRequest request,
			HttpServletResponse response) {
		final String code = request.getParameter("code"); // 用户同意授权
		if ((code != null) && !"authdeny".equals(code)) {
			// 获取网页授权access_token
			final WeixinOauth2Token weixinOauth2Token = AdvancedUtil
					.getOauth2AccessToken(AccessTokenHolder.appId,
							AccessTokenHolder.secret, code);
			// 用户标识
			final String openId = weixinOauth2Token.getOpenId();

			logger.info("weixin oauth base succeeded, openId:{}", openId);

			return openId;
		}

		return null;
	}

	private boolean isUserSubscribed(String openId) {
		final String token = wxService.getToken();
		final WeixinUserInfo userInfo = AdvancedUtil.getUserInfo(token, openId);
		return (userInfo != null) && (userInfo.getSubscribe() > 0);
	}

	@RequestMapping(value = { "/invite_list" })
	public String listInvite(HttpServletRequest request, Model model)
			throws Exception {
		return process(request, model);
	}

	@RequestMapping(value = { "/login" })
	public String login(HttpServletRequest request, Model model)
			throws Exception {
		return "weixin_login";
	}

	/**
	 * 统一处理用户请求。<br>
	 * 先验证用户是否已经登录，如果未登录则重定向到微信授权页面。否则返回用户指定的URL对应的JSP页面。<br>
	 * 支持测试模式
	 *
	 * @param request
	 * @param model
	 * @return
	 */
	private String process(HttpServletRequest request, Model model) {
		String state = request.getQueryString();
		final String page = request.getServletPath();
		try {
			UserSessionData usd = (UserSessionData) request.getSession(true)
					.getAttribute("usd");
			final String staffId = request.getParameter("staffId");
			if (usd == null) {
				if ("pc".equals(testMode)) {
					logger.debug("using pc testmode");

					usd = new UserSessionData();
					usd.setRealname("wuxz");
					usd.setMobile("13901234567");
					usd.setUserId("1611870062105869");
					usd.setOpenId("oMGcewJN6Ir1mOVNHFDD945Xlhyc");
					request.getSession(true).setAttribute("usd", usd);
				} else {
					if (state == null) {
						state = "";
					}
					final String url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5320a5f3041984d5&redirect_uri=http%3A%2F%2F"
							+ "service.jushengshier.com%2Fweixin%2Fcallback&response_type=code&scope=snsapi_base&state="
							+ URLEncoder.encode(page + "?" + state, "UTF-8")
							+ "#wechat_redirect";

					logger.debug("redirect to weixin auth, url:{}", url);

					return "redirect:" + url;
				}
			}

			model.addAttribute("userData", usd);
			model.addAttribute("staffId", staffId);

			return page;
		} catch (final JssServiceException zse) {
			model.addAttribute("errorMsg", zse.reason);
			model.addAttribute("exception", zse);
			logger.error("error", zse);

			return "weixin_error";
		} catch (final Throwable e) {
			model.addAttribute("errorMsg", e.getMessage());
			model.addAttribute("exception", e);
			logger.error("error", e);

			return "weixin_error";
		}
	}

	@RequestMapping(value = { "/tong_gao" })
	public String tongGaoXiangQing(HttpServletRequest request, String staffId,
			int tongGaoId, Model model) throws Exception {
		return process(request, model);
	}

	@RequestMapping(value = { "/callback" })
	public String weiXinOAuthCallback(HttpServletRequest request, String state,
			HttpServletResponse response, Model model) throws Exception {
		try {
			logger.debug("weixin oauth callback, queryString={}, body={}",
					request.getQueryString(), request.getReader().readLine());
			String line;
			while ((line = request.getReader().readLine()) != null) {
				logger.debug("weixin oauth callback body continue:{}", line);
			}

			final String echostr = request.getParameter("echostr");
			if (StringUtils.isNotEmpty(echostr)) {
				response.getWriter().write(echostr);
				response.getWriter().flush();

				return null;
			}

			final String openId = getCurrentUserOpenId(request, response);
			logger.debug("got openid:{}", openId);
			if ((openId == null) || !isUserSubscribed(openId)) {
				throw new JssServiceException(Constants.STATUS_EXCEPTION,
						"您没有关注剧省事儿的公众号，无法进行更多操作！");
			}

			UserAccount ua = userService.findByWxOpenId(openId);
			if (ua == null) {
				if ("weixin".equals(testMode)) {
					logger.debug("using weixin testmode");

					ua = new UserAccount();
					ua.setAccount("wuxz");
					ua.setBindmobile("13901234567");
					ua.setUserid("userid");
				} else {
					return "redirect:/login";
				}
			}

			final UserSessionData usd = new UserSessionData();
			usd.setMobile(ua.getBindmobile());
			usd.setRealname(ua.getAccount());
			usd.setOpenId(openId);
			usd.setUserId(ua.getBinduserid());

			request.getSession(true).setAttribute("usd", usd);

			return "redirect:" + URLDecoder.decode(state, "UTF-8");
		} catch (final JssServiceException zse) {
			model.addAttribute("errorMsg", zse.reason);
			model.addAttribute("exception", zse);
			logger.error("error", zse);

			return "weixin_error";
		} catch (final Throwable e) {
			model.addAttribute("errorMsg", e.getMessage());
			model.addAttribute("exception", e);
			logger.error("error", e);

			return "weixin_error";
		}
	}
}
