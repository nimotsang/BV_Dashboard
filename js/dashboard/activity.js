$(document).ready(function() {
    var editor = new $.fn.dataTable.Editor({

        ajax: {
            "edit": {
                "url": sysSettings.domainPath + "BVSP_CAMPAIGN_UPDATE",
                "async": true,
                "crossDomain": true,
                "type": "POST",
                "dataType": "json",
                "contentType": "application/json; charset=utf-8",
                "data": function () {
                    var param = {
                        "token": SecurityManager.generate(),
                        "Campaign_ID": editor.field('Campaign_ID').val(),
                        "Campaign_Name": editor.field('Campaign_Name').val(),
                        "Start_Date": editor.field('Start_Date').val(),
                        "End_Date": editor.field('End_Date').val()
                    }
                    return JSON.stringify(param);
                }
            },
            "create": {

                "url": sysSettings.domainPath + "BVSP_CAMPAIGN_UPDATE",
                "async": true,
                "crossDomain": true,
                "type": "POST",
                "dataType": "json",
                "contentType": "application/json; charset=utf-8",
                "data": function () {
                    var param = {
                        "token": SecurityManager.generate(),
                        "Campaign_Name": editor.field('Campaign_Name').val(),
                        "Start_Date": editor.field('Start_Date').val(),
                        "End_Date": editor.field('End_Date').val()
                    }
                    return JSON.stringify(param);
                }
            }


        },
        idSrc: 'Campaign_Code',
        table: '#ActivityTable',
        fields: [
            { label: 'Campaign_ID: ', name: 'Campaign_ID', type: 'hidden' },
            { label: '活动编号: ', name: 'Campaign_Code',type:'readonly' },
            { label: '活动名称: ', name: 'Campaign_Name' },
            {
                label: '开始时间: ', name: 'Start_Date',
                type: 'datetime',
                data: function (row) {
                    if (row.Start_Date.length !== undefined) {
                        return row.Start_Date.substring(0, 10)
                    } else {
                        return new Date();
                    }
                },
                def: function () {
                    return new Date();
                },
                format: 'YYYY-MM-DD',
            },
            {
                label: '结束时间: ', name: 'End_Date',
                type: 'datetime',
                data: function (row) {
                    if (row.End_Date.length !== undefined) {
                        return row.End_Date.substring(0, 10)
                    } else {
                        return new Date();
                    }
                },
                def: function () {
                    return new Date();
                },
                format: 'YYYY-MM-DD',
            }

        ],
        //自定义语言
        i18n: {
            "create": {
                "button": '新增',
                "title": '新增活动',
                "submit": '提交'
            },
            "edit": {
                "button": '修改',
                "title": '活动管理',
                "submit": '提交'
            },
            "multi": {
                "title": "批量修改",
                "info": "批量修改帮助您将所选单元格中的值修改为同一值，要继续修改请单击按钮",
                "restore": "取消修改"
            }
        }
    });


    editor.on('postSubmit', function (e, json) {
        json.data = json.ResultSets[0]

    });
    editor.on('initEdit', function (e, node, data) {
        //getmerchanttype(e,data);
    });
    editor.on('initCreate', function (e, data) {
        //getmerchanttype(e, data);;
    });

    //初始化报表
    var table=$("#ActivityTable").DataTable({
        processing:false,
        dom:'Bfrtip',
        select: true,
        order: [[0, "asc"]],
        columns: [
        { "data": "Campaign_Code" },
        { "data": "Campaign_Name" },
        {
            "data": "Start_Date", "render": function (data, type, row) {
                if (data.length > 0) {
                    return data.substring(0, 10);
                }
            }
        },
        {
            "data": "End_Date", "render": function (data, type, row) {
                if (data.length > 0) {
                    return data.substring(0, 10);
                }
            }
        }
        ],
        "columnDefs":[
            {"width":"20%","targets":0}
        ],
        ajax:{
            "url": sysSettings.domainPath + "BVSP_CAMPAIGN_SEARCH",
            "async": true,
            "crossDomain": true,
            "type": "POST",
            "dataType": "json",
            "contentType": "application/json; charset=utf-8",
            "data": function () {
                var param = {
                    "token": SecurityManager.generate(),
                }
                return JSON.stringify(param);
            },
            "dataType": "json",
            "dataSrc":function (data) {
                data = data.ResultSets[0]
                return data;

            }
        },

         language: {
             url: "../vendor/datatables/Chinese.json",
             select:{
                 rows:{
                     _: "已选中 %d 行",
                     0:""
                     }
                 }
         },
            //添加按键 编辑，打印及导出
         buttons: [
             { extend: 'create', editor: editor, text: '新建' },
             { extend: 'edit', editor: editor, text: '修改' },
             { extend: 'print', text: '打印' },
             {
                 extend: 'collection',
                 text: '导出到..',
                 buttons: [
                     'excel',
                     'csv'
                 ]
             }


         ]
    });
    //    table.ajax.reload(null, false);

    //获得产品清单
    function getmerchanttype(e, data) {
        var exdata = [];
        var selectMerchantType = []
        var param = {};
        param.token = SecurityManager.generate();
        param.username = SecurityManager.username;
        // Get existing options
        if (e.type === 'initEdit') {
            exdata = data
        }
        $.ajax({
            "url": sysSettings.domainPath + "BVSP_Merchant_Type_SEARCH",
            "type": "POST",
            "async": true,
            "crossDomain": true,
            "dataType": "json",
            "contentType": "application/json; charset=utf-8",
            "data": JSON.stringify(param),
            "success": function (data) {
                data = data.ResultSets[0]
                if (data !== 'undefined') {
                    for (var item in data) {
                                if (typeof (exdata.Merchant_Type_Name) !== 'undefined'/** 判断是新建还是编辑 **/) {
                                    if (exdata.Merchant_Type_Name === data[item].Merchant_Type_Name) {
                                        selectMerchantType.unshift({ label: data[item].Merchant_Type_Name, value: data[item].Merchant_Type_ID });
                                    } else {
                                        selectMerchantType.push({ label: data[item].Merchant_Type_Name, value: data[item].Merchant_Type_ID });
                                    }
                                } else {
                                    selectMerchantType.push({ label: data[item].Merchant_Type_Name, value: data[item].Merchant_Type_ID });
                                }
                    };
                }
                editor.field("Merchant_Type").update(selectMerchantType)
            }
        });

    }
    });




