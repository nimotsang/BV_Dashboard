$(document).ready(function () {
    var editor = new $.fn.dataTable.Editor({

        //ajax: {

        //    "edit": {
        //        "url": sysSettings.domainPath + "BVSP_PRODUCT_UPDATE",
        //        "async": true,
        //        "crossDomain": true,
        //        "type": "POST",
        //        "dataType": "json",
        //        "contentType": "application/json; charset=utf-8",
        //        "data": function () {
        //            var param = {
        //                "token": SecurityManager.generate(),
        //                "Product_ID": editor.field('Product_ID').val(),
        //                "Product_Name": editor.field('Product_Name').val(),
        //                "Unit_Price": editor.field('Unit_Price').val(),
        //                "Product_Img": editor.field('Product_Img').val()
        //            }
        //            return JSON.stringify(param);
        //        },
        //    },
        //    "create": {

        //        "url": sysSettings.domainPath + "BVSP_PRODUCT_UPDATE",
        //        "async": true,
        //        "crossDomain": true,
        //        "type": "POST",
        //        "dataType": "json",
        //        "contentType": "application/json; charset=utf-8",
        //        "data": function () {
        //            var param = {
        //                "token": SecurityManager.generate(),
        //                "Product_ID": editor.field('Product_ID').val(),
        //                "Product_Name": editor.field('Product_Name').val(),
        //                "Unit_Price": editor.field('Unit_Price').val(),
        //                "Product_Img": editor.field('Product_Img').val()
        //            }
        //            return JSON.stringify(param);
        //        },
        //    }
        //},
        idSrc: 'Product_Code',
        table: '#ProductTable',
        display: onPageDisplay($('#Product_Header_Display')),
        template: '#Product_Header_Template',
        fields: [
            { label: 'Product_ID: ', name: 'Product_ID', type: 'hidden' },
            { label: '产品编号: ', name: 'Product_Code',type:'readonly' },
            { label: '产品名称: ', name: 'Product_Name' },
            { label: '参考价: ', name: 'Unit_Price' },
            { label: '图片路径: ', name: 'Product_Img' }




            //门店查询条件
            // { label: '商户代码: ', name: 'Merchant_Code' },
            // { label: '商户名称: ', name: 'Merchant_Name' },
            // { label: '门店代码: ', name: 'Store_Code', type: 'select', placeholder: '未定义' },
            // { label: '门店名称: ', name: 'Store_Name', type: 'select', placeholder: '未定义' },
            // { label: '地址: ', name: 'Address', type: 'select', placeholder: '未定义' },
            // { label: '电话: ', name: 'Phone', type: 'select', placeholder: '未定义' },
            // { label: '联系人: ', name: 'Contacts', type: 'select', placeholder: '未定义' }

        ],
    });
    var mainpanel = new $.fn.dataTable.Editor({

        idSrc: 'Product_Code',
        table: '#ProductTable',
        display: onPageDisplay($('#Main_Panel_Display')),
        template: '#Main_Panel_Template',
        fields: [
            { label: '产品代码: ', name: 'Product_Code'},
            { label: '产品名称: ', name: 'Product_Name' },
            { label: '参考价: ', name: 'Unit_Price' },


        ]
    });

    //初始化报表
    var table = $("#ProductTable").DataTable({
        processing: false,
        dom: 'Bfrtip',
        select: 'single',
        "searching": false,
        order: [[0, "asc"]],
        columns: [
        { "data": "Product_Code" },
        { "data": "Product_Name" },
        { "data": "Unit_Price" },
        ],
/**        "columnDefs": [
            { "width": "20%", "targets": 0 }
        ], **/

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
                    if(mainpanel.field("Product_Code").val()){
                        param.Product_Code=mainpanel.field("Product_Code").val();
                    }else if(mainpanel.field("Product_Name").val()){
                        param.Product_Name=mainpanel.field("Product_Name").val();
                    }else if(mainpanel.field("Unit_Price").val()){
                        param.Unit_Price=Number(mainpanel.field("Unit_Price").val());
                    }

                    applyData(table, "BVSP_PRODUCT_SEARCH",param);

                }
            },
            {
                text: '重置',
                action: function () {

                    mainpanel.field("Product_Code").set();
                    mainpanel.field("Product_Name").set();
                    mainpanel.field("Unit_Price").set();
                }
            },
           {
               text: '新建',
               action: function () {

                   editor.create();
                   $("div#page-header").toggleClass("hidden", "show");
                   $("div#page-detail").toggleClass("hidden", "show");
                   $("input").addClass("form-control");
                   table_detail.buttons().container().appendTo($("form#Product_Header_Template"));
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
                   table_detail.buttons().container().appendTo($("form#Product_Header_Template"));
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

    var table_detail = $("#Product_Detail_Table").DataTable({
        processing: false,
        dom: 'B',
        select: 'single',
        "searching": false,
        order: [[0, "asc"]],
        columns: [
        { "data": "Product_Code" },
        { "data": "Product_Name" },
        { "data": "Unit_Price" },
        ],
        /**        "columnDefs": [
                    { "width": "20%", "targets": 0 }
                ], **/

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
                    if (editor.field("Product_Code").val()) {
                        param.append = false;
                        param.Product_ID = editor.field("Product_ID").val()
                        param.Product_Code = editor.field("Product_Code").val()
                    }
                    else {
                        param.append = true;
                        param.Product_ID = null;
                        param.Product_Code = null;
                    }
                    param.Product_Name = editor.field("Product_Name").val();
                    param.Unit_Price = Number(editor.field("Unit_Price").val());
                    param.Product_Img = Number(editor.field("Product_Img").val());

                    applyData(table, "BVSP_PRODUCT_UPDATE", param);

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
                    editor.display(onPageDisplay($('#Product_Header_Display')));
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


    ////明细返回按钮
    // $("button#search_return").click(function () {
    //    $("div#page-detail").toggleClass("hidden", "show");
    //    $("div#page-header").toggleClass("hidden", "show");
    //})
    //新增或者修改数据
     function applyData(tablename,SP_Name, param) {
        if (param) {
            param.token = SecurityManager.generate();
        } else {
            var param = { token: SecurityManager.generate() };
        }
        if (!tablename) {
            var tablename = table;
        }
        $.ajax({
            "url": sysSettings.domainPath + SP_Name,
            "async": true,
            "crossDomain": true,
            "type": "POST",
            "dataType": "json",
            "contentType": "application/json; charset=utf-8",
            "data": JSON.stringify(param),
            "success": function (data) {
                data = data.ResultSets[0];
                if (param.clearTable == true) {
                    tablename.clear();
                }
                if (param.append == false) {
                    tablename.row({ selected: true }).data(data[0]);
                    tablename.page(tablename.rows({ selected: true }).data().page()).draw('page');
                } else {
                    data.forEach(function (node) {
                        tablename.row.add(node);
                        tablename.draw();
                })
                }
            }
        });
    }
});




