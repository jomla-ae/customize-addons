# -*- coding: utf-8 -*-

from odoo import models, fields


class Product(models.Model):
    _inherit = "product.product"

    product_variant_image_ids = fields.One2many("product.image", "product_variant_id", string="Extra Variant Images")

    def _get_images(self):
        self.ensure_one()
        variant_images = list(self.product_variant_image_ids)
        if self.image_variant_1920:
            variant_images = [self] + variant_images
        else:
            variant_images = variant_images + [self]

        return variant_images + self.product_tmpl_id._get_images()[1:]
