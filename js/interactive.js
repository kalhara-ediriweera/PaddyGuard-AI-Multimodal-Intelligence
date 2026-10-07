/**
 * PaddyGuard AI - Interactive Demonstrators
 * Balanced 25% Equal Representation Across All 4 Research Components:
 * C1: Sinhala Voice-Based Symptom Diagnosis (Speech Recognition & BERT)
 * C2: Rice Leaf Disease Classification + OOD + Grad-CAM Visualizer
 * C3: Hybrid AI Treatment Advisory & Safe Acreage Dosage Calculator
 * C4: Rice Pest Detection + YOLOv8 + Unknown Insect OOD Gate
 */

document.addEventListener('DOMContentLoaded', () => {
  initVoiceSimulator();
  initDiseaseVisualizer();
  initPestVisualizer();
  initAdvisorySimulator();
});

/* ==================== C1: VOICE-BASED DIAGNOSIS SIMULATOR ==================== */
function initVoiceSimulator() {
  const sampleBtns = document.querySelectorAll('.voice-sample-btn');
  const waveformBars = document.querySelectorAll('.waveform-bar');
  const transcriptEl = document.getElementById('voice-transcript-text');
  const entitiesEl = document.getElementById('voice-entities-text');
  const diseaseEl = document.getElementById('voice-predicted-disease');
  const confidenceEl = document.getElementById('voice-confidence-score');
  const statusEl = document.getElementById('voice-sim-status');
  const audioPlayBtn = document.getElementById('voice-play-tts-btn');

  if (!sampleBtns.length || !transcriptEl) return;

  const voiceScenarios = {
    'blast': {
      spoken: "ගොයම් කොළවල දුඹුරු පාට ලප හැදිලා, මැද අළු පාට වෙලා තියෙනවා (Spindle brown lesions with grey centers on leaves)",
      keywords: ["දුඹුරු පාට ලප (Brown lesions)", "මැද අළු පාට (Grey center)", "ගොයම් කොළ (Rice leaves)"],
      disease: "Leaf Blast (Magnaporthe oryzae)",
      confidence: "94.2% (High Confidence)",
      ttsSinhala: "හඳුනාගත් රෝගය: කොළ අංගමාරය හෙවත් Leaf Blast. කෙත්වතු ජලය බැසයාම පාලනය කරන්න. නයිට්‍රජන් පොහොර අධිකව යෙදීමෙන් වළකින්න."
    },
    'blight': {
      spoken: "කොළ අගිස්ස කහ පාට වෙලා වේලීගෙන යනවා, කොළ දිගේ දිගට ඉරි ආකාරයෙන් පැතිරෙනවා (Yellowing leaf tips drying along leaf margins)",
      keywords: ["අගිස්ස කහ වීම (Tip yellowing)", "වේලී යාම (Drying)", "ඉරි ආකාරයෙන් (Wavy margins)"],
      disease: "Bacterial Blight (Xanthomonas oryzae)",
      confidence: "91.8% (High Confidence)",
      ttsSinhala: "හඳුනාගත් රෝගය: බැක්ටීරියා කොළ අංගමාරය. නිර්දේශිත තඹ පාදක දිලීර නාශක හෝ කෘෂිකර්ම උපදෙස් පිළිපදින්න."
    },
    'brownspot': {
      spoken: "කොළ මත කුඩා තද දුඹුරු පැහැති වටකුරු තිත් විශාල ප්‍රමාණයක් දකින්න ලැබෙනවා (Small circular dark-brown spots across leaves)",
      keywords: ["කුඩා දුඹුරු තිත් (Small brown spots)", "වටකුරු ලප (Circular spots)", "කොළ පුරා (Across foliage)"],
      disease: "Brown Spot (Cochliobolus miyabeanus)",
      confidence: "89.5% (High Confidence)",
      ttsSinhala: "හඳුනාගත් රෝගය: දුඹුරු ලප රෝගය. පසෙහි පොටෑසියම් ඌනතාව සහ ක්ෂුද්‍ර පෝෂක මට්ටම පරීක්ෂා කරන්න."
    }
  };

  let currentTTS = voiceScenarios['blast'].ttsSinhala;

  sampleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sampleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const type = btn.getAttribute('data-sample');
      const scenario = voiceScenarios[type];
      if (!scenario) return;

      currentTTS = scenario.ttsSinhala;

      if (statusEl) statusEl.textContent = "🎙️ Ingesting Sinhala speech audio stream (16kHz)...";
      waveformBars.forEach(b => b.classList.add('active'));

      setTimeout(() => {
        waveformBars.forEach(b => b.classList.remove('active'));
        if (statusEl) statusEl.textContent = "✅ Whisper ASR & TF-IDF Extraction Complete";
        if (transcriptEl) transcriptEl.textContent = `"${scenario.spoken}"`;
        if (entitiesEl) entitiesEl.textContent = scenario.keywords.join(" • ");
        if (diseaseEl) diseaseEl.textContent = scenario.disease;
        if (confidenceEl) confidenceEl.textContent = scenario.confidence;
      }, 600);
    });
  });

  if (audioPlayBtn) {
    audioPlayBtn.addEventListener('click', () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(currentTTS);
        utterance.rate = 0.95;
        window.speechSynthesis.speak(utterance);
      } else {
        alert("Audio Synthesis: " + currentTTS);
      }
    });
  }
}

/* ==================== C2: LEAF DISEASE & GRAD-CAM VISUALIZER ==================== */
function initDiseaseVisualizer() {
  const sampleSelect = document.getElementById('disease-sample-select');
  const leafImageSvg = document.getElementById('disease-leaf-svg');
  const heatmapLayer = document.getElementById('disease-heatmap-layer');
  const toggleHeatmap = document.getElementById('disease-toggle-heatmap');
  const labelEl = document.getElementById('disease-pred-label');
  const confEl = document.getElementById('disease-pred-conf');
  const oodStatusEl = document.getElementById('disease-ood-status');
  const explainNoteEl = document.getElementById('disease-explain-note');

  if (!sampleSelect || !leafImageSvg) return;

  const diseaseSamples = {
    'blast': {
      label: "Leaf Blast (Magnaporthe oryzae)",
      conf: "94.6%",
      ood: "In-Distribution (Score 0.96 > Threshold)",
      oodColor: "badge-success",
      note: "Grad-CAM verifies high convolutional attention focused directly over the spindle necrotic eye-spots.",
      svgMarkup: `
        <rect width="100%" height="100%" fill="#13241b"/>
        <path d="M 60 240 C 60 120, 160 50, 320 60 C 260 180, 180 250, 60 240 Z" fill="#2d5a3c"/>
        <ellipse cx="180" cy="140" rx="42" ry="16" fill="#8c6239" transform="rotate(-25 180 140)"/>
        <ellipse cx="180" cy="140" rx="22" ry="7" fill="#cfcfcf" transform="rotate(-25 180 140)"/>
        <ellipse cx="230" cy="110" rx="30" ry="12" fill="#8c6239" transform="rotate(-20 230 110)"/>
      `,
      heatmapColor: "radial-gradient(ellipse at 50% 50%, rgba(255, 0, 0, 0.8) 0%, rgba(255, 230, 0, 0.6) 40%, transparent 80%)"
    },
    'blight': {
      label: "Bacterial Blight (Xanthomonas oryzae)",
      conf: "92.3%",
      ood: "In-Distribution (Score 0.94 > Threshold)",
      oodColor: "badge-success",
      note: "Grad-CAM saliency concentrates along the yellowed, wavy foliar margin where bacterial wilting begins.",
      svgMarkup: `
        <rect width="100%" height="100%" fill="#13241b"/>
        <path d="M 60 240 C 60 120, 160 50, 320 60 C 260 180, 180 250, 60 240 Z" fill="#2d5a3c"/>
        <path d="M 120 180 Q 220 90 310 65 L 290 85 Q 200 120 100 200 Z" fill="#d4af37"/>
        <path d="M 140 160 Q 230 80 300 68 L 290 76 Q 210 100 120 180 Z" fill="#8b5a2b"/>
      `,
      heatmapColor: "radial-gradient(ellipse at 65% 35%, rgba(255, 0, 0, 0.85) 0%, rgba(255, 170, 0, 0.6) 50%, transparent 85%)"
    },
    'brownspot': {
      label: "Brown Spot (Cochliobolus miyabeanus)",
      conf: "91.1%",
      ood: "In-Distribution (Score 0.92 > Threshold)",
      oodColor: "badge-success",
      note: "Grad-CAM highlights localized circular lesion spots, isolating symptoms from healthy leaf tissue.",
      svgMarkup: `
        <rect width="100%" height="100%" fill="#13241b"/>
        <path d="M 60 240 C 60 120, 160 50, 320 60 C 260 180, 180 250, 60 240 Z" fill="#2d5a3c"/>
        <circle cx="150" cy="160" r="12" fill="#5c3818"/>
        <circle cx="210" cy="120" r="10" fill="#5c3818"/>
        <circle cx="240" cy="95" r="8" fill="#5c3818"/>
      `,
      heatmapColor: "radial-gradient(circle at 45% 55%, rgba(255, 0, 0, 0.8) 0%, rgba(255, 200, 0, 0.5) 45%, transparent 75%)"
    },
    'healthy': {
      label: "Healthy Rice Foliage",
      conf: "96.4%",
      ood: "In-Distribution (Score 0.98 > Threshold)",
      oodColor: "badge-success",
      note: "No pathological lesion activations identified. Uniform convolutional activation across leaf blade.",
      svgMarkup: `
        <rect width="100%" height="100%" fill="#13241b"/>
        <path d="M 60 240 C 60 120, 160 50, 320 60 C 260 180, 180 250, 60 240 Z" fill="#22c55e"/>
        <path d="M 65 235 C 130 170, 200 110, 315 62" stroke="#86efac" stroke-width="3" fill="none"/>
      `,
      heatmapColor: "radial-gradient(circle at 50% 50%, rgba(0, 200, 255, 0.3) 0%, transparent 60%)"
    },
    'ood-weed': {
      label: "REJECTED (Non-Rice Weed / Mango Leaf)",
      conf: "N/A (Softmax Suppressed)",
      ood: "⚠️ Out-of-Distribution Detected (Mahalanobis Distance > Cutoff)",
      oodColor: "badge-warning",
      note: "OOD Barrier Active: Rejection triggered under calibrated FPR95. The network refuses to force unfamiliar weeds into rice categories.",
      svgMarkup: `
        <rect width="100%" height="100%" fill="#1a1c18"/>
        <path d="M 70 230 C 20 140, 120 40, 260 80 C 310 160, 240 240, 70 230 Z" fill="#4d7c0f"/>
        <circle cx="180" cy="150" r="40" fill="#a3e635" opacity="0.4"/>
      `,
      heatmapColor: "transparent"
    }
  };

  function updateDisease(key) {
    const data = diseaseSamples[key];
    if (!data) return;
    leafImageSvg.innerHTML = data.svgMarkup;
    if (heatmapLayer) heatmapLayer.style.background = data.heatmapColor;
    if (labelEl) labelEl.textContent = data.label;
    if (confEl) confEl.textContent = data.conf;
    if (oodStatusEl) {
      oodStatusEl.textContent = data.ood;
      oodStatusEl.className = `badge ${data.oodColor}`;
    }
    if (explainNoteEl) explainNoteEl.textContent = data.note;
  }

  sampleSelect.addEventListener('change', (e) => updateDisease(e.target.value));
  if (toggleHeatmap && heatmapLayer) {
    toggleHeatmap.addEventListener('change', (e) => {
      heatmapLayer.style.opacity = e.target.checked ? "0.65" : "0";
    });
  }
  updateDisease('blast');
}

/* ==================== C4: RICE PEST DETECTION & OOD GATE ==================== */
function initPestVisualizer() {
  const pestSelect = document.getElementById('pest-sample-select');
  const pestSvg = document.getElementById('pest-image-svg');
  const pestLabelEl = document.getElementById('pest-pred-label');
  const pestConfEl = document.getElementById('pest-pred-conf');
  const pestOodEl = document.getElementById('pest-ood-status');
  const pestActionEl = document.getElementById('pest-action-note');

  if (!pestSelect || !pestSvg) return;

  const pestSamples = {
    'bph': {
      label: "Brown Planthopper (Nilaparvata lugens)",
      conf: "95.2%",
      ood: "In-Distribution Paddy Pest (Accepted)",
      oodColor: "badge-success",
      note: "YOLOv8 detected cluster of small brown planthoppers near stem base. Critical Hopperburn risk.",
      svgMarkup: `
        <rect width="100%" height="100%" fill="#13241b"/>
        <!-- Rice Stem Background -->
        <rect x="150" y="20" width="80" height="240" fill="#4a7c59"/>
        <!-- Bounding Box -->
        <rect x="160" y="100" width="60" height="70" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="4 2"/>
        <text x="165" y="95" font-size="10" fill="#ef4444" font-weight="700" font-family="'JetBrains Mono', monospace">BPH [0.95]</text>
        <!-- Pest Body -->
        <ellipse cx="190" cy="135" rx="14" ry="22" fill="#5c3818"/>
        <circle cx="190" cy="118" r="8" fill="#3a200e"/>
        <line x1="180" y1="130" x2="165" y2="120" stroke="#3a200e" stroke-width="2"/>
        <line x1="200" y1="130" x2="215" y2="120" stroke="#3a200e" stroke-width="2"/>
      `
    },
    'stemborer': {
      label: "Rice Stem Borer (Scirpophaga incertulas)",
      conf: "93.8%",
      ood: "In-Distribution Paddy Pest (Accepted)",
      oodColor: "badge-success",
      note: "Moth / larval borer localized on tiller. Symptom associated with 'Dead Heart' vegetative drying.",
      svgMarkup: `
        <rect width="100%" height="100%" fill="#13241b"/>
        <rect x="170" y="20" width="40" height="240" fill="#4a7c59"/>
        <!-- Bounding Box -->
        <rect x="120" y="70" width="140" height="110" fill="none" stroke="#f59e0b" stroke-width="2"/>
        <text x="125" y="65" font-size="10" fill="#f59e0b" font-weight="700" font-family="'JetBrains Mono', monospace">STEM_BORER [0.94]</text>
        <!-- Larval / Moth Shape -->
        <ellipse cx="190" cy="125" rx="10" ry="32" fill="#e2d9b6"/>
        <polygon points="190,105 140,145 190,135" fill="#f5f0db" opacity="0.8"/>
        <polygon points="190,105 240,145 190,135" fill="#f5f0db" opacity="0.8"/>
      `
    },
    'leaffolder': {
      label: "Rice Leaf Folder (Cnaphalocrocis medinalis)",
      conf: "91.4%",
      ood: "In-Distribution Paddy Pest (Accepted)",
      oodColor: "badge-success",
      note: "Longitudinal folded leaf blade detected. Larva feeds inside folded leaf creating white papery stripes.",
      svgMarkup: `
        <rect width="100%" height="100%" fill="#13241b"/>
        <path d="M 80 230 C 140 160, 200 90, 310 60" stroke="#86efac" stroke-width="22" stroke-linecap="round" fill="none"/>
        <rect x="160" y="80" width="110" height="90" fill="none" stroke="#10b981" stroke-width="2"/>
        <text x="165" y="75" font-size="10" fill="#10b981" font-weight="700" font-family="'JetBrains Mono', monospace">LEAF_FOLDER [0.91]</text>
        <path d="M 180 140 Q 210 110 240 100" stroke="#fff" stroke-width="4" stroke-dasharray="3 3"/>
      `
    },
    'gallmidge': {
      label: "Rice Gall Midge (Orseolia oryzae)",
      conf: "89.7%",
      ood: "In-Distribution Paddy Pest (Accepted)",
      oodColor: "badge-success",
      note: "Tubular onion-leaf shoot formation detected. Active in early tillering during damp overcast weather.",
      svgMarkup: `
        <rect width="100%" height="100%" fill="#13241b"/>
        <rect x="180" y="30" width="20" height="220" fill="#a7f3d0"/>
        <rect x="140" y="80" width="100" height="100" fill="none" stroke="#38bdf8" stroke-width="2"/>
        <text x="145" y="75" font-size="10" fill="#38bdf8" font-weight="700" font-family="'JetBrains Mono', monospace">GALL_MIDGE [0.90]</text>
        <circle cx="190" cy="130" r="14" fill="#cf7a3a"/>
      `
    },
    'ood-bug': {
      label: "REJECTED (Non-Rice Unknown Insect / Beetle)",
      conf: "N/A (Classification Suppressed)",
      ood: "⚠️ Out-of-Distribution Alert (Not in Paddy Pest Taxonomy)",
      oodColor: "badge-warning",
      note: "OOD Barrier Active: Rejection triggered via Mahalanobis Distance. Protects farmers against misidentifying beneficial predatory ladybugs or harmless insects as rice pests.",
      svgMarkup: `
        <rect width="100%" height="100%" fill="#1a1c18"/>
        <!-- Non-rice Insect (Ladybug / Beneficial Predator) -->
        <circle cx="190" cy="140" r="38" fill="#dc2626"/>
        <circle cx="190" cy="98" r="16" fill="#0f172a"/>
        <circle cx="175" cy="130" r="6" fill="#0f172a"/>
        <circle cx="205" cy="130" r="6" fill="#0f172a"/>
        <circle cx="190" cy="155" r="7" fill="#0f172a"/>
        <line x1="190" y1="102" x2="190" y2="178" stroke="#0f172a" stroke-width="3"/>
        <text x="70" y="40" font-size="12" fill="#fbbf24" font-weight="700" font-family="'JetBrains Mono', monospace">⚠️ OOD REJECTION: NON-TARGET INSECT</text>
      `
    }
  };

  function updatePest(key) {
    const data = pestSamples[key];
    if (!data) return;
    pestSvg.innerHTML = data.svgMarkup;
    if (pestLabelEl) pestLabelEl.textContent = data.label;
    if (pestConfEl) pestConfEl.textContent = data.conf;
    if (pestOodEl) {
      pestOodEl.textContent = data.ood;
      pestOodEl.className = `badge ${data.oodColor}`;
    }
    if (pestActionEl) pestActionEl.textContent = data.note;
  }

  pestSelect.addEventListener('change', (e) => updatePest(e.target.value));
  updatePest('bph');
}

/* ==================== C3: TREATMENT ADVISORY & DOSAGE CALCULATOR ==================== */
function initAdvisorySimulator() {
  const acresInput = document.getElementById('advisory-acres-input');
  const targetSelect = document.getElementById('advisory-target-select');
  const calcBtn = document.getElementById('advisory-calc-btn');
  const waterVolEl = document.getElementById('advisory-water-vol');
  const tankCountEl = document.getElementById('advisory-tank-count');
  const chemAmountEl = document.getElementById('advisory-chem-amount');
  const ipmNoteEl = document.getElementById('advisory-ipm-note');
  const ragSnippetEl = document.getElementById('advisory-rag-snippet');

  if (!acresInput || !calcBtn) return;

  const advisoryData = {
    'blast': {
      waterPerAcre: 160,
      chemName: "Isoprothiolane 40% EC",
      ratePerAcreMl: 300,
      ragSource: "IRRI Rice Knowledge Bank - Foliar Blasts Section 4.2",
      ragQuote: "Fungicidal applications should occur at tillering when spindle lesions reach 2% leaf area. Chemical treatment must be integrated with nitrogen restriction.",
      ipm: "Drain stagnant paddy water for 3 to 4 days to arrest sporulation. Avoid surplus top-dressing of urea nitrogen."
    },
    'blight': {
      waterPerAcre: 160,
      chemName: "Copper Oxychloride 50% WP",
      ratePerAcreMl: 400,
      ragSource: "Department of Agriculture Sri Lanka - Bacterial Leaf Blight Advisory",
      ragQuote: "Bacterial leaf blight management relies on water sanitation and balanced potash nutrition. Copper-based sprays recommended only in early tillering.",
      ipm: "Maintain clean field bunds. Introduce biological antagonism using Bacillus subtilis spray at tillering stage."
    },
    'bph': {
      waterPerAcre: 200,
      chemName: "Pymetrozine 50% WDG",
      ratePerAcreMl: 120,
      ragSource: "FAO Rice Integrated Pest Management Guide - Planthopper Protocol",
      ragQuote: "Conserve natural predators such as mirid bugs and wolf spiders. Direct spray toward base of tillers rather than upper canopy.",
      ipm: "Conserve natural predators. Avoid broad-spectrum synthetic pyrethroids which induce hopper resurgence."
    },
    'stemborer': {
      waterPerAcre: 160,
      chemName: "Chlorantraniliprole 18.5% SC",
      ratePerAcreMl: 60,
      ragSource: "Department of Agriculture Sri Lanka - Paddy Borer Advisory",
      ragQuote: "Monitor egg masses on leaf tips. Pheromone traps and Trichogramma egg parasitoids recommended prior to chemical intervention.",
      ipm: "Clip leaf tips before transplanting to destroy egg masses. Release Trichogramma parasitoid wasps."
    }
  };

  function runAdvisoryCalc() {
    const acres = parseFloat(acresInput.value) || 1.0;
    const target = targetSelect.value;
    const info = advisoryData[target] || advisoryData['blast'];

    const totalWater = Math.round(acres * info.waterPerAcre);
    const tanks = Math.ceil(totalWater / 16);
    const totalChemMl = Math.round(acres * info.ratePerAcreMl);
    const perTankMl = Math.round(totalChemMl / tanks);

    if (waterVolEl) waterVolEl.textContent = `${totalWater} Liters`;
    if (tankCountEl) tankCountEl.textContent = `${tanks} Tanks (16L each)`;
    if (chemAmountEl) chemAmountEl.textContent = `${info.chemName}: ${totalChemMl} mL total (~${perTankMl} mL per tank)`;
    if (ragSnippetEl) ragSnippetEl.innerHTML = `<strong>Source:</strong> <em>${info.ragSource}</em><br>"${info.ragQuote}"`;
    if (ipmNoteEl) ipmNoteEl.textContent = info.ipm;
  }

  calcBtn.addEventListener('click', runAdvisoryCalc);
  acresInput.addEventListener('input', runAdvisoryCalc);
  targetSelect.addEventListener('change', runAdvisoryCalc);
  runAdvisoryCalc();
}
