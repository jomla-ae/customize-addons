# -*- coding: utf-8 -*-
{
    'name': "Widget CKEditor",
    'author': "Jomla",
    'website': "https://github.com/jomla-ae",
    'category': 'Tools',
    'version': '0.1',
    'depends': ['web'],
    'data': [],
    'assets': {
        'web.assets_backend': [
            "widget_ckeditor/static/src/js/ckeditor_widget.js",
            "widget_ckeditor/static/src/scss/ckeditor_widget.scss",
            "widget_ckeditor/static/src/xml/ckeditor_widget.xml"
        ],
        "web.assets_frontend": [
            "widget_ckeditor/static/src/js/ckeditor_widget.js",
            "widget_ckeditor/static/src/scss/ckeditor_widget.scss",
            "widget_ckeditor/static/src/xml/ckeditor_widget.xml",
            "widget_ckeditor/static/src/js/loader.js"
        ],
    },
    'license': 'LGPL-3'
}
