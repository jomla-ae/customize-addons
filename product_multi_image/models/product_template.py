# -*- coding: utf-8 -*-

from odoo import models, fields


class ProductTemplate(models.Model):
    _inherit = "product.template"

    product_template_image_ids = fields.One2many("product.image", "product_tmpl_id", string="Extra Product Media",
                                                 copy=True)

    def _get_images(self):
        self.ensure_one()
        return [self] + list(self.product_template_image_ids)
