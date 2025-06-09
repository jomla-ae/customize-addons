# -*- coding: utf-8 -*-

from odoo import models, fields


class ProductTemplate(models.Model):
    _inherit = "product.template"

    state = fields.Selection([
        ("draft", "Draft"),
        ("to_reviewed", "To Be Reviewed"),
        ("approved", "Approved"),
        ("published", "Published")], string="Status", default="draft", required=True, index=True, readonly=False,
        tracking=True)

    def action_submit(self):
        self.filtered(lambda t: t.state == "draft").write({"state": "to_reviewed"})

    def action_approve(self):
        self.filtered(lambda t: t.state == "to_reviewed").write({"state": "approved"})

    def action_publish(self):
        self.filtered(lambda t: t.state == "approved").write({"state": "published"})

    def action_reset_to_draft(self):
        self.filtered(lambda t: t.state != "draft").write({"state": "draft"})
