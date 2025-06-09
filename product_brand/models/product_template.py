# -*- coding: utf-8 -*-

from odoo import models, fields


class ProductTemplate(models.Model):
    _inherit = "product.template"

    brand_id = fields.Many2one("product.brand", string="Brand", tracking=True)
