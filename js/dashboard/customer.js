$(document).ready(function() {
    var editor = new $.fn.dataTable.Editor({

        ajax: {
            "edit": {
                "url": sysSettings.domainPath + "BVSP_CUSTOMER_UPDATE",
                "async": true,
                "crossDomain": true,
                "type": "POST",
                "dataType": "json",
                "contentType": "application/json; charset=utf-8",
                "data": function () {
                    var param = {
                        "token": SecurityManager.generate(),
                        "Customer_ID": editor.field('Customer_ID').val(),
                        "Phone": editor.field('Phone').val(),
                        "Customer_Name": editor.field('Customer_Name').val(),
                        "Address": editor.field('Address').val(),
                    }
                    return JSON.stringify(param);
                }
            },
            //"create": {

            //    "url": sysSettings.domainPath + "BVSP_CUSTOMER_UPDATE",
            //    "async": true,
            //    "crossDomain": true,
            //    "type": "POST",
            //    "dataType": "json",
            //    "contentType": "application/json; charset=utf-8",
            //    "data": function () {
            //        var param = {
            //            "token": SecurityManager.generate(),
            //            "Customer_Name": editor.field('Customer_Name').val(),
            //            "Address": editor.field('Address').val(),
            //        }
            //        return JSON.stringify(param);
            //    }
            //}


        },
        idSrc: 'Phone',
        table: '#CustomerTable',
        fields: [
            { label: '会员ID: ', name: 'Customer_ID' , type:'hidden' },
            { label: '电话号码: ', name: 'Phone',type:'readonly' },
            { label: '会员姓名: ', name: 'Customer_Name' },
            { label: '会员地址: ', name: 'Address' }

        ],
        //自定义语言
        i18n: {
            "create": {
                "button": '新增',
                "title": '新增会员',
                "submit": '提交'
            },
            "edit": {
                "button": '修改',
                "title": '修改会员',
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
        json.data = json.ResultSets[0];
    });

    //初始化报表
    var table = $("#CustomerTable").DataTable({
        processing:false,
        dom:'Bfrtip',
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
         buttons: [
             //{ extend: 'create', editor: editor, text: '新建' },
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

    });




