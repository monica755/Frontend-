/**
 * JavaScript Learning Portal - Code Playground Runner
 * Executes code safely in browser context, captures all console outputs, and renders them cleanly.
 */

class CodeRunner {
    constructor() {
        this.activeSnippet = "";
        this.timers = {};
    }

    /**
     * Format any JS value for console display
     */
    formatValue(val) {
        if (val === undefined) {
            return `<span class="val-undefined">undefined</span>`;
        }
        if (val === null) {
            return `<span class="val-null">null</span>`;
        }
        if (typeof val === "boolean") {
            return `<span class="val-boolean">${val}</span>`;
        }
        if (typeof val === "number") {
            return `<span class="val-number">${val}</span>`;
        }
        if (typeof val === "bigint") {
            return `<span class="val-number">${val}n</span>`;
        }
        if (typeof val === "symbol") {
            return `<span class="val-symbol">${val.toString()}</span>`;
        }
        if (typeof val === "string") {
            return `<span class="val-string">"${this.escapeHtml(val)}"</span>`;
        }
        if (typeof val === "function") {
            return `<span class="val-function">ƒ ${val.name || "anonymous"}()</span>`;
        }
        if (Array.isArray(val)) {
            try {
                const preview = val.map(item => {
                    if (typeof item === "string") return `"${this.escapeHtml(item)}"`;
                    if (typeof item === "object" && item !== null) return "{...}";
                    return String(item);
                }).join(", ");
                return `<span class="val-array">[${preview}] (${val.length})</span>`;
            } catch (e) {
                return `<span>[Array (${val.length})]</span>`;
            }
        }
        if (typeof val === "object") {
            try {
                return `<pre class="val-object">${this.escapeHtml(JSON.stringify(val, null, 2))}</pre>`;
            } catch (e) {
                return `<span class="val-object">[Object]</span>`;
            }
        }
        return `<span>${this.escapeHtml(String(val))}</span>`;
    }

    escapeHtml(str) {
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }

    /**
     * Execute user code and stream outputs to output DOM element
     */
    run(code, outputEl) {
        if (!outputEl) return;

        outputEl.innerHTML = "";
        const logs = [];

        // Custom Console Implementation
        const customConsole = {
            log: (...args) => {
                const formatted = args.map(a => this.formatValue(a)).join(" ");
                logs.push({ type: "log", html: `<div class="console-row log-row"><i class="fa-solid fa-chevron-right icon-log"></i><div>${formatted}</div></div>` });
            },
            warn: (...args) => {
                const formatted = args.map(a => this.formatValue(a)).join(" ");
                logs.push({ type: "warn", html: `<div class="console-row warn-row"><i class="fa-solid fa-triangle-exclamation icon-warn"></i><div>${formatted}</div></div>` });
            },
            error: (...args) => {
                const formatted = args.map(a => (typeof a === "object" && a?.message ? this.escapeHtml(a.message) : this.formatValue(a))).join(" ");
                logs.push({ type: "error", html: `<div class="console-row error-row"><i class="fa-solid fa-circle-xmark icon-error"></i><div>${formatted}</div></div>` });
            },
            info: (...args) => {
                const formatted = args.map(a => this.formatValue(a)).join(" ");
                logs.push({ type: "info", html: `<div class="console-row info-row"><i class="fa-solid fa-circle-info icon-info"></i><div>${formatted}</div></div>` });
            },
            table: (data) => {
                let tableHtml = "";
                if (typeof data === "object" && data !== null) {
                    const keys = Object.keys(data);
                    tableHtml = `<table class="console-mini-table"><thead><tr><th>(index)</th><th>Value</th></tr></thead><tbody>`;
                    keys.forEach(k => {
                        tableHtml += `<tr><td><strong>${this.escapeHtml(k)}</strong></td><td>${this.formatValue(data[k])}</td></tr>`;
                    });
                    tableHtml += `</tbody></table>`;
                } else {
                    tableHtml = this.formatValue(data);
                }
                logs.push({ type: "table", html: `<div class="console-row table-row">${tableHtml}</div>` });
            },
            time: (label = "default") => {
                this.timers[label] = performance.now();
            },
            timeEnd: (label = "default") => {
                if (this.timers[label]) {
                    const elapsed = (performance.now() - this.timers[label]).toFixed(3);
                    logs.push({ type: "time", html: `<div class="console-row info-row"><i class="fa-regular fa-clock"></i><div>${label}: ${elapsed}ms</div></div>` });
                    delete this.timers[label];
                }
            }
        };

        try {
            // Safe evaluation wrapping console
            const execute = new Function("console", `"use strict";\n${code}`);
            const result = execute(customConsole);

            if (logs.length === 0) {
                if (result !== undefined) {
                    logs.push({
                        type: "return",
                        html: `<div class="console-row return-row"><i class="fa-solid fa-arrow-turn-down icon-return"></i><div><span class="return-label">Returned:</span> ${this.formatValue(result)}</div></div>`
                    });
                } else {
                    logs.push({
                        type: "empty",
                        html: `<div class="console-row empty-row"><em>Code executed successfully with no console output.</em></div>`
                    });
                }
            }

            outputEl.innerHTML = logs.map(l => l.html).join("");
        } catch (error) {
            outputEl.innerHTML = `
                <div class="console-row error-row">
                    <i class="fa-solid fa-circle-xmark icon-error"></i>
                    <div>
                        <strong>${this.escapeHtml(error.name)}:</strong> ${this.escapeHtml(error.message)}
                    </div>
                </div>
            `;
        }
    }
}

// Global runner instance
window.codeRunner = new CodeRunner();
