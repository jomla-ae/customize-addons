/** @odoo-module **/

import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { MediaDialog } from "@web_editor/components/media_dialog/media_dialog";
import { loadCSS, loadJS } from "@web/core/assets";

import { Component, onMounted, onWillStart, useRef, useState, onWillUpdateProps, onWillDestroy } from "@odoo/owl";

// Utility function to convert relative URLs to absolute URLs
function makeUrlsAbsolute(element, baseUrl) {
    const urlAttributes = ["src", "href", "data"];
    urlAttributes.forEach((attr) => {
        if (element.hasAttribute(attr)) {
            let url = element.getAttribute(attr);
            if (url) {
                if (url.startsWith("//")) {
                    // Protocol-relative URL, use https for security
                    // url = "https:" + url;
                    // element.setAttribute(attr, url);
                } else if (url.startsWith("/")) {
                    // Relative URL starting with '/', prepend baseUrl
                    url = baseUrl + url;
                    element.setAttribute(attr, url);
                }
                // Absolute URLs are left unchanged
            }
        }
    });
    Array.from(element.children).forEach((child) => makeUrlsAbsolute(child, baseUrl));
}

export class CkeditorWidget extends Component {
    setup() {
        onWillDestroy(() => this.willDestroy());
        this.editorId = _.uniqueId("ckeditor_");
        this.dialogs = useService("dialog");
        this.rpc = useService("rpc");

        this.editorRef = useRef("editor");
        this.editorInstance = null;
        this.host = window.location.origin;

        // State to track the selected language
        this.state = useState({
            selectedLanguage: this.env?.services?.user?.lang || "en_US", // Default to user's language
        });

        onWillStart(async () => {
            await loadCSS("/widget_ckeditor/static/lib/ckeditor5/ckeditor5.css");
            await loadJS("/widget_ckeditor/static/lib/ckeditor5/ckeditor5.umd.js");
        });

        onMounted(async () => {
            if (typeof CKEDITOR !== "undefined") {
                this.initCKEditor();
                console.log("CKEditor is loaded properly");
            } else {
                console.error("CKEditor is not loaded properly");
            }
        });

        onWillUpdateProps((nextProps) => {
            // Only update the editor if it exists and the value actually changed
            try {
                if (
                    this.editorInstance &&
                    this.getStringValue(nextProps.value) !== this.getStringValue(this.props.value)
                ) {
                    this.isSettingData = true;
                    this.editorInstance.setData(this.getStringValue(nextProps.value));
                    this.isSettingData = false;
                }
            } catch (error) {
                console.error("Error updating CKEditor data:", error);
            }
        });
    }

    initCKEditor() {
        const {
            ClassicEditor,
            Alignment,
            Autoformat,
            Bold,
            Italic,
            Underline,
            Strikethrough,
            Font,
            Superscript,
            Subscript,
            Highlight,
            RemoveFormat,
            BlockQuote,
            Base64UploadAdapter,
            CloudServices,
            Essentials,
            Heading,
            Image,
            ImageCaption,
            ImageResize,
            ImageStyle,
            ImageToolbar,
            PictureEditing,
            Indent,
            IndentBlock,
            Link,
            List,
            Mention,
            Paragraph,
            PasteFromOffice,
            Table,
            TableColumnResize,
            TableToolbar,
            TextTransformation,
            Plugin,
            ButtonView,
            SourceEditing,
            HtmlEmbed,
            GeneralHtmlSupport,
            WordCount,
            FindAndReplace,
            MediaEmbed,
            Command,
            Widget,
            toWidget,
        } = CKEDITOR;

        class OdooMediaPlugin extends Plugin {
            static get pluginName() {
                return "OdooMediaPlugin";
            }

            init() {
                const editor = this.editor;
                const t = editor.t;

                // Add button to toolbar
                editor.ui.componentFactory.add("odooMedia", (locale) => {
                    const button = new ButtonView(locale);

                    // Disable the button if the editor is read-only (ie. source editing)
                    const sourceEditing = editor.plugins.get("SourceEditing");
                    //button.bind("isOn").to(sourceEditing, "isSourceEditingMode", (value) => !value);
                    button.bind("isEnabled").to(sourceEditing, "isSourceEditingMode", (value) => !value);

                    button.set({
                        label: t("Insert Media"),
                        icon: '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6.91 10.54c.26-.23.64-.21.88.03l3.36 3.14 2.23-2.06a.64.64 0 0 1 .87 0l2.52 2.97V4.5H3.2v10.12l3.71-4.08zm10.27-7.51c.6 0 1.09.47 1.09 1.05v11.84c0 .59-.49 1.06-1.09 1.06H2.79c-.6 0-1.09-.47-1.09-1.06V4.08c0-.58.49-1.05 1.1-1.05h14.38zm-5.22 5.56a1.96 1.96 0 1 1 3.4-1.96 1.96 1.96 0 0 1-3.4 1.96z"/></svg>',
                        tooltip: true,
                    });

                    button.on("execute", () => {
                        this._openMediaDialog();
                    });

                    return button;
                });
            }

            _openMediaDialog() {
                // This will be implemented by the component
                this.editor.fire("openOdooMediaDialog");
            }
        }

        ClassicEditor.create(document.getElementById(this.editorId), {
            licenseKey: "GPL",
            plugins: [
                Alignment,
                Autoformat,
                BlockQuote,
                Bold,
                CloudServices,
                Essentials,
                Heading,
                Image,
                ImageCaption,
                ImageResize,
                ImageStyle,
                ImageToolbar,
                Base64UploadAdapter,
                Indent,
                IndentBlock,
                Italic,
                Link,
                List,
                Mention,
                Paragraph,
                PasteFromOffice,
                PictureEditing,
                Table,
                TableColumnResize,
                TableToolbar,
                TextTransformation,
                Underline,
                Strikethrough,
                Font,
                Highlight,
                Superscript,
                Subscript,
                RemoveFormat,
                OdooMediaPlugin,
                SourceEditing,
                HtmlEmbed,
                GeneralHtmlSupport,
                WordCount,
                FindAndReplace,
                MediaEmbed,
            ],
            toolbar: {
                items: [
                    "undo",
                    "redo",
                    "|",
                    "heading",
                    "|",
                    "bold",
                    "italic",
                    "underline",
                    "strikethrough",
                    {
                        label: "Basic styles",
                        icon: "text",
                        items: [
                            "fontSize",
                            "fontColor",
                            "fontBackgroundColor",
                            "highlight",
                            "superscript",
                            "subscript",
                        ],
                    },
                    "removeFormat",
                    "|",
                    "alignment",
                    "|",
                    "link",
                    "odooMedia",
                    "mediaEmbed",
                    "insertTable",
                    "blockQuote",
                    "findAndReplace",
                    "|",
                    "bulletedList",
                    "numberedList",
                    "|",
                    "outdent",
                    "indent",
                    "|",
                    "sourceEditing",
                ],
                shouldNotGroupWhenFull: true,
            },
            mediaEmbed: {
                previewsInData: false,
            },
            htmlSupport: {
                allow: [
                    // Enables all HTML features.
                    {
                        name: /.*/,
                        attributes: true,
                        classes: true,
                        styles: true,
                    },
                ],
                disallow: [
                    {
                        attributes: [
                            { key: /^on(.*)/i, value: true },
                            {
                                key: /.*/,
                                value: /(\b)(on\S+)(\s*)=|javascript:|(<\s*)(\/*)script/i,
                            },
                            { key: /.*/, value: /data:(?!image\/(png|jpeg|gif|webp))/i },
                        ],
                    },
                    { name: "script" },
                ],
            },
            image: {
                resizeOptions: [
                    {
                        name: "resizeImage:original",
                        label: "Default image width",
                        value: null,
                    },
                    {
                        name: "resizeImage:50",
                        label: "50% page width",
                        value: "50",
                    },
                    {
                        name: "resizeImage:75",
                        label: "75% page width",
                        value: "75",
                    },
                ],
                toolbar: [
                    "imageTextAlternative",
                    "toggleImageCaption",
                    "|",
                    "imageStyle:inline",
                    "imageStyle:wrapText",
                    "imageStyle:breakText",
                    "|",
                    "resizeImage",
                ],
                insert: {
                    integrations: ["url"],
                },
            },
            list: {
                properties: {
                    styles: true,
                    startIndex: true,
                    reversed: true,
                },
            },
            link: {
                decorators: {
                    toggleDownloadable: {
                        mode: "manual",
                        label: "Downloadable",
                        attributes: {
                            download: "file",
                        },
                    },
                },
                addTargetToExternalLinks: true,
                defaultProtocol: "https://",
            },
            placeholder: this.props.placeholder || "",
            table: {
                contentToolbar: [
                    "tableColumn",
                    "tableRow",
                    "mergeTableCells",
                    "tableProperties",
                    "tableCellProperties",
                    "toggleTableCaption",
                ],
            },
            ui: {
                viewportOffset: {
                    top: 30,
                },
            },

            htmlEmbed: {
                showPreviews: true,
                sanitizeHtml: (inputHtml) => {
                    const outputHtml = this.sanitize(inputHtml);

                    return {
                        html: outputHtml,
                        hasChanged: inputHtml !== outputHtml,
                    };
                },
            },

            language: {
                content: this.props.lang,
            },
        })
            .then((editor) => {
                this.editorInstance = editor;

                // Set initial data
                if (this.props.value) {
                    this.isSettingData = true;
                    editor.setData(this.getStringValue(this.props.value));
                    this.isSettingData = false;
                }

                // Handle focus change - only update on blur
                editor.ui.focusTracker.on("change:isFocused", (evt, name, isFocused) => {
                    if (!isFocused && !this.isSettingData) {
                        // Editor lost focus
                        const newValue = editor.getData();
                        this.updateValue(newValue);
                    }
                });

                // Handle opening Odoo media dialog
                editor.on("openOdooMediaDialog", () => {
                    this.openMediaDialog();
                });

                // Add word count container to the editor
                const textarea = document.getElementById(this.editorId);
                let wordCountElement;

                if (this.props.wrapperId) {
                    wordCountElement = document.querySelector(`#${this.props.wrapperId} .ck-editor__main`);
                } else {
                    const parentContainer = textarea.parentElement;
                    wordCountElement = parentContainer.querySelector(".ck-editor__main");
                }

                if (wordCountElement) {
                    wordCountElement.appendChild(editor.plugins.get("WordCount").wordCountContainer);
                } else {
                    console.warn("Could not find editor main element to append word count container");
                }

                editor.conversion.for("dataDowncast").add((dispatcher) => {
                    dispatcher.on(
                        "insert:media",
                        (evt, data, conversionApi) => {
                            // Prevent the default handler from being executed
                            evt.stop();

                            // Get the media model element
                            const mediaElement = data.item;

                            // Get the URL from model
                            const url = mediaElement.getAttribute("url");

                            // Create shortcode markup inside a paragraph
                            const writer = conversionApi.writer;
                            const paragraph = writer.createContainerElement("p");
                            const shortcodeText = writer.createText(`[video url="${url}"]`);

                            // Insert the shortcode text into the paragraph
                            writer.insert(writer.createPositionAt(paragraph, 0), shortcodeText);

                            // Insert the paragraph containing the shortcode
                            conversionApi.consumable.consume(mediaElement, evt.name);
                            conversionApi.mapper.bindElements(mediaElement, paragraph);
                            conversionApi.writer.insert(
                                conversionApi.mapper.toViewPosition(data.range.start),
                                paragraph
                            );
                        },
                        { priority: "highest" }
                    );
                });
            })
            .catch((error) => {
                console.error("There was a problem creating the CKEditor instance", error);
            });
    }

    sanitize(html) {
        var $ = window.jQuery;
        function trimAttributes(node) {
            $.each(node.attributes, function () {
                var attrName = this.name;
                var attrValue = this.value;
                if (attrName.indexOf("on") == 0 || attrValue.indexOf("javascript:") == 0) {
                    $(node).removeAttr(attrName);
                }
            });
        }
        var output = $($.parseHTML("<div>" + html + "</div>", null, false));
        output.find("*").each(function () {
            trimAttributes(this);
        });
        return output.html();
    }

    getStringValue(value) {
        if (typeof value === "string") {
            return value;
        }

        if (value != null && typeof value.toString === "function") {
            return value.toString();
        }

        return "";
    }

    updateValue(value) {
        if (value !== this.props.value) {
            this.props.update(value);
        }
    }

    openMediaDialog() {
        this.dialogs.add(MediaDialog, {
            useMediaLibrary: true,
            media: null,
            noDocuments: true,
            noIcons: true,
            resModel: this.props.record.resModel,
            resId: this.props.record.resId,
            onAttachmentChange: this._onAttachmentChange.bind(this),
            save: this._onMediaDialogSave.bind(this),
            close: () => {},
        });
    }

    _onAttachmentChange(attachment) {
        // In case you need to handle attachment changes
        console.log("Attachment changed:", attachment);
    }

    _onMediaDialogSave(element) {
        if (!element) return;

        // Convert relative URLs to absolute URLs
        makeUrlsAbsolute(element, this.host);

        // If the element is not an image, wrap it in a div
        if (element.tagName !== "IMG") {
            this.editorInstance.execute("htmlEmbed", element.outerHTML);
            return;
        }

        // Insert the media element into the editor
        if (this.editorInstance) {
            const viewFragment = this.editorInstance.data.processor.toView(element.outerHTML);
            const modelFragment = this.editorInstance.data.toModel(viewFragment);

            this.editorInstance.model.insertContent(modelFragment);

            // Trigger change event to save the new value
            const newValue = this.editorInstance.getData();
            this.updateValue(newValue);
        }
    }

    willDestroy() {
        if (this.editorInstance) {
            this.editorInstance.destroy().catch((error) => console.error("Error during CKEditor destroy:", error));
        }
    }
}

CkeditorWidget.template = "widget_ckeditor.CkeditorWidget";
CkeditorWidget.defualtProps = {
    value: "",
    placeholder: "",
    record: {},
};
CkeditorWidget.extractProps = ({ attrs, field }) => {
    return {
        lang: attrs.lang || "en",
    };
};
CkeditorWidget.supportedTypes = ["text","html"];
registry.category("fields").add("ckeditor", CkeditorWidget);
