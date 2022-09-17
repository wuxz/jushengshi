package com.yongyuanmedia.jushengshi.service.sms.httpclient;

import java.util.ArrayList;
import java.util.List;

import org.apache.http.NameValuePair;
import org.apache.log4j.Logger;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

import com.yongyuanmedia.jushengshi.service.sms.bean.Mo;
import com.yongyuanmedia.jushengshi.service.sms.bean.StatusReport;

public class SDKHttpClient {
	static Logger logger = Logger.getLogger(SDKHttpClient.class);

	// 获取余额
	public static String getBalance(String url, String param) {
		String ret = "失败";
		url = url + "?" + param;
		// logger.info("【SDKHttpClient】Balance->"+url);
		String responseString = HttpClientUtil.getInstance().doGetRequest(url);
		responseString = responseString.trim();
		if ((null != responseString) && !"".equals(responseString)) {
			ret = xmlResponse(responseString);
		}
		return ret;
	}

	// 获取mo
	public static List<Mo> getMos(String url, String sn, String key) {
		final List<Mo> _Mos = new ArrayList<Mo>();

		if ("".equals(url)) {
			return _Mos;
		}
		final String param = "cdkey=" + sn + "&password=" + key;
		url = url + "?" + param;
		System.out.println("【SDKHttpClient】Request-Url:" + url);
		HttpClientUtil.getInstance();
		String responseString = HttpClientUtil.getInstance().doGetRequest(url);

		responseString = responseString.trim();
		if ((null != responseString) && !"".equals(responseString)) {
			final List<Element> elements = xmlDoc(responseString);
			for (final Element element : elements) {
				if (null != element) {
					logger.debug("【SDKHttpClient】上行请求->" + responseString);
					final Mo mo = new Mo();
					mo.setMobileNumber(element.elementText("srctermid"));
					mo.setSmsContent(element.elementText("msgcontent"));
					mo.setAddSerial(element.elementText("addSerial"));
					mo.setAddSerialRev(element.elementText("addSerialRev"));
					mo.setSentTime(element.elementText("sendTime"));
					_Mos.add(mo);
				}
			}
		}
		return _Mos;
	}

	// 获取report
	public static List<StatusReport> getReports(String url, String sn,
			String key) {
		final List<StatusReport> _Reports = new ArrayList<StatusReport>();
		if ("".equals(url)) {
			return _Reports;
		}
		final String param = "cdkey=" + sn + "&password=" + key;
		url = url + "?" + param;
		logger.debug("【SDKHttpClient】Request-Url:" + url);
		String responseString = HttpClientUtil.getInstance().doGetRequest(url);
		responseString = responseString.trim();
		if ((null != responseString) && !"".equals(responseString)) {
			final List<Element> elements = xmlDoc(responseString);
			for (final Element element : elements) {
				if (null != element) {
					logger.debug("【SDKHttpClient】REPORT->"
							+ element.elementText("seqid"));
					final StatusReport report = new StatusReport();
					report.setMobile(element.elementText("srctermid"));
					report.setErrorCode(element.elementText("state"));
					report.setSeqID(
							Long.parseLong(element.elementText("seqid")));
					report.setReceiveDate(element.elementText("receiveDate"));
					report.setSubmitDate(element.elementText("submitDate"));
					report.setServiceCodeAdd(
							element.elementText("addSerialRev"));
					_Reports.add(report);
				}
			}

		}
		return _Reports;
	}

	public static void main(String[] args) {
		final String url = "http://sdk4report.eucp.b2m.cn:8080/sdkproxy/querybalance.action";
		final String param = "cdkey=6SDK-EKF-6687-KHQPL&password=795836";
		final String result = SDKHttpClient.getBalance(url, param);
		System.out.println(result);
	}

	// 注册、注销
	public static String registAndLogout(String url, String param) {
		String ret = "失败";
		url = url + "?" + param;
		System.out.println("【SDKHttpClient】发送请求到SDK->" + url);
		String responseString = HttpClientUtil.getInstance().doGetRequest(url);
		responseString = responseString.trim();
		if ((null != responseString) && !"".equals(responseString)) {
			ret = xmlResponseForRegist(responseString);
		}
		return ret;
	}

	// 下发
	public static String sendSMS(String url, List<NameValuePair> paramsList)
			throws Exception {
		String ret = "";
		System.out.println("【SDKHttpClient】发送MT到SDK->" + url);
		String responseString = HttpClientUtil.getInstance().doPostRequest(url,
				paramsList);
		responseString = responseString.trim();
		if ((null != responseString) && !"".equals(responseString)) {
			ret = xmlMt(responseString);
		}
		return ret;
	}

	// 下发
	public static String sendSMS(String url, String param) throws Exception {
		String ret = "";
		url += "?" + param;
		System.out.println("【SDKHttpClient】发送MT到SDK->" + url);
		String responseString = HttpClientUtil.getInstance().doGetRequest(url);
		responseString = responseString.trim();
		if ((null != responseString) && !"".equals(responseString)) {
			ret = xmlMt(responseString);
		}
		return ret;
	}

	// 解析状态、上行
	@SuppressWarnings("unchecked")
	private static List<Element> xmlDoc(String response) {
		Document document = null;
		try {
			document = DocumentHelper.parseText(response);
		} catch (final DocumentException e) {
			e.printStackTrace();
			return null;
		}
		final Element root = document.getRootElement();
		final List<Element> list = root.elements();
		final List<Element> elemets = new ArrayList<>();
		// 增强for循环来遍历所有的U8ArrivalVouch节点
		for (final Element element : list) {
			final String message = element.getName();
			if ("message".equalsIgnoreCase(message)) {
				if (element.elements().size() > 0) {
					// System.out.println("--------------------"+element.elements().size());
					elemets.add(element);
				}
			}

		}
		return elemets;
	}

	// 解析下发response
	public static String xmlMt(String response) {
		String result = "0";
		Document document = null;
		try {
			document = DocumentHelper.parseText(response);
		} catch (final DocumentException e) {
			e.printStackTrace();
			result = "-250";
		}
		final Element root = document.getRootElement();
		result = root.elementText("error");
		if ((null == result) || "".equals(result)) {
			result = "-250";
		}
		return result;
	}

	// 统一解析格式
	public static String xmlResponse(String response) {
		String result = "失败";
		Document document = null;
		try {
			document = DocumentHelper.parseText(response);
		} catch (final DocumentException e) {
			e.printStackTrace();
		}
		final Element root = document.getRootElement();
		result = root.elementText("message");
		return result;
	}

	// 解析注册注销响应
	public static String xmlResponseForRegist(String response) {
		String result = "失败";
		Document document = null;
		try {
			document = DocumentHelper.parseText(response);
		} catch (final DocumentException e) {
			e.printStackTrace();
		}
		final Element root = document.getRootElement();
		result = root.elementText("error");
		return result;
	}
}
