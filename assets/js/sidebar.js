let currentSearchQuery = "";
let sidebarOriginalState = {};

function toggle(id) {
  const body = document.getElementById(id);
  if (!body) return;

  const title = body.previousElementSibling;
  const isOpen = body.style.display === "block";

  body.style.display = isOpen ? "none" : "block";
  title.classList.toggle("open", !isOpen);
  saveState(id, !isOpen);

  if (!currentSearchQuery) {
    sidebarOriginalState[id] = !isOpen;
  }
}

function saveState(id, isOpen) {
  const state = JSON.parse(localStorage.getItem("sidebarState") || "{}");
  state[id] = isOpen;
  localStorage.setItem("sidebarState", JSON.stringify(state));
}

function loadState() {
  const state = JSON.parse(localStorage.getItem("sidebarState") || "{}");
  Object.keys(state).forEach((id) => {
    const body = document.getElementById(id);
    if (!body) return;
    const title = body.previousElementSibling;
    body.style.display = state[id] ? "block" : "none";
    title.classList.toggle("open", state[id]);
  });
}

function onPhaseChange() {
  const selected = document.getElementById("phaseSelect").value;

  document.querySelectorAll(".phase-container").forEach((el) => {
    el.style.display = "none";
  });

  const active = document.getElementById("container-" + selected);
  if (active) active.style.display = "block";

  localStorage.setItem("selectedPhase", selected);

  if (currentSearchQuery) {
    filterSidebar();
  }
}

function filterSidebar() {
  const query = document
    .getElementById("sidebarSearch")
    .value.trim()
    .toLowerCase();

  const selectedPhase = document.getElementById("phaseSelect").value;
  currentSearchQuery = query;

  document.querySelectorAll(".phase-container").forEach((phase) => {
    const isActivePhase = phase.id === "container-" + selectedPhase;

    if (!isActivePhase) {
      phase.style.display = "none";
      return;
    }

    let phaseHasMatch = false;

    phase.querySelectorAll(".topic").forEach((topic) => {
      const topicBody = topic.querySelector(".topic-body");
      const topicTitle = topic.querySelector(".topic-title");

      let topicHasMatch = false;

      topic.querySelectorAll(".topic-link").forEach((link) => {
        const text = link.textContent.toLowerCase();
        if (!query || text.includes(query)) {
          link.style.display = "block";
          topicHasMatch = true;
        } else {
          link.style.display = "none";
        }
      });

      if (!query) {
        const wasOpen = sidebarOriginalState[topicBody.id] || false;
        topicBody.style.display = wasOpen ? "block" : "none";
        topicTitle.classList.toggle("open", wasOpen);
        topic.style.display = "block";
      } else {
        topicBody.style.display = topicHasMatch ? "block" : "none";
        topicTitle.classList.toggle("open", topicHasMatch);
        topic.style.display = topicHasMatch ? "block" : "none";
      }

      if (topicHasMatch) phaseHasMatch = true;
    });

    phase.style.display = !query || phaseHasMatch ? "block" : "none";
  });
}

function restoreSidebarStateGlobally() {
  document.querySelectorAll(".topic").forEach((topic) => {
    const topicBody = topic.querySelector(".topic-body");
    const topicTitle = topic.querySelector(".topic-title");

    topic.querySelectorAll(".topic-link").forEach((link) => {
      link.style.display = "block";
    });

    const wasOpen = sidebarOriginalState[topicBody.id] || false;
    topicBody.style.display = wasOpen ? "block" : "none";
    topicTitle.classList.toggle("open", wasOpen);

    topic.style.display = "block";
  });
}

function clearSearch() {
  const input = document.getElementById("sidebarSearch");
  input.value = "";
  currentSearchQuery = "";

  restoreSidebarStateGlobally();

  onPhaseChange();
}

document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const currentPath = window.location.pathname.replace(/\/$/, "");

  document.querySelectorAll(".topic-body").forEach((body) => {
    body.style.display = "none";
  });
  document.querySelectorAll(".topic-title").forEach((title) => {
    title.classList.remove("open");
  });

  loadState();

  document.querySelectorAll(".topic").forEach((topic) => {
    const topicBody = topic.querySelector(".topic-body");
    sidebarOriginalState[topicBody.id] = topicBody.style.display === "block";
  });

  let activePhaseId = null;
  document.querySelectorAll(".topic-link").forEach((link) => {
    const linkPath = link.getAttribute("href").replace(/\/$/, "");
    if (linkPath === currentPath) {
      link.classList.add("active");
      const topicBody = link.closest(".topic-body");
      const topicTitle = topicBody.previousElementSibling;
      topicBody.style.display = "block";
      topicTitle.classList.add("open");
      saveState(topicBody.id, true);
      sidebarOriginalState[topicBody.id] = true;
      activePhaseId = topicBody.id.split("-")[0];
    }
  });

  const select = document.getElementById("phaseSelect");
  const savedPhase = localStorage.getItem("selectedPhase");

  if (select) {
    if (activePhaseId) {
      select.value = activePhaseId;
      localStorage.setItem("selectedPhase", activePhaseId);
    } else if (savedPhase) {
      select.value = savedPhase;
    } else {
      select.selectedIndex = 0;
    }

    onPhaseChange();
  }

  const savedScroll = localStorage.getItem("sidebarScrollTop");
  if (sidebar && savedScroll !== null) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        sidebar.scrollTop = parseInt(savedScroll, 10);
      });
    });
  }
});

document.addEventListener("click", (e) => {
  const link = e.target.closest(".topic-link");
  if (!link) return;
  const sidebar = document.getElementById("sidebar");
  if (!sidebar) return;
  localStorage.setItem("sidebarScrollTop", sidebar.scrollTop);
});

window.addEventListener("beforeunload", () => {
  const sidebar = document.getElementById("sidebar");
  if (sidebar) localStorage.setItem("sidebarScrollTop", sidebar.scrollTop);
});

function toggleFilterDropdown() {
  const dropdown = document.getElementById("filterDropdown");
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
}

function clearFilters() {
  document
    .querySelectorAll(".filter-difficulty, .filter-importance")
    .forEach((cb) => (cb.checked = false));
  filterSidebar();
}

document.addEventListener("click", function (e) {
  const dropdown = document.getElementById("filterDropdown");
  const btn = document.getElementById("filterBtn");

  if (!dropdown.contains(e.target) && !btn.contains(e.target)) {
    dropdown.style.display = "none";
  }
});
