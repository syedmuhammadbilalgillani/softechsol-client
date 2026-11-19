export interface PainPointItem {
  problem: string;
  solution: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  duration: string;
  description: string;
  deliverable: string;
}

export interface TechStackCategory {
  category: string;
  technologies: string[];
}

export interface SubService {
  id: string;
  title: string;
  shortDescription: string;
  description?: string;
  deliverables?: string[];
  businessImpact?: string;
  [key: string]: unknown;
}

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  h1Title: string;
  tagline: string;
  shortDescription: string;
  description: string;
  iconName: string;
  image: {
    url: string;
    altText: string;
  };
  customImageSrc?: string; // Optional: drop your custom image path here (e.g. "/images/web-dev.webp"). When empty, interactive fallback card renders.
  benefits: string[];
  trustBadges: string[];
  painPoints: PainPointItem[];
  services: SubService[];
  process: ProcessStep[];
  techStack: TechStackCategory[];
  faqs: Array<{ question: string; answer: string }>;
}

export const SERVICES_DATA: ServiceCategory[] = [
  // 1. CUSTOM WEB DEVELOPMENT
  {
    id: "web-development",
    name: "Custom Web Development",
    slug: "web-development",
    h1Title: "Custom Web Development Services for Growing Businesses",
    tagline: "High-performance company websites, custom web apps, and secure portals built to turn visitors into paying clients.",
    shortDescription:
      "We design and engineer modern company websites, custom e-commerce stores, and secure web portals tailored to your business goals. Fast-loading, mobile-first, and SEO-optimized from day one.",
    description:
      "Your website is the digital storefront of your business. We engineer custom web applications that load in under 2 seconds, look flawless across every smartphone and desktop, and turn visitors into loyal clients. No slow templates or bloated builders—just clean, reliable, and scalable web solutions built on modern tech.",
    iconName: "Globe",
    image: {
      url: "/services/Web_Development_Services.webp",
      altText: "SoftechSol Custom Web Development",
    },
    customImageSrc: "/services/Web_Development_Services.webp",
    benefits: [
      "Lightning-fast load speed (under 2s) for better Google SEO rankings",
      "100% mobile-friendly responsive design across all devices",
      "Custom admin portals for seamless content and user management",
      "Bank-grade SSL security, clean architecture, and data protection",
    ],
    trustBadges: [
      "100% Code & IP Ownership",
      "Sub-2s Speed & 99+ PageSpeed Score",
      "Agile 2-Week Sprint Deliveries",
    ],
    painPoints: [
      {
        problem: "Bloated WordPress themes and slow builders crash under traffic and hurt your Google rankings.",
        solution: "We build lightweight, handcrafted Next.js and React codebases optimized for 99+ PageSpeed scores that scale effortlessly.",
      },
      {
        problem: "Agencies holding source code or server accounts hostage, leaving you locked in with zero control.",
        solution: "You receive 100% ownership of all software files and hosting accounts from Day 1. Zero vendor lock-in.",
      },
      {
        problem: "Vague timelines, missed launch dates, and weeks of complete radio silence from freelance developers.",
        solution: "A dedicated technical project lead, weekly milestone demo builds, and a fixed launch date guaranteed upfront.",
      },
    ],
    services: [
      {
        id: "web-1",
        title: "High-Converting Corporate & Business Websites",
        shortDescription:
          "Professional company websites designed to establish trust, showcase your track record, and drive inbound sales inquiries.",
        description:
          "We engineer modern, fast business websites that clearly communicate your value proposition to non-tech decision makers, guiding visitors straight to booking consultations or requesting quotes.",
        deliverables: [
          "Custom responsive UI/UX design (desktop, tablet, mobile)",
          "Sub-2 second PageSpeed optimization",
          "Comprehensive on-page technical SEO & OpenGraph meta tags",
          "Secure contact forms with instant email and WhatsApp notifications",
        ],
        businessImpact: "Increases inbound leads by 2x to 3x compared to outdated, slow corporate websites.",
      },
      {
        id: "web-2",
        title: "Custom Web Portals & Customer Dashboards",
        shortDescription:
          "Secure self-service customer portals, internal staff management systems, and operational dashboards.",
        description:
          "Eliminate manual email back-and-forth by giving your clients a dedicated portal to track project status, review invoices, download reports, and submit support requests securely.",
        deliverables: [
          "Role-based authentication (Client, Staff, Administrator)",
          "Real-time database records and file upload management",
          "Interactive analytics charts and exportable PDF/Excel reports",
          "Automated status email notifications on account milestones",
        ],
        businessImpact: "Saves up to 15 hours per week of manual customer service emails and data lookups.",
      },
      {
        id: "web-3",
        title: "E-Commerce & Subscription Platforms",
        shortDescription:
          "Fast, frictionless digital storefronts with secure payment processing, inventory sync, and customer accounts.",
        description:
          "Whether selling physical goods, digital downloads, or recurring B2B subscriptions, we build custom e-commerce experiences with checkout flows optimized for high completion rates.",
        deliverables: [
          "Stripe, PayPal, and local payment gateway integrations",
          "Automated tax, shipping, and order notification logic",
          "Customer order history and self-service account management",
          "Admin inventory and sales reporting dashboard",
        ],
        businessImpact: "Reduces cart abandonment and gives you complete control over transaction fees without marketplace lock-in.",
      },
      {
        id: "web-4",
        title: "Full-Stack Web Applications (SaaS Products)",
        shortDescription:
          "Scalable Software-as-a-Service (SaaS) web platforms built from prototype to production launch.",
        description:
          "Have a software product idea? We engineer full-stack web platforms with scalable databases, secure customer accounts, automated onboarding, and enterprise-grade data protection.",
        deliverables: [
          "Modern, ultra-fast web application frontend and backend architecture",
          "Scalable database design engineered to handle thousands of active users",
          "Automated subscription billing with instant customer invoice delivery",
          "Thorough quality testing to ensure a smooth, error-free launch",
        ],
        businessImpact: "Takes your software product idea from wireframe to revenue-generating MVP in 4 to 8 weeks.",
      },
      {
        id: "web-5",
        title: "Software Integrations & Third-Party System Bridges",
        shortDescription:
          "Secure bridges that connect your website with CRMs, payment gateways, and business software.",
        description:
          "Break down data silos. We integrate your website with Salesforce, HubSpot, QuickBooks, Google Workspace, and your existing business tools with automated error-handling.",
        deliverables: [
          "Bank-grade encrypted login security and secure third-party data links",
          "Real-time automatic data synchronization across your business apps",
          "Automated security shields to protect your site against malicious attacks",
          "Complete documentation and integration guides for your team",
        ],
        businessImpact: "Eliminates duplicate manual data entry across disconnected business software.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Discovery & Technical Roadmap",
        duration: "3 - 5 Days",
        description: "We audit your business requirements, analyze competitor benchmarks, and produce a clear milestone roadmap with fixed timelines.",
        deliverable: "Technical Scope Document & Wireframe Architecture",
      },
      {
        step: "02",
        title: "Interactive Figma Design",
        duration: "1 - 2 Weeks",
        description: "We craft clickable, high-fidelity visual mockups. You test and approve the exact user experience before a single line of code is written.",
        deliverable: "Clickable Figma Prototype & Design System",
      },
      {
        step: "03",
        title: "Sprint Engineering & Weekly Demos",
        duration: "2 - 4 Weeks",
        description: "We build your application in transparent 2-week agile sprints. You receive weekly live staging demos to test real functionality as it is built.",
        deliverable: "Private Staging Preview with Bi-Weekly Releases",
      },
      {
        step: "04",
        title: "Launch, Handover & 30-Day Warranty",
        duration: "Day of Launch",
        description: "Zero-downtime deployment to your hosting environment, full source code and asset handover to your private accounts, team walkthrough, and 30 days of bug support.",
        deliverable: "Live Production Site + 100% Asset Handover",
      },
    ],
    techStack: [
      {
        category: "Frontend Architecture",
        technologies: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS"],
      },
      {
        category: "Backend & APIs",
        technologies: ["Node.js", "Express", "Python / FastAPI", "High-Speed APIs"],
      },
      {
        category: "Databases & Caching",
        technologies: ["PostgreSQL", "Prisma ORM", "Redis", "Supabase"],
      },
      {
        category: "Cloud & Infrastructure",
        technologies: ["AWS", "Vercel", "Docker", "Cloudflare CDN & SSL"],
      },
    ],
    faqs: [
      {
        question: "How much does a custom web development project cost?",
        answer:
          "Costs depend on scope: a high-converting corporate website typically ranges from $1,000 to $2,500, while custom web applications or SaaS portals with dashboards and payment logic typically range from $3,000 to $8,000+. We always provide a transparent, fixed-price milestone estimate before any work begins—no surprise hourly billing.",
      },
      {
        question: "How long will it take to build and launch my website?",
        answer:
          "A standard corporate website is typically delivered in 2 to 3 weeks. Custom web portals and SaaS platforms usually take 4 to 8 weeks. We work in 2-week agile sprints with weekly live demo builds so you can track progress every step of the way.",
      },
      {
        question: "Do I own 100% of the code and intellectual property?",
        answer:
          "Yes, absolutely. Once final milestone payment is complete, you own 100% of the source code, design assets, and cloud deployment. Everything is transferred directly to your private company accounts. We never lock you in.",
      },
      {
        question: "Can our non-technical team update website content easily?",
        answer:
          "Yes. We configure intuitive admin dashboards or headless content management systems where anyone on your team can edit text, publish articles, update images, and add new services in seconds without touching any code.",
      },
      {
        question: "What happens after the website launches?",
        answer:
          "Every project includes a 30-day post-launch warranty covering any technical bugs or adjustments. We also provide ongoing maintenance plans for automated daily backups, security patching, and server monitoring so your site remains fast and secure 24/7.",
      },
    ],
  },

  // 2. MOBILE APP DEVELOPMENT
  {
    id: "mobile-development",
    name: "Mobile App Development",
    slug: "mobile-development",
    h1Title: "Custom Mobile App Development for iOS & Android",
    tagline: "Fast, engaging native and cross-platform mobile apps engineered to scale on the App Store and Google Play.",
    shortDescription:
      "Transform your business idea into a top-rated mobile app on iOS and Android. High-speed performance, intuitive UI, and guaranteed App Store approval.",
    description:
      "Turn your business vision into an intuitive, high-speed mobile application that users love opening every day. We engineer cross-platform and native mobile apps that run with 60fps smoothness, work reliably offline, and follow strict Apple App Store and Google Play compliance guidelines from day one.",
    iconName: "Smartphone",
    image: {
      url: "/services/Mobile_App_Development_Showcase.webp",
      altText: "SoftechSol Mobile App Development Showcase",
    },
    customImageSrc: "/services/Mobile_App_Development_Showcase.webp",
    benefits: [
      "Single codebase for iOS and Android, saving 40%+ on development costs",
      "Guaranteed App Store and Google Play submission and approval",
      "Offline-first local caching for seamless performance in low-signal areas",
      "Real-time push notifications to drive user retention and sales",
    ],
    trustBadges: [
      "App Store & Google Play Approval Guaranteed",
      "Cross-Platform iOS & Android from One Codebase",
      "Offline-First & 60fps Native Speed",
    ],
    painPoints: [
      {
        problem: "Hiring separate iOS and Android teams doubles your budget, extends your timeline, and causes feature mismatches.",
        solution: "We build with Flutter and React Native, delivering a single high-performance codebase that runs natively on both platforms with zero compromise.",
      },
      {
        problem: "Apps getting repeatedly rejected by Apple or Google due to strict privacy, permission, or design guidelines.",
        solution: "We manage the entire submission lifecycle—privacy policies, test accounts, and store listings—guaranteeing smooth store approval.",
      },
      {
        problem: "Apps that lag on older phones, crash on launch, or drain battery, resulting in 1-star reviews and uninstalls.",
        solution: "Rigorous automated testing across 20+ real device screen sizes, memory profiling, and smooth 60fps animations.",
      },
    ],
    services: [
      {
        id: "mob-1",
        title: "Cross-Platform iOS & Android Apps (One Unified Codebase)",
        shortDescription:
          "Feature-rich mobile applications built for both platforms simultaneously with native speed and appearance.",
        description:
          "Launch faster on both the Apple App Store and Google Play Store with a single, maintainable codebase that reduces long-term maintenance costs by nearly half.",
        deliverables: [
          "Unified iOS and Android production builds",
          "Native device hardware integration (Camera, GPS, Face ID)",
          "Smooth micro-interactions and transitions",
          "Automated multi-device UI testing",
        ],
        businessImpact: "Cuts time-to-market by 40% while reaching 100% of mobile smartphone users.",
      },
      {
        id: "mob-2",
        title: "On-Demand Service & Booking Apps",
        shortDescription:
          "Marketplace, booking, and delivery mobile platforms with live location tracking and in-app checkout.",
        description:
          "Whether you are building ride-hailing, home service appointments, or food delivery, we engineer real-time matching algorithms, map tracking, and automated driver/customer alerts.",
        deliverables: [
          "Google Maps & Mapbox real-time GPS tracking",
          "Customer, Provider, and Admin multi-role interfaces",
          "In-app payments with Apple Pay, Google Pay, and Stripe",
          "Automated dispatch and booking confirmation push alerts",
        ],
        businessImpact: "Automates appointment scheduling and service fulfillment directly from customer smartphones.",
      },
      {
        id: "mob-3",
        title: "Enterprise Internal Staff & Field Operations Apps",
        shortDescription:
          "Secure mobile apps for warehouse staff, field inspectors, sales teams, and remote workforces.",
        description:
          "Equip your team with mobile tools that work offline in basements or remote job sites, automatically syncing photos, signatures, and reports as soon as internet connectivity is restored.",
        deliverables: [
          "Offline-first local database caching so your team works without internet",
          "Barcode, QR code, and digital signature capture",
          "Enterprise login security, Face ID, and fingerprint authentication",
          "Background data synchronization and conflict resolution",
        ],
        businessImpact: "Eliminates paper checklists and manual end-of-day office reporting.",
      },
      {
        id: "mob-4",
        title: "App Store Publishing & Ongoing Maintenance",
        shortDescription:
          "End-to-end management of App Store and Google Play submissions, version upgrades, and OS compatibility.",
        description:
          "Apple and Google update their operating systems every year. We ensure your app remains fully compatible with new iOS/Android versions, guidelines, and security requirements.",
        deliverables: [
          "Store asset creation (Screenshots, icon sets, preview videos)",
          "Privacy policy, consent compliance, and store guideline verification",
          "Automated 24/7 error tracking and crash monitoring",
          "Regular OS version updates and bug-fix deployments",
        ],
        businessImpact: "Protects your brand reputation with 99.9% crash-free sessions on the App Store.",
      },
    ],
    process: [
      {
        step: "01",
        title: "App Scope & User Flow Architecture",
        duration: "3 - 5 Days",
        description: "We map out user onboarding, navigation hierarchies, offline handling rules, and backend API contracts.",
        deliverable: "Mobile User Journey Map & Technical Specifications",
      },
      {
        step: "02",
        title: "Interactive Mobile UI Prototype",
        duration: "1 - 2 Weeks",
        description: "We design high-fidelity mobile screens in Figma that you can install and tap through directly on your phone.",
        deliverable: "Clickable Mobile Prototype (iOS & Android frames)",
      },
      {
        step: "03",
        title: "Agile Development & Device Testing",
        duration: "3 - 6 Weeks",
        description: "We deliver bi-weekly TestFlight (iOS) and Internal Testing (Android) builds so you can test features on real hardware.",
        deliverable: "TestFlight & Internal Testing Builds",
      },
      {
        step: "04",
        title: "Store Submission, Approval & Handover",
        duration: "1 Week",
        description: "We handle the complete Apple and Google review submission, resolve reviewer inquiries, and transfer complete repositories.",
        deliverable: "Live App on App Store & Google Play + Full Code",
      },
    ],
    techStack: [
      {
        category: "Mobile Frameworks",
        technologies: ["Flutter", "React Native", "Swift (iOS Native)", "Kotlin (Android Native)"],
      },
      {
        category: "Data & Offline Storage",
        technologies: ["Secure Local Storage", "App State Management", "Offline Syncing", "Encrypted Cache"],
      },
      {
        category: "Cloud & Real-Time Backend",
        technologies: ["Firebase Cloud Services", "Real-Time Sockets", "Scalable APIs", "Supabase"],
      },
      {
        category: "Store Distribution & Launch",
        technologies: ["Apple App Store", "Google Play Console", "TestFlight Beta Testing", "Automated Release Pipeline"],
      },
    ],
    faqs: [
      {
        question: "Should I build a native app or cross-platform (Flutter/React Native)?",
        answer:
          "For 95% of businesses, cross-platform frameworks like Flutter or React Native are the smartest choice. They deliver 60fps native performance, look identical to native apps, and allow you to launch on both iOS and Android from one codebase—saving 40%+ on development and future maintenance costs.",
      },
      {
        question: "Who handles submitting the app to Apple and Google?",
        answer:
          "We handle 100% of the submission process. From generating required certificate profiles, configuring privacy manifests, taking App Store screenshots, to answering Apple/Google reviewer questions—we manage the process until your app is live and approved.",
      },
      {
        question: "How long does a mobile app project take from start to launch?",
        answer:
          "A standard MVP app typically takes 4 to 8 weeks to build, test, and submit. More complex applications with live geolocation tracking, real-time messaging, and multi-sided marketplaces usually take 8 to 12 weeks.",
      },
      {
        question: "Will the app work offline when users have no internet?",
        answer:
          "Yes. We design mobile applications with offline-first architectures. Users can continue viewing cached data, composing messages, or filling forms; the moment their device reconnects to Wi-Fi or cellular data, all changes sync automatically.",
      },
      {
        question: "How are app updates and bug fixes handled after launch?",
        answer:
          "We include a 30-day post-launch warranty with every project. We also offer monthly maintenance retainers where we monitor crash logs, push urgent bug fixes, and update dependencies whenever Apple or Google releases a major iOS/Android update.",
      },
    ],
  },

  // 3. BUSINESS WORKFLOW AUTOMATION
  {
    id: "business-automation",
    name: "Business Workflow Automation",
    slug: "business-automation",
    h1Title: "Business Workflow Automation & System Integrations",
    tagline: "Eliminate repetitive busywork, connect disconnected software, and put your daily operations on autopilot.",
    shortDescription:
      "Stop wasting staff hours on manual data entry. We connect your CRM, accounting, and communication tools to run on autopilot with zero errors.",
    description:
      "Every hour your team spends manually copying information between forms, spreadsheets, and CRMs is an hour lost on revenue-generating work. We build secure, event-driven automated workflows that connect your existing business tools—transferring data, issuing invoices, and sending customer notifications in under a second.",
    iconName: "Workflow",
    image: {
      url: "/services/Business_Workflow_Automation_Dashboard.webp",
      altText: "SoftechSol Business Workflow Automation Dashboard",
    },
    customImageSrc: "/services/Business_Workflow_Automation_Dashboard.webp",
    benefits: [
      "Save 20+ hours of manual administrative busywork every single week",
      "Eliminate human data entry mistakes, typos, and forgotten follow-ups",
      "Connect your existing tools (HubSpot, QuickBooks, Stripe, WhatsApp)",
      "Instant real-time customer confirmations and multi-channel team alerts",
    ],
    trustBadges: [
      "Save 20+ Staff Hours Every Week",
      "Zero Human Data Entry Errors",
      "Works With Your Existing Tools (CRM, Accounting, WhatsApp)",
    ],
    painPoints: [
      {
        problem: "Staff spending 3 to 4 hours every day manually copying client details from website forms into CRMs, spreadsheets, and billing tools.",
        solution: "We build instantaneous automated webhooks that sync leads and customer data across all your platforms in 0.2 seconds.",
      },
      {
        problem: "Invoices getting delayed, proposals forgotten, and leads falling through the cracks because someone forgot to send an email.",
        solution: "Automated trigger sequences that immediately notify your sales team on WhatsApp/Slack and dispatch branded client proposals automatically.",
      },
      {
        problem: "Expensive enterprise software suites forcing your company to alter its workflow or pay exorbitant per-seat licenses.",
        solution: "We build lightweight, customized bridges connecting the exact tools you already use without expensive software migrations.",
      },
    ],
    services: [
      {
        id: "auto-1",
        title: "CRM & Lead Capture Automation",
        shortDescription:
          "Instantly route website leads, book meetings, and update pipeline stages in your CRM without touching a keyboard.",
        description:
          "The moment a prospect submits an inquiry, our automated pipelines qualify their details, log the contact in your CRM (HubSpot, Zoho, Salesforce), and notify the right sales rep immediately.",
        deliverables: [
          "Instant lead capture with duplicate inquiry filtering",
          "Automated calendar booking and appointment reminders",
          "Bi-directional sync between website forms and CRM records",
          "Automated follow-up email sequences based on lead score",
        ],
        businessImpact: "Reduces lead response time from hours to under 30 seconds, dramatically increasing closing rates.",
      },
      {
        id: "auto-2",
        title: "Automated Invoicing & Payment Reconciliation",
        shortDescription:
          "Generate professional invoices, track Stripe/PayPal payments, and sync records into QuickBooks or Xero.",
        description:
          "When a deal closes or an order is placed, an invoice is automatically created, delivered to the client, and reconciled in your bookkeeping software the instant payment clears.",
        deliverables: [
          "Automated Stripe and bank payment reconciliation",
          "Automated QuickBooks / Xero invoice creation and payment marking",
          "Automated payment receipt emails with attached PDF invoices",
          "Automated alerts and friendly reminders when card payments fail",
        ],
        businessImpact: "Eliminates end-of-month accounting headaches and prevents missed or unpaid customer invoices.",
      },
      {
        id: "auto-3",
        title: "WhatsApp & Multi-Channel Customer Notification Bots",
        shortDescription:
          "Keep customers informed in real-time via automated WhatsApp messages, SMS alerts, and internal team updates.",
        description:
          "Customers rarely check emails, but 98% read WhatsApp messages within 5 minutes. We connect your systems to send instant order confirmations, status tracking, and appointment reminders.",
        deliverables: [
          "Official WhatsApp Business automated messaging integration",
          "Template verification and automated transactional message triggers",
          "Internal Slack/Discord alerts for high-priority business events",
          "Two-way customer reply routing to your support team inbox",
        ],
        businessImpact: "Boosts customer trust with immediate confirmation while cutting support phone calls by 60%.",
      },
      {
        id: "auto-4",
        title: "Document Generation & Digital Contract Workflows",
        shortDescription:
          "Automatically populate contracts, NDAs, and customer proposals with dynamic data ready for digital signature.",
        description:
          "Stop editing Word templates manually. Our automations pull client details from your CRM, generate a branded PDF contract, and send it via DocuSign or HelloSign for one-click signature.",
        deliverables: [
          "Dynamic PDF generation from HTML/Word templates",
          "E-signature integration (DocuSign, PandaDoc, SignNow)",
          "Automated file archival in Google Drive / Dropbox with structured folders",
          "Signed contract counter-signing alerts and storage",
        ],
        businessImpact: "Accelerates deal closure by getting contracts into client hands within minutes of a discovery call.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Workflow Audit & Opportunity Mapping",
        duration: "2 - 3 Days",
        description: "We review your team's current manual processes, identify the biggest time-wasters, and map out automated data flow diagrams.",
        deliverable: "Automation Architecture Map & ROI Estimate",
      },
      {
        step: "02",
        title: "API Connections & Pipeline Setup",
        duration: "1 - 2 Weeks",
        description: "We build secure webhooks, connect your software APIs, and configure error-handling logic in an isolated test environment.",
        deliverable: "Functional Staging Automations & Test Data Verification",
      },
      {
        step: "03",
        title: "Simulation & End-to-End Testing",
        duration: "3 - 5 Days",
        description: "We test edge cases, failed webhooks, duplicate entries, and unexpected inputs to ensure zero data corruption.",
        deliverable: "Quality Assurance Report & Fail-Safe Test Run",
      },
      {
        step: "04",
        title: "Live Production Rollout & Staff Training",
        duration: "2 Days",
        description: "We turn on live triggers, configure automated error alert channels, and provide a recorded walkthrough video for your team.",
        deliverable: "Live Automated System + Video Training Guide",
      },
    ],
    techStack: [
      {
        category: "Automation Engines",
        technologies: ["Make (Integromat)", "n8n (Self-Hosted)", "Custom Node.js Webhooks", "Zapier"],
      },
      {
        category: "CRM & Business Tools",
        technologies: ["HubSpot CRM", "Zoho CRM", "QuickBooks", "Xero", "Stripe API"],
      },
      {
        category: "Communication Channels",
        technologies: ["WhatsApp Business Cloud API", "Twilio SMS", "Slack API", "SendGrid Email"],
      },
      {
        category: "Security & Vaults",
        technologies: ["Official OAuth Access", "Encrypted Key Vaults", "Tamper-Proof Signatures", "Audit Logs"],
      },
    ],
    faqs: [
      {
        question: "Will our team need to learn complex new software to use these automations?",
        answer:
          "No. The beauty of workflow automation is that it runs silently in the background. Your team continues using the familiar tools they already know (like your CRM, email, or WhatsApp), and the automation handles the data transfer automatically.",
      },
      {
        question: "What happens if one of our connected software tools goes down or changes its API?",
        answer:
          "We build every automation with robust error-handling and retry logic. If a service experiences downtime, the automation pauses, retries safely when the service recovers, and immediately alerts your technical lead with the exact issue so no data is ever lost.",
      },
      {
        question: "Is our customer and financial data safe during automation transfers?",
        answer:
          "Yes, 100%. All data is transmitted over bank-grade encrypted SSL connections using verified official business authorizations. We never store your sensitive customer records on intermediary servers; data transfers directly and securely from your source system to its destination.",
      },
      {
        question: "Can we automate processes involving WhatsApp?",
        answer:
          "Yes! We use the official Meta WhatsApp Business Cloud API. This allows automated order updates, appointment reminders, and customer notifications without risking your phone number getting banned.",
      },
      {
        question: "How much time and money can automation realistically save us?",
        answer:
          "Most small to mid-sized businesses save between 15 and 30 hours of manual administrative labor per week. That equals hundreds of hours saved annually, allowing your core staff to focus on high-value sales and customer fulfillment instead of copying data.",
      },
    ],
  },

  // 4. AGENTIC AI & CUSTOM CHATBOTS
  {
    id: "agentic-ai",
    name: "Agentic AI & Custom Chatbots",
    slug: "agentic-ai",
    h1Title: "Custom Agentic AI & Intelligent Chatbots for Business",
    tagline: "Autonomous AI agents and 24/7 customer support assistants trained specifically on your company data and workflows.",
    shortDescription:
      "Deploy custom AI agents trained exclusively on your business data. They qualify incoming customer leads, resolve support inquiries instantly, and summarize complex business tasks with zero downtime.",
    description:
      "Move beyond generic, robotic chatbots that frustrate customers. We engineer custom AI agents and intelligent assistants trained specifically on your company's documents, product catalogs, and standard operating procedures. They converse with natural human intelligence, answer inquiries 24/7, and take real actions in your CRM.",
    iconName: "Bot",
    image: {
      url: "/services/AI_Agent_Ecosystem_Dashboard.webp",
      altText: "SoftechSol AI Agent Ecosystem Dashboard",
    },
    customImageSrc: "/services/AI_Agent_Ecosystem_Dashboard.webp",
    benefits: [
      "24/7 instant customer service with sub-second response times",
      "Trained exclusively on your private company data with zero made-up answers",
      "Autonomous lead qualification and CRM appointment booking",
      "Internal knowledge search across thousands of company PDFs and manuals",
    ],
    trustBadges: [
      "Private & Secure (Data Never Used for Public Model Training)",
      "24/7 Autonomous Customer Care & Lead Qualification",
      "Sub-Second Accurate Citations",
    ],
    painPoints: [
      {
        problem: "Old-school rule-based chatbots give rigid, annoying answers that frustrate potential clients and drive them away.",
        solution: "We build modern conversational AI agents that understand context, nuance, and intent, speaking naturally in your brand's voice.",
      },
      {
        problem: "Concerns that confidential company documents or customer data will leak into public AI training datasets.",
        solution: "We implement private, encrypted storage with complete data confidentiality and zero training on public models.",
      },
      {
        problem: "Staff wasting hours every day searching through folders of PDFs, contracts, and manuals to answer repetitive questions.",
        solution: "Internal knowledge AI assistants that search across your entire document repository in 0.3s, delivering cited, factual answers.",
      },
    ],
    services: [
      {
        id: "ai-1",
        title: "24/7 Customer Support & Inbound Sales AI Agents",
        shortDescription:
          "Conversational AI assistants that answer product questions, resolve tickets, and capture leads while your team sleeps.",
        description:
          "Embed a smart AI representative on your website and WhatsApp that knows your pricing, availability, and policies inside out. It resolves common inquiries instantly and escalates high-value leads directly to your sales team.",
        deliverables: [
          "Website chat widget customized to your brand palette",
          "AI training on your company's FAQs, service policies, and product guides",
          "Lead capture flow with automated email and CRM syncing",
          "Seamless human agent takeover toggle",
        ],
        businessImpact: "Resolves 70%+ of routine inquiries immediately, keeping prospective buyers engaged 24 hours a day.",
      },
      {
        id: "ai-2",
        title: "Internal Team Knowledge AI (Trained On Your Company Data)",
        shortDescription:
          "Searchable AI copilot that indexes your internal PDFs, standard operating procedures, and employee handbooks.",
        description:
          "Empower your staff to query your company's entire historical knowledge base in natural language. The AI returns direct, accurate answers with exact page citations and source links.",
        deliverables: [
          "Document ingestion pipeline (PDF, DOCX, Google Drive, Notion)",
          "Smart search across all company documents with instant answers and page citations",
          "Strict anti-hallucination guardrails and source verification links",
          "Role-based permission controls so staff only access authorized docs",
        ],
        businessImpact: "Cuts internal staff research time by up to 80%, onboarding new team members in days instead of weeks.",
      },
      {
        id: "ai-3",
        title: "Autonomous Workflow & Task-Executing Agents",
        shortDescription:
          "Goal-oriented AI agents capable of querying databases, scheduling calendar events, and generating reports.",
        description:
          "Unlike simple chatbots that only talk, Agentic AI can execute multi-step tasks: reading incoming emails, categorizing client sentiment, looking up database records, and drafting customized invoice summaries.",
        deliverables: [
          "Automated execution to query databases, book calendar slots, and update CRM records",
          "Multi-step reasoning pipeline with human-in-the-loop approvals",
          "Automated draft responses for customer service tickets",
          "Real-time analytics dashboard tracking agent accuracy and activity",
        ],
        businessImpact: "Enables a 5-person support team to handle the operational volume of a 30-person department.",
      },
      {
        id: "ai-4",
        title: "WhatsApp & Multi-Platform AI Bot Deployment",
        shortDescription:
          "Deploy your custom AI assistant directly to WhatsApp, Slack, Telegram, and mobile apps.",
        description:
          "Meet your customers where they communicate most. We deploy your verified AI agent across WhatsApp Business and team collaboration channels with unified chat history.",
        deliverables: [
          "Official WhatsApp Business Cloud API integration",
          "Slack / Discord internal bot integration",
          "Cross-session memory and conversation history tracking",
          "Admin management portal to review conversation transcripts",
        ],
        businessImpact: "Turns WhatsApp into an automated 24/7 sales and customer care channel.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Data Audit & Persona Formulation",
        duration: "3 - 5 Days",
        description: "We compile your FAQs, manuals, and past support tickets, defining the exact brand tone and scope boundaries for your AI agent.",
        deliverable: "AI Persona Guidelines & Knowledge Data Architecture",
      },
      {
        step: "02",
        title: "Knowledge Base Setup & AI Training",
        duration: "1 - 2 Weeks",
        description: "We securely upload and train the AI on your proprietary company manuals, PDFs, and spreadsheets with private, encrypted search algorithms.",
        deliverable: "Private, Secure Company AI Knowledge Base",
      },
      {
        step: "03",
        title: "Accuracy Testing & Safety Guardrails",
        duration: "1 - 2 Weeks",
        description: "We stress-test the AI with hundreds of trick questions, edge cases, and competitor comparisons to guarantee 100% factual accuracy.",
        deliverable: "Accuracy Benchmark Report & Safety Guardrails",
      },
      {
        step: "04",
        title: "Live Launch & Admin Dashboard",
        duration: "3 - 5 Days",
        description: "We embed the chat assistant onto your live website or WhatsApp channel, configuring conversation analytics and staff handoff tools.",
        deliverable: "Live AI Agent + Admin Analytics Dashboard",
      },
    ],
    techStack: [
      {
        category: "Foundational AI Models",
        technologies: ["Gemini 1.5 Pro / Flash", "OpenAI GPT-4o", "Claude 3.5 Sonnet", "DeepSeek"],
      },
      {
        category: "Vector Databases & Search",
        technologies: ["Pinecone", "pgvector (PostgreSQL)", "Qdrant", "ChromaDB"],
      },
      {
        category: "Frameworks & Orchestration",
        technologies: ["LangChain", "LlamaIndex", "Next.js AI SDK", "Python FastAPI"],
      },
      {
        category: "Deployment Channels",
        technologies: ["Web Chat Widget", "WhatsApp Cloud API", "Slack API", "REST API Endpoints"],
      },
    ],
    faqs: [
      {
        question: "Will the AI make up false information (hallucinate)?",
        answer:
          "We prevent made-up answers by putting strict guardrails on the AI. It is strictly programmed to ONLY answer using your verified company documents. If a question is not covered in your documentation, it politely explains that it doesn't know and offers to connect the user with a human team member.",
      },
      {
        question: "Is our company data and customer conversations kept private?",
        answer:
          "Yes, 100%. We utilize enterprise agreements with zero-data-retention policies. Your proprietary documents, trade secrets, and customer chats are NEVER used to train public AI models. Everything is stored in your private, encrypted database.",
      },
      {
        question: "Can the AI take real actions, like booking a meeting or updating our CRM?",
        answer:
          "Yes! The AI can check your team's live Google/Outlook calendar to schedule appointments, create new lead records in your CRM, or check order delivery status in your database.",
      },
      {
        question: "What happens if a customer asks to speak with a human?",
        answer:
          "We build seamless human handover protocols into every bot. When a customer requests a human or expresses frustration, the bot immediately alerts your team via email, Slack, or WhatsApp and transfers the conversation transcript smoothly.",
      },
      {
        question: "How long does it take to deploy a custom AI agent?",
        answer:
          "A standard customer support or website sales bot typically takes 2 to 3 weeks from data ingestion to live deployment. Complex multi-agent systems with database querying and custom workflows usually take 4 to 6 weeks.",
      },
    ],
  },

  // 5. UI/UX DESIGN & PROTOTYPING
  {
    id: "ui-ux-design",
    name: "UI/UX Design & Prototyping",
    slug: "ui-ux-design",
    h1Title: "Conversion-Focused UI/UX Design & Clickable Prototypes",
    tagline: "Intuitive, human-centric interfaces and interactive Figma prototypes designed to maximize user engagement and sales.",
    shortDescription:
      "We design clean, conversion-focused user interfaces and interactive click-through prototypes in Figma before writing code. Test and validate your product experience with real users risk-free.",
    description:
      "Great software starts with exceptional design. Before writing a single line of code, we design intuitive, beautiful user experiences in Figma that make complex workflows feel effortless. By testing clickable prototypes with real users first, you eliminate expensive development re-work and launch a product your customers love using.",
    iconName: "Palette",
    image: {
      url: "/services/UI_UX_Design_Prototyping_Workspace.webp",
      altText: "SoftechSol UI/UX Design & Prototyping Workspace",
    },
    customImageSrc: "/services/UI_UX_Design_Prototyping_Workspace.webp",
    benefits: [
      "Clickable, interactive Figma prototypes to validate ideas before coding",
      "Human-centered user journeys that remove friction and maximize conversion",
      "Scalable design systems with reusable components and typography tokens",
      "Seamless developer handoff with pixel-perfect responsive layouts",
    ],
    trustBadges: [
      "100% Clickable Figma Prototype Before Code",
      "Comprehensive Design System & Component Library",
      "User-Tested for Higher Conversion Rates",
    ],
    painPoints: [
      {
        problem: "Jumping straight into coding without designs results in messy interfaces, endless scope creep, and expensive rebuilds.",
        solution: "We create interactive Figma prototypes first, allowing you to click through every screen, test user flows, and make adjustments in days.",
      },
      {
        problem: "Cluttered, confusing user interfaces that frustrate non-technical users and lead to high bounce rates.",
        solution: "We simplify complex screens with clean typography, clear visual hierarchy, and intuitive navigation that anyone can understand instantly.",
      },
      {
        problem: "Inconsistent colors, mismatched buttons, and poor developer handoff resulting in a final product that looks completely different from the mockup.",
        solution: "We provide complete Figma design systems with auto-layout specs, color tokens, and exported assets ready for immediate implementation.",
      },
    ],
    services: [
      {
        id: "ui-1",
        title: "Clickable Prototypes & Wireframing",
        shortDescription:
          "Interactive Figma prototypes that simulate the exact look and feel of a live application on desktop and mobile.",
        description:
          "Validate your product with stakeholders, investors, and target customers before spending thousands on software development. Click through buttons, forms, and user journeys as if the app were already live.",
        deliverables: [
          "Low-fidelity wireframe user flows",
          "High-fidelity clickable Figma prototype",
          "Mobile, tablet, and desktop responsive viewports",
          "Interactive component states (Hover, Active, Error, Loading)",
        ],
        businessImpact: "Saves up to 60% in development costs by fixing UX flaws before a single developer begins writing code.",
      },
      {
        id: "ui-2",
        title: "SaaS Web Application & Dashboard UI Design",
        shortDescription:
          "Clean, data-rich dashboards and business software interfaces designed for clarity and daily efficiency.",
        description:
          "Transform overwhelming spreadsheets and dense business data into intuitive dashboard cards, visual charts, and streamlined management tables that your users can navigate effortlessly.",
        deliverables: [
          "Analytics charts, KPI cards, and data table layouts",
          "Filter, sort, search, and bulk-action interaction patterns",
          "Dark mode and light mode interface variants",
          "User onboarding walkthrough screens and empty states",
        ],
        businessImpact: "Improves daily user retention and reduces customer onboarding support tickets.",
      },
      {
        id: "ui-3",
        title: "Mobile App UI/UX Design (iOS & Android)",
        shortDescription:
          "Thumb-friendly, modern smartphone interfaces crafted to meet official Apple Human Interface & Material Design guidelines.",
        description:
          "We design mobile app experiences that feel natural in the hand. From smooth bottom-sheet drawers to intuitive gestures, every element is designed for one-handed thumb navigation.",
        deliverables: [
          "iOS and Android native guideline compliance",
          "Pixel-perfect screen mockups for modern smartphone dimensions",
          "Custom vector icons and illustration sets",
          "Touch target and accessibility (WCAG) contrast compliance",
        ],
        businessImpact: "Drives higher App Store review ratings and longer daily session times.",
      },
      {
        id: "ui-4",
        title: "Design Systems & Developer Handoff Kits",
        shortDescription:
          "Scalable UI component libraries, color palettes, and typography tokens that keep your product visually consistent.",
        description:
          "Give your engineering team a single source of truth. Our design systems document every button, dropdown, modal, and input state with exact CSS properties for rapid frontend development.",
        deliverables: [
          "Figma Component Library with Auto-Layout 5.0",
          "Standardized color palette, shadows, and typography tokens",
          "Form validation states (Default, Focus, Error, Disabled)",
          "Organized SVG and WebP export package for developers",
        ],
        businessImpact: "Accelerates frontend engineering speed by 2x by eliminating developer guesswork.",
      },
    ],
    process: [
      {
        step: "01",
        title: "User Research & Information Architecture",
        duration: "3 - 5 Days",
        description: "We analyze your user personas, study competitor interfaces, and map out the complete navigational structure of the product.",
        deliverable: "User Journey Maps & Low-Fidelity Wireframes",
      },
      {
        step: "02",
        title: "Visual Design Exploration & Moodboard",
        duration: "3 - 5 Days",
        description: "We explore color palettes, typography, and visual styles, presenting 2 distinct visual directions for your team to choose from.",
        deliverable: "Style Tile & High-Fidelity Hero Concepts",
      },
      {
        step: "03",
        title: "Full Screen Design & Interactive Prototyping",
        duration: "1 - 2 Weeks",
        description: "We design all remaining screens across desktop and mobile, connecting them into a fully clickable prototype in Figma.",
        deliverable: "Complete Clickable Figma Prototype",
      },
      {
        step: "04",
        title: "Design System Assembly & Developer Handoff",
        duration: "3 - 5 Days",
        description: "We organize the Figma file for developers with inspect tokens, auto-layout constraints, and conduct a live walkthrough call.",
        deliverable: "Organized Figma Workspace + Dev Handoff Session",
      },
    ],
    techStack: [
      {
        category: "Design & Prototyping",
        technologies: ["Figma", "FigJam", "Adobe XD", "Miro"],
      },
      {
        category: "Design Systems & Tokens",
        technologies: ["Figma Auto-Layout 5.0", "Figma Variables", "Atomic Design", "WCAG 2.1 A11y Standards"],
      },
      {
        category: "Interactive States",
        technologies: ["Interactive Components", "Micro-Interactions", "Responsive Breakpoints", "Smart Animate"],
      },
      {
        category: "Developer Handoff",
        technologies: ["Figma Dev Mode", "CSS Token Export", "SVG / WebP Pipeline", "Component Specs"],
      },
    ],
    faqs: [
      {
        question: "What exactly is a clickable prototype, and why do I need one?",
        answer:
          "A clickable prototype is an interactive simulation built in Figma that looks and behaves like a finished app. You can tap buttons, open menus, and navigate through user flows directly on your computer or phone. It allows you to test and validate your product before writing code, saving thousands of dollars in development revisions.",
      },
      {
        question: "Will the final designs look identical when developers build them?",
        answer:
          "Yes. We design using Figma Auto-Layout and strict 8px spacing grids that mirror real HTML/CSS flexbox and grid layouts. We also provide our engineering team with exact CSS color tokens, typography scales, and responsive breakpoints for pixel-perfect implementation.",
      },
      {
        question: "Do you design for both mobile phones and desktop screens?",
        answer:
          "Yes. Every interface is designed responsively across desktop, tablet, and mobile viewports. We ensure all buttons are thumb-friendly on smartphones and data tables are clear and readable on large desktop monitors.",
      },
      {
        question: "Do I receive all the editable Figma source files?",
        answer:
          "Yes, 100%. You receive full edit access to the organized Figma project file, including all vector components, icons, typography styles, and design system tokens. You own all design assets completely.",
      },
      {
        question: "Can you help us build the product after the designs are finished?",
        answer:
          "Yes! Because SoftechSol has both senior UI/UX designers and full-stack software engineers in-house, the transition from design to development is seamless. Our engineers participate in design reviews to ensure every screen is technically feasible and optimized for rapid development.",
      },
    ],
  },

  // 6. CLOUD DEPLOYMENT & MAINTENANCE
  {
    id: "deployment-and-maintenance",
    name: "Cloud Deployment & Maintenance",
    slug: "deployment-and-maintenance",
    h1Title: "Cloud Deployment, DevOps & 24/7 Server Maintenance",
    tagline: "Keep your software fast, rock-solid, and always online with zero-downtime hosting, automated backups, and proactive monitoring.",
    shortDescription:
      "Keep your digital applications protected, lightning-fast, and always online. We handle cloud architecture, SSL setup, automated daily backups, security patching, and proactive 24/7 monitoring.",
    description:
      "Software development doesn't end on launch day. Without proper cloud architecture and ongoing maintenance, applications suffer from slow load times, unexpected downtime, and critical security vulnerabilities. We manage your cloud infrastructure, automated daily backups, SSL certificates, and performance tuning so your business runs smoothly 24/7.",
    iconName: "Server",
    image: {
      url: "/services/Cloud_DevOps_Dashboard_Workspace.webp",
      altText: "SoftechSol Cloud DevOps Dashboard & Workspace",
    },
    customImageSrc: "/services/Cloud_DevOps_Dashboard_Workspace.webp",
    benefits: [
      "99.9% uptime SLA guarantee for high-traffic business applications",
      "Automated daily encrypted database backups stored in isolated cloud buckets",
      "Proactive 24/7 server monitoring with instant error alerts",
      "Sub-200ms server response times via Cloudflare CDN caching and optimization",
    ],
    trustBadges: [
      "99.9% Uptime SLA Guarantee",
      "Automated Daily Encrypted Backups",
      "Proactive 24/7 Monitoring & Speed Shield",
    ],
    painPoints: [
      {
        problem: "Unexpected server crashes or expired SSL certificates taking your website offline, causing lost sales and reputational damage.",
        solution: "We implement 24/7 automated uptime checks and auto-renewing SSL certificates that prevent downtime before it can happen.",
      },
      {
        problem: "Catastrophic data loss caused by hardware failure, ransomware, or accidental deletion with no working backup in place.",
        solution: "We configure automated daily encrypted database snapshots saved to geographically separate cloud storage with 1-click restore verification.",
      },
      {
        problem: "Sluggish server response times and slow page loading causing Google search penalties and frustrated visitors leaving your website.",
        solution: "We configure Cloudflare global CDN caching, database connection pooling, and server resource scaling to achieve sub-200ms speeds.",
      },
    ],
    services: [
      {
        id: "ops-1",
        title: "Cloud Infrastructure Setup & Zero-Downtime Migration",
        shortDescription:
          "Reliable cloud architecture provisioning on AWS, Vercel, DigitalOcean, or Hetzner customized to your budget.",
        description:
          "Whether migrating from an unreliable shared hosting provider or provisioning high-performance cloud servers, we engineer isolated cloud environments, fast traffic routing, and automated SSL security certificates.",
        deliverables: [
          "Cloud instance provisioning (AWS EC2/RDS, Vercel, or DigitalOcean)",
          "Nginx reverse proxy with HTTP/2 and gzip/brotli compression",
          "Automated Let's Encrypt SSL certificate provisioning and auto-renewal",
          "Zero-downtime data migration with full DNS record management",
        ],
        businessImpact: "Improves application stability and ensures your servers never choke during seasonal traffic spikes.",
      },
      {
        id: "ops-2",
        title: "Automated Release Pipelines & Safe Deployments",
        shortDescription:
          "Automate software testing and deployment so new features go live in minutes with zero manual server editing.",
        description:
          "Eliminate risky live server editing. We configure automated release pipelines that run safety tests and launch new features smoothly to your live website with zero downtime.",
        deliverables: [
          "Automated software release pipeline setup",
          "Automated code quality and safety checks before launch",
          "Zero-downtime rolling update configuration",
          "Automated rollback protection if an unexpected issue arises",
        ],
        businessImpact: "Enables fast, reliable software updates without risking unexpected site downtime.",
      },
      {
        id: "ops-3",
        title: "Automated Encrypted Backups & Disaster Recovery",
        shortDescription:
          "Daily automated database and file snapshots stored in encrypted off-site cloud storage with verified restore procedures.",
        description:
          "Never worry about losing your business data. We configure scheduled automated snapshots of your databases and uploaded media, retaining 30 days of recovery archives.",
        deliverables: [
          "Daily automated encrypted database backup scripts",
          "Off-site archival in independent secure cloud storage",
          "30-day snapshot retention policy with automated cleanup",
          "Quarterly disaster recovery drill testing 1-click restore capability",
        ],
        businessImpact: "Guarantees your business can recover from any disaster or data corruption in less than 30 minutes.",
      },
      {
        id: "ops-4",
        title: "24/7 Server Health Monitoring & Speed Tuning",
        shortDescription:
          "Proactive monitoring of server CPU, RAM, disk space, and application latency with instant on-call alerts.",
        description:
          "Our automated monitoring tools check your servers every 60 seconds. If memory spikes or a service encounters an error, our team is alerted immediately to resolve the issue before your users notice.",
        deliverables: [
          "Automated 24/7 server health monitors with 60-second checks",
          "Instant alert routing to engineering team (Slack, WhatsApp, SMS)",
          "Database speed tuning and performance optimization to prevent server crashes",
          "Monthly server health and performance summary report",
        ],
        businessImpact: "Maintains a 99.9% uptime track record and gives non-technical founders total peace of mind.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Infrastructure Audit & Vulnerability Assessment",
        duration: "2 - 3 Days",
        description: "We review your current server setup, database performance, SSL certificates, and security configurations to identify risks.",
        deliverable: "Infrastructure Health Audit & Remediation Plan",
      },
      {
        step: "02",
        title: "Cloud Security & Automated Release Setup",
        duration: "3 - 5 Days",
        description: "We configure secure server environments, firewall rules, automated deployment pipelines, and fast worldwide content caching.",
        deliverable: "Secure Cloud Setup & Automated Deployment Pipeline",
      },
      {
        step: "03",
        title: "Backup & Monitoring Deployment",
        duration: "2 Days",
        description: "We configure daily off-site encrypted backup routines and 60-second automated health ping monitors with instant alerts.",
        deliverable: "Automated Daily Backups & 24/7 Monitoring Dashboard",
      },
      {
        step: "04",
        title: "Ongoing 24/7 Support & Optimization",
        duration: "Monthly Retainer",
        description: "Continuous security patching, server updates, performance tuning, and guaranteed on-call priority emergency support.",
        deliverable: "Monthly Maintenance Reports & 99.9% Uptime SLA",
      },
    ],
    techStack: [
      {
        category: "Cloud Platforms",
        technologies: ["AWS (EC2, S3, RDS)", "Vercel", "DigitalOcean", "Hetzner Cloud"],
      },
      {
        category: "Containers & Web Servers",
        technologies: ["Containerized Cloud Hosting", "Traffic Load Balancers", "High-Speed Web Servers", "Node.js Runtimes"],
      },
      {
        category: "Security & CDN",
        technologies: ["Cloudflare Global CDN & Firewall", "Automated SSL Certificates", "Intrusion Protection", "DDoS Shield"],
      },
      {
        category: "Monitoring & Reliability",
        technologies: ["Automated Release Pipelines", "24/7 Uptime Monitoring", "Performance Dashboards", "Proactive Error Alerting"],
      },
    ],
    faqs: [
      {
        question: "Why can't I just use standard cheap shared hosting ($3/month)?",
        answer:
          "Cheap shared hosting bundles hundreds of websites onto a single overloaded server. If another website on that server gets hacked or experiences high traffic, your site crashes too. Custom cloud hosting on AWS or DigitalOcean gives you an isolated server environment with dedicated CPU and RAM, guaranteeing fast load times and enterprise-grade security.",
      },
      {
        question: "How do automated backups work, and where are they stored?",
        answer:
          "Every night, an automated script creates an encrypted snapshot of your database and uploaded assets. This snapshot is transferred over SSL to an independent, geographically separated cloud storage bucket (like AWS S3 or Cloudflare R2). If your primary server ever fails, your data remains 100% safe and can be restored in minutes.",
      },
      {
        question: "What is your uptime guarantee?",
        answer:
          "We maintain a 99.9% uptime SLA for all client applications hosted under our management plans. Our automated monitoring checks your application every 60 seconds from multiple global locations and alerts our engineering team immediately if anything deviates.",
      },
      {
        question: "Who pays for the cloud hosting accounts (AWS, DigitalOcean, etc.)?",
        answer:
          "You do, directly to the cloud provider. We help you create and configure your own private AWS, DigitalOcean, or Vercel account so you have complete ownership and transparent billing. We manage the technical operations without marking up your server costs.",
      },
      {
        question: "What is included in ongoing monthly maintenance?",
        answer:
          "Our monthly maintenance retainers include 24/7 uptime monitoring, daily automated backup verifications, security patches, framework and library updates, database optimization, SSL certificate renewals, and priority technical support whenever your team needs assistance.",
      },
    ],
  },
];

// Helper functions for easy static access across components
export const getAllServiceCategories = (): ServiceCategory[] => {
  return SERVICES_DATA;
};

export const getServiceCategoryBySlug = (slug: string): ServiceCategory | undefined => {
  const decodedSlug = decodeURIComponent(slug);
  return SERVICES_DATA.find((item) => item.slug === decodedSlug);
};

export const getAllServicesList = (): Array<{ id: string; title: string }> => {
  const list: Array<{ id: string; title: string }> = [];
  SERVICES_DATA.forEach((category) => {
    category.services.forEach((subService) => {
      list.push({
        id: subService.id,
        title: `${subService.title} (${category.name})`,
      });
    });
  });
  return list;
};
