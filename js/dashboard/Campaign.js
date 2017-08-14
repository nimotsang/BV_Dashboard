$(document).ready(function () {
    var editor = new $.fn.dataTable.Editor({
        display: onPageDisplay($('#Campaign_Header_Display')),
        template: '#Campaign_Header_Template',
        idSrc: 'Campaign_Code',
        table: '#Campaign_Table',
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
        table: '#Campaign_Table',
        display: onPageDisplay($('#Main_Panel_Display')),
        template: '#Main_Panel_Template',
        fields: [
            { label: '活动编号: ', name: 'Campaign_Code' },
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
                format: 'YYYY-MM-DD',
            }

        ]
    });
    var editordetail1 = new $.fn.dataTable.Editor({

        idSrc: 'Exclude_Type',
        table: '#Campaign_Detail_Table1',
        fields: [
            { label: '活动ID: ', name: 'Campaign_ID',type:'hidden' },
            { label: '排除日期类型: ', name: 'Exclude_Type' },
            { label: '排除日期类型: ', name: 'Exclude_Value' }
        ]
    });
    var editordetail2 = new $.fn.dataTable.Editor({

        idSrc: 'Product_Code',
        table: '#Campaign_Detail_Table2',
        fields: [
            { label: '活动ID: ', name: 'Campaign_ID', type: 'hidden' },
            { label: '商品代码: ', name: 'Product_Code' },
            { label: '商品名称: ', name: 'Product_Name' },
            { label: '别名: ', name: 'Refernce_Name' },
            { label: '图片: ', name: 'Product_Img' },
            { label: '数量: ', name: 'Quantity' },
            { label: '备注: ', name: 'Note' }
        ]
    });
    var editordetail3 = new $.fn.dataTable.Editor({

        idSrc: 'Merchant_Code',
        table: '#Campaign_Detail_Table3',
        fields: [
            { label: '活动ID: ', name: 'Campaign_ID', type: 'hidden' },
            { label: '商品代码: ', name: 'Product_Code', type: 'readonly' },
            { label: '商品名称: ', name: 'Product_Name' },
            { label: '商户代码: ', name: 'Merchant_Code', type: 'readonly' },
            { label: '商户名称: ', name: 'Merchant_Name' },
            { label: '门店代码: ', name: 'Store_Code' },
            { label: '门店名称: ', name: 'Store_Name' },
            { label: '地址: ', name: 'Address' },
            { label: '联系人: ', name: 'Contacts' },
            { label: '电话: ', name: 'Phone' },
            { label: '价格: ', name: 'Retail_Price' },
            { label: '成本: ', name: 'Cost_Price' },
            { label: '开始时间: ', name: 'Start_Date' },
            { label: '结束时间: ', name: 'End_Date' }
        ]
    });
    //初始化报表
    var table = $("#Campaign_Table").DataTable({
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
               text: '新建',
               action: function () {
                   editor.create();
                   $("div#page-header").toggleClass("hidden", "show");
                   $("div#page-detail").toggleClass("hidden", "show");
                   $("input").addClass("form-control");
                   buttonHeaderDisplay.container().appendTo($("form#Campaign_Header_Template"));
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
                   buttonHeaderDisplay.container().appendTo($("form#Campaign_Header_Template"));
                   $("div.dt-buttons.btn-group").css({ "float": "right", "padding-right": "0" });

                   var param = {};
                   if (editor.field("Campaign_ID").val()) {
                       param.append = true;
                       param.Campaign_ID = editor.field("Campaign_ID").val();
                       param.subTable = true;
                       param.appendsubTableName1 = true;
                       param.clearSubTableName1 = false;
                       param.appendsubTableName2 = true;
                       param.clearSubTableName2 = false;
                       applyData("BVSP_CAMPAIGN_SEARCH_DETAIL", param, table_detail1,table_detail2,table_detail3);
                   }

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

    var table_detail1 = $("#Campaign_Detail_Table1").DataTable({
        dom: 'Bt',
        select: 'single',
        "searching": false,
        order: [[0, "asc"]],
        ordering: false,
        columns: [
        { "data": "Exclude_Type" },
        { "data": "Exclude_Value" }
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
               text: '新建',
               action: function () {

                   editordetail1.create();
                   buttonEditorDetail1.container().appendTo("div.DTE_Footer.modal-footer")
               }
           },
           {
               text: '修改',
               action: function () {

                   editordetail1.edit(table_detail1.rows({ selected: true }));
                   buttonEditorDetail1.container().appendTo("div.DTE_Footer.modal-footer")
               }
           },


        ]
    });
    var table_detail2 = $("#Campaign_Detail_Table2").DataTable({
        dom: 'Bt',
        select: 'single',
        "searching": false,
        order: [[0, "asc"]],
        ordering: false,
        columns: [
        { "data": "Product_Code"},
        { "data": "Product_Name" },
        { "data": "Refernce_Name" },
        { "data": "Product_Img" },
        { "data": "Quantity" },
        { "data": "Note" }
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
               text: '新建',
               action: function () {

                   editordetail2.create();
                   buttonEditorDetail2.container().appendTo("div.DTE_Footer.modal-footer")
               }
           },
           {
               text: '修改',
               action: function () {

                   editordetail2.edit(table_detail2.rows({ selected: true }));
                   buttonEditorDetail2.container().appendTo("div.DTE_Footer.modal-footer")

               }
           },


        ]
    });
    var table_detail3 = $("#Campaign_Detail_Table3").DataTable({
        dom: 'Bt',
        select: 'single',
        searching: false,
        order: [[0, "asc"]],
        ordering:false,
        columns: [
        { "data": "Merchant_Code" },
        { "data": "Merchant_Name" },
        { "data": "Store_Code" },
        { "data": "Store_Name" },
        { "data": "Address" },
        { "data": "Contacts" },
        { "data": "Phone" },
        { "data": "Retail_Price" },
        { "data": "Cost_Price" },
        {
            "data": "Start_Date", render: function (data, type, row) {
                return data.substring(0, 10)
            }
        },
        {
            "data": "End_Date", render: function (data, type, row) {
                return data.substring(0, 10)
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
               text: '新建',
               action: function () {

                   editordetail3.create();
                   buttonEditorDetail3.container().appendTo("div.DTE_Footer.modal-footer")
               }
           },
           {
               text: '修改',
               action: function () {

                   editordetail3.edit(table_detail3.rows({ selected: true }));
                   buttonEditorDetail3.container().appendTo("div.DTE_Footer.modal-footer")

               }
           }

        ]
    });
    //初始化查询窗体
    mainpanel.create();
    $("input").addClass("form-control");

    //初始化主面板按键
    var buttonPanelDisplay = new $.fn.dataTable.Buttons(table, {
        buttons: [
                        {
                            text: '查询',
                            className: 'btn btn-primary',
                            action: function () {

                                var param = {};
                                param.clearTable = true;
                                //组合搜索条件
                                for (var item in mainpanel.fields()) {
                                    switch (mainpanel.fields()[item]) {
                                        case "Campaign_Code": {
                                            if (mainpanel.field("Campaign_Code").val()) {
                                                if (!param.Campaign_Code) {
                                                    param.Campaign_Code = mainpanel.field("Campaign_Code").val();
                                                }
                                                break;
                                            }
                                        }
                                        case "Campaign_Name": {
                                            if (mainpanel.field("Campaign_Name").val()) {
                                                if (!param.Campaign_Name) {
                                                    param.Campaign_Name = mainpanel.field("Campaign_Name").val();
                                                }
                                                break;
                                            }
                                        }
                                        case "Start_Date": {
                                            if (mainpanel.field("Start_Date").val()) {
                                                if (!param.Start_Date) {
                                                    param.Start_Date = mainpanel.field("Start_Date").val();
                                                }
                                                break;
                                            }
                                        }
                                        case "End_Date": {
                                            if (mainpanel.field("End_Date").val()) {
                                                if (!param.End_Date) {
                                                    param.End_Date = mainpanel.field("End_Date").val();
                                                }
                                                break;
                                            }
                                        }
                                    }
                                }
                                applyData("BVSP_CAMPAIGN_SEARCH", param, table);

                            }
                        },
            {
                text: '重置',
                action: function () {

                    mainpanel.field("Campaign_Code").set();
                    mainpanel.field("Campaign_Name").set();
                    mainpanel.field("Start_Date").set();
                }
            }
        ]

    });
    table.on('init.dt', function (e, settings, json) {
        buttonPanelDisplay.container().appendTo($("form#Main_Panel_Display"));
        $("div.dt-buttons.btn-group").css({ "float": "right", "padding-right": "0" });
    });
    //初始化明细面板按键
    var buttonHeaderDisplay = new $.fn.dataTable.Buttons(table_detail1, {
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
                                           param.Start_Date = Number(editor.field("Start_Date").val());
                                           param.End_Date = Number(editor.field("End_Date").val());

                                           applyData("BVSP_CAMPAIGN_UPDATE", param, table);

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
                    //editor.display(onPageDisplay($('#Campaign_Header_Display')));
                    $("div#page-detail").toggleClass("hidden", "show");
                    $("div#page-header").toggleClass("hidden", "show");
                    //$("label").removeClass();
                    //$("label").css("display","flex","margin-left","15px");
                }
            },
        ]

    });
    //初始化明细编辑窗体按键
    var buttonEditorDetail1 = new $.fn.dataTable.Buttons(table_detail1, {
        buttons: [
                                   {
                                       text: '保存',
                                       className: 'btn btn-primary',
                                       action: function (e) {

                                           var param = {};
                                           if (editordetail1.field("Campaign_ID").val()) {
                                               param.append = false;

                                           }
                                           else {
                                               param.append = true;
                                               param.Campaign_ID = null;
                                                }
                                           param.Exclude_Type = editor.field("Exclude_Type").val();
                                           param.Exclude_Value = editor.field("Exclude_Value").val();

                                           applyData("#", param, table);

                                       }
                                   },
            {
                text: '取消',
                action: function () {
                    editordetail1.blur()
                }
            },
        ]

    });
    var buttonEditorDetail2= new $.fn.dataTable.Buttons(table_detail2, {
        buttons: [
                                   {
                                       text: '保存',
                                       className: 'btn btn-primary',
                                       action: function (e) {

                                           var param = {};
                                           if (editordetail2.field("Campaign_ID").val()) {
                                               param.append = false;

                                           }
                                           else {
                                               param.append = true;
                                               param.Campaign_ID = null;
                                           }
                                           param.Product_Code = editor.field("Product_Code").val();
                                           param.Product_Name = editor.field("Product_Name").val();
                                           param.Refernce_Name = editor.field("Refernce_Name").val();
                                           param.Product_Img = editor.field("Product_Img").val();
                                           param.Quantity = editor.field("Quantity").val();
                                           param.Note = editor.field("Note").val();
                                           applyData("#", param, table);

                                       }
                                   },
            {
                text: '取消',
                action: function () {
                    editordetail2.blur()
                }
            },
        ]

    });
    var buttonEditorDetail3 = new $.fn.dataTable.Buttons(table_detail3, {
        buttons: [
                                   {
                                       text: '保存',
                                       className: 'btn btn-primary',
                                       action: function (e) {

                                           var param = {};
                                           if (editordetail3.field("Campaign_ID").val()) {
                                               param.append = false;

                                           }
                                           else {
                                               param.append = true;
                                               param.Campaign_ID = null;
                                           }
                                           param.Merchant_Code = editor.field("Merchant_Code").val();
                                           param.Merchant_Name = editor.field("Merchant_Name").val();
                                           param.Product_Code = editor.field("Product_Code").val();
                                           param.Product_Name = editor.field("Product_Name").val();
                                           param.Store_Code = editor.field("Store_Code").val();
                                           param.Store_Name = editor.field("Store_Name").val();
                                           param.Address = editor.field("Address").val();
                                           param.Contacts = editor.field("Contacts").val();
                                           param.Retail_Price = editor.field("Retail_Price").val();
                                           param.Cost_Price = editor.field("Cost_Price").val();
                                           param.Start_Date = editor.field("Start_Date").val();
                                           param.End_Date = editor.field("End_Date").val();
                                           applyData("#", param, table);

                                       }
                                   },
            {
                text: '取消',
                action: function () {
                    editordetail3.blur()
                }
            },
        ]

    });
});




