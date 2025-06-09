# -*- coding: utf-8 -*-
{
    'name': "Multi Images Product",

    'summary': """Add images for product""",

    'description': """
        Add images for product
    """,

    'author': "Qsys IT",
    'website': "http://qsys-it.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/14.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Tools',
    'version': '0.1',

    # any module necessary for this one to work correctly

    'depends': ['product'],
    # always loaded
    'data': [
        'security/ir.model.access.csv',
        'views/product_image_views.xml',
        'views/product_template_views.xml',
        'views/product_views.xml'
    ],
    'assets': {
        'web.assets_backend': [
            'product_multi_image/static/src/scss/product_image_list.scss'
        ]
    },
    'license': 'LGPL-3'

}
