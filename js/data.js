/**
 * PaddyGuard AI - Central Project Data Configuration
 * Project ID: R26-SE-015
 * University: Sri Lanka Institute of Information Technology (SLIIT)
 * 
 * Equal 25% weighting across all 4 research components:
 * C1: Voice-Based Rice Disease Diagnosis
 * C2: Rice Leaf Disease Classification with OOD
 * C3: Hybrid AI Treatment Recommendation & Advisory Chatbot
 * C4: Rice Pest Detection with OOD
 */

const projectData = {
  meta: {
    title: "PaddyGuard AI: A Multimodal AI Based System for Rice Leaf Disease & Pest Detection, Treatment Recommendation and Knowledge Assistance",
    shortTitle: "PaddyGuard AI",
    projectId: "R26-SE-015",
    academicYear: "2025/2026",
    submissionDate: "March 2026",
    institution: "Sri Lanka Institute of Information Technology (SLIIT)",
    department: "Department of Information Technology",
    faculty: "Faculty of Computing",
    degree: "B.Sc. (Hons) Degree in Information Technology Specialized in Software Engineering",
    domains: [
      "Software Engineering",
      "Artificial Intelligence",
      "Machine Learning",
      "Computer Vision",
      "Natural Language Processing",
      "Agricultural Informatics",
      "Precision Agriculture"
    ],
    status: "Research Prototype (Under Development)",
    disclaimer: "PaddyGuard AI is an undergraduate academic research project conducted at SLIIT. Diagnostic predictions and treatment recommendations are intended within the validated research scope."
  },

  supervision: {
    supervisor: {
      name: "Dr. Nathali Silva",
      role: "Research Supervisor",
      designation: "Senior Lecturer",
      department: "Department of Information Technology",
      institution: "Sri Lanka Institute of Information Technology (SLIIT)",
      expertise: "Machine Learning, Artificial Intelligence, Computational Systems",
      email: "nathali.s@sliit.lk"
    },
    coSupervisor: {
      name: "Ms. Poorna Panduwawala",
      role: "Co-Supervisor",
      designation: "Lecturer",
      department: "Department of Information Technology",
      institution: "Sri Lanka Institute of Information Technology (SLIIT)",
      expertise: "Software Architecture, Deep Learning Experimental Design",
      email: "poorna.p@sliit.lk"
    },
    externalExpert: {
      name: "Mrs. Anoma Gunarathna",
      role: "External Agricultural Field Expert",
      designation: "Agricultural Research Officer",
      institution: "Department of Agriculture, Sri Lanka",
      expertise: "Paddy Pathology, Pest Diagnostics & Cultivation Field Practices",
      email: "To be updated"
    }
  },

  // 4 Team Members with Equal Weight & Responsibility
  team: [
    {
      id: "member-1",
      name: "Hewanayake H.M.L.M",
      studentId: "IT22168740",
      role: "Lead Researcher: Component 2",
      componentNumber: 2,
      componentTitle: "Rice Leaf Disease Classification with Out-of-Distribution Detection",
      weight: "25%",
      technologies: ["ResNet50", "EfficientNetB3", "DenseNet121", "ODIN", "Mahalanobis Distance", "OpenMax", "Grad-CAM", "PyTorch"],
      responsibilities: [
        "Curating and balancing 4-class rice leaf disease dataset (Blight, Blast, Brown Spot, Healthy)",
        "Benchmarking transfer learning CNN backbones (ResNet50, EfficientNetB3, DenseNet121)",
        "Integrating OOD detection methods (ODIN, Mahalanobis, OpenMax) to reject non-rice foliage",
        "Generating Grad-CAM visual activation heatmaps to verify biological lesion attention",
        "Exporting optimized lightweight models for mobile/edge inference"
      ],
      sharedDuties: "Literature review, dataset preparation, system integration, testing, evaluation, dissertation documentation.",
      email: "it22168740@my.sliit.lk"
    },
    {
      id: "member-2",
      name: "Keshan B K",
      studentId: "IT22303820",
      role: "Lead Researcher: Component 1",
      componentNumber: 1,
      componentTitle: "Voice-Based Rice Disease Diagnosis using Speech Recognition & NLP",
      weight: "25%",
      technologies: ["Whisper / Vosk ASR", "TF-IDF", "SVM / Naive Bayes", "BERT / RoBERTa", "Sinhala TTS", "PyTorch"],
      responsibilities: [
        "Collecting and annotating Sinhala spoken symptom descriptions through farmer field interviews",
        "Converting farmer 16kHz speech streams into normalized Sinhala text transcripts",
        "Extracting clinical symptom keywords using TF-IDF and domain vocabulary dictionaries",
        "Training transformer-based NLP classifiers (BERT) against traditional ML baselines",
        "Developing Sinhala Text-to-Speech (TTS) voice synthesis for low-literacy farmers"
      ],
      sharedDuties: "Literature review, dataset preparation, system integration, testing, evaluation, dissertation documentation.",
      email: "it22303820@my.sliit.lk"
    },
    {
      id: "member-3",
      name: "Kalhara E P K",
      studentId: "IT22065858",
      role: "Lead Researcher: Component 4",
      componentNumber: 4,
      componentTitle: "Rice Pest Detection using Deep Learning with Out-of-Distribution Detection",
      weight: "25%",
      technologies: ["YOLOv8", "ResNet50", "EfficientNet", "ODIN / Mahalanobis", "PyTorch / TensorFlow", "OpenCV"],
      responsibilities: [
        "Curating representative rice pest datasets (IP02, specialized agricultural repositories)",
        "Training deep learning & object detection models (YOLOv8, ResNet) for common paddy insect pests",
        "Integrating Out-of-Distribution (OOD) screening to reject unfamiliar insects and non-pest images",
        "Evaluating model precision, recall, and detection speed under complex foliage backgrounds",
        "Formulating pest diagnostic alert payloads and threshold calibrations"
      ],
      sharedDuties: "Literature review, dataset preparation, system integration, testing, evaluation, dissertation documentation.",
      email: "it22065858@my.sliit.lk"
    },
    {
      id: "member-4",
      name: "Weerasinghe KGJP",
      studentId: "IT22273680",
      role: "Lead Researcher: Component 3",
      componentNumber: 3,
      componentTitle: "Hybrid AI and Knowledge-Based Rice Treatment Recommendation & Advisory Chatbot",
      weight: "25%",
      technologies: ["Retrieval-Augmented Generation (RAG)", "FAISS / ChromaDB", "LLM (Llama / OpenAI compatible)", "Rule-based Expert System", "PostgreSQL"],
      responsibilities: [
        "Engineering agricultural knowledge base from IRRI Rice Knowledge Bank, FAO, and DOA Sri Lanka guidelines",
        "Building semantic vector database and domain-grounded RAG retrieval pipeline",
        "Formulating deterministic expert rules to strictly validate and verify chemical and biological treatments",
        "Developing calibrated land acreage-to-dosage chemical calculation algorithms",
        "Integrating conversational chatbot interface consuming diagnostic outcomes from C1, C2, and C4"
      ],
      sharedDuties: "Literature review, dataset preparation, system integration, testing, evaluation, dissertation documentation.",
      email: "it22273680@my.sliit.lk"
    }
  ],

  // 4 Equal Core Components
  components: [
    {
      id: "c1",
      number: "01",
      title: "Voice-Based Rice Disease Diagnosis",
      lead: "Keshan B K (IT22303820)",
      badge: "Speech Recognition & NLP",
      weight: "25% Component Weight",
      icon: "mic",
      summary: "Empowers smallholder farmers to verbally describe crop symptoms in natural spoken Sinhala, overcoming literacy and digital divide barriers with speech-to-text, symptom keyword extraction, BERT classification, and synthesized voice advisory.",
      problem: "Many rural farmers experience low literacy and struggle to articulate symptom terms in English or mobile form fields. Delay in verbal consultation leads to catastrophic spread of foliar epidemics.",
      pipeline: [
        "Farmer Spoken Description (Sinhala 16kHz mono audio)",
        "Automatic Speech Recognition (ASR via Whisper / Vosk)",
        "Text Preprocessing, Cleaning & Phonetic Normalization",
        "Symptom Keyword Extraction (TF-IDF domain dictionary)",
        "NLP Classification (BERT / RoBERTa vs. Naive Bayes/SVM baselines)",
        "Confidence & OOD Rejection Check (Score >= 0.70 threshold)",
        "Sinhala Text-to-Speech (TTS) Voice Advisory Output"
      ],
      targetClasses: [
        "Bacterial Blight (කහ වී වේලී යාම)",
        "Leaf Blast (දුඹුරු අළු ලප)",
        "Brown Spot (තද දුඹුරු තිත්)",
        "Healthy Plant (නිරෝගී ගොයම)"
      ],
      technologies: ["Whisper / Vosk ASR", "TF-IDF", "SVM / Naive Bayes", "BERT / RoBERTa", "PyTorch / Transformers", "Text-to-Speech"],
      researchQuestions: [
        "Can natural language symptom descriptions accurately identify rice diseases in the absence of photographs?",
        "Does transformer-based NLP (BERT) outperform traditional machine learning text classification (TF-IDF + SVM)?",
        "How reliable is voice-based diagnosis compared to image-based detection when rural acoustic noise is present?"
      ],
      status: "Dataset collection & acoustic adaptation in progress",
      datasetInfo: "Dedicated Sinhala spoken symptom corpus being gathered through farmer interviews in North Western & North Central farming communities."
    },
    {
      id: "c2",
      number: "02",
      title: "Rice Leaf Disease Classification + OOD",
      lead: "Hewanayake H.M.L.M (IT22168740)",
      badge: "Computer Vision & OOD",
      weight: "25% Component Weight",
      icon: "leaf",
      summary: "Diagnoses foliar rice diseases from smartphone photos using transfer-learning CNN architectures, deploying Out-of-Distribution (OOD) screening to reject non-rice leaves or unseen conditions, verified with Grad-CAM visual heatmaps.",
      problem: "Standard closed-world classifiers force non-rice leaves, weeds, or soil into trained categories with false 99% confidence, resulting in incorrect agrochemical spraying.",
      pipeline: [
        "Field Rice Leaf Photo Capture (JPEG/PNG)",
        "Image Normalization (224x224, ImageNet constants) & Augmentation",
        "CNN Feature Extraction (ResNet50 / EfficientNetB3 / DenseNet121)",
        "OOD Detection Screening (ODIN / Mahalanobis Distance / OpenMax)",
        "In-Distribution Classification (Softmax Disease Probabilities)",
        "Grad-CAM Heatmap Generation (Biological lesion saliency check)",
        "Confidence & Diagnostic Payload to Frontend & Advisory Module"
      ],
      targetClasses: [
        "Bacterial Blight (Xanthomonas oryzae pv. oryzae)",
        "Leaf Blast (Magnaporthe oryzae)",
        "Brown Spot (Cochliobolus miyabeanus)",
        "Healthy Leaf"
      ],
      technologies: ["ResNet50", "EfficientNetB3", "DenseNet121", "ODIN", "Mahalanobis Distance", "OpenMax", "Grad-CAM", "PyTorch"],
      researchQuestions: [
        "Which CNN architecture achieves optimal trade-offs between parameter efficiency, accuracy, and inference speed?",
        "Can OOD detection reduce false-positive predictions when non-rice leaves or weeds are submitted?",
        "Does Grad-CAM confirm that CNN predictions are grounded in biologically meaningful disease lesions?"
      ],
      status: "Model development & OOD calibration in progress",
      datasetInfo: "Kaggle Indonesian Rice Disease, Nirmalsankalana Rice Disease, local field collections from Polonnaruwa & Kurunegala."
    },
    {
      id: "c3",
      number: "03",
      title: "Rice Pest Detection + OOD",
      lead: "Kalhara E P K (IT22065858)",
      badge: "Pest Vision & OOD",
      weight: "25% Component Weight",
      icon: "bug",
      summary: "Detects and localizes common destructive rice insect pests from field imagery using deep learning (YOLOv8 and CNN backbones), while integrating OOD mechanisms to identify and reject unfamiliar insects that do not belong to the trained dataset.",
      problem: "Pests in paddy fields are small, camouflaged, and appear among complex foliage. Existing AI tools mistake harmless or unseen insects for catastrophic pests, causing unnecessary pesticide purchases and toxicity.",
      pipeline: [
        "Field Pest Image Capture / Upload",
        "Preprocessing, Noise Filtering & Multi-scale Normalization",
        "Deep Learning Feature Extraction & Localization (YOLOv8 / ResNet50 / EfficientNet)",
        "Out-of-Distribution (OOD) Unknown Insect Gate (ODIN / Mahalanobis)",
        "Pest Species Identification & Bounding Box Classification",
        "Confidence Score Verification & Alert Payload to Advisory Module"
      ],
      targetClasses: [
        "Brown Planthopper (Nilaparvata lugens)",
        "Rice Stem Borer (Scirpophaga incertulas)",
        "Rice Leaf Folder (Cnaphalocrocis medinalis)",
        "Rice Whorl Maggot (Hydrellia philippina)",
        "Rice Gall Midge (Orseolia oryzae)"
      ],
      technologies: ["YOLOv8", "ResNet50", "EfficientNet", "OOD Detection (ODIN / Mahalanobis)", "PyTorch / TensorFlow", "OpenCV"],
      researchQuestions: [
        "Can deep learning and YOLO models accurately detect small rice pests against complex, variable foliage backgrounds?",
        "How effectively can OOD detection reject unseen or non-agricultural insect species to prevent false alarms?",
        "How does pest detection seamlessly complement foliar disease diagnosis in integrated pest management (IPM)?"
      ],
      status: "YOLOv8 model training & insect OOD benchmarking in progress",
      datasetInfo: "IP02 Large Scale Insect Pest Dataset, Kaggle rice pest detection dataset, local field insect photography."
    },
    {
      id: "c4",
      number: "04",
      title: "Hybrid AI Treatment Advisory & RAG Chatbot",
      lead: "Weerasinghe KGJP (IT22273680)",
      badge: "RAG & Expert System",
      weight: "25% Component Weight",
      icon: "chat",
      summary: "A dual-layered decision support system combining Retrieval-Augmented Generation (RAG) over verified agronomic literature with deterministic expert rules and an acreage-calibrated safe chemical dosage calculator to eliminate hallucinations.",
      problem: "Standard LLMs hallucinate illegal pesticides or toxic dosages. Farmers lack verified guidance that connects diagnostic findings with calibrated sprayer tank measurements and integrated pest management (IPM).",
      pipeline: [
        "Diagnostic Findings Input (Disease / Pest / Confidence from C1, C2, C4)",
        "Farmer Query Ingestion & Semantic Intent Parsing",
        "Semantic Vector Search over Agronomic Corpus (FAISS / ChromaDB)",
        "Context Retrieval (IRRI Rice Knowledge Bank, FAO, DOA Sri Lanka)",
        "Deterministic Rule-Based Expert System Verification (Pesticide safety barrier)",
        "Safe Dosage Engine (Acreage & 16L knapsack sprayer volume calibration)",
        "Grounded LLM Response Generation & Multimodal Farmer Advisory Output"
      ],
      targetClasses: [
        "Chemical Treatment Options (Approved agrochemicals only)",
        "Biological Biocontrols (Trichoderma, predator conservation)",
        "Cultural & Preventive Practices (Water management, field sanitation)",
        "Acreage-to-Dosage Sprayer Measurements (16L tanks)"
      ],
      technologies: ["Retrieval-Augmented Generation (RAG)", "FAISS / ChromaDB", "LLM (Llama / OpenAI Compatible)", "Rule-based Expert System", "PostgreSQL / MongoDB", "FastAPI"],
      researchQuestions: [
        "Can a hybrid system combining LLM RAG with rule-based expert validation eliminate hallucinated pesticide recommendations?",
        "How effective is domain-specific retrieval-augmented generation in answering local rice farming queries?",
        "Can acreage-calibrated dosage calculators significantly reduce pesticide misuse in smallholder rice farming?"
      ],
      status: "Knowledge vectorization & deterministic rule engineering in progress",
      datasetInfo: "IRRI Rice Knowledge Bank, FAO Rice Production Guidelines, Department of Agriculture Sri Lanka guides (PDF & tables)."
    }
  ],

  // Datasets
  datasets: [
    {
      id: "ds-1",
      name: "Leaf Rice Disease Indonesia Dataset",
      category: "Disease Vision",
      component: "Component 2 (Disease)",
      source: "Kaggle (tedisetiady/leaf-rice-disease-indonesia)",
      url: "https://www.kaggle.com/datasets/tedisetiady/leaf-rice-disease-indonesia/data",
      purpose: "Training and validating baseline CNN architectures on tropical Asian rice leaf disease symptoms.",
      classes: "Bacterial Blight, Leaf Blast, Brown Spot, Healthy",
      status: "Research Dataset (In Use)"
    },
    {
      id: "ds-2",
      name: "Rice Leaf Disease Image Dataset",
      category: "Disease Vision",
      component: "Component 2 (Disease)",
      source: "Kaggle (nirmalsankalana/rice-leaf-disease-image)",
      url: "https://www.kaggle.com/datasets/nirmalsankalana/rice-leaf-disease-image",
      purpose: "Supplementary multi-class rice disease validation for transfer learning experiments.",
      classes: "Bacterial Blight, Brown Spot, Leaf Blast",
      status: "Research Dataset (In Use)"
    },
    {
      id: "ds-3",
      name: "IP02 Large-Scale Insect Pest Dataset",
      category: "Pest Vision",
      component: "Component 4 (Pest)",
      source: "Kaggle / GitHub (xpwu95/IP102)",
      url: "https://github.com/xpwu95/IP102",
      purpose: "Agricultural pest baseline and out-of-distribution insect probe benchmarking.",
      classes: "Multi-crop insect taxonomy including paddy pest sub-classes",
      status: "Public Research Benchmark"
    },
    {
      id: "ds-4",
      name: "Rice Pest Detection Dataset",
      category: "Pest Vision",
      component: "Component 4 (Pest)",
      source: "Kaggle (mathumithram/rice-pest-detection)",
      url: "https://www.kaggle.com/datasets/mathumithram/rice-pest-detection",
      purpose: "Fine-tuning deep learning models on specialized paddy insect infestations.",
      classes: "Brown Planthopper, Stem Borer, Leaf Folder, Gall Midge",
      status: "Research Dataset (In Use)"
    },
    {
      id: "ds-5",
      name: "Sinhala Spoken Symptom Description Corpus",
      category: "Voice & NLP",
      component: "Component 1 (Voice)",
      source: "Farmer consultations (North Western & North Central farming communities)",
      url: "",
      purpose: "Training Sinhala speech-to-symptom NLP pipelines for low-literacy agricultural diagnosis.",
      classes: "Natural spoken phrases describing yellowing, drying, spindle lesions, brown spots",
      status: "In Collection (Farmer Interviews)"
    },
    {
      id: "ds-6",
      name: "Agricultural Knowledge & Advisory Corpus",
      category: "Advisory / RAG",
      component: "Component 3 (Advisory)",
      source: "IRRI Rice Knowledge Bank, FAO Guidelines, DOA Sri Lanka Recommendations",
      url: "http://www.knowledgebank.irri.org/decision-tools/rice-doctor",
      purpose: "Domain grounding for the RAG semantic vector database and deterministic treatment rule engine.",
      classes: "Chemical formulations, biological biocontrols, cultural practices, dosage tables",
      status: "Curated Knowledge Base"
    }
  ],

  // Milestones matching Slide 11
  milestones: [
    {
      id: "m1",
      number: "01",
      name: "Project Proposal",
      assessment: "Proposal Assessment & Defense",
      status: "Completed",
      date: "March 2026",
      marksAllocated: "To be updated",
      marksAwarded: "To be updated",
      description: "Submission of comprehensive project proposal reports, individual component research scopes, system architecture design, literature survey, and defense before the academic review committee.",
      deliverables: ["Project Proposal Report", "Proposal Presentation Slides", "Work Breakdown Structure (WBS)", "Gantt Timeline"],
      relatedDocs: ["R26-SE-015_Proposal_Report.pdf", "R26-SE-015_Proposal_Slides.pdf"]
    },
    {
      id: "m2",
      number: "02",
      name: "Progress Presentation 1",
      assessment: "Progress Review 1 (PP1)",
      status: "Upcoming",
      date: "To be updated",
      marksAllocated: "To be updated",
      marksAwarded: "Pending evaluation",
      description: "Evaluation of initial dataset curation, data augmentation pipelines, baseline CNN and NLP architecture implementations, initial OOD threshold explorations, and vector store structuring.",
      deliverables: ["PP1 Progress Report", "SE Checklist 1 - Git Repository Verification", "Baseline Model Checkpoints", "Review Slides"],
      relatedDocs: ["R26-SE-015_Progress_1_Report.pdf", "R26-SE-015_Checklist_1.pdf"]
    },
    {
      id: "m3",
      number: "03",
      name: "Progress Presentation 2",
      assessment: "Progress Review 2 (PP2)",
      status: "Upcoming",
      date: "To be updated",
      marksAllocated: "To be updated",
      marksAwarded: "Pending evaluation",
      description: "Review of end-to-end component integration, OOD calibration, Grad-CAM explainability, UI/UX demo video verification, deployment reports, and preliminary field testing.",
      deliverables: ["PP2 Progress Report", "SE Checklist 2 - UI/UX Demo Video", "SE Checklist 3 - Deployment Report", "Review Slides"],
      relatedDocs: ["R26-SE-015_Progress_2_Report.pdf", "R26-SE-015_Checklist_2.pdf", "R26-SE-015_Checklist_3.pdf"]
    },
    {
      id: "m4",
      number: "04",
      name: "Final Assessment",
      assessment: "Final Dissertation & Code Submission",
      status: "Pending",
      date: "To be updated",
      marksAllocated: "To be updated",
      marksAwarded: "Pending evaluation",
      description: "Submission of the final research thesis, comprehensive experimental results, statistical comparisons across all four components, complete production codebase, and deployment documentation.",
      deliverables: ["Final Research Dissertation (Main + 4 Component Reports)", "Source Codebase & Docker Containers", "User Manual & Deployment Guide"],
      relatedDocs: ["R26-SE-015_Final_Dissertation.pdf"]
    },
    {
      id: "m5",
      number: "05",
      name: "Viva Voce",
      assessment: "Final Oral Defense & System Demonstration",
      status: "Pending",
      date: "To be updated",
      marksAllocated: "To be updated",
      marksAwarded: "Pending evaluation",
      description: "Rigorous oral defense of the research contributions before internal and external examiners, live demonstration of multimodal capabilities, OOD rejection tests, and academic query defense.",
      deliverables: ["Final Defense Slide Deck", "Live System Demonstration", "Research Logbook Verification"],
      relatedDocs: ["R26-SE-015_Viva_Slides.pdf"]
    }
  ],

  // Documents matching Slide 12 + SE Checklists Image
  documents: [
    {
      id: "doc-1",
      title: "Project Charter (R26-SE-015)",
      code: "SE-CHARTER-01",
      category: "Project Charter",
      description: "Official project charter outlining scope statement, objectives, stakeholder matrix, constraints, and twelve-month milestones approved by SLIIT.",
      author: "PaddyGuard AI Research Team",
      fileUrl: "",
      status: "To be updated"
    },
    {
      id: "doc-2",
      title: "Consolidated Project Proposal Document",
      code: "SE-PROP-MAIN",
      category: "Proposal Document",
      description: "Consolidated research proposal document encompassing all four intelligent components (Voice, Leaf Disease, Treatment, Pest Detection).",
      author: "PaddyGuard AI Research Team",
      fileUrl: "",
      status: "Available"
    },
    {
      id: "doc-3",
      title: "Proposal Report: Component 1 (Voice-Based Symptom Diagnosis)",
      code: "SE-PROP-C1",
      category: "Proposal Document",
      description: "Research proposal for speech recognition, Sinhala phonetics, TF-IDF symptom feature extraction, and transformer-based NLP disease classification.",
      author: "Keshan B K (IT22303820)",
      fileUrl: "",
      status: "To be updated"
    },
    {
      id: "doc-4",
      title: "Proposal Report: Component 2 (Leaf Disease Classification & OOD)",
      code: "SE-PROP-C2",
      category: "Proposal Document",
      description: "Research proposal detailing CNN architectures, OOD methods (ODIN, Mahalanobis, OpenMax), Grad-CAM, and methodology for leaf disease detection.",
      author: "Hewanayake H.M.L.M (IT22168740)",
      fileUrl: "documents/R26-SE-015_Proposal_Report_C2.pdf",
      status: "Available"
    },
    {
      id: "doc-5",
      title: "Proposal Report: Component 3 (Treatment Advisory & RAG Chatbot)",
      code: "SE-PROP-C3",
      category: "Proposal Document",
      description: "Research proposal detailing knowledge vectorization, RAG conversational chatbot, deterministic rule engine for pesticide validation, and safe dosage calculations.",
      author: "Weerasinghe KGJP (IT22273680)",
      fileUrl: "",
      status: "To be updated"
    },
    {
      id: "doc-6",
      title: "Proposal Report: Component 4 (Rice Pest Detection & OOD)",
      code: "SE-PROP-C4",
      category: "Proposal Document",
      description: "Research proposal detailing rice pest identification using YOLOv8 & CNNs, unknown insect OOD rejection, budget, and commercialization strategies.",
      author: "Kalhara E P K (IT22065858)",
      fileUrl: "documents/R26-SE-015_Proposal_Report_C4.pdf",
      status: "Available"
    },
    {
      id: "doc-7",
      title: "SE - Checklist 1 - By PP1 Presentation - Git Repository",
      code: "SE-CHK-01",
      category: "Check List documents",
      description: "Official software engineering checklist deliverable confirming version control structure, branch policies, and initial microservices commit history.",
      author: "PaddyGuard AI Research Team",
      fileUrl: "",
      status: "To be updated"
    },
    {
      id: "doc-8",
      title: "SE - Checklist 2 - By PP2 Presentation - UI/UX Demo Video",
      code: "SE-CHK-02",
      category: "Check List documents",
      description: "Software engineering checklist deliverable detailing recorded walkthrough demonstration of multimodal UI, voice input, image upload, and advisory responses.",
      author: "PaddyGuard AI Research Team",
      fileUrl: "",
      status: "To be updated"
    },
    {
      id: "doc-9",
      title: "SE - Checklist 3 - By PP2 Presentation - Deployment Report",
      code: "SE-CHK-03",
      category: "Check List documents",
      description: "Software engineering checklist report detailing containerized deployment, FastAPI endpoints, TLS security, and latency profiling under mobile networks.",
      author: "PaddyGuard AI Research Team",
      fileUrl: "",
      status: "To be updated"
    },
    {
      id: "doc-10",
      title: "Final Document: Consolidated Research Dissertation",
      code: "SE-FINAL-MAIN",
      category: "Final Document",
      description: "Main undergraduate dissertation synthesizing all four research streams, empirical benchmarks, statistical comparisons, and future roadmap.",
      author: "PaddyGuard AI Research Team",
      fileUrl: "",
      status: "Pending final submission"
    },
    {
      id: "doc-11",
      title: "Final Document: Component 1 Report (Voice Diagnosis)",
      code: "SE-FINAL-C1",
      category: "Final Document",
      description: "Final specialized technical report covering Sinhala speech recognition, BERT classification, and audio evaluation metrics.",
      author: "Keshan B K (IT22303820)",
      fileUrl: "",
      status: "Pending final submission"
    },
    {
      id: "doc-12",
      title: "Final Document: Component 2 Report (Leaf Disease & OOD)",
      code: "SE-FINAL-C2",
      category: "Final Document",
      description: "Final specialized technical report covering CNN benchmarks, ODIN/OpenMax thresholds, Grad-CAM reviews, and accuracy evaluations.",
      author: "Hewanayake H.M.L.M (IT22168740)",
      fileUrl: "",
      status: "Pending final submission"
    },
    {
      id: "doc-13",
      title: "Final Document: Component 3 Report (Treatment & RAG)",
      code: "SE-FINAL-C3",
      category: "Final Document",
      description: "Final specialized technical report covering RAG pipeline evaluation, deterministic safety verification, and dosage calculation findings.",
      author: "Weerasinghe KGJP (IT22273680)",
      fileUrl: "",
      status: "Pending final submission"
    },
    {
      id: "doc-14",
      title: "Final Document: Component 4 Report (Pest Detection & OOD)",
      code: "SE-FINAL-C4",
      category: "Final Document",
      description: "Final specialized technical report covering YOLOv8 pest detection mAP, unknown insect rejection rates, and field robustness.",
      author: "Kalhara E P K (IT22065858)",
      fileUrl: "",
      status: "Pending final submission"
    }
  ],

  // Presentations matching Slide 13
  presentations: [
    {
      id: "pres-1",
      number: "01",
      title: "Proposal Presentation",
      occasion: "Initial Project Defense & Approval",
      date: "March 2026",
      status: "Completed",
      slidesCount: "28 Slides",
      description: "Initial research defense presenting PaddyGuard AI's multimodal scope across foliar diseases, pests, voice diagnosis, RAG advisory, and OOD necessity.",
      fileUrl: "",
      topics: [
        "Socioeconomic Importance of Paddy in Sri Lanka",
        "Limitations of Closed-World Classifiers (Leaf & Pest)",
        "Four Core Intelligent Modules & Technical Allocations",
        "OOD Techniques: ODIN, Mahalanobis Distance, OpenMax",
        "Design Science Methodology & Gantt Schedule"
      ]
    },
    {
      id: "pres-2",
      number: "02",
      title: "Progress Presentation-1",
      occasion: "Interim Milestone Review 1 (PP1)",
      date: "To be updated",
      status: "Upcoming",
      slidesCount: "To be updated",
      description: "Scheduled defense demonstrating baseline CNN and YOLOv8 training, initial Sinhala speech transcription experiments, and knowledge base vectorization.",
      fileUrl: "",
      topics: [
        "Dataset Preparation (Kaggle benchmarks & local collections)",
        "Comparative Baseline Training (ResNet50 vs EfficientNet vs YOLOv8)",
        "Sinhala Speech Recognition & Keyword Tagging Status",
        "RAG Knowledge Vectorization with FAISS"
      ]
    },
    {
      id: "pres-3",
      number: "03",
      title: "Progress Presentation-2",
      occasion: "Interim Milestone Review 2 (PP2)",
      date: "To be updated",
      status: "Upcoming",
      slidesCount: "To be updated",
      description: "Scheduled defense reviewing end-to-end integration, OOD threshold tuning, Grad-CAM visual verification, UI/UX demo video, and deployment profiling.",
      fileUrl: "",
      topics: [
        "OOD Benchmark Rejection Rates (AUROC, FPR95)",
        "Grad-CAM Lesion Heatmap Evaluation with Agricultural Officers",
        "Deterministic Rule Engine for Safe Pesticide Guidance",
        "SE Checklists 2 & 3 Compliance (UI Video & Deployment Report)"
      ]
    },
    {
      id: "pres-4",
      number: "04",
      title: "Final Presentation (Viva)",
      occasion: "Final Undergraduate Thesis Defense",
      date: "To be updated",
      status: "Pending",
      slidesCount: "To be updated",
      description: "Comprehensive oral defense and live system demonstration across all four components before internal and external examiners.",
      fileUrl: "",
      topics: [
        "Final Multimodal System Evaluation",
        "Empirical Metrics Comparison Across All 4 Modules",
        "Field Usability & Farmer Accessibility Evaluation",
        "Commercialization Roadmap & Intellectual Property Assets"
      ]
    }
  ]
};

Object.freeze(projectData);
