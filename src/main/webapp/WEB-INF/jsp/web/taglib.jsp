<!DOCTYPE html>
<html lang="zh-CN">
<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<c:url var="rootURL" value="" />
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="">
<meta name="author" content="">

<script charset="utf-8" src="/resources/web/js/jquery-2.0.2.min.js"></script>
<!-- script charset="utf-8" src="/resources/web/js/jquery.form.js"></script-->
<script charset="utf-8" src="/resources/web/js/md5.js"></script>
<script charset="utf-8" src="/resources/web/keditor/kindeditor.js"></script>
<link rel="stylesheet" href="/resources/web/css/include/reset.css" />
<link rel="stylesheet" href="/resources/web/css/header.css" />
<link rel="stylesheet"
	href="/resources/web/keditor/themes/default/default.css" />
<link rel="stylesheet" href="/resources/web/css/jquery-ui.css" />	
<link rel="stylesheet" href="/resources/web/css/alertMemList.css" />
<script src="/resources/web/js/jquery.validate.min.js"></script>
<script src="/resources/web/js/jquery-ui.js"></script>
<script src="/resources/web/js/messages_zh.js"></script>
<script src="/resources/web/js/common.js"></script>
<script>
	var staffId = '${staffId}';
	var userId = '${userId}';
	var staffName = '${staffName}';
	var userMobile = '${mobile}';
</script>