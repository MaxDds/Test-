(function () {
  // Developer mode: set ?dev=1 to enable diagnostic logs
  const isDev = new URLSearchParams(location.search).get('dev') === '1';

  if (!window.SITE) {
    console.error("window.SITE is missing. content.js must load BEFORE app.js");
    document.body.innerHTML =
      '<pre style="padding:16px;white-space:pre-wrap;color:#fff;background:#111;">ERROR: window.SITE is missing.\n\nFix:\n1) Ensure content.js exists\n2) Ensure scripts order:\n   <script src="content.js"></script>\n   <script src="app.js"></script>\n3) Ensure content.js starts with: window.SITE = {...}\n</pre>';
    return;
  }

  const site = window.SITE;
  const app = document.getElementById("app");
  if (!app) {
    console.error('Missing #app. Ensure <div id="app"></div> exists.');
    return;
  }

  const pageKey = document.body.dataset.page || "home";
  const page = site.pages && site.pages[pageKey];
  if (!page) {
    console.error(`Page "${pageKey}" not found in SITE.pages`);
    app.innerHTML =
      `<div style="padding:24px;color:#fff">
        <h2 style="margin:0 0 8px">Page not found</h2>
        <p style="margin:0;color:#bdbdbd">data-page="${pageKey}" not found in window.SITE.pages</p>
      </div>`;
    return;
  }

  // ----- helpers -----
  function h(tag, attrs = {}, children = null) {
    const el = document.createElement(tag);

    for (const [k, v] of Object.entries(attrs || {})) {
      if (k === "class") el.className = v;
      else if (k === "html") el.innerHTML = v;
      else if (k.startsWith("on") && typeof v === "function") el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, String(v));
    }

    if (children === null || children === undefined) return el;

    if (typeof children === "string" || typeof children === "number") {
      el.textContent = String(children);
      return el;
    }

    if (Array.isArray(children)) {
      children.forEach((c) => {
        if (c === null || c === undefined) return;
        if (typeof c === "string" || typeof c === "number") el.appendChild(document.createTextNode(String(c)));
        else el.appendChild(c);
      });
      return el;
    }

    if (children instanceof Node) {
      el.appendChild(children);
      return el;
    }

    el.textContent = String(children);
    return el;
  }

  function stars(n) {
    const filled = Math.max(0, Math.min(5, n || 0));
    return "★★★★★".slice(0, filled).padEnd(5, "☆");
  }

  // ----- registry (MUST be before renderSection is used) -----
  const registry = {
    "hero.v1": renderHero,
    "socialProof.v1": renderSocialProof,
    "seoIntro.v1": renderSeoIntro,
    "featuresCards.v1": renderFeaturesCards,
    "howItWorks.v1": renderHowItWorks,
    "providersGrid.v1": renderProvidersGrid,
    "testimonials.v1": renderTestimonials,
    "faqAccordion.v1": renderFaqAccordion,
    "ctaBanner.v1": renderCtaBanner,
    "contactForm.v1": renderContactForm,
    "legalText.v1": renderLegalText
  };

  function renderSection(sec) {
    // defensive: if sec is falsy, return empty node
    if (!sec) return h('div');

    const fn = registry[sec.type];
    const node = fn
      ? fn(sec.data || {})
      : h("div", { style: "padding:18px;color:#bdbdbd" }, `Unknown section type: ${sec.type}`);
    if (sec.id) node.id = sec.id;
    return node;
  }

  // ----- SEO -----
  const titleEl = document.getElementById("seo-title");
  if (titleEl) titleEl.textContent = (page.seo && page.seo.title) || (site.brand && site.brand.name) || "Website";

  const descEl = document.getElementById("seo-description");
  if (descEl) descEl.setAttribute("content", (page.seo && page.seo.description) || "");

  // Developer diagnostics: scan unknown section types
  const sectionsList = Array.isArray(page.sections) ? page.sections : [];
  const unknownSectionTypes = [...new Set(sectionsList.map(s => (s && s.type) || null).filter(t => t && !registry[t]))];
  if (isDev) {
    console.log('DEV: window.SITE exists:', !!window.SITE);
    console.log('DEV: pageKey =', pageKey);
    console.log('DEV: sections count =', sectionsList.length);
    if (unknownSectionTypes.length) console.warn('DEV: unknown section types:', unknownSectionTypes);
  }

  // ----- render -----
  app.innerHTML = "";
  app.appendChild(renderHeader(site));
  (sectionsList || []).forEach((sec) => {
    try {
      app.appendChild(renderSection(sec));
    } catch (err) {
      // Non-fatal: render an inline error box and continue
      if (isDev) console.error('Error rendering section', sec && sec.type, err);
      const errNode = h('div', { style: 'padding:18px;border-radius:8px;margin:12px 0;background:#2a1010;color:#fff' }, `Error rendering section ${sec && sec.type}: ${err && err.message ? err.message : String(err)}`);
      app.appendChild(errNode);
    }
  });
  app.appendChild(renderFooter(site));

  // ----- header/footer -----
  function renderHeader(site) {
    const wrap = h("header", { class: "header" });
    const c = h("div", { class: "container" });
    const row = h("div", { class: "row" });

    const brand = h("a", { class: "brand", href: "index.html" }, [
      h("span", { class: "brand-badge" }),
      h("span", {}, (site.brand && site.brand.name) || "Brand")
    ]);

    const nav = h(
      "nav",
      { class: "nav" },
      (site.header && site.header.nav ? site.header.nav : []).map((item) =>
        h("a", { href: item.href || "#" }, item.label || "Link")
      )
    );

    const ctaWrap = h("div", { class: "header-cta" });
    const cta = (site.header && site.header.cta) || { label: "Request", href: "contact.html", variant: "primary" };
    ctaWrap.appendChild(h("a", { class: "btn " + (cta.variant || "primary"), href: cta.href || "#" }, cta.label || "CTA"));

    const burger = h("button", { class: "burger", type: "button" }, "☰");
    const mobile = h(
      "div",
      { class: "mobile-nav container" },
      (site.header && site.header.nav ? site.header.nav : []).map((item) =>
        h("a", { href: item.href || "#" }, item.label || "Link")
      )
    );
    burger.addEventListener("click", () => mobile.classList.toggle("open"));

    row.appendChild(brand);
    row.appendChild(nav);
    row.appendChild(ctaWrap);
    row.appendChild(burger);

    c.appendChild(row);
    wrap.appendChild(c);
    wrap.appendChild(mobile);
    return wrap;
  }

  function renderFooter(site) {
    const wrap = h("footer", { class: "footer" });
    const c = h("div", { class: "container" });

    const year = new Date().getFullYear();
    const date = new Date().toISOString().slice(0, 10);

    const cols = h("div", { class: "cols" }, [
      h("div", {}, [
        h("div", { style: "font-weight:800;color:#fff;margin-bottom:8px" }, (site.brand && site.brand.name) || "Brand"),
        h("div", { class: "small" }, (site.brand && site.brand.tagline) || "")
      ]),
      h(
        "div",
        {},
        ((site.footer && site.footer.links) || []).map((l) =>
          h("div", {}, h("a", { href: l.href || "#" }, l.label || "Link"))
        )
      )
    ]);

    const copyright = ((site.footer && site.footer.copyright) || "")
      .replace("{year}", String(year))
      .replace("{date}", date);

    c.appendChild(cols);
    c.appendChild(h("div", { style: "margin-top:16px" }, copyright));
    wrap.appendChild(c);
    return wrap;
  }

  // ----- section renderers -----
  function renderHero(d) {
    const s = h("section", { class: "hero" });
    const c = h("div", { class: "container" });

    c.appendChild(h("h1", {}, d.h1 || ""));
    c.appendChild(h("p", { class: "sub" }, d.subtitle || ""));

    const btns = h(
      "div",
      { class: "buttons" },
      (d.cta || []).map((b) =>
        h("a", { class: "btn " + (b.variant || "primary"), href: b.href || "#" }, b.label || "")
      )
    );

    const metrics = h(
      "div",
      { class: "metrics" },
      (d.metrics || []).map((m) =>
        h("div", { class: "metric" }, [
          h("p", { class: "v" }, m.value || ""),
          h("p", { class: "l" }, m.label || "")
        ])
      )
    );

    c.appendChild(btns);
    c.appendChild(metrics);
    s.appendChild(c);
    return s;
  }

  function renderSocialProof(d) {
    const s = h("section", { class: "section social" });
    const c = h("div", { class: "container" });

    c.appendChild(h("h2", {}, d.h2 || ""));
    c.appendChild(h("p", { class: "subcenter" }, d.subtitle || ""));

    const logos = h("div", { class: "logo-row" }, (d.logos || []).map((l) => h("div", { class: "logo-pill" }, l.text || "Logo")));
    const stats = h(
      "div",
      { class: "stats-row" },
      (d.stats || []).map((st) =>
        h("div", { class: "stat" }, [
          h("p", { class: "v" }, st.value || ""),
          h("p", { class: "l" }, st.label || "")
        ])
      )
    );

    c.appendChild(logos);
    c.appendChild(stats);
    s.appendChild(c);
    return s;
  }

  function renderSeoIntro(d) {
    const s = h("section", { class: "section" });
    const c = h("div", { class: "container" });

    c.appendChild(h("h2", {}, d.h2 || ""));
    (d.text || []).forEach((t) => c.appendChild(h("p", {}, t)));

    s.appendChild(c);
    return s;
  }

  function renderFeaturesCards(d) {
    const s = h("section", { class: "section dark" });
    const c = h("div", { class: "container" });

    c.appendChild(h("h2", {}, d.h2 || ""));
    const grid = h("div", { class: "grid" }, (d.items || []).map((it) => h("div", { class: "card" }, [h("h3", {}, it.title || ""), h("p", {}, it.text || "")])));
    c.appendChild(grid);

    s.appendChild(c);
    return s;
  }

  function renderHowItWorks(d) {
    const s = h("section", { class: "section steps" });
    const c = h("div", { class: "container" });

    c.appendChild(h("h2", {}, d.h2 || "How It Works"));
    c.appendChild(h("p", { class: "subcenter" }, d.subtitle || ""));

    const row = h("div", { class: "step-row" }, (d.steps || []).map((st, idx) => h("div", { class: "step" }, [
      h("div", { class: "num" }, String(idx + 1).padStart(2, "0")),
      h("h3", { style: "margin:0 0 8px" }, st.title || ""),
      h("p", { style: "margin:0" }, st.text || "")
    ])));

    c.appendChild(row);
    s.appendChild(c);
    return s;
  }

 function renderProvidersGrid(d) {
  const s = h("section", { class: "section dark" });
  const c = h("div", { class: "container" });

  c.appendChild(h("h2", {}, d.h2 || "Providers"));
  c.appendChild(h("p", { class: "subcenter" }, d.subtitle || ""));

  // Normalize providers (support old and new formats)
  const raw = Array.isArray(d.providers) ? d.providers : [];
  const providers = raw.map((p) => {
    if (typeof p === "string") return { name: p, categories: ["All"], popularity: 50 };
    return {
      name: p.name || "Provider",
      categories: Array.isArray(p.categories) && p.categories.length ? p.categories : ["All"],
      popularity: Number.isFinite(p.popularity) ? p.popularity : 50
    };
  });

  const categories = Array.isArray(d.categories) && d.categories.length ? d.categories : ["All"];

  let activeCategory = "All";
  let query = "";
  let visibleCount = Number.isFinite(d.initialVisible) ? d.initialVisible : 12;
  let sortMode = "popular"; // popular | az | za

  // Controls layout
  const controls = h("div", { class: "providers-controls" });

  const left = h("div", { class: "providers-left" });
  const right = h("div", { class: "providers-right" });

  // Search
  const searchWrap = h("div", { class: "providers-search" });
  const search = h("input", {
    type: "text",
    placeholder: "Search providers..."
  });
  search.addEventListener("input", () => {
    query = (search.value || "").trim().toLowerCase();
    visibleCount = Number.isFinite(d.initialVisible) ? d.initialVisible : 12;
    renderList();
  });
  searchWrap.appendChild(search);

  // Filters
  const filtersWrap = h("div", { class: "providers-filters" });
  const filterButtons = categories.map((cat) => {
    const btn = h("button", { class: "filter-btn" + (cat === "All" ? " active" : ""), type: "button" }, cat);
    btn.addEventListener("click", () => {
      activeCategory = cat;
      visibleCount = Number.isFinite(d.initialVisible) ? d.initialVisible : 12;
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderList();
    });
    return btn;
  });
  filterButtons.forEach((b) => filtersWrap.appendChild(b));

  left.appendChild(searchWrap);
  left.appendChild(filtersWrap);

  // Sort
  const sort = h("select", { class: "sort" }, [
    option("popular", "Sort: Popular"),
    option("az", "Sort: A–Z"),
    option("za", "Sort: Z–A")
  ]);
  sort.value = "popular";
  sort.addEventListener("change", () => {
    sortMode = sort.value;
    renderList();
  });

  right.appendChild(sort);

  controls.appendChild(left);
  controls.appendChild(right);

  c.appendChild(controls);

  // Grid + show more
  const grid = h("div", { class: "providers-grid" });
  const footer = h("div", { class: "providers-footer" });
  const showMoreBtn = h("button", { class: "btn secondary", type: "button" }, "Show more");
  showMoreBtn.style.border = "1px solid var(--accent)";
  showMoreBtn.style.background = "transparent";
  showMoreBtn.style.color = "var(--accent)";
  showMoreBtn.style.cursor = "pointer";

  showMoreBtn.addEventListener("click", () => {
    visibleCount += 12;
    renderList();
  });

  footer.appendChild(showMoreBtn);

  c.appendChild(grid);
  c.appendChild(footer);

  s.appendChild(c);

  function matches(p) {
    const inCategory =
      activeCategory === "All" ||
      (p.categories || []).includes(activeCategory);

    const inQuery =
      !query ||
      (p.name || "").toLowerCase().includes(query);

    return inCategory && inQuery;
  }

  function sortProviders(list) {
    const out = [...list];
    if (sortMode === "az") out.sort((a, b) => a.name.localeCompare(b.name));
    if (sortMode === "za") out.sort((a, b) => b.name.localeCompare(a.name));
    if (sortMode === "popular") out.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    return out;
  }

  function renderList() {
    grid.innerHTML = "";

    let filtered = providers.filter(matches);
    filtered = sortProviders(filtered);

    const visible = filtered.slice(0, visibleCount);

    visible.forEach((p) => {
      const cats = (p.categories || []).filter((x) => x !== "All");

      const tile = h("div", { class: "provider-tile" }, [
        h("div", { class: "provider-title" }, [
          h("span", {}, p.name),
          h("span", { class: "badge" }, "API-ready")
        ]),
        h("div", { class: "provider-badges" },
          (cats.length ? cats : ["All"]).map((cat) => h("span", { class: "badge" }, cat))
        )
      ]);

      grid.appendChild(tile);
    });

    if (filtered.length === 0) {
      grid.appendChild(
        h("div", { style: "grid-column:1/-1;color:#bdbdbd;padding:10px 4px;text-align:center" },
          "No providers match your search."
        )
      );
      footer.style.display = "none";
      return;
    }

    footer.style.display = filtered.length <= visibleCount ? "none" : "flex";
  }

  renderList();
  return s;

  function option(value, label) {
    const o = document.createElement("option");
    o.value = value;
    o.textContent = label;
    return o;
  }
  }

  function renderTestimonials(d) {
    const s = h("section", { class: "section" });
    const c = h("div", { class: "container" });

    c.appendChild(h("h2", {}, d.h2 || "Testimonials"));
    c.appendChild(h("p", { class: "subcenter" }, d.subtitle || ""));

    const grid = h("div", { class: "test-grid" }, (d.items || []).map((t) => h("div", { class: "test" }, [
      h("div", { class: "stars" }, stars(t.stars || 5)),
      h("p", {}, t.text || ""),
      h("div", { class: "person" }, t.name || ""),
      h("div", { class: "role" }, t.role || "")
    ])));  
    c.appendChild(grid);

    s.appendChild(c);
    return s;
  }

  function renderFaqAccordion(d) {
    const s = h("section", { class: "section dark" });
    const c = h("div", { class: "container" });

    c.appendChild(h("h2", {}, d.h2 || "FAQ"));

    const list = h("div", { class: "faq-list" }, (d.items || []).map((item) => {
      const wrap = h("div", { class: "faq-item" });
      const q = h("button", { class: "faq-q", type: "button" }, [h("span", {}, item.q || ""), h("span", { class: "chev" }, "▾")]);
      const a = h("div", { class: "faq-a" }, item.a || "");
      q.addEventListener("click", () => wrap.classList.toggle("open"));
      wrap.appendChild(q);
      wrap.appendChild(a);
      return wrap;
    }));

    c.appendChild(list);
    s.appendChild(c);
    return s;
  }

  function renderCtaBanner(d) {
    const s = h("section", { class: "section" });
    const c = h("div", { class: "container", style: "text-align:center" });

    c.appendChild(h("h2", {}, d.title || ""));
    c.appendChild(h("p", { class: "subcenter" }, d.subtitle || ""));

    if (d.button) c.appendChild(h("a", { class: "btn " + (d.button.variant || "primary"), href: d.button.href || "#" }, d.button.label || "CTA"));

    s.appendChild(c);
    return s;
  }

  function renderContactForm(d) {
    const s = h("section", { class: "section legal" });
    const c = h("div", { class: "container" });

    c.appendChild(h("h1", {}, d.h1 || "Contact"));
    c.appendChild(h("p", {}, d.subtitle || ""));

    const form = h("form", { class: "form" });

    const name = field(d.fields?.nameLabel || "Name", "text");
    const email = field(d.fields?.emailLabel || "Email", "email");
    const msg = field(d.fields?.messageLabel || "Message", "textarea");

    const btn = h("button", { class: "btn " + (d.button?.variant || "primary"), type: "submit" }, d.button?.label || "Send");
    btn.style.border = "0";
    btn.style.cursor = "pointer";

    form.appendChild(name.wrap);
    form.appendChild(email.wrap);
    form.appendChild(msg.wrap);
    form.appendChild(btn);
    if (d.note) form.appendChild(h("p", { style: "margin-top:12px" }, d.note));

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Demo form. Next step: connect to email/CRM.");
    });

    c.appendChild(form);
    s.appendChild(c);
    return s;

    function field(labelText, type) {
      const wrap = h("div", { class: "field" });
      wrap.appendChild(h("label", {}, labelText));
      const input = type === "textarea" ? h("textarea", { placeholder: labelText }) : h("input", { type, placeholder: labelText });
      wrap.appendChild(input);
      return { wrap, input };
    }
  }

  function renderLegalText(d) {
    const s = h("section", { class: "section legal" });
    const c = h("div", { class: "container" });

    c.appendChild(h("h1", {}, d.title || "Legal"));
    const date = new Date().toISOString().slice(0, 10);
    c.appendChild(h("p", {}, (d.updated || "").replace("{date}", date)));

    const box = h("div", { class: "box" });
    (d.paragraphs || []).forEach((p) => box.appendChild(h("p", {}, p)));
    c.appendChild(box);

    s.appendChild(c);
    return s;
  }
})();
