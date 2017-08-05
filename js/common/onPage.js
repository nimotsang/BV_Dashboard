function onPageDisplay ( elm ) {
    var name = 'onPage'+Math.random();
    var Editor = $.fn.dataTable.Editor;
    var emptyInfo;

    Editor.display[name] = $.extend( true, {}, Editor.models.display, {
        // Create the HTML mark-up needed the display controller
        init: function ( editor ) {
            emptyInfo = elm.html();
            return Editor.display[name];
        },

        // Show the form
        open: function ( editor, form, callback ) {
            elm.children().detach();
            elm.append( form.childNodes[2] );
            //editor.appendTo(form);

            if ( callback ) {
                callback();
            }
        },

        // Hide the form
        close: function ( editor, callback ) {
            elm.children().detach();
            elm.html( emptyInfo );

            if ( callback ) {
                callback();
            }
        }
    } );

    return name;
}

