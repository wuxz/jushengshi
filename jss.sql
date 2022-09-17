-- MySQL dump 10.13  Distrib 5.6.24, for osx10.8 (x86_64)
--
-- Host: localhost    Database: jjs
-- ------------------------------------------------------bigdata2_root:JssYnfq@)!6
-- Server version	5.7.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `audit`
--

DROP TABLE IF EXISTS `audit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `audit` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `staffid` varchar(50) NOT NULL DEFAULT '0' COMMENT '剧组id',
  `sourceid` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '拍摄通告或期表id',
  `type` tinyint(4) unsigned NOT NULL DEFAULT '1' COMMENT '类型（1拍摄通告，2期表）',
  `userid` varchar(50) NOT NULL DEFAULT '0' COMMENT '审批人用户id',
  `name` varchar(10) DEFAULT NULL COMMENT '审批人姓名',
  `reason` varchar(150) DEFAULT NULL COMMENT '不同意理由',
  `createtime` datetime DEFAULT NULL COMMENT '提交时间',
  `audittime` datetime DEFAULT NULL COMMENT '审核时间',
  `audit_status` tinyint(4) DEFAULT '1' COMMENT '审核状态（1批复中，2不同意，3同意）',
  `status` tinyint(4) unsigned NOT NULL DEFAULT '2' COMMENT '状态（1删除，2正常）',
  PRIMARY KEY (`id`),
  KEY `notice_id` (`sourceid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='拍摄通告—期表—领导批示';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit`
--

LOCK TABLES `audit` WRITE;
/*!40000 ALTER TABLE `audit` DISABLE KEYS */;
/*!40000 ALTER TABLE `audit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `message` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `create_userid` varchar(50) DEFAULT '0' COMMENT '发送人uid',
  `receiverid` varchar(50) DEFAULT '0' COMMENT '接收人uid',
  `staffid` varchar(50) DEFAULT '0' COMMENT '剧组id',
  `content` varchar(255) DEFAULT NULL COMMENT '消息内容',
  `createtime` datetime DEFAULT NULL COMMENT '发送时间',
  `uptime` datetime DEFAULT NULL COMMENT '阅读时间',
  `status` tinyint(4) unsigned DEFAULT '0' COMMENT '状态：1删除，3未读，4已读',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='个人消息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notice`
--

DROP TABLE IF EXISTS `notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notice` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `staffid` varchar(50) NOT NULL DEFAULT '0' COMMENT '剧组id',
  `title` varchar(50) DEFAULT NULL COMMENT '标题',
  `content` varchar(250) DEFAULT NULL COMMENT '内容',
  `view_number` smallint(6) unsigned DEFAULT '0' COMMENT '已读',
  `create_userid` int(11) unsigned DEFAULT '0' COMMENT '创建userid',
  `unread_number` smallint(6) unsigned DEFAULT '0' COMMENT '未读',
  `receiver` varchar(50) DEFAULT NULL COMMENT '接收者名字串',
  `receiver_number` int(11) DEFAULT NULL COMMENT '接收人数',
  `type` tinyint(4) DEFAULT NULL COMMENT '类型（1、无二级页面；2、有二级页面；3、无二级页面，但可操作）',
  `createtime` datetime DEFAULT NULL COMMENT '发送时间',
  `status` tinyint(4) unsigned DEFAULT '1' COMMENT '状态（1发送，2接收）',
  PRIMARY KEY (`id`),
  KEY `staff_id` (`staffid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='通知';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notice`
--

LOCK TABLES `notice` WRITE;
/*!40000 ALTER TABLE `notice` DISABLE KEYS */;
/*!40000 ALTER TABLE `notice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notice_comment`
--

DROP TABLE IF EXISTS `notice_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notice_comment` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `noticeid` int(11) unsigned DEFAULT '0' COMMENT '通知id',
  `userid` varchar(50) DEFAULT '0' COMMENT '用户id',
  `content` varchar(255) DEFAULT NULL COMMENT '留言内容',
  `createtime` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `notice_id` (`noticeid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='通知-评论';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notice_comment`
--

LOCK TABLES `notice_comment` WRITE;
/*!40000 ALTER TABLE `notice_comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `notice_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notice_user`
--

DROP TABLE IF EXISTS `notice_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notice_user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `staffid` varchar(50) NOT NULL DEFAULT '' COMMENT '剧组id',
  `noticeid` int(11) DEFAULT NULL COMMENT '通知id',
  `receiverid` varchar(50) DEFAULT NULL COMMENT '接收人userid',
  `is_view` tinyint(4) DEFAULT NULL COMMENT '是否查看（1已看，2未看）',
  `viewtime` datetime DEFAULT NULL COMMENT '查看时间',
  `status` tinyint(4) NOT NULL DEFAULT '2' COMMENT '是否被删除（1被删除，2未删除）',
  PRIMARY KEY (`id`),
  KEY `receive_uid` (`receiverid`),
  KEY `staff_id` (`staffid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='通知-用户通知';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notice_user`
--

LOCK TABLES `notice_user` WRITE;
/*!40000 ALTER TABLE `notice_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `notice_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission_list`
--

DROP TABLE IF EXISTS `permission_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permission_list` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `flagkey` varchar(50) NOT NULL DEFAULT '' COMMENT '权限键名',
  `flagname` varchar(150) NOT NULL DEFAULT '' COMMENT '权限名称',
  `iscreator` smallint(2) unsigned NOT NULL DEFAULT '1' COMMENT '是否是创建者，1否，2是',
  `isadmin` smallint(2) unsigned NOT NULL DEFAULT '1' COMMENT '是否是管理者，1否，2是',
  `isleader` smallint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否是部门长,1否,2是',
  `isperformer` smallint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否是演员,1否,2是',
  `isdriver` smallint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否是司机,1否,2是',
  `ispub` smallint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否可定制,1否,2是',
  `status` smallint(2) unsigned NOT NULL DEFAULT '3' COMMENT '状态:3启用,2禁用,1删除',
  PRIMARY KEY (`id`),
  UNIQUE KEY `flagkey` (`flagkey`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='权限列表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission_list`
--

LOCK TABLES `permission_list` WRITE;
/*!40000 ALTER TABLE `permission_list` DISABLE KEYS */;
/*!40000 ALTER TABLE `permission_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rounds`
--

DROP TABLE IF EXISTS `rounds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rounds` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `staffid` varchar(50) NOT NULL DEFAULT '' COMMENT '剧组ID',
  `mode` varchar(30) NOT NULL DEFAULT '0' COMMENT '剧本类型，0电影，如果是电视剧是几集',
  `round` varchar(30) NOT NULL DEFAULT '' COMMENT '场次序号',
  `scene` varchar(255) NOT NULL DEFAULT '' COMMENT '场景',
  `side` smallint(3) NOT NULL DEFAULT '3' COMMENT '内外场 1内场 2外场 3其他',
  `day_night` smallint(3) NOT NULL DEFAULT '5' COMMENT '日夜场 1日 2夜 3晨 4昏 5其他',
  `address` varchar(255) NOT NULL DEFAULT '' COMMENT '拍摄地',
  `main_role` varchar(500) NOT NULL DEFAULT '' COMMENT '主角',
  `actor` varchar(500) NOT NULL DEFAULT '' COMMENT '特约/临演',
  `summary` varchar(500) NOT NULL DEFAULT '' COMMENT '内容梗概',
  `remark` varchar(1000) NOT NULL DEFAULT '' COMMENT '补充内容',
  `cuserid` varchar(50) NOT NULL DEFAULT '' COMMENT '创建用户ID',
  `uuserid` varchar(50) NOT NULL DEFAULT '' COMMENT '最后更新用户ID',
  `createtime` datetime DEFAULT NULL COMMENT '创建日期',
  `uptime` datetime DEFAULT NULL COMMENT '更新日期',
  `status` smallint(3) NOT NULL DEFAULT '10' COMMENT '状态 -1删除 10正常',
  PRIMARY KEY (`id`),
  KEY `staffid` (`staffid`),
  KEY `round` (`round`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='分场表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rounds`
--

LOCK TABLES `rounds` WRITE;
/*!40000 ALTER TABLE `rounds` DISABLE KEYS */;
/*!40000 ALTER TABLE `rounds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule`
--

DROP TABLE IF EXISTS `schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schedule` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `staffid` varchar(50) NOT NULL DEFAULT '' COMMENT '剧组ID',
  `roundid` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '场次id',
  `version` varchar(30) NOT NULL DEFAULT '0' COMMENT '当前版本号',
  `preversion` varchar(30) NOT NULL DEFAULT '0' COMMENT '上一版本号',
  `pdate` date DEFAULT NULL COMMENT '拍摄日期',
  `pagenum` varchar(50) NOT NULL DEFAULT '' COMMENT '页数',
  `pday` varchar(50) NOT NULL DEFAULT '' COMMENT '拍摄天',
  `diff_status` smallint(1) unsigned NOT NULL DEFAULT '1' COMMENT '比较上一版本1无 2新增 3编辑',
  `cuserid` varchar(50) NOT NULL DEFAULT '' COMMENT '创建用户ID',
  `uuserid` varchar(50) NOT NULL DEFAULT '' COMMENT '创建用户ID',
  `createtime` datetime DEFAULT NULL COMMENT '创建日期',
  `uptime` datetime DEFAULT NULL COMMENT '更新日期',
  `extra` text COMMENT '扩展  a:0:{}',
  PRIMARY KEY (`id`),
  KEY `staffid` (`staffid`),
  KEY `roundid` (`roundid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='期表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule_log`
--

DROP TABLE IF EXISTS `schedule_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schedule_log` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `staffid` varchar(50) NOT NULL DEFAULT '' COMMENT '剧组ID',
  `round` varchar(30) NOT NULL DEFAULT '' COMMENT '场次序号',
  `version` varchar(30) NOT NULL DEFAULT '0' COMMENT '当前版本号',
  `preversion` varchar(30) NOT NULL DEFAULT '0' COMMENT '上一版本号',
  `pdate` date DEFAULT NULL COMMENT '拍摄日期',
  `pagenum` varchar(50) NOT NULL DEFAULT '' COMMENT '页数',
  `pday` varchar(50) NOT NULL DEFAULT '' COMMENT '拍摄天',
  `diff_status` smallint(1) unsigned NOT NULL DEFAULT '1' COMMENT '比较上一版本1无 2新增 3编辑',
  `cuserid` varchar(50) NOT NULL DEFAULT '' COMMENT '创建用户ID',
  `uuserid` varchar(50) NOT NULL DEFAULT '' COMMENT '创建用户ID',
  `createtime` datetime DEFAULT NULL COMMENT '创建日期',
  `uptime` datetime DEFAULT NULL COMMENT '更新日期',
  `extra` text COMMENT '扩展  a:0:{}',
  PRIMARY KEY (`id`),
  KEY `staffid` (`staffid`),
  KEY `round` (`round`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='期表历史版本';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule_log`
--

LOCK TABLES `schedule_log` WRITE;
/*!40000 ALTER TABLE `schedule_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `schedule_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule_record`
--

DROP TABLE IF EXISTS `schedule_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schedule_record` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `staffid` varchar(50) NOT NULL DEFAULT '' COMMENT '剧组ID',
  `round` varchar(30) NOT NULL DEFAULT '' COMMENT '场次序号',
  `version` varchar(30) NOT NULL DEFAULT '0' COMMENT '当前版本号',
  `cuserid` varchar(50) NOT NULL DEFAULT '' COMMENT '创建用户ID',
  `createtime` datetime DEFAULT NULL COMMENT '创建日期',
  `uptime` datetime DEFAULT NULL COMMENT '更新日期',
  `status` smallint(3) unsigned NOT NULL DEFAULT '10' COMMENT '状态 10审核中 20审核拒绝 30审核通过',
  `step` smallint(3) unsigned NOT NULL DEFAULT '10' COMMENT '发布状态 10保存 20发布',
  PRIMARY KEY (`id`),
  KEY `staffid` (`staffid`),
  KEY `version` (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='期表记录表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule_record`
--

LOCK TABLES `schedule_record` WRITE;
/*!40000 ALTER TABLE `schedule_record` DISABLE KEYS */;
/*!40000 ALTER TABLE `schedule_record` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `screenplay_round`
--

DROP TABLE IF EXISTS `screenplay_round`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `screenplay_round` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `staffid` varchar(50) NOT NULL DEFAULT '' COMMENT '剧组ID',
  `mode` varchar(30) NOT NULL DEFAULT '0' COMMENT '剧本类型，0电影，如果是电视剧是几集',
  `round` varchar(30) NOT NULL DEFAULT '' COMMENT '场次序号',
  `address` varchar(255) NOT NULL DEFAULT '' COMMENT '地点名称',
  `scene` varchar(240) NOT NULL DEFAULT '' COMMENT '场景',
  `side` smallint(3) NOT NULL DEFAULT '3' COMMENT '内外场 1内场 2外场 3其他',
  `day_night` smallint(3) NOT NULL DEFAULT '5' COMMENT '日夜场 1日 2夜 3晨 4昏 5其他',
  `status` smallint(2) NOT NULL DEFAULT '1' COMMENT '状态：-1删除，1未拍，2未拍完 3已拍',
  `version` varchar(30) NOT NULL DEFAULT '0' COMMENT '当前版本号',
  `ctime` datetime DEFAULT NULL COMMENT '创建当前版本的时间',
  `preversion` varchar(30) NOT NULL DEFAULT '0' COMMENT '上一版本号',
  `diff_p_status` smallint(1) unsigned NOT NULL DEFAULT '1' COMMENT '比较上一版本1,无,2新增，3,编辑,4删除',
  `nowcontent` text COMMENT '当前版本内容',
  `precontent` text COMMENT '上一版本的内容',
  `diffcontent` text COMMENT '差异的内容',
  `main_role` varchar(3000) NOT NULL DEFAULT '' COMMENT '主演，逗号分割',
  `role` varchar(3000) NOT NULL DEFAULT '' COMMENT '角色，逗号分割',
  `actor` varchar(3000) NOT NULL DEFAULT '' COMMENT '特约/临演，逗号分割',
  `summary` text COMMENT '摘要',
  `extra` text COMMENT '扩展 a:0:{}',
  `template_data` text COMMENT '模板数据 a:0:{}',
  `is_release` smallint(2) unsigned NOT NULL DEFAULT '1' COMMENT '是否发布，1否，2是',
  `releasetime` datetime DEFAULT NULL COMMENT '发布时间',
  PRIMARY KEY (`id`),
  KEY `staffid` (`staffid`),
  KEY `round` (`round`),
  KEY `status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='剧本场次表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `screenplay_round`
--

LOCK TABLES `screenplay_round` WRITE;
/*!40000 ALTER TABLE `screenplay_round` DISABLE KEYS */;
/*!40000 ALTER TABLE `screenplay_round` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `screenplay_round_log`
--

DROP TABLE IF EXISTS `screenplay_round_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `screenplay_round_log` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `staffid` varchar(50) NOT NULL DEFAULT '' COMMENT '剧组ID',
  `mode` varchar(30) NOT NULL DEFAULT '0' COMMENT '剧本类型，0电影，如果是电视剧是几集',
  `round` varchar(30) NOT NULL DEFAULT '' COMMENT '场次序号',
  `address` varchar(255) NOT NULL DEFAULT '' COMMENT '地点名称',
  `scene` varchar(240) NOT NULL DEFAULT '' COMMENT '场景',
  `daynight` varchar(20) NOT NULL DEFAULT '' COMMENT '日/夜/晨/昏/其他',
  `side` varchar(20) NOT NULL DEFAULT '' COMMENT '内/外',
  `status` smallint(2) NOT NULL DEFAULT '1' COMMENT '状态：-1删除，1未拍，2未拍完 3已拍',
  `version` varchar(30) NOT NULL DEFAULT '0' COMMENT '当前版本号',
  `ctime` datetime DEFAULT NULL COMMENT '创建当前版本的时间',
  `preversion` varchar(30) NOT NULL DEFAULT '0' COMMENT '上一版本号',
  `diff_p_status` smallint(1) unsigned NOT NULL DEFAULT '1' COMMENT '比较上一版本1,无,2新增，3,编辑,4删除',
  `nowcontent` text COMMENT '当前版本内容',
  `precontent` text COMMENT '上一版本的内容',
  `diffcontent` text COMMENT '差异的内容',
  `main_role` varchar(3000) NOT NULL DEFAULT '' COMMENT '主演',
  `role` varchar(3000) NOT NULL DEFAULT '' COMMENT '角色',
  `actor` varchar(3000) NOT NULL DEFAULT '' COMMENT '特约/临演',
  `summary` text COMMENT '摘要',
  `extra` text COMMENT '扩展  a:0:{}',
  `template_data` text COMMENT '模板数据',
  `is_release` smallint(2) unsigned NOT NULL DEFAULT '1' COMMENT '是否发布，1否，2是',
  `releasetime` datetime DEFAULT NULL COMMENT '发布时间',
  PRIMARY KEY (`id`),
  KEY `staffid` (`staffid`),
  KEY `round` (`round`),
  KEY `status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='剧本场次历史记录表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `screenplay_round_log`
--

LOCK TABLES `screenplay_round_log` WRITE;
/*!40000 ALTER TABLE `screenplay_round_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `screenplay_round_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `screenplay_upload`
--

DROP TABLE IF EXISTS `screenplay_upload`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `screenplay_upload` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `version` varchar(30) NOT NULL DEFAULT '0' COMMENT '版本号',
  `staffid` varchar(50) NOT NULL DEFAULT '' COMMENT '剧组ID',
  `ctime` datetime DEFAULT NULL COMMENT '上传时间',
  `create_userid` varchar(50) NOT NULL DEFAULT '' COMMENT '创建者ID',
  `filepath` varchar(255) NOT NULL DEFAULT '' COMMENT '上传的地址',
  `ishandle` smallint(2) unsigned NOT NULL DEFAULT '1' COMMENT '处理，1否，2已处理',
  `handletime` datetime DEFAULT NULL COMMENT '处理时间',
  PRIMARY KEY (`id`),
  KEY `staffid` (`staffid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='剧本上传记录';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `screenplay_upload`
--

LOCK TABLES `screenplay_upload` WRITE;
/*!40000 ALTER TABLE `screenplay_upload` DISABLE KEYS */;
/*!40000 ALTER TABLE `screenplay_upload` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shoot_notice`
--

DROP TABLE IF EXISTS `shoot_notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shoot_notice` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `staffid` varchar(50) NOT NULL DEFAULT '' COMMENT '剧组id',
  `weather` varchar(20) DEFAULT NULL COMMENT '天气情况',
  `sunrise` varchar(10) DEFAULT NULL COMMENT '日出时间',
  `sunset` varchar(10) DEFAULT NULL COMMENT '日落时间',
  `create_userid` int(11) unsigned DEFAULT '0' COMMENT '创建userid',
  `shoot_day` date DEFAULT NULL COMMENT '拍摄日期',
  `shoot_number` varchar(10) DEFAULT NULL COMMENT '拍摄天数',
  `shoot_place` varchar(20) DEFAULT NULL COMMENT '拍摄地点',
  `page_count` varchar(10) DEFAULT NULL COMMENT '总页数',
  `view_number` int(11) unsigned DEFAULT '0' COMMENT '已读数',
  `unread_number` int(11) unsigned DEFAULT '0' COMMENT '未读数',
  `createtime` datetime DEFAULT NULL COMMENT '创建时间',
  `releasetime` datetime DEFAULT NULL COMMENT '发布时间，通过审核时间',
  `status` smallint(4) unsigned NOT NULL DEFAULT '5' COMMENT '状态：5编辑，10审核中，15审核被拒绝，20发布状态',
  PRIMARY KEY (`id`),
  KEY `staff_id` (`staffid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='拍摄通告';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shoot_notice`
--

LOCK TABLES `shoot_notice` WRITE;
/*!40000 ALTER TABLE `shoot_notice` DISABLE KEYS */;
/*!40000 ALTER TABLE `shoot_notice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shoot_notice_info`
--

DROP TABLE IF EXISTS `shoot_notice_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shoot_notice_info` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `shoot_notice_id` int(11) DEFAULT NULL COMMENT '拍摄通告Id',
  `module_title` varchar(50) NOT NULL DEFAULT '' COMMENT '板块名称',
  `module_order` int(11) NOT NULL DEFAULT '1' COMMENT '板块顺序',
  `content_name` varchar(11) DEFAULT NULL COMMENT '说明名称',
  `content_value` varchar(150) DEFAULT NULL COMMENT '说明内容',
  `content_order` tinyint(11) DEFAULT NULL COMMENT '内容顺序',
  PRIMARY KEY (`id`),
  KEY `shoot_notice_id` (`shoot_notice_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='拍摄通告-陈设，道具，特效，器材，用品说明-工作人员时间安排-用餐安排-自定义';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shoot_notice_info`
--

LOCK TABLES `shoot_notice_info` WRITE;
/*!40000 ALTER TABLE `shoot_notice_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `shoot_notice_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shoot_notice_info_default`
--

DROP TABLE IF EXISTS `shoot_notice_info_default`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shoot_notice_info_default` (
  `module_title` varchar(50) NOT NULL DEFAULT '' COMMENT '板块名称',
  `module_order` int(11) NOT NULL DEFAULT '1' COMMENT '板块顺序',
  `content_name` varchar(11) DEFAULT NULL COMMENT '说明名称',
  `content_value` varchar(150) DEFAULT NULL COMMENT '说明内容',
  `content_order` tinyint(11) DEFAULT NULL COMMENT '内容顺序'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='拍摄通告-板块';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shoot_notice_info_default`
--

LOCK TABLES `shoot_notice_info_default` WRITE;
/*!40000 ALTER TABLE `shoot_notice_info_default` DISABLE KEYS */;
/*!40000 ALTER TABLE `shoot_notice_info_default` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shoot_notice_reply`
--

DROP TABLE IF EXISTS `shoot_notice_reply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shoot_notice_reply` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `shoot_notice_id` int(11) unsigned DEFAULT '0' COMMENT '拍摄通知Id',
  `name` varchar(20) DEFAULT NULL COMMENT '接收人姓名',
  `userid` varchar(50) DEFAULT NULL COMMENT '接收人id',
  `view_type` tinyint(4) DEFAULT NULL COMMENT '查看类型(1app,2微信，3短信)',
  `is_view` tinyint(2) DEFAULT NULL COMMENT '是否查看（1未查看，2已查看）',
  `phone` char(11) DEFAULT NULL COMMENT '手机号',
  `phone_state` int(11) DEFAULT NULL COMMENT '电话状态：（1公开，2不公开)',
  PRIMARY KEY (`id`),
  KEY `shoot_notice_id` (`shoot_notice_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='拍摄通告-回执列表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shoot_notice_reply`
--

LOCK TABLES `shoot_notice_reply` WRITE;
/*!40000 ALTER TABLE `shoot_notice_reply` DISABLE KEYS */;
/*!40000 ALTER TABLE `shoot_notice_reply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shoot_notice_round`
--

DROP TABLE IF EXISTS `shoot_notice_round`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shoot_notice_round` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `shoot_notice_id` int(11) unsigned DEFAULT NULL COMMENT '拍摄通告Id',
  `mode` varchar(30) DEFAULT NULL COMMENT '剧本类型，0电影，如果是电视剧是几集',
  `round` varchar(30) DEFAULT NULL COMMENT '场次序号',
  `scene` varchar(10) DEFAULT NULL COMMENT '场景',
  `side` tinyint(2) unsigned DEFAULT '0' COMMENT '内/外(1内，2外,3其他)',
  `day_night` tinyint(3) unsigned DEFAULT '0' COMMENT '日/夜(1日，2夜，3晨，4昏，5其他)',
  `page_count` varchar(10) DEFAULT NULL COMMENT '页数',
  `main_role` varchar(100) DEFAULT NULL COMMENT '主要角色',
  `summary` varchar(200) DEFAULT NULL COMMENT '内容概况',
  `remark` varchar(200) DEFAULT NULL COMMENT '备注',
  `sortlist` smallint(6) DEFAULT '0' COMMENT '排序',
  `type` tinyint(4) DEFAULT '1' COMMENT '类型(1拍摄场次，2来日计划)',
  PRIMARY KEY (`id`),
  KEY `shoot_notice_id` (`shoot_notice_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='拍摄通告-拍摄场次';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shoot_notice_round`
--

LOCK TABLES `shoot_notice_round` WRITE;
/*!40000 ALTER TABLE `shoot_notice_round` DISABLE KEYS */;
/*!40000 ALTER TABLE `shoot_notice_round` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sms`
--

DROP TABLE IF EXISTS `sms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `appid` varchar(30) NOT NULL DEFAULT '' COMMENT '应用ID',
  `mobile` varchar(30) NOT NULL DEFAULT '' COMMENT '手机号码',
  `typeid` smallint(3) unsigned NOT NULL DEFAULT '1' COMMENT '类型：1登录，2注册，3动态注册登录，4取回密码，5更改绑定手机号码',
  `createtime` datetime DEFAULT NULL COMMENT '创建时间',
  `uptime` datetime DEFAULT NULL COMMENT '最后更新时间',
  `expr` datetime DEFAULT NULL COMMENT '失效时间',
  `code` varchar(30) NOT NULL DEFAULT '' COMMENT '验证码',
  PRIMARY KEY (`id`),
  UNIQUE KEY `appid` (`appid`,`mobile`,`typeid`),
  KEY `expr` (`expr`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='手机短信验证码表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms`
--

LOCK TABLES `sms` WRITE;
/*!40000 ALTER TABLE `sms` DISABLE KEYS */;
/*!40000 ALTER TABLE `sms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `staff` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `staffid` varchar(50) NOT NULL DEFAULT '' COMMENT '剧组ID',
  `staffname` varchar(200) NOT NULL DEFAULT '' COMMENT '剧组名称',
  `staff_img` varchar(255) NOT NULL DEFAULT '' COMMENT '剧组图片',
  `staff_make` varchar(150) NOT NULL DEFAULT '' COMMENT '制作方',
  `staff_type` varchar(50) NOT NULL DEFAULT '' COMMENT '剧组类型：电影，电视剧，网剧，舞台剧，综艺，广告，其他',
  `ctime` datetime DEFAULT NULL COMMENT '创建时间',
  `create_userid` varchar(50) NOT NULL DEFAULT '' COMMENT '创建者用户ID',
  `usercount` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '用户数',
  `opentime` datetime DEFAULT NULL COMMENT '开机时间',
  `screenplay_type` smallint(2) unsigned NOT NULL DEFAULT '0' COMMENT '剧本场次编号,1顺序编辑,2,分集分场',
  `status` smallint(2) unsigned NOT NULL DEFAULT '5' COMMENT '剧组的状态5，正常，10已完成,15归档，15剧组已被删除',
  `screenplay_version` varchar(30) NOT NULL DEFAULT '' COMMENT '当前发布剧本版本',
  `extra` text COMMENT '扩展: a:0:{}',
  PRIMARY KEY (`id`),
  KEY `staffid` (`staffid`),
  KEY `create_userid` (`create_userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='剧组信息';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff_addressbook`
--

DROP TABLE IF EXISTS `staff_addressbook`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `staff_addressbook` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `staffid` varchar(50) NOT NULL DEFAULT '' COMMENT '剧组ID',
  `oname` varchar(60) NOT NULL DEFAULT '' COMMENT '部门名称',
  `typeid` smallint(2) unsigned NOT NULL DEFAULT '1' COMMENT '类型:1 组织，2，管理者，3演员',
  `ctime` datetime DEFAULT NULL COMMENT '创建时间',
  `userid` varchar(50) NOT NULL DEFAULT '' COMMENT '用户ID',
  `mobile` varchar(20) NOT NULL DEFAULT '' COMMENT '用户手机号码',
  `userstatus` smallint(2) unsigned NOT NULL DEFAULT '1' COMMENT '用户状态，1 未是平台用户，2冻结，3活动',
  `rolename` varchar(100) NOT NULL DEFAULT '' COMMENT '职务名称，演员名称，如果是组织同一部门只允许同一人，演员类型可以多条记录',
  `rolelevel` smallint(3) unsigned NOT NULL DEFAULT '1' COMMENT '职务级别，1普通,10部门长',
  `iscreator` smallint(2) unsigned NOT NULL DEFAULT '1' COMMENT '是否是创建者，1否，2是',
  `isadmin` smallint(2) unsigned NOT NULL DEFAULT '1' COMMENT '是否是管理者，1否，2是',
  `isleader` smallint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否是部门长,1否,2是',
  `isperformer` smallint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否是演员,1否,2是',
  `isdriver` smallint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否是司机,1否,2是',
  `letter` varchar(10) NOT NULL DEFAULT '' COMMENT '首字母',
  `quanpin` varchar(100) NOT NULL DEFAULT '' COMMENT '全拼',
  `extra` text COMMENT '扩展: a:0:{}',
  PRIMARY KEY (`id`),
  KEY `staffid` (`staffid`),
  KEY `oname` (`oname`),
  KEY `typeid` (`typeid`),
  KEY `userid` (`userid`),
  KEY `mobile` (`mobile`),
  KEY `letter` (`letter`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='剧组成员表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff_addressbook`
--

LOCK TABLES `staff_addressbook` WRITE;
/*!40000 ALTER TABLE `staff_addressbook` DISABLE KEYS */;
/*!40000 ALTER TABLE `staff_addressbook` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff_invitation`
--

DROP TABLE IF EXISTS `staff_invitation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `staff_invitation` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `staffid` varchar(50) NOT NULL DEFAULT '' COMMENT '剧组ID',
  `create_userid` varchar(50) NOT NULL DEFAULT '' COMMENT '创建者ID',
  `create_time` datetime DEFAULT NULL COMMENT '邀请的时间',
  `userid` varchar(50) NOT NULL DEFAULT '' COMMENT '被邀请人的用户ID',
  `mobile` varchar(20) NOT NULL DEFAULT '' COMMENT '被邀请人的手机号码',
  `regtime` datetime DEFAULT NULL COMMENT '被邀请人注册的时间',
  `intime` datetime DEFAULT NULL COMMENT '被邀请人确定加入的时间',
  `status` smallint(3) NOT NULL DEFAULT '1' COMMENT '被邀请人的加入状态，-1 被踢出状态，1待加入，5已加入状态',
  `staff_status` smallint(3) NOT NULL DEFAULT '10' COMMENT '当前剧组的状态5，正常，10已完成,15归档，15剧组已被删除',
  `extra` text COMMENT '扩展: a:0:{}',
  `isprotocol` smallint(2) unsigned NOT NULL DEFAULT '1' COMMENT '是否签署保密协议，1否，2是',
  `protocoltime` datetime DEFAULT NULL COMMENT '签署的时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `staffid_2` (`staffid`,`mobile`),
  KEY `staffid` (`staffid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='剧组邀请列表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff_invitation`
--

LOCK TABLES `staff_invitation` WRITE;
/*!40000 ALTER TABLE `staff_invitation` DISABLE KEYS */;
/*!40000 ALTER TABLE `staff_invitation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff_log`
--

DROP TABLE IF EXISTS `staff_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `staff_log` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `staffid` varchar(50) NOT NULL DEFAULT '' COMMENT '剧组ID',
  `handle_userid` varchar(50) NOT NULL DEFAULT '' COMMENT '操作人',
  `handle_name` varchar(120) NOT NULL DEFAULT '' COMMENT '操作人名称',
  `handle_time` datetime DEFAULT NULL COMMENT '操作时间',
  `handle_type` smallint(3) unsigned NOT NULL DEFAULT '0' COMMENT '操作类型，未定',
  `content` text COMMENT '操作内容',
  PRIMARY KEY (`id`),
  KEY `staffid` (`staffid`),
  KEY `handle_time` (`handle_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='剧组日志';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff_log`
--

LOCK TABLES `staff_log` WRITE;
/*!40000 ALTER TABLE `staff_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `staff_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff_member`
--

DROP TABLE IF EXISTS `staff_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `staff_member` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `userid` varchar(50) NOT NULL DEFAULT '' COMMENT '用户ID',
  `bindmobile` varchar(30) NOT NULL DEFAULT '' COMMENT '绑定的手机号码',
  `avatar` varchar(255) NOT NULL DEFAULT '' COMMENT '头像',
  `nickname` varchar(100) NOT NULL DEFAULT '' COMMENT '昵称',
  `iscreate` smallint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否是创建者,1否,2是',
  `isadmin` smallint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否是管理员,1否,2是',
  `isleader` smallint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否是部门长,1否,2是',
  `isperformer` smallint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否是演员,1否,2是',
  `isdriver` smallint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否是司机,1否,2是',
  `realname` varchar(100) NOT NULL DEFAULT '' COMMENT '真实姓名',
  `gender` smallint(2) unsigned NOT NULL DEFAULT '3' COMMENT '性别，1男，2女，3未填',
  `mobile` varchar(30) NOT NULL DEFAULT '' COMMENT '联系手机号码',
  `mobiestatus` varchar(30) NOT NULL DEFAULT '' COMMENT '电话状态',
  `jobs` varchar(3000) NOT NULL DEFAULT '' COMMENT '职务',
  `teams` varchar(3000) NOT NULL DEFAULT '' COMMENT '分组',
  `cdate` datetime DEFAULT NULL COMMENT '用户注册时间',
  `indate` datetime DEFAULT NULL COMMENT '加入时间',
  `idnumber` varchar(30) NOT NULL DEFAULT '' COMMENT '身份证号码',
  `sourcebank` varchar(100) NOT NULL DEFAULT '' COMMENT '开户银行',
  `banknumber` varchar(30) NOT NULL DEFAULT '' COMMENT '银行帐号',
  `address` varchar(200) NOT NULL DEFAULT '' COMMENT '地址',
  `sign` varchar(300) NOT NULL DEFAULT '' COMMENT '个性签名',
  `content` varchar(3000) NOT NULL DEFAULT '' COMMENT '个人简介',
  `staffid` varchar(50) NOT NULL DEFAULT '' COMMENT '剧组ID',
  `flags` text COMMENT '权限,a:0:{}',
  `status` smallint(2) unsigned NOT NULL DEFAULT '1' COMMENT '状态（邀请）',
  `isviewscreenplay` smallint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否可查看剧本',
  `performers` varchar(3000) NOT NULL DEFAULT '' COMMENT '饰演角色',
  `car_type` varchar(50) NOT NULL DEFAULT '车型',
  `car_num` varchar(50) NOT NULL DEFAULT '车牌号',
  `in_date` date DEFAULT NULL COMMENT '进组日期',
  `leave_date` date DEFAULT NULL COMMENT '离组日期',
  `hotel_name` varchar(100) NOT NULL DEFAULT '' COMMENT '入住酒店',
  `hotel_type` varchar(30) NOT NULL DEFAULT '' COMMENT '房型',
  `hotel_num` varchar(50) NOT NULL DEFAULT '' COMMENT '房号',
  `hotel_price` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '价格/日',
  `hotel_in_date` date DEFAULT NULL COMMENT '入住日期',
  `hotel_leave_date` date DEFAULT NULL COMMENT '离店日期',
  `hotel_daynum` int(8) unsigned NOT NULL DEFAULT '0' COMMENT '入住天数',
  `hotel_total` decimal(30,2) NOT NULL DEFAULT '0.00' COMMENT '总价',
  `lastactivetime` datetime DEFAULT NULL COMMENT '最后活动时间',
  `letter` varchar(10) NOT NULL DEFAULT '' COMMENT '首字母',
  `quanpin` varchar(100) NOT NULL DEFAULT '' COMMENT '全拼',
  PRIMARY KEY (`id`),
  UNIQUE KEY `staffid_2` (`staffid`,`bindmobile`),
  KEY `staffid` (`staffid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='剧组成员表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff_member`
--

LOCK TABLES `staff_member` WRITE;
/*!40000 ALTER TABLE `staff_member` DISABLE KEYS */;
/*!40000 ALTER TABLE `staff_member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff_organization`
--

DROP TABLE IF EXISTS `staff_organization`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `staff_organization` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `staffid` varchar(50) NOT NULL DEFAULT '' COMMENT '剧组ID',
  `oname` varchar(60) NOT NULL DEFAULT '' COMMENT '部门名称',
  `typeid` smallint(2) unsigned NOT NULL DEFAULT '1' COMMENT '类型:1 组织，2，管理者，3演员',
  `ctime` datetime DEFAULT NULL COMMENT '创建时间',
  `manage_userids` varchar(3000) NOT NULL DEFAULT '' COMMENT '管理者，逗号分割',
  `usercount` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '用户数',
  `extra` text COMMENT '扩展: a:0:{}',
  PRIMARY KEY (`id`),
  KEY `staffid` (`staffid`),
  KEY `typeid` (`typeid`),
  KEY `oname` (`oname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='剧组部门结构';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff_organization`
--

LOCK TABLES `staff_organization` WRITE;
/*!40000 ALTER TABLE `staff_organization` DISABLE KEYS */;
/*!40000 ALTER TABLE `staff_organization` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_account`
--

DROP TABLE IF EXISTS `user_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_account` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `appid` varchar(30) NOT NULL DEFAULT '' COMMENT '应用ID',
  `source` varchar(50) NOT NULL DEFAULT '' COMMENT '注册来源,email,mobile,nickname',
  `userid` varchar(50) NOT NULL DEFAULT '' COMMENT '用户ID',
  `account` varchar(100) NOT NULL DEFAULT '' COMMENT '帐号',
  `passwd` varchar(100) NOT NULL DEFAULT '' COMMENT '密码',
  `status` smallint(2) NOT NULL DEFAULT '3' COMMENT '状态：3启用，2禁用，1黑名单 -1删除',
  `binduserid` varchar(50) NOT NULL DEFAULT '' COMMENT '绑定的用户ID',
  `bindmobile` varchar(30) NOT NULL DEFAULT '' COMMENT '绑定的手机号码',
  `bindtime` datetime DEFAULT NULL COMMENT '绑定时间',
  `reg_device_agent` varchar(50) NOT NULL DEFAULT '' COMMENT '注册设备:iphone,ipad,android,winxp,win7',
  `reg_device_type` varchar(50) NOT NULL DEFAULT '' COMMENT '注册设备类型:4s,suming,IE,firefox,chrome',
  `reg_device_id` varchar(50) NOT NULL DEFAULT '' COMMENT '注册设备唯一ID',
  `reg_device_version` varchar(30) NOT NULL DEFAULT '' COMMENT '注册设备的系统版本,7.0.1',
  `reg_app_version` varchar(30) NOT NULL DEFAULT '' COMMENT '注册软件版本,1.0.0',
  `reg_time` datetime DEFAULT NULL COMMENT '注册时间',
  `login_device_agent` varchar(50) NOT NULL DEFAULT '' COMMENT '登录设备:iphone,ipad,android,winxp,win7',
  `login_device_type` varchar(50) NOT NULL DEFAULT '' COMMENT '登录设备类型:4s,suming,IE,firefox,chrome',
  `login_device_id` varchar(50) NOT NULL DEFAULT '' COMMENT '登录设备唯一ID',
  `login_device_version` varchar(30) NOT NULL DEFAULT '' COMMENT '登录设备的系统版本,7.0.1',
  `login_app_version` varchar(30) NOT NULL DEFAULT '' COMMENT '登录软件版本,1.0.0',
  `login_time` datetime DEFAULT NULL COMMENT '登录时间',
  `reg_device_channel` varchar(50) NOT NULL DEFAULT '' COMMENT '注册时的发布渠道',
  `login_device_channel` varchar(50) NOT NULL DEFAULT '' COMMENT '登录的发布渠道',
  PRIMARY KEY (`id`),
  KEY `appid` (`appid`),
  KEY `source` (`source`,`account`),
  KEY `userid` (`userid`),
  KEY `bindmobile` (`bindmobile`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='帐号表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_account`
--

LOCK TABLES `user_account` WRITE;
/*!40000 ALTER TABLE `user_account` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_info`
--

DROP TABLE IF EXISTS `user_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_info` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `userid` varchar(50) NOT NULL DEFAULT '' COMMENT '用户ID',
  `bindmobile` varchar(30) NOT NULL DEFAULT '' COMMENT '绑定的手机号码',
  `avatar` varchar(255) NOT NULL DEFAULT '' COMMENT '头像',
  `nickname` varchar(100) NOT NULL DEFAULT '' COMMENT '昵称',
  `realname` varchar(100) NOT NULL DEFAULT '' COMMENT '真实姓名',
  `gender` smallint(2) unsigned NOT NULL DEFAULT '3' COMMENT '性别，1男，2女，3未填',
  `cdate` datetime DEFAULT NULL COMMENT '用户注册时间',
  `default_staff` varchar(50) NOT NULL DEFAULT '' COMMENT '默认剧组',
  `extra` text COMMENT '扩展，a:0:{}',
  `sourcebank` varchar(100) NOT NULL DEFAULT '' COMMENT '开户银行',
  `banknumber` varchar(30) NOT NULL DEFAULT '' COMMENT '银行帐号',
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  KEY `bindmobile` (`bindmobile`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='帐号信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_info`
--

LOCK TABLES `user_info` WRITE;
/*!40000 ALTER TABLE `user_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_permission`
--

DROP TABLE IF EXISTS `user_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_permission` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `flagkey` varchar(50) NOT NULL DEFAULT '' COMMENT '权限键名',
  `staffid` varchar(50) NOT NULL DEFAULT '' COMMENT '剧组ID',
  `oname` varchar(60) NOT NULL DEFAULT '' COMMENT '部门名称',
  `typeid` smallint(2) unsigned NOT NULL DEFAULT '1' COMMENT '类型:1 组织，2，管理者，3演员',
  `userstatus` smallint(2) unsigned NOT NULL DEFAULT '1' COMMENT '用户状态，1 未是平台用户，2冻结，3活动',
  `rolename` varchar(100) NOT NULL DEFAULT '' COMMENT '职务名称，演员名称，如果是组织同一部门只允许同一人，演员类型可以多条记录',
  `userid` varchar(50) NOT NULL DEFAULT '' COMMENT '用户ID',
  `mobile` varchar(20) NOT NULL DEFAULT '' COMMENT '用户手机号码',
  PRIMARY KEY (`id`),
  KEY `staffid` (`staffid`),
  KEY `userid` (`userid`),
  KEY `mobile` (`mobile`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户私有权限';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_permission`
--

LOCK TABLES `user_permission` WRITE;
/*!40000 ALTER TABLE `user_permission` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wei_xin_access_token`
--

DROP TABLE IF EXISTS `wei_xin_access_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wei_xin_access_token` (
  `id` int(11) NOT NULL,
  `Token` varchar(1000) NOT NULL,
  `ExpireTime` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wei_xin_access_token`
--

LOCK TABLES `wei_xin_access_token` WRITE;
/*!40000 ALTER TABLE `wei_xin_access_token` DISABLE KEYS */;
INSERT INTO `wei_xin_access_token` VALUES (1,'abc','2015-01-01 00:00:00');
/*!40000 ALTER TABLE `wei_xin_access_token` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-04-22 12:07:15
