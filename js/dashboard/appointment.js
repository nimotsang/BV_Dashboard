$(document).ready(function() {
    var editor = new $.fn.dataTable.Editor({

        ajax: {
            "edit": {
                "url": sysSettings.domainPath + "BVSP_Merchant_UPDATE",
                "async": true,
                "crossDomain": true,
                "type": "POST",
                "dataType": "json",
                "contentType": "application/json; charset=utf-8",
                "data": function () {
                    var param = {
                        "token": SecurityManager.generate(),
                        "Merchant_ID": editor.field('Merchant_ID').val(),
                        "Merchant_Code": editor.field('Merchant_Code').val(),
                        "Merchant_Name": editor.field('Merchant_Name').val(),
                        "Merchant_Type_ID": editor.field('Merchant_Type').val()
                    }
                    return JSON.stringify(param);
                }
            },
            "create": {

                "url": sysSettings.domainPath + "BVSP_Merchant_UPDATE",
                "async": true,
                "crossDomain": true,
                "type": "POST",
                "dataType": "json",
                "contentType": "application/json; charset=utf-8",
                "data": function () {
                    var param = {
                        "token": SecurityManager.generate(),
                        "Merchant_Name": editor.field('Merchant_Name').val(),
                        "Merchant_Type_ID": editor.field('Merchant_Type').val()
                    }
                    return JSON.stringify(param);
                }
            }


        },
        idSrc: 'Customer_Phone',
        table: '#AppointmentTable',
        fields: [
            { label: '客户电话: ', name: 'Customer_Phone', type: 'readonly' },
            { label: '客户姓名: ', name: 'Customer_Name', type: 'readonly' },
            { label: '预约名称: ', name: 'Appointment_Name' },
            { label: '预约日期: ', name: 'Appointment_Date' },
            { label: '预约时间: ', name: 'Appointment_Time' },
            { label: '人数: ', name: 'Person_QTY' },
            { label: '备注: ', name: 'Note' },
            { label: '状态: ', name: 'Appointment_Status', type: 'select' },
            { label: '门店名称: ', name: 'Store_Name', type: 'select' },
            { label: '活动: ', name: 'Campaign_Name', type: 'select' },
            { label: '产品: ', name: 'Product_Name', type: 'select' },

        ],
       // 自定义语言
        i18n: {
            "create": {
                "button": '新增',
                "title": '新增商户',
                "submit": '提交'
            },
            "edit": {
                "button": '修改',
                "title": '商户管理',
                "submit": '提交'
            },
            "multi": {
                "title": "批量修改",
                "info": "批量修改帮助您将所选单元格中的值修改为同一值，要继续修改请单击按钮",
                "restore": "取消修改"
            }
        }
    });


    //editor.on('postSubmit', function (e, json) {
    //    json.data = json.ResultSets[0]

    //});
    //editor.on('initEdit', function (e, node, data) {
    //    getmerchanttype(e,data);
    //});
    //editor.on('initCreate', function (e, data) {
    //    getmerchanttype(e, data);;
    //});
    table2.on()

    //初始化报表
    var table2 = $("#CustomerTable").DataTable({
        processing:false,
      //  dom:'Bfrtip',
        select: true,
        order: [[0, "asc"]],
        columns: [
        { "data": "Customer_Name" },
        { "data": "Phone" },
        { "data": "Address" }
        ],
        "columnDefs":[
            {"width":"20%","targets":0}
        ],
        ajax:{
            "url": sysSettings.domainPath + "BVSP_CUSTOMER_SEARCH",
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
         //buttons: [
         //    { extend: 'create', editor: editor, text: '新建' },
         //    { extend: 'edit', editor: editor, text: '修改' },
         //    { extend: 'print', text: '打印' },
         //    {
         //        extend: 'collection',
         //        text: '导出到..',
         //        buttons: [
         //            'excel',
         //            'csv'
         //        ]
         //    }


         //]
    });

    var table = $("#AppointmentTable2").DataTable({
        processing: false,
        dom: 'Bfrtip',
        select: true,
        order: [[0, "asc"]],
        columns: [
        { "data": "Appointment_Name" },
        { "data": "Appointment_Date" },
        { "data": "Appointment_Time" },
        { "data": "Person_QTY" },
        { "data": "Note" },
        { "data": "Appointment_Status" },
        { "data": "Store_Name" },
        { "data": "Store_Address" },
        { "data": "Store_Phone" },
        { "data": "Campaign_Name" },
        { "data": "Product_Name" },
        { "data": "Customer_Name" },
        { "data": "Customer_Phone" }
        ],
        "columnDefs": [
            { "width": "5%", "targets": 0 }
        ],
        ajax: {
            "url": sysSettings.domainPath + "BVSP_APPOINTMENT_SEARCH",
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
            }


        ]
    });


    //获得产品清单
    //function getmerchanttype(e, data) {
    //    var exdata = [];
    //    var selectMerchantType = []
    //    var param = {};
    //    param.token = SecurityManager.generate();
    //    param.username = SecurityManager.username;
    //    // Get existing options
    //    if (e.type === 'initEdit') {
    //        exdata = data
    //    }
    //    $.ajax({
    //        "url": sysSettings.domainPath + "BVSP_Merchant_Type_SEARCH",
    //        "type": "POST",
    //        "async": true,
    //        "crossDomain": true,
    //        "dataType": "json",
    //        "contentType": "application/json; charset=utf-8",
    //        "data": JSON.stringify(param),
    //        "success": function (data) {
    //            data = data.ResultSets[0]
    //            if (data !== 'undefined') {
    //                for (var item in data) {
    //                            if (typeof (exdata.Merchant_Type_Name) !== 'undefined'/** 判断是新建还是编辑 **/) {
    //                                if (exdata.Merchant_Type_Name === data[item].Merchant_Type_Name) {
    //                                    selectMerchantType.unshift({ label: data[item].Merchant_Type_Name, value: data[item].Merchant_Type_ID });
    //                                } else {
    //                                    selectMerchantType.push({ label: data[item].Merchant_Type_Name, value: data[item].Merchant_Type_ID });
    //                                }
    //                            } else {
    //                                selectMerchantType.push({ label: data[item].Merchant_Type_Name, value: data[item].Merchant_Type_ID });
    //                            }
    //                };
    //            }
    //            editor.field("Merchant_Type").update(selectMerchantType)
    //        }
    //    });

    //}
    });




