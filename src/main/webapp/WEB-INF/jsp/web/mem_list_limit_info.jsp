<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="taglib.jsp"%>
<title>通讯录 - 剧省事儿</title>
<link rel="stylesheet" href="/resources/web/css/include/reset.css">
<link rel="stylesheet" href="/resources/web/css/header.css">
<link rel="stylesheet" href="/resources/web/css/screenplay.css">
<link rel="stylesheet" href="/resources/web/css/limitInfo.css">
</head>
<body>
	<%@include file="header.jsp"%>
	<div class="content">
		<div class="contTop">
			<a href="member_list?staffId=${staffId}">通讯录</a> > <span>权限说明</span>
		</div>
		<div class="memItem">
			<p>
				<span>创建者</span>:制片人在本软件中创建剧组的人默认为创建者权限，即所谓的超级管理员
			</p>
			<p>
				<span>管理员</span>：由创建者任命，协助创建者在系统中进行信息编辑和人员管理的人，除了将具体协助创建者执行的人设置为管理员外，建议将剧组的核心高层统一设置为管理员
			</p>
			<p>
				<span>组长</span>：当管理员或创建者任命某人是某分组组（如制片组）的组长时，该人员就具有了组长的权限
			</p>
			<p>
				<span>成员</span>：剧组里最基层的工作人员
			</p>
			<div class="waveLine"></div>
		</div>
		<h2 class="tabIndex">各个角色所具有的权限状态如下表所列：</h2>
		<table>
			<thead>
				<tr class="limitTh">
					<th>序号</th>
					<th>权限内容</th>
					<th>创建者</th>
					<th>管理员</th>
					<th>组长</th>
					<th>成员</th>
				</tr>
			</thead>
			<tbody class="limitTd">
				<tr class="tblRows">
					<td>1</td>
					<td>发送剧本/期表/分场表</td>
					<td class="yes">√</td>
					<td class="yes">√</td>
					<td class="yes">√</td>
					<td class="no">×</td>
				</tr>
				<tr class="tblRows">
					<td>2</td>
					<td>开启或关闭查看剧本权限</td>
					<td class="yes">√</td>
					<td class="yes">√</td>
					<td class="yes">√<br>
					<span>(只针对本组人员)</span></td>
					<td class="no">×</td>
				</tr>
				<tr class="tblRows">
					<td>3</td>
					<td>默认可查看期表/分场表/剧本</td>
					<td class="yes">√</td>
					<td class="yes">√</td>
					<td class="yes">√</td>
					<td class="no">×</td>
				</tr>
				<tr class="tblRows">
					<td>4</td>
					<td>移出/移入组里成员</td>
					<td class="yes">√</td>
					<td class="yes">√</td>
					<td class="yes">√<br>
					<span>(只针对本组人员)</span></td>
					<td class="no">×</td>
				</tr>
				<tr class="tblRows">
					<td>5</td>
					<td>更改自己权限以下人的权限</td>
					<td class="yes">√</td>
					<td class="yes">√</td>
					<td class="no">×</td>
					<td class="no">×</td>
				</tr>
				<tr class="tblRows">
					<td>6</td>
					<td>邀请成员加入剧组</td>
					<td class="yes">√</td>
					<td class="yes">√</td>
					<td class="no">×</td>
					<td class="no">×</td>
				</tr>
				<tr class="tblRows">
					<td>7</td>
					<td>编辑/修改全部人员信息</td>
					<td class="yes">√</td>
					<td class="yes">√</td>
					<td class="no">×</td>
					<td class="no">×</td>
				</tr>
				<tr class="tblRows">
					<td>8</td>
					<td>编辑，发布拍摄通告</td>
					<td class="yes">√</td>
					<td class="yes">√</td>
					<td class="no">×</td>
					<td class="no">×</td>
				</tr>
				<tr class="tblRows">
					<td>9</td>
					<td>导出人员为excel</td>
					<td class="yes">√</td>
					<td class="yes">√</td>
					<td class="no">×</td>
					<td class="no">×</td>
				</tr>
				<tr class="tblRows">
					<td>10</td>
					<td>上传，更改剧本拍摄状态</td>
					<td class="yes">√</td>
					<td class="yes">√</td>
					<td class="no">×</td>
					<td class="no">×</td>
				</tr>
				<tr class="tblRows">
					<td>11</td>
					<td>收回剧本查看权限</td>
					<td class="yes">√</td>
					<td class="yes">√</td>
					<td class="yes">√<br>
					<span>(只针对本组人员)</span></td>
					<td class="no">×</td>
				</tr>
				<tr class="tblRows">
					<td>12</td>
					<td>查看所有组员的身份证号和银行账号</td>
					<td class="yes">√</td>
					<td class="yes">√</td>
					<td class="no">×</td>
					<td class="no">×</td>
				</tr>
				<tr class="tblRows">
					<td>13</td>
					<td>删除剧组自己权限之下的通讯录成员</td>
					<td class="yes">√</td>
					<td class="yes">√</td>
					<td class="no">×</td>
					<td class="no">×</td>
				</tr>
				<tr class="tblRows">
					<td>14</td>
					<td>创建/解散/编辑组</td>
					<td class="yes">√</td>
					<td class="yes">√</td>
					<td class="no">×</td>
					<td class="no">×</td>
				</tr>
				<tr class="tblRows">
					<td>15</td>
					<td>更改剧组中人的在组状态</td>
					<td class="yes">√</td>
					<td class="yes">√</td>
					<td class="no">×</td>
					<td class="no">×</td>
				</tr>
				<tr class="tblRows">
					<td>16</td>
					<td>设置剧组成员电话号码状态（公开or保密）</td>
					<td class="yes">√</td>
					<td class="yes">√</td>
					<td class="no">×</td>
					<td class="no">×</td>
				</tr>
				<tr class="tblRows">
					<td>17</td>
					<td>编辑，发布期表</td>
					<td class="yes">√</td>
					<td class="yes">√</td>
					<td class="no">×</td>
					<td class="no">×</td>
				</tr>
				<tr class="tblRows">
					<td>18</td>
					<td>查看总览栏目</td>
					<td class="yes">√</td>
					<td class="yes">√</td>
					<td class="no">×</td>
					<td class="no">×</td>
				</tr>
				<tr class="tblRows">
					<td>19</td>
					<td>删除/归档/恢复剧组项目</td>
					<td class="yes">√</td>
					<td class="no">×</td>
					<td class="no">×</td>
					<td class="no">×</td>
				</tr>
				<tr class="tblRows">
					<td>20</td>
					<td>退出剧组</td>
					<td class="no">×</td>
					<td class="yes">√</td>
					<td class="yes">√</td>
					<td class="yes">√</td>
				</tr>
			</tbody>
		</table>
	</div>
</body>
</html>