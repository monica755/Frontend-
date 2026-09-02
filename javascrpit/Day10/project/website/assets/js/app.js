/**
 * JavaScript Learning Portal - Main Application Controller
 * Handles routing, UI state, progress tracking, search, quizzes, and themes.
 */

class App {
    constructor() {
        this.currentTopicId = "intro-js";
        this.completedTopics = new Set(JSON.parse(localStorage.getItem("js_portal_progress") || "[]"));
        this.currentQuizAnswers = {};
        this.searchQuery = "";

        this.init();
    }

    init() {
        this.initTheme();
        this.renderSidebar();
        this.renderCheatSheet();
        this.bindEvents();
        this.handleRouting();
        this.updateProgressUI();
    }

    /**
     * Theme Initialization & Toggle
     */
    initTheme() {
        const savedTheme = localStorage.getItem("js_portal_theme") || "dark";
        document.documentElement.setAttribute("data-theme", savedTheme);
        this.updateThemeIcon(savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("js_portal_theme", newTheme);
        this.updateThemeIcon(newTheme);
        this.showToast(`Switched to ${newTheme} mode`, "info");
    }

    updateThemeIcon(theme) {
        const icon = document.querySelector("#theme-toggle i");
        if (icon) {
            icon.className = theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
        }
    }

    /**
     * Render Navigation Sidebar with topic list
     */
    renderSidebar() {
        const navList = document.getElementById("sidebar-nav-list");
        if (!navList) return;

        let html = "";
        JS_TOPICS.forEach((topic, index) => {
            const isCompleted = this.completedTopics.has(topic.id);
            const isActive = topic.id === this.currentTopicId;

            html += `
                <li class="nav-item">
                    <a href="#${topic.id}" class="nav-link ${isActive ? 'active' : ''}" data-id="${topic.id}">
                        <div class="nav-icon-box">
                            <i class="fa-solid ${topic.icon}"></i>
                        </div>
                        <div class="nav-text">
                            <span class="nav-title">${topic.shortTitle}</span>
                            <span class="nav-badge badge-${topic.difficulty.toLowerCase()}">${topic.difficulty}</span>
                        </div>
                        <div class="nav-status">
                            <i class="fa-solid fa-circle-check check-icon ${isCompleted ? 'completed' : ''}"></i>
                        </div>
                    </a>
                </li>
            `;
        });

        navList.innerHTML = html;

        // Attach click handlers to nav links
        navList.querySelectorAll(".nav-link").forEach(link => {
            link.addEventListener("click", (e) => {
                const topicId = link.dataset.id;
                this.loadTopic(topicId);
                // Close mobile drawer if open
                document.body.classList.remove("sidebar-open");
            });
        });
    }

    /**
     * Handle Hash-based routing
     */
    handleRouting() {
        window.addEventListener("hashchange", () => {
            const hash = window.location.hash.replace("#", "");
            if (hash && JS_TOPICS.some(t => t.id === hash)) {
                this.loadTopic(hash);
            }
        });

        const initialHash = window.location.hash.replace("#", "");
        if (initialHash && JS_TOPICS.some(t => t.id === initialHash)) {
            this.loadTopic(initialHash);
        } else {
            this.loadTopic("intro-js");
        }
    }

    /**
     * Load and render specific Topic Content
     */
    loadTopic(topicId) {
        const topic = JS_TOPICS.find(t => t.id === topicId);
        if (!topic) return;

        this.currentTopicId = topicId;
        this.currentQuizAnswers = {};

        // Update active nav link
        document.querySelectorAll(".nav-link").forEach(l => {
            l.classList.toggle("active", l.dataset.id === topicId);
        });

        // Update Header & Breadcrumb
        document.getElementById("breadcrumb-topic").textContent = topic.title;
        document.getElementById("topic-hero-title").textContent = topic.title;
        document.getElementById("topic-hero-summary").textContent = topic.summary;
        document.getElementById("topic-hero-category").textContent = topic.category;
        document.getElementById("topic-hero-difficulty").textContent = topic.difficulty;
        document.getElementById("topic-hero-time").innerHTML = `<i class="fa-regular fa-clock"></i> ${topic.readTime}`;

        // Render Sections Content
        const sectionsContainer = document.getElementById("topic-sections");
        if (sectionsContainer) {
            sectionsContainer.innerHTML = topic.sections.map(sec => `
                <section class="lesson-section">
                    <h3 class="section-heading">${sec.heading}</h3>
                    <div class="section-body">${sec.content}</div>
                </section>
            `).join("");
        }

        // Render Visualizer for this topic
        const visualizerContainer = document.getElementById("visualizer-container");
        if (window.Visualizers && visualizerContainer) {
            window.Visualizers.render(topicId, visualizerContainer);
        }

        // Setup Playground with code snippet
        const codeEditor = document.getElementById("code-editor");
        const consoleOutput = document.getElementById("console-output");
        if (codeEditor) {
            codeEditor.value = topic.codeSnippet;
            // Auto run once
            if (window.codeRunner && consoleOutput) {
                window.codeRunner.run(topic.codeSnippet, consoleOutput);
            }
        }

        // Render Quiz
        this.renderQuiz(topic);

        // Update Topic Navigation (Prev / Next)
        this.updateTopicNavigation(topicId);

        // Update Completed Checkbox state
        const completeBtn = document.getElementById("btn-toggle-complete");
        if (completeBtn) {
            const isDone = this.completedTopics.has(topicId);
            completeBtn.innerHTML = isDone 
                ? `<i class="fa-solid fa-circle-check"></i> Completed` 
                : `<i class="fa-regular fa-circle-check"></i> Mark as Completed`;
            completeBtn.classList.toggle("btn-success", isDone);
            completeBtn.classList.toggle("btn-outline", !isDone);
        }

        // Scroll to top of content
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    /**
     * Render Quiz for current topic
     */
    renderQuiz(topic) {
        const quizContainer = document.getElementById("quiz-container");
        const quizResults = document.getElementById("quiz-results");
        if (!quizContainer) return;

        if (quizResults) quizResults.innerHTML = "";

        let quizHtml = "";
        topic.quiz.forEach((q, qIndex) => {
            quizHtml += `
                <div class="quiz-card" data-qindex="${qIndex}">
                    <div class="quiz-q-header">
                        <span class="quiz-q-num">Q${qIndex + 1}</span>
                        <h4 class="quiz-question">${q.question}</h4>
                    </div>
                    <div class="quiz-options">
                        ${q.options.map((opt, optIndex) => `
                            <label class="quiz-option-label" data-opt="${optIndex}">
                                <input type="radio" name="quiz_q_${qIndex}" value="${optIndex}">
                                <span class="option-custom-radio"></span>
                                <span class="option-text">${opt}</span>
                            </label>
                        `).join("")}
                    </div>
                    <div class="quiz-feedback" id="feedback_${qIndex}"></div>
                </div>
            `;
        });

        quizContainer.innerHTML = quizHtml;

        // Listen to radio changes
        quizContainer.querySelectorAll("input[type='radio']").forEach(radio => {
            radio.addEventListener("change", (e) => {
                const qIndex = e.target.name.replace("quiz_q_", "");
                this.currentQuizAnswers[qIndex] = parseInt(e.target.value, 10);
            });
        });
    }

    /**
     * Submit Quiz and display results with explanations
     */
    submitQuiz() {
        const topic = JS_TOPICS.find(t => t.id === this.currentTopicId);
        if (!topic) return;

        let score = 0;
        const total = topic.quiz.length;

        topic.quiz.forEach((q, qIndex) => {
            const selected = this.currentQuizAnswers[qIndex];
            const feedbackEl = document.getElementById(`feedback_${qIndex}`);
            const cardEl = document.querySelector(`.quiz-card[data-qindex="${qIndex}"]`);

            cardEl.querySelectorAll(".quiz-option-label").forEach(l => {
                l.classList.remove("opt-correct", "opt-wrong");
            });

            if (selected === undefined) {
                feedbackEl.innerHTML = `<div class="feedback-msg feedback-unanswered"><i class="fa-solid fa-circle-exclamation"></i> Please select an answer.</div>`;
                return;
            }

            const correctOptionEl = cardEl.querySelector(`.quiz-option-label[data-opt="${q.answer}"]`);
            const selectedOptionEl = cardEl.querySelector(`.quiz-option-label[data-opt="${selected}"]`);

            if (selected === q.answer) {
                score++;
                if (selectedOptionEl) selectedOptionEl.classList.add("opt-correct");
                feedbackEl.innerHTML = `
                    <div class="feedback-msg feedback-correct">
                        <i class="fa-solid fa-circle-check"></i> Correct!
                        <p class="feedback-expl">${q.explanation}</p>
                    </div>
                `;
            } else {
                if (selectedOptionEl) selectedOptionEl.classList.add("opt-wrong");
                if (correctOptionEl) correctOptionEl.classList.add("opt-correct");
                feedbackEl.innerHTML = `
                    <div class="feedback-msg feedback-wrong">
                        <i class="fa-solid fa-circle-xmark"></i> Incorrect.
                        <p class="feedback-expl"><strong>Explanation:</strong> ${q.explanation}</p>
                    </div>
                `;
            }
        });

        const quizResults = document.getElementById("quiz-results");
        if (quizResults) {
            const isPerfect = score === total;
            quizResults.innerHTML = `
                <div class="quiz-score-banner ${isPerfect ? 'score-perfect' : ''}">
                    <div class="score-number">${score} / ${total}</div>
                    <div class="score-text">
                        <h5>${isPerfect ? '🎉 Outstanding! Perfect Score!' : score > 0 ? '👍 Good Effort!' : '💡 Keep Practicing!'}</h5>
                        <p>${isPerfect ? 'You have mastered this concept!' : 'Review the explanations above and try again.'}</p>
                    </div>
                </div>
            `;

            if (isPerfect) {
                this.markTopicComplete(this.currentTopicId, true);
            }
        }
    }

    /**
     * Toggle Topic Complete
     */
    toggleCurrentTopicComplete() {
        const isDone = this.completedTopics.has(this.currentTopicId);
        this.markTopicComplete(this.currentTopicId, !isDone);
    }

    markTopicComplete(topicId, status) {
        if (status) {
            this.completedTopics.add(topicId);
            this.showToast("Topic marked as completed! 🎯", "success");
        } else {
            this.completedTopics.delete(topicId);
            this.showToast("Topic unmarked", "info");
        }

        localStorage.setItem("js_portal_progress", JSON.stringify([...this.completedTopics]));
        this.updateProgressUI();
        this.renderSidebar();

        const completeBtn = document.getElementById("btn-toggle-complete");
        if (completeBtn) {
            completeBtn.innerHTML = status 
                ? `<i class="fa-solid fa-circle-check"></i> Completed` 
                : `<i class="fa-regular fa-circle-check"></i> Mark as Completed`;
            completeBtn.classList.toggle("btn-success", status);
            completeBtn.classList.toggle("btn-outline", !status);
        }
    }

    /**
     * Update Progress Percentage & Badges
     */
    updateProgressUI() {
        const total = JS_TOPICS.length;
        const completedCount = this.completedTopics.size;
        const percentage = Math.round((completedCount / total) * 100);

        const progressBar = document.getElementById("global-progress-bar");
        const progressText = document.getElementById("progress-percent-text");
        const progressCount = document.getElementById("progress-count-text");

        if (progressBar) progressBar.style.width = `${percentage}%`;
        if (progressText) progressText.textContent = `${percentage}%`;
        if (progressCount) progressCount.textContent = `${completedCount} of ${total} topics`;
    }

    /**
     * Next / Prev Navigation
     */
    updateTopicNavigation(currentId) {
        const currentIndex = JS_TOPICS.findIndex(t => t.id === currentId);
        const prevBtn = document.getElementById("btn-prev-topic");
        const nextBtn = document.getElementById("btn-next-topic");

        if (prevBtn) {
            if (currentIndex > 0) {
                const prevTopic = JS_TOPICS[currentIndex - 1];
                prevBtn.style.display = "inline-flex";
                prevBtn.innerHTML = `<i class="fa-solid fa-arrow-left"></i> Previous: ${prevTopic.shortTitle}`;
                prevBtn.onclick = () => { window.location.hash = prevTopic.id; };
            } else {
                prevBtn.style.display = "none";
            }
        }

        if (nextBtn) {
            if (currentIndex < JS_TOPICS.length - 1) {
                const nextTopic = JS_TOPICS[currentIndex + 1];
                nextBtn.style.display = "inline-flex";
                nextBtn.innerHTML = `Next: ${nextTopic.shortTitle} <i class="fa-solid fa-arrow-right"></i>`;
                nextBtn.onclick = () => { window.location.hash = nextTopic.id; };
            } else {
                nextBtn.style.display = "none";
            }
        }
    }

    /**
     * Search & Filter Handler
     */
    handleSearch(query) {
        const searchResultsModal = document.getElementById("search-results-dropdown");
        if (!searchResultsModal) return;

        const cleanQuery = query.trim().toLowerCase();
        if (!cleanQuery) {
            searchResultsModal.classList.remove("open");
            return;
        }

        const matches = JS_TOPICS.filter(t => {
            return t.title.toLowerCase().includes(cleanQuery) ||
                   t.summary.toLowerCase().includes(cleanQuery) ||
                   t.category.toLowerCase().includes(cleanQuery) ||
                   t.sections.some(s => s.heading.toLowerCase().includes(cleanQuery) || s.content.toLowerCase().includes(cleanQuery));
        });

        if (matches.length === 0) {
            searchResultsModal.innerHTML = `<div class="search-empty">No topics found matching "${this.escapeHtml(query)}"</div>`;
        } else {
            searchResultsModal.innerHTML = matches.map(t => `
                <a href="#${t.id}" class="search-result-item" data-id="${t.id}">
                    <div class="search-result-icon"><i class="fa-solid ${t.icon}"></i></div>
                    <div class="search-result-info">
                        <div class="search-result-title">${t.title}</div>
                        <div class="search-result-desc">${t.summary.slice(0, 80)}...</div>
                    </div>
                    <span class="badge badge-sm badge-info">${t.difficulty}</span>
                </a>
            `).join("");

            searchResultsModal.querySelectorAll(".search-result-item").forEach(item => {
                item.addEventListener("click", () => {
                    searchResultsModal.classList.remove("open");
                    const input = document.getElementById("global-search-input");
                    if (input) input.value = "";
                });
            });
        }

        searchResultsModal.classList.add("open");
    }

    /**
     * Render Cheat Sheet Modal / Drawer
     */
    renderCheatSheet() {
        const container = document.getElementById("cheatsheet-content");
        if (!container || !CHEAT_SHEET_DATA) return;

        container.innerHTML = CHEAT_SHEET_DATA.map(item => `
            <div class="cheatsheet-card">
                <h4>${item.topic}</h4>
                <ul>
                    ${item.points.map(p => `<li>${p}</li>`).join("")}
                </ul>
            </div>
        `).join("");
    }

    /**
     * Toast Notifications
     */
    showToast(message, type = "info") {
        const toast = document.getElementById("app-toast");
        if (!toast) return;

        const icon = type === "success" ? "fa-circle-check" : type === "error" ? "fa-circle-xmark" : "fa-circle-info";
        toast.className = `toast-popup toast-${type} show`;
        toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;

        setTimeout(() => {
            toast.classList.remove("show");
        }, 2800);
    }

    escapeHtml(str) {
        return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    /**
     * Event Listeners Binding
     */
    bindEvents() {
        // Theme switcher
        document.getElementById("theme-toggle")?.addEventListener("click", () => this.toggleTheme());

        // Mobile sidebar toggle
        document.getElementById("mobile-menu-btn")?.addEventListener("click", () => {
            document.body.classList.toggle("sidebar-open");
        });

        document.getElementById("sidebar-overlay")?.addEventListener("click", () => {
            document.body.classList.remove("sidebar-open");
        });

        // Search input
        const searchInput = document.getElementById("global-search-input");
        if (searchInput) {
            searchInput.addEventListener("input", (e) => this.handleSearch(e.target.value));
            document.addEventListener("click", (e) => {
                if (!searchInput.contains(e.target) && !document.getElementById("search-results-dropdown")?.contains(e.target)) {
                    document.getElementById("search-results-dropdown")?.classList.remove("open");
                }
            });
        }

        // Code Runner Actions
        const runBtn = document.getElementById("btn-run-code");
        const resetBtn = document.getElementById("btn-reset-code");
        const clearBtn = document.getElementById("btn-clear-console");
        const copyCodeBtn = document.getElementById("btn-copy-code");
        const codeEditor = document.getElementById("code-editor");
        const consoleOutput = document.getElementById("console-output");

        const executeCurrentCode = () => {
            if (window.codeRunner && codeEditor && consoleOutput) {
                window.codeRunner.run(codeEditor.value, consoleOutput);
            }
        };

        runBtn?.addEventListener("click", executeCurrentCode);

        // Shortcut: Ctrl+Enter or Cmd+Enter to run code, Tab for indent
        codeEditor?.addEventListener("keydown", (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                e.preventDefault();
                executeCurrentCode();
                this.showToast("Executing code... ⚡", "info");
            } else if (e.key === "Tab") {
                e.preventDefault();
                const start = codeEditor.selectionStart;
                const end = codeEditor.selectionEnd;
                codeEditor.value = codeEditor.value.substring(0, start) + "    " + codeEditor.value.substring(end);
                codeEditor.selectionStart = codeEditor.selectionEnd = start + 4;
            }
        });

        resetBtn?.addEventListener("click", () => {
            const topic = JS_TOPICS.find(t => t.id === this.currentTopicId);
            if (topic && codeEditor) {
                codeEditor.value = topic.codeSnippet;
                if (window.codeRunner && consoleOutput) {
                    window.codeRunner.run(topic.codeSnippet, consoleOutput);
                }
                this.showToast("Code reset to original snippet", "info");
            }
        });

        clearBtn?.addEventListener("click", () => {
            if (consoleOutput) {
                consoleOutput.innerHTML = `<div class="console-row empty-row"><em>Console cleared.</em></div>`;
            }
        });

        copyCodeBtn?.addEventListener("click", () => {
            if (codeEditor) {
                navigator.clipboard.writeText(codeEditor.value).then(() => {
                    this.showToast("Code copied to clipboard! 📋", "success");
                });
            }
        });

        // Quiz Submit Button
        document.getElementById("btn-submit-quiz")?.addEventListener("click", () => this.submitQuiz());

        // Mark as complete button
        document.getElementById("btn-toggle-complete")?.addEventListener("click", () => this.toggleCurrentTopicComplete());

        // Cheat Sheet Modal Toggle
        const cheatSheetModal = document.getElementById("cheatsheet-modal");
        document.getElementById("btn-open-cheatsheet")?.addEventListener("click", () => {
            cheatSheetModal?.classList.add("open");
        });
        document.getElementById("btn-close-cheatsheet")?.addEventListener("click", () => {
            cheatSheetModal?.classList.remove("open");
        });
        cheatSheetModal?.addEventListener("click", (e) => {
            if (e.target === cheatSheetModal) cheatSheetModal.classList.remove("open");
        });
    }
}

// Instantiate on DOM load
document.addEventListener("DOMContentLoaded", () => {
    window.app = new App();
});
