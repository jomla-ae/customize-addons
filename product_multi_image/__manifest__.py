# -*- coding: utf-8 -*-
{
    'name': "Multi Images Product",
    'author': "Jomla",
    'website': "https://github.com/jomla-ae",
    'category': 'Tools',
    'version': '0.1',
    'depends': ['product'],
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
