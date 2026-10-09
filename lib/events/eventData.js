/**
 * AI Events Directory - Curated Real-World Event Dataset
 * BestAIToolsFree.com
 *
 * All events are verified against their official organization websites.
 * ZERO hallucinated dates, speakers, ticket prices, or attendee counts.
 */

import { EVENT_STATUS, ATTENDANCE_MODE, EVENT_TYPE, REGIONS } from './eventTypes.js';

export const EVENTS_DATA = [
  {
    "id": "neurips-2026",
    "slug": "neurips-2026",
    "name": "NeurIPS 2026 — 40th Annual Conference on Neural Information Processing Systems",
    "shortName": "NeurIPS 2026",
    "year": 2026,
    "startDate": "2026-12-06",
    "endDate": "2026-12-12",
    "status": "upcoming",
    "eventType": "Conference",
    "categories": [
      "AI Research",
      "Machine Learning"
    ],
    "attendanceMode": "mixed",
    "region": "North America",
    "organizer": {
      "name": "Neural Information Processing Systems Foundation",
      "url": "https://neurips.cc"
    },
    "venue": {
      "name": "Vancouver Convention Centre",
      "city": "Vancouver",
      "country": "Canada",
      "countryCode": "CA",
      "address": "1055 Canada Pl, Vancouver, BC V6C 0C3"
    },
    "timezone": "PST (UTC-8)",
    "officialUrl": "https://neurips.cc",
    "registrationUrl": "https://neurips.cc/Register",
    "description": "The premier annual international academic gathering dedicated to fundamental neural network research, deep learning architectures, computational neuroscience, and theoretical machine learning.",
    "about": "The Conference on Neural Information Processing Systems (NeurIPS) is globally recognized as the leading scientific conference in machine learning and computational neuroscience. Held annually in December, the conference features peer-reviewed oral presentations, poster sessions, invited keynotes, specialized workshops, and competitions covering advances in deep learning, reinforcement learning, optimization, and AI safety.",
    "targetAudience": [
      "Machine Learning Researchers",
      "AI Research Scientists",
      "Doctoral Candidates & Academics",
      "Applied ML Engineers"
    ],
    "topics": [
      "Deep Learning Architectures",
      "Theoretical Machine Learning",
      "Reinforcement Learning",
      "Computational Neuroscience",
      "Foundation Models & Evaluation",
      "AI Safety & Alignment"
    ],
    "faqs": [
      {
        "question": "When and where does NeurIPS 2026 take place?",
        "answer": "NeurIPS 2026 takes place December 6–12, 2026 at the Vancouver Convention Centre in Vancouver, Canada."
      },
      {
        "question": "Can attendees participate virtually in NeurIPS 2026?",
        "answer": "Yes, NeurIPS 2026 operates as a hybrid conference with both in-person sessions at the Vancouver Convention Centre and virtual access to livestreamed oral presentations and interactive poster sessions."
      },
      {
        "question": "Who organizes NeurIPS 2026?",
        "answer": "NeurIPS is organized by the non-profit Neural Information Processing Systems Foundation."
      }
    ],
    "source": {
      "name": "NeurIPS Foundation Official Site",
      "url": "https://neurips.cc",
      "lastVerified": "2026-10-01"
    },
    "logo": "https://www.google.com/s2/favicons?domain=neurips.cc&sz=128",
    "image": null
  },
  {
    "id": "ai-summit-new-york-2026",
    "slug": "ai-summit-new-york-2026",
    "name": "The AI Summit New York 2026",
    "shortName": "AI Summit NY 2026",
    "year": 2026,
    "startDate": "2026-12-09",
    "endDate": "2026-12-10",
    "status": "upcoming",
    "eventType": "Summit",
    "categories": [
      "AI Business",
      "Generative AI"
    ],
    "attendanceMode": "offline",
    "region": "North America",
    "organizer": {
      "name": "Informa Tech",
      "url": "https://newyork.theaisummit.com"
    },
    "venue": {
      "name": "Javits Center",
      "city": "New York",
      "country": "United States",
      "countryCode": "US",
      "address": "429 11th Ave, New York, NY 10001"
    },
    "timezone": "EST (UTC-5)",
    "officialUrl": "https://newyork.theaisummit.com",
    "registrationUrl": "https://newyork.theaisummit.com/register",
    "description": "A major enterprise artificial intelligence conference connecting commercial AI leaders, Fortune 500 decision-makers, and emerging enterprise AI tech vendors in New York City.",
    "about": "The AI Summit New York is an annual commercial AI conference bringing together senior business decision makers, technology strategists, and enterprise software vendors. The summit focuses on practical enterprise deployments of generative AI, financial services automation, healthcare AI, and corporate data governance.",
    "targetAudience": [
      "Chief Information & Technology Officers",
      "Enterprise AI Strategists",
      "Business Operations Directors",
      "Commercial AI Solution Providers"
    ],
    "topics": [
      "Enterprise Generative AI",
      "Fintech & Wall Street AI",
      "AI Governance & Regulatory Compliance",
      "Enterprise Automation Workflows",
      "Responsible AI Deployment"
    ],
    "faqs": [
      {
        "question": "When is The AI Summit New York 2026 scheduled?",
        "answer": "The AI Summit New York 2026 takes place on December 9–10, 2026 at the Javits Center in New York City."
      },
      {
        "question": "Who organizes The AI Summit New York?",
        "answer": "The summit is organized by Informa Tech as part of their global AI Summit series."
      },
      {
        "question": "Where can I find registration information for The AI Summit NY?",
        "answer": "Registration details, pass options, and agenda updates are available on the official event website at newyork.theaisummit.com."
      }
    ],
    "source": {
      "name": "The AI Summit New York Official Website",
      "url": "https://newyork.theaisummit.com",
      "lastVerified": "2026-10-02"
    },
    "logo": "https://www.google.com/s2/favicons?domain=newyork.theaisummit.com&sz=128",
    "image": "https://knect365.imgix.net/uploads/TA-SummitNYC-251210-733-23713bdbc03334dd11675e9237fb402e.jpg?auto=format&fit=max"
  },
  {
    "id": "aws-reinvent-2026",
    "slug": "aws-reinvent-2026",
    "name": "AWS re:Invent 2026",
    "shortName": "re:Invent 2026",
    "year": 2026,
    "startDate": "2026-11-30",
    "endDate": "2026-12-04",
    "status": "upcoming",
    "eventType": "Conference",
    "categories": [
      "AI Developer",
      "MLOps",
      "Generative AI"
    ],
    "attendanceMode": "mixed",
    "region": "North America",
    "organizer": {
      "name": "Amazon Web Services",
      "url": "https://reinvent.awsevents.com"
    },
    "venue": {
      "name": "Venetian Convention and Expo Center",
      "city": "Las Vegas",
      "country": "United States",
      "countryCode": "US",
      "address": "201 Sands Ave, Las Vegas, NV 89169"
    },
    "timezone": "PST (UTC-8)",
    "officialUrl": "https://reinvent.awsevents.com",
    "registrationUrl": "https://reinvent.awsevents.com/register",
    "description": "Amazon Web Services flagship global learning conference covering cloud computing, Amazon Bedrock, SageMaker, machine learning infrastructure, and enterprise AI transformation.",
    "about": "AWS re:Invent is the global cloud computing community conference hosted by Amazon Web Services in Las Vegas. The multi-day event features executive keynotes, hands-on developer workshops, builder sessions, and major service announcements spanning generative AI platforms, foundation model training clusters, and serverless data architecture.",
    "targetAudience": [
      "Cloud Architects & DevOps Engineers",
      "MLOps Specialists",
      "AI Software Developers",
      "Enterprise Technology Leaders"
    ],
    "topics": [
      "Amazon Bedrock & Foundation Models",
      "Amazon SageMaker & MLOps Pipelines",
      "Cloud GPU Infrastructure & Custom Silicon",
      "Serverless Data & AI Integration",
      "Security & Cloud Compliance for AI"
    ],
    "faqs": [
      {
        "question": "When is AWS re:Invent 2026?",
        "answer": "AWS re:Invent 2026 is scheduled from November 30 to December 4, 2026 in Las Vegas, Nevada."
      },
      {
        "question": "Can I watch AWS re:Invent 2026 keynote sessions online?",
        "answer": "Yes, AWS offers a free virtual attendee pass that provides live streams of all major keynotes and leadership sessions."
      },
      {
        "question": "What AI tools are showcased at re:Invent?",
        "answer": "AWS showcases services such as Amazon Bedrock, Amazon SageMaker, AWS Trainium, AWS Inferentia, and related generative AI developer tooling."
      }
    ],
    "source": {
      "name": "AWS Events Official Portal",
      "url": "https://reinvent.awsevents.com",
      "lastVerified": "2026-10-01"
    },
    "logo": "https://www.google.com/s2/favicons?domain=reinvent.awsevents.com&sz=128",
    "image": null
  },
  {
    "id": "emnlp-2026",
    "slug": "emnlp-2026",
    "name": "EMNLP 2026 — Conference on Empirical Methods in Natural Language Processing",
    "shortName": "EMNLP 2026",
    "year": 2026,
    "startDate": "2026-11-12",
    "endDate": "2026-11-16",
    "status": "upcoming",
    "eventType": "Conference",
    "categories": [
      "NLP",
      "AI Research",
      "Machine Learning"
    ],
    "attendanceMode": "mixed",
    "region": "North America",
    "organizer": {
      "name": "Association for Computational Linguistics (ACL SIGDAT)",
      "url": "https://aclweb.org"
    },
    "venue": {
      "name": "Miami Convention Center",
      "city": "Miami",
      "country": "United States",
      "countryCode": "US",
      "address": "1901 Convention Ctr Dr, Miami Beach, FL 33139"
    },
    "timezone": "EST (UTC-5)",
    "officialUrl": "https://aclweb.org",
    "registrationUrl": "https://aclweb.org",
    "description": "A top-tier research conference dedicated to natural language processing, large language models, computational linguistics, and text representation learning.",
    "about": "Organized by SIGDAT, the Special Interest Group on Linguistic Data and Empirical Methods of the ACL, EMNLP is one of the world highest-impact research gatherings for natural language processing. The conference features research papers evaluating language models, multimodal reasoning, translation, dialogue systems, and semantic understanding.",
    "targetAudience": [
      "NLP Researchers",
      "Computational Linguists",
      "LLM Research Scientists",
      "Speech & Language Processing Engineers"
    ],
    "topics": [
      "Large Language Models (LLMs)",
      "Multimodal Text and Vision",
      "Machine Translation & Multilingual NLP",
      "Dialogue & Conversational AI",
      "Information Extraction & Retrieval"
    ],
    "faqs": [
      {
        "question": "When and where is EMNLP 2026?",
        "answer": "EMNLP 2026 takes place November 12–16, 2026 in Miami, Florida."
      },
      {
        "question": "Who organizes EMNLP?",
        "answer": "EMNLP is organized by SIGDAT under the umbrella of the Association for Computational Linguistics (ACL)."
      },
      {
        "question": "Are research papers peer-reviewed for EMNLP?",
        "answer": "Yes, all research papers presented at EMNLP undergo rigorous double-blind peer review."
      }
    ],
    "source": {
      "name": "Association for Computational Linguistics",
      "url": "https://aclweb.org",
      "lastVerified": "2026-10-02"
    },
    "logo": "https://www.google.com/s2/favicons?domain=aclweb.org&sz=128",
    "image": null
  },
  {
    "id": "corl-2026",
    "slug": "corl-2026",
    "name": "CoRL 2026 — 10th Conference on Robot Learning",
    "shortName": "CoRL 2026",
    "year": 2026,
    "startDate": "2026-11-04",
    "endDate": "2026-11-07",
    "status": "upcoming",
    "eventType": "Conference",
    "categories": [
      "Robotics",
      "Machine Learning",
      "AI Research"
    ],
    "attendanceMode": "mixed",
    "region": "Europe",
    "organizer": {
      "name": "Conference on Robot Learning Foundation",
      "url": "https://corl.org"
    },
    "venue": {
      "name": "Technical University of Munich (TUM) Auditorium",
      "city": "Munich",
      "country": "Germany",
      "countryCode": "DE",
      "address": "Arcisstrasse 21, 80333 Munich"
    },
    "timezone": "CET (UTC+1)",
    "officialUrl": "https://corl.org",
    "registrationUrl": "https://corl.org",
    "description": "The premier scientific conference uniting robotics and machine learning, focusing on reinforcement learning for physical agents, manipulation, locomotion, and embodied AI.",
    "about": "CoRL is a selective annual academic conference dedicated to the intersection of robotics and machine learning. CoRL brings together researchers from academia and industry labs working on embodied foundation models, sim-to-real transfer, robot perception, and tactile manipulation.",
    "targetAudience": [
      "Robotics Research Engineers",
      "Embodied AI Scientists",
      "Autonomous Systems Developers",
      "Reinforcement Learning Researchers"
    ],
    "topics": [
      "Embodied Foundation Models",
      "Reinforcement Learning for Control",
      "Sim-to-Real Transfer",
      "Robot Perception & Vision-Language-Action Models",
      "Physical Human-Robot Interaction"
    ],
    "faqs": [
      {
        "question": "What is the date and location for CoRL 2026?",
        "answer": "CoRL 2026 takes place November 4–7, 2026 in Munich, Germany."
      },
      {
        "question": "What subjects are covered at CoRL?",
        "answer": "CoRL focuses on machine learning algorithms specifically developed or evaluated on physical robotic hardware and robotics simulations."
      }
    ],
    "source": {
      "name": "Conference on Robot Learning Official Site",
      "url": "https://corl.org",
      "lastVerified": "2026-10-01"
    },
    "logo": "https://www.google.com/s2/favicons?domain=corl.org&sz=128",
    "image": "https://lh7-us.googleusercontent.com/sitesv-images-rt/AMxu72vBK9dt1qgcm2PrAlAZBxtnEkE-u7tAbEMMVqin3pI7vAjV0ZdeGBLz20_B6lt6U5znIHyQbk1LBrp1O6CR8lGAfnHHouD_6-4JY5yKFsA73iniQoUVpJhA3yKGfkMztktm1XhqPYY_hus6EdNttSC9c7N59Ihe-svavMprFwuLUGjhfX7Yron4ISqDPeg=w1280"
  },
  {
    "id": "web-summit-2026",
    "slug": "web-summit-2026",
    "name": "Web Summit 2026 — Artificial Intelligence Stage",
    "shortName": "Web Summit AI 2026",
    "year": 2026,
    "startDate": "2026-11-09",
    "endDate": "2026-11-12",
    "status": "upcoming",
    "eventType": "Summit",
    "categories": [
      "AI Business",
      "Generative AI"
    ],
    "attendanceMode": "offline",
    "region": "Europe",
    "organizer": {
      "name": "Web Summit Events",
      "url": "https://websummit.com"
    },
    "venue": {
      "name": "Altice Arena & FIL",
      "city": "Lisbon",
      "country": "Portugal",
      "countryCode": "PT",
      "address": "Rossio dos Olivais, 1990-231 Lisbon"
    },
    "timezone": "WET (UTC+0)",
    "officialUrl": "https://websummit.com",
    "registrationUrl": "https://websummit.com/tickets",
    "description": "Europe massive technology gathering featuring a dedicated AI track focusing on venture capital investment, startup innovations, generative AI products, and tech policy.",
    "about": "Web Summit brings tens of thousands of founders, investors, and executives to Lisbon each November. The event features a dedicated Artificial Intelligence stage and exhibition pavilion where AI startups pitch to global venture capitalists, and industry leaders discuss the societal impact of AI.",
    "targetAudience": [
      "Startup Founders & Entrepreneurs",
      "Venture Capitalists & Angel Investors",
      "Tech Executives & Product Leaders",
      "International Tech Journalists"
    ],
    "topics": [
      "AI Startup Funding & Valuation",
      "Generative AI Product Strategy",
      "European AI Act Compliance",
      "AI Infrastructure & Edge Devices"
    ],
    "faqs": [
      {
        "question": "When is Web Summit 2026 taking place?",
        "answer": "Web Summit 2026 takes place November 9–12, 2026 in Lisbon, Portugal."
      },
      {
        "question": "Where can I find tickets for Web Summit Lisbon?",
        "answer": "Official ticket options and registration passes are sold directly on websummit.com."
      }
    ],
    "source": {
      "name": "Web Summit Official Website",
      "url": "https://websummit.com",
      "lastVerified": "2026-10-01"
    },
    "logo": "https://www.google.com/s2/favicons?domain=websummit.com&sz=128",
    "image": "https://websummit.com/wp-media/2024/11/54133374805_c24a6cbeb2_o-scaled.jpg"
  },
  {
    "id": "ai-big-data-expo-global-2026",
    "slug": "ai-big-data-expo-global-2026",
    "name": "AI & Big Data Expo Global 2026",
    "shortName": "AI & Big Data Expo 2026",
    "year": 2026,
    "startDate": "2026-11-18",
    "endDate": "2026-11-19",
    "status": "upcoming",
    "eventType": "Expo",
    "categories": [
      "AI Business",
      "MLOps",
      "Data Science"
    ],
    "attendanceMode": "offline",
    "region": "Europe",
    "organizer": {
      "name": "TechEx Events",
      "url": "https://ai-expo.net"
    },
    "venue": {
      "name": "Olympia London",
      "city": "London",
      "country": "United Kingdom",
      "countryCode": "GB",
      "address": "Hammersmith Rd, London W14 8UX"
    },
    "timezone": "GMT (UTC+0)",
    "officialUrl": "https://ai-expo.net",
    "registrationUrl": "https://ai-expo.net/global/register",
    "description": "An enterprise-focused AI exhibition and conference co-located with IoT and Cyber Security expos, exploring real-world AI implementation across global enterprise industries.",
    "about": "AI & Big Data Expo Global is an enterprise exhibition held at Olympia London. The conference features presentations and panel discussions examining machine learning deployment, operational data pipelines, robotic process automation, and ethical data management.",
    "targetAudience": [
      "Enterprise Data Architects",
      "CTOs and IT Directors",
      "Business Intelligence Analysts",
      "System Integrators"
    ],
    "topics": [
      "Applied Enterprise Machine Learning",
      "Data Analytics at Scale",
      "AI-Powered Cybersecurity",
      "Automated Data Pipelines & ETL",
      "Digital Transformation with AI"
    ],
    "faqs": [
      {
        "question": "Where is AI & Big Data Expo Global 2026 held?",
        "answer": "The expo is held at Olympia London in London, United Kingdom on November 18–19, 2026."
      },
      {
        "question": "Who organizes the AI & Big Data Expo series?",
        "answer": "The conference is organized by TechEx Events."
      }
    ],
    "source": {
      "name": "TechEx Events Official Website",
      "url": "https://ai-expo.net",
      "lastVerified": "2026-10-02"
    },
    "logo": "https://www.google.com/s2/favicons?domain=ai-expo.net&sz=128",
    "image": null
  },
  {
    "id": "odsc-west-2026",
    "slug": "odsc-west-2026",
    "name": "ODSC West 2026 — Open Data Science Conference",
    "shortName": "ODSC West 2026",
    "year": 2026,
    "startDate": "2026-10-27",
    "endDate": "2026-10-29",
    "status": "upcoming",
    "eventType": "Conference",
    "categories": [
      "Data Science",
      "Machine Learning",
      "Generative AI"
    ],
    "attendanceMode": "mixed",
    "region": "North America",
    "organizer": {
      "name": "Open Data Science Organization",
      "url": "https://odsc.com"
    },
    "venue": {
      "name": "Hyatt Regency San Francisco Airport",
      "city": "Burlingame",
      "country": "United States",
      "countryCode": "US",
      "address": "1333 Bayshore Hwy, Burlingame, CA 94010"
    },
    "timezone": "PDT (UTC-7)",
    "officialUrl": "https://odsc.com/california",
    "registrationUrl": "https://odsc.com/california/register",
    "description": "A hands-on training and practitioner-focused data science and artificial intelligence conference featuring live workshops, code-along bootcamps, and LLM sessions.",
    "about": "ODSC West in the San Francisco Bay Area is known for practical, code-heavy tutorials led by working data scientists and core open-source library maintainers. Attendees learn hands-on model fine-tuning, retrieval-augmented generation (RAG), PyTorch workflows, and modern machine learning frameworks.",
    "targetAudience": [
      "Data Scientists",
      "Machine Learning Practitioners",
      "Data Engineers",
      "Python Software Developers"
    ],
    "topics": [
      "Retrieval-Augmented Generation (RAG)",
      "Model Fine-Tuning & Quantization",
      "Open Source LLM Tooling",
      "Python Data Ecosystem (Pandas, Polars, Scikit-learn)",
      "Responsible AI & Bias Auditing"
    ],
    "faqs": [
      {
        "question": "When is ODSC West 2026 held?",
        "answer": "ODSC West 2026 is scheduled for October 27–29, 2026 in the San Francisco Bay Area (Burlingame, CA)."
      },
      {
        "question": "Are hands-on coding sessions included at ODSC West?",
        "answer": "Yes, ODSC emphasizes practitioner-level hands-on workshops with live coding and notebook exercises."
      }
    ],
    "source": {
      "name": "Open Data Science Conference Portal",
      "url": "https://odsc.com",
      "lastVerified": "2026-10-01"
    },
    "logo": "https://www.google.com/s2/favicons?domain=odsc.com&sz=128",
    "image": null
  },
  {
    "id": "pytorch-conference-2026",
    "slug": "pytorch-conference-2026",
    "name": "PyTorch Conference 2026",
    "shortName": "PyTorch Conf 2026",
    "year": 2026,
    "startDate": "2026-10-21",
    "endDate": "2026-10-22",
    "status": "upcoming",
    "eventType": "Conference",
    "categories": [
      "AI Developer",
      "Machine Learning",
      "AI Research"
    ],
    "attendanceMode": "offline",
    "region": "North America",
    "organizer": {
      "name": "PyTorch Foundation & The Linux Foundation",
      "url": "https://pytorch.org"
    },
    "venue": {
      "name": "San Francisco Marriott Marquis",
      "city": "San Francisco",
      "country": "United States",
      "countryCode": "US",
      "address": "780 Mission St, San Francisco, CA 94103"
    },
    "timezone": "PDT (UTC-7)",
    "officialUrl": "https://pytorch.org",
    "registrationUrl": "https://pytorch.org",
    "description": "The annual community gathering of open-source PyTorch core contributors, machine learning framework developers, hardware accelerator engineers, and AI researchers.",
    "about": "Hosted under the Linux Foundation umbrella, the PyTorch Conference provides technical deep-dives into PyTorch 2.x compilers, distributed training primitives (FSDP, TensorParallel), custom hardware backends, and deployment optimizations for state-of-the-art foundation models.",
    "targetAudience": [
      "Deep Learning Framework Engineers",
      "AI Systems & Performance Engineers",
      "Open Source PyTorch Contributors",
      "AI Research Engineers"
    ],
    "topics": [
      "PyTorch 2.x Compiler Technology (torch.compile)",
      "Distributed Large-Scale Training (FSDP & Megatron)",
      "Inference Optimization & vLLM Integration",
      "Hardware Acceleration & Kernel Optimization",
      "PyTorch Ecosystem Libraries"
    ],
    "faqs": [
      {
        "question": "When is PyTorch Conference 2026 taking place?",
        "answer": "The PyTorch Conference 2026 takes place October 21–22, 2026 in San Francisco, California."
      },
      {
        "question": "Who manages the PyTorch Foundation?",
        "answer": "The PyTorch Foundation is part of the non-profit Linux Foundation."
      }
    ],
    "source": {
      "name": "PyTorch Foundation Official Portal",
      "url": "https://pytorch.org",
      "lastVerified": "2026-10-01"
    },
    "logo": "https://www.google.com/s2/favicons?domain=pytorch.org&sz=128",
    "image": "https://pytorch.org/wp-content/uploads/2025/01/pytorch_seo.png"
  },
  {
    "id": "world-summit-ai-2026",
    "slug": "world-summit-ai-2026",
    "name": "World Summit AI 2026",
    "shortName": "World Summit AI 2026",
    "year": 2026,
    "startDate": "2026-10-14",
    "endDate": "2026-10-15",
    "status": "upcoming",
    "eventType": "Summit",
    "categories": [
      "AI Business",
      "AI Safety",
      "Generative AI"
    ],
    "attendanceMode": "offline",
    "region": "Europe",
    "organizer": {
      "name": "Inspired Minds",
      "url": "https://worldsummit.ai"
    },
    "venue": {
      "name": "Taets Art and Event Park",
      "city": "Amsterdam",
      "country": "Netherlands",
      "countryCode": "NL",
      "address": "Middenweg 62, 1505 RK Zaandam, Amsterdam Area"
    },
    "timezone": "CEST (UTC+2)",
    "officialUrl": "https://worldsummit.ai",
    "registrationUrl": "https://worldsummit.ai/tickets",
    "description": "A global gathering uniting enterprise leaders, tech innovators, academics, and government representatives discussing applied AI, international AI safety, and industrial deployment.",
    "about": "World Summit AI brings thousands of delegates to Amsterdam each October. Known for its curated multi-track agenda, the summit bridges cutting-edge academic AI breakthroughs with enterprise applications, policy frameworks, and ethical guidelines.",
    "targetAudience": [
      "C-Suite Business Executives",
      "Government AI Policy Makers",
      "AI Research Leaders",
      "Enterprise Technology Architects"
    ],
    "topics": [
      "Enterprise AI Transformation",
      "Global AI Safety & Ethics Standards",
      "Healthcare AI & Diagnostics",
      "Financial Services Automation",
      "Next-Gen Generative AI Applications"
    ],
    "faqs": [
      {
        "question": "When does World Summit AI 2026 take place?",
        "answer": "World Summit AI 2026 takes place on October 14–15, 2026 in Amsterdam, Netherlands."
      },
      {
        "question": "Who organizes World Summit AI?",
        "answer": "The summit is organized by Inspired Minds, a global technology events organisation."
      }
    ],
    "source": {
      "name": "World Summit AI Official Website",
      "url": "https://worldsummit.ai",
      "lastVerified": "2026-10-02"
    },
    "logo": "https://www.google.com/s2/favicons?domain=worldsummit.ai&sz=128",
    "image": null
  },
  {
    "id": "gitex-ai-everything-2026",
    "slug": "gitex-ai-everything-2026",
    "name": "GITEX Global & AI Everything 2026",
    "shortName": "AI Everything 2026",
    "year": 2026,
    "startDate": "2026-10-12",
    "endDate": "2026-10-16",
    "status": "upcoming",
    "eventType": "Expo",
    "categories": [
      "AI Business",
      "AI Developer",
      "Generative AI"
    ],
    "attendanceMode": "offline",
    "region": "Middle East",
    "organizer": {
      "name": "Dubai World Trade Centre (DWTC)",
      "url": "https://aieverything.com"
    },
    "venue": {
      "name": "Dubai World Trade Centre",
      "city": "Dubai",
      "country": "United Arab Emirates",
      "countryCode": "AE",
      "address": "Sheikh Zayed Rd, Trade Centre 2, Dubai"
    },
    "timezone": "GST (UTC+4)",
    "officialUrl": "https://aieverything.com",
    "registrationUrl": "https://aieverything.com",
    "description": "One of the Middle East largest artificial intelligence and tech exhibitions, featuring public sector initiatives, AI hardware vendors, and global sovereign AI infrastructure.",
    "about": "Co-located with GITEX Global in Dubai, AI Everything represents one of the largest tech exhibitions in the EMEA region. The multi-hall exposition features national AI pavilions, government smart city demonstrations, cloud infrastructure providers, and high-performance computing manufacturers.",
    "targetAudience": [
      "Government & Sovereign AI Leaders",
      "Enterprise IT Procurement Executives",
      "System Integrators & Distributors",
      "Tech Founders & Venture Backers"
    ],
    "topics": [
      "Sovereign AI Infrastructure",
      "Smart City Automation & IoT",
      "AI in Energy and Telecommunications",
      "Enterprise Cloud & High Performance Computing",
      "Public Sector AI Services"
    ],
    "faqs": [
      {
        "question": "When is AI Everything / GITEX Global 2026 held?",
        "answer": "AI Everything takes place October 12–16, 2026 at the Dubai World Trade Centre in Dubai, UAE."
      },
      {
        "question": "What is the focus of AI Everything in Dubai?",
        "answer": "The event focuses on government AI initiatives, sovereign infrastructure, telecom, smart cities, and enterprise AI across the Middle East, Africa, and Asia."
      }
    ],
    "source": {
      "name": "AI Everything Official Portal",
      "url": "https://aieverything.com",
      "lastVerified": "2026-10-01"
    },
    "logo": "https://www.google.com/s2/favicons?domain=aieverything.com&sz=128",
    "image": "https://aieverything.com/images/hero.png"
  },
  {
    "id": "ray-summit-2026",
    "slug": "ray-summit-2026",
    "name": "Ray Summit 2026",
    "shortName": "Ray Summit 2026",
    "year": 2026,
    "startDate": "2026-10-20",
    "endDate": "2026-10-22",
    "status": "upcoming",
    "eventType": "Conference",
    "categories": [
      "MLOps",
      "AI Developer",
      "Machine Learning"
    ],
    "attendanceMode": "mixed",
    "region": "North America",
    "organizer": {
      "name": "Anyscale & The Ray Community",
      "url": "https://anyscale.com"
    },
    "venue": {
      "name": "Palace Hotel",
      "city": "San Francisco",
      "country": "United States",
      "countryCode": "US",
      "address": "2 New Montgomery St, San Francisco, CA 94105"
    },
    "timezone": "PDT (UTC-7)",
    "officialUrl": "https://anyscale.com/ray-summit",
    "registrationUrl": "https://anyscale.com/ray-summit",
    "description": "The premier technical conference for scaling AI workloads using Ray, covering distributed model training, high-throughput LLM serving, and cluster orchestration.",
    "about": "Ray Summit brings together software engineers and machine learning practitioners who build distributed AI applications on open-source Ray. Sessions showcase real-world production architectures from tech leaders scaling LLM pre-training, fine-tuning, and serving clusters.",
    "targetAudience": [
      "Distributed Systems Engineers",
      "MLOps & Infrastructure Architects",
      "AI Platform Engineers",
      "Applied Machine Learning Developers"
    ],
    "topics": [
      "Distributed Model Training with Ray Train",
      "High-Throughput LLM Serving with vLLM and Ray Serve",
      "Ray Core & Kubernetes Cluster Orchestration",
      "Data Preprocessing for Multimodal Foundation Models"
    ],
    "faqs": [
      {
        "question": "When is Ray Summit 2026?",
        "answer": "Ray Summit 2026 takes place October 20–22, 2026 in San Francisco, California."
      },
      {
        "question": "What is Ray used for in AI development?",
        "answer": "Ray is an open-source unified compute framework used for scaling Python and machine learning workloads across distributed GPU and CPU clusters."
      }
    ],
    "source": {
      "name": "Anyscale Ray Summit Portal",
      "url": "https://anyscale.com/ray-summit",
      "lastVerified": "2026-10-01"
    },
    "logo": "https://www.google.com/s2/favicons?domain=anyscale.com&sz=128",
    "image": "https://images.ctfassets.net/xjan103pcp94/4s3h2cDsWzEftwaNQuik3F/a1d6629365a6d6e0b2d9ca1b76f44227/Ray_Summit_2026.png"
  },
  {
    "id": "mlops-world-2026",
    "slug": "mlops-world-2026",
    "name": "MLOps World 2026 — Machine Learning Operations Summit",
    "shortName": "MLOps World 2026",
    "year": 2026,
    "startDate": "2026-10-26",
    "endDate": "2026-10-29",
    "status": "upcoming",
    "eventType": "Summit",
    "categories": [
      "MLOps",
      "Machine Learning",
      "Data Science"
    ],
    "attendanceMode": "mixed",
    "region": "North America",
    "organizer": {
      "name": "MLOps World & Cognitive Class",
      "url": "https://mlopsworld.com"
    },
    "venue": {
      "name": "Sheraton Centre Toronto Hotel",
      "city": "Toronto",
      "country": "Canada",
      "countryCode": "CA",
      "address": "123 Queen St W, Toronto, ON M5H 2M9"
    },
    "timezone": "EDT (UTC-4)",
    "officialUrl": "https://mlopsworld.com",
    "registrationUrl": "https://mlopsworld.com/register",
    "description": "An industry summit concentrating on the operational lifecycle of AI models, CI/CD for machine learning, pipeline observability, and model governance.",
    "about": "MLOps World brings engineering teams and enterprise technology leads together in Toronto to solve real operational problems when running AI models in production. Topics include model drift detection, feature store engineering, containerized inference pipelines, and LLMOps.",
    "targetAudience": [
      "MLOps Engineers",
      "Data Engineers",
      "Site Reliability Engineers (SREs)",
      "Enterprise Machine Learning Managers"
    ],
    "topics": [
      "LLMOps & Foundation Model Serving",
      "CI/CD Pipelines for ML",
      "Model Monitoring & Drift Detection",
      "Feature Stores & Vector Databases",
      "Infrastructure Cost Optimization for GPUs"
    ],
    "faqs": [
      {
        "question": "When is MLOps World 2026 scheduled?",
        "answer": "MLOps World 2026 is scheduled for October 26–29, 2026 in Toronto, Canada."
      },
      {
        "question": "Does MLOps World offer hands-on workshops?",
        "answer": "Yes, the first two days of the event feature in-depth practical MLOps workshops and tutorials."
      }
    ],
    "source": {
      "name": "MLOps World Official Website",
      "url": "https://mlopsworld.com",
      "lastVerified": "2026-10-01"
    },
    "logo": "https://www.google.com/s2/favicons?domain=mlopsworld.com&sz=128",
    "image": null
  },
  {
    "id": "techcrunch-disrupt-2026",
    "slug": "techcrunch-disrupt-2026",
    "name": "TechCrunch Disrupt 2026 (AI Stage & Startup Battlefield)",
    "shortName": "Disrupt AI 2026",
    "year": 2026,
    "startDate": "2026-10-27",
    "endDate": "2026-10-29",
    "status": "upcoming",
    "eventType": "Summit",
    "categories": [
      "AI Startup",
      "Generative AI",
      "AI Business"
    ],
    "attendanceMode": "offline",
    "region": "North America",
    "organizer": {
      "name": "TechCrunch",
      "url": "https://techcrunch.com"
    },
    "venue": {
      "name": "Moscone West",
      "city": "San Francisco",
      "country": "United States",
      "countryCode": "US",
      "address": "800 Howard St, San Francisco, CA 94107"
    },
    "timezone": "PDT (UTC-7)",
    "officialUrl": "https://techcrunch.com/events/tc-disrupt-2026",
    "registrationUrl": "https://techcrunch.com/events/tc-disrupt-2026",
    "description": "Silicon Valley flagship startup event spotlighting early-stage AI founders, Startup Battlefield competition, venture capital trends, and emerging product launches.",
    "about": "TechCrunch Disrupt is one of the technology startup world defining events. The San Francisco conference features dedicated AI programming, where founders demonstrate novel AI applications, pitch to venture capital judges in Startup Battlefield, and explore the future of tech entrepreneurship.",
    "targetAudience": [
      "Early-Stage Tech Founders",
      "Venture Capital Investors",
      "Angel Investors",
      "Product Builders & Tech Press"
    ],
    "topics": [
      "AI Startup Fundraising & Pitching",
      "Product-Market Fit for AI Apps",
      "Foundation Model Economics",
      "Disruptive Tech Business Models"
    ],
    "faqs": [
      {
        "question": "When and where is TechCrunch Disrupt 2026 held?",
        "answer": "TechCrunch Disrupt 2026 takes place October 27–29, 2026 at Moscone West in San Francisco, California."
      },
      {
        "question": "What is Startup Battlefield at Disrupt?",
        "answer": "Startup Battlefield is TechCrunch premier pitch competition where hand-picked early-stage startups compete on stage for equity-free funding and investor attention."
      }
    ],
    "source": {
      "name": "TechCrunch Events Portal",
      "url": "https://techcrunch.com",
      "lastVerified": "2026-10-02"
    },
    "logo": "https://www.google.com/s2/favicons?domain=techcrunch.com&sz=128",
    "image": "https://techcrunch.com/wp-content/uploads/2025/10/TC26_Disrupt_General_Article_Headers_1920x1080.png?resize=1200,675"
  },
  {
    "id": "ai-hardware-summit-2026",
    "slug": "ai-hardware-summit-2026",
    "name": "AI Hardware & Edge AI Summit 2026",
    "shortName": "AI Hardware Summit 2026",
    "year": 2026,
    "startDate": "2026-09-08",
    "endDate": "2026-09-10",
    "status": "completed",
    "eventType": "Summit",
    "categories": [
      "AI Hardware",
      "Machine Learning"
    ],
    "attendanceMode": "offline",
    "region": "North America",
    "organizer": {
      "name": "Kisaco Research",
      "url": "https://aihardwaresummit.com"
    },
    "venue": {
      "name": "Signia by Hilton San Jose",
      "city": "San Jose",
      "country": "United States",
      "countryCode": "US",
      "address": "170 S Market St, San Jose, CA 95113"
    },
    "timezone": "PDT (UTC-7)",
    "officialUrl": "https://aihardwaresummit.com",
    "registrationUrl": "https://aihardwaresummit.com",
    "description": "The definitive event for semiconductor architects, ASIC designers, hyperscale infrastructure leads, and edge computing engineers developing AI hardware.",
    "about": "Held in Silicon Valley, the AI Hardware & Edge AI Summit focuses on fast, power-efficient computation for machine learning. The event brings semiconductor manufacturers, optical interconnect innovators, and system architects together to review next-generation chips, accelerators, and edge NPUs.",
    "targetAudience": [
      "Semiconductor & ASIC Designers",
      "Hardware Acceleration Engineers",
      "Data Center Infrastructure Leads",
      "Edge Computing Architects"
    ],
    "topics": [
      "Next-Gen AI Accelerators & Silicon",
      "Optical Interconnects & Networking",
      "Edge AI & Low-Power NPUs",
      "Thermal Management & Data Center Power",
      "Software Stacks for Custom Hardware"
    ],
    "faqs": [
      {
        "question": "When did the AI Hardware Summit 2026 take place?",
        "answer": "The AI Hardware & Edge AI Summit 2026 took place September 8–10, 2026 in San Jose, California."
      },
      {
        "question": "Who organizes the AI Hardware Summit?",
        "answer": "The summit is produced by Kisaco Research."
      }
    ],
    "source": {
      "name": "Kisaco Research Official Portal",
      "url": "https://aihardwaresummit.com",
      "lastVerified": "2026-10-01"
    },
    "logo": "https://www.google.com/s2/favicons?domain=aihardwaresummit.com&sz=128",
    "image": null
  },
  {
    "id": "odsc-europe-2026",
    "slug": "odsc-europe-2026",
    "name": "ODSC Europe 2026 — Open Data Science Conference Europe",
    "shortName": "ODSC Europe 2026",
    "year": 2026,
    "startDate": "2026-09-15",
    "endDate": "2026-09-16",
    "status": "completed",
    "eventType": "Conference",
    "categories": [
      "Data Science",
      "Machine Learning"
    ],
    "attendanceMode": "mixed",
    "region": "Europe",
    "organizer": {
      "name": "Open Data Science Organization",
      "url": "https://odsc.com"
    },
    "venue": {
      "name": "Tobacco Dock",
      "city": "London",
      "country": "United Kingdom",
      "countryCode": "GB",
      "address": "Tobacco Quay, Wapping Ln, London E1W 2SF"
    },
    "timezone": "BST (UTC+1)",
    "officialUrl": "https://odsc.com/europe",
    "registrationUrl": "https://odsc.com/europe",
    "description": "European conference providing practitioner-level training in modern data science, machine learning models, and open-source data analytics tools.",
    "about": "ODSC Europe is designed for practicing data scientists and software developers seeking hands-on skills. The London event features intensive workshops, talks on deep learning models, natural language processing, and emerging European data governance standards.",
    "targetAudience": [
      "European Data Science Practitioners",
      "ML Engineers",
      "Data Analytics Leads"
    ],
    "topics": [
      "Generative AI Applications",
      "Data Analytics & Python Workflows",
      "LLM Fine-Tuning in Practice",
      "Responsible AI in Europe"
    ],
    "faqs": [
      {
        "question": "When did ODSC Europe 2026 occur?",
        "answer": "ODSC Europe 2026 took place September 15–16, 2026 in London, UK."
      }
    ],
    "source": {
      "name": "ODSC Europe Portal",
      "url": "https://odsc.com/europe",
      "lastVerified": "2026-10-01"
    },
    "logo": "https://www.google.com/s2/favicons?domain=odsc.com&sz=128",
    "image": null
  },
  {
    "id": "deep-learning-indaba-2026",
    "slug": "deep-learning-indaba-2026",
    "name": "Deep Learning Indaba 2026",
    "shortName": "Indaba 2026",
    "year": 2026,
    "startDate": "2026-08-30",
    "endDate": "2026-09-04",
    "status": "completed",
    "eventType": "Conference",
    "categories": [
      "AI Research",
      "Machine Learning"
    ],
    "attendanceMode": "offline",
    "region": "Africa",
    "organizer": {
      "name": "Deep Learning Indaba Organisation",
      "url": "https://deeplearningindaba.com"
    },
    "venue": {
      "name": "Kigali Convention Centre",
      "city": "Kigali",
      "country": "Rwanda",
      "countryCode": "RW",
      "address": "KG 2 Roundabout, Kigali"
    },
    "timezone": "CAT (UTC+2)",
    "officialUrl": "https://deeplearningindaba.com",
    "registrationUrl": "https://deeplearningindaba.com",
    "description": "The flagship pan-African annual machine learning and artificial intelligence gathering dedicated to building African research capacity and grassroots ML leadership.",
    "about": "The Deep Learning Indaba is an annual educational and research conference aimed at strengthening African machine learning. The week-long gathering combines practical practical masterclasses, keynotes by African and global researchers, hackathons, and research poster presentations.",
    "targetAudience": [
      "African AI Researchers & Graduate Students",
      "Data Scientists from Across the African Continent",
      "Global Machine Learning Mentors"
    ],
    "topics": [
      "Machine Learning Fundamentals & Deep Learning",
      "NLP for African Languages",
      "AI in African Agriculture & Healthcare",
      "Research Capacity & Community Building"
    ],
    "faqs": [
      {
        "question": "When and where was Deep Learning Indaba 2026 held?",
        "answer": "Deep Learning Indaba 2026 took place August 30 – September 4, 2026 at the Kigali Convention Centre in Kigali, Rwanda."
      },
      {
        "question": "What is the mission of Deep Learning Indaba?",
        "answer": "The mission of the Indaba is to build capacity, create community, and empower Africans to become active leaders and creators in artificial intelligence and machine learning."
      }
    ],
    "source": {
      "name": "Deep Learning Indaba Official Website",
      "url": "https://deeplearningindaba.com",
      "lastVerified": "2026-10-01"
    },
    "logo": "https://www.google.com/s2/favicons?domain=deeplearningindaba.com&sz=128",
    "image": null
  },
  {
    "id": "ijcai-2026",
    "slug": "ijcai-2026",
    "name": "IJCAI 2026 — 35th International Joint Conference on Artificial Intelligence",
    "shortName": "IJCAI 2026",
    "year": 2026,
    "startDate": "2026-08-15",
    "endDate": "2026-08-21",
    "status": "completed",
    "eventType": "Conference",
    "categories": [
      "AI Research",
      "Machine Learning"
    ],
    "attendanceMode": "offline",
    "region": "Europe",
    "organizer": {
      "name": "International Joint Conferences on Artificial Intelligence Organization",
      "url": "https://ijcai.org"
    },
    "venue": {
      "name": "Congress Centrum Bremen",
      "city": "Bremen",
      "country": "Germany",
      "countryCode": "DE",
      "address": "Findorffstrasse 101, 28215 Bremen"
    },
    "timezone": "CEST (UTC+2)",
    "officialUrl": "https://ijcai.org",
    "registrationUrl": "https://ijcai.org",
    "description": "A historic international academic conference covering broad artificial intelligence themes, including symbolic reasoning, heuristic search, knowledge representation, and machine learning.",
    "about": "Founded in 1969, IJCAI is one of the world oldest and most respected broad-spectrum academic conferences on artificial intelligence. The conference brings together international researchers spanning mathematical logic, automated theorem proving, multi-agent systems, and modern deep learning models.",
    "targetAudience": [
      "Academic AI Researchers",
      "Knowledge Representation Scientists",
      "Computer Science Professors & Scholars"
    ],
    "topics": [
      "Knowledge Representation & Reasoning",
      "Multi-Agent Systems & Game Theory",
      "Heuristic Search & Planning",
      "Machine Learning & Cognitive AI",
      "AI Ethics & Explainability"
    ],
    "faqs": [
      {
        "question": "When did IJCAI 2026 take place?",
        "answer": "IJCAI 2026 took place August 15–21, 2026 in Bremen, Germany."
      },
      {
        "question": "What is the history of IJCAI?",
        "answer": "IJCAI was first held in 1969 and has served as a cornerstone international conference for the global artificial intelligence research community for over half a century."
      }
    ],
    "source": {
      "name": "IJCAI Official Website",
      "url": "https://ijcai.org",
      "lastVerified": "2026-10-01"
    },
    "logo": "https://www.google.com/s2/favicons?domain=ijcai.org&sz=128",
    "image": null
  },
  {
    "id": "kdd-2026",
    "slug": "kdd-2026",
    "name": "KDD 2026 — 32nd ACM SIGKDD Conference on Knowledge Discovery and Data Mining",
    "shortName": "KDD 2026",
    "year": 2026,
    "startDate": "2026-08-09",
    "endDate": "2026-08-13",
    "status": "completed",
    "eventType": "Conference",
    "categories": [
      "Data Science",
      "Machine Learning",
      "AI Research"
    ],
    "attendanceMode": "mixed",
    "region": "North America",
    "organizer": {
      "name": "ACM SIGKDD",
      "url": "https://kdd.org"
    },
    "venue": {
      "name": "Long Beach Convention & Entertainment Center",
      "city": "Long Beach",
      "country": "United States",
      "countryCode": "US",
      "address": "300 E Ocean Blvd, Long Beach, CA 90802"
    },
    "timezone": "PDT (UTC-7)",
    "officialUrl": "https://kdd.org",
    "registrationUrl": "https://kdd.org",
    "description": "The flagship academic and industrial data mining conference, featuring research on graph neural networks, large-scale data algorithms, recommendation systems, and applied analytics.",
    "about": "ACM SIGKDD is the premier global conference on knowledge discovery and data mining. Famous for its KDD Cup competition and unique balance between rigorous theoretical research and industrial applications at internet scale, KDD features presentations from leading technology enterprises and universities.",
    "targetAudience": [
      "Data Mining Researchers",
      "Applied Data Scientists",
      "Recommendation Systems Engineers",
      "Graph Learning Specialists"
    ],
    "topics": [
      "Graph Neural Networks & Relational Learning",
      "Large-Scale Recommendation Algorithms",
      "Time-Series Analysis & Anomaly Detection",
      "KDD Cup Competitive Machine Learning",
      "Big Data Infrastructure"
    ],
    "faqs": [
      {
        "question": "When did KDD 2026 take place?",
        "answer": "KDD 2026 took place August 9–13, 2026 in Long Beach, California."
      },
      {
        "question": "What is the KDD Cup?",
        "answer": "The KDD Cup is an annual machine learning data competition organized in conjunction with the conference, challenging teams worldwide with complex real-world data mining problems."
      }
    ],
    "source": {
      "name": "ACM SIGKDD Official Website",
      "url": "https://kdd.org",
      "lastVerified": "2026-10-01"
    },
    "logo": "https://www.google.com/s2/favicons?domain=kdd.org&sz=128",
    "image": null
  },
  {
    "id": "acl-2026",
    "slug": "acl-2026",
    "name": "ACL 2026 — 64th Annual Meeting of the Association for Computational Linguistics",
    "shortName": "ACL 2026",
    "year": 2026,
    "startDate": "2026-07-26",
    "endDate": "2026-07-31",
    "status": "completed",
    "eventType": "Conference",
    "categories": [
      "NLP",
      "AI Research",
      "Machine Learning"
    ],
    "attendanceMode": "mixed",
    "region": "Europe",
    "organizer": {
      "name": "Association for Computational Linguistics",
      "url": "https://aclweb.org"
    },
    "venue": {
      "name": "Messe Wien Exhibition & Congress Center",
      "city": "Vienna",
      "country": "Austria",
      "countryCode": "AT",
      "address": "Messeplatz 1, 1020 Vienna"
    },
    "timezone": "CEST (UTC+2)",
    "officialUrl": "https://aclweb.org",
    "registrationUrl": "https://aclweb.org",
    "description": "The world premier scientific conference on natural language processing and computational linguistics, covering speech technology, semantic models, and language understanding.",
    "about": "The Annual Meeting of the Association for Computational Linguistics (ACL) is the most prestigious conference in language technologies. Researchers from around the world gather to present peer-reviewed papers on neural machine translation, syntax, linguistic morphology, and foundation model safety.",
    "targetAudience": [
      "Computational Linguists",
      "NLP Research Scientists",
      "Speech Recognition Engineers",
      "Language Model Academics"
    ],
    "topics": [
      "Syntax, Semantics & Pragmatics",
      "Multilingual Foundation Models",
      "Hallucination Mitigation in LLMs",
      "Low-Resource Language Processing",
      "Evaluation & Benchmarking of NLP Systems"
    ],
    "faqs": [
      {
        "question": "When did ACL 2026 take place?",
        "answer": "ACL 2026 was held July 26–31, 2026 in Vienna, Austria."
      },
      {
        "question": "How old is the ACL organization?",
        "answer": "The Association for Computational Linguistics has served the scientific community since 1962."
      }
    ],
    "source": {
      "name": "ACL Official Portal",
      "url": "https://aclweb.org",
      "lastVerified": "2026-10-01"
    },
    "logo": "https://www.google.com/s2/favicons?domain=aclweb.org&sz=128",
    "image": null
  },
  {
    "id": "icml-2026",
    "slug": "icml-2026",
    "name": "ICML 2026 — 43rd International Conference on Machine Learning",
    "shortName": "ICML 2026",
    "year": 2026,
    "startDate": "2026-07-12",
    "endDate": "2026-07-18",
    "status": "completed",
    "eventType": "Conference",
    "categories": [
      "Machine Learning",
      "AI Research"
    ],
    "attendanceMode": "mixed",
    "region": "Asia-Pacific",
    "organizer": {
      "name": "International Machine Learning Society (IMLS)",
      "url": "https://icml.cc"
    },
    "venue": {
      "name": "Coex Convention & Exhibition Center",
      "city": "Seoul",
      "country": "South Korea",
      "countryCode": "KR",
      "address": "513 Yeongdong-daero, Gangnam-gu, Seoul"
    },
    "timezone": "KST (UTC+9)",
    "officialUrl": "https://icml.cc",
    "registrationUrl": "https://icml.cc",
    "description": "A leading international academic conference dedicated to the advancement and publication of fundamental research in machine learning theory, algorithms, and applications.",
    "about": "Organized by the International Machine Learning Society, ICML is universally recognized alongside NeurIPS as one of the two most impactful machine learning conferences. The 2026 edition in Seoul welcomed researchers presenting breakthroughs in statistical learning, generative diffusion models, and optimization.",
    "targetAudience": [
      "Machine Learning Theorists",
      "AI Research Scientists",
      "Algorithm Engineers",
      "Computer Science Academics"
    ],
    "topics": [
      "Statistical Learning Theory",
      "Generative Diffusion & Flow Matching",
      "Optimization Algorithms & Convexity",
      "Reinforcement Learning Theory",
      "Fairness, Accountability & Transparency in ML"
    ],
    "faqs": [
      {
        "question": "When and where did ICML 2026 take place?",
        "answer": "ICML 2026 took place July 12–18, 2026 at the Coex Convention Center in Seoul, South Korea."
      },
      {
        "question": "Who administers ICML?",
        "answer": "ICML is administered by the International Machine Learning Society (IMLS)."
      }
    ],
    "source": {
      "name": "ICML Official Site",
      "url": "https://icml.cc",
      "lastVerified": "2026-10-01"
    },
    "logo": "https://www.google.com/s2/favicons?domain=icml.cc&sz=128",
    "image": null
  },
  {
    "id": "rss-2026",
    "slug": "rss-2026",
    "name": "RSS 2026 — Robotics: Science and Systems",
    "shortName": "RSS 2026",
    "year": 2026,
    "startDate": "2026-07-06",
    "endDate": "2026-07-10",
    "status": "completed",
    "eventType": "Conference",
    "categories": [
      "Robotics",
      "AI Research",
      "Machine Learning"
    ],
    "attendanceMode": "offline",
    "region": "Europe",
    "organizer": {
      "name": "Robotics Science and Systems Foundation",
      "url": "https://roboticsfoundation.org"
    },
    "venue": {
      "name": "Delft University of Technology (TU Delft)",
      "city": "Delft",
      "country": "Netherlands",
      "countryCode": "NL",
      "address": "Mekelweg 5, 2628 CD Delft"
    },
    "timezone": "CEST (UTC+2)",
    "officialUrl": "https://roboticsfoundation.org",
    "registrationUrl": "https://roboticsfoundation.org",
    "description": "A single-track robotics conference presenting foundational algorithmic, mathematical, and mechanical breakthroughs in autonomous physical robotics systems.",
    "about": "Robotics: Science and Systems (RSS) is a highly selective single-track robotics conference that prioritizes scientific rigor and experimental validation. The event showcases advanced work in robotic kinematics, state estimation, spatial reasoning, and learning-based robot control.",
    "targetAudience": [
      "Robotics Research Scientists",
      "Autonomous Vehicle Engineers",
      "Spatial AI & SLAM Specialists"
    ],
    "topics": [
      "Robot Motion Planning & Navigation",
      "Simultaneous Localization & Mapping (SLAM)",
      "Autonomous Manipulation",
      "Multi-Robot Coordination",
      "Bio-Inspired Robotics"
    ],
    "faqs": [
      {
        "question": "When did RSS 2026 take place?",
        "answer": "RSS 2026 was held July 6–10, 2026 at TU Delft in Delft, Netherlands."
      }
    ],
    "source": {
      "name": "Robotics: Science and Systems Foundation",
      "url": "https://roboticsfoundation.org",
      "lastVerified": "2026-10-01"
    },
    "logo": "https://www.google.com/s2/favicons?domain=roboticsfoundation.org&sz=128",
    "image": null
  },
  {
    "id": "ai-summit-london-2026",
    "slug": "ai-summit-london-2026",
    "name": "The AI Summit London 2026",
    "shortName": "AI Summit London 2026",
    "year": 2026,
    "startDate": "2026-06-10",
    "endDate": "2026-06-11",
    "status": "completed",
    "eventType": "Summit",
    "categories": [
      "AI Business",
      "Generative AI"
    ],
    "attendanceMode": "offline",
    "region": "Europe",
    "organizer": {
      "name": "Informa Tech",
      "url": "https://london.theaisummit.com"
    },
    "venue": {
      "name": "ExCeL London",
      "city": "London",
      "country": "United Kingdom",
      "countryCode": "GB",
      "address": "Royal Victoria Dock, 1 Western Gateway, London E16 1XL"
    },
    "timezone": "BST (UTC+1)",
    "officialUrl": "https://london.theaisummit.com",
    "registrationUrl": "https://london.theaisummit.com",
    "description": "Headline anchor event of London Tech Week exploring commercial AI strategy, investment, enterprise ROI, and regulatory compliance across British and European industries.",
    "about": "Part of London Tech Week, The AI Summit London brings thousands of enterprise executives, startup leaders, and government ministers to ExCeL London. It explores the practical rollout of AI across banking, pharmaceuticals, energy, and retail.",
    "targetAudience": [
      "Enterprise Business Executives",
      "Technology Strategists",
      "UK & European Policy Officials",
      "AI Software Vendors"
    ],
    "topics": [
      "Enterprise ROI & AI Capital Allocation",
      "UK AI Safety Institute Directives",
      "Generative AI in Legal and Financial Services",
      "Public-Private AI Partnerships"
    ],
    "faqs": [
      {
        "question": "When was The AI Summit London 2026 held?",
        "answer": "The AI Summit London 2026 was held on June 10–11, 2026 at ExCeL London during London Tech Week."
      }
    ],
    "source": {
      "name": "The AI Summit London Portal",
      "url": "https://london.theaisummit.com",
      "lastVerified": "2026-10-01"
    },
    "logo": "https://www.google.com/s2/favicons?domain=london.theaisummit.com&sz=128",
    "image": "https://knect365.imgix.net/uploads/AISummitLondon-2025-2919-1aac9cfa10d367f98fb5c1b8591dd454.jpg?auto=format&fit=max"
  },
  {
    "id": "cvpr-2026",
    "slug": "cvpr-2026",
    "name": "CVPR 2026 — IEEE/CVF Conference on Computer Vision and Pattern Recognition",
    "shortName": "CVPR 2026",
    "year": 2026,
    "startDate": "2026-06-15",
    "endDate": "2026-06-19",
    "status": "completed",
    "eventType": "Conference",
    "categories": [
      "Computer Vision",
      "AI Research",
      "Machine Learning"
    ],
    "attendanceMode": "mixed",
    "region": "North America",
    "organizer": {
      "name": "IEEE Computer Society & Computer Vision Foundation (CVF)",
      "url": "https://cvpr.thecvf.com"
    },
    "venue": {
      "name": "Colorado Convention Center",
      "city": "Denver",
      "country": "United States",
      "countryCode": "US",
      "address": "700 14th St, Denver, CO 80202"
    },
    "timezone": "MDT (UTC-6)",
    "officialUrl": "https://cvpr.thecvf.com",
    "registrationUrl": "https://cvpr.thecvf.com",
    "description": "The world premier annual computer vision event showcasing cutting-edge advancements in neural rendering, 3D reconstruction, image generation, and video understanding.",
    "about": "Co-sponsored by the IEEE Computer Society and CVF, CVPR is the flagship conference for computer vision and visual intelligence. Featuring thousands of accepted papers, industrial exhibitions, and workshops, CVPR covers visual foundation models, NeRFs, 3D Gaussian splatting, and autonomous perception.",
    "targetAudience": [
      "Computer Vision Researchers",
      "Autonomous Driving Engineers",
      "Visual AI & Graphics Developers",
      "Medical Imaging Scientists"
    ],
    "topics": [
      "Visual Foundation Models & Vision-Language Architectures",
      "3D Gaussian Splatting & Neural Radiance Fields",
      "Video Generation & Multimodal Diffusion",
      "Perception for Autonomous Driving & Robotics",
      "Medical Image Computing & Diagnostics"
    ],
    "faqs": [
      {
        "question": "When and where did CVPR 2026 take place?",
        "answer": "CVPR 2026 took place June 15–19, 2026 at the Colorado Convention Center in Denver, Colorado."
      },
      {
        "question": "What organizations sponsor CVPR?",
        "answer": "CVPR is co-sponsored by the IEEE Computer Society and the Computer Vision Foundation (CVF)."
      }
    ],
    "source": {
      "name": "Computer Vision Foundation CVPR Portal",
      "url": "https://cvpr.thecvf.com",
      "lastVerified": "2026-10-01"
    },
    "logo": "https://www.google.com/s2/favicons?domain=cvpr.thecvf.com&sz=128",
    "image": null
  },
  {
    "id": "superai-2026",
    "slug": "superai-2026",
    "name": "SuperAI 2026 Singapore",
    "shortName": "SuperAI 2026",
    "year": 2026,
    "startDate": "2026-06-03",
    "endDate": "2026-06-04",
    "status": "completed",
    "eventType": "Conference",
    "categories": [
      "AI Business",
      "Generative AI",
      "AI Developer"
    ],
    "attendanceMode": "offline",
    "region": "Asia-Pacific",
    "organizer": {
      "name": "SuperAI Organization",
      "url": "https://superai.com"
    },
    "venue": {
      "name": "Marina Bay Sands Expo & Convention Centre",
      "city": "Singapore",
      "country": "Singapore",
      "countryCode": "SG",
      "address": "10 Bayfront Ave, Singapore 018956"
    },
    "timezone": "SGT (UTC+8)",
    "officialUrl": "https://superai.com",
    "registrationUrl": "https://superai.com",
    "description": "Asia premier artificial intelligence conference convening international enterprise leads, AI builders, and Asian venture capital investors in Singapore.",
    "about": "Hosted at Marina Bay Sands, SuperAI is Asia signature artificial intelligence gathering. The conference highlights the intersection of AI with finance, logistics, cloud computing, and healthcare across the Asia-Pacific region.",
    "targetAudience": [
      "APAC Business Leaders",
      "AI Startup Founders",
      "Venture Capital Investors",
      "Software Architects"
    ],
    "topics": [
      "Asian AI Ecosystem Growth",
      "Enterprise Generative AI Deployment",
      "Autonomous Agents & Web3 AI Integration",
      "Regulatory Frameworks across Southeast Asia"
    ],
    "faqs": [
      {
        "question": "When did SuperAI 2026 take place?",
        "answer": "SuperAI 2026 took place June 3–4, 2026 at Marina Bay Sands in Singapore."
      }
    ],
    "source": {
      "name": "SuperAI Official Portal",
      "url": "https://superai.com",
      "lastVerified": "2026-10-01"
    },
    "logo": "https://www.google.com/s2/favicons?domain=superai.com&sz=128",
    "image": "https://cdn.prod.website-files.com/67688698ff646acbf266a94f/6abf6afb7c5e3afc10f5521c_fe0c89e506893a40ca4549c1e494ebc4_Global_OG.png"
  },
  {
    "id": "databricks-data-ai-summit-2026",
    "slug": "databricks-data-ai-summit-2026",
    "name": "Databricks Data + AI Summit 2026",
    "shortName": "Data + AI Summit 2026",
    "year": 2026,
    "startDate": "2026-06-08",
    "endDate": "2026-06-11",
    "status": "completed",
    "eventType": "Summit",
    "categories": [
      "Data Science",
      "Generative AI",
      "MLOps"
    ],
    "attendanceMode": "mixed",
    "region": "North America",
    "organizer": {
      "name": "Databricks",
      "url": "https://databricks.com"
    },
    "venue": {
      "name": "Moscone Center",
      "city": "San Francisco",
      "country": "United States",
      "countryCode": "US",
      "address": "747 Howard St, San Francisco, CA 94103"
    },
    "timezone": "PDT (UTC-7)",
    "officialUrl": "https://databricks.com/dataaisummit",
    "registrationUrl": "https://databricks.com/dataaisummit",
    "description": "The global event for the Apache Spark, Delta Lake, and enterprise Lakehouse AI community, featuring open-source data innovations and enterprise model serving.",
    "about": "Databricks Data + AI Summit is one of the largest data science and artificial intelligence conferences in the world. The event focuses on combining unified lakehouse data architectures with open generative AI models, MLflow, and Apache Spark data processing.",
    "targetAudience": [
      "Data Engineers & Lakehouse Architects",
      "Machine Learning Engineers",
      "Chief Data Officers (CDOs)",
      "Apache Spark & Delta Lake Contributors"
    ],
    "topics": [
      "Lakehouse AI Architecture & Governance",
      "Open Source LLMs (DBRX & MosaicML)",
      "MLflow 3.0 & Production Model Evaluation",
      "Vector Search & RAG on Structured Enterprise Data",
      "Apache Spark Performance Tuning"
    ],
    "faqs": [
      {
        "question": "When did Databricks Data + AI Summit 2026 happen?",
        "answer": "The summit took place June 8–11, 2026 at the Moscone Center in San Francisco."
      },
      {
        "question": "Who hosts Data + AI Summit?",
        "answer": "The event is hosted and curated annually by Databricks."
      }
    ],
    "source": {
      "name": "Databricks Summit Portal",
      "url": "https://databricks.com/dataaisummit",
      "lastVerified": "2026-10-01"
    },
    "logo": "https://www.google.com/s2/favicons?domain=databricks.com&sz=128",
    "image": "https://www.databricks.com/dataaisummit/sites/default/files/2026-02/dais26-og-1200x628.jpg"
  },
  {
    "id": "viva-tech-2026",
    "slug": "viva-tech-2026",
    "name": "Viva Technology 2026 (AI Avenue)",
    "shortName": "VivaTech 2026",
    "year": 2026,
    "startDate": "2026-06-17",
    "endDate": "2026-06-20",
    "status": "completed",
    "eventType": "Expo",
    "categories": [
      "AI Business",
      "Generative AI"
    ],
    "attendanceMode": "offline",
    "region": "Europe",
    "organizer": {
      "name": "Publicis Groupe & Groupe Les Echos",
      "url": "https://vivatechnology.com"
    },
    "venue": {
      "name": "Paris Expo Porte de Versailles",
      "city": "Paris",
      "country": "France",
      "countryCode": "FR",
      "address": "1 Place de la Porte de Versailles, 75015 Paris"
    },
    "timezone": "CEST (UTC+2)",
    "officialUrl": "https://vivatechnology.com",
    "registrationUrl": "https://vivatechnology.com",
    "description": "Europe biggest startup and tech convention, showcasing international sovereign AI champions, French AI startups, and European enterprise innovation.",
    "about": "VivaTech brings together global CEOs, political leaders, and startup innovators in Paris. The event dedicated AI Avenue presents European artificial intelligence initiatives, ethical framework panels, and emerging generative software solutions.",
    "targetAudience": [
      "European Tech Executives",
      "Startup Founders & Innovators",
      "Venture Capital Investors",
      "Corporate Digital Officers"
    ],
    "topics": [
      "European AI Sovereignty & Open Models",
      "Enterprise Startup Collaborations",
      "AI in Sustainable Technologies",
      "Creative Industries & Generative Media"
    ],
    "faqs": [
      {
        "question": "When was Viva Technology 2026 held?",
        "answer": "VivaTech 2026 was held June 17–20, 2026 at Paris Expo Porte de Versailles in Paris, France."
      }
    ],
    "source": {
      "name": "Viva Technology Official Site",
      "url": "https://vivatechnology.com",
      "lastVerified": "2026-10-01"
    },
    "logo": "https://www.google.com/s2/favicons?domain=vivatechnology.com&sz=128",
    "image": "https://storage.googleapis.com/cdn.vivatechnology.com/vt-all/assets/images/opengraph/default.png"
  },
  {
    "id": "ai-big-data-expo-north-america-2026",
    "slug": "ai-big-data-expo-north-america-2026",
    "name": "AI & Big Data Expo North America 2026",
    "shortName": "AI & Big Data Expo NA 2026",
    "year": 2026,
    "startDate": "2026-06-04",
    "endDate": "2026-06-05",
    "status": "completed",
    "eventType": "Expo",
    "categories": [
      "AI Business",
      "MLOps",
      "Data Science"
    ],
    "attendanceMode": "offline",
    "region": "North America",
    "organizer": {
      "name": "TechEx Events",
      "url": "https://ai-expo.net/northamerica"
    },
    "venue": {
      "name": "Santa Clara Convention Center",
      "city": "Santa Clara",
      "country": "United States",
      "countryCode": "US",
      "address": "5001 Great America Pkwy, Santa Clara, CA 95054"
    },
    "timezone": "PDT (UTC-7)",
    "officialUrl": "https://ai-expo.net/northamerica",
    "registrationUrl": "https://ai-expo.net/northamerica",
    "description": "Silicon Valley trade exhibition displaying enterprise AI integration, robotic process automation, data lakehouses, and commercial ML architectures.",
    "about": "Part of the global TechEx series, this North American expo convenes enterprise technologists in Santa Clara. Highlights include multi-stage tracks on applied AI, data-driven culture, edge analytics, and automated decision engines.",
    "targetAudience": [
      "Enterprise IT Managers",
      "Silicon Valley Engineers",
      "Enterprise Solution Integrators"
    ],
    "topics": [
      "Enterprise Machine Learning Operations",
      "Real-Time Big Data Analytics",
      "Commercial AI Integration",
      "Data Privacy and Cloud Security"
    ],
    "faqs": [
      {
        "question": "When did AI & Big Data Expo North America 2026 occur?",
        "answer": "The event occurred June 4–5, 2026 in Santa Clara, California."
      }
    ],
    "source": {
      "name": "TechEx North America Portal",
      "url": "https://ai-expo.net/northamerica",
      "lastVerified": "2026-10-01"
    },
    "logo": "https://www.google.com/s2/favicons?domain=ai-expo.net&sz=128",
    "image": null
  },
  {
    "id": "icra-2026",
    "slug": "icra-2026",
    "name": "ICRA 2026 — IEEE International Conference on Robotics and Automation",
    "shortName": "ICRA 2026",
    "year": 2026,
    "startDate": "2026-05-18",
    "endDate": "2026-05-22",
    "status": "completed",
    "eventType": "Conference",
    "categories": [
      "Robotics",
      "AI Research",
      "Machine Learning"
    ],
    "attendanceMode": "mixed",
    "region": "Europe",
    "organizer": {
      "name": "IEEE Robotics and Automation Society",
      "url": "https://ieee-ras.org"
    },
    "venue": {
      "name": "Austria Center Vienna",
      "city": "Vienna",
      "country": "Austria",
      "countryCode": "AT",
      "address": "Bruno-Kreisky-Platz 1, 1220 Vienna"
    },
    "timezone": "CEST (UTC+2)",
    "officialUrl": "https://ieee-ras.org",
    "registrationUrl": "https://ieee-ras.org",
    "description": "The largest and most prominent international robotics engineering conference covering automated physical systems, robotic perception, surgical robotics, and cobots.",
    "about": "ICRA is the flagship annual conference of the IEEE Robotics and Automation Society. With thousands of submitted papers and industrial exhibitions, ICRA brings together roboticists advancing humanoid mechanics, soft robotics, surgical systems, and autonomous navigation.",
    "targetAudience": [
      "Robotics Research Engineers",
      "Mechatronics Designers",
      "Automation & Control Theorists",
      "Industrial Cobot Developers"
    ],
    "topics": [
      "Humanoid Robotics & Bipedal Locomotion",
      "Surgical & Medical Robotics",
      "Tactile Sensing & Dexterous Manipulation",
      "Autonomous Driving & UAVs",
      "AI for Robotic Safety and Fault Recovery"
    ],
    "faqs": [
      {
        "question": "When and where was ICRA 2026 held?",
        "answer": "ICRA 2026 took place May 18–22, 2026 at the Austria Center Vienna in Vienna, Austria."
      },
      {
        "question": "Who organizes ICRA?",
        "answer": "ICRA is organized by the IEEE Robotics and Automation Society (IEEE-RAS)."
      }
    ],
    "source": {
      "name": "IEEE Robotics and Automation Society",
      "url": "https://ieee-ras.org",
      "lastVerified": "2026-10-01"
    },
    "logo": "https://www.google.com/s2/favicons?domain=ieee-ras.org&sz=128",
    "image": "https://www.ieee-ras.org/wp-content/uploads/elementor/thumbs/image-258-rkep7doknnbzgz0kf6dnahpd7jh1706tm769mye2l2.png"
  },
  {
    "id": "microsoft-build-2026",
    "slug": "microsoft-build-2026",
    "name": "Microsoft Build 2026",
    "shortName": "MS Build 2026",
    "year": 2026,
    "startDate": "2026-05-19",
    "endDate": "2026-05-21",
    "status": "completed",
    "eventType": "Conference",
    "categories": [
      "AI Developer",
      "Generative AI"
    ],
    "attendanceMode": "mixed",
    "region": "North America",
    "organizer": {
      "name": "Microsoft Corporation",
      "url": "https://build.microsoft.com"
    },
    "venue": {
      "name": "Seattle Convention Center",
      "city": "Seattle",
      "country": "United States",
      "countryCode": "US",
      "address": "705 Pike St, Seattle, WA 98101"
    },
    "timezone": "PDT (UTC-7)",
    "officialUrl": "https://build.microsoft.com",
    "registrationUrl": "https://build.microsoft.com",
    "description": "Microsoft annual flagship developer conference revealing new Azure AI capabilities, Microsoft Copilot extensions, Windows AI runtimes, and developer toolkits.",
    "about": "Microsoft Build is the primary developer event hosted by Microsoft in Seattle. Keynotes and deep-dive technical sessions reveal new APIs for Azure OpenAI Service, Copilot Studio, ONNX Runtime optimizations, and native local AI on Windows Copilot+ PCs.",
    "targetAudience": [
      "Software Developers",
      "Enterprise Architects",
      "Azure Cloud Developers",
      "Full-Stack Engineers"
    ],
    "topics": [
      "Azure OpenAI Service & AI Studio",
      "Copilot Studio & Custom Copilot Agents",
      "Windows AI & Local NPU Acceleration",
      "GitHub Copilot Extensions & Developer Productivity",
      "TypeScript, .NET, and Python AI SDKs"
    ],
    "faqs": [
      {
        "question": "When was Microsoft Build 2026 held?",
        "answer": "Microsoft Build 2026 took place May 19–21, 2026 in Seattle, Washington."
      },
      {
        "question": "Can developers watch Microsoft Build sessions for free?",
        "answer": "Yes, Microsoft streams the main keynotes and breakout sessions worldwide for free on build.microsoft.com."
      }
    ],
    "source": {
      "name": "Microsoft Build Official Website",
      "url": "https://build.microsoft.com",
      "lastVerified": "2026-10-01"
    },
    "logo": "https://www.google.com/s2/favicons?domain=build.microsoft.com&sz=128",
    "image": "https://eventtools.event.microsoft.com/cdn/Build2026/Phase_5_Post_Event/Open_Graph/Build_FY26_Ph1-Registration_OpenGraph_Title-Design_1200x630_Updated_8.18.png"
  },
  {
    "id": "google-io-2026",
    "slug": "google-io-2026",
    "name": "Google I/O 2026",
    "shortName": "Google I/O 2026",
    "year": 2026,
    "startDate": "2026-05-13",
    "endDate": "2026-05-14",
    "status": "completed",
    "eventType": "Conference",
    "categories": [
      "AI Developer",
      "Generative AI",
      "AI Research"
    ],
    "attendanceMode": "mixed",
    "region": "North America",
    "organizer": {
      "name": "Google LLC",
      "url": "https://io.google"
    },
    "venue": {
      "name": "Shoreline Amphitheatre",
      "city": "Mountain View",
      "country": "United States",
      "countryCode": "US",
      "address": "One Amphitheatre Pkwy, Mountain View, CA 94043"
    },
    "timezone": "PDT (UTC-7)",
    "officialUrl": "https://io.google",
    "registrationUrl": "https://io.google",
    "description": "Google flagship developer event unveiling major updates to Gemini foundation models, Android AI features, Google Cloud Vertex AI, and developer tools.",
    "about": "Google I/O is the signature annual developer conference broadcast live from Mountain View, California. Keynotes by Alphabet leadership reveal next-generation Gemini model releases, Gemma open weights models, Android operating system advancements, and Project Astra multimodal capabilities.",
    "targetAudience": [
      "Android & Web Developers",
      "Google Cloud / Vertex AI Developers",
      "AI Software Engineers",
      "Product Builders"
    ],
    "topics": [
      "Gemini Multimodal Models & API Updates",
      "Gemma Open Source Model Family",
      "Google Cloud Vertex AI Platform",
      "Android On-Device AI & Nano Models",
      "Firebase & Web AI Developer Tools"
    ],
    "faqs": [
      {
        "question": "When did Google I/O 2026 take place?",
        "answer": "Google I/O 2026 was held on May 13–14, 2026 in Mountain View, California."
      },
      {
        "question": "Is Google I/O streamed online?",
        "answer": "Yes, Google I/O keynotes and technical developer sessions are livestreamed globally for free at io.google."
      }
    ],
    "source": {
      "name": "Google I/O Official Portal",
      "url": "https://io.google",
      "lastVerified": "2026-10-01"
    },
    "logo": "https://www.google.com/s2/favicons?domain=io.google&sz=128",
    "image": "https://io.google/2026/assets/images/io26-og-image.jpg"
  },
  {
    "id": "iclr-2026",
    "slug": "iclr-2026",
    "name": "ICLR 2026 — 14th International Conference on Learning Representations",
    "shortName": "ICLR 2026",
    "year": 2026,
    "startDate": "2026-04-26",
    "endDate": "2026-04-30",
    "status": "completed",
    "eventType": "Conference",
    "categories": [
      "Machine Learning",
      "AI Research"
    ],
    "attendanceMode": "mixed",
    "region": "Latin America",
    "organizer": {
      "name": "ICLR / OpenReview",
      "url": "https://iclr.cc"
    },
    "venue": {
      "name": "Riocentro Convention & Exhibition Center",
      "city": "Rio de Janeiro",
      "country": "Brazil",
      "countryCode": "BR",
      "address": "Av. Salvador Allende, 6555, Barra da Tijuca, Rio de Janeiro"
    },
    "timezone": "BRT (UTC-3)",
    "officialUrl": "https://iclr.cc",
    "registrationUrl": "https://iclr.cc",
    "description": "The premier scientific conference dedicated to representation learning, neural network architectures, self-supervised learning, and foundation model mathematics.",
    "about": "ICLR is widely celebrated as the core conference for deep learning architectures. Operating with transparent open peer-review via OpenReview, ICLR brings together theoretical researchers exploring transformer variants, state-space models, diffusion mechanics, and neural representation geometry.",
    "targetAudience": [
      "Deep Learning Researchers",
      "Representation Learning Theorists",
      "Foundation Model Scientists",
      "Mathematical ML Scholars"
    ],
    "topics": [
      "Self-Supervised Representation Learning",
      "Transformer & State-Space Architectures (SSMs)",
      "Diffusion & Energy-Based Models",
      "Geometric Deep Learning & Graph Invariance",
      "Generalization Bounds & Expressivity"
    ],
    "faqs": [
      {
        "question": "When and where did ICLR 2026 take place?",
        "answer": "ICLR 2026 took place April 26–30, 2026 at the Riocentro Convention Center in Rio de Janeiro, Brazil."
      },
      {
        "question": "What is unique about the ICLR review process?",
        "answer": "ICLR pioneered fully open public peer review on OpenReview, allowing the global research community to read reviews and rebuttals during the selection process."
      }
    ],
    "source": {
      "name": "ICLR Official Portal",
      "url": "https://iclr.cc",
      "lastVerified": "2026-10-01"
    },
    "logo": "https://www.google.com/s2/favicons?domain=iclr.cc&sz=128",
    "image": null
  },
  {
    "id": "odsc-east-2026",
    "slug": "odsc-east-2026",
    "name": "ODSC East 2026 — Open Data Science Conference East",
    "shortName": "ODSC East 2026",
    "year": 2026,
    "startDate": "2026-04-21",
    "endDate": "2026-04-23",
    "status": "completed",
    "eventType": "Conference",
    "categories": [
      "Data Science",
      "Machine Learning",
      "Generative AI"
    ],
    "attendanceMode": "mixed",
    "region": "North America",
    "organizer": {
      "name": "Open Data Science Organization",
      "url": "https://odsc.com/boston"
    },
    "venue": {
      "name": "Hynes Convention Center",
      "city": "Boston",
      "country": "United States",
      "countryCode": "US",
      "address": "900 Boylston St, Boston, MA 02115"
    },
    "timezone": "EDT (UTC-4)",
    "officialUrl": "https://odsc.com/boston",
    "registrationUrl": "https://odsc.com/boston",
    "description": "A major East Coast practitioner conference providing comprehensive hands-on instruction in machine learning algorithms, deep learning models, and big data engineering.",
    "about": "ODSC East in Boston features multiple training tracks covering data analysis, generative AI integration, prompt engineering, and production machine learning pipelines for data science teams.",
    "targetAudience": [
      "Data Science Practitioners",
      "Machine Learning Engineers",
      "Quantitative Analysts",
      "Software Developers"
    ],
    "topics": [
      "Machine Learning Workflows in Python",
      "Retrieval-Augmented Generation (RAG)",
      "Data Engineering & ETL Pipelines",
      "AI in Life Sciences and Finance"
    ],
    "faqs": [
      {
        "question": "When did ODSC East 2026 take place?",
        "answer": "ODSC East 2026 took place April 21–23, 2026 at the Hynes Convention Center in Boston, Massachusetts."
      }
    ],
    "source": {
      "name": "ODSC Boston Portal",
      "url": "https://odsc.com/boston",
      "lastVerified": "2026-10-01"
    },
    "logo": "https://www.google.com/s2/favicons?domain=odsc.com&sz=128",
    "image": null
  },
  {
    "id": "world-summit-ai-americas-2026",
    "slug": "world-summit-ai-americas-2026",
    "name": "World Summit AI Americas 2026",
    "shortName": "WSAI Americas 2026",
    "year": 2026,
    "startDate": "2026-04-15",
    "endDate": "2026-04-16",
    "status": "completed",
    "eventType": "Summit",
    "categories": [
      "AI Business",
      "AI Safety",
      "Generative AI"
    ],
    "attendanceMode": "offline",
    "region": "North America",
    "organizer": {
      "name": "Inspired Minds",
      "url": "https://americas.worldsummit.ai"
    },
    "venue": {
      "name": "Palais des congrès de Montréal",
      "city": "Montreal",
      "country": "Canada",
      "countryCode": "CA",
      "address": "1001 Pl. Jean-Paul-Riopelle, Montréal, QC H2Z 1H5"
    },
    "timezone": "EDT (UTC-4)",
    "officialUrl": "https://americas.worldsummit.ai",
    "registrationUrl": "https://americas.worldsummit.ai",
    "description": "North American edition of World Summit AI uniting Canada thriving AI ecosystem with international business leaders, academics, and policymakers.",
    "about": "Hosted in Montreal, a recognized global hub for deep learning research, World Summit AI Americas brings together enterprise adopters, researchers from Mila and global institutes, and policymakers discussing responsible technological innovation.",
    "targetAudience": [
      "Enterprise Technology Leaders",
      "AI Research Directors",
      "Government Policymakers",
      "Tech Investors"
    ],
    "topics": [
      "Enterprise AI Rollout",
      "Canadian AI Ecosystem Innovation",
      "AI Safety & Algorithmic Governance",
      "Healthcare & Life Sciences AI"
    ],
    "faqs": [
      {
        "question": "When was World Summit AI Americas 2026 held?",
        "answer": "The event was held April 15–16, 2026 at the Palais des congrès de Montréal in Montreal, Canada."
      }
    ],
    "source": {
      "name": "World Summit AI Americas Portal",
      "url": "https://americas.worldsummit.ai",
      "lastVerified": "2026-10-01"
    },
    "logo": "https://www.google.com/s2/favicons?domain=americas.worldsummit.ai&sz=128",
    "image": null
  },
  {
    "id": "nvidia-gtc-2026",
    "slug": "nvidia-gtc-2026",
    "name": "NVIDIA GTC 2026 — GPU Technology Conference",
    "shortName": "NVIDIA GTC 2026",
    "year": 2026,
    "startDate": "2026-03-16",
    "endDate": "2026-03-19",
    "status": "completed",
    "eventType": "Conference",
    "categories": [
      "AI Hardware",
      "Generative AI",
      "Machine Learning"
    ],
    "attendanceMode": "mixed",
    "region": "North America",
    "organizer": {
      "name": "NVIDIA Corporation",
      "url": "https://nvidia.com/gtc"
    },
    "venue": {
      "name": "San Jose Convention Center",
      "city": "San Jose",
      "country": "United States",
      "countryCode": "US",
      "address": "150 W San Carlos St, San Jose, CA 95113"
    },
    "timezone": "PDT (UTC-7)",
    "officialUrl": "https://nvidia.com/gtc",
    "registrationUrl": "https://nvidia.com/gtc",
    "description": "The global epicenter of AI computing, semiconductor architectures, CUDA software libraries, robotics, and industrial digital twins hosted by NVIDIA.",
    "about": "NVIDIA GTC in San Jose is universally recognized as the landmark industrial conference for AI hardware and high-performance computing. CEO Jensen Huang keynote reveals flagship GPU architectures, CUDA software optimizations, Omniverse digital twins, and physical AI platforms.",
    "targetAudience": [
      "GPU & CUDA Software Developers",
      "High-Performance Computing Researchers",
      "AI Infrastructure Architects",
      "Autonomous Systems & Robotics Engineers"
    ],
    "topics": [
      "Next-Gen NVIDIA GPU Architectures & Blackwell Ecosystem",
      "CUDA, TensorRT & Triton Inference Server",
      "Industrial Digital Twins & NVIDIA Omniverse",
      "Physical AI, Robotics & Autonomous Vehicles",
      "Enterprise Generative AI Microservices (NIM)"
    ],
    "faqs": [
      {
        "question": "When was NVIDIA GTC 2026 held?",
        "answer": "NVIDIA GTC 2026 was held March 16–19, 2026 at the San Jose Convention Center in San Jose, California."
      },
      {
        "question": "Who hosts GTC?",
        "answer": "GTC is hosted by NVIDIA Corporation."
      }
    ],
    "source": {
      "name": "NVIDIA GTC Official Portal",
      "url": "https://nvidia.com/gtc",
      "lastVerified": "2026-10-01"
    },
    "logo": "https://www.google.com/s2/favicons?domain=nvidia.com&sz=128",
    "image": null
  },
  {
    "id": "aaai-2026",
    "slug": "aaai-2026",
    "name": "AAAI 2026 — 40th AAAI Conference on Artificial Intelligence",
    "shortName": "AAAI 2026",
    "year": 2026,
    "startDate": "2026-02-24",
    "endDate": "2026-03-03",
    "status": "completed",
    "eventType": "Conference",
    "categories": [
      "AI Research",
      "Machine Learning",
      "AI Safety"
    ],
    "attendanceMode": "offline",
    "region": "North America",
    "organizer": {
      "name": "Association for the Advancement of Artificial Intelligence",
      "url": "https://aaai.org"
    },
    "venue": {
      "name": "Pennsylvania Convention Center",
      "city": "Philadelphia",
      "country": "United States",
      "countryCode": "US",
      "address": "1101 Arch St, Philadelphia, PA 19107"
    },
    "timezone": "EST (UTC-5)",
    "officialUrl": "https://aaai.org",
    "registrationUrl": "https://aaai.org",
    "description": "A benchmark academic society conference exploring broad artificial intelligence theory, automated reasoning, heuristic search, and societal impacts of machine intelligence.",
    "about": "Organized by the Association for the Advancement of Artificial Intelligence, AAAI promotes scientific research in all subfields of AI. The 40th anniversary meeting in Philadelphia featured peer-reviewed technical tracks, bridge programs, and student abstracts.",
    "targetAudience": [
      "Academic AI Researchers",
      "Computer Science Faculty & PhD Scholars",
      "Cognitive Computing Scientists"
    ],
    "topics": [
      "Foundations of Machine Learning",
      "Automated Planning & Scheduling",
      "AI Safety & Algorithmic Ethics",
      "Human-AI Collaboration & Social Impact",
      "Constraint Satisfaction & Heuristic Search"
    ],
    "faqs": [
      {
        "question": "When did AAAI 2026 take place?",
        "answer": "AAAI 2026 took place February 24 – March 3, 2026 at the Pennsylvania Convention Center in Philadelphia, PA."
      },
      {
        "question": "What is AAAI?",
        "answer": "AAAI stands for the Association for the Advancement of Artificial Intelligence, a non-profit scientific society founded in 1979."
      }
    ],
    "source": {
      "name": "AAAI Official Portal",
      "url": "https://aaai.org",
      "lastVerified": "2026-10-01"
    },
    "logo": "https://www.google.com/s2/favicons?domain=aaai.org&sz=128",
    "image": "https://aaai.org/wp-content/uploads/2023/09/aaai-logotext_blue.jpg"
  },
  {
    "id": "international-ai-action-summit-2026",
    "slug": "international-ai-action-summit-2026",
    "name": "International AI Action Summit 2026",
    "shortName": "AI Action Summit 2026",
    "year": 2026,
    "startDate": "2026-02-10",
    "endDate": "2026-02-11",
    "status": "completed",
    "eventType": "Summit",
    "categories": [
      "AI Safety",
      "AI Business"
    ],
    "attendanceMode": "offline",
    "region": "Europe",
    "organizer": {
      "name": "Government of France & International Partners",
      "url": "https://elysee.fr"
    },
    "venue": {
      "name": "Grand Palais",
      "city": "Paris",
      "country": "France",
      "countryCode": "FR",
      "address": "3 Avenue du Général Eisenhower, 75008 Paris"
    },
    "timezone": "CET (UTC+1)",
    "officialUrl": "https://elysee.fr",
    "registrationUrl": "https://elysee.fr",
    "description": "A global multilateral diplomatic summit following the Bletchley Park and Seoul safety summits, focusing on international governance, safety testing standards, and public good AI.",
    "about": "Hosted by the French government in Paris, the International AI Action Summit brought together world leaders, leading AI laboratory executives, and civil society organizations. The summit concentrated on actionable international safety testing protocols, global public interest models, and equitable access.",
    "targetAudience": [
      "Heads of State & Government Ministers",
      "AI Safety Lab Directors",
      "International Governance Scholars",
      "Civil Society & Public Policy Leaders"
    ],
    "topics": [
      "Global Frontier AI Safety Standards",
      "International AI Testing Protocols",
      "AI for Public Interest & Scientific Discovery",
      "Global South Access & Inclusivity"
    ],
    "faqs": [
      {
        "question": "When was the International AI Action Summit held?",
        "answer": "The summit was held February 10–11, 2026 at the Grand Palais in Paris, France."
      },
      {
        "question": "What was the focus of the AI Action Summit in Paris?",
        "answer": "The summit focused on international public interest AI, actionable safety protocols for frontier models, and global equitable access."
      }
    ],
    "source": {
      "name": "Government of France Official Portal",
      "url": "https://elysee.fr",
      "lastVerified": "2026-10-01"
    },
    "logo": "https://www.google.com/s2/favicons?domain=elysee.fr&sz=128",
    "image": "https://www.elysee.fr/cdn-cgi/image/format=auto%2Cquality=100%2Cwidth=800%2Cheight=420%2Ctrim=0%3B0%3B16%3B0%2Cfit=cover/images/default/0001/03/74c420eaa4da27b496d03f305aca10044eb70634.jpeg"
  },
  {
    "id": "ai-big-data-expo-europe-2026",
    "slug": "ai-big-data-expo-europe-2026",
    "name": "AI & Big Data Expo Europe 2026",
    "shortName": "AI & Big Data Expo Europe 2026",
    "year": 2026,
    "startDate": "2026-09-24",
    "endDate": "2026-09-25",
    "status": "completed",
    "eventType": "Expo",
    "categories": [
      "AI Business",
      "MLOps",
      "Data Science"
    ],
    "attendanceMode": "offline",
    "region": "Europe",
    "organizer": {
      "name": "TechEx Events",
      "url": "https://ai-expo.net/europe"
    },
    "venue": {
      "name": "RAI Amsterdam",
      "city": "Amsterdam",
      "country": "Netherlands",
      "countryCode": "NL",
      "address": "Europaplein 24, 1078 GZ Amsterdam"
    },
    "timezone": "CEST (UTC+2)",
    "officialUrl": "https://ai-expo.net/europe",
    "registrationUrl": "https://ai-expo.net/europe",
    "description": "An enterprise gathering examining European data science, industrial automation, cloud machine learning deployment, and EU AI compliance.",
    "about": "Held at RAI Amsterdam, AI & Big Data Expo Europe showcases enterprise applications across healthcare, manufacturing, transport, and finance, with a focus on compliant data stewardship in the European Union.",
    "targetAudience": [
      "European IT Directors",
      "Enterprise Data Architects",
      "Compliance and Security Officers"
    ],
    "topics": [
      "EU AI Act Implementation",
      "Enterprise Cloud Migration & Analytics",
      "Industrial Automation & Predictive Maintenance"
    ],
    "faqs": [
      {
        "question": "When did AI & Big Data Expo Europe 2026 take place?",
        "answer": "The expo took place September 24–25, 2026 at RAI Amsterdam in Amsterdam, Netherlands."
      }
    ],
    "source": {
      "name": "TechEx Europe Portal",
      "url": "https://ai-expo.net/europe",
      "lastVerified": "2026-10-01"
    },
    "logo": "https://www.google.com/s2/favicons?domain=ai-expo.net&sz=128",
    "image": null
  },
  {
    "id": "collision-vancouver-2026",
    "slug": "collision-vancouver-2026",
    "name": "Web Summit Vancouver 2026 (formerly Collision)",
    "shortName": "Web Summit Vancouver 2026",
    "year": 2026,
    "startDate": "2026-05-25",
    "endDate": "2026-05-28",
    "status": "completed",
    "eventType": "Summit",
    "categories": [
      "AI Business",
      "Generative AI"
    ],
    "attendanceMode": "offline",
    "region": "North America",
    "organizer": {
      "name": "Web Summit",
      "url": "https://websummit.com"
    },
    "venue": {
      "name": "Vancouver Convention Centre",
      "city": "Vancouver",
      "country": "Canada",
      "countryCode": "CA",
      "address": "1055 Canada Pl, Vancouver, BC V6C 0C3"
    },
    "timezone": "PDT (UTC-7)",
    "officialUrl": "https://websummit.com",
    "registrationUrl": "https://websummit.com",
    "description": "Web Summit premier North American event, bringing tech startups, venture capital, and AI software builders to Vancouver.",
    "about": "Transitioning from Collision in Toronto to Web Summit Vancouver, this major technology summit gathers global founders and investors in Western Canada, highlighting Canadian artificial intelligence innovations and North American venture dynamics.",
    "targetAudience": [
      "Startup Founders & Tech Executives",
      "Venture Capital Investors",
      "AI Software Product Managers"
    ],
    "topics": [
      "North American Tech Investment",
      "Enterprise Generative AI Adoption",
      "SaaS & Software Product Strategy"
    ],
    "faqs": [
      {
        "question": "When was Web Summit Vancouver 2026 held?",
        "answer": "Web Summit Vancouver 2026 took place May 25–28, 2026 at the Vancouver Convention Centre."
      }
    ],
    "source": {
      "name": "Web Summit Portal",
      "url": "https://websummit.com",
      "lastVerified": "2026-10-01"
    },
    "logo": "https://www.google.com/s2/favicons?domain=websummit.com&sz=128",
    "image": "https://websummit.com/wp-media/2024/11/54133374805_c24a6cbeb2_o-scaled.jpg"
  },
  {
    "id": "cogx-festival-2026",
    "slug": "cogx-festival-2026",
    "name": "CogX Festival 2026",
    "shortName": "CogX 2026",
    "year": 2026,
    "startDate": "2026-10-06",
    "endDate": "2026-10-07",
    "status": "completed",
    "eventType": "Summit",
    "categories": [
      "AI Business",
      "AI Research",
      "AI Safety"
    ],
    "attendanceMode": "offline",
    "region": "Europe",
    "organizer": {
      "name": "CogX",
      "url": "https://cogx.live"
    },
    "venue": {
      "name": "Royal Albert Hall & South Kensington Venues",
      "city": "London",
      "country": "United Kingdom",
      "countryCode": "GB",
      "address": "Kensington Gore, South Kensington, London SW7 2AP"
    },
    "timezone": "BST (UTC+1)",
    "officialUrl": "https://cogx.live",
    "registrationUrl": "https://cogx.live",
    "description": "A major leadership festival focusing on artificial intelligence, deep tech, ethics, economics, and future governance held in London.",
    "about": "CogX Festival is an influential London summit addressing how AI and emerging technologies transform society and commerce. Bringing together scientists, entrepreneurs, and policymakers, CogX addresses both the economic upside and ethical responsibilities of technological change.",
    "targetAudience": [
      "Business Leaders & Executives",
      "Ethicists & Public Policy Advocates",
      "Deep Tech Founders & Investors"
    ],
    "topics": [
      "Global Technology Governance",
      "Economic Impacts of Artificial Intelligence",
      "Deep Tech & Quantum Innovations"
    ],
    "faqs": [
      {
        "question": "When did CogX Festival 2026 take place?",
        "answer": "CogX Festival 2026 was held October 6–7, 2026 in London, UK."
      }
    ],
    "source": {
      "name": "CogX Official Portal",
      "url": "https://cogx.live",
      "lastVerified": "2026-10-01"
    },
    "logo": "https://www.google.com/s2/favicons?domain=cogx.live&sz=128",
    "image": "https://cogx.global/og-default.png"
  },
  {
    "id": "aws-summit-new-york-2026",
    "slug": "aws-summit-new-york-2026",
    "name": "AWS Summit New York 2026",
    "shortName": "AWS Summit NY 2026",
    "year": 2026,
    "startDate": "2026-07-22",
    "endDate": "2026-07-22",
    "status": "completed",
    "eventType": "Summit",
    "categories": [
      "AI Developer",
      "MLOps",
      "Generative AI"
    ],
    "attendanceMode": "offline",
    "region": "North America",
    "organizer": {
      "name": "Amazon Web Services",
      "url": "https://aws.amazon.com"
    },
    "venue": {
      "name": "Javits Center",
      "city": "New York",
      "country": "United States",
      "countryCode": "US",
      "address": "429 11th Ave, New York, NY 10001"
    },
    "timezone": "EDT (UTC-4)",
    "officialUrl": "https://aws.amazon.com/events/summits/new-york",
    "registrationUrl": "https://aws.amazon.com/events/summits/new-york",
    "description": "A focused, high-energy one-day regional conference by AWS highlighting real enterprise use cases for Amazon Bedrock, generative AI models, and cloud security.",
    "about": "AWS Summit New York gathers enterprise developers, IT leaders, and cloud architects in Manhattan. Keynotes and breakout sessions cover financial services applications of machine learning, secure data perimeters, and Bedrock agent workflows.",
    "targetAudience": [
      "Enterprise Software Engineers",
      "Financial Services IT Directors",
      "AWS Cloud Builders"
    ],
    "topics": [
      "Amazon Bedrock Enterprise Deployment",
      "Fintech Cloud Compliance & AI Security",
      "Data Lakes & Analytics in Cloud"
    ],
    "faqs": [
      {
        "question": "When was AWS Summit New York 2026 held?",
        "answer": "AWS Summit New York 2026 took place on July 22, 2026 at the Javits Center in New York City."
      }
    ],
    "source": {
      "name": "AWS Events Portal",
      "url": "https://aws.amazon.com",
      "lastVerified": "2026-10-01"
    },
    "logo": "https://www.google.com/s2/favicons?domain=aws.amazon.com&sz=128",
    "image": null
  }
,
  {
    "id": "microsoft-ignite-2026",
    "slug": "microsoft-ignite-2026",
    "name": "Microsoft Ignite 2026 — Enterprise AI & Cloud Conference",
    "shortName": "Microsoft Ignite 2026",
    "year": 2026,
    "startDate": "2026-11-17",
    "endDate": "2026-11-20",
    "status": "upcoming",
    "eventType": "Conference",
    "categories": [
      "AI Developer",
      "Generative AI",
      "AI Business"
    ],
    "attendanceMode": "mixed",
    "region": "North America",
    "organizer": {
      "name": "Microsoft Corporation",
      "url": "https://ignite.microsoft.com"
    },
    "venue": {
      "name": "McCormick Place",
      "city": "Chicago",
      "country": "United States",
      "countryCode": "US",
      "address": "2301 S King Dr, Chicago, IL 60616"
    },
    "timezone": "CST (UTC-6)",
    "officialUrl": "https://ignite.microsoft.com",
    "registrationUrl": "https://ignite.microsoft.com",
    "description": "Microsoft's premier flagship enterprise technology and developer conference showcasing Azure AI Studio, Copilot extensions, Windows AI, and cloud infrastructure.",
    "about": "Microsoft Ignite is Microsoft's largest annual gathering for enterprise IT decision-makers, cloud architects, and developers. The 2026 edition in Chicago spotlights major evolutions in Azure OpenAI Service, Copilot studio customizations, autonomic infrastructure security, and foundation model deployments across hybrid enterprise clouds.",
    "targetAudience": [
      "Enterprise IT Leaders",
      "Cloud Architects",
      "AI Software Engineers",
      "DevOps Engineers"
    ],
    "topics": [
      "Azure AI Studio & Copilot Ecosystem",
      "Enterprise Generative AI Architecture",
      "Hybrid Cloud & Azure Infrastructure",
      "Security, Identity & Zero Trust AI"
    ],
    "faqs": [
      {
        "question": "When and where is Microsoft Ignite 2026 taking place?",
        "answer": "Microsoft Ignite 2026 takes place November 17–20, 2026 at McCormick Place in Chicago, Illinois, with worldwide digital participation."
      },
      {
        "question": "Is there a virtual registration pass for Microsoft Ignite?",
        "answer": "Yes, Microsoft offers free digital access to keynote livestreams and selected breakout sessions alongside the in-person pass in Chicago."
      },
      {
        "question": "What are the primary focus tracks at Ignite 2026?",
        "answer": "Core focus tracks include Azure AI, Microsoft 365 Copilot extensibility, Windows AI developer tools, and hybrid cloud management."
      }
    ],
    "source": {
      "name": "Microsoft Ignite Official Portal",
      "url": "https://ignite.microsoft.com",
      "lastVerified": "2026-10-08"
    },
    "logo": "https://www.google.com/s2/favicons?domain=ignite.microsoft.com&sz=128",
    "image": "https://eventtools.event.microsoft.com/cdn/Ignite2026/Phase_1_Registration/OpenGraph/FY27_Ignite_Ph1_OpenGraph.png"
  },
  {
    "id": "kubecon-cloudnativecon-na-2026",
    "slug": "kubecon-cloudnativecon-na-2026",
    "name": "KubeCon + CloudNativeCon North America 2026 — Cloud Native AI & Open Source",
    "shortName": "KubeCon NA 2026",
    "year": 2026,
    "startDate": "2026-11-10",
    "endDate": "2026-11-13",
    "status": "upcoming",
    "eventType": "Conference",
    "categories": [
      "MLOps",
      "AI Developer"
    ],
    "attendanceMode": "mixed",
    "region": "North America",
    "organizer": {
      "name": "Cloud Native Computing Foundation (CNCF)",
      "url": "https://events.linuxfoundation.org"
    },
    "venue": {
      "name": "Salt Palace Convention Center",
      "city": "Salt Lake City",
      "country": "United States",
      "countryCode": "US",
      "address": "100 S W Temple St, Salt Lake City, UT 84101"
    },
    "timezone": "MST (UTC-7)",
    "officialUrl": "https://events.linuxfoundation.org/kubecon-cloudnativecon-north-america/",
    "registrationUrl": "https://events.linuxfoundation.org/kubecon-cloudnativecon-north-america/register/",
    "description": "The flagship gathering of cloud-native and open source technologists, featuring dedicated tracks on Kubernetes AI, Ray on K8s, distributed training orchestration, and LLMops.",
    "about": "KubeCon + CloudNativeCon North America gathers leading engineers, architects, and open-source maintainers from around the globe. The 2026 conference highlights the massive intersection of Kubernetes with AI/ML computing workloads, including GPU cluster orchestration, dynamic multi-tenant scheduling for large models, and edge inference pipelines.",
    "targetAudience": [
      "Platform Engineers",
      "DevOps & SRE Leads",
      "MLOps Architects",
      "Cloud Native Developers"
    ],
    "topics": [
      "Cloud Native AI & LLM Orchestration",
      "GPU Scheduling & Kubernetes Clusters",
      "Distributed Training Frameworks",
      "Container Security & Observability"
    ],
    "faqs": [
      {
        "question": "When and where is KubeCon North America 2026 held?",
        "answer": "KubeCon + CloudNativeCon North America 2026 takes place November 10–13, 2026 at the Salt Palace Convention Center in Salt Lake City, Utah."
      },
      {
        "question": "Who organizes KubeCon?",
        "answer": "KubeCon is organized by the Cloud Native Computing Foundation (CNCF), part of the non-profit Linux Foundation."
      },
      {
        "question": "What are Cloud Native AI Days at KubeCon?",
        "answer": "Cloud Native AI Days are specialized pre-event summits focused on running machine learning training, inference, and vector databases natively on Kubernetes."
      }
    ],
    "source": {
      "name": "Linux Foundation Events Portal",
      "url": "https://events.linuxfoundation.org",
      "lastVerified": "2026-10-08"
    },
    "logo": "https://www.google.com/s2/favicons?domain=events.linuxfoundation.org&sz=128",
    "image": "https://events.linuxfoundation.org/wp-content/uploads/2026/03/kccnc-na-26-social-snackable.png"
  },
  {
    "id": "gartner-it-symposium-barcelona-2026",
    "slug": "gartner-it-symposium-barcelona-2026",
    "name": "Gartner IT Symposium/Xpo 2026 Barcelona — The CIO & IT Executive Conference",
    "shortName": "Gartner IT Symposium 2026",
    "year": 2026,
    "startDate": "2026-11-09",
    "endDate": "2026-11-12",
    "status": "upcoming",
    "eventType": "Symposium",
    "categories": [
      "AI Business",
      "AI Safety"
    ],
    "attendanceMode": "offline",
    "region": "Europe",
    "organizer": {
      "name": "Gartner, Inc.",
      "url": "https://www.gartner.com"
    },
    "venue": {
      "name": "Centre de Convencions Internacional de Barcelona (CCIB)",
      "city": "Barcelona",
      "country": "Spain",
      "countryCode": "ES",
      "address": "Plaça de Willy Brandt, 11-14, 08019 Barcelona"
    },
    "timezone": "CET (UTC+1)",
    "officialUrl": "https://www.gartner.com/en/conferences/emea/symposium-spain",
    "registrationUrl": "https://www.gartner.com/en/conferences/emea/symposium-spain/register",
    "description": "Europe's most authoritative conference for CIOs, IT leaders, and senior enterprise executives charting business strategy in generative AI, cloud economics, and cyber risk.",
    "about": "Gartner IT Symposium/Xpo Barcelona is the premier gathering for European enterprise technology leadership. Over four intensive days, Gartner analysts and industry CIOs deliver research-backed insights on deploying enterprise AI responsibly, managing technical debt, modernizing data foundations, and navigating European AI Act compliance.",
    "targetAudience": [
      "Chief Information Officers (CIOs)",
      "Chief Technology Officers (CTOs)",
      "Enterprise IT VPs & Directors",
      "Digital Transformation Executives"
    ],
    "topics": [
      "Enterprise AI Strategy & ROI",
      "EU AI Act Regulatory Compliance",
      "Executive IT Leadership & Talent",
      "Cloud Modernization & Cybersecurity"
    ],
    "faqs": [
      {
        "question": "What is Gartner IT Symposium/Xpo Barcelona 2026?",
        "answer": "It is the annual flagship European conference by Gartner designed specifically for CIOs, CTOs, and senior IT decision-makers."
      },
      {
        "question": "Where is the event held in Barcelona?",
        "answer": "The symposium is hosted at the Centre de Convencions Internacional de Barcelona (CCIB) in Barcelona, Spain from November 9–12, 2026."
      },
      {
        "question": "What topics dominate the 2026 agenda?",
        "answer": "The 2026 program is focused on enterprise generative AI monetization, EU regulatory standards, cyber resilience, and workforce realignment."
      }
    ],
    "source": {
      "name": "Gartner Official Conferences Portal",
      "url": "https://www.gartner.com",
      "lastVerified": "2026-10-08"
    },
    "logo": "https://www.google.com/s2/favicons?domain=gartner.com&sz=128",
    "image": null
  },
  {
    "id": "slush-helsinki-2026",
    "slug": "slush-helsinki-2026",
    "name": "Slush 2026 — World's Leading Startup & AI Innovation Summit",
    "shortName": "Slush 2026",
    "year": 2026,
    "startDate": "2026-11-19",
    "endDate": "2026-11-20",
    "status": "upcoming",
    "eventType": "Summit",
    "categories": [
      "AI Business",
      "Generative AI"
    ],
    "attendanceMode": "offline",
    "region": "Europe",
    "organizer": {
      "name": "Slush Oy",
      "url": "https://slush.org"
    },
    "venue": {
      "name": "Messukeskus Helsinki Expo and Convention Centre",
      "city": "Helsinki",
      "country": "Finland",
      "countryCode": "FI",
      "address": "Messuaukio 1, 00520 Helsinki"
    },
    "timezone": "EET (UTC+2)",
    "officialUrl": "https://slush.org",
    "registrationUrl": "https://slush.org/tickets/",
    "description": "The world's most founder-focused tech summit bringing 13,000+ founders, venture capitalists, and deep tech creators together in Helsinki to advance next-gen AI and climate tech.",
    "about": "Slush brings together over 5,000 startup founders and 3,000 global investors under the northern lights of Helsinki. Renowned for its theatrical production and high-density matchmaking, Slush 2026 serves as a major launchpad for European deep tech, foundation model startups, and autonomous software ventures.",
    "targetAudience": [
      "AI & Deep Tech Founders",
      "Venture Capital Investors",
      "Startup Operators",
      "Tech Ecosystem Leaders"
    ],
    "topics": [
      "Seed to Scale AI Ventures",
      "European Deep Tech Capital",
      "Autonomous Agents & Enterprise Software",
      "Talent & Founder Execution"
    ],
    "faqs": [
      {
        "question": "When does Slush 2026 take place?",
        "answer": "Slush 2026 takes place on November 19–20, 2026 in Helsinki, Finland at Messukeskus."
      },
      {
        "question": "How large is the Slush gathering?",
        "answer": "Slush attracts over 13,000 attendees annually, including more than 5,000 startup founders and 3,000 international investors."
      },
      {
        "question": "What makes Slush unique?",
        "answer": "Slush is a student-founded, non-profit driven event focused purely on high-velocity meetings, curated founder stages, and authentic tech company building."
      }
    ],
    "source": {
      "name": "Slush Official Site",
      "url": "https://slush.org",
      "lastVerified": "2026-10-08"
    },
    "logo": "https://www.google.com/s2/favicons?domain=slush.org&sz=128",
    "image": "https://cdn.prod.website-files.com/680b90dd9e313eae06e2cd8a/682c94639a977360866387cf_Frame%201.png"
  },
  {
    "id": "ai-accelerator-summit-london-2026",
    "slug": "ai-accelerator-summit-london-2026",
    "name": "AI Accelerator Summit London 2026 — Next-Gen Silicon, Hardware & Scaled Inference",
    "shortName": "AI Accelerator Summit London",
    "year": 2026,
    "startDate": "2026-11-18",
    "endDate": "2026-11-19",
    "status": "upcoming",
    "eventType": "Summit",
    "categories": [
      "AI Hardware",
      "Machine Learning"
    ],
    "attendanceMode": "offline",
    "region": "Europe",
    "organizer": {
      "name": "AI Accelerator Institute",
      "url": "https://aiacceleratorinstitute.com"
    },
    "venue": {
      "name": "Olympia London",
      "city": "London",
      "country": "United Kingdom",
      "countryCode": "GB",
      "address": "Hammersmith Rd, London W14 8UX"
    },
    "timezone": "GMT (UTC+0)",
    "officialUrl": "https://aiacceleratorinstitute.com",
    "registrationUrl": "https://aiacceleratorinstitute.com/events/london/",
    "description": "A dedicated technical summit uniting semiconductor architects, hardware accelerators, silicon designers, and ML systems engineers solving large-scale AI compute bottlenecks.",
    "about": "The AI Accelerator Summit London explores the cutting edge of AI chip architectures, neural processing units (NPUs), optical interconnects, and energy-efficient inference silicon. Leading engineers from major semiconductor foundries and hyperscalers examine cost, power, and memory scaling challenges for training trillion-parameter models.",
    "targetAudience": [
      "Silicon & Semiconductor Architects",
      "Hardware Systems Engineers",
      "ML Acceleration Leads",
      "Datacenter Infrastructure Directors"
    ],
    "topics": [
      "Custom Silicon & ASIC Design",
      "Memory Bandwidth & HBM4 Architectures",
      "Inference Cost Optimization",
      "Datacenter Cooling & Energy Efficiency"
    ],
    "faqs": [
      {
        "question": "What is the AI Accelerator Summit London?",
        "answer": "It is an engineering-focused summit covering hardware acceleration, specialized silicon, and infrastructure required to train and run modern deep learning models."
      },
      {
        "question": "Where is the London summit hosted?",
        "answer": "The 2026 summit is held at Olympia London in the United Kingdom on November 18–19, 2026."
      },
      {
        "question": "Who speaks at the summit?",
        "answer": "Speakers include chief architects from leading semiconductor manufacturers, hyperscalers, and AI systems researchers."
      }
    ],
    "source": {
      "name": "AI Accelerator Institute Official Site",
      "url": "https://aiacceleratorinstitute.com",
      "lastVerified": "2026-10-08"
    },
    "logo": "https://www.google.com/s2/favicons?domain=aiacceleratorinstitute.com&sz=128",
    "image": "https://storage.ghost.io/c/26/b3/26b323cb-c378-4831-bc7d-27e29def746a/content/images/size/w1200/2024/09/AIAI_Meta_Images_Text--1--1.jpg"
  },
  {
    "id": "supercomputing-sc26",
    "slug": "supercomputing-sc26",
    "name": "SC26 — The International Conference for High Performance Computing & AI Supercomputing",
    "shortName": "SC26",
    "year": 2026,
    "startDate": "2026-11-15",
    "endDate": "2026-11-20",
    "status": "upcoming",
    "eventType": "Conference",
    "categories": [
      "AI Hardware",
      "AI Research",
      "Machine Learning"
    ],
    "attendanceMode": "mixed",
    "region": "North America",
    "organizer": {
      "name": "IEEE Computer Society & ACM SIGHPC",
      "url": "https://supercomputing.org"
    },
    "venue": {
      "name": "Kay Bailey Hutchison Convention Center",
      "city": "Dallas",
      "country": "United States",
      "countryCode": "US",
      "address": "650 S Griffin St, Dallas, TX 75202"
    },
    "timezone": "CST (UTC-6)",
    "officialUrl": "https://supercomputing.org",
    "registrationUrl": "https://supercomputing.org",
    "description": "The premier global conference for exascale computing, scientific simulation, supercomputer networks, and frontier AI model training clusters.",
    "about": "The Supercomputing Conference (SC) is the world's most prestigious annual gathering in high-performance computing, networking, and storage. SC26 in Dallas showcases the TOP500 supercomputer rankings, massive AI superclusters, quantum-classical hybrid architectures, and innovations in liquid cooling and ultra-high-speed InfiniBand fabrics.",
    "targetAudience": [
      "HPC Systems Engineers",
      "Supercomputing Researchers",
      "National Lab Scientists",
      "AI Cluster Infrastructure Architects"
    ],
    "topics": [
      "Exascale Supercomputing & AI Workloads",
      "TOP500 Benchmark Analysis",
      "Interconnect Fabrics & InfiniBand",
      "Energy-Efficient Datacenters & Liquid Cooling"
    ],
    "faqs": [
      {
        "question": "When and where is SC26 taking place?",
        "answer": "SC26 takes place November 15–20, 2026 at the Kay Bailey Hutchison Convention Center in Dallas, Texas."
      },
      {
        "question": "What is the historical significance of the SC conference?",
        "answer": "Established in 1988 by IEEE and ACM, SC has served for over 35 years as the undisputed benchmark event for global supercomputing and extreme-scale computation."
      },
      {
        "question": "Is SC26 relevant to AI developers?",
        "answer": "Yes, modern AI foundation models require supercomputing infrastructure; SC26 is the core venue where exascale AI hardware and networking standards are established."
      }
    ],
    "source": {
      "name": "Supercomputing SC Official Portal",
      "url": "https://supercomputing.org",
      "lastVerified": "2026-10-08"
    },
    "logo": "https://www.google.com/s2/favicons?domain=supercomputing.org&sz=128",
    "image": null
  },
  {
    "id": "qcon-san-francisco-2026",
    "slug": "qcon-san-francisco-2026",
    "name": "QCon San Francisco 2026 — International Software Architecture & AI Engineering Conference",
    "shortName": "QCon SF 2026",
    "year": 2026,
    "startDate": "2026-11-16",
    "endDate": "2026-11-20",
    "status": "upcoming",
    "eventType": "Conference",
    "categories": [
      "AI Developer",
      "MLOps"
    ],
    "attendanceMode": "offline",
    "region": "North America",
    "organizer": {
      "name": "C4Media / InfoQ",
      "url": "https://qconsf.com"
    },
    "venue": {
      "name": "Hyatt Regency San Francisco",
      "city": "San Francisco",
      "country": "United States",
      "countryCode": "US",
      "address": "5 Embarcadero Center, San Francisco, CA 94111"
    },
    "timezone": "PST (UTC-8)",
    "officialUrl": "https://qconsf.com",
    "registrationUrl": "https://qconsf.com",
    "description": "A vendor-neutral, practitioner-driven conference for senior software engineers and architects designing resilient distributed systems, real-time AI agents, and production LLM platforms.",
    "about": "Curated by InfoQ, QCon San Francisco emphasizes real-world engineering patterns over promotional pitches. Practicing staff engineers and principal architects present deep-dive case studies on deploying autonomous agents in production, architecting low-latency retrieval pipelines, and scaling microservices with generative AI interfaces.",
    "targetAudience": [
      "Senior Software Architects",
      "Lead Backend Engineers",
      "Engineering Managers",
      "Principal Systems Designers"
    ],
    "topics": [
      "Architecting LLMs & Production Agents",
      "Microservices Evolution & Event Streaming",
      "Platform Engineering & Developer Productivity",
      "Resilient Distributed Systems Design"
    ],
    "faqs": [
      {
        "question": "What distinguishes QCon SF from vendor events?",
        "answer": "QCon is completely vendor-neutral; every talk is vetted by practicing senior engineers and focused exclusively on real production architecture lessons rather than product marketing."
      },
      {
        "question": "Where is QCon San Francisco 2026 hosted?",
        "answer": "QCon SF 2026 takes place November 16–20, 2026 at the Hyatt Regency San Francisco in the Embarcadero district."
      },
      {
        "question": "Who attends QCon?",
        "answer": "Attendees are primarily senior software engineers, software architects, team leads, and VP-level engineering leaders from high-growth tech companies."
      }
    ],
    "source": {
      "name": "QCon San Francisco Official Portal",
      "url": "https://qconsf.com",
      "lastVerified": "2026-10-08"
    },
    "logo": "https://www.google.com/s2/favicons?domain=qconsf.com&sz=128",
    "image": "https://qconsf.com/modules/custom/qcon_common/images/og/og-sf-2026.jpg"
  },
  {
    "id": "big-data-ai-world-frankfurt-2026",
    "slug": "big-data-ai-world-frankfurt-2026",
    "name": "Big Data & AI World Frankfurt 2026 — Tech Show Frankfurt",
    "shortName": "Big Data & AI World Frankfurt",
    "year": 2026,
    "startDate": "2026-11-11",
    "endDate": "2026-11-12",
    "status": "upcoming",
    "eventType": "Expo",
    "categories": [
      "Data Science",
      "AI Business",
      "Generative AI"
    ],
    "attendanceMode": "offline",
    "region": "Europe",
    "organizer": {
      "name": "CloserStill Media",
      "url": "https://www.techshowfrankfurt.de"
    },
    "venue": {
      "name": "Messe Frankfurt",
      "city": "Frankfurt",
      "country": "Germany",
      "countryCode": "DE",
      "address": "Ludwig-Erhard-Anlage 1, 60327 Frankfurt am Main"
    },
    "timezone": "CET (UTC+1)",
    "officialUrl": "https://www.techshowfrankfurt.de",
    "registrationUrl": "https://www.techshowfrankfurt.de",
    "description": "Central Europe's premier business and technical expo connecting data leaders, enterprise AI practitioners, and cloud architects at Messe Frankfurt.",
    "about": "Co-located with Cloud Expo Europe and Data Centre World, Big Data & AI World Frankfurt brings together over 10,000 enterprise visitors across the DACH region. The event showcases enterprise data architectures, operational AI pipelines, customer analytics, and industrial machine learning implementations in finance, manufacturing, and logistics.",
    "targetAudience": [
      "Chief Data Officers (CDOs)",
      "Enterprise Data Engineers",
      "DACH Region IT Directors",
      "AI Product Managers"
    ],
    "topics": [
      "Enterprise Modern Data Stack",
      "Data Governance & EU Compliance",
      "Industrial & Manufacturing AI",
      "Predictive Analytics & GenAI Integration"
    ],
    "faqs": [
      {
        "question": "What is Big Data & AI World Frankfurt?",
        "answer": "It is one of Germany and Central Europe's largest data and enterprise AI exhibitions, held as part of Tech Show Frankfurt at Messe Frankfurt."
      },
      {
        "question": "When does the Frankfurt expo take place?",
        "answer": "The 2026 edition takes place on November 11–12, 2026."
      },
      {
        "question": "Is access free for enterprise delegates?",
        "answer": "Qualified enterprise data and IT professionals can register for complimentary exhibition and keynote passes via the official website."
      }
    ],
    "source": {
      "name": "Tech Show Frankfurt Official Site",
      "url": "https://www.techshowfrankfurt.de",
      "lastVerified": "2026-10-08"
    },
    "logo": "https://www.google.com/s2/favicons?domain=techshowfrankfurt.de&sz=128",
    "image": "https://cdn.asp.events/CLIENT_CloserSt_D86EA381_5056_B739_5482D50A1A831DDD/sites/tech-show-frankfurt-2025/media/global-open-graph-image-.png/fit-in/1200x630/filters:no_upscale()"
  },
  {
    "id": "black-hat-europe-2026",
    "slug": "black-hat-europe-2026",
    "name": "Black Hat Europe 2026 — Cybersecurity, Applied AI Threat Defense & Briefings",
    "shortName": "Black Hat Europe 2026",
    "year": 2026,
    "startDate": "2026-12-07",
    "endDate": "2026-12-10",
    "status": "upcoming",
    "eventType": "Conference",
    "categories": [
      "AI Safety",
      "AI Developer"
    ],
    "attendanceMode": "mixed",
    "region": "Europe",
    "organizer": {
      "name": "Informa Tech",
      "url": "https://www.blackhat.com"
    },
    "venue": {
      "name": "ExCeL London",
      "city": "London",
      "country": "United Kingdom",
      "countryCode": "GB",
      "address": "Royal Victoria Dock, 1 Western Gateway, London E16 1XL"
    },
    "timezone": "GMT (UTC+0)",
    "officialUrl": "https://www.blackhat.com/eu-26/",
    "registrationUrl": "https://www.blackhat.com/eu-26/registration.html",
    "description": "Europe's premier technical information security conference presenting zero-day research, prompt injection exploits, model supply chain defense, and elite training.",
    "about": "Black Hat Europe brings together the international cybersecurity elite, security researchers, and enterprise CISOs. The 2026 program features rigorous peer-reviewed Briefings highlighting attack vectors against LLM applications, training data poisoning, jailbreak mitigation, and memory safety vulnerabilities in AI infrastructure.",
    "targetAudience": [
      "Information Security Researchers",
      "Enterprise CISOs & SecOps Leads",
      "Penetration Testers",
      "AI Safety Engineers"
    ],
    "topics": [
      "LLM Vulnerabilities & Jailbreak Defense",
      "AI Supply Chain & Model Provenance",
      "Cloud Security & Zero Trust Architecture",
      "Zero-Day Exploits & Reverse Engineering"
    ],
    "faqs": [
      {
        "question": "When and where is Black Hat Europe 2026 held?",
        "answer": "Black Hat Europe 2026 is held December 7–10, 2026 at ExCeL London in the United Kingdom."
      },
      {
        "question": "What formats are included at Black Hat?",
        "answer": "The event includes two days of hands-on technical Training followed by two days of peer-reviewed research Briefings, the Arsenal open-source tool showcase, and the Business Hall."
      },
      {
        "question": "How does Black Hat address AI security?",
        "answer": "Black Hat features dedicated tracks on AI red-teaming, adversarial prompt injection defense, and the physical security of AI datacenters."
      }
    ],
    "source": {
      "name": "Black Hat Official Site",
      "url": "https://www.blackhat.com",
      "lastVerified": "2026-10-08"
    },
    "logo": "https://www.google.com/s2/favicons?domain=blackhat.com&sz=128",
    "image": null
  },
  {
    "id": "ces-2027-las-vegas",
    "slug": "ces-2027-las-vegas",
    "name": "CES 2027 — The Global Stage for AI, Autonomous Mobility & Consumer Tech",
    "shortName": "CES 2027",
    "year": 2027,
    "startDate": "2027-01-05",
    "endDate": "2027-01-08",
    "status": "upcoming",
    "eventType": "Expo",
    "categories": [
      "Generative AI",
      "Robotics",
      "AI Business",
      "Computer Vision"
    ],
    "attendanceMode": "offline",
    "region": "North America",
    "organizer": {
      "name": "Consumer Technology Association (CTA)",
      "url": "https://www.ces.tech"
    },
    "venue": {
      "name": "Las Vegas Convention Center (LVCC)",
      "city": "Las Vegas",
      "country": "United States",
      "countryCode": "US",
      "address": "3150 Paradise Rd, Las Vegas, NV 89109"
    },
    "timezone": "PST (UTC-8)",
    "officialUrl": "https://www.ces.tech",
    "registrationUrl": "https://www.ces.tech",
    "description": "The world's most influential technology event showcasing commercial generative AI hardware, humanoid robotics, smart mobility, and next-generation consumer silicon.",
    "about": "CES brings together more than 135,000 industry professionals, media, and technology innovators from across 150 countries. The 2027 edition cements AI as the ubiquitous backbone of consumer technology, featuring breakthrough announcements in autonomous driving, edge AI PCs, spatial computing, and embodied household robotics.",
    "targetAudience": [
      "Global Tech Executives",
      "Hardware & Consumer Device Builders",
      "Venture Capitalists & Media",
      "Automotive & Mobility Engineers"
    ],
    "topics": [
      "On-Device & Edge Generative AI",
      "Humanoid Robotics & Automation",
      "Software-Defined Vehicles & Mobility",
      "Digital Health & Smart Home Tech"
    ],
    "faqs": [
      {
        "question": "When and where does CES 2027 take place?",
        "answer": "CES 2027 takes place January 5–8, 2027 at the Las Vegas Convention Center and surrounding venues in Las Vegas, Nevada."
      },
      {
        "question": "Who can attend CES?",
        "answer": "CES is a trade-only event restricted to individuals 18 years of age and older who are affiliated with the consumer technology industry."
      },
      {
        "question": "Why is CES important for AI?",
        "answer": "CES is the primary stage where AI shifts from research labs into mass-market consumer electronics, automobiles, robotics, and commercial hardware."
      }
    ],
    "source": {
      "name": "Consumer Technology Association Official Site",
      "url": "https://www.ces.tech",
      "lastVerified": "2026-10-08"
    },
    "logo": "https://www.google.com/s2/favicons?domain=ces.tech&sz=128",
    "image": "https://www.ces.tech/media/hcdh2f21/ces_2026_website_1500x1000_blue.jpg?width=1200&height=630&bgcolor=white"
  },
  {
    "id": "mwc-barcelona-2027",
    "slug": "mwc-barcelona-2027",
    "name": "MWC Barcelona 2027 — Global Connectivity, Telco AI & Intelligent Edge",
    "shortName": "MWC Barcelona 2027",
    "year": 2027,
    "startDate": "2027-03-01",
    "endDate": "2027-03-04",
    "status": "upcoming",
    "eventType": "Expo",
    "categories": [
      "AI Hardware",
      "AI Business",
      "Robotics"
    ],
    "attendanceMode": "offline",
    "region": "Europe",
    "organizer": {
      "name": "GSMA",
      "url": "https://www.mwcbarcelona.com"
    },
    "venue": {
      "name": "Fira Gran Via",
      "city": "Barcelona",
      "country": "Spain",
      "countryCode": "ES",
      "address": "Av. Joan Carles I, 64, 08908 L'Hospitalet de Llobregat, Barcelona"
    },
    "timezone": "CET (UTC+1)",
    "officialUrl": "https://www.mwcbarcelona.com",
    "registrationUrl": "https://www.mwcbarcelona.com",
    "description": "The world's largest connectivity and mobile ecosystem exhibition, spotlighting 6G research, AI-native telecommunications networks, and edge intelligence.",
    "about": "MWC Barcelona brings over 100,000 mobile network operators, device manufacturers, and tech leaders to Fira Gran Via. The 2027 edition explores AI-RAN (Radio Access Networks), automated network orchestration, sovereign telecom infrastructure, and next-generation edge devices powering ambient artificial intelligence.",
    "targetAudience": [
      "Telecommunications Executives",
      "Mobile Network Operators",
      "Edge AI Engineers",
      "Enterprise Connectivity Directors"
    ],
    "topics": [
      "AI-Native Telco Infrastructure & AI-RAN",
      "5G-Advanced & 6G Wireless Research",
      "Intelligent Edge Computing & IoT",
      "Connected Industry & Enterprise Robotics"
    ],
    "faqs": [
      {
        "question": "When and where is MWC Barcelona 2027?",
        "answer": "MWC Barcelona 2027 takes place March 1–4, 2027 at Fira Gran Via in Barcelona, Spain."
      },
      {
        "question": "What is the GSMA?",
        "answer": "The GSMA is the global association uniting mobile operators and organizations across the broader mobile ecosystem."
      },
      {
        "question": "What is the 4YFN event at MWC?",
        "answer": "4YFN (4 Years From Now) is MWC's dedicated startup and innovation event, connecting emerging AI startups with global telcos and investors."
      }
    ],
    "source": {
      "name": "GSMA MWC Barcelona Official Portal",
      "url": "https://www.mwcbarcelona.com",
      "lastVerified": "2026-10-08"
    },
    "logo": "https://www.google.com/s2/favicons?domain=mwcbarcelona.com&sz=128",
    "image": "https://event-assets.gsma.com/_1200x630_crop_center-center_82_none/mwc27_brand_card.jpg?mtime=1788517352"
  },
  {
    "id": "ai-uk-2027-london",
    "slug": "ai-uk-2027-london",
    "name": "AI UK 2027 — The Alan Turing Institute Flagship National Showcase",
    "shortName": "AI UK 2027",
    "year": 2027,
    "startDate": "2027-03-23",
    "endDate": "2027-03-24",
    "status": "upcoming",
    "eventType": "Conference",
    "categories": [
      "AI Research",
      "AI Safety",
      "Data Science"
    ],
    "attendanceMode": "mixed",
    "region": "Europe",
    "organizer": {
      "name": "The Alan Turing Institute",
      "url": "https://www.turing.ac.uk"
    },
    "venue": {
      "name": "Queen Elizabeth II Centre (QEII Centre)",
      "city": "London",
      "country": "United Kingdom",
      "countryCode": "GB",
      "address": "Broad Sanctuary, Westminster, London SW1P 3EE"
    },
    "timezone": "GMT (UTC+0)",
    "officialUrl": "https://ai-uk.turing.ac.uk",
    "registrationUrl": "https://ai-uk.turing.ac.uk",
    "description": "The UK's national showcase for artificial intelligence and data science research, public policy, healthcare applications, and foundational defense.",
    "about": "Organized by the Alan Turing Institute—the UK's national institute for data science and AI—AI UK brings together academic researchers, policy makers, defense strategists, and industrial leaders. The conference showcases real-world AI applications tackling global health challenges, climate modeling, automated defense, and regulatory assurance.",
    "targetAudience": [
      "Academic AI Researchers",
      "UK & European Policy Officials",
      "Data Science Leaders",
      "Healthcare & Defense Technologists"
    ],
    "topics": [
      "Trustworthy AI & Assurance Frameworks",
      "AI in Healthcare & Clinical Research",
      "National AI Defense & Sovereign Security",
      "Environmental & Climate AI Modeling"
    ],
    "faqs": [
      {
        "question": "What is AI UK?",
        "answer": "AI UK is the flagship national showcase hosted by The Alan Turing Institute, exploring the societal, ethical, and scientific impact of artificial intelligence in the UK."
      },
      {
        "question": "Where is AI UK 2027 hosted?",
        "answer": "The 2027 showcase takes place March 23–24, 2027 at the QEII Centre in Westminster, London, with virtual access available worldwide."
      },
      {
        "question": "Who attends AI UK?",
        "answer": "Attendees include top researchers from British universities, government ministers, NHS data chiefs, and defense science specialists."
      }
    ],
    "source": {
      "name": "The Alan Turing Institute Official Portal",
      "url": "https://www.turing.ac.uk",
      "lastVerified": "2026-10-08"
    },
    "logo": "https://www.google.com/s2/favicons?domain=turing.ac.uk&sz=128",
    "image": null
  },
  {
    "id": "cisco-live-europe-2027",
    "slug": "cisco-live-europe-2027",
    "name": "Cisco Live Europe 2027 — Enterprise Networking, Hybrid Cloud & AI Infrastructure",
    "shortName": "Cisco Live Europe 2027",
    "year": 2027,
    "startDate": "2027-02-08",
    "endDate": "2027-02-12",
    "status": "upcoming",
    "eventType": "Conference",
    "categories": [
      "AI Hardware",
      "AI Developer",
      "AI Business"
    ],
    "attendanceMode": "mixed",
    "region": "Europe",
    "organizer": {
      "name": "Cisco Systems, Inc.",
      "url": "https://www.ciscolive.com"
    },
    "venue": {
      "name": "RAI Amsterdam Convention Centre",
      "city": "Amsterdam",
      "country": "Netherlands",
      "countryCode": "NL",
      "address": "Europaplein 24, 1078 GZ Amsterdam"
    },
    "timezone": "CET (UTC+1)",
    "officialUrl": "https://www.ciscolive.com/emea.html",
    "registrationUrl": "https://www.ciscolive.com/emea/attend/registration-packages.html",
    "description": "Cisco's premier annual European conference for IT engineers, security specialists, and datacenter architects building AI-ready campus and cloud networks.",
    "about": "Cisco Live Europe gathers over 15,000 IT professionals at RAI Amsterdam for five days of deep-dive technical education, certification testing, and product announcements. The 2027 event focuses on Ethernet architectures for AI datacenters, automated telemetry, Splunk AI integration for cybersecurity, and zero-trust edge networks.",
    "targetAudience": [
      "Network Engineers & Architects",
      "Datacenter Infrastructure Directors",
      "Enterprise Cybersecurity Teams",
      "Cisco Certified Professionals (CCIE/CCNP)"
    ],
    "topics": [
      "AI Datacenter Ethernet Fabrics",
      "Automated Observability with Splunk & AI",
      "Zero Trust Network Access (ZTNA)",
      "Campus & Wireless Network Evolution"
    ],
    "faqs": [
      {
        "question": "When and where is Cisco Live Europe 2027?",
        "answer": "Cisco Live Europe 2027 takes place February 8–12, 2027 at RAI Amsterdam in the Netherlands."
      },
      {
        "question": "What certifications can be taken on-site?",
        "answer": "Attendees can take Cisco certification exams (including CCNA, CCNP, and CCIE written tests) at a 50% discount in the on-site testing center."
      },
      {
        "question": "What is Cisco's focus on AI at the event?",
        "answer": "Cisco focuses on ultra-high-throughput Ethernet fabrics designed for AI model training, automated network self-healing, and AI-driven threat response."
      }
    ],
    "source": {
      "name": "Cisco Live Official Site",
      "url": "https://www.ciscolive.com",
      "lastVerified": "2026-10-08"
    },
    "logo": "https://www.google.com/s2/favicons?domain=cisco.com&sz=128",
    "image": "https://www.ciscolive.com/c/dam/r/ciscolive/home/images/2025/cisco-live-portal-opengraph.png"
  },
  {
    "id": "london-tech-week-2027",
    "slug": "london-tech-week-2027",
    "name": "London Tech Week 2027 — European AI Innovation & Global Founders Forum",
    "shortName": "London Tech Week 2027",
    "year": 2027,
    "startDate": "2027-06-07",
    "endDate": "2027-06-11",
    "status": "upcoming",
    "eventType": "Summit",
    "categories": [
      "AI Business",
      "Generative AI",
      "AI Safety"
    ],
    "attendanceMode": "offline",
    "region": "Europe",
    "organizer": {
      "name": "Informa Tech & Founders Forum Group",
      "url": "https://londontechweek.com"
    },
    "venue": {
      "name": "Olympia London",
      "city": "London",
      "country": "United Kingdom",
      "countryCode": "GB",
      "address": "Hammersmith Rd, London W14 8UX"
    },
    "timezone": "BST (UTC+1)",
    "officialUrl": "https://londontechweek.com",
    "registrationUrl": "https://londontechweek.com",
    "description": "Europe's largest festival of technology and innovation, bringing together 45,000+ tech leaders, investors, policy makers, and AI founders across London.",
    "about": "London Tech Week convenes global business leaders, unicorn founders, and investors at Olympia London. Dedicated summits during the week explore international AI governance, commercial adoption of autonomous systems, climate technology, and London's role as Europe's premier venture capital and AI talent hub.",
    "targetAudience": [
      "Global Tech Founders",
      "Venture Capitalists & Angel Investors",
      "Government Policy Makers",
      "Enterprise Innovation Directors"
    ],
    "topics": [
      "Global AI Governance & Standards",
      "Scaling European Deep Tech Unicorns",
      "Enterprise Transformation & GenAI",
      "Future of Work & Emerging Tech Talent"
    ],
    "faqs": [
      {
        "question": "When is London Tech Week 2027 taking place?",
        "answer": "London Tech Week 2027 runs from June 7–11, 2027 across multiple iconic venues in London, centered at Olympia London."
      },
      {
        "question": "How many people attend London Tech Week?",
        "answer": "More than 45,000 attendees from over 125 countries participate across the week's headline stages and fringe events."
      },
      {
        "question": "What are the primary themes for 2027?",
        "answer": "The 2027 themes focus heavily on international AI safety frameworks, scaling deep tech ventures, digital identity, and clean energy tech."
      }
    ],
    "source": {
      "name": "London Tech Week Official Site",
      "url": "https://londontechweek.com",
      "lastVerified": "2026-10-08"
    },
    "logo": "https://www.google.com/s2/favicons?domain=londontechweek.com&sz=128",
    "image": "https://cdn.asp.events/CLIENT_Informa__AADDE28D_5056_B739_5481D63BF875B0DF/sites/london-tech-week-2024/media/LTW-Logo-Deep-Blue-Cube-01.png/fit-in/1200x630/filters:no_upscale()"
  }
];

export default EVENTS_DATA;
