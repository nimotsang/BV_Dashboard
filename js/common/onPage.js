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
            //elm.append(form.childNodes[2]);
            elm.append(form);
            $("div.DTE_Header.modal-header").css("display", "none");
            $("div.DTE_Footer.modal-footer").css("display", "none");
            //editor.appendTo(form);
            //editor.appendTo(elm);
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
};

//新增或者修改数据
function applyData(SP_Name, param,tablename1, subtablename1,subtablename2) {
    if (param) {
        param.token = SecurityManager.generate();
    } else {
        var param = { token: SecurityManager.generate() };
    }
    if (!tablename1) {
        var tablename1 = table;
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
            data = data.ResultSets;
            for (var item in data) {
                switch (item) {
                    case "0": {
                        var subData = {};
                        subData = data[item];
                        if (param.clearTable == true) {
                            tablename1.clear();
                        }
                        if (param.append == false) {
                            tablename1.row({ selected: true }).data(subData[0]);
                            tablename1.page(tablename1.rows({ selected: true }).data().page()).draw('page');
                        } else {
                            subData.forEach(function (node) {
                                tablename1.row.add(node);
                                tablename1.draw();
                            })
                        }
                        break;
                    }
                    case "1": {
                        if (data[item]) {
                            var subData = {};
                            subData = data[item];
                            if (subtablename1) {
                                if (param.clearSubTableName1 == true) {
                                    subtablename1.clear();
                                }
                                if (param.appendSubTableName1 == false) {
                                    subtablename1.row({ selected: true }).data(subData[0]);
                                    subtablename1.page(subtablename1.rows({ selected: true }).data().page()).draw('page');
                                } else {
                                    subData.forEach(function (node) {
                                        subtablename1.row.add(node);
                                        subtablename1.draw();
                                    })
                                }
                            }
                            break;
                        }
                    }
                    case "2": {
                        if (data[item]) {
                            var subData = {};
                            subData = data[item];
                            if (subtablename2) {
                                if (param.clearSubTableName2 == true) {
                                    subtablename2.clear();
                                }
                                if (param.appendSubTableName2 == false) {
                                    subtablename2.row({ selected: true }).data(subData[0]);
                                    subtablename2.page(subtablename2.rows({ selected: true }).data().page()).draw('page');
                                } else {
                                    subData.forEach(function (node) {
                                        subtablename2.row.add(node);
                                        subtablename2.draw();
                                    })
                                }
                            }
                            break;
                        }
                    }
                }
            }
        }
    });
}

