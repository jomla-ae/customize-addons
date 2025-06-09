# -*- coding: utf-8 -*-

from odoo import models, fields


class ProductImage(models.Model):
    _inherit = "product.image"

    type = fields.Selection([
        ("gallery", "Gallery"),
        ("banner", "Banner")], string="Type", required=True, index=True, default="gallery")
