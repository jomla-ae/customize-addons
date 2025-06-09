# -*- coding: utf-8 -*-

from odoo import models, fields


class ProductCategory(models.Model):
    _inherit = "product.category"

    state = fields.Selection([
        ("draft", "Draft"),
        ("to_reviewed", "To Be Reviewed"),
        ("approved", "Approved"),
        ("published", "Published")], string="Status", default="draft", required=True, index=True, readonly=False)

    def action_submit(self):
        self.filtered(lambda c: c.state == "draft").write({"state": "to_reviewed"})

    def action_approve(self):
        self.filtered(lambda c: c.state == "to_reviewed").write({"state": "approved"})

    def action_publish(self):
        self.filtered(lambda c: c.state == "approved").write({"state": "published"})

    def action_reset_to_draft(self):
        self.filtered(lambda c: c.state != "draft").write({"state": "draft"})
