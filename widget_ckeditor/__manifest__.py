# -*- coding: utf-8 -*-
{
    'name': "Widget CKEditor",

    'summary': """Widget CKEditor""",

    'description': """
        Widget CKEditor
    """,

    'author': "Qsys IT",
    'website': "http://qsys-it.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/14.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Tools',
    'version': '0.1',

    # any module necessary for this one to work correctly

    'depends': ['web'],
    # always loaded
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
