/**
 * JavaScript Learning Portal - Interactive Visualizers
 * Provides real-time interactive diagrams for Scopes, Hoisting, Memory (Stack vs Heap), and Type Coercion.
 */

const Visualizers = {
    /**
     * Render the visualizer for a given topic
     */
    render(topicId, containerEl) {
        if (!containerEl) return;

        if (topicId === "scopes") {
            this.renderScopeVisualizer(containerEl);
        } else if (topicId === "hoisting") {
            this.renderHoistingVisualizer(containerEl);
        } else if (topicId === "datatypes") {
            this.renderMemoryVisualizer(containerEl);
        } else if (topicId === "declaration-initialization" || topicId === "variables") {
            this.renderLifecycleVisualizer(containerEl);
        } else if (topicId === "arrow-functions") {
            this.renderThisBindingVisualizer(containerEl);
        } else if (topicId === "syntactic-sugar") {
            this.renderSugarVisualizer(containerEl);
        } else {
            this.renderPipelineVisualizer(containerEl);
        }
    },

    /**
     * 1. SCOPE CHAIN VISUALIZER
     */
    renderScopeVisualizer(container) {
        container.innerHTML = `
            <div class="visualizer-box">
                <div class="visualizer-header">
                    <h4><i class="fa-solid fa-layer-group"></i> Scope Chain Traversal Simulator</h4>
                    <span class="badge badge-info">Interactive</span>
                </div>
                <p class="visualizer-desc">Select a variable below to trace how the JS engine searches through nested lexical environments:</p>
                
                <div class="scope-action-buttons">
                    <button class="btn btn-sm btn-outline scope-query-btn" data-target="innerVar">Look up <code>innerVar</code></button>
                    <button class="btn btn-sm btn-outline scope-query-btn" data-target="outerVar">Look up <code>outerVar</code></button>
                    <button class="btn btn-sm btn-outline scope-query-btn" data-target="globalVar">Look up <code>globalVar</code></button>
                    <button class="btn btn-sm btn-outline scope-query-btn" data-target="unknownVar">Look up <code>unknownVar</code></button>
                </div>

                <div class="scope-tree">
                    <div class="scope-block global-scope" id="v-scope-global">
                        <div class="scope-tag">1. Global Scope (Global Execution Context)</div>
                        <div class="scope-vars">
                            <span class="var-pill" id="v-var-globalVar"><code>globalVar</code>: "🌍 Earth"</span>
                            <span class="var-pill"><code>window</code>: [Object]</span>
                        </div>

                        <div class="scope-block outer-scope" id="v-scope-outer">
                            <div class="scope-tag">2. Function <code>outerFunction()</code> Scope</div>
                            <div class="scope-vars">
                                <span class="var-pill" id="v-var-outerVar"><code>outerVar</code>: "🏢 City"</span>
                            </div>

                            <div class="scope-block inner-scope" id="v-scope-inner">
                                <div class="scope-tag">3. Inner Function <code>innerFunction()</code> Scope (Active Execution)</div>
                                <div class="scope-vars">
                                    <span class="var-pill" id="v-var-innerVar"><code>innerVar</code>: "🚪 Room"</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="visualizer-status" id="scope-status-log">
                    <i class="fa-solid fa-arrow-pointer"></i> Click any variable button above to start tracing the Scope Chain lookup.
                </div>
            </div>
        `;

        // Attach listeners
        const buttons = container.querySelectorAll(".scope-query-btn");
        const statusLog = container.querySelector("#scope-status-log");

        buttons.forEach(btn => {
            btn.addEventListener("click", () => {
                const target = btn.dataset.target;
                this.animateScopeLookup(target, container, statusLog);
            });
        });
    },

    animateScopeLookup(varName, container, statusLog) {
        // Reset highlights
        container.querySelectorAll(".scope-block").forEach(el => el.classList.remove("scope-active", "scope-found"));
        container.querySelectorAll(".var-pill").forEach(el => el.classList.remove("var-found"));

        const innerScope = container.querySelector("#v-scope-inner");
        const outerScope = container.querySelector("#v-scope-outer");
        const globalScope = container.querySelector("#v-scope-global");

        statusLog.innerHTML = `<span class="spinner-inline"><i class="fa-solid fa-gear fa-spin"></i> Step 1: Checking local <code>innerFunction()</code> scope for <strong>${varName}</strong>...</span>`;
        innerScope.classList.add("scope-active");

        setTimeout(() => {
            if (varName === "innerVar") {
                innerScope.classList.remove("scope-active");
                innerScope.classList.add("scope-found");
                container.querySelector("#v-var-innerVar").classList.add("var-found");
                statusLog.innerHTML = `✅ <strong>Found in Local Scope!</strong> <code>innerVar</code> = "🚪 Room". Lookup terminated immediately.`;
                return;
            }

            statusLog.innerHTML = `<span class="spinner-inline"><i class="fa-solid fa-gear fa-spin"></i> Step 2: Not in local scope. Moving UP scope chain to <code>outerFunction()</code> scope for <strong>${varName}</strong>...</span>`;
            innerScope.classList.remove("scope-active");
            outerScope.classList.add("scope-active");

            setTimeout(() => {
                if (varName === "outerVar") {
                    outerScope.classList.remove("scope-active");
                    outerScope.classList.add("scope-found");
                    container.querySelector("#v-var-outerVar").classList.add("var-found");
                    statusLog.innerHTML = `✅ <strong>Found in Lexical Outer Scope!</strong> <code>outerVar</code> = "🏢 City". Resolved successfully.`;
                    return;
                }

                statusLog.innerHTML = `<span class="spinner-inline"><i class="fa-solid fa-gear fa-spin"></i> Step 3: Not in outer scope. Moving UP to <strong>Global Scope</strong> for <strong>${varName}</strong>...</span>`;
                outerScope.classList.remove("scope-active");
                globalScope.classList.add("scope-active");

                setTimeout(() => {
                    if (varName === "globalVar") {
                        globalScope.classList.remove("scope-active");
                        globalScope.classList.add("scope-found");
                        container.querySelector("#v-var-globalVar").classList.add("var-found");
                        statusLog.innerHTML = `✅ <strong>Found in Global Scope!</strong> <code>globalVar</code> = "🌍 Earth".`;
                    } else {
                        globalScope.classList.remove("scope-active");
                        statusLog.innerHTML = `❌ <strong style="color:var(--accent-red);">ReferenceError:</strong> <code>${varName}</code> is not defined in any enclosing scope!`;
                    }
                }, 700);
            }, 700);
        }, 600);
    },

    /**
     * 2. HOISTING PHASE SIMULATOR
     */
    renderHoistingVisualizer(container) {
        container.innerHTML = `
            <div class="visualizer-box">
                <div class="visualizer-header">
                    <h4><i class="fa-solid fa-arrows-up-to-line"></i> Execution Context & Hoisting Simulator</h4>
                    <div class="tab-pill-group">
                        <button class="tab-pill active" data-view="author">1. Written Code</button>
                        <button class="tab-pill" data-view="creation">2. Creation Phase (Memory)</button>
                        <button class="tab-pill" data-view="execution">3. Execution Phase (Line-by-Line)</button>
                    </div>
                </div>

                <div class="hoist-display" id="hoist-content">
                    <!-- Dynamic view content populated below -->
                </div>
            </div>
        `;

        const tabs = container.querySelectorAll(".tab-pill");
        const contentEl = container.querySelector("#hoist-content");

        const views = {
            author: `
                <div class="hoist-card">
                    <h5>Source Code (Written by Developer):</h5>
                    <pre class="code-preview"><code>console.log(greeting);    // What prints here?
sayHi();                  // Can we call this?
console.log(score);       // What happens here?

var greeting = "Hello";
let score = 98;

function sayHi() {
    console.log("Hi there!");
}</code></pre>
                </div>
            `,
            creation: `
                <div class="hoist-card">
                    <h5>Creation Phase (JavaScript Engine allocates memory):</h5>
                    <div class="memory-grid">
                        <div class="memory-entry">
                            <span class="mem-name"><code>greeting</code> (var)</span>
                            <span class="mem-val val-undefined">undefined</span>
                            <span class="mem-note">Allocated & initialized to <code>undefined</code></span>
                        </div>
                        <div class="memory-entry">
                            <span class="mem-name"><code>sayHi</code> (function)</span>
                            <span class="mem-val val-function">ƒ sayHi() { ... }</span>
                            <span class="mem-note">Entire function body loaded in memory</span>
                        </div>
                        <div class="memory-entry">
                            <span class="mem-name"><code>score</code> (let)</span>
                            <span class="mem-val" style="color:var(--accent-red);">[Uninitialized in TDZ]</span>
                            <span class="mem-note">Allocated space, but access is forbidden until line 6</span>
                        </div>
                    </div>
                </div>
            `,
            execution: `
                <div class="hoist-card">
                    <h5>Execution Phase (Step-by-step evaluation):</h5>
                    <ol class="exec-steps">
                        <li><strong>Line 1:</strong> <code>console.log(greeting)</code> &rarr; Prints <span class="val-undefined">undefined</span> (because var was initialized to undefined).</li>
                        <li><strong>Line 2:</strong> <code>sayHi()</code> &rarr; Executes normally, prints <span class="val-string">"Hi there!"</span>.</li>
                        <li><strong>Line 3:</strong> <code>console.log(score)</code> &rarr; <span style="color:var(--accent-red);">ReferenceError: Cannot access 'score' before initialization</span> (TDZ protection).</li>
                        <li><strong>Line 5:</strong> <code>greeting = "Hello"</code> &rarr; <code>greeting</code> updated from <code>undefined</code> to <code>"Hello"</code>.</li>
                        <li><strong>Line 6:</strong> <code>score = 98</code> &rarr; TDZ ends, <code>score</code> is now accessible as <code>98</code>.</li>
                    </ol>
                </div>
            `
        };

        contentEl.innerHTML = views.author;

        tabs.forEach(tab => {
            tab.addEventListener("click", () => {
                tabs.forEach(t => t.classList.remove("active"));
                tab.classList.add("active");
                contentEl.innerHTML = views[tab.dataset.view];
            });
        });
    },

    /**
     * 3. MEMORY MODEL VISUALIZER (STACK VS HEAP)
     */
    renderMemoryVisualizer(container) {
        let primitiveVal = 50;
        let objVal = { name: "Alex", score: 85 };

        container.innerHTML = `
            <div class="visualizer-box">
                <div class="visualizer-header">
                    <h4><i class="fa-solid fa-memory"></i> Memory Architecture: Call Stack vs Memory Heap</h4>
                    <span class="badge badge-info">Interactive</span>
                </div>
                <p class="visualizer-desc">Interact with the controls below to see how primitive values vs object reference pointers behave in memory:</p>

                <div class="mem-controls">
                    <button class="btn btn-sm btn-outline" id="btn-copy-primitive">1. Copy Primitive (<code>let b = a; b = 99;</code>)</button>
                    <button class="btn btn-sm btn-outline" id="btn-copy-ref">2. Copy Reference (<code>let obj2 = obj1; obj2.score = 100;</code>)</button>
                    <button class="btn btn-sm btn-primary" id="btn-reset-mem">Reset Memory</button>
                </div>

                <div class="mem-split-layout">
                    <div class="mem-column stack-col">
                        <div class="mem-col-title"><i class="fa-solid fa-layer-group"></i> Call Stack (Fast, Fixed Size)</div>
                        <div class="stack-frames" id="stack-frame-view">
                            <!-- Populated dynamically -->
                        </div>
                    </div>

                    <div class="mem-column heap-col">
                        <div class="mem-col-title"><i class="fa-solid fa-cubes"></i> Memory Heap (Dynamic, Objects)</div>
                        <div class="heap-boxes" id="heap-box-view">
                            <!-- Populated dynamically -->
                        </div>
                    </div>
                </div>

                <div class="visualizer-status" id="mem-status-log">
                    💡 Initial state: <code>a</code> is stored directly on the stack. <code>obj1</code> on the stack stores pointer <code>0x4F12</code> pointing to the Heap object.
                </div>
            </div>
        `;

        const stackEl = container.querySelector("#stack-frame-view");
        const heapEl = container.querySelector("#heap-box-view");
        const statusEl = container.querySelector("#mem-status-log");

        const updateView = (state) => {
            stackEl.innerHTML = `
                <div class="stack-slot">
                    <span class="slot-var"><code>let a</code></span>
                    <span class="slot-val val-number">${state.a}</span>
                    <span class="slot-type">Primitive (Value)</span>
                </div>
                ${state.b !== undefined ? `
                <div class="stack-slot highlight-slot">
                    <span class="slot-var"><code>let b</code></span>
                    <span class="slot-val val-number">${state.b}</span>
                    <span class="slot-type">Copied Value (Independent)</span>
                </div>` : ''}
                <div class="stack-slot">
                    <span class="slot-var"><code>let obj1</code></span>
                    <span class="slot-val slot-pointer">Pointer &rarr; @0x4F12</span>
                    <span class="slot-type">Reference Address</span>
                </div>
                ${state.hasObj2 ? `
                <div class="stack-slot highlight-slot">
                    <span class="slot-var"><code>let obj2</code></span>
                    <span class="slot-val slot-pointer">Pointer &rarr; @0x4F12</span>
                    <span class="slot-type">Shared Pointer Address!</span>
                </div>` : ''}
            `;

            heapEl.innerHTML = `
                <div class="heap-object-card ${state.mutatedObj ? 'heap-mutated' : ''}">
                    <div class="heap-address">Address: 0x4F12</div>
                    <pre class="heap-content">${JSON.stringify(state.obj, null, 2)}</pre>
                </div>
            `;
        };

        let state = {
            a: 50,
            b: undefined,
            obj: { name: "Alex", score: 85 },
            hasObj2: false,
            mutatedObj: false
        };

        updateView(state);

        container.querySelector("#btn-copy-primitive").addEventListener("click", () => {
            state.b = 99;
            updateView(state);
            statusEl.innerHTML = `✅ <strong>Primitive Copied:</strong> <code>b</code> was assigned <code>a</code>'s value (50), then changed to 99. Notice <code>a</code> remains <strong>50</strong> because primitives are copied by value!`;
        });

        container.querySelector("#btn-copy-ref").addEventListener("click", () => {
            state.hasObj2 = true;
            state.obj.score = 100;
            state.mutatedObj = true;
            updateView(state);
            statusEl.innerHTML = `⚠️ <strong>Reference Copied:</strong> <code>obj2</code> was assigned <code>obj1</code>. Both stack variables hold the <em>exact same pointer address (0x4F12)</em>. Mutating <code>obj2.score</code> changed <code>obj1.score</code> too!`;
        });

        container.querySelector("#btn-reset-mem").addEventListener("click", () => {
            state = {
                a: 50,
                b: undefined,
                obj: { name: "Alex", score: 85 },
                hasObj2: false,
                mutatedObj: false
            };
            updateView(state);
            statusEl.innerHTML = `💡 Memory reset to original initial state.`;
        });
    },

    /**
     * 4. VARIABLE LIFECYCLE & TDZ VISUALIZER
     */
    renderLifecycleVisualizer(container) {
        container.innerHTML = `
            <div class="visualizer-box">
                <div class="visualizer-header">
                    <h4><i class="fa-solid fa-timeline"></i> Variable Lifecycle & Temporal Dead Zone (TDZ)</h4>
                </div>
                <div class="lifecycle-timeline">
                    <div class="timeline-step">
                        <div class="timeline-dot dot-warn"></div>
                        <div class="timeline-content">
                            <h5>1. Scope Entry (Creation Phase)</h5>
                            <p>Variable is registered in memory space.</p>
                            <div class="compare-row">
                                <span><code>var</code> &rarr; Bound to <code>undefined</code></span>
                                <span><code>let/const</code> &rarr; <strong>Enters TDZ (Uninitialized)</strong></span>
                            </div>
                        </div>
                    </div>

                    <div class="timeline-step tdz-zone-step">
                        <div class="timeline-dot dot-danger"></div>
                        <div class="timeline-content">
                            <h5>2. Temporal Dead Zone (TDZ)</h5>
                            <p>Lines of code before the <code>let/const</code> statement is reached.</p>
                            <div class="alert-box">Any access to <code>let/const</code> here throws <code>ReferenceError</code>!</div>
                        </div>
                    </div>

                    <div class="timeline-step">
                        <div class="timeline-dot dot-success"></div>
                        <div class="timeline-content">
                            <h5>3. Declaration & Initialization Statement</h5>
                            <p><code>let x = 10;</code> or <code>let x;</code></p>
                            <p>Variable is initialized. <strong>TDZ ends here!</strong> Now safe to read and write.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    /**
     * 5. JS ENGINE EXECUTION PIPELINE VISUALIZER (For Intro to JS)
     */
    renderPipelineVisualizer(container) {
        container.innerHTML = `
            <div class="visualizer-box">
                <div class="visualizer-header">
                    <h4><i class="fa-solid fa-gears"></i> JavaScript Engine Runtime Architecture</h4>
                    <span class="badge badge-info">Interactive Simulation</span>
                </div>
                <p class="visualizer-desc">Step through how modern JS Engines (like Chrome V8) parse, compile, and execute code:</p>
                <div class="scope-action-buttons">
                    <button class="btn btn-sm btn-outline pipe-step-btn" data-step="1">1. Parser (AST)</button>
                    <button class="btn btn-sm btn-outline pipe-step-btn" data-step="2">2. Ignition (Bytecode)</button>
                    <button class="btn btn-sm btn-outline pipe-step-btn" data-step="3">3. TurboFan (JIT Compiler)</button>
                    <button class="btn btn-sm btn-outline pipe-step-btn" data-step="4">4. Call Stack & Event Loop</button>
                </div>
                <div class="hoist-card" id="pipe-detail-card">
                    <h5><i class="fa-solid fa-code"></i> Step 1: Parser & Abstract Syntax Tree (AST)</h5>
                    <p>The parser breaks down source code text into tokens and builds a hierarchical syntax tree (AST) ensuring valid grammar before execution starts.</p>
                </div>
            </div>
        `;

        const stepsData = {
            1: {
                title: "Step 1: Parser & Abstract Syntax Tree (AST)",
                text: "The parser converts your raw JavaScript source code into structured tokens and builds an Abstract Syntax Tree (AST) to validate syntax."
            },
            2: {
                title: "Step 2: Ignition Bytecode Interpreter",
                text: "The AST is fed into the interpreter (Ignition in V8) which rapidly generates portable bytecode and begins immediate execution without waiting for heavy compilation."
            },
            3: {
                title: "Step 3: TurboFan Optimizing JIT Compiler",
                text: "As code runs repeatedly ('hot functions'), the Profiler collects type feedback and TurboFan recompiles hot bytecode directly into blazingly fast machine code!"
            },
            4: {
                title: "Step 4: Call Stack & Event Loop Orchestration",
                text: "Synchronous functions run on the single-threaded Call Stack. Async callbacks (Promises, Timers, Fetch) are offloaded to Web APIs and queued into Microtask / Macrotask queues."
            }
        };

        const btns = container.querySelectorAll(".pipe-step-btn");
        const card = container.querySelector("#pipe-detail-card");

        btns.forEach(btn => {
            btn.addEventListener("click", () => {
                const step = btn.dataset.step;
                btns.forEach(b => b.classList.remove("btn-primary"));
                btn.classList.add("btn-primary");
                const data = stepsData[step];
                card.innerHTML = `<h5><i class="fa-solid fa-gear fa-spin"></i> ${data.title}</h5><p>${data.text}</p>`;
            });
        });
    },

    /**
     * 6. ARROW FUNCTION VS REGULAR FUNCTION 'this' BINDING VISUALIZER
     */
    renderThisBindingVisualizer(container) {
        container.innerHTML = `
            <div class="visualizer-box">
                <div class="visualizer-header">
                    <h4><i class="fa-solid fa-crosshairs"></i> 'this' Binding: Regular Function vs Arrow Function</h4>
                    <span class="badge badge-info">Interactive</span>
                </div>
                <p class="visualizer-desc">Toggle between function types inside an object method callback to see what <code>this</code> resolves to:</p>
                <div class="scope-action-buttons">
                    <button class="btn btn-sm btn-primary this-toggle-btn" data-type="regular">Regular Function Callback</button>
                    <button class="btn btn-sm btn-outline this-toggle-btn" data-type="arrow">Arrow Function Callback</button>
                </div>
                <div class="mem-split-layout">
                    <div class="mem-column">
                        <div class="mem-col-title">Code Example</div>
                        <pre class="code-preview" id="this-code-preview"></pre>
                    </div>
                    <div class="mem-column">
                        <div class="mem-col-title">What <code>this</code> Points To</div>
                        <div id="this-output-view" class="visualizer-status"></div>
                    </div>
                </div>
            </div>
        `;

        const codeEl = container.querySelector("#this-code-preview");
        const outputEl = container.querySelector("#this-output-view");
        const btns = container.querySelectorAll(".this-toggle-btn");

        const updateThisView = (type) => {
            if (type === "regular") {
                codeEl.innerHTML = `<code>const player = {
    name: "Alex",
    play() {
        setTimeout(function() {
            // Regular function creates its OWN 'this'
            console.log(this.name);
        }, 100);
    }
};
player.play();</code>`;
                outputEl.innerHTML = `<span style="color:var(--accent-red); font-weight:700;"><i class="fa-solid fa-triangle-exclamation"></i> this = Window / undefined</span><br><br><small>Because regular functions bind <code>this</code> dynamically to the caller (here, <code>setTimeout</code> in global scope), <code>this.name</code> evaluates to <strong>undefined</strong>.</small>`;
            } else {
                codeEl.innerHTML = `<code>const player = {
    name: "Alex",
    play() {
        setTimeout(() => {
            // Arrow function inherits 'this' lexically
            console.log(this.name);
        }, 100);
    }
};
player.play();</code>`;
                outputEl.innerHTML = `<span style="color:var(--accent-green); font-weight:700;"><i class="fa-solid fa-circle-check"></i> this = player object { name: "Alex" }</span><br><br><small>Arrow functions do NOT have their own <code>this</code>. They inherit <code>this</code> from the enclosing <code>play()</code> method scope!</small>`;
            }
        };

        updateThisView("regular");

        btns.forEach(btn => {
            btn.addEventListener("click", () => {
                btns.forEach(b => {
                    b.classList.remove("btn-primary");
                    b.classList.add("btn-outline");
                });
                btn.classList.add("btn-primary");
                btn.classList.remove("btn-outline");
                updateThisView(btn.dataset.type);
            });
        });
    },

    /**
     * 7. SYNTACTIC SUGAR DE-SUGARING TRANSFORMER
     */
    renderSugarVisualizer(container) {
        container.innerHTML = `
            <div class="visualizer-box">
                <div class="visualizer-header">
                    <h4><i class="fa-solid fa-wand-magic-sparkles"></i> De-Sugaring Inspector (ES6+ vs Under-the-Hood ES5)</h4>
                    <span class="badge badge-info">Interactive</span>
                </div>
                <p class="visualizer-desc">Select an ES6+ syntactic sugar feature to see how JavaScript engines desugar it to ES5 mechanics:</p>
                <div class="scope-action-buttons">
                    <button class="btn btn-sm btn-primary sugar-select-btn" data-feature="classes">Classes</button>
                    <button class="btn btn-sm btn-outline sugar-select-btn" data-feature="optchain">Optional Chaining (?.)</button>
                    <button class="btn btn-sm btn-outline sugar-select-btn" data-feature="templates">Template Literals</button>
                    <button class="btn btn-sm btn-outline sugar-select-btn" data-feature="destruct">Destructuring</button>
                </div>
                <div class="mem-split-layout">
                    <div class="mem-column">
                        <div class="mem-col-title"><i class="fa-solid fa-sparkles"></i> Modern ES6+ (Syntactic Sugar)</div>
                        <pre class="code-preview" id="sugar-es6-view"></pre>
                    </div>
                    <div class="mem-column">
                        <div class="mem-col-title"><i class="fa-solid fa-cogs"></i> Under the Hood (ES5 Equivalent)</div>
                        <pre class="code-preview" id="sugar-es5-view"></pre>
                    </div>
                </div>
            </div>
        `;

        const es6El = container.querySelector("#sugar-es6-view");
        const es5El = container.querySelector("#sugar-es5-view");
        const btns = container.querySelectorAll(".sugar-select-btn");

        const sugarMap = {
            classes: {
                es6: `class User {\n    constructor(name) {\n        this.name = name;\n    }\n    greet() {\n        return "Hi " + this.name;\n    }\n}`,
                es5: `function User(name) {\n    this.name = name;\n}\nUser.prototype.greet = function() {\n    return "Hi " + this.name;\n};`
            },
            optchain: {
                es6: `const city = user?.address?.city;`,
                es5: `var _user, _user$address;\nvar city = (_user = user) === null || _user === void 0\n    ? void 0\n    : (_user$address = _user.address) === null || _user$address === void 0\n    ? void 0\n    : _user$address.city;`
            },
            templates: {
                es6: `const msg = \`Hello \${name}, score: \${score}!\`;`,
                es5: `var msg = "Hello " + name + ", score: " + score + "!";`
            },
            destruct: {
                es6: `const { id, title } = product;`,
                es5: `var id = product.id;\nvar title = product.title;`
            }
        };

        const updateSugar = (key) => {
            es6El.textContent = sugarMap[key].es6;
            es5El.textContent = sugarMap[key].es5;
        };

        updateSugar("classes");

        btns.forEach(btn => {
            btn.addEventListener("click", () => {
                btns.forEach(b => {
                    b.classList.remove("btn-primary");
                    b.classList.add("btn-outline");
                });
                btn.classList.add("btn-primary");
                btn.classList.remove("btn-outline");
                updateSugar(btn.dataset.feature);
            });
        });
    }
};

window.Visualizers = Visualizers;

