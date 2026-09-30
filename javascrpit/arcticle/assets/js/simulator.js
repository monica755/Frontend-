/**
 * IT Industry 2030 - Interactive Simulators & Career Diagnostic Engine
 */

// 1. Role Transformation Database
const ROLE_PROFILES = {
  software_engineer: {
    title_2030: "Cognitive Systems & Agent Swarm Architect",
    risk_level: "Medium (42% Syntax Task Obsolescence)",
    risk_class: "risk-med",
    demand: "Extremely High (Tier 1 Priority)",
    salary_delta: "+55% to +85% for Multi-Agent Orchestrators",
    skills: [
      "Multi-Agent Swarm Orchestration & Deterministic Verification",
      "Quantum-Classical API Integration (Qiskit / Cirq SDKs)",
      "Photonic & Neuromorphic Execution Optimization",
      "Model Behavioral Alignment & Cognitive Boundary Policies"
    ],
    narrative: "In 2030, you won't write CRUD boilerplate or debugging tests by hand. You direct specialized AI agent clusters that generate, formally verify, stress-test, and deploy self-healing microservices in sub-second cycles. Your core value lies in system architecture, algorithmic ethics, and quantum co-processing pipelines."
  },
  devops_sre: {
    title_2030: "Autonomous Swarm Reliability & Edge Orchestrator (ASRE)",
    risk_level: "Low-Medium (30% Scripting Obsolescence)",
    risk_class: "risk-low",
    demand: "Hyper-Critical (Core Infrastructure Spine)",
    salary_delta: "+65% to +110% for Self-Healing Mesh Experts",
    skills: [
      "Autonomous Infrastructure-as-Agent (IaA) & Self-Healing Meshes",
      "Hyperscale SMR & Clean-Energy Workload Dispatching",
      "6G Ultra-Low Latency Edge Distributed Fabric",
      "Chaos Agent Engineering & Zero-Day Self-Remediation"
    ],
    narrative: "Legacy Kubernetes manifests and static Terraform scripts are relics. In 2030, infrastructure self-assembles and autonomously negotiates compute with nuclear-powered and orbital datacenters. You oversee autonomous reliability swarms that isolate kernel exploits and hardware degradation before packets are dropped."
  },
  cybersecurity: {
    title_2030: "Post-Quantum Defense & Autonomous Counter-Intelligence Director",
    risk_level: "Extremely Low (12% Vulnerability Risk)",
    risk_class: "risk-low",
    demand: "Uncapped Global Scarcity (Top Enterprise Need)",
    salary_delta: "+90% to +140% for PQC & Cognitive Defense Architects",
    skills: [
      "Post-Quantum Cryptography (NIST ML-KEM / ML-DSA Algorithms)",
      "Autonomous Microsecond Threat Neutralization Swarms",
      "Biometric Zero-Knowledge Proofs & Synthetic Identity Verification",
      "Hardware-Level Silicon Trust & Neuromorphic Threat Detection"
    ],
    narrative: "In 2030, human security analysts cannot react fast enough to AI-orchestrated cyber intrusions occurring at gigabit speeds. You control autonomous defensive intelligence networks while steering enterprise migration into lattice-based quantum-immune cryptosystems."
  },
  data_ai: {
    title_2030: "Synthetic Knowledge Graph & Cognitive Model Curator",
    risk_level: "Medium (48% Data Wrangling Automated)",
    risk_class: "risk-med",
    demand: "Sustained Very High",
    salary_delta: "+60% to +95% for Synthetic Data Scientists",
    skills: [
      "Synthetic Data Generation & Mathematical Validation Protocols",
      "Federated Confidential Learning Across 6G Edge Nodes",
      "Neuro-Symbolic Reasoning & Deterministic Knowledge Graphs",
      "Bio-Molecular & DNA Cold Storage Indexing"
    ],
    narrative: "Manual data cleaning and basic exploratory analysis are 100% automated. By 2030, raw public web data is exhausted; you design high-fidelity synthetic universes for model training and deploy privacy-preserving federated models across millions of edge devices."
  },
  cloud_architect: {
    title_2030: "Quantum-Photonic Hybrid Mesh Chief Architect",
    risk_level: "Low (18% Architecture Shift)",
    risk_class: "risk-low",
    demand: "Strategic Executive Priority",
    salary_delta: "+75% to +120% for Hybrid Quantum Cloud Directors",
    skills: [
      "Hybrid Quantum-Classical QPU Partitioning Strategy",
      "Photonic Bus Interconnect Network Topology",
      "Global Carbon & SMR Energy-Aware Grid Scheduling",
      "Sovereign Multi-Jurisdiction Cryptographic Data Fabrics"
    ],
    narrative: "Your architecture encompasses classical GPU clusters, on-demand QPUs, and ultra-efficient neuromorphic co-processors. You optimize workloads not just for cost and latency, but for real-time megawatts consumed from local small modular nuclear reactors."
  },
  product_manager: {
    title_2030: "Cognitive Experience & Human-AI Interaction Director",
    risk_level: "Medium (35% Feature Specification Automated)",
    risk_class: "risk-med",
    demand: "High for Visionary Integrators",
    salary_delta: "+45% to +70% for Spatial & Ambient UX Leaders",
    skills: [
      "Spatial & Ambient Computing UX Design (AR/BCI Interaction)",
      "Autonomous Agent Value Alignment & Governance",
      "Intent-Based Natural Language Interface Architecture",
      "Real-Time Contextual Computing Product Strategy"
    ],
    narrative: "Click-and-type GUIs are secondary. In 2030, products are ambient, spatial, and voice/intent-driven. You define how autonomous agent swarms act on behalf of users, crafting seamless experiences between wearable AR glasses, physical robotics, and cloud intelligences."
  }
};

// Initialize Career Diagnostic Listener
document.addEventListener('DOMContentLoaded', () => {
  const roleSelect = document.getElementById('sim-role');
  const expSlider = document.getElementById('sim-exp');
  const expVal = document.getElementById('sim-exp-val');
  const runBtn = document.getElementById('sim-run-btn');

  if (expSlider && expVal) {
    expSlider.addEventListener('input', (e) => {
      expVal.textContent = `${e.target.value} Years`;
    });
  }

  function updateCareerAnalysis() {
    const roleKey = roleSelect ? roleSelect.value : 'software_engineer';
    const profile = ROLE_PROFILES[roleKey] || ROLE_PROFILES.software_engineer;

    const roleTitleElem = document.getElementById('out-role-title');
    const riskElem = document.getElementById('out-risk-badge');
    const demandElem = document.getElementById('out-demand-val');
    const salaryElem = document.getElementById('out-salary-val');
    const roadmapList = document.getElementById('out-roadmap-list');
    const narrativeElem = document.getElementById('out-narrative');

    if (roleTitleElem) roleTitleElem.textContent = profile.title_2030;
    
    if (riskElem) {
      riskElem.textContent = profile.risk_level;
      riskElem.className = `sim-risk-badge ${profile.risk_class}`;
    }

    if (demandElem) demandElem.textContent = profile.demand;
    if (salaryElem) salaryElem.textContent = profile.salary_delta;

    if (roadmapList) {
      roadmapList.innerHTML = '';
      profile.skills.forEach((skill, index) => {
        const item = document.createElement('div');
        item.className = 'roadmap-step';
        item.innerHTML = `
          <div class="step-num">${index + 1}</div>
          <div class="step-text">${skill}</div>
        `;
        roadmapList.appendChild(item);
      });
    }

    if (narrativeElem) {
      narrativeElem.textContent = profile.narrative;
    }
  }

  if (runBtn) {
    runBtn.addEventListener('click', (e) => {
      e.preventDefault();
      updateCareerAnalysis();
      const outputCard = document.querySelector('.sim-output-card');
      if (outputCard) {
        outputCard.style.animation = 'none';
        outputCard.offsetHeight; // trigger reflow
        outputCard.style.animation = 'fadeIn 0.4s ease';
      }
    });
  }

  // Initial trigger
  updateCareerAnalysis();

  // 2. Enterprise 2030 Readiness Diagnostic (Quiz) Engine
  initEnterpriseDiagnostic();
});

function initEnterpriseDiagnostic() {
  const steps = document.querySelectorAll('.quiz-step');
  const nextBtns = document.querySelectorAll('.quiz-next-btn');
  const prevBtns = document.querySelectorAll('.quiz-prev-btn');
  const progressFill = document.querySelector('.quiz-progress-fill');
  const finishBtn = document.getElementById('quiz-finish-btn');
  const resetBtn = document.getElementById('quiz-reset-btn');

  let currentStep = 0;
  const totalQuestions = 4;
  let userAnswers = {};

  function showStep(index) {
    steps.forEach((step, idx) => {
      step.classList.toggle('active', idx === index);
    });
    if (progressFill) {
      const percentage = Math.min(((index + 1) / totalQuestions) * 100, 100);
      progressFill.style.width = `${percentage}%`;
    }
  }

  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // check if radio checked
      const checkedRadio = steps[currentStep].querySelector('input[type="radio"]:checked');
      if (!checkedRadio) {
        alert("Please select an answer to proceed to the next diagnostic question.");
        return;
      }
      userAnswers[`q${currentStep + 1}`] = parseInt(checkedRadio.value, 10);
      if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
      }
    });
  });

  prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    });
  });

  if (finishBtn) {
    finishBtn.addEventListener('click', () => {
      const checkedRadio = steps[currentStep].querySelector('input[type="radio"]:checked');
      if (!checkedRadio) {
        alert("Please select an option to calculate your readiness score.");
        return;
      }
      userAnswers[`q${currentStep + 1}`] = parseInt(checkedRadio.value, 10);

      calculateDiagnosticScore();
    });
  }

  function calculateDiagnosticScore() {
    let scoreSum = 0;
    for (let key in userAnswers) {
      scoreSum += userAnswers[key];
    }
    // Max possible is 4 questions * 25 = 100 points
    const finalScore = Math.min(scoreSum, 100);

    const scoreNumElem = document.getElementById('quiz-score-val');
    const verdictTitle = document.getElementById('quiz-verdict-title');
    const verdictDesc = document.getElementById('quiz-verdict-desc');

    if (scoreNumElem) scoreNumElem.textContent = finalScore;

    if (finalScore >= 80) {
      verdictTitle.textContent = "2030 Quantum & Cognitive Frontier";
      verdictTitle.style.color = "var(--cyan-glow)";
      verdictDesc.textContent = "Your organization is primed for the 2030 autonomous enterprise paradigm. You have adopted autonomous agents, initiated post-quantum cryptographic transitions, and mapped out energy-aware compute architectures.";
    } else if (finalScore >= 50) {
      verdictTitle.textContent = "Transitional Cloud-Native Horizon";
      verdictTitle.style.color = "var(--violet-glow)";
      verdictDesc.textContent = "You possess strong 2025 modern cloud infrastructure, but you face acute vulnerability to post-quantum decryption ('Harvest Now, Decrypt Later') and rising energy-compute constraints by 2028. Accelerate agentic DevOps and PQC pilots.";
    } else {
      verdictTitle.textContent = "Legacy Monolith High-Risk State";
      verdictTitle.style.color = "var(--rose-glow)";
      verdictDesc.textContent = "Severe obsolescence warning: Manual coding workflows, vulnerable legacy RSA encryption, and lack of energy-aware infrastructure will render systems uncompetitive before 2030. Immediate autonomous refactoring required.";
    }

    currentStep = steps.length - 1;
    showStep(currentStep);
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      userAnswers = {};
      currentStep = 0;
      document.querySelectorAll('.diagnostic-container input[type="radio"]').forEach(r => r.checked = false);
      showStep(0);
    });
  }
}
