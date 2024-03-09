/**
 * @name NiceWebTerminal
 * @description 网页终端
 * @version 1.0.0
 * @author Wang Jia Ming
 * @createDate 2024-2-13
 * @license AGPL-3.0
 * 
 * https://opensource.org/licenses/AGPL-3.0
 * 
 * 依赖库/框架:
 * - WebUtilPro.js (2.5.0)
 */
const NiceWebTerminal = ({
    container = document.createElement("div"),
    prefix = "NiceWebTerminal",
    prefixLog = () => {
        const date = new Date(); return `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`;
    }
}) => {
    const {
        UniquenessElement,
        createElement
    } = WebUtilPro;

    class NiceWebTerminalClass {
        #OldElement = null;
        #OldElementData = null;

        #MaxLine = 250;

        #TextLineSpace = 16;
        #TextLineindent = 2;
        #TextFontSize = 14;
        #TextFontWidth = 500;
        #TextFontFamily = "";
        #TextColor = "#fff";
        #HeadTextColor = "#ffe600";
        #TextHoverColor = "#d5d5d5";
        #SelectTextForegroundColor = "#000";
        #SelectTextBackgroundColor = "#fff";
        #SelectTextHeadForegroundColor = "#7b00ff";
        #SelectTextHeadBackgroundColor = "#fff";

        #NiceWebTerminalViewStyle = createElement({
            tagName: "style",
            classList: ["NiceWebTerminal-View-Style"]
        });
        #View = createElement({
            classList: ["NiceWebTerminal-View"],
            child: this.#NiceWebTerminalViewStyle
        });

        Event_Out = () => { }

        #RestrictMaxLine() {
            const lines = this.#View.getElementsByClassName("NiceWebTerminal-View-Line");
            if (lines.length > this.#MaxLine) {
                const deleteCount = lines.length - this.#MaxLine;
                for (let i = 0; i < deleteCount; i++) {
                    this.#View.removeChild(lines[i]);
                }
            }
        }

        render() {
            let width = container.offsetWidth;
            if (container.getClientRects()[0]) {
                width = container.getClientRects()[0].width;
            }

            const style = `.NiceWebTerminal-View>.NiceWebTerminal-View-Line { margin-left: ${this.#TextLineindent}px; } .NiceWebTerminal-View>.NiceWebTerminal-View-Line .message { font-size: ${this.#TextFontSize}px; font-family: ${this.#TextFontFamily}; color: ${this.#TextColor}; font-weight: ${this.#TextFontWidth}; user-select: text; line-height: ${this.#TextLineSpace}px; } .NiceWebTerminal-View>.NiceWebTerminal-View-Line>.NiceWebTerminal-View-Line-head { margin-left: 0; color: ${this.#HeadTextColor} } .NiceWebTerminal-View>.NiceWebTerminal-View-Line>.NiceWebTerminal-View-Line-content { margin-left: 0; } .NiceWebTerminal-View>.NiceWebTerminal-View-Line>.NiceWebTerminal-View-Line-content:hover { color: ${this.#TextHoverColor}; }`
                + `.NiceWebTerminal-View>.NiceWebTerminal-View-Line>.NiceWebTerminal-View-Line-content::selection { background-color: ${this.#SelectTextBackgroundColor}; color: ${this.#SelectTextForegroundColor}; } .NiceWebTerminal-View>.NiceWebTerminal-View-Line>.NiceWebTerminal-View-Line-head::selection { background-color: ${this.#SelectTextHeadBackgroundColor}; color: ${this.#SelectTextHeadForegroundColor}; }`
                + `.NiceWebTerminal-View { display: flex; align-items: flex-start; flex-direction: column; flex-wrap: wrap; margin-bottom: 10%; .NiceWebTerminal-View-Line {text-wrap: wrap; word-break: break-all; } }`
                + `.NiceWebTerminal-level { user-select: text; line-height: ${this.#TextLineSpace}px; font-size: ${this.#TextFontSize}px; font-family: ${this.#TextFontFamily}; font-weight: ${this.#TextFontWidth}; } .NiceWebTerminal-level[LOG] { color: #ff9100; } .NiceWebTerminal-level[ERROR] { color: #ff0000; } .NiceWebTerminal-level[INFO] { color: #00bfff; } .NiceWebTerminal-level[WARNING] { color: #ffea00; }`
                + `.NiceWebTerminal-View-Line::after { content: attr(count); font-size: ${this.#TextFontSize}px; font-family: ${this.#TextFontFamily}; color: ${this.#TextColor}; font-weight: ${this.#TextFontWidth}; line-height: ${this.#TextLineSpace}px; margin-left: 4px; } .NiceWebTerminal-View-Line[count="0"]::after { content: ""; display: none; }`;
            if (this.#NiceWebTerminalViewStyle.innerHTML !== style) this.#NiceWebTerminalViewStyle.innerHTML = style;
        }

        setStyle({
            textLineSpace = this.#TextLineSpace,
            textLineIndent = this.#TextLineindent,
            textFontSize = this.#TextFontSize,
            textFontWidth = this.#TextFontWidth,
            textFontFamily = this.#TextFontFamily,
            textColor = this.#TextColor,
            headTextColor = this.#HeadTextColor,
            textHoverColor = this.#TextHoverColor,
            selectTextForegroundColor = this.#SelectTextForegroundColor,
            selectTextBackgroundColor = this.#SelectTextBackgroundColor,
            selectTextHeadForegroundColor = this.#SelectTextHeadForegroundColor,
            selectTextHeadBackgroundColor = this.#SelectTextHeadBackgroundColor
        } = {}) {
            this.#TextLineSpace = textLineSpace;
            this.#TextLineindent = textLineIndent;
            this.#TextFontSize = textFontSize;
            this.#TextFontWidth = textFontWidth;
            this.#TextFontFamily = textFontFamily;
            this.#TextColor = textColor;
            this.#HeadTextColor = headTextColor;
            this.#TextHoverColor = textHoverColor;
            this.#SelectTextForegroundColor = selectTextForegroundColor;
            this.#SelectTextBackgroundColor = selectTextBackgroundColor;
            this.#SelectTextHeadForegroundColor = selectTextHeadForegroundColor;
            this.#SelectTextHeadBackgroundColor = selectTextHeadBackgroundColor;
            this.render();
        }

        setMaxLine(max = 100) {
            this.#MaxLine = max;
            this.#RestrictMaxLine();
        }

        clearAll() {
            UniquenessElement(this.#View.$(">.NiceWebTerminal-View-Line"));
        }

        out(content = "hello", head = prefix) {
            this.Event_Out(this.#OldElement, this.#View);
            if (this.#OldElement && this.#View.contains(this.#OldElement) && this.#OldElementData === content + head) {
                const n = parseInt(this.#OldElement.getAttribute("count"));
                this.#OldElement.setAttribute("count", n + 1);
                return;
            }
            this.#OldElementData = content + head;
            this.#OldElement = createElement({
                classList: ["NiceWebTerminal-View-Line"],
                attribute: [["count", "0"]],
                child: [createElement({
                    tagName: "span",
                    classList: ["NiceWebTerminal-View-Line-head", "message"],
                    contentText: head
                }), createElement({
                    tagName: "span",
                    classList: ["NiceWebTerminal-View-Line-content", "message"],
                    contentText: `> ${content}`
                })]
            });
            this.#View.appendChild(this.#OldElement);
            this.#RestrictMaxLine();
        }

        outLog(content = "hello", level = "LOG", head = prefixLog()) {
            this.Event_Out(this.#OldElement, this.#View);
            if (this.#OldElement && this.#View.contains(this.#OldElement) && this.#OldElementData === content + level) {
                const n = parseInt(this.#OldElement.getAttribute("count"));
                this.#OldElement.setAttribute("count", n + 1);
                this.#OldElement.getElementsByClassName("NiceWebTerminal-View-Line-head")[0].textContent = head;
                return;
            }
            this.#OldElementData = content + level;
            this.#OldElement = createElement({
                classList: ["NiceWebTerminal-View-Line"],
                attribute: [["count", "0"]],
                child: [createElement({
                    tagName: "span",
                    classList: ["NiceWebTerminal-View-Line-head", "message"],
                    contentText: head
                }), createElement({
                    tagName: "span",
                    classList: ["NiceWebTerminal-View-Line-content", "message"],
                    html: `:<span class="NiceWebTerminal-level" ${level}>[${level}]</span>&gt; ${content}`
                })]
            });
            this.#View.appendChild(this.#OldElement);
            this.#RestrictMaxLine();
        }

        constructor() {
            container.appendChild(this.#View);
            this.render();
        }
    }

    return new NiceWebTerminalClass();
};
