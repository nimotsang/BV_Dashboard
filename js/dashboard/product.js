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

    var Editor = $.fn.DataTable.Editor;

    Editor.display.myDisplayController = $.extend(true, {}, Editor.models.display, {
        // Create the HTML mark-up needed the display controller
        init: function (editor) {

            return Editor.display.myDisplayController;
        },

        // Show the form
        open: function (editor, form, callback) {
            alter("Hello");
        },

        // Hide the form
        close: function (editor, callback) {

        }
    });

    //主表
    var table;
    //产品明细调整编辑器
    var pceditor;
    //产品表
    var ptable;
    //产品调整明细表
    var pctable;

    var pcval = [];

    var selectdata;
    //初始化编辑器
    editor.on('open displayOrder', function (e, mode, action) {
        if (mode === 'main' && action !== 'remove') {
            //增加HTML
            addhtml();
            //增加tab1按键
            tab1btn(e, mode, action);
            //定义Tabs规则
            addtab(e, mode, action);

            //初始化报表-产品列表
            ptable = $("#StoreTable").DataTable({
                processing: true,
                //dom: 'Bfrtip',
                lengthChange: false,
                select: true,
                order: [[0, "asc"]],
                columns: [
                { "data": "Merchant_Name" },
                { "data": "Store_Code" },
                { "data": "Store_Name" },
                { "data": "Unit_Price" }
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

            });

            //产品明细-调整
            pceditor = new $.fn.dataTable.Editor({
                idSrc: 'Store_Code',
                table: '#StoreDetailTable',
                fields: [
                    { label: 'reason_id: ', name: 'reason_id', type: 'hidden' },
                    { label: 'Session_Id: ', name: 'Session_Id', type: 'hidden' },
                    { label: 'product_id: ', name: 'product_id', type: 'hidden' },
                    { label: 'color_id: ', name: 'color_id', type: 'hidden' },
                    { label: 'size_id: ', name: 'size_id', type: 'hidden' },
                    { label: 'bin_id: ', name: 'bin_id', type: 'hidden' },
                    { label: 'bh_uniqueid: ', name: 'bh_uniqueid', type: 'hidden' },
                    { label: 'color_uniqueid: ', name: 'color_uniqueid', type: 'hidden' },
                    { label: 'size_uniqueid: ', name: 'size_uniqueid', type: 'hidden' },
                    { label: 'product_uniqueid: ', name: 'product_uniqueid', type: 'hidden' },
                    { label: 'adjhead_uniqueid: ', name: 'adjhead_uniqueid', type: 'hidden' },
                    { label: 'store_uniqueid: ', name: 'store_uniqueid', type: 'hidden' },
                    { label: 'PurchasePrice: ', name: 'PurchasePrice', type: 'hidden' },
                    { label: 'RetailPrice: ', name: 'RetailPrice', type: 'hidden' },
                    { label: '序号: ', name: 'Line_Id' },
                    { label: '序号: ', name: 'ProductCode' },
                    { label: '序号: ', name: 'ProductName' },
                    { label: '序号: ', name: 'Supplier' },
                    { label: '序号: ', name: 'Color' },
                    { label: '序号: ', name: 'Size' },
                    { label: '序号: ', name: 'BinCode' },
                    { label: '序号: ', name: 'StockQty' },
                    { label: '序号: ', name: 'AdjQty' },
                    { label: '序号: ', name: 'NewQty' },


                ],

                ajax: function (method, url, data, success, error) {
                    // NOTE - THIS WILL WORK FOR EDIT ONLY AS IS

                    if (data.action === 'edit') {
                        success({
                            data: $.map(data.data, function (val, key) {
                                return getpcval(val, key);

                            })
                        });
                    }
                }

            });

            //初始化报表-产品调整明细
            pctable = $("#StoreDetailTable").DataTable({
                processing: true,
                //dom: 'Bfrtip',
                lengthChange: false,
                select: true,
                order: [[0, "asc"]],
                columns: [
                { "data": "Store_Code" },
                { "data": "Store_Name" },
                { "data": "Merchant_Name" },
                { "data": "Unit_Price" }
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


            });

            $('#StoreDetailTable').on('click', 'tbody td.editable', function (e) {
                pceditor.inline(this, {
                    onBlur: 'submit',
                    //onComplete:'none',
                    submit: 'all',
                    //onReturn: 'none',
                    onBackground: close
                });
            });


        }


    });
    editor.on('preSubmit', function (e, data, action) {
 

        var Unit_Price = editor.field("Unit_Price");
        var Product_Name = editor.field("Product_Name");
        if (!Unit_Price.isMultiValue()) {
            if (!Unit_Price.val()) {
                Unit_Price.error("价格不能为空，请重新输入");
            } else if (!checkprice(Unit_Price.val())) {
                Unit_Price.error("价格格式不正确，请重新输入");
                    }
                }
        if (!Product_Name.isMultiValue()) {
            if (!Product_Name.val()) {
                Product_Name.error("产品描述不能为空，请重新输入")
            } else if (!checkname(Product_Name.val())) {
                Product_Name.error("产品描述只能是中文、英文字母和数字，请重新输入");
                }
            }

            if (this.inError()) {
                return false;
            }

    });

    editor.on('postSubmit', function (e, json) {
        json.data = json.ResultSets[0];
    });


    //editor.on('initEdit', function () {

    //});
    //editor.on('initCreate', function () {

       
    //});

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
                    editor.create(false);
                    $("div#page-header").toggleClass("hidden", "show");
                    $("div#page-detail").toggleClass("hidden", "show");
                }
            }


        ]
    });
    //定义 Tab1 按键
    function tab1btn(e, mode, action) {
        editor.buttons([
       {
           label: function () {
               if (editor.field("InventScheduleStatus_Code").val() === "保存") {
                   //this.remove();
                   return '冻结库存 '
               } else if (editor.field("InventScheduleStatus_Code").val() === "冻结") {
                   return '取消冻结 '
               }
           }, fn: function () {
               var vstatus = ["计划", "保存", "取消", "完成"]
               if (editor.field("InventScheduleStatus_Code").val() === "保存") {
                   var param = {};
                   param.token = SecurityManager.generate();
                   param.username = SecurityManager.username;
                   param.inventschedule_id = editor.field('InventSchedule_Id').val(),
                   param.store_code_id = editor.field('Store_Code_Id').val(),
                   param.count_number = 1,
                   param.inventschedule_date = editor.field('InventSchedule_Date').val(),
                   param.inventschedulestatus_id = 3,
                   param.inventschedule_type = editor.field('InventSchedule_Type').val()
                   $.ajax({
                       "url": sysSettings.domainPath + "RaymSp_Gatewaypayment_InventSchedule",
                       "async": true,
                       "crossDomain": true,
                       "type": "POST",
                       "dataType": "json",
                       "contentType": "application/json; charset=utf-8",
                       "data": JSON.stringify(param),
                       "success": function (data) {
                           if (Number(editor.field('InventSchedule_Id').val()) === data.ResultSets[0][0].InventSchedule_Id) {
                               data.ResultSets[0][0].Id = selectdata[0].Id;
                               data.ResultSets[0][0].Qty_Scan = data.ResultSets[0][0].qty_scan;
                               data.ResultSets[0][0].Store_Code = data.ResultSets[0][0].store_code;
                               table.row(selectdata.index).data(data.ResultSets[0][0]);
                               table.page(selectdata.page).draw('page');
                               editor.field('Session_Id').val(data.ResultSets[0][0].Session_Id);
                               editor.field('InventScheduleStatus_Code').val('冻结');
                               editor.message('库存冻结成功').true;
                           }
                       }
                   })
               } else if (editor.field("InventScheduleStatus_Code").val() === "冻结") {
                   var param = {};
                   param.token = SecurityManager.generate();
                   param.username = SecurityManager.username;
                   param.inventschedule_id = editor.field('InventSchedule_Id').val(),
                   param.store_code_id = editor.field('Store_Code_Id').val(),
                   param.count_number = 1,
                   param.inventschedule_date = editor.field('InventSchedule_Date').val(),
                   param.inventschedulestatus_id = 4,
                   param.inventschedule_type = editor.field('InventSchedule_Type').val()
                   $.ajax({
                       "url": sysSettings.domainPath + "RaymSp_Gatewaypayment_InventSchedule",
                       "async": true,
                       "crossDomain": true,
                       "type": "POST",
                       "dataType": "json",
                       "contentType": "application/json; charset=utf-8",
                       "data": JSON.stringify(param),
                       "success": function (data) {
                           if (Number(editor.field('InventSchedule_Id').val()) === data.ResultSets[0][0].InventSchedule_Id) {
                               data.ResultSets[0][0].Id = selectdata[0].Id;
                               data.ResultSets[0][0].Qty_Scan = data.ResultSets[0][0].qty_scan;
                               data.ResultSets[0][0].Store_Code = data.ResultSets[0][0].store_code;
                               table.row(selectdata.index).data(data.ResultSets[0][0]);
                               table.page(selectdata.page).draw('page');
                               editor.field('InventScheduleStatus_Code').val('取消');
                               editor.message('冻结已取消').true;
                           }
                       }
                   })

               }
           }, className: "Freezer"
       },
       {
           label: '保存', className: 'btn btn-primary', fn: function () {
               var vstatus = ["计划", "冻结", "取消", "完成"]
               if (vstatus.indexOf(editor.field("InventScheduleStatus_Code").val()) !== -1) {
                   this.blur();
               } else {
                   var param = {};
                   param.token = SecurityManager.generate();
                   param.username = SecurityManager.username;
                   param.inventschedule_id = editor.field('InventSchedule_Id').val() ? Number(editor.field('InventSchedule_Id').val()) : null,
                   param.store_code_id = editor.field('Store_Code_Id').val(),
                   param.count_number = 1,
                   param.inventschedule_date = editor.field('InventSchedule_Date').val(),
                   param.inventschedulestatus_id = 1,
                   param.inventschedule_type = editor.field('InventSchedule_Type').val()
                   $.ajax({
                       "url": sysSettings.domainPath + "RaymSp_Gatewaypayment_InventSchedule",
                       "async": true,
                       "crossDomain": true,
                       "type": "POST",
                       "dataType": "json",
                       "contentType": "application/json; charset=utf-8",
                       "data": JSON.stringify(param),
                       "success": function (data) {
                           if (editor.field('InventSchedule_Id').val() === '') {
                               data.ResultSets[0][0].Id = table.rows()[0].length + 1;
                               data.ResultSets[0][0].Qty_Scan = data.ResultSets[0][0].qty_scan;
                               data.ResultSets[0][0].Store_Code = data.ResultSets[0][0].store_code;
                               table.row.add(data.ResultSets[0][0]).draw();
                               table.rows().deselect().page('last').draw('page');
                               table.page('last').draw('page');
                               table.row(':eq(-1)', { page: 'current' }).select();
                               editor.field('InventSchedule_Id').val(data.ResultSets[0][0]["InventSchedule_Id"]);
                               editor.field('InventScheduleStatus_Code').val('保存');

                               if (data.ResultSets[0][0]["Session_Id"] !== null) {
                                   editor.field('Session_Id').val(data.ResultSets[0][0]["Session_Id"]);
                               }
                               if (data.ResultSets[0][0]["InventSchedule_Type"] === "T") {
                                   $("a#li-tab4,a#li-tab3,a#li-tab2").css("display", "none");
                               }
                               editor.message('保存成功').true;
                               return false;

                           } else {
                               if (Number(editor.field('InventSchedule_Id').val()) === data.ResultSets[0][0].InventSchedule_Id) {
                                   data.ResultSets[0][0].Id = selectdata[0].Id;
                                   data.ResultSets[0][0].Qty_Scan = data.ResultSets[0][0].qty_scan;
                                   data.ResultSets[0][0].Store_Code = data.ResultSets[0][0].store_code;
                                   table.row(selectdata.index).data(data.ResultSets[0][0]);
                                   table.page(selectdata.page).draw('page');
                                   if (data.ResultSets[0][0]["InventSchedule_Type"] === "T") {
                                       $("a#li-tab4,a#li-tab3,a#li-tab2").css("display", "none");
                                   } else {
                                       $("a#li-tab4,a#li-tab3,a#li-tab2").css("display", "block");
                                   }
                                   editor.message('更新成功').true;
                               } else {

                               }
                           }
                       }
                   })

               }

           }, tabIndex: 2
       },
      { label: '取消', fn: function () { this.blur(); }, tabIndex: 3 }
        ])
    };
    //定义HTML Tab
    function addhtml() {
        /** 创建 产品Tabs (搜索条件，列表及产品调整明细) **/

        var html = '<div class="tabs-container">' +
                    '<ul class="nav nav-tabs">' +
                        '<li class="active"><a data-toggle="tab" id="li-tab1" href="#tab-1">参数设置</a></li>' +
                        '<li class=""><a data-toggle="tab" id="li-tab2" href="#tab-2">门店搜索条件</a></li>' +
                        '<li class=""><a data-toggle="tab" id="li-tab3" href="#tab-3">门店列表</a></li>' +
                        '<li class=""><a data-toggle="tab" id="li-tab4" href="#tab-4">价格明细管理</a></li>' +
                    '</ul>' +
                    '<div class="tab-content">' +
                        '<div id="tab-1" class="tab-pane active">' +
                            '<div class="panel-body tab-1">' +
                            '</div>' +
                        '</div>' +
                        '<div id="tab-2" class="tab-pane">' +
                            '<div class="panel-body tab-2">' +
                            '</div>' +
                       '</div>' +
                        '<div id="tab-3" class="tab-pane">' +
                            '<div class="panel-body tab-3">' +
                            '<table style="width:100%" class="table table-striped table-bordered table-hover" id="StoreTable">' +
                            '<thead>' +
                            '<tr>' +
                            '<th>商户名称</th>' +
                            '<th>门店代码</th>' +
                            '<th>门店名称</th>' +
                            '<th>价格</th>' +
                            '</tr>' +
                            '</thead>' +
                            '</table>' +
                            '</div>' +
                        '</div>' +
                        '<div id="tab-4" class="tab-pane">' +
                            '<div class="panel-body tab-4">' +
                            '<table style="width:100%" class="table table-striped table-bordered table-hover" id="StoreDetailTable">' +
                            '<thead>' +
                            '<tr>' +
                            '<th>序号</th>' +
                            '<th>产品代码</th>' +
                            '<th>产品名称</th>' +
                            '<th>供应商</th>' +
                            '<th>颜色</th>' +
                            '<th>尺码</th>' +
                            '</tr>' +
                            '</thead>' +
                            '</table>' +
                            '</div>' +
                        '</div>' +
                      '</div>' +
                     '</div>';


        //add html to dom
        $('div.DTE_Form_Content').append(html);
        $('div.modal-dialog').addClass('product-column');
        //$('div.panel-body.tab-1, div.panel-body.tab-2').addClass('product-column-body');
        $('div.DTE_Field').addClass('product-column-feild');
        $('div.DTE_Body.modal-body').css("padding", "0px");
        $("a#li-tab3,a#li-tab2").css("display", "block");
        //add editer message form(layout) to header
        $('.DTE_Form_Info').css({ "float": "right", "margin": "10px" });

        ////move the editor elements to respective tab
        $(editor.node(['Product_Code', 'Product_Name', 'Unit_Price', 'Product_Img'])).appendTo('.tab-1');
        $(editor.node(['Merchant_Code', 'Merchant_Name', 'Store_Code', 'Store_Name', 'Address', 'Phone', 'Contacts'])).appendTo('.tab-2');

    };
    //明细返回按钮
    $("button#searchreturn").click(function () {
        $("div#page-detail").toggleClass("hidden", "show");
        $("div#page-header").toggleClass("hidden", "show");
    })

});




