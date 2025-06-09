# -*- coding: utf-8 -*-

from odoo import models, fields


class ProductBrand(models.Model):
    _name = "product.brand"
    _inherit = ["mail.thread", "mail.activity.mixin", "image.mixin"]
    _description = "Product Brand"

    name = fields.Char(string="Name", required=True, tracking=True, translate=True)
    description = fields.Html(string="Description", translate=True)
