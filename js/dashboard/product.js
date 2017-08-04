$(document).ready(function () {
    var editor = new $.fn.dataTable.Editor({

        ajax: {

            "edit": {
                "url": sysSettings.domainPath + "BVSP_PRODUCT_UPDATE",
                "async": true,
                "crossDomain": true,
                "type": "POST",
                "dataType": "json",
                "contentType": "application/json; charset=utf-8",
                "data": function () {
                    var param = {
                        "token": SecurityManager.generate(),
                        "Product_ID": editor.field('Product_ID').val(),
                        "Product_Name": editor.field('Product_Name').val(),
                        "Unit_Price": editor.field('Unit_Price').val(),
                        "Product_Img": editor.field('Product_Img').val()
                    }
                    return JSON.stringify(param);
                },
            },
            "create": {

                "url": sysSettings.domainPath + "BVSP_PRODUCT_UPDATE",
                "async": true,
                "crossDomain": true,
                "type": "POST",
                "dataType": "json",
                "contentType": "application/json; charset=utf-8",
                "data": function () {
                    var param = {
                        "token": SecurityManager.generate(),
                        "Product_ID": editor.field('Product_ID').val(),
                        "Product_Name": editor.field('Product_Name').val(),
                        "Unit_Price": editor.field('Unit_Price').val(),
                        "Product_Img": editor.field('Product_Img').val()
                    }
                    return JSON.stringify(param);
                },
            }
        },
        idSrc: 'Product_Code',
        table: '#ProductTable',
        display: onPageDisplay($('#Product_Header')),
        template: '#Product_Header',
        fields: [
            { label: 'Product_ID: ', name: 'Product_ID', type: 'hidden' },
            { label: '产品编号: ', name: 'Product_Code',type:'readonly' },
            { label: '产品名称: ', name: 'Product_Name' },
            { label: '参考价: ', name: 'Unit_Price' },
            { label: '图片路径: ', name: 'Product_Img' },




            //门店查询条件
            { label: '商户代码: ', name: 'Merchant_Code' },
            { label: '商户名称: ', name: 'Merchant_Name' },
            { label: '门店代码: ', name: 'Store_Code', type: 'select', placeholder: '未定义' },
            { label: '门店名称: ', name: 'Store_Name', type: 'select', placeholder: '未定义' },
            { label: '地址: ', name: 'Address', type: 'select', placeholder: '未定义' },
            { label: '电话: ', name: 'Phone', type: 'select', placeholder: '未定义' },
            { label: '联系人: ', name: 'Contacts', type: 'select', placeholder: '未定义' }

        ],
        //自定义语言
        i18n: {
            "create": {
                "button": '新增',
                "title": '新增产品',
                "submit": '提交'
            },
            "edit": {
                "button": '修改',
                "title": '产品管理',
                "submit": '提交'
            },
            "multi": {
                "title": "批量修改",
                "info": "批量修改帮助您将所选单元格中的值修改为同一值，要继续修改请单击按钮",
                "restore": "取消修改"
            }
        }
    });

    //主表
    var table;
    //产品明细调整编辑器

    //初始化报表
     table = $("#ProductTable").DataTable({
        processing: false,
        dom: 'Bfrtip',
        select: true,
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
        ajax: {
            "url": sysSettings.domainPath + "BVSP_PRODUCT_SEARCH",
            "async": true,
            "crossDomain": true,
            "type": "POST",
            "dataType": "json",
            "contentType": "application/json; charset=utf-8",
            "data": function () {
                var param = {
                    "token": SecurityManager.generate()
                }
                return JSON.stringify(param);
            },
            "dataSrc": function (data) {
                data = data.ResultSets[0]
                return data;

            }
        },

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
            },
            {
                text: '显示明细',
                action: function (e, dt, node, config) {
                    editor.create({
                        title: 'Create new row',
                        buttons: [
                            'Save',
                            {
                                label: 'Cancel',
                                fn: function () {
                                    editor.close();
                                }
                            }
                        ]
                    });
                    $("div#page-header").toggleClass("hidden", "show");
                    $("div#page-detail").toggleClass("hidden", "show");
                }
            }


        ]
    });
    //定义 Tab1 按键
     function onPageDisplay(elm) {
         var name = 'onPage' + Math.random();
         var Editor = $.fn.dataTable.Editor;
         var emptyInfo;

         Editor.display[name] = $.extend(true, {}, Editor.models.display, {
             // Create the HTML mark-up needed the display controller
             init: function (editor) {
                 emptyInfo = elm.html();
                 return Editor.display[name];
             },

             // Show the form
             open: function (editor, form, callback) {
                 elm.children().detach();
                 elm.append(form);

                 if (callback) {
                     callback();
                 }
             },

             // Hide the form
             close: function (editor, callback) {
                 elm.children().detach();
                 elm.html(emptyInfo);

                 if (callback) {
                     callback();
                 }
             }
         });

         return name;
     }
    //明细返回按钮
     $("button#search_return").click(function () {
        $("div#page-detail").toggleClass("hidden", "show");
        $("div#page-header").toggleClass("hidden", "show");
    })

});




