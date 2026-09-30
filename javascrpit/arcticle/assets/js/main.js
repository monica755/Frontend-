/**
 * IT Industry 2030 - Master Application Script
 * Orchestrates navigation, countdown timer, matrix switcher, pillar tabs, tech radar, and whitepaper modal
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header & Active Nav State
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll spy for navigation
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i') || mobileToggle;
      if (navMenu.classList.contains('open')) {
        mobileToggle.innerHTML = '&#10005;'; // X
      } else {
        mobileToggle.innerHTML = '&#9776;'; // Hamburger
      }
    });

    // Close on link click
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.innerHTML = '&#9776;';
      });
    });
  }

  // 2. Accurate 2030 Horizon Countdown Timer
  const targetDate = new Date('January 1, 2030 00:00:00 UTC').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      document.getElementById('cd-days').textContent = '000';
      document.getElementById('cd-hours').textContent = '00';
      document.getElementById('cd-mins').textContent = '00';
      document.getElementById('cd-secs').textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const elDays = document.getElementById('cd-days');
    const elHours = document.getElementById('cd-hours');
    const elMins = document.getElementById('cd-mins');
    const elSecs = document.getElementById('cd-secs');

    if (elDays) elDays.textContent = String(days).padStart(3, '0');
    if (elHours) elHours.textContent = String(hours).padStart(2, '0');
    if (elMins) elMins.textContent = String(minutes).padStart(2, '0');
    if (elSecs) elSecs.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // 3. Interactive 2025 vs 2030 Paradigm Shift Matrix Data
  const PARADIGM_DATA = {
    software: {
      category: "Software Engineering & Delivery",
      state2025: [
        { label: "Primary Workflow", val: "Human engineers writing syntax in IDEs, aided by autocompletion copilot LLMs." },
        { label: "Testing & QA", val: "Manual test suites, CI/CD pipelines running unit/integration tests taking 15-45 minutes." },
        { label: "Legacy Modernization", val: "Multi-year, high-risk human manual refactoring of legacy monoliths." },
        { label: "Deployment Frequency", val: "Daily or weekly scheduled container releases with staging review." }
      ],
      state2030: [
        { label: "Primary Workflow", val: "Human architects specifying high-level intent & constraints; autonomous agent swarms synthesize verified architectures." },
        { label: "Testing & QA", val: "Continuous formal mathematical verification and automated fuzzing executed in milliseconds." },
        { label: "Legacy Modernization", val: "Autonomous real-time transpilation and semantic refactoring (e.g. COBOL/Java into memory-safe Rust/Wasm)." },
        { label: "Deployment Frequency", val: "Continuous, millisecond-level micro-deployments with real-time autonomous rollbacks upon anomaly detection." }
      ]
    },
    cloud: {
      category: "Cloud, Compute & Infrastructure",
      state2025: [
        { label: "Compute Hardware", val: "General-purpose x86/ARM CPUs combined with expensive discrete Nvidia GPU clusters." },
        { label: "Data Center Energy", val: "Heavy strain on municipal electrical grids, water-evaporative cooling towers." },
        { label: "Infrastructure Mgmt", val: "Declarative Infrastructure-as-Code (Terraform, Helm charts, manual Kubernetes YAML)." },
        { label: "Latency & Edge", val: "Cloud centralized regions (15ms-80ms RTT); basic 5G edge deployments." }
      ],
      state2030: [
        { label: "Compute Hardware", val: "Heterogeneous Hybrid: QPUs (Quantum), Photonic light interconnects, and Neuromorphic edge chips." },
        { label: "Data Center Energy", val: "Directly powered by dedicated Small Modular Reactors (SMRs) & liquid submersion heat harvesting." },
        { label: "Infrastructure Mgmt", val: "Autonomous Self-Healing Meshes: Agentic operators provision and rebalance cross-cloud resources dynamically." },
        { label: "Latency & Edge", val: "Ubiquitous 6G sub-terahertz edge fabrics with sub-1ms deterministic response times." }
      ]
    },
    security: {
      category: "Cybersecurity & Cryptography",
      state2025: [
        { label: "Encryption Standard", val: "Vulnerable classical public-key cryptography (RSA-2048, ECC) susceptible to 'Harvest Now, Decrypt Later'." },
        { label: "Threat Detection", val: "SOC analysts triaging SIEM alerts; hours to days mean-time-to-detect (MTTD)." },
        { label: "Identity Verification", val: "Multi-factor SMS/TOTP codes, susceptible to SIM-swapping, session hijacking, and voice cloning." },
        { label: "Zero-Trust Architecture", val: "Software-defined access perimeter enforced at corporate gateway proxies." }
      ],
      state2030: [
        { label: "Encryption Standard", val: "Fully migrated to NIST Post-Quantum Cryptography (ML-KEM lattice algorithms) and Quantum Key Distribution (QKD)." },
        { label: "Threat Detection", val: "Autonomous AI-vs-AI Cyberwarfare: Defensive swarms patch vulnerabilities and neutralize exploits in microseconds." },
        { label: "Identity Verification", val: "Cryptographic biometric Zero-Knowledge Proofs (ZKP) with decentralized proof-of-personhood." },
        { label: "Zero-Trust Architecture", val: "Silicon-level cryptographic verification embedded in every chiplet and micro-edge node." }
      ]
    },
    hardware: {
      category: "Hardware, Physics & Silicon Scaling",
      state2025: [
        { label: "Moore's Law Status", val: "Slowing rapidly; 2nm-3nm silicon nodes facing severe quantum tunneling and thermal throttling." },
        { label: "Interconnects", val: "Copper traces between chips creating major electrical resistance and bandwidth bottlenecks." },
        { label: "Storage Paradigm", val: "NAND Flash and spinning magnetic platters facing density limits and 5-10 year shelf degradation." },
        { label: "Edge Inferencing", val: "High power-draw GPUs and NPUs limited by mobile battery life and thermals." }
      ],
      state2030: [
        { label: "Moore's Law Status", val: "Overcome via 3D multi-die chiplet stacking, carbon nanotubes, and optical compute co-processors." },
        { label: "Interconnects", val: "Silicon photonics (laser-based light waveguides) routing terabits per second with zero copper heat." },
        { label: "Storage Paradigm", val: "Synthetic DNA & atomic bio-molecular storage capable of retaining 1 Exabyte per cubic millimeter for 10,000 years." },
        { label: "Edge Inferencing", val: "Spiking Neuromorphic event-driven processors consuming 1/1000th the power of legacy GPUs." }
      ]
    },
    workforce: {
      category: "IT Workforce, Skills & Organization",
      state2025: [
        { label: "Core Competency", val: "Coding syntax proficiency (Java, Python, TypeScript), framework mastery (React, Spring)." },
        { label: "Junior Dev Role", val: "Writing basic boilerplate functions, unit tests, fixing basic UI bugs, reviewing PRs." },
        { label: "Org Structure", val: "Traditional agile squads with Product Managers, Scrum Masters, QA, Backend, Frontend devs." },
        { label: "Productivity Metric", val: "Lines of code, PR velocity, story points completed per 2-week sprint cycle." }
      ],
      state2030: [
        { label: "Core Competency", val: "Multi-Agent System Architecture, Post-Quantum Security, Algorithmic Ethics, Quantum-Classical APIs." },
        { label: "Junior Dev Role", val: "Transformed into AI Prompt/Behavior Curators and Automated Verification Evaluators." },
        { label: "Org Structure", val: "Hyper-lean cognitive pods: 2-3 human architects guiding dozens of autonomous specialized agent swarms." },
        { label: "Productivity Metric", val: "System resilience, business capability delivery speed, algorithmic verification guarantees." }
      ]
    }
  };

  const matrixButtons = document.querySelectorAll('.matrix-btn');
  const col2025List = document.getElementById('matrix-2025-list');
  const col2030List = document.getElementById('matrix-2030-list');

  function renderMatrix(domainKey) {
    const data = PARADIGM_DATA[domainKey];
    if (!data) return;

    if (col2025List) {
      col2025List.innerHTML = data.state2025.map(item => `
        <li class="matrix-detail-item">
          <span class="detail-label">${item.label}</span>
          <span class="detail-val">${item.val}</span>
        </li>
      `).join('');
    }

    if (col2030List) {
      col2030List.innerHTML = data.state2030.map(item => `
        <li class="matrix-detail-item">
          <span class="detail-label">${item.label}</span>
          <span class="detail-val">${item.val}</span>
        </li>
      `).join('');
    }
  }

  matrixButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      matrixButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const domain = btn.getAttribute('data-domain');
      renderMatrix(domain);
    });
  });

  // Initialize Matrix with first tab
  renderMatrix('software');

  // 4. Pillars of 2030 Tab Switching
  const pillarTabs = document.querySelectorAll('.pillar-tab-btn');
  const pillarPanels = document.querySelectorAll('.pillar-panel');

  pillarTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-target');

      pillarTabs.forEach(t => t.classList.remove('active'));
      pillarPanels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // 5. Tech Radar Filter Buttons
  const radarFilterBtns = document.querySelectorAll('.radar-filter-btn');
  const radarChips = document.querySelectorAll('.radar-chip');

  radarFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      radarFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      radarChips.forEach(chip => {
        const category = chip.getAttribute('data-cat');
        if (filter === 'all' || category === filter) {
          chip.style.display = 'block';
        } else {
          chip.style.display = 'none';
        }
      });
    });
  });

  // 6. Executive Blueprint Modal
  const modalBackdrop = document.getElementById('blueprint-modal');
  const openModalBtns = document.querySelectorAll('.open-blueprint-btn');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalForm = document.getElementById('blueprint-form');
  const modalSuccess = document.getElementById('blueprint-success');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modalBackdrop) modalBackdrop.classList.add('open');
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      if (modalBackdrop) modalBackdrop.classList.remove('open');
    });
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove('open');
      }
    });
  }

  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      modalForm.style.display = 'none';
      if (modalSuccess) modalSuccess.style.display = 'block';
    });
  }
});
