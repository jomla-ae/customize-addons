# -*- coding: utf-8 -*-
{
    'name': "Product Brand",

    'summary': """Product Brand""",

    'description': """
        Product Brand
    """,

    'author': "Qsys IT",
    'website': "http://qsys-it.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/14.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Sales/Sales',
    'version': '0.1',

    # any module necessary for this one to work correctly

    'depends': ['product'],
    # always loaded
    'data': [
        'security/ir.model.access.csv',
        'views/product_brand_views.xml',
        'views/product_template_views.xml',
        'views/product_views.xml'
    ],
    'license': 'LGPL-3'

}
