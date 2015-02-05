(function() {
    tinymce.create('tinymce.plugins.toeShortCodesButtons', {
        init : function(ed, url) {
            ed.addButton('toeshortcodes', {
                title : toeLang('Supsystic Shortcodes'),
                image : url+'/toeshortcodesbutton.png',
                onclick : function(event) {
                    subScreen.show(toeShortcodesText.adminTextEditorPopup)
						.moveToCenter()
						.setAbsolute();
                    toeTextEditorInst = ed;
                }
            });
        },
        createControl : function(n, cm) {
            return null;
        },
        getInfo : function() {
            return {
                longname : 'http://supsystic.com/ - Shortcodes',
                author : 'http://supsystic.com/',
                authorurl : 'http://supsystic.com/',
                infourl : 'http://supsystic.com/',
                version : '1.0'
            };
        }
    });
    tinymce.PluginManager.add('toeshortcodes', tinymce.plugins.toeShortCodesButtons);
})();