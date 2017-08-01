$(document).ready(function() {
    var editor = new $.fn.dataTable.Editor({

        ajax: {

            "edit": {
                "url": sysSettings.domainPath + "BVSP_Store_UPDATE",
                "async": true,
                "crossDomain": true,
                "type": "POST",
                "dataType": "json",
                "contentType": "application/json; charset=utf-8",
                "data": function () {
                    var param = {
                        "token": SecurityManager.generate(),
                        "Store_ID": editor.field('Store_ID').val(),
                        "Store_Code": editor.field('Store_Code').val(),
                        "Store_Name": editor.field('Store_Name').val(),
                        "Address": editor.field('Address').val(),
                        "Phone": editor.field('Phone').val(),
                        "Contacts": editor.field('Address').val(),
                        "Merchant_ID": editor.field('Merchant_Name').val()
                    }
                    return JSON.stringify(param);
                }
            },
            "create": {

                "url": sysSettings.domainPath + "BVSP_Store_UPDATE",
                "async": true,
                "crossDomain": true,
                "type": "POST",
                "dataType": "json",
                "contentType": "application/json; charset=utf-8",
                "data": function () {
                    var param = {
                        "token": SecurityManager.generate(),
                        "Store_ID": editor.field('Store_ID').val(),
                        "Store_Code": editor.field('Store_Code').val(),
                        "Store_Name": editor.field('Store_Name').val(),
                        "Address": editor.field('Address').val(),
                        "Phone": editor.field('Phone').val(),
                        "Contacts": editor.field('Address').val(),
                        "Merchant_ID": editor.field('Merchant_Name').val()

                    }
                    return JSON.stringify(param);
                }
            }


        },
        idSrc: 'Store_Code',
        table: '#StoreTable',
        fields: [
            { label: 'Store_ID: ', name: 'Store_ID', type: 'hidden' },
            { label: 'Merchant_ID: ', name: 'Merchant_ID', type: 'hidden' },
            { label: '商户名称: ', name: 'Merchant_Name', type: 'select' },
            { label: '门店编号: ', name: 'Store_Code' },
            { label: '门店名称: ', name: 'Store_Name' },
            { label: '门店地址: ', name: 'Address' },
            { label: '门店电话: ', name: 'Phone' },
            { label: '联系人: ', name: 'Contacts' }

        ],
        //自定义语言
        i18n: {
            "create": {
                "button": '新增',
                "title": '新增门店',
                "submit": '提交'
            },
            "edit": {
                "button": '修改',
                "title": '门店管理',
                "submit": '提交'
            },
            "multi": {
                "title": "批量修改",
                "info": "批量修改帮助您将所选单元格中的值修改为同一值，要继续修改请单击按钮",
                "restore": "取消修改"
            }
        }
    });

    editor.on('preSubmit', function (e, data, action) {

        var Store_Code = editor.field("Store_Code");
        var Store_Name = editor.field("Store_Name");
        if (!Store_Code.isMultiValue()) {
            if (!Store_Code.val()) {
                Store_Code.error("门店编号不能为空，请重新输入");
            } else if (action !== 'edit') {
                if (!checkname(Store_Code.val())) {
                    Store_Code.error("门店名只能是中文、英文字母和数字，请重新输入");
                }
            }
        }
        if (!Store_Name.isMultiValue()) {
            if (!Store_Name.val()) {
                Store_Name.error("门店名不能为空，请重新输入")
            } else if (!checkname(Store_Name.val())) {
                Store_Name.error("门店名只能是中文、英文字母和数字，请重新输入");
            }
        }

        if (this.inError()) {
            return false;
        }

    });
    editor.on('postSubmit', function (e, json) {
        json.data = json.ResultSets[0]

    });
    editor.on('initEdit', function (e, node, data) {
        editor.disable(["Store_Code","Merchant_Name"]);
        getMerchant(e,data)

    });
    editor.on('initCreate', function (e) {
        editor.enable(["Store_Code", "Merchant_Name"]);
        getMerchant(e)
    });

    //初始化报表
    var table=$("#StoreTable").DataTable({
        processing:false,
        dom:'Bfrtip',
        select: true,
        order: [[1, "asc"]],
        columns: [
        { "data": "Merchant_Name" },
        { "data": "Store_Code" },
        { "data": "Store_Name" }
        ],
        "columnDefs":[
            { "width": "20%", "targets": 0 },
            { "width": "20%", "targets": 1 }
        ],
        ajax: {
            "url": sysSettings.domainPath + "BVSP_Store_SEARCH",
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

    function getMerchant(e,data) {
        var oMerchant_ID;
        var selectMerchant = [];

        // Get existing options
        if (e.type === 'initEdit') {
            oMerchant_ID = data.Merchant_ID
        }
        var param = {};
        param.token = SecurityManager.generate();

        $.ajax({
            "url": sysSettings.domainPath + "BVSP_Merchant_SEARCH",
            "type": "POST",
            "async": true,
            "crossDomain": true,
            "dataType": "json",
            "contentType": "application/json; charset=utf-8",
            "data": JSON.stringify(param),
            "success": function (data) {
                data = data.ResultSets[0]
                for (var item in data) {
                    if (data[item].Merchant_ID === oMerchant_ID) {
                        selectMerchant.unshift({ label: data[item].Merchant_Name, value: data[item].Merchant_ID });
                    } else {
                        selectMerchant.push({ label: data[item].Merchant_Name, value: data[item].Merchant_ID });
                    }
                }
                editor.field("Merchant_Name").update(selectMerchant);
            }

        })
    }
    });




