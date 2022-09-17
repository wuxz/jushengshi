var editor;
KindEditor.ready(function(K) {
	editor = K.create('textarea[name="zhengWen"]', {
		autoHeightMode : true,
		allowImageUpload : false,
		// items : [ 'image' ],
		pasteType : 2,
		filterMode : true,
		htmlTags : {
			font : [ 'color', 'size', 'face', '.background-color' ],
			span : [ '.color', '.background-color', '.font-size',
					'.font-family', '.background', '.font-weight',
					'.font-style', '.text-decoration', '.vertical-align',
					'.line-height' ],
			table : [ 'border', 'cellspacing', 'cellpadding', 'width',
					'height', 'align', 'bordercolor', '.padding', '.margin',
					'.border', 'bgcolor', '.text-align', '.color',
					'.background-color', '.font-size', '.font-family',
					'.font-weight', '.font-style', '.text-decoration',
					'.background', '.width', '.height', '.border-collapse' ],
			'td,th' : [ 'align', 'valign', 'width', 'height', 'colspan',
					'rowspan', 'bgcolor', '.text-align', '.color',
					'.background-color', '.font-size', '.font-family',
					'.font-weight', '.font-style', '.text-decoration',
					'.vertical-align', '.background', '.border' ],
			a : [ 'href', 'target', 'name' ],
			img : [ 'src', 'width', 'height', 'border', 'alt', 'title',
					'align', '.width', '.height', '.border' ],
			'p,ol,ul,li,blockquote,h1,h2,h3,h4,h5,h6' : [ 'align',
					'.text-align', '.color', '.background-color', '.font-size',
					'.font-family', '.background', '.font-weight',
					'.font-style', '.text-decoration', '.vertical-align',
					'.text-indent', '.margin-left' ],
			hr : [ '.page-break-after' ],
			'br,tbody,tr,strong,b,sub,sup,em,i,u,strike,s,del' : []
		},
		afterCreate : function() {
			this.loadPlugin('autoheight');
		},
		afterBlur : function() {
			this.sync();
		}
	});

	var rules = {
		zhengWen : {
			required : true,
		},
	};

	var validator = validform("#fm1", rules);

	$('.saveAggrementBtn').click(function() {
		if (!validator.form()) {
			alertMsg('请填写正确的内容');

			return;
		}

		$('#fm1').submit();
	});

});
