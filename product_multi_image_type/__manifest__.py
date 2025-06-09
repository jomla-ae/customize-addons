# -*- coding: utf-8 -*-
{
    'name': "Multi Image Types Product",

    'summary': """Add image types for product""",

    'description': """
        Add image types for product
    """,

    'author': "Qsys IT",
    'website': "http://qsys-it.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/14.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Tools',
    'version': '0.1',

    # any module necessary for this one to work correctly

    'depends': ['product_multi_image'],
    # always loaded
    'data': [
        'views/product_image_views.xml'
    ],
    'license': 'LGPL-3'

}
