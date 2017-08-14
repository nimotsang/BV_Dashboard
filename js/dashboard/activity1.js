$(document).ready(function () {
    var editor = new $.fn.dataTable.Editor({
        idSrc: 'Campaign_Code',
        table: '#ActivityTable',
        fields: [
            { label: 'Campaign_ID: ', name: 'Campaign_ID', type: 'hidden' },
            { label: '活动编号: ', name: 'Campaign_Code', type: 'readonly' },
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
    });
    var mainpanel = new $.fn.dataTable.Editor({

        idSrc: 'Campaign_Code',
        table: '#ActivityTable',
        display: onPageDisplay($('#Main_Panel_Display')),
        template: '#Main_Panel_Template',
        fields: [
            { label: '活动编号: ', name: 'Campaign_Code', type: 'readonly' },
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


        ]
    });

    //初始化报表
    var table = $("#ActivityTable").DataTable({
        processing: false,
        dom: 'Bfrtip',
        select: 'single',
        "searching": false,
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

        language: {
            url: "../vendor/datatables/Chinese.json",
            select: {
                rows: {
                    _: "已选中 %d 行",
                    0: ""
                }
            }
        },
        //添加按键 编辑，打印及导出
        buttons: [
            {
                text: '查询',
                action: function () {

                    var param = {};
                    param.clearTable = true;
                    if(mainpanel.field("Campaign_Code").val()){
                        param.Campaign_Code=mainpanel.field("Campaign_Code").val();
                    }else if(mainpanel.field("Campaign_Name").val()){
                        param.Campaign_Name=mainpanel.field("Campaign_Name").val();
                    }else if(mainpanel.field("Start_Date").val()){
                        param.Start_Date=mainpanel.field("Start_Date").val();
                    }

                    applyData(table, "BVSP_CAMPAIGN_SEARCH",param);

                }
            },
            {
                text: '重置',
                action: function () {

                    mainpanel.field("Campaign_Code").set();
                    mainpanel.field("Campaign_Name").set();
                    mainpanel.field("Start_Date").set();
                }
            },
           {
               text: '新建',
               action: function () {

                   editor.create();
                   onPageDisplay($('#Main_Panel_Display'));
                   $("div#page-header").toggleClass("hidden", "show");
                   $("div#page-detail").toggleClass("hidden", "show");
                   $("input").addClass("form-control");
                   table_detail.buttons().container().appendTo($("form#Campaign_Header_Template"));
                   $("div.dt-buttons.btn-group").css({ "float": "right", "padding-right": "0" });
               }
           },
           {
               text: '修改',
               action: function () {

                   editor.edit(table.rows({ selected: true }));
                   $("div#page-header").toggleClass("hidden", "show");
                   $("div#page-detail").toggleClass("hidden", "show");
                   $("input").addClass("form-control");
                   table_detail.buttons().container().appendTo($("form#Campaign_Header_Template"));
                   $("div.dt-buttons.btn-group").css({ "float": "right", "padding-right": "0" });

               }
           },
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

    var table_detail = $("#Campaign_Detail_Table").DataTable({
        processing: false,
        dom: 'B',
        select: 'single',
        "searching": false,
        order: [[0, "asc"]],
        columns: [
        { "data": "Campaign_Code" },
        { "data": "Campaign_Name" },
        { "data": "Start_Date" },
        { "data": "End_Date" }
        ],

        language: {
            url: "../vendor/datatables/Chinese.json",
            select: {
                rows: {
                    _: "已选中 %d 行",
                    0: ""
                }
            }
        },
        //添加按键 编辑，打印及导出
        buttons: [
            {
                text: '保存',
                action: function (e) {

                    var param = {};
                    if (editor.field("Campaign_Code").val()) {
                        param.append = false;
                        param.Campaign_ID = editor.field("Campaign_ID").val()
                        param.Campaign_Code = editor.field("Campaign_Code").val()
                    }
                    else {
                        param.append = true;
                        param.Campaign_ID = null;
                        param.Campaign_Code = null;
                    }
                    param.Campaign_Name = editor.field("Campaign_Name").val();
                    param.Start_Date = editor.field("Start_Date").val();
                    param.End_Date = editor.field("End_Date").val();


                    applyData(table, "BVSP_CAMPAIGN_UPDATE", param);

                }
            },
            {
                text: '取消',
                action: function () {
                }
            },
            {
                text: '返回',
                action: function (e, dt, node, config) {
                    //editor.close().display(false);
                    editor.display(onPageDisplay($('#Campaign_Header_Display')));
                    $("div#page-detail").toggleClass("hidden", "show");
                    $("div#page-header").toggleClass("hidden", "show");
                    //$("label").removeClass();
                    //$("label").css("display","flex","margin-left","15px");
                }
            }


        ]
    });
    //初始化查询窗体
    mainpanel.create();
    $("input").addClass("form-control");
    //初始化按键
    table.on('init.dt', function (e, settings, json) {
        table.buttons().container().appendTo($("form#Main_Panel_Display"));
        $("div.dt-buttons.btn-group").css({ "float": "right", "padding-right": "15px" });
    });

});




