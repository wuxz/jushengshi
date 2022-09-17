<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="taglib.jsp"%>
<link rel="stylesheet" href="/resources/web/css/screenplay.css">
<script src="/resources/web/js/select.js"></script>
<script src="/resources/web/js/jquery.ajaxfileupload.js"></script>
<script src="/resources/web/js/uploadfile.js"></script>
<script src="/resources/web/js/staff_unpublished.js"></script>
<title>剧本 - 剧省事儿</title>
</head>
<body>
	<%@include file="header.jsp"%>
	<div class="content">
		<div class="screenplayCont">
			<div class="contTop clearfix">
				<label id="uploadBtn" class="uploadFile btn">上传剧本</label> 
				<a href="javascript:;" class="btn" id='sendScreenplay'>发送剧本</a>
				<label class="btn" id="publishBtn">发布剧本</label> 
				<a href="/web/nda?staffId=${staffId}" class="btn linkEditAgreement">编辑保密协议</a>
			</div>
			<input type="file" style="display: none;" id="uploadScreenplay"
				name="juBenFile" accept=".pdf,.doc,.docx,.txt,.zip,.rar">
			<div class="contTable">
				<div class="contTblHead">
					<%@include file="staff_header.jsp"%>
				</div>
				<table class="roundTbl newScreen">
					<tbody>
					</tbody>
				</table>
				<div class="descBtnBox" style="display:none;">
					<button type="button" id="btn_prev">上一页</button><button type="button" id="btn_next">下一页</button>
				</div>
			</div>
		</div>
	</div>
	<div class="meng uploadBox">
		<div class="upload">
			<h3>上传剧本</h3>
			<img src="/resources/web/images/homeclose.png" class="uploadClose close">
			<div class="showPartSection"></div>
			<div class="uploadFoot">
				<button id="upload-cancel">取消</button>
				<button id="upload-sure">确定</button>
			</div>
		</div>
	</div>
	<div class="meng">
		<div id="uploadPrompt" style="display:none;" class="filmBox">
			<h3>重要提示</h3>
			<img src="/resources/web/images/homeclose.png" class="close">
			<p class="upload_p">为了便于剧本解析，您需要按如下要求剧本：</p>
			<p class="upload_p">1. 不分集的剧本，直接上传一个word文件；</p>
			<p class="upload_p">2. 分集的剧本，剧本的每一集需要制作成单独的word文件，如该剧有30集，需要制作30个word文件；</p>
			<p class="upload_p">3. 分集的剧本，将制作好的word文件压缩成一个压缩包，压缩包的格式必须是zip格式。上传这个压缩包。</p>
			<div style="text-align: center;padding:20px;">
				<label for="uploadScreenplay" class=" upl_btn">继续上传</label> 
				<label id="cancelUpload" class=" upl_btn">稍候上传</label> 
				<input type="file" style="display: none;" id="uploadScreenplay"	name="juBenFile" accept=".pdf,.doc,.docx,.txt,.zip,.rar"/>
			</div>
		</div>
	</div>
</body>
</html>