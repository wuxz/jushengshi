package com.yongyuanmedia.jushengshi.web.controller.weixin;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.yongyuanmedia.jushengshi.web.controller.weixin.menu.Button;
import com.yongyuanmedia.jushengshi.web.controller.weixin.menu.ClickButton;
import com.yongyuanmedia.jushengshi.web.controller.weixin.menu.ComplexButton;
import com.yongyuanmedia.jushengshi.web.controller.weixin.menu.Menu;
import com.yongyuanmedia.jushengshi.web.controller.weixin.menu.ViewButton;
import com.yongyuanmedia.jushengshi.web.controller.weixin.pojo.Token;
import com.yongyuanmedia.jushengshi.web.controller.weixin.util.CommonUtil;
import com.yongyuanmedia.jushengshi.web.controller.weixin.util.MenuUtil;

/**
 * �˵���������
 * 
 * @author liufeng
 * @date 2013-10-17
 */
public class MenuManager {
	private static Logger log = LoggerFactory.getLogger(MenuManager.class);

	/**
	 * ����˵��ṹ
	 * 
	 * @return
	 */
	private static Menu getMenu() {
		ClickButton btn11 = new ClickButton();
		btn11.setName("��Դ�й�");
		btn11.setType("click");
		btn11.setKey("oschina");

		ClickButton btn12 = new ClickButton();
		btn12.setName("ITeye");
		btn12.setType("click");
		btn12.setKey("iteye");

		ViewButton btn13 = new ViewButton();
		btn13.setName("CocoaChina");
		btn13.setType("view");
		btn13.setUrl("http://www.iteye.com");

		ViewButton btn21 = new ViewButton();
		btn21.setName("�Ա�");
		btn21.setType("view");
		btn21.setUrl("http://m.taobao.com");

		ViewButton btn22 = new ViewButton();
		btn22.setName("����");
		btn22.setType("view");
		btn22.setUrl("http://m.jd.com");

		ViewButton btn23 = new ViewButton();
		btn23.setName("ΨƷ��");
		btn23.setType("view");
		btn23.setUrl("http://m.vipshop.com");

		ViewButton btn24 = new ViewButton();
		btn24.setName("������");
		btn24.setType("view");
		btn24.setUrl("http://m.dangdang.com");

		ViewButton btn25 = new ViewButton();
		btn25.setName("�����׹�");
		btn25.setType("view");
		btn25.setUrl("http://m.suning.com");

		ViewButton btn31 = new ViewButton();
		btn31.setName("����");
		btn31.setType("view");
		btn31.setUrl("http://www.duopao.com");

		ViewButton btn32 = new ViewButton();
		btn32.setName("һ��88");
		btn32.setType("view");
		btn32.setUrl("http://www.yi588.com");

		ComplexButton mainBtn1 = new ComplexButton();
		mainBtn1.setName("��������");
		mainBtn1.setSub_button(new Button[] { btn11, btn12, btn13 });

		ComplexButton mainBtn2 = new ComplexButton();
		mainBtn2.setName("����");
		mainBtn2.setSub_button(new Button[] { btn21, btn22, btn23, btn24, btn25 });

		ComplexButton mainBtn3 = new ComplexButton();
		mainBtn3.setName("��ҳ��Ϸ");
		mainBtn3.setSub_button(new Button[] { btn31, btn32 });

		Menu menu = new Menu();
		menu.setButton(new Button[] { mainBtn1, mainBtn2, mainBtn3 });

		return menu;
	}

	public static void main(String[] args) {
		// �������û�Ψһƾ֤
		String appId = "APPID";
		// �������û�Ψһƾ֤��Կ
		String appSecret = "APPSECRET";

		// ���ýӿڻ�ȡƾ֤
		Token token = CommonUtil.getToken(appId, appSecret);

		if (null != token) {
			// �����˵�
			boolean result = MenuUtil.createMenu(getMenu(),
					token.getAccessToken());

			// �жϲ˵��������
			if (result) {
				log.info("�˵������ɹ���");
			} else {
				log.info("�˵�����ʧ�ܣ�");
			}
		}
	}
}
