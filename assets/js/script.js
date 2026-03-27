(function () {
  const STORAGE = {
    done: "sd_done_topics",
    favorites: "sd_favorite_topics",
    theme: "sd_theme",
    streak: "sd_streak"
  };

  const byId = (id) => document.getElementById(id);
  const readSet = (key) => new Set(JSON.parse(localStorage.getItem(key) || "[]"));
  const writeSet = (key, set) => localStorage.setItem(key, JSON.stringify([...set]));

  function initTheme() {
    const saved = localStorage.getItem(STORAGE.theme) || "light";
    document.documentElement.setAttribute("data-theme", saved);
    const btn = byId("themeToggle");
    if (btn) {
      btn.textContent = saved === "dark" ? "☀️" : "🌙";
      btn.addEventListener("click", () => {
        const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem(STORAGE.theme, next);
        btn.textContent = next === "dark" ? "☀️" : "🌙";
      });
    }
  }

  function updateStreak() {
    const today = new Date().toISOString().slice(0, 10);
    const state = JSON.parse(localStorage.getItem(STORAGE.streak) || "{}");
    if (!state.lastVisit) {
      state.lastVisit = today;
      state.days = 1;
    } else if (state.lastVisit !== today) {
      const last = new Date(state.lastVisit);
      const now = new Date(today);
      const diff = Math.round((now - last) / 86400000);
      state.days = diff === 1 ? (state.days || 1) + 1 : 1;
      state.lastVisit = today;
    }
    localStorage.setItem(STORAGE.streak, JSON.stringify(state));
    const streakEl = byId("studyStreak");
    if (streakEl) streakEl.textContent = `${state.days || 1} day streak`;
  }

  function getProgress(topics) {
    const done = readSet(STORAGE.done);
    const total = topics.length;
    const completed = topics.filter((t) => done.has(t.id)).length;
    return { total, completed, percent: total ? Math.round((completed / total) * 100) : 0, done };
  }

  function recommendNext(topics, done) {
    return topics
      .sort((a, b) => a.order - b.order)
      .find((t) => !done.has(t.id));
  }

  function renderTopicCard(topic, state) {
    const done = state.done.has(topic.id);
    const fav = state.favorites.has(topic.id);
    const tags = topic.tags.map((t) => `<span class="tag">${t}</span>`).join("");
    return `
      <article class="card" aria-label="${topic.title}">
        <div class="topic-meta">
          <span class="badge">${topic.module}</span>
          <span class="badge">${topic.difficulty}</span>
          <span class="badge">⏱ ${topic.studyTime}</span>
        </div>
        <h3 class="topic-title">${topic.title}</h3>
        <p class="muted">${topic.summary.simple}</p>
        <div class="tag-list">${tags}</div>
        <details class="collapsible">
          <summary>Deep dive + self-check</summary>
          <div class="collapsible-content">
            <p><strong>Why it matters:</strong> ${topic.summary.why}</p>
            <p><strong>Real-world example:</strong> ${topic.summary.example}</p>
            <p><strong>Interview angle:</strong> ${topic.summary.interview}</p>
            <p><strong>Quick quiz:</strong> ${topic.quiz}</p>
          </div>
        </details>
        <div class="topic-actions">
          <button class="btn done-btn" data-id="${topic.id}">${done ? "✅ Done" : "Mark as Done"}</button>
          <button class="btn fav-btn" data-id="${topic.id}">${fav ? "★ Favorited" : "☆ Favorite"}</button>
        </div>
      </article>`;
  }

  function bindCardActions(topics) {
    document.querySelectorAll(".done-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const done = readSet(STORAGE.done);
        const id = btn.dataset.id;
        done.has(id) ? done.delete(id) : done.add(id);
        writeSet(STORAGE.done, done);
        renderHome(topics);
      });
    });

    document.querySelectorAll(".fav-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const favorites = readSet(STORAGE.favorites);
        const id = btn.dataset.id;
        favorites.has(id) ? favorites.delete(id) : favorites.add(id);
        writeSet(STORAGE.favorites, favorites);
        renderHome(topics);
      });
    });
  }

  function renderHome(topics) {
    const query = byId("searchInput")?.value.toLowerCase().trim() || "";
    const difficulty = byId("difficultyFilter")?.value || "All";
    const module = byId("moduleFilter")?.value || "All";
    const tag = byId("tagFilter")?.value || "All";

    const favorites = readSet(STORAGE.favorites);
    const progress = getProgress(topics);

    const filtered = topics.filter((t) => {
      const text = `${t.title} ${t.summary.simple} ${t.tags.join(" ")}`.toLowerCase();
      const searchMatch = !query || text.includes(query);
      const diffMatch = difficulty === "All" || t.difficulty === difficulty;
      const moduleMatch = module === "All" || t.module === module;
      const tagMatch = tag === "All" || t.tags.includes(tag);
      return searchMatch && diffMatch && moduleMatch && tagMatch;
    });

    const list = byId("topicsGrid");
    if (list) {
      list.innerHTML = filtered
        .sort((a, b) => a.order - b.order)
        .map((topic) => renderTopicCard(topic, { done: progress.done, favorites }))
        .join("");
    }

    bindCardActions(topics);

    const percentEl = byId("progressPercent");
    const countEl = byId("progressCount");
    const fillEl = byId("progressFill");
    if (percentEl) percentEl.textContent = `${progress.percent}%`;
    if (countEl) countEl.textContent = `${progress.completed}/${progress.total} completed`;
    if (fillEl) fillEl.style.width = `${progress.percent}%`;

    const next = recommendNext([...topics], progress.done);
    const nextEl = byId("nextTopic");
    if (nextEl) {
      nextEl.textContent = next
        ? `${next.title} (${next.difficulty}, ${next.studyTime})`
        : "Great work — all core modules are completed.";
    }

    const favCount = byId("favoriteCount");
    if (favCount) favCount.textContent = String(favorites.size);
  }

  function initFilters(topics) {
    ["searchInput", "difficultyFilter", "moduleFilter", "tagFilter"].forEach((id) => {
      const el = byId(id);
      if (el) el.addEventListener("input", () => renderHome(topics));
      if (el) el.addEventListener("change", () => renderHome(topics));
    });
  }

  function renderPathTabs(topics) {
    const tabs = byId("pathTabs");
    const output = byId("pathDetails");
    if (!tabs || !output || !window.LEARNING_PATHS) return;

    tabs.innerHTML = window.LEARNING_PATHS
      .map((p, idx) => `<button class="btn tab-btn ${idx === 0 ? "active" : ""}" data-path="${p.id}">${p.name}</button>`)
      .join("");

    const renderPath = (id) => {
      const path = window.LEARNING_PATHS.find((p) => p.id === id) || window.LEARNING_PATHS[0];
      const items = path.topics
        .map((tid) => topics.find((t) => t.id === tid))
        .filter(Boolean)
        .map((t, i) => `<li>${i + 1}. <strong>${t.title}</strong> <span class="muted">(${t.studyTime})</span></li>`)
        .join("");

      output.innerHTML = `<div class="card"><h3>${path.name}</h3><p class="muted">${path.description}</p><ul class="path-topic-list">${items}</ul></div>`;
    };

    tabs.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        tabs.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        renderPath(btn.dataset.path);
      });
    });

    renderPath(window.LEARNING_PATHS[0].id);
  }

  function renderRoadmap(topics) {
    const el = byId("roadmapGrid");
    if (!el) return;
    el.innerHTML = topics
      .sort((a, b) => a.order - b.order)
      .map((t) => `<div class="road-node"><strong>${t.order}. ${t.title}</strong><div class="muted">${t.module} • ${t.difficulty}</div></div>`)
      .join("");
  }

  function initChecklist(topics) {
    const list = byId("revisionChecklist");
    if (!list) return;
    const done = readSet(STORAGE.done);
    list.innerHTML = topics
      .map((t) => `<label><input type="checkbox" data-id="${t.id}" ${done.has(t.id) ? "checked" : ""}/> ${t.title}</label>`)
      .join("<br />");

    list.querySelectorAll("input[type='checkbox']").forEach((box) => {
      box.addEventListener("change", () => {
        const current = readSet(STORAGE.done);
        box.checked ? current.add(box.dataset.id) : current.delete(box.dataset.id);
        writeSet(STORAGE.done, current);
      });
    });
  }

  function boot() {
    initTheme();
    updateStreak();
    const topics = window.SYSTEM_DESIGN_TOPICS || [];
    if (topics.length === 0) return;
    initFilters(topics);
    renderHome(topics);
    renderPathTabs(topics);
    renderRoadmap(topics);
    initChecklist(topics);
  }

  document.addEventListener("DOMContentLoaded", boot);
})();
