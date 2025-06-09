/** @odoo-module */

import { templates } from "@web/core/assets";
import { _t } from "web.core";
import { registry } from "@web/core/registry";

const { Component, mount } = owl;

export async function load(record) {
    const CkeditorWidget = registry.category("fields").get("ckeditor");

    const textInputs = document.querySelectorAll("textarea.o_ckeditor_loader");
    for (const textInput of textInputs) {
        // Create a new div element to mount and hide the textarea
        const div = document.createElement("div");
        div.id = _.uniqueId("ckeditor_wrapper_");
        textInput.parentNode.insertBefore(div, textInput);
        textInput.style.display = "none";
        div.appendChild(textInput);

        let readOnly = false;
        const readOnlyAttr = textInput.getAttribute("readonly");
        if (readOnlyAttr !== null && readOnlyAttr.toLowerCase() === "true") {
            readOnly = true;
        }
        mount(CkeditorWidget, div, {
            env: Component.env,
            templates,
            dev: Component.env.debug,
            translateFn: _t,
            props: {
                wrapperId: div.id,
                lang: textInput.dataset.lang || "en",
                value: textInput.value,
                update: (value) => {
                    textInput.value = value;
                    textInput.dispatchEvent(new Event("input"));
                },
                record: {
                    resModel: record.resModel,
                    resId: record.resId,
                    readOnly: readOnly,
                },
            },
        });
    }
}
