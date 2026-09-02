/**
 * JavaScript Learning Portal - Topics & Content Data
 * Includes rich lesson content, runnable code examples, quizzes, and visualizer metadata.
 */

const JS_TOPICS = [
    {
        id: "intro-js",
        title: "1. Introduction to JavaScript",
        shortTitle: "Intro to JS",
        category: "Foundations",
        difficulty: "Beginner",
        readTime: "8 min",
        icon: "fa-rocket",
        summary: "Discover the origin, evolution, architecture, and core execution model of JavaScript — the language of the modern web.",
        sections: [
            {
                heading: "What is JavaScript?",
                content: `
                    <p><strong>JavaScript (JS)</strong> is a lightweight, high-level, dynamic, multi-paradigm, just-in-time (JIT) compiled programming language. Created in 1995 by <strong>Brendan Eich</strong> in just 10 days at Netscape, it has evolved into the ubiquitous language of both client-side and server-side web development.</p>
                    
                    <div class="callout callout-info">
                        <i class="fa-solid fa-lightbulb"></i>
                        <div>
                            <strong>ECMAScript vs JavaScript:</strong>
                            <p><strong>ECMAScript (ES)</strong> is the standardized specification (governed by TC39 committee), while <strong>JavaScript</strong> is the actual implementation of that standard.</p>
                        </div>
                    </div>
                `
            },
            {
                heading: "How Does JavaScript Run?",
                content: `
                    <p>JavaScript code does not execute directly on hardware; it runs inside a <strong>JavaScript Engine</strong>:</p>
                    <ul class="feature-list">
                        <li><strong>V8:</strong> Google Chrome, Node.js, Deno</li>
                        <li><strong>SpiderMonkey:</strong> Mozilla Firefox</li>
                        <li><strong>JavaScriptCore (Nitro):</strong> Apple Safari</li>
                    </ul>

                    <h4>The Execution Pipeline:</h4>
                    <div class="pipeline-flow">
                        <div class="flow-step"><span class="step-num">1</span> Parser (AST)</div>
                        <i class="fa-solid fa-arrow-right flow-arrow"></i>
                        <div class="flow-step"><span class="step-num">2</span> Interpreter (Bytecode)</div>
                        <i class="fa-solid fa-arrow-right flow-arrow"></i>
                        <div class="flow-step"><span class="step-num">3</span> JIT Compiler (Machine Code)</div>
                        <i class="fa-solid fa-arrow-right flow-arrow"></i>
                        <div class="flow-step"><span class="step-num">4</span> Execution</div>
                    </div>

                    <p>JavaScript is <strong>single-threaded</strong> and uses an <strong>Event Loop</strong> with a Call Stack, Web APIs, and Task Queues (Macrotask & Microtask) to handle asynchronous operations without blocking the main thread.</p>
                `
            },
            {
                heading: "Embedding JavaScript in HTML & DevTools Console",
                content: `
                    <p>JavaScript can be included in HTML files in three ways:</p>
                    <div class="code-compare-grid">
                        <div class="compare-card">
                            <h5>1. Inline Script</h5>
                            <code>&lt;button onclick="alert('Hello!')"&gt;Click&lt;/button&gt;</code>
                        </div>
                        <div class="compare-card">
                            <h5>2. Internal Script</h5>
                            <code>&lt;script&gt;<br>&nbsp;&nbsp;console.log("Internal JS");<br>&lt;/script&gt;</code>
                        </div>
                        <div class="compare-card">
                            <h5>3. External Script (Best Practice)</h5>
                            <code>&lt;script src="app.js" defer&gt;&lt;/script&gt;</code>
                        </div>
                    </div>

                    <div class="callout callout-tip">
                        <i class="fa-solid fa-circle-check"></i>
                        <div>
                            <strong>Why use <code>defer</code>?</strong>
                            <p>The <code>defer</code> attribute tells the browser to download the script in parallel while parsing HTML and execute it only after the HTML document has been fully parsed.</p>
                        </div>
                    </div>
                `
            }
        ],
        codeSnippet: `// 1. Basic Console Logging
console.log("Welcome to JavaScript Mastery! 🚀");

// 2. Formatted & Informational Logs
const learner = { name: "Alex", level: "Beginner", goal: "FullStack Dev" };
console.table(learner);

// 3. Time Measurement
console.time("Calculation Time");
let sum = 0;
for (let i = 1; i <= 100000; i++) {
    sum += i;
}
console.timeEnd("Calculation Time");
console.log("Calculated Sum:", sum);

// 4. Built-in Math and Date objects
console.log("Current Year:", new Date().getFullYear());
console.log("Random Number (1-100):", Math.floor(Math.random() * 100) + 1);`,
        quiz: [
            {
                question: "Who created JavaScript and in what year was it first developed?",
                options: [
                    "James Gosling in 1991",
                    "Brendan Eich in 1995",
                    "Guido van Rossum in 1989",
                    "Dennis Ritchie in 1972"
                ],
                answer: 1,
                explanation: "Brendan Eich created JavaScript at Netscape in 1995 in just 10 days."
            },
            {
                question: "Which JavaScript engine powers Google Chrome and Node.js?",
                options: [
                    "SpiderMonkey",
                    "JavaScriptCore",
                    "V8",
                    "Chakra"
                ],
                answer: 2,
                explanation: "Google's open-source high-performance V8 engine powers Chrome, Node.js, and Deno."
            },
            {
                question: "What is the advantage of using '<script src=\"app.js\" defer>'?",
                options: [
                    "It delays script execution until after the HTML document is fully parsed",
                    "It executes the script before any HTML is parsed",
                    "It prevents the script from accessing the DOM",
                    "It stops asynchronous network requests"
                ],
                answer: 0,
                explanation: "The 'defer' attribute loads the script asynchronously in the background and executes it in order after the HTML document is completely parsed."
            }
        ]
    },
    {
        id: "variables",
        title: "2. Variables (var vs let vs const)",
        shortTitle: "var, let, const",
        category: "Core Syntax",
        difficulty: "Beginner",
        readTime: "10 min",
        icon: "fa-box-archive",
        summary: "Master the fundamental storage containers of JavaScript: var, let, and const, their scopes, mutability, and modern best practices.",
        sections: [
            {
                heading: "What is a Variable?",
                content: `
                    <p>A <strong>variable</strong> is a named container in memory used to store data values. In modern JavaScript, we have three keywords to declare variables: <code>var</code>, <code>let</code>, and <code>const</code>.</p>
                `
            },
            {
                heading: "In-Depth Comparison: var vs let vs const",
                content: `
                    <div class="table-responsive">
                        <table class="styled-table">
                            <thead>
                                <tr>
                                    <th>Feature</th>
                                    <th><code>var</code> (ES5)</th>
                                    <th><code>let</code> (ES6)</th>
                                    <th><code>const</code> (ES6)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>Scope</strong></td>
                                    <td><span class="badge badge-warning">Function Scope</span></td>
                                    <td><span class="badge badge-success">Block Scope { }</span></td>
                                    <td><span class="badge badge-success">Block Scope { }</span></td>
                                </tr>
                                <tr>
                                    <td><strong>Re-declaration</strong></td>
                                    <td>✅ Allowed in same scope</td>
                                    <td>❌ SyntaxError</td>
                                    <td>❌ SyntaxError</td>
                                </tr>
                                <tr>
                                    <td><strong>Re-assignment</strong></td>
                                    <td>✅ Allowed</td>
                                    <td>✅ Allowed</td>
                                    <td>❌ TypeError</td>
                                </tr>
                                <tr>
                                    <td><strong>Hoisting Behavior</strong></td>
                                    <td>Hoisted, initialized as <code>undefined</code></td>
                                    <td>Hoisted, stays in <strong>TDZ</strong></td>
                                    <td>Hoisted, stays in <strong>TDZ</strong></td>
                                </tr>
                                <tr>
                                    <td><strong>Window Attachment</strong></td>
                                    <td>Attaches to <code>window</code> (global)</td>
                                    <td>Does not attach to <code>window</code></td>
                                    <td>Does not attach to <code>window</code></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                `
            },
            {
                heading: "Understanding 'const' Mutability",
                content: `
                    <div class="callout callout-warning">
                        <i class="fa-solid fa-triangle-exclamation"></i>
                        <div>
                            <strong>Important Nuance:</strong>
                            <p><code>const</code> prevents <em>re-assignment of the variable identifier itself</em>, but it does <strong>not</strong> make complex objects or arrays immutable.</p>
                        </div>
                    </div>
                    <p>To freeze an object completely, use <code>Object.freeze(myObj)</code>.</p>
                `
            }
        ],
        codeSnippet: `// 1. var problem: Leaks outside blocks
if (true) {
    var globalScopedVar = "I leaked outside the block!";
    let blockScopedLet = "I am safe inside block";
    const blockScopedConst = "I am also safe inside block";
}
console.log("var access:", globalScopedVar); // Accessible!
// console.log(blockScopedLet); // Would throw ReferenceError

// 2. const with Objects & Arrays
const user = { name: "Monica", role: "Developer" };
user.role = "Lead Architect"; // Allowed! Object properties can mutate
user.country = "India";        // Allowed!
console.log("Mutated const object:", user);

// user = { name: "Other" }; // TypeError: Assignment to constant variable

// 3. Object.freeze() for deep immutability
const config = Object.freeze({ theme: "dark", version: 1.0 });
// config.theme = "light"; // Silently fails or throws in strict mode
console.log("Frozen config:", config);`,
        quiz: [
            {
                question: "Which keyword creates a block-scoped variable that CAN be reassigned?",
                options: ["var", "let", "const", "static"],
                answer: 1,
                explanation: "'let' is block-scoped and allows reassignment, unlike 'const' which forbids reassignment."
            },
            {
                question: "What happens if you try to re-declare a 'let' variable within the same scope?",
                options: [
                    "It overwrites the old variable silently",
                    "It throws a SyntaxError: Identifier has already been declared",
                    "It becomes undefined",
                    "It converts to a global variable"
                ],
                answer: 1,
                explanation: "'let' and 'const' do not allow re-declaration in the same scope and trigger a SyntaxError."
            },
            {
                question: "Can properties of an object declared with 'const' be modified?",
                options: [
                    "No, const makes the entire object deeply frozen",
                    "Yes, const only prevents reassigning the variable reference, not mutating properties",
                    "Only if declared inside a function",
                    "Only if using 'var' inside the object"
                ],
                answer: 1,
                explanation: "'const' locks the memory reference, but properties of objects or elements of arrays can still be updated unless frozen with Object.freeze()."
            }
        ]
    },
    {
        id: "declaration-initialization",
        title: "3. Variable Declaration vs Initialization",
        shortTitle: "Declaration vs Init",
        category: "Core Syntax",
        difficulty: "Beginner",
        readTime: "7 min",
        icon: "fa-pen-to-square",
        summary: "Understand the distinct phases of variable lifecycle: Declaration, Initialization, Assignment, and the Temporal Dead Zone (TDZ).",
        sections: [
            {
                heading: "The 3 Stages of Variable Lifecycle",
                content: `
                    <div class="steps-container">
                        <div class="step-card">
                            <div class="step-badge">Phase 1</div>
                            <h4>Declaration</h4>
                            <p>Registering the variable name in its lexical scope. Memory space is allocated for the identifier.</p>
                            <code>let score;</code>
                        </div>
                        <div class="step-card">
                            <div class="step-badge">Phase 2</div>
                            <h4>Initialization</h4>
                            <p>The variable is bound to an initial value in memory (defaults to <code>undefined</code> for <code>var</code>/<code>let</code>).</p>
                            <code>score = 0;</code>
                        </div>
                        <div class="step-card">
                            <div class="step-badge">Phase 3</div>
                            <h4>Assignment / Usage</h4>
                            <p>Assigning new values or reading the variable in expressions.</p>
                            <code>score = 95;</code>
                        </div>
                    </div>
                `
            },
            {
                heading: "Temporal Dead Zone (TDZ)",
                content: `
                    <p>The <strong>Temporal Dead Zone (TDZ)</strong> is the region of code from the beginning of the scope until the line where a <code>let</code> or <code>const</code> variable is declared and initialized.</p>
                    <div class="callout callout-danger">
                        <i class="fa-solid fa-ban"></i>
                        <div>
                            <strong>Accessing inside TDZ:</strong>
                            <p>Attempting to read or write a <code>let</code> or <code>const</code> variable while it is in its TDZ results in a <code>ReferenceError: Cannot access 'x' before initialization</code>.</p>
                        </div>
                    </div>
                `
            },
            {
                heading: "undefined vs uninitialized vs null",
                content: `
                    <div class="table-responsive">
                        <table class="styled-table">
                            <thead>
                                <tr>
                                    <th>State</th>
                                    <th>Description</th>
                                    <th>Example</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>Uninitialized (TDZ)</strong></td>
                                    <td>Variable exists in scope during creation phase, but cannot be accessed yet.</td>
                                    <td>Before <code>let x = 5;</code> line</td>
                                </tr>
                                <tr>
                                    <td><strong>undefined</strong></td>
                                    <td>Variable has been declared and initialized, but has not been assigned a specific value.</td>
                                    <td><code>let y; // y is undefined</code></td>
                                </tr>
                                <tr>
                                    <td><strong>null</strong></td>
                                    <td>An intentional assignment representing "no value" or an empty object reference.</td>
                                    <td><code>let z = null;</code></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                `
            }
        ],
        codeSnippet: `// 1. Declaration without initialization
let playerRating;
console.log("Declared let value:", playerRating); // undefined
console.log("Type of unassigned:", typeof playerRating); // "undefined"

// 2. Initialization and reassignment
playerRating = 4.8;
console.log("Initialized rating:", playerRating);

// 3. const MUST be initialized during declaration
const API_URL = "https://api.example.com/v1";
console.log("API URL:", API_URL);
// const BAD_CONST; // SyntaxError: Missing initializer in const declaration

// 4. Checking TDZ behavior safely
console.log("var before declaration:", hoistedVar); // undefined
var hoistedVar = "I am a var";

try {
    // console.log(tdzLet); // Throws ReferenceError
} catch (err) {
    console.error("Caught TDZ error:", err.message);
}
let tdzLet = "I am a let";`,
        quiz: [
            {
                question: "What is the default value of a 'let' variable declared without an explicit value (e.g., 'let total;')?",
                options: ["null", "undefined", "0", "NaN"],
                answer: 1,
                explanation: "When declared without an explicit value, 'let' and 'var' are automatically initialized with 'undefined'."
            },
            {
                question: "What happens when declaring 'const serverPort;' without an initialization value?",
                options: [
                    "serverPort is initialized to undefined",
                    "serverPort is initialized to null",
                    "SyntaxError: Missing initializer in const declaration",
                    "It converts to a 'let' variable"
                ],
                answer: 2,
                explanation: "'const' declarations must always be initialized with a value at the time of declaration."
            },
            {
                question: "What is the 'Temporal Dead Zone' (TDZ)?",
                options: [
                    "The time when a browser is idle",
                    "The period between variable scope entry and its formal declaration/initialization where access throws ReferenceError",
                    "The time taken by Garbage Collection",
                    "A function that has stopped running"
                ],
                answer: 1,
                explanation: "TDZ is the scope span from start of block until the let/const declaration is evaluated; accessing it during TDZ causes a ReferenceError."
            }
        ]
    },
    {
        id: "datatypes",
        title: "4. Data Types in JavaScript",
        shortTitle: "Data Types",
        category: "Core Syntax",
        difficulty: "Beginner",
        readTime: "12 min",
        icon: "fa-cubes",
        summary: "Explore JavaScript's dynamic type system: 7 Primitive types vs Reference types, Stack vs Heap memory allocation, and type coercion.",
        sections: [
            {
                heading: "The 7 Primitive Data Types",
                content: `
                    <p>Primitive types are immutable values stored directly on the <strong>Call Stack</strong>:</p>
                    <div class="type-grid">
                        <div class="type-card">
                            <span class="type-badge">1</span>
                            <h4>Number</h4>
                            <p>64-bit float (e.g. <code>42</code>, <code>3.14</code>, <code>NaN</code>, <code>Infinity</code>)</p>
                        </div>
                        <div class="type-card">
                            <span class="type-badge">2</span>
                            <h4>String</h4>
                            <p>Textual data in quotes (e.g. <code>"Hello"</code>, <code>'World'</code>, <code>\`ES6\`</code>)</p>
                        </div>
                        <div class="type-card">
                            <span class="type-badge">3</span>
                            <h4>Boolean</h4>
                            <p>Logical values: <code>true</code> or <code>false</code></p>
                        </div>
                        <div class="type-card">
                            <span class="type-badge">4</span>
                            <h4>Undefined</h4>
                            <p>Variable declared without assigned value (<code>undefined</code>)</p>
                        </div>
                        <div class="type-card">
                            <span class="type-badge">5</span>
                            <h4>Null</h4>
                            <p>Intentional absence of object value (<code>null</code>)</p>
                        </div>
                        <div class="type-card">
                            <span class="type-badge">6</span>
                            <h4>BigInt</h4>
                            <p>Arbitrary precision integers: <code>9007199254740991n</code></p>
                        </div>
                        <div class="type-card">
                            <span class="type-badge">7</span>
                            <h4>Symbol</h4>
                            <p>Guaranteed unique and immutable identifier: <code>Symbol('id')</code></p>
                        </div>
                    </div>
                `
            },
            {
                heading: "Non-Primitive (Reference) Types",
                content: `
                    <p>Non-primitives are objects stored in the <strong>Memory Heap</strong>. The variable on the stack holds a reference (pointer address) to that heap memory.</p>
                    <ul class="feature-list">
                        <li><strong>Objects:</strong> Key-value collections <code>{ name: "John", age: 28 }</code></li>
                        <li><strong>Arrays:</strong> Ordered lists <code>[10, 20, 30]</code> (technically specialized objects)</li>
                        <li><strong>Functions:</strong> First-class callable objects <code>function() {}</code></li>
                        <li><strong>Built-in Objects:</strong> <code>Date</code>, <code>RegExp</code>, <code>Map</code>, <code>Set</code>, <code>Promise</code></li>
                    </ul>
                `
            },
            {
                heading: "Primitive (By Value) vs Reference (By Reference)",
                content: `
                    <div class="callout callout-info">
                        <i class="fa-solid fa-memory"></i>
                        <div>
                            <strong>Memory Mechanics:</strong>
                            <p>When you copy a <strong>primitive</strong>, JS creates an independent copy of the value. When you copy an <strong>object/array</strong>, JS copies the <em>memory pointer</em>, so both variables point to the exact same object in heap memory!</p>
                        </div>
                    </div>

                    <h4>Famous typeof Quirks:</h4>
                    <code>typeof null === "object"; // Historical bug in JS since 1995!</code><br>
                    <code>typeof NaN === "number"; // Not a Number is of type number</code><br>
                    <code>typeof function(){} === "function"; // Specialized object</code>
                `
            }
        ],
        codeSnippet: `// 1. Primitive Copy (Pass by Value)
let originalScore = 100;
let clonedScore = originalScore;
clonedScore = 250;
console.log("Original Score:", originalScore); // 100 (Unchanged!)
console.log("Cloned Score:", clonedScore);     // 250

// 2. Reference Copy (Pass by Reference)
let user1 = { name: "Alice", skills: ["JS", "CSS"] };
let user2 = user1; // Copies pointer address!

user2.name = "Bob"; // Modifies the same heap object
console.log("user1.name:", user1.name); // "Bob" (Mutated!)
console.log("user1 === user2:", user1 === user2); // true

// 3. Proper Cloning (Shallow vs Deep)
let user3 = { ...user1 }; // Spread creates a shallow copy
user3.name = "Charlie";
console.log("user1.name after spread clone:", user1.name); // "Bob"
console.log("user3.name:", user3.name); // "Charlie"

// 4. typeof inspections
console.log("typeof 42n:", typeof 42n);           // "bigint"
console.log("typeof Symbol('k'):", typeof Symbol('k')); // "symbol"
console.log("typeof null:", typeof null);         // "object" (historic quirk)
console.log("Array.isArray([]):", Array.isArray([])); // true`,
        quiz: [
            {
                question: "What does 'typeof null' evaluate to in JavaScript?",
                options: ["'null'", "'undefined'", "'object'", "'boolean'"],
                answer: 2,
                explanation: "Due to a legacy implementation quirk in JS from 1995, 'typeof null' returns 'object'."
            },
            {
                question: "Which of the following is NOT a primitive data type in JavaScript?",
                options: ["Symbol", "BigInt", "Array", "Boolean"],
                answer: 2,
                explanation: "Array is a Reference type (an Object), whereas Symbol, BigInt, and Boolean are Primitive types."
            },
            {
                question: "What is the output of 'console.log(0.1 + 0.2 === 0.3)' in JavaScript?",
                options: [
                    "true",
                    "false (due to IEEE 754 floating point precision)",
                    "undefined",
                    "TypeError"
                ],
                answer: 1,
                explanation: "JavaScript uses IEEE 754 double precision floats, where 0.1 + 0.2 equals 0.30000000000000004, so 0.1 + 0.2 === 0.3 is false."
            }
        ]
    },
    {
        id: "scopes",
        title: "5. Scopes in JavaScript",
        shortTitle: "Scopes & Scope Chain",
        category: "Execution Model",
        difficulty: "Intermediate",
        readTime: "11 min",
        icon: "fa-layer-group",
        summary: "Master Global, Function, Block, and Lexical scopes, closures, and how the JavaScript engine traverses the Scope Chain.",
        sections: [
            {
                heading: "What is Scope?",
                content: `
                    <p><strong>Scope</strong> determines the accessibility and visibility of variables, functions, and objects in different parts of your code during runtime.</p>
                `
            },
            {
                heading: "The 4 Types of Scopes in JavaScript",
                content: `
                    <div class="scope-cards-grid">
                        <div class="scope-card">
                            <h4>1. Global Scope</h4>
                            <p>Variables declared outside any function or block. Accessible everywhere in the application.</p>
                        </div>
                        <div class="scope-card">
                            <h4>2. Function / Local Scope</h4>
                            <p>Variables declared with <code>var</code>, <code>let</code>, or <code>const</code> inside a function. Only visible within that function.</p>
                        </div>
                        <div class="scope-card">
                            <h4>3. Block Scope (ES6)</h4>
                            <p>Variables declared with <code>let</code> and <code>const</code> inside <code>{ ... }</code> (e.g. <code>if</code>, <code>for</code>, <code>while</code>). <code>var</code> ignores block scope!</p>
                        </div>
                        <div class="scope-card">
                            <h4>4. Module Scope</h4>
                            <p>In ES Modules (<code>import/export</code>), top-level variables are scoped to the module file rather than the global object.</p>
                        </div>
                    </div>
                `
            },
            {
                heading: "Lexical Scoping & The Scope Chain",
                content: `
                    <p>JavaScript uses <strong>Lexical (Static) Scoping</strong>: variable resolution is determined by the physical placement of functions in the source code at author time.</p>
                    
                    <div class="callout callout-info">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <div>
                            <strong>Scope Chain Lookup Rule:</strong>
                            <p>When an engine encounters a variable, it first searches the <em>Current Local Scope</em>. If not found, it moves up to the <em>Enclosing Outer Scope</em>, and continues outwards until it reaches the <em>Global Scope</em>. If still not found, it throws a <code>ReferenceError</code>.</p>
                        </div>
                    </div>
                `
            }
        ],
        codeSnippet: `// 1. Global Scope
const globalVar = "🌍 I am Global";

function outerFunction() {
    // 2. Function / Outer Lexical Scope
    const outerVar = "🏢 I am Outer Scope";

    function innerFunction() {
        // 3. Inner Scope
        const innerVar = "🚪 I am Inner Scope";

        // Scope Chain Lookup in Action:
        console.log(innerVar);  // Found locally
        console.log(outerVar);  // Found in outer lexical environment
        console.log(globalVar); // Found in global environment
    }

    innerFunction();
}

outerFunction();

// 4. Block Scope vs Function Scope
if (true) {
    var notBlockScoped = "I leak out!";
    let strictlyBlockScoped = "I am locked in { }";
}
console.log("var outside block:", notBlockScoped);
// console.log(strictlyBlockScoped); // ReferenceError`,
        quiz: [
            {
                question: "What does 'Lexical Scoping' mean in JavaScript?",
                options: [
                    "Scope is determined at runtime based on where a function is called from",
                    "Scope is determined at author time based on where functions and blocks are physically written",
                    "Variables can only be accessed using dictionary keywords",
                    "All variables are automatically placed in the global object"
                ],
                answer: 1,
                explanation: "Lexical (or static) scoping means scope resolution depends on where variables and blocks are authored in code, not where functions are invoked."
            },
            {
                question: "What happens if a variable is not found in the local scope, any parent scopes, or the global scope in strict mode?",
                options: [
                    "It defaults to undefined",
                    "It throws a ReferenceError",
                    "It creates a new global variable automatically",
                    "It returns null"
                ],
                answer: 1,
                explanation: "Traversing the entire scope chain without finding an identifier results in a ReferenceError: [variable] is not defined."
            },
            {
                question: "Which of the following creates a new scope for 'let' and 'const' variables?",
                options: [
                    "Any pair of curly braces { }",
                    "Only 'function' declarations",
                    "Only 'switch' statements",
                    "HTML script tags only"
                ],
                answer: 0,
                explanation: "Any code block delimited by curly braces { } (if, for, while, or standalone block) creates a new block scope for 'let' and 'const'."
            }
        ]
    },
    {
        id: "hoisting",
        title: "6. Hoisting in JavaScript",
        shortTitle: "Hoisting",
        category: "Execution Model",
        difficulty: "Intermediate",
        readTime: "10 min",
        icon: "fa-arrows-up-to-line",
        summary: "Demystify JavaScript Hoisting: how variable and function declarations are processed during the Execution Context creation phase.",
        sections: [
            {
                heading: "What is Hoisting?",
                content: `
                    <p><strong>Hoisting</strong> is JavaScript's default behavior of allocating memory for variable and function declarations during the <em>Creation Phase</em> of an Execution Context before executing any code line-by-line.</p>
                    <p>Metaphorically, it feels like declarations are "lifted" to the top of their enclosing scope.</p>
                `
            },
            {
                heading: "Hoisting Breakdown by Declaration Type",
                content: `
                    <div class="table-responsive">
                        <table class="styled-table">
                            <thead>
                                <tr>
                                    <th>Declaration</th>
                                    <th>Hoisted?</th>
                                    <th>Initial Value in Creation Phase</th>
                                    <th>Behavior Before Declaration Line</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><code>var x = 10;</code></td>
                                    <td>✅ Yes</td>
                                    <td><code>undefined</code></td>
                                    <td>Returns <code>undefined</code> (No error)</td>
                                </tr>
                                <tr>
                                    <td><code>let y = 20;</code></td>
                                    <td>✅ Yes</td>
                                    <td><em>Uninitialized</em> (TDZ)</td>
                                    <td>Throws <code>ReferenceError</code></td>
                                </tr>
                                <tr>
                                    <td><code>const z = 30;</code></td>
                                    <td>✅ Yes</td>
                                    <td><em>Uninitialized</em> (TDZ)</td>
                                    <td>Throws <code>ReferenceError</code></td>
                                </tr>
                                <tr>
                                    <td><code>function greet() {}</code></td>
                                    <td>✅ Yes</td>
                                    <td>Full function definition</td>
                                    <td>Can be called normally anywhere in scope!</td>
                                </tr>
                                <tr>
                                    <td><code>var fn = () => {}</code></td>
                                    <td>✅ Yes (as <code>var</code>)</td>
                                    <td><code>undefined</code></td>
                                    <td>Throws <code>TypeError: fn is not a function</code></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                `
            },
            {
                heading: "Function Declarations vs Function Expressions",
                content: `
                    <div class="callout callout-warning">
                        <i class="fa-solid fa-code-compare"></i>
                        <div>
                            <strong>Crucial Distinction:</strong>
                            <p><strong>Function Declarations</strong> (<code>function foo() {}</code>) are hoisted with their complete implementation.</p>
                            <p><strong>Function Expressions & Arrow Functions</strong> assigned to variables follow variable hoisting rules (e.g. <code>var bar = function() {}</code> will be <code>undefined</code> if invoked beforehand).</p>
                        </div>
                    </div>
                `
            }
        ],
        codeSnippet: `// 1. Function Declaration Hoisting (Works!)
sayHello("Sarah"); // Output: "Hello, Sarah!"

function sayHello(name) {
    console.log("Hello, " + name + "!");
}

// 2. var Hoisting (Returns undefined)
console.log("var value before line:", myPet); // undefined
var myPet = "Golden Retriever";
console.log("var value after line:", myPet);  // "Golden Retriever"

// 3. Function Expression with var (Pitfall!)
try {
    greetPerson(); // TypeError: greetPerson is not a function
} catch (e) {
    console.error("Expression error:", e.message);
}

var greetPerson = function() {
    console.log("Greetings!");
};

// 4. let / const Hoisting in TDZ
try {
    // console.log(heroName); // ReferenceError: Cannot access 'heroName' before initialization
} catch (e) {
    console.error("TDZ Error:", e.message);
}
let heroName = "Batman";
console.log("heroName:", heroName);`,
        quiz: [
            {
                question: "What is the output of 'console.log(a); var a = 10;'?",
                options: ["10", "undefined", "ReferenceError", "NaN"],
                answer: 1,
                explanation: "'var a' is hoisted and initialized to 'undefined' during the creation phase, so accessing it returns 'undefined'."
            },
            {
                question: "What happens if you invoke a function declaration before its definition in the source code?",
                options: [
                    "It executes normally because function declarations are fully hoisted",
                    "It throws a TypeError",
                    "It throws a ReferenceError",
                    "It returns null"
                ],
                answer: 0,
                explanation: "Function declarations are hoisted in their entirety into memory, allowing them to be safely invoked anywhere in their containing scope."
            },
            {
                question: "Are 'let' and 'const' variables hoisted in JavaScript?",
                options: [
                    "No, only 'var' is hoisted",
                    "Yes, they are hoisted into their lexical scope but remain uninitialized in the TDZ",
                    "Only when declared inside an object",
                    "Only in non-strict mode"
                ],
                answer: 1,
                explanation: "Yes, 'let' and 'const' ARE hoisted, but unlike 'var', they are not initialized with 'undefined' and sit in the Temporal Dead Zone until execution reaches their declaration."
            }
        ]
    },
    {
        id: "arrow-functions",
        title: "7. Arrow Functions in ES6",
        shortTitle: "Arrow Functions",
        category: "Modern Functions",
        difficulty: "Intermediate",
        readTime: "9 min",
        icon: "fa-arrow-trend-up",
        summary: "Explore ES6 Arrow Functions: concise syntax, implicit returns, lexical 'this' binding, and critical differences from standard functions.",
        sections: [
            {
                heading: "Syntax Evolution: Regular vs Arrow Functions",
                content: `
                    <p>Introduced in <strong>ECMAScript 2015 (ES6)</strong>, arrow functions provide a compact syntax for writing function expressions.</p>
                    
                    <div class="code-compare-grid">
                        <div class="compare-card">
                            <h5>Regular Function</h5>
                            <code>function add(a, b) {<br>&nbsp;&nbsp;return a + b;<br>}</code>
                        </div>
                        <div class="compare-card">
                            <h5>Arrow Function (Explicit)</h5>
                            <code>const add = (a, b) => {<br>&nbsp;&nbsp;return a + b;<br>};</code>
                        </div>
                        <div class="compare-card">
                            <h5>Arrow Function (Implicit Return)</h5>
                            <code>const add = (a, b) => a + b;</code>
                        </div>
                    </div>
                `
            },
            {
                heading: "Key Architectural Differences",
                content: `
                    <div class="table-responsive">
                        <table class="styled-table">
                            <thead>
                                <tr>
                                    <th>Feature</th>
                                    <th>Regular Function</th>
                                    <th>Arrow Function</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong><code>this</code> Binding</strong></td>
                                    <td>Dynamic (depends on <em>how</em> function is called)</td>
                                    <td><strong>Lexical</strong> (inherits <code>this</code> from enclosing parent scope)</td>
                                </tr>
                                <tr>
                                    <td><strong><code>arguments</code> Object</strong></td>
                                    <td>✅ Has its own <code>arguments</code> object</td>
                                    <td>❌ No <code>arguments</code> (use rest <code>...args</code>)</td>
                                </tr>
                                <tr>
                                    <td><strong>Constructor (<code>new</code>)</strong></td>
                                    <td>✅ Can be used with <code>new</code></td>
                                    <td>❌ Cannot be used as constructor (TypeError)</td>
                                </tr>
                                <tr>
                                    <td><strong><code>prototype</code> Property</strong></td>
                                    <td>✅ Has <code>prototype</code></td>
                                    <td>❌ Does not have <code>prototype</code></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                `
            },
            {
                heading: "When NOT to Use Arrow Functions",
                content: `
                    <ul class="feature-list">
                        <li><strong>Object Methods:</strong> If an object method needs to access object properties via <code>this.prop</code>, an arrow function will bind <code>this</code> to the outer global/module scope!</li>
                        <li><strong>DOM Event Handlers with dynamic <code>this</code>:</strong> If you want <code>this</code> to represent the target clicked DOM element.</li>
                    </ul>
                `
            }
        ],
        codeSnippet: `// 1. Syntax Variations
const square = x => x * x; // Single parameter: parentheses optional
const greet = () => "Hello World!"; // Zero params: empty parentheses
const makeUser = (id, name) => ({ id, name }); // Returning object literal needs ({ })

console.log("Square of 9:", square(9));
console.log("User object:", makeUser(101, "Emma"));

// 2. Lexical 'this' in callbacks
const timerCounter = {
    count: 0,
    start() {
        // Arrow function retains 'this' from start() method!
        const increment = () => {
            this.count++;
            console.log("Timer Count:", this.count);
        };
        increment();
    }
};
timerCounter.start();

// 3. Arrow function with Array Methods
const numbers = [1, 2, 3, 4, 5, 6];
const evensSquared = numbers
    .filter(n => n % 2 === 0)
    .map(n => n * n);

console.log("Even numbers squared:", evensSquared);

// 4. Using Rest Parameters instead of arguments
const sumAll = (...nums) => nums.reduce((acc, curr) => acc + curr, 0);
console.log("Sum of 10, 20, 30, 40:", sumAll(10, 20, 30, 40));`,
        quiz: [
            {
                question: "How does the 'this' keyword behave inside an arrow function?",
                options: [
                    "It points to the object currently calling the arrow function",
                    "It is lexically resolved from the enclosing execution context",
                    "It is always bound to the global 'window' object",
                    "It is automatically undefined"
                ],
                answer: 1,
                explanation: "Arrow functions do not define their own 'this'; they inherit 'this' from the lexical context in which they are defined."
            },
            {
                question: "How do you return an object literal implicitly from a single-line arrow function?",
                options: [
                    "const fn = () => { key: 'val' };",
                    "const fn = () => ({ key: 'val' });",
                    "const fn = () => return { key: 'val' };",
                    "const fn = () => [ key: 'val' ];"
                ],
                answer: 1,
                explanation: "To return an object literal implicitly, wrap the object in parentheses '({ key: value })' so the parser doesn't mistake curly braces for a function body block."
            },
            {
                question: "Can an arrow function be used with the 'new' keyword as a constructor?",
                options: [
                    "Yes, always",
                    "No, doing so throws a TypeError",
                    "Only if it has no parameters",
                    "Only in strict mode"
                ],
                answer: 1,
                explanation: "Arrow functions lack a [[Construct]] internal method and a 'prototype' property, so calling 'new ArrowFn()' throws a TypeError."
            }
        ]
    },
    {
        id: "syntactic-sugar",
        title: "8. Syntactic Sugar in Modern JavaScript",
        shortTitle: "Syntactic Sugar",
        category: "Modern ES6+",
        difficulty: "Intermediate",
        readTime: "13 min",
        icon: "fa-wand-magic-sparkles",
        summary: "Understand what 'syntactic sugar' means and master ES6+ features: Classes, Destructuring, Spread/Rest, Template Literals, and Optional Chaining.",
        sections: [
            {
                heading: "What is Syntactic Sugar?",
                content: `
                    <p><strong>Syntactic Sugar</strong> is syntax within a programming language designed to make things easier to read or express. It makes the language "sweeter" for human programmers without introducing any new underlying runtime capabilities.</p>
                    <div class="callout callout-info">
                        <i class="fa-solid fa-candy-cane"></i>
                        <div>
                            <strong>Core Concept:</strong>
                            <p>Under the hood, JavaScript engines compile syntactic sugar down into standard ES5 prototypes, functions, and conditional checks.</p>
                        </div>
                    </div>
                `
            },
            {
                heading: "Top Syntactic Sugar Features in Modern JS",
                content: `
                    <div class="sugar-grid">
                        <div class="sugar-card">
                            <h4>1. ES6 Classes</h4>
                            <p>Cleaner syntax over JavaScript's existing prototypal inheritance.</p>
                            <code>class Animal {<br>&nbsp;&nbsp;constructor(name) { this.name = name; }<br>}</code>
                        </div>
                        <div class="sugar-card">
                            <h4>2. Template Literals</h4>
                            <p>String interpolation and multi-line strings with backticks.</p>
                            <code>const msg = \`Hello, \${userName}!\`;</code>
                        </div>
                        <div class="sugar-card">
                            <h4>3. Destructuring Assignment</h4>
                            <p>Unpack properties from objects and arrays into distinct variables.</p>
                            <code>const { title, price } = course;</code>
                        </div>
                        <div class="sugar-card">
                            <h4>4. Spread & Rest (<code>...</code>)</h4>
                            <p>Spread expands elements; Rest condenses multiple elements into an array.</p>
                            <code>const copy = [...arr1, ...arr2];</code>
                        </div>
                        <div class="sugar-card">
                            <h4>5. Optional Chaining (<code>?.</code>)</h4>
                            <p>Safely read nested properties without checking each reference.</p>
                            <code>const city = user?.address?.city;</code>
                        </div>
                        <div class="sugar-card">
                            <h4>6. Nullish Coalescing (<code>??</code>)</h4>
                            <p>Fallback only when value is <code>null</code> or <code>undefined</code> (unlike <code>||</code>).</p>
                            <code>const port = config.port ?? 3000;</code>
                        </div>
                    </div>
                `
            },
            {
                heading: "Async/Await: Syntactic Sugar for Promises",
                content: `
                    <p><code>async/await</code> allows asynchronous, promise-based code to be written and read sequentially, mimicking synchronous code without blocking the event loop.</p>
                `
            }
        ],
        codeSnippet: `// 1. Template Literals & Destructuring
const student = {
    id: 1042,
    firstName: "Maria",
    lastName: "Garcia",
    scores: [94, 88, 97],
    profile: {
        github: "mariadev"
    }
};

const { firstName, scores: [mathScore, englishScore], profile: { github } } = student;
console.log(\`Student \${firstName} scored \${mathScore} in Math. GitHub: @\${github}\`);

// 2. Spread & Rest Operators
const baseConfig = { theme: "dark", lang: "en" };
const userConfig = { ...baseConfig, notifications: true };
console.log("Merged Config:", userConfig);

const combineHobbies = (primary, ...others) => {
    console.log("Primary hobby:", primary);
    console.log("Other hobbies:", others);
};
combineHobbies("Coding", "Gaming", "Chess", "Reading");

// 3. Optional Chaining (?.) and Nullish Coalescing (??)
const company = {
    name: "TechCorp",
    departments: {
        dev: { headCount: 0 } // 0 is falsy, but valid count!
    }
};

console.log("HQ City:", company?.headquarters?.city ?? "Remote / Not set");
console.log("Dev Headcount with ?? :", company.departments.dev.headCount ?? 10); // 0
console.log("Dev Headcount with || :", company.departments.dev.headCount || 10); // 10 (Bug!)

// 4. ES6 Class Sugar
class Vehicle {
    constructor(make, model) {
        this.make = make;
        this.model = model;
    }
    getInfo() {
        return \`Vehicle: \${this.make} \${this.model}\`;
    }
}

const myCar = new Vehicle("Tesla", "Model 3");
console.log(myCar.getInfo());`,
        quiz: [
            {
                question: "What is the key difference between Nullish Coalescing (??) and Logical OR (||)?",
                options: [
                    "?? falls back only for null or undefined, while || falls back for any falsy value (0, '', false, NaN)",
                    "|| only works with numbers",
                    "?? is synchronous while || is asynchronous",
                    "There is no difference"
                ],
                answer: 0,
                explanation: "Logical OR (||) treats 0, '', and false as falsy and returns the fallback. Nullish Coalescing (??) only falls back when the left operand is null or undefined."
            },
            {
                question: "What does an ES6 'class' compile to under the hood in JavaScript?",
                options: [
                    "A C++ binary module",
                    "Prototypal constructor functions and Prototype inheritance",
                    "A Java bytecode structure",
                    "An immutable JSON schema"
                ],
                answer: 1,
                explanation: "ES6 classes are syntactic sugar over JavaScript's existing prototype-based inheritance model."
            },
            {
                question: "What will 'user?.address?.city' return if 'user.address' is undefined?",
                options: [
                    "Throws a TypeError: Cannot read properties of undefined",
                    "undefined (without throwing an error)",
                    "null",
                    "false"
                ],
                answer: 1,
                explanation: "Optional chaining (?.) short-circuits and returns undefined instead of throwing a TypeError when encountering null or undefined."
            }
        ]
    }
];

// Quick Reference Cheat Sheet data
const CHEAT_SHEET_DATA = [
    {
        topic: "var vs let vs const",
        points: [
            "<code>var</code>: Function scoped, can redeclare, hoisted with <code>undefined</code>.",
            "<code>let</code>: Block scoped <code>{}</code>, cannot redeclare, TDZ protection.",
            "<code>const</code>: Block scoped, cannot redeclare or reassign reference."
        ]
    },
    {
        topic: "7 Primitive Types",
        points: [
            "<code>Number</code>, <code>String</code>, <code>Boolean</code>, <code>Undefined</code>, <code>Null</code>, <code>BigInt</code>, <code>Symbol</code>",
            "Primitives are stored on the <strong>Stack</strong> and passed <strong>by value</strong>.",
            "Objects/Arrays are stored on the <strong>Heap</strong> and passed <strong>by reference</strong>."
        ]
    },
    {
        topic: "Scopes & Hoisting",
        points: [
            "<strong>Lexical Scope:</strong> Inner functions can access variables of parent scopes.",
            "<strong>Hoisting:</strong> Declarations are allocated memory during creation phase.",
            "Function declarations are hoisted completely; expressions follow variable rules."
        ]
    },
    {
        topic: "Arrow Functions & Sugar",
        points: [
            "Arrow functions inherit lexical <code>this</code> from enclosing context.",
            "No <code>arguments</code> object, cannot be used as constructors with <code>new</code>.",
            "Modern Sugar: <code>?.</code>, <code>??</code>, <code>...spread/rest</code>, Destructuring, Classes."
        ]
    }
];
