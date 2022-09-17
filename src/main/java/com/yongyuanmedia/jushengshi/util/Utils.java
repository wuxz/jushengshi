package com.yongyuanmedia.jushengshi.util;

import java.io.BufferedInputStream;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStreamWriter;
import java.net.URI;
import java.util.Collection;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang.StringUtils;
import org.apache.http.HttpEntity;
import org.apache.http.client.HttpClient;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.util.EntityUtils;
import org.apache.tika.exception.TikaException;
import org.apache.tika.metadata.Metadata;
import org.apache.tika.parser.AutoDetectParser;
import org.apache.tika.sax.BodyContentHandler;
import org.xml.sax.SAXException;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.yongyuanmedia.jushengshi.vo.JuBenParseResult;

class PushResponse {
	private int status_code;

	private String reason;

	public String getReason() {
		return reason;
	}

	public int getStatus_code() {
		return status_code;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public void setStatus_code(int status_code) {
		this.status_code = status_code;
	}
}

public class Utils {
	public static final Pattern staffIdPattern = Pattern.compile("\\d{1,40}");

	public static final Pattern roundIdPattern = Pattern
			.compile("[0-9a-zA-Z]{1,4}");

	public static final Pattern jiIdPattern = Pattern
			.compile("[第]??([0-9一二三四五六七八九零十百]{1,5})[集\\.]");

	public static final Pattern jiIdDigitPattern = Pattern.compile("\\d{1,3}");

	public static final Pattern jiIdDigitHas0PrefixPattern = Pattern
			.compile("^[0]++(\\d{1,3})$");

	public static final Pattern jiIdChinesePattern = Pattern
			.compile("[一二三四五六七八九零十百]{1,5}");

	public static String array2String(Object[] data, String delimiter) {
		final StringBuffer sb = new StringBuffer();

		if ((data == null) || (data.length == 0)) {
			return "";
		}

		for (int i = 0; i < data.length; i++) {
			if ((data[i] == null) || (data[i].toString().length() == 0)) {
				continue;
			}

			if (i != 0) {
				sb.append(delimiter);
			}

			sb.append(data[i].toString());
		}

		return sb.toString();
	}

	public static String collection2String(Collection<String> datas,
			String delimiter) {
		final StringBuffer sb = new StringBuffer();

		if ((datas == null) || (datas.isEmpty())) {
			return "";
		}

		int i = 0;
		for (final String data : datas) {
			if (StringUtils.isEmpty(data)) {
				continue;
			}

			if (i++ != 0) {
				sb.append(delimiter);
			}

			sb.append(data);
		}

		return sb.toString();
	}

	public static int getJiIdFromName(String name) throws Exception {
		Matcher matcher = jiIdPattern.matcher(name);
		if (!matcher.find()) {
			throw new Exception("文件名称中找不到集的编号");
		}

		String field = matcher.group(1);
		if (jiIdDigitPattern.matcher(field).matches()) {
			matcher = jiIdDigitHas0PrefixPattern.matcher(field);
			if (matcher.find()) {
				field = matcher.group(1);
			}

			return Integer.parseInt(field);
		} else if (jiIdChinesePattern.matcher(field).matches()) {
			return parseChineseNumber(field);
		}

		throw new Exception("文件名称中找不到集的编号");
	}

	public static void main(String[] args) throws Exception {
		testParseJuBen();
		//		System.out.println("11.a?b.".replaceAll("[\\\\.\\\\?-]", ""));
	}

	/**
	 * 把中文数字解析为阿拉伯数字(Integer)
	 *
	 * @param chineseNumber
	 *            中文数字
	 * @return 阿拉伯数字(Integer),如果是无法识别的中文数字则返回-1
	 */
	public static int parseChineseNumber(String chineseNumber) {
		chineseNumber = chineseNumber.replace("仟", "千");
		chineseNumber = chineseNumber.replace("佰", "百");
		chineseNumber = chineseNumber.replace("拾", "十");
		chineseNumber = chineseNumber.replace("玖", "九");
		chineseNumber = chineseNumber.replace("捌", "八");
		chineseNumber = chineseNumber.replace("柒", "七");
		chineseNumber = chineseNumber.replace("陆", "六");
		chineseNumber = chineseNumber.replace("伍", "五");
		chineseNumber = chineseNumber.replace("肆", "四");
		chineseNumber = chineseNumber.replace("叁", "三");
		chineseNumber = chineseNumber.replace("贰", "二");
		chineseNumber = chineseNumber.replace("壹", "一");
		return parseChineseNumber(chineseNumber, 1);
	}

	/**
	 * 把中文数字解析为阿拉伯数字(Integer)
	 *
	 * @param preNumber
	 *            第二大的进位
	 * @param chineseNumber
	 *            中文数字
	 * @return 阿拉伯数字(Integer),如果是无法识别的中文数字则返回-1
	 */
	private static int parseChineseNumber(String chineseNumber, int preNumber) {
		int ret = 0;
		if (chineseNumber.indexOf("零") == 0) {
			final int index = 0;
			final int end = chineseNumber.length();
			final String prefix = chineseNumber.substring(index + 1, end);
			ret = parseChineseNumber(prefix, 1);
		} else if (chineseNumber.indexOf("亿") != -1) {
			final int index = chineseNumber.indexOf("亿");
			final int end = chineseNumber.length();
			String prefix = chineseNumber.substring(0, index);
			if (prefix.length() == 0) {
				prefix = "一";
			}
			final String postfix = chineseNumber.substring(index + 1, end);
			ret = (parseChineseNumber(prefix, 1) * 100000000)
					+ parseChineseNumber(postfix, 10000000);
		} else if (chineseNumber.indexOf("万") != -1) {
			final int index = chineseNumber.indexOf("万");
			final int end = chineseNumber.length();
			String prefix = chineseNumber.substring(0, index);
			if (prefix.length() == 0) {
				prefix = "一";
			}
			final String postfix = chineseNumber.substring(index + 1, end);
			ret = (parseChineseNumber(prefix, 1) * 10000)
					+ parseChineseNumber(postfix, 1000);
		} else if (chineseNumber.indexOf("千") != -1) {
			final int index = chineseNumber.indexOf("千");
			final int end = chineseNumber.length();
			String prefix = chineseNumber.substring(0, index);
			if (prefix.length() == 0) {
				prefix = "一";
			}
			final String postfix = chineseNumber.substring(index + 1, end);
			ret = (parseChineseNumber(prefix, 1) * 1000)
					+ parseChineseNumber(postfix, 100);
		} else if (chineseNumber.indexOf("百") != -1) {
			final int index = chineseNumber.indexOf("百");
			final int end = chineseNumber.length();
			String prefix = chineseNumber.substring(0, index);
			if (prefix.length() == 0) {
				prefix = "一";
			}
			final String postfix = chineseNumber.substring(index + 1, end);
			ret = (parseChineseNumber(prefix, 1) * 100)
					+ parseChineseNumber(postfix, 10);
		} else if (chineseNumber.indexOf("十") != -1) {
			final int index = chineseNumber.indexOf("十");
			final int end = chineseNumber.length();
			String prefix = chineseNumber.substring(0, index);
			if (prefix.length() == 0) {
				prefix = "一";
			}
			final String postfix = chineseNumber.substring(index + 1, end);
			ret = (parseChineseNumber(prefix, 1) * 10)
					+ parseChineseNumber(postfix, 1);
		} else if (chineseNumber.equals("一")) {
			ret = 1 * preNumber;
		} else if (chineseNumber.equals("二")) {
			ret = 2 * preNumber;
		} else if (chineseNumber.equals("三")) {
			ret = 3 * preNumber;
		} else if (chineseNumber.equals("四")) {
			ret = 4 * preNumber;
		} else if (chineseNumber.equals("五")) {
			ret = 5 * preNumber;
		} else if (chineseNumber.equals("六")) {
			ret = 6 * preNumber;
		} else if (chineseNumber.equals("七")) {
			ret = 7 * preNumber;
		} else if (chineseNumber.equals("八")) {
			ret = 8 * preNumber;
		} else if (chineseNumber.equals("九")) {
			ret = 9 * preNumber;
		} else if (chineseNumber.length() == 0) {
			ret = 0;
		} else {
			ret = -1;
		}
		return ret;
	}

	public static short parseDayNight(String daynight) {
		daynight = daynight.trim();

		if (daynight.equals("日") || daynight.equals("白天")) {
			return 1;
		}
		if (daynight.equals("夜") || daynight.equals("晚")
				|| daynight.equals("晚上")) {
			return 2;
		}
		if (daynight.equals("晨") || daynight.equals("早晨")
				|| daynight.equals("清早") || daynight.equals("清晨")) {
			return 3;
		}
		if (daynight.equals("昏") || daynight.equals("黄昏")
				|| daynight.equals("傍晚") || daynight.equals("日落")) {
			return 4;
		}

		return 5;
	}

	public static JuBenParseResult parseJuBen(String fileName)
			throws Exception {
		return parseJuBen(fileName, false);

	}

	public static JuBenParseResult parseJuBen(String fileName, boolean isDebug)
			throws Exception {
		final String content = parseToPlainText(fileName);
		//		if (fileName.endsWith(".doc")) {
		//			final BufferedInputStream bis = new BufferedInputStream(
		//					new File(fileName).toURI().toURL().openStream());
		//
		//			try {
		//				final WordExtractor docx = new WordExtractor(bis);
		//				content = docx.getText();
		//				docx.close();
		//			} finally {
		//				bis.close();
		//			}
		//		} else {
		//			final XWPFDocument docx = new XWPFDocument(
		//					new FileInputStream(fileName));
		//			//using XWPFWordExtractor Class
		//			final XWPFWordExtractor we = new XWPFWordExtractor(docx);
		//			try {
		//				content = we.getText();
		//			} finally {
		//				we.close();
		//			}
		//		}
		//
		if (isDebug) {
			final File txtFile = new File("/Users/wuxiangzheng/Documents/"
					+ new File(fileName).getName() + ".txt");
			final BufferedWriter bfr = new BufferedWriter(
					new OutputStreamWriter(new FileOutputStream(txtFile),
							"UTF-8"));
			try {
				bfr.write(content);
			} finally {
				bfr.close();
			}
		}

		URI pushUri = null;
		pushUri = new URIBuilder("http://115.182.24.50:9999")
				.setPath("/?guid=" + content.hashCode()).build();

		final HttpPost post = new HttpPost(pushUri);
		final RequestConfig requestConfig = RequestConfig.custom()
				.setSocketTimeout(200000).setConnectTimeout(200000).build();//设置请求和传输超时时间
		post.setConfig(requestConfig);

		HttpEntity postEntity = null;
		postEntity = new StringEntity(content, "UTF-8");

		post.setEntity(postEntity);
		post.setHeader("contentType", "application/text;charset=utf-8");

		HttpClient httpClient;
		final PoolingHttpClientConnectionManager cm = new PoolingHttpClientConnectionManager();
		cm.setMaxTotal(50);
		httpClient = HttpClients.custom().setConnectionManager(cm).build();

		try {
			return httpClient.execute(post, httpResponse -> {
				final int httpStatus = httpResponse.getStatusLine()
						.getStatusCode();
				if ((httpStatus >= 200) && (httpStatus <= 300)) {
					final ObjectMapper jsonMapper = new ObjectMapper()
							.enable(SerializationFeature.INDENT_OUTPUT);
					final String contentResp = EntityUtils
							.toString(httpResponse.getEntity(), "UTF-8");
					return jsonMapper.readValue(contentResp,
							JuBenParseResult.class);
				} else {
					return null;
				}
			});
		} finally {
			post.releaseConnection();
		}
	}

	public static short parseSide(String side) {
		side = side.trim();

		if (side.equals("内") || side.equals("室内")) {
			return 1;
		}
		if (side.equals("外") || side.equals("室外")) {
			return 2;
		}

		return 3;
	}

	static String parseToPlainText(String fileName)
			throws IOException, SAXException, TikaException {
		final BodyContentHandler handler = new BodyContentHandler(
				10 * 1024 * 1024);
		final BufferedInputStream bis = new BufferedInputStream(
				new File(fileName).toURI().toURL().openStream());

		try {
			final AutoDetectParser parser = new AutoDetectParser();
			final Metadata metadata = new Metadata();
			try (InputStream stream = bis) {
				parser.parse(stream, handler, metadata);
				return handler.toString();
			}
		} finally {
			bis.close();
		}
	}

	public static String[] split(String value, String delimiter) {
		return StringUtils.isEmpty(value) ? new String[0]
				: value.split(delimiter);
	}

	public static String[] string2Array(String data) {
		return string2Array(data, " ");
	}

	public static String[] string2Array(String data, String delimiter) {
		return StringUtils.isEmpty(data) ? null : data.split(delimiter);
	}

	private static void testParseJiId() throws Exception {
		System.out.println(getJiIdFromName("第八集.docx"));
		System.out.println(getJiIdFromName("第十集.docx"));
		System.out.println(getJiIdFromName("第一十集.docx"));
		System.out.println(getJiIdFromName("第十八集.docx"));
		System.out.println(getJiIdFromName("第二十集.docx"));
		System.out.println(getJiIdFromName("第二十三集.docx"));
		System.out.println(getJiIdFromName("第一十四集.docx"));
		System.out.println(getJiIdFromName("第一百集.docx"));
		System.out.println(getJiIdFromName("第一百零五集.docx"));
		System.out.println(getJiIdFromName("第一百一十二集.docx"));
		System.out.println(getJiIdFromName("【四稿】第1集 斯德哥尔摩20050601.docx"));
		System.out.println(getJiIdFromName("【四稿】第11集 舔肘20150601.doc"));
		System.out.println(getJiIdFromName("第1集.docx"));
		System.out.println(getJiIdFromName("第01集.docx"));
		System.out.println(getJiIdFromName("第001集.docx"));
		System.out.println(getJiIdFromName("第10集.docx"));
		System.out.println(getJiIdFromName("第21集.docx"));
		System.out.println(getJiIdFromName("电视连续剧《蓬莱八仙》剧本——02集  新.docx"));
		System.out.println(getJiIdFromName("电视连续剧《蓬莱八仙》剧本——11集.docx"));
		System.out.println(getJiIdFromName("1集.docx"));
		System.out.println(getJiIdFromName("12集.docx"));
		System.out.println(getJiIdFromName("20集.docx"));
		System.out.println(getJiIdFromName("灰雁20.docx"));
		System.out.println(getJiIdFromName("《大清商埠》剧本第十一稿（2008年7月14日）.docx"));
	}

	private static void testParseJuBen() throws Exception {
		final String fileName = "/Users/wuxiangzheng/Downloads/1.txt";

		final long millis = System.currentTimeMillis();
		final JuBenParseResult result = parseJuBen(fileName, true);
		System.out.println("" + ((System.currentTimeMillis() - millis) / 1000));

		final File ndaFile = new File("/Users/wuxiangzheng/Documents/"
				+ new File(fileName).getName() + ".json");
		final BufferedWriter bfr = new BufferedWriter(
				new OutputStreamWriter(new FileOutputStream(ndaFile), "UTF-8"));
		final ObjectMapper jsonMapper = new ObjectMapper()
				.enable(SerializationFeature.INDENT_OUTPUT);
		try {
			bfr.write(jsonMapper.writeValueAsString(result));
		} finally {
			bfr.close();
		}
	}
}
