/**
 * IT 2030: Extinction or Evolution?
 * Interactive Features & Logic Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initBackToTop();
  initRolesFilter();
  initQuiz();
  initMatrixInteractions();
});

/* ==========================================================================
   1. Dark / Light Theme Toggler
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or default to dark
  const savedTheme = localStorage.getItem('it2030_theme') || 'dark';
  setTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-bs-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  function setTheme(theme) {
    htmlRoot.setAttribute('data-bs-theme', theme);
    localStorage.setItem('it2030_theme', theme);

    if (themeIcon) {
      if (theme === 'dark') {
        themeIcon.className = 'bi bi-sun-fill text-warning';
      } else {
        themeIcon.className = 'bi bi-moon-stars-fill text-primary';
      }
    }
  }
}

/* ==========================================================================
   2. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('btnBackToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.style.display = 'block';
    } else {
      btn.style.display = 'none';
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   3. Roles Filter & Live Search
   ========================================================================== */
function initRolesFilter() {
  const filterButtons = document.querySelectorAll('.role-filter-btn');
  const roleCards = document.querySelectorAll('.role-card-item');
  const searchInput = document.getElementById('roleSearchInput');

  let activeCategory = 'all';
  let searchTerm = '';

  function applyFilters() {
    roleCards.forEach(card => {
      const category = card.getAttribute('data-category');
      const roleText = card.textContent.toLowerCase();

      const matchesCategory = (activeCategory === 'all' || category === activeCategory);
      const matchesSearch = roleText.includes(searchTerm);

      if (matchesCategory && matchesSearch) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-filter');
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.toLowerCase().trim();
      applyFilters();
    });
  }
}

/* ==========================================================================
   4. Interactive 2030 Career Readiness Quiz
   ========================================================================== */
function initQuiz() {
  const quizForm = document.getElementById('quizForm');
  const quizResult = document.getElementById('quizResult');
  const resetQuizBtn = document.getElementById('resetQuizBtn');

  if (!quizForm) return;

  // Track selection styling
  const optionLabels = quizForm.querySelectorAll('.quiz-option');
  optionLabels.forEach(label => {
    const radio = label.querySelector('input[type="radio"]');
    if (!radio) return;

    label.addEventListener('click', () => {
      const groupName = radio.name;
      const groupLabels = quizForm.querySelectorAll(`input[name="${groupName}"]`);
      groupLabels.forEach(rb => {
        rb.closest('.quiz-option').classList.remove('selected');
      });
      label.classList.add('selected');
      radio.checked = true;
    });
  });

  quizForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Check all questions answered
    const q1 = quizForm.querySelector('input[name="q1"]:checked');
    const q2 = quizForm.querySelector('input[name="q2"]:checked');
    const q3 = quizForm.querySelector('input[name="q3"]:checked');
    const q4 = quizForm.querySelector('input[name="q4"]:checked');

    if (!q1 || !q2 || !q3 || !q4) {
      alert('Please answer all 4 questions to evaluate your 2030 Readiness score!');
      return;
    }

    const totalScore = parseInt(q1.value, 10) + parseInt(q2.value, 10) + parseInt(q3.value, 10) + parseInt(q4.value, 10);
    displayQuizResult(totalScore);
  });

  if (resetQuizBtn) {
    resetQuizBtn.addEventListener('click', () => {
      quizForm.reset();
      optionLabels.forEach(l => l.classList.remove('selected'));
      quizResult.style.display = 'none';
      quizForm.style.display = 'block';
      quizForm.scrollIntoView({ behavior: 'smooth' });
    });
  }

  function displayQuizResult(score) {
    quizForm.style.display = 'none';
    quizResult.style.display = 'block';

    const resultBadge = document.getElementById('resultBadge');
    const resultTitle = document.getElementById('resultTitle');
    const resultScore = document.getElementById('resultScore');
    const resultDescription = document.getElementById('resultDescription');
    const resultRecommendations = document.getElementById('resultRecommendations');

    resultScore.textContent = `${score} / 12 Points`;

    if (score <= 5) {
      resultBadge.className = 'badge badge-sunset fs-6 px-3 py-2 mb-3';
      resultBadge.innerHTML = '<i class="bi bi-exclamation-triangle-fill me-1"></i> High Vulnerability Risk';
      resultTitle.textContent = "Syntax-Bound: Urgent Modernization Required";
      resultDescription.textContent = "Your current workflow relies heavily on manual coding, syntax memorization, and routine task execution. By 2030, these areas will be almost completely automated by AI agents.";
      resultRecommendations.innerHTML = `
        <li class="mb-2"><i class="bi bi-arrow-right-circle text-danger me-2"></i><strong>Shift focus from syntax to system design:</strong> Practice mapping how APIs, databases, and microservices talk to one another.</li>
        <li class="mb-2"><i class="bi bi-arrow-right-circle text-danger me-2"></i><strong>Adopt AI coding partners immediately:</strong> Stop writing boilerplate code by hand; learn prompt-to-code iteration.</li>
        <li><i class="bi bi-arrow-right-circle text-danger me-2"></i><strong>Develop business domain expertise:</strong> Software value comes from solving real industry problems (Fintech, Health, Logistics).</li>
      `;
    } else if (score <= 9) {
      resultBadge.className = 'badge badge-transformed fs-6 px-3 py-2 mb-3';
      resultBadge.innerHTML = '<i class="bi bi-lightning-charge-fill me-1"></i> In Transition: Strong Foundation';
      resultTitle.textContent = "Evolving Practitioner: Heading in the Right Direction";
      resultDescription.textContent = "You understand the changing paradigm and already use modern tools, but you can upgrade from 'co-pilot user' to 'autonomous system orchestrator'.";
      resultRecommendations.innerHTML = `
        <li class="mb-2"><i class="bi bi-arrow-right-circle text-warning me-2"></i><strong>Master AI Agent Workflows:</strong> Go beyond auto-complete; learn how multi-agent frameworks write, test, and deploy software.</li>
        <li class="mb-2"><i class="bi bi-arrow-right-circle text-warning me-2"></i><strong>Deepen Cybersecurity & Verification:</strong> As AI writes more code, human verification and security audits will command premium salaries.</li>
        <li><i class="bi bi-arrow-right-circle text-warning me-2"></i><strong>Build end-to-end product thinking:</strong> Learn user experience, metrics, and business economics.</li>
      `;
    } else {
      resultBadge.className = 'badge badge-sunrise fs-6 px-3 py-2 mb-3';
      resultBadge.innerHTML = '<i class="bi bi-award-fill me-1"></i> 2030 Ready: Tech Pioneer';
      resultTitle.textContent = "Cognitive Architect: Built for the Next Era";
      resultDescription.textContent = "Outstanding! You view technology not as lines of code, but as high-leverage problem solving. In 2030, you won't be replaced by AI—you will be running the systems that direct it.";
      resultRecommendations.innerHTML = `
        <li class="mb-2"><i class="bi bi-arrow-right-circle text-success me-2"></i><strong>Position as a 1-Person Solution Powerhouse:</strong> Leverage AI agents to ship complex products with minimal overhead.</li>
        <li class="mb-2"><i class="bi bi-arrow-right-circle text-success me-2"></i><strong>Explore edge compute, neuromorphic AI, or quantum concepts:</strong> Move to where computational boundaries are expanding.</li>
        <li><i class="bi bi-arrow-right-circle text-success me-2"></i><strong>Lead technical strategy:</strong> Mentor teams transitioning from legacy codebases to AI-orchestrated platforms.</li>
      `;
    }

    quizResult.scrollIntoView({ behavior: 'smooth' });
  }
}

/* ==========================================================================
   5. Interactive Matrix Tab Helper
   ========================================================================== */
function initMatrixInteractions() {
  // Enhances tab interaction with subtle animations
  const triggerTabList = document.querySelectorAll('#matrixTabs button');
  triggerTabList.forEach(triggerEl => {
    triggerEl.addEventListener('shown.bs.tab', event => {
      const targetPaneId = event.target.getAttribute('data-bs-target');
      const targetPane = document.querySelector(targetPaneId);
      if (targetPane) {
        targetPane.classList.add('animate-fadeIn');
      }
    });
  });
}
