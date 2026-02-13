/**
 * content.js
 * ==========
 * Здесь хранится ВЕСЬ контент сайта (тексты, списки, секции).
 *
 * Как редактировать:
 * 1) Меняешь тексты в pages.home.sections[*].data
 * 2) Добавляешь/удаляешь секции внутри sections: [ ... ]
 * 3) Для других страниц меняешь pages.contact / pages.privacy / pages.cookies / pages.terms
 *
 * Важно:
 * - Тип секции = data.type, он должен совпадать с registry в app.js
 * - Этот файл должен подключаться ПЕРЕД app.js:
 *   <script src="content.js"></script>
 *   <script src="app.js"></script>
 */

window.SITE = {
  // =========================
  // Бренд (логотип/имя/слоган)
  // =========================
  brand: {
    name: "AviatorTech",
    // Можно поменять под EMD, например: "Casino Game Aggregator API"
    tagline: "iGaming Integration Platform"
  },

  // =========================
  // Header (верхнее меню)
  // =========================
  header: {
    // Правая кнопка в хедере
    cta: { label: "Request Proposal", href: "contact.html", variant: "primary" },

    // Меню (якоря на главной + отдельная страница contact)
    nav: [
      { label: "Home", href: "index.html" },
      { label: "How it works", href: "index.html#how" },
      { label: "Providers", href: "index.html#providers" },
      { label: "FAQ", href: "index.html#faq" },
      { label: "Contact", href: "contact.html" }
    ]
  },

  // =========================
  // Footer (низ сайта)
  // =========================
  footer: {
    links: [
      { label: "Privacy Policy", href: "privacy-policy.html" },
      { label: "Cookie Policy", href: "cookie-policy.html" },
      { label: "Terms of Service", href: "terms-of-service.html" },
      { label: "Contact", href: "contact.html" }
    ],
    copyright: "© {year} AviatorTech. All rights reserved."
  },

  // =========================
  // Pages (страницы сайта)
  // =========================
  pages: {
    // -------------------------
    // Главная страница
    // data-page="home"
    // -------------------------
    home: {
      seo: {
        title: "Casino Game Aggregator API | AviatorTech | iGaming Integration",
        description:
          "Unify gaming providers via a single API. Scalable casino game aggregation platform for operators and platform providers. Low-latency, robust infrastructure."
      },

      // Секции главной страницы (порядок = порядок на странице)
      sections: [
        // HERO (заголовок + CTA + метрики)
        {
          id: "top",
          type: "hero.v1",
          data: {
            h1: "Casino Game Aggregator API",
            subtitle:
              "Connect multiple gaming providers through one integration. Reduce time-to-market with a production-ready aggregation layer.",
            cta: [
              { label: "Request Proposal", href: "contact.html", variant: "primary" },
              { label: "View Docs", href: "#", variant: "secondary" }
            ],
            metrics: [
              { value: "100+", label: "Providers ready" },
              { value: "99.99%", label: "Uptime target" },
              { value: "<50ms", label: "Latency goal" },
              { value: "24/7", label: "Engineering support" }
            ]
          }
        },

        // SOCIAL PROOF (логотипы/цифры доверия)
        {
          id: "social",
          type: "socialProof.v1",
          data: {
            h2: "Trusted by Operators & Partners",
            subtitle:
              "Stable integrations, clear documentation, and processes aligned with B2B operator requirements.",
            logos: [
              { text: "Partner Network" },
              { text: "Compliance-ready" },
              { text: "Monitoring" },
              { text: "SLA / Support" }
            ],
            stats: [
              { value: "10+ years", label: "iGaming engineering" },
              { value: "50+ markets", label: "rollout experience" },
              { value: "Single API", label: "unified integration model" }
            ]
          }
        },

        // SEO INTRO (текстовый блок под SEO)
        {
          id: "intro",
          type: "seoIntro.v1",
          data: {
            h2: "What is a Casino Game Aggregator API?",
            text: [
              "A Casino Game Aggregator API is a technical layer that connects an operator’s platform to multiple gaming providers through one standardized integration.",
              "Instead of integrating each provider separately, you integrate once and manage a unified game catalog, metadata, and operational flows.",
              "This reduces development time, simplifies maintenance, and makes adding providers a controlled, repeatable process."
            ]
          }
        },

        // FEATURES (карточки 3–6 штук)
        {
          id: "features",
          type: "featuresCards.v1",
          data: {
            h2: "Key Features",
            items: [
              { title: "Single API Integration", text: "Connect once and standardize provider workflows across your platform." },
              { title: "Provider Abstraction", text: "Add or switch providers without rewriting core integration logic." },
              { title: "Unified Game Catalog", text: "Centralize titles, categories, and metadata management." },
              { title: "Operational Monitoring", text: "Track integration health and provider availability." },
              { title: "Scalable Architecture", text: "Designed for high concurrency and predictable performance." },
              { title: "Compliance Support", text: "Support market-specific requirements based on project scope." }
            ]
          }
        },

        // HOW IT WORKS (шаги + метрики)
        {
          id: "how",
          type: "howItWorks.v1",
          data: {
            h2: "How It Works",
            subtitle: "A simple integration path from requirements to production.",
            steps: [
              { title: "Share Requirements", text: "Define markets, currencies, provider scope, and platform details." },
              { title: "Get API Access", text: "Receive documentation, sandbox credentials, and integration checklist." },
              { title: "Single API Integration", text: "Implement authentication, game launch, bets, and callbacks." },
              { title: "Go Live", text: "Run QA, monitoring, and production onboarding with support." }
            ],
            metrics: [
              { value: "24 Hours", label: "Average launch path" },
              { value: "1 API", label: "Unified integration" },
              { value: "24/7", label: "Technical support" }
            ]
          }
        },

        // PROVIDERS (поиск + фильтры + сортировка — логика в app.js)
        {
          id: "providers",
          type: "providersGrid.v1",
          data: {
            h2: "Providers & Content",
            subtitle: "Search and filter providers by category. Replace with your real list.",

            // Кнопки фильтра
            categories: ["All", "Slots", "Live", "RNG", "Crash", "Sports", "Poker"],

            // Провайдеры (можно добавить popularity для сортировки Popular)
            providers: [
              { name: "Evolution", categories: ["Live"], popularity: 98 },
              { name: "Pragmatic Play", categories: ["Slots", "Live"], popularity: 95 },
              { name: "NetEnt", categories: ["Slots"], popularity: 88 },
              { name: "Play'n GO", categories: ["Slots"], popularity: 86 },
              { name: "Red Tiger", categories: ["Slots"], popularity: 84 },
              { name: "Ezugi", categories: ["Live"], popularity: 80 },
              { name: "Hacksaw", categories: ["Slots"], popularity: 83 },
              { name: "Spribe", categories: ["Crash"], popularity: 89 },
              { name: "Microgaming", categories: ["Slots"], popularity: 78 },
              { name: "Quickspin", categories: ["Slots"], popularity: 76 },
              { name: "BGaming", categories: ["Slots"], popularity: 74 },
              { name: "Yggdrasil", categories: ["Slots"], popularity: 70 },
              { name: "Betsoft", categories: ["Slots"], popularity: 63 },
              { name: "Playson", categories: ["Slots"], popularity: 65 },
              { name: "Push Gaming", categories: ["Slots"], popularity: 72 },
              { name: "Relax Gaming", categories: ["Slots"], popularity: 75 },
              { name: "Nolimit City", categories: ["Slots"], popularity: 73 },
              { name: "Thunderkick", categories: ["Slots"], popularity: 60 },
              { name: "Amatic", categories: ["Slots"], popularity: 55 },
              { name: "Golden Race", categories: ["Sports"], popularity: 58 },
              { name: "Vivo Gaming", categories: ["Live"], popularity: 61 },
              { name: "Endorphina", categories: ["Slots"], popularity: 59 },
              { name: "Tom Horn", categories: ["Slots"], popularity: 57 },
              { name: "OneTouch", categories: ["Slots"], popularity: 62 },
              { name: "Wazdan", categories: ["Slots"], popularity: 67 },
              { name: "ELK Studios", categories: ["Slots"], popularity: 66 },
              { name: "Habanero", categories: ["Slots"], popularity: 68 },
              { name: "Spinomenal", categories: ["Slots"], popularity: 54 },
              { name: "Booming Games", categories: ["Slots"], popularity: 56 },
              { name: "Spribe Originals", categories: ["Crash"], popularity: 64 }
            ],

            // Сколько показываем сначала (потом "Show more")
            initialVisible: 12
          }
        },

        // TESTIMONIALS (отзывы)
        {
          id: "testimonials",
          type: "testimonials.v1",
          data: {
            h2: "What Our Clients Say",
            subtitle: "Example testimonials. Replace with real quotes when available.",
            items: [
              {
                stars: 5,
                text: "Single integration simplified provider onboarding and reduced maintenance.",
                name: "Alex M.",
                role: "CTO, iGaming Platform"
              },
              {
                stars: 5,
                text: "Support processes are clear. Monitoring helped us keep stable operations.",
                name: "Daniel R.",
                role: "Head of Product"
              },
              {
                stars: 4,
                text: "Documentation and sandbox access made initial integration straightforward.",
                name: "Priya S.",
                role: "Integration Lead"
              },
              {
                stars: 5,
                text: "Good abstraction layer for providers and consistent transaction flow.",
                name: "James W.",
                role: "Engineering Manager"
              }
            ]
          }
        },

        // FAQ (аккордеон)
        {
          id: "faq",
          type: "faqAccordion.v1",
          data: {
            h2: "Frequently Asked Questions",
            items: [
              {
                q: "How long does integration take?",
                a: "Typical timelines range from days to a few weeks depending on platform scope, certifications, and provider selection."
              },
              {
                q: "Can we launch with a small provider set?",
                a: "Yes. Launch with a minimal portfolio and expand later without rebuilding the integration."
              },
              {
                q: "Do you support multiple currencies and languages?",
                a: "Multi-currency and multi-language setups are supported depending on the project configuration."
              },
              {
                q: "How are incidents handled?",
                a: "We provide monitoring and an escalation process for production issues. Support coverage can be defined per agreement."
              }
            ]
          }
        },

        // CTA (финальный призыв)
        {
          id: "cta",
          type: "ctaBanner.v1",
          data: {
            title: "Talk to Integration Engineers",
            subtitle: "Request a proposal, confirm scope, and get a launch plan tailored to your platform.",
            button: { label: "Request Proposal", href: "contact.html", variant: "primary" }
          }
        }
      ]
    },

    // -------------------------
    // Страница Contact
    // data-page="contact"
    // -------------------------
    contact: {
      seo: {
        title: "Contact | AviatorTech",
        description: "Request a proposal or ask integration questions."
      },
      sections: [
        {
          type: "contactForm.v1",
          data: {
            h1: "Contact",
            subtitle: "Tell us about your platform and provider scope. We will reply with next steps.",
            fields: {
              nameLabel: "Name",
              emailLabel: "Email",
              messageLabel: "Message"
            },
            button: { label: "Send Message", variant: "primary" },
            note: "This is a demo form (static). Later we can connect it to email/CRM."
          }
        }
      ]
    },

    // -------------------------
    // Privacy Policy
    // data-page="privacy"
    // -------------------------
    privacy: {
      seo: { title: "Privacy Policy | AviatorTech", description: "Privacy Policy page." },
      sections: [
        {
          type: "legalText.v1",
          data: {
            title: "Privacy Policy",
            updated: "Last updated: {date}",
            paragraphs: [
              "This Privacy Policy explains how we collect, use, and protect information.",
              "For a production site, replace this text with your legal-approved policy.",
              "If you need, we can generate a compliant draft based on your jurisdiction and business model."
            ]
          }
        }
      ]
    },

    // -------------------------
    // Cookie Policy
    // data-page="cookies"
    // -------------------------
    cookies: {
      seo: { title: "Cookie Policy | AviatorTech", description: "Cookie Policy page." },
      sections: [
        {
          type: "legalText.v1",
          data: {
            title: "Cookie Policy",
            updated: "Last updated: {date}",
            paragraphs: [
              "This Cookie Policy explains what cookies are and how they are used.",
              "For a production site, replace this text with your legal-approved policy.",
              "We can generate a draft and then you pass it to your legal review."
            ]
          }
        }
      ]
    },

    // -------------------------
    // Terms of Service
    // data-page="terms"
    // -------------------------
    terms: {
      seo: { title: "Terms of Service | AviatorTech", description: "Terms of Service page." },
      sections: [
        {
          type: "legalText.v1",
          data: {
            title: "Terms of Service",
            updated: "Last updated: {date}",
            paragraphs: [
              "These Terms of Service define the rules for using this website.",
              "For a production site, replace this text with your legal-approved terms.",
              "We can generate a first draft and then you finalize it with legal."
            ]
          }
        }
      ]
    }
  }
};
