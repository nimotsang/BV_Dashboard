$(document).ready(function () {
    var editor = new $.fn.dataTable.Editor({

        ajax: {
            "edit": {
                "url": sysSettings.domainPath + "BVSP_VOUCHER_REDEEMCANCEL",
                "async": true,
                "crossDomain": true,
                "type": "POST",
                "dataType": "json",
                "contentType": "application/json; charset=utf-8",
                "data": function () {
                    var param = {
                        "token": SecurityManager.generate(),
                        "VOUCHER_CODE": editor.field('Voucher_Code').val(),
                    }
                    return JSON.stringify(param);
                }
            },
        },
        idSrc: 'Voucher_Code',
        table: '#RedeemVoucherTable',
        fields: [
            { label: '会员ID: ', name: 'Customer_ID', type: 'hidden' },
            { label: '券号: ', name: 'Voucher_Code', type: 'readonly' },
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
        }
    });

    // Edit record
    $('#RedeemVoucherTable').on('click', 'a.edit', function (e) {
        e.preventDefault();
        editor.edit($(this).closest('tr'), {
            title: '请确认核销撤销券号',
            buttons: '确定'
        });
    });

    editor.on('postSubmit', function (e, json) {
        json.data = json.ResultSets[0];
    });

    //初始化报表
    var table = $("#RedeemVoucherTable").DataTable({
        processing: false,
        dom: 'Bfrtip',
        select: true,
        order: [[0, "asc"]],
        columns: [
        { "data": "Customer_Name" },
        { "data": "Phone" },
        { "data": "Address" },
        //{ "data": "Product_Code" },
        { "data": "Product_Name" },
        //{ "data": "Product_Img"},
        //{ "data": "Note"},
        { "data": "Voucher_Code" },
        { "data": "Start_Date" },
        { "data": "End_Date" },
        //{ "data": "PIN_Code" },
        //{ "data": "Campaign_Code"},
        { "data": "Campaign_Name" },
        {
            "data": null,
          //"className": "center",
          "defaultContent": '<a href="" class="edit">撤销</a>'}
        ],
        "columnDefs": [
            { "width": "5%", "targets": 0 }
        ],
        ajax: {
            "url": sysSettings.domainPath + "BVSP_VOUCHER_CANCEL_SEARCH",
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
            //{ extend: 'create', editor: editor, text: '新建' },
            //{ extend: 'edit', editor: editor, text: '修改' },
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




