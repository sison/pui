$(document).ready(function () {

    //tree控件的渲染
    $("#productTree").treegrid({
        title: "产品指标",
//        height: 550,
//        rownumbers: true,  
        animate: true,
        loadMsg: "加载数据，请稍候...",
//      url: treeUrl,
		url: "/html/assets/global/scripts/tree.json",
        idField: 'ProductMeasuredId',
        treeField: 'ProductmeasureName',
        columns: [[
            {
                title: '', field: 'sortNumber', width: '12%', formatter: function (value, row) {
                    return '<input type="text" value="'+value+'" disabled />';
                }
            },
            {
                title: '名称', field: 'ProductmeasureName', width: '38%', formatter: function (value, row) {
                    return value + '（' + row.Alias + '）';
                }
            },
            {
                title: '扩展属性', field: 'IsMeasureAttrbute', width: '8%', formatter: function (value, row) {
                    if (value == true) {
                        var url = attributeUrl + '&productMeasureId=' + row.ProductMeasuredId;
                        return '<a href="' + url + '" >查看</a>';
                    }
                }
            },
            {
                title: '权重', field: 'Measureweight', width: '8%', formatter: function (value, row) {
                    if (row.Level == 2 || row.Level == 3) {
                        return '<input type="text"  name="matchweight" id="' + row.ProductMeasuredId + '" value="' + value + '" />';
                    }
                }
            },
            {
                title: '操作', field: 'Level', width: '34%', formatter: function (value, row) {
                    if (value == 1)
                    {
                        return '<a href="javascript:void(0)" onclick="openwin(this,' + row.ProductMeasuredId + ')" >+引入指标模块</a>';
                    }
                    else if (value == 2)
                    {
                        return '<a href="javascript:void(0)" onclick="openMeasure(this,' + row.ProductMeasuredId + ',' + value + ')" >+新建指标分类</a>  <a href="javascript:void(0)" onclick="openModMeasure(this,' + row.MeasureClassId + ',' + row.ProductMeasuredId + ')">引入指标</a>  <a href="javascript:void(0)" onclick="setMeasure(this,' + row.ProductMeasuredId + ')">设置</a>  <a href="javascript:void(0)" onclick="removeMeasure(this,' + row.ProductMeasuredId + ',' + value + ')">移除</a>';
                    }
                    else if (value == 3) {
                        if (row.IsDefinition == '1') {
                            return '<a href="javascript:void(0)" onclick="openModMeasure(this,' + row.MeasureClassId + ',' + row.ProductMeasuredId + ')">引入指标</a>  <a href="javascript:void(0)" onclick="setMeasure(this,' + row.ProductMeasuredId + ')">设置</a>  <a href="javascript:void(0)" onclick="removeMeasure(this,' + row.ProductMeasuredId + ',' + value + ')">移除</a>';
                        }
                        else {
                            return '<a href="javascript:void(0)" onclick="setMeasure(this,' + row.ProductMeasuredId + ')">设置</a>  <a href="javascript:void(0)" onclick="removeMeasure(this,' + row.ProductMeasuredId + ',' + value + ')">移除</a>';
                        }
                    }
                    else { 
                        return '<a href="javascript:void(0)" onclick="removeMeasure(this,' + row.ProductMeasuredId + ',' + value + ')">移除</a>';
                    }
                }
            }
        ]]
    });

    //新建指标分类
    $("#pdSave").click(function () {
        //产品编号
        var pid = $("#productId").val();
        //获取之前选中的编号
        var meaid = $("#meaclassid").val();
        //父类指标编号
        var parentid = $(this).attr("name");
        //现在选中的编号
        var ids = '';

        $("input[name='chekitem']").each(function () {

            if ($(this).is(":checked")) {
                if (ids == '')
                    ids = $(this).attr("id");
                else
                    ids += "," + $(this).attr("id");
            }
        });

        if (ids != '' && ids.length > 0) {


            $.post(
                AddModules,
                { pid: pid, meaclassid: ids, parentId: parentid },
                function (data) {
                    if (data.MsgType == "error") {
                        var $modal = $("#divMsg");
                        $modal.modal({ 'backdrop': 'static', 'height': '100px' });
                        $("#msgTitle").text("保存");
                        $("#msg").text(data.Msg);
                    }
                    else {
                        window.location.reload();
                    }
                }
                );
        }
        else {
            var $modal = $("#divMsg");
            $modal.modal({ 'backdrop': 'static', 'height': '100px' });
            $("#msgTitle").text("保存");
            $("#msg").text("请选择要操作的项");

        }

    });
    
    //保存
    $("#weisave").click(function () {

    });

    //提示消息框确定事件
    $("#msgbtn").click(function () {
        var id = $(this).attr("name");
        
        if (id != '' && id.length > 0) {
            //执行删除操作
            $.post(
                DelMeasure,
                { productmeasureId: id },
                function (data) {
                    if (data.MsgType == "error") {
                        var $modal = $("#divMsg");
                        $modal.modal({ 'backdrop': 'static', 'height': '100px' });
                        $("#msgTitle").text("保存");
                        $("#msg").text(data.Msg);
                    }
                    else {
                        window.location.reload();
                    }
                }
                );

            //执行完重新设置为空
            $(this).attr("name",'');
        }
        else {
            $('#divMsg').modal('hide');
        }
    });
	
	
	

});

function openwin(e, id) {
    var $modal = $("#ajax-modala");
    $modal.modal({ 'backdrop': 'static', 'height': '400px' });

    $("#pdSave").attr("name", id);

    //取消a标签默认动作
    e.preventDefault();
}

//新增指标分类
function openMeasure(e,measureid,level) {
    var $modal = $("#addMeasure");

    level =Number(level) + 1;

    var addurl = addMeasure + "&parentId=" + measureid + "&level=" + level;

    $modal.load(addurl, '', function () {
        $modal.modal({ 'backdrop': 'static', 'height': '400px' });
    });

    //取消a标签默认动作
    e.preventDefault();
}

//设置
function setMeasure(e, pmid)
{
    var $modal = $("#addMeasure");

    var seturl = addMeasure + "&pmid=" + pmid;

    $modal.load(seturl, '', function () {
        $modal.modal({ 'backdrop': 'static', 'height': '400px' });
    });

    //取消a标签默认动作
    e.preventDefault();
}

//移除
function removeMeasure(e, productmeasureId,level)
{
    var $modal = $("#divMsg");
    $modal.modal({ 'backdrop': 'static', 'height': '100px' });
    if (level == 2) {
        $("#msgTitle").text("删除指标组");
        $("#msg").text("确定删除该指标组？删除后将无法恢复。");
    }
    else {
        $("#msgTitle").text("删除指标");
        $("#msg").text("确定移除该指标？移除后可重新引入。");
    }

    $("#msgbtn").attr("name", productmeasureId);
}

//引入指标
function openModMeasure(e, measureid, pmid)
{
    var $modal = $("#modMeasure");
    var modurl= modMeasure + "&moduleId=" + measureid + "&pmid=" + pmid+"&d="+new Date().getTime();

    $modal.load(modurl, '', function () {
        $modal.modal({ 'backdrop': 'static', 'height': '400px' });
    });

    //取消a标签默认动作
    e.preventDefault();
}






