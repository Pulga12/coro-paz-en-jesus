const APP_VERSION = "3.1.0";
const DATA_PATH = "data/app-data.json";
const STORAGE_KEY = "coro-paz-en-jesus-data-v2";

const defaultData = {
  version: APP_VERSION,
  updatedAt: new Date().toISOString(),
  settings: {
    choirName: "Coro Paz en Jesus",
    subtitle: "Aplicación del Coro Paz en Jesús",
    parishPlace: "Salon parroquial"
  },
  songs: [],
  readings: [],
  events: [],
  members: [],
  inventory: []
};

const viewTitles = {
  home: "Coro Paz en Jesus",
  songs: "Canciones",
  readings: "Lecturas y Salmos",
  events: "Eventos",
  members: "Miembros",
  inventory: "Inventario",
  admin: "Administrador"
};

const entityConfig = {
  songs: {
    label: "Canciones",
    singular: "cancion",
    emptyTitle: "Todavia no hay canciones",
    emptyText: "Entra al Administrador para agregar el repertorio, letras y notas musicales.",
    fields: [
      { name: "title", label: "Titulo", required: true },
      { name: "category", label: "Categoria / tipo de cancion" },
      { name: "musicalNotes", label: "Notas musicales", type: "textarea", full: true },
      { name: "lyrics", label: "Letra", type: "textarea", full: true, tall: true },
      { name: "notes", label: "Notas internas", type: "textarea", full: true }
    ],
    columns: [
      { key: "title", label: "Titulo" },
      { key: "category", label: "Categoria" },
      { key: "musicalNotes", label: "Notas musicales" }
    ]
  },
  readings: {
    label: "Lecturas y Salmos",
    singular: "lectura",
    emptyTitle: "Todavia no hay lecturas ni salmos",
    emptyText: "Agrega lecturas, salmos, citas o reflexiones desde el Administrador.",
    fields: [
      { name: "title", label: "Titulo", required: true },
      { name: "type", label: "Tipo", type: "select", options: ["Lectura", "Salmo", "Reflexion", "Oracion"] },
      { name: "date", label: "Fecha", type: "date" },
      { name: "reference", label: "Cita o referencia" },
      { name: "text", label: "Texto", type: "textarea", full: true, tall: true },
      { name: "notes", label: "Notas", type: "textarea", full: true }
    ],
    columns: [
      { key: "title", label: "Titulo" },
      { key: "type", label: "Tipo" },
      { key: "date", label: "Fecha" },
      { key: "reference", label: "Referencia" }
    ]
  },
  events: {
    label: "Eventos",
    singular: "evento",
    emptyTitle: "Todavia no hay eventos",
    emptyText: "Agrega ensayos, misas o actividades desde el Administrador.",
    fields: [
      { name: "title", label: "Actividad", required: true },
      { name: "date", label: "Fecha y hora", type: "datetime" },
      { name: "place", label: "Lugar", placeholder: "Salon parroquial" },
      { name: "note", label: "Nota", type: "textarea", full: true }
    ],
    columns: [
      { key: "title", label: "Actividad" },
      { key: "date", label: "Fecha y hora", formatter: formatDateTime },
      { key: "place", label: "Lugar" }
    ]
  },
  members: {
    label: "Miembros",
    singular: "miembro",
    emptyTitle: "Todavia no hay miembros",
    emptyText: "Agrega nombres, tipo de miembro, cargos y ubicacion musical desde el Administrador.",
    fields: [
      { name: "name", label: "Nombre", required: true },
      { name: "memberType", label: "Tipo", type: "select", options: ["Miembro", "Cabeza de grupo"] },
      { name: "role", label: "Cargo" },
      { name: "group", label: "Grupo liturgico", type: "select", options: ["No", "Si"] },
      { name: "contact", label: "Contacto" },
      { name: "note", label: "Nota", type: "textarea", full: true }
    ],
    columns: [
      { key: "name", label: "Nombre" },
      { key: "memberType", label: "Tipo" },
      { key: "role", label: "Cargo" },
      { key: "group", label: "Grupo liturgico" }
    ]
  },
  inventory: {
    label: "Inventario",
    singular: "item",
    emptyTitle: "Todavia no hay inventario",
    emptyText: "Agrega materiales del coro desde el Administrador.",
    fields: [
      { name: "name", label: "Objeto", required: true },
      { name: "status", label: "Estado", type: "select", options: ["Bueno", "Regular", "Reparar", "Prestado", "Perdido"] },
      { name: "location", label: "Ubicacion" },
      { name: "note", label: "Nota", type: "textarea", full: true }
    ],
    columns: [
      { key: "name", label: "Objeto" },
      { key: "status", label: "Estado" },
      { key: "location", label: "Ubicacion" }
    ]
  }
};

let appData = structuredClone(defaultData);
let currentView = "home";
let currentAdminTab = "settings";
let currentSearch = "";
let currentSongCategory = "";
const editIds = {
  songs: null,
  readings: null,
  events: null,
  members: null,
  inventory: null
};

const content = document.querySelector("#appContent");
const screenTitle = document.querySelector("#screenTitle");
const dataStatus = document.querySelector("#dataStatus");
const eventBell = document.querySelector("#eventBell");
const eventCount = document.querySelector("#eventCount");
const moreToggle = document.querySelector("[data-more-toggle]");
const moreMenu = document.querySelector("#moreMenu");

document.addEventListener("DOMContentLoaded", init);

async function init() {
  appData = await loadData();
  bindNavigation();
  bindMoreMenu();
  bindContentEvents();
  bindEventBell();
  registerServiceWorker();
  render();
}

async function loadData() {
  const local = readLocalData();
  if (local) {
    return normalizeData(local);
  }

  try {
    const response = await fetch(DATA_PATH, { cache: "no-store" });
    if (!response.ok) throw new Error("No se pudo cargar el archivo de datos.");
    const remote = await response.json();
    return normalizeData(remote);
  } catch (error) {
    console.warn(error);
    return normalizeData(defaultData);
  }
}

function readLocalData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.warn(error);
    return null;
  }
}

function normalizeData(raw) {
  const normalized = {
    ...structuredClone(defaultData),
    ...raw,
    settings: {
      ...defaultData.settings,
      ...(raw && raw.settings ? raw.settings : {})
    }
  };

  Object.keys(entityConfig).forEach((key) => {
    normalized[key] = Array.isArray(raw && raw[key])
      ? raw[key].map((item) => ({ id: item.id || createId(key), ...item }))
      : [];
  });
  normalized.members = normalized.members.map(normalizeMember);

  normalized.version = APP_VERSION;
  normalized.updatedAt = raw && raw.updatedAt ? raw.updatedAt : new Date().toISOString();
  if (normalized.settings.subtitle.includes("administrar repertorio") && normalized.settings.subtitle.includes("inventario")) {
    normalized.settings.subtitle = defaultData.settings.subtitle;
  }
  return normalized;
}

function normalizeMember(member) {
  const validTypes = ["Miembro", "Cabeza de grupo"];
  const nextType = validTypes.includes(member.memberType)
    ? member.memberType
    : member.memberType
      ? "Cabeza de grupo"
      : "";
  const nextGroup = member.group === "Si" || member.group === "No" ? member.group : "";
  return {
    ...member,
    memberType: nextType,
    group: nextGroup
  };
}

function persistData() {
  appData.version = APP_VERSION;
  appData.updatedAt = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
  updateStatus();
}

function bindNavigation() {
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      currentView = button.dataset.view;
      currentSearch = "";
      currentSongCategory = "";
      closeMoreMenu();
      render();
    });
  });
}

function bindMoreMenu() {
  if (!moreToggle || !moreMenu) return;

  moreToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const willOpen = moreMenu.classList.contains("hidden");
    moreMenu.classList.toggle("hidden", !willOpen);
    moreToggle.setAttribute("aria-expanded", String(willOpen));
  });

  document.addEventListener("click", (event) => {
    if (moreMenu.classList.contains("hidden")) return;
    if (moreMenu.contains(event.target) || moreToggle.contains(event.target)) return;
    closeMoreMenu();
  });
}

function closeMoreMenu() {
  if (!moreToggle || !moreMenu) return;
  moreMenu.classList.add("hidden");
  moreToggle.setAttribute("aria-expanded", "false");
}

function bindEventBell() {
  if (!eventBell) return;
  eventBell.addEventListener("click", showTodayEvents);
}

function bindContentEvents() {
  content.addEventListener("click", (event) => {
    const viewLink = event.target.closest("[data-view-link]");
    if (viewLink) {
      currentView = viewLink.dataset.viewLink;
      currentSearch = "";
      render();
      return;
    }

    const songDetail = event.target.closest("[data-song-detail]");
    if (songDetail) {
      renderSongDetail(songDetail.dataset.songDetail);
      return;
    }

    const adminTab = event.target.closest("[data-admin-tab]");
    if (adminTab) {
      currentAdminTab = adminTab.dataset.adminTab;
      renderAdmin();
      return;
    }

    const editButton = event.target.closest("[data-edit-entity]");
    if (editButton) {
      editIds[editButton.dataset.editEntity] = editButton.dataset.editId;
      renderAdmin();
      return;
    }

    const deleteButton = event.target.closest("[data-delete-entity]");
    if (deleteButton) {
      deleteEntity(deleteButton.dataset.deleteEntity, deleteButton.dataset.deleteId);
      return;
    }

    if (event.target.closest("[data-cancel-edit]")) {
      const key = event.target.closest("[data-cancel-edit]").dataset.cancelEdit;
      editIds[key] = null;
      renderAdmin();
      return;
    }

    if (event.target.closest("[data-download-json]")) {
      downloadJson();
      return;
    }

    if (event.target.closest("[data-clear-local]")) {
      clearLocalData();
    }
  });

  content.addEventListener("submit", (event) => {
    event.preventDefault();

    if (event.target.matches("[data-settings-form]")) {
      saveSettings(event.target);
      return;
    }

    if (event.target.matches("[data-entity-form]")) {
      saveEntity(event.target.dataset.entityForm, event.target);
    }
  });

  content.addEventListener("input", (event) => {
    if (event.target.matches("[data-search]")) {
      currentSearch = event.target.value;
      updatePublicList(event.target.dataset.search);
    }
  });

  content.addEventListener("change", (event) => {
    if (event.target.matches("[data-import-json]")) {
      importJson(event.target.files[0]);
      return;
    }

    if (event.target.matches("[data-category-filter]")) {
      currentSongCategory = event.target.value;
      updatePublicList("songs");
    }
  });
}

function render() {
  updateStatus();
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === currentView);
  });
  if (moreToggle) {
    moreToggle.classList.toggle("active", ["events", "members", "inventory", "admin"].includes(currentView));
  }
  screenTitle.textContent = viewTitles[currentView] || viewTitles.home;

  if (currentView === "home") renderHome();
  if (currentView === "songs") renderPublicList("songs");
  if (currentView === "readings") renderPublicList("readings");
  if (currentView === "events") renderPublicList("events");
  if (currentView === "members") renderPublicList("members");
  if (currentView === "inventory") renderPublicList("inventory");
  if (currentView === "admin") renderAdmin();
}

function updateStatus() {
  dataStatus.textContent = `Version ${APP_VERSION}`;
  updateEventBell();
}

function updateEventBell() {
  if (!eventBell || !eventCount) return;
  const todayEvents = getTodayEvents();
  eventCount.textContent = String(todayEvents.length);
  eventCount.classList.toggle("hidden", todayEvents.length === 0);
  eventBell.classList.toggle("active", todayEvents.length > 0);
}

function renderHome() {
  const settings = appData.settings;
  content.innerHTML = `
    <section class="hero">
      <img class="hero-logo" src="assets/logo-coro.jpeg" alt="Logo Coro Paz en Jesus">
      <div>
        <h2>${escapeHtml(settings.choirName)}</h2>
        <p>${escapeHtml(settings.subtitle)}</p>
      </div>
    </section>

    <section class="stats-grid" aria-label="Resumen">
      ${statCard(appData.songs.length, "Canciones")}
      ${statCard(appData.readings.length, "Lecturas y Salmos")}
      ${statCard(appData.events.length, "Eventos")}
      ${statCard(appData.members.length, "Miembros")}
      ${statCard(appData.inventory.length, "Inventario")}
    </section>

    <section>
      <div class="section-title">
        <div>
          <p class="eyebrow">Menu</p>
          <h2>Secciones de la app</h2>
        </div>
      </div>
      <div class="section-grid">
        ${homeCard("Canciones", "Repertorio, letras y notas musicales.", "songs")}
        ${homeCard("Lecturas y Salmos", "Lecturas, salmos, citas, oraciones y reflexiones.", "readings")}
        ${homeCard("Eventos", "Ensayos, misas y actividades especiales.", "events")}
        ${homeCard("Miembros", "Integrantes, roles y ubicacion musical.", "members")}
        ${homeCard("Inventario", "Materiales y ubicaciones.", "inventory")}
        ${homeCard("Administrador", "Agregar, editar, borrar y descargar JSON.", "admin")}
      </div>
    </section>
  `;
}

function statCard(number, label) {
  return `<article class="stat"><strong>${number}</strong><span>${label}</span></article>`;
}

function homeCard(title, text, view) {
  return `
    <article class="card">
      <h3>${title}</h3>
      <p>${text}</p>
      <div class="card-meta">
        <button class="secondary-button" type="button" data-view-link="${view}">Abrir</button>
      </div>
    </article>
  `;
}

function renderPublicList(key) {
  const config = entityConfig[key];
  const items = getFilteredItems(key);

  content.innerHTML = `
    <section>
      <div class="section-title">
        <div>
          <p class="eyebrow">${config.label}</p>
          <h2>${config.label}</h2>
          <p>${publicSubtitle(key)}</p>
        </div>
      </div>
      <div class="toolbar">
        <input class="search-input" data-search="${key}" type="search" value="${escapeAttribute(currentSearch)}" placeholder="${escapeAttribute(searchPlaceholder(key))}">
        ${key === "songs" ? renderSongCategoryFilter() : ""}
        <button class="primary-button" type="button" data-view-link="admin">Editar en Admin</button>
      </div>
      <div id="publicListMount">
      ${items.length ? (key === "members" ? renderMembersPublicTable(items) : renderCards(key, items)) : renderEmpty(config.emptyTitle, config.emptyText)}
      </div>
    </section>
  `;
}

function updatePublicList(key) {
  const mount = document.querySelector("#publicListMount");
  if (!mount) {
    renderPublicList(key);
    return;
  }

  const config = entityConfig[key];
  const items = getFilteredItems(key);
  mount.innerHTML = items.length
    ? (key === "members" ? renderMembersPublicTable(items) : renderCards(key, items))
    : renderEmpty(config.emptyTitle, config.emptyText);
}

function getFilteredItems(key) {
  const search = currentSearch.trim().toLowerCase();
  const items = key === "events"
    ? [...appData.events, ...getUpcomingFixedEvents()]
    : [...appData[key]];
  if (key === "events") {
    items.sort((a, b) => String(a.date || "").localeCompare(String(b.date || "")));
  }
  if (!search) return items;
  if (key === "songs") {
    return items.filter((item) => {
      const title = String(item.title || "").toLowerCase();
      const category = String(item.category || "").toLowerCase();
      const matchesSearch = !search || title.includes(search) || category.includes(search);
      const matchesCategory = !currentSongCategory || item.category === currentSongCategory;
      return matchesSearch && matchesCategory;
    });
  }
  return items.filter((item) => JSON.stringify(item).toLowerCase().includes(search));
}

function searchPlaceholder(key) {
  if (key === "songs") return "Buscar cancion por nombre o categoria";
  return "Buscar";
}

function renderSongCategoryFilter() {
  const categories = getSongCategories();
  return `
    <select class="search-input" data-category-filter aria-label="Filtrar canciones por categoria">
      <option value="">Todas las categorias</option>
      ${categories.map((category) => (
        `<option value="${escapeAttribute(category)}" ${category === currentSongCategory ? "selected" : ""}>${escapeHtml(category)}</option>`
      )).join("")}
    </select>
  `;
}

function getSongCategories() {
  return [...new Set(appData.songs.map((song) => cleanValue(song.category)).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, "es"));
}

function publicSubtitle(key) {
  const subtitles = {
    songs: "Letras y notas musicales agregadas por el administrador.",
    readings: "Lecturas, salmos y reflexiones disponibles para el coro.",
    events: "Agenda general con hora, lugar y nota.",
    members: "Listado de integrantes, miembros y cargos.",
    inventory: "Materiales del coro."
  };
  return subtitles[key] || "";
}

function renderCards(key, items) {
  return `<div class="cards-grid">${items.map((item) => renderPublicCard(key, item)).join("")}</div>`;
}

function renderMembersPublicTable(items) {
  return `
    <div class="table-wrap">
      <table class="data-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Cargo</th>
            <th>Grupo liturgico</th>
          </tr>
        </thead>
        <tbody>
          ${items.map((member) => `
            <tr>
              <td>${escapeHtml(member.name || "Sin nombre")}</td>
              <td>${escapeHtml(member.memberType || "")}</td>
              <td>${escapeHtml(member.role || "")}</td>
              <td>${escapeHtml(member.group || "")}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderPublicCard(key, item) {
  if (key === "songs") {
    return `
      <article class="card">
        <h3>${escapeHtml(item.title || "Sin titulo")}</h3>
        <p>${escapeHtml(item.category || "Sin categoria")}</p>
        <div class="card-meta">
          ${item.musicalNotes ? `<span class="tag">Notas musicales</span>` : ""}
          <button class="secondary-button" type="button" data-song-detail="${escapeAttribute(item.id)}">Ver letra</button>
        </div>
      </article>
    `;
  }

  if (key === "events") {
    return `
      <article class="card">
        <h3>${escapeHtml(item.title || "Sin actividad")}</h3>
        <p>${escapeHtml(formatDateTime(item.date))}</p>
        <div class="card-meta">
          ${item.fixed ? `<span class="tag">Fijo</span>` : ""}
          ${item.place ? `<span class="tag">${escapeHtml(item.place)}</span>` : ""}
        </div>
        ${item.note ? `<p class="help-text">${escapeHtml(item.note)}</p>` : ""}
      </article>
    `;
  }

  if (key === "members") {
    return `
      <article class="card">
        <h3>${escapeHtml(item.name || "Sin nombre")}</h3>
        <p>${escapeHtml(item.role || "Sin cargo o rol")}</p>
        <div class="card-meta">
          ${item.memberType ? `<span class="tag">${escapeHtml(item.memberType)}</span>` : ""}
          ${item.group ? `<span class="tag">${escapeHtml(item.group)}</span>` : ""}
        </div>
        ${item.note ? `<p class="help-text">${escapeHtml(item.note)}</p>` : ""}
      </article>
    `;
  }

  if (key === "inventory") {
    return `
      <article class="card">
        <h3>${escapeHtml(item.name || "Sin objeto")}</h3>
        <p>${escapeHtml(item.location || "Sin ubicacion")}</p>
        <div class="card-meta">
          ${item.status ? `<span class="tag">${escapeHtml(item.status)}</span>` : ""}
        </div>
        ${item.note ? `<p class="help-text">${escapeHtml(item.note)}</p>` : ""}
      </article>
    `;
  }

  if (key === "readings") {
    return `
      <article class="card">
        <h3>${escapeHtml(item.title || "Sin titulo")}</h3>
        <p>${escapeHtml(item.reference || item.date || "Sin referencia")}</p>
        <div class="card-meta">
          ${item.type ? `<span class="tag">${escapeHtml(item.type)}</span>` : ""}
        </div>
        ${item.text ? `<p class="help-text">${escapeHtml(item.text)}</p>` : ""}
      </article>
    `;
  }

  return "";
}

function renderSongDetail(songId) {
  const song = appData.songs.find((item) => item.id === songId);
  if (!song) {
    renderPublicList("songs");
    return;
  }

  content.innerHTML = `
    <article class="song-detail">
      <div class="button-row">
        <button class="secondary-button" type="button" data-view-link="songs">Volver</button>
        <button class="primary-button" type="button" data-view-link="admin">Editar en Admin</button>
      </div>
      <h2>${escapeHtml(song.title || "Sin titulo")}</h2>
      <div class="card-meta">
        ${song.category ? `<span class="tag">${escapeHtml(song.category)}</span>` : ""}
        ${song.musicalNotes ? `<span class="tag">Notas musicales</span>` : ""}
      </div>
      ${song.musicalNotes ? `<h3>Notas musicales</h3><div class="lyrics">${escapeHtml(song.musicalNotes)}</div>` : ""}
      <h3>Letra</h3>
      <div class="lyrics">${escapeHtml(song.lyrics || "Sin letra agregada.")}</div>
      ${song.notes ? `<h3>Notas</h3><div class="lyrics">${escapeHtml(song.notes)}</div>` : ""}
    </article>
  `;
}

function renderAdmin() {
  content.innerHTML = `
    <section>
      <div class="section-title">
        <div>
          <p class="eyebrow">Administrador</p>
          <h2>Editar toda la aplicacion</h2>
          <p>Agrega, corrige o borra informacion. Al terminar, descarga el JSON actualizado.</p>
        </div>
      </div>

      <div class="admin-layout">
        <nav class="admin-menu" aria-label="Editor">
          ${adminTab("settings", "Ajustes")}
          ${adminTab("songs", "Canciones")}
          ${adminTab("readings", "Lecturas y Salmos")}
          ${adminTab("events", "Eventos")}
          ${adminTab("members", "Miembros")}
          ${adminTab("inventory", "Inventario")}
        </nav>
        <div class="admin-workspace" id="adminWorkspace">
          ${currentAdminTab === "settings" ? renderSettingsAdmin() : renderEntityAdmin(currentAdminTab)}
        </div>
      </div>
    </section>
  `;
}

function adminTab(key, label) {
  return `
    <button class="admin-tab ${currentAdminTab === key ? "active" : ""}" type="button" data-admin-tab="${key}">
      <span>${label}</span>
      <strong>${key === "settings" ? "" : appData[key].length}</strong>
    </button>
  `;
}

function renderSettingsAdmin() {
  return `
    <section class="admin-section">
      <h3>Descargar o cargar datos</h3>
      <p class="help-text">Despues de editar, descarga el archivo JSON. Ese archivo es el que se sube para publicar los datos.</p>
      <div class="button-row">
        <button class="primary-button" type="button" data-download-json>Descargar app-data.json</button>
        <label class="secondary-button">
          Cargar JSON
          <input class="hidden" type="file" accept="application/json,.json" data-import-json>
        </label>
        <button class="danger-button" type="button" data-clear-local>Borrar datos de este celular</button>
      </div>
      <p class="notice">Este boton de borrar solo limpia los datos guardados en este dispositivo. No borra lo que ya este publicado en linea.</p>
    </section>

    <section class="admin-section">
      <h3>Ajustes generales</h3>
      <form data-settings-form>
        <div class="form-grid">
          <div class="form-field">
            <label for="choirName">Nombre de la app</label>
            <input id="choirName" name="choirName" value="${escapeAttribute(appData.settings.choirName)}" required>
          </div>
          <div class="form-field">
            <label for="parishPlace">Lugar principal</label>
            <input id="parishPlace" name="parishPlace" value="${escapeAttribute(appData.settings.parishPlace)}">
          </div>
          <div class="form-field full">
            <label for="subtitle">Descripcion de inicio</label>
            <textarea id="subtitle" name="subtitle">${escapeHtml(appData.settings.subtitle)}</textarea>
          </div>
        </div>
        <div class="button-row">
          <button class="primary-button" type="submit">Guardar ajustes</button>
        </div>
      </form>
    </section>
  `;
}

function renderEntityAdmin(key) {
  const config = entityConfig[key];
  const editId = editIds[key];
  const editing = appData[key].find((item) => item.id === editId) || {};
  const editingLabel = editId ? `Editando ${config.singular}` : `Agregar ${config.singular}`;

  return `
    <section class="admin-section">
      <h3>${editingLabel}</h3>
      <form data-entity-form="${key}">
        <div class="form-grid">
          ${config.fields.map((field) => renderField(field, editing)).join("")}
        </div>
        <div class="button-row">
          <button class="primary-button" type="submit">${editId ? "Guardar cambios" : "Agregar"}</button>
          ${editId ? `<button class="secondary-button" type="button" data-cancel-edit="${key}">Cancelar</button>` : ""}
        </div>
      </form>
    </section>

    <section class="admin-section">
      <h3>${config.label} agregadas</h3>
      ${appData[key].length ? renderAdminTable(key) : renderEmpty(config.emptyTitle, config.emptyText)}
    </section>
  `;
}

function renderField(field, values) {
  const value = values[field.name] || "";
  const classes = `form-field ${field.full ? "full" : ""}`;
  const required = field.required ? "required" : "";
  const placeholder = field.placeholder ? `placeholder="${escapeAttribute(field.placeholder)}"` : "";

  if (field.type === "textarea") {
    return `
      <div class="${classes}">
        <label for="${field.name}">${field.label}</label>
        <textarea id="${field.name}" name="${field.name}" ${placeholder} ${required} class="${field.tall ? "tall-text" : ""}">${escapeHtml(value)}</textarea>
      </div>
    `;
  }

  if (field.type === "select") {
    return `
      <div class="${classes}">
        <label for="${field.name}">${field.label}</label>
        <select id="${field.name}" name="${field.name}" ${required}>
          <option value="">Seleccionar</option>
          ${field.options.map((option) => `<option value="${escapeAttribute(option)}" ${option === value ? "selected" : ""}>${escapeHtml(option)}</option>`).join("")}
        </select>
      </div>
    `;
  }

  const type = field.type === "date" ? "date" : field.type === "datetime" ? "datetime-local" : field.type === "number" ? "number" : "text";
  const inputValue = field.type === "datetime"
    ? toDateTimeInput(value)
    : field.type === "date" && field.defaultToday && !value
      ? todayLocalDateString()
      : value;
  const numberAttrs = field.type === "number" ? 'min="0" step="0.01"' : "";
  return `
    <div class="${classes}">
      <label for="${field.name}">${field.label}</label>
      <input id="${field.name}" name="${field.name}" type="${type}" value="${escapeAttribute(inputValue)}" ${placeholder} ${required} ${numberAttrs}>
    </div>
  `;
}

function renderAdminTable(key) {
  const config = entityConfig[key];
  return `
    <div class="table-wrap">
      <table class="data-table">
        <thead>
          <tr>
            ${config.columns.map((column) => `<th>${column.label}</th>`).join("")}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${appData[key].map((item) => renderAdminRow(key, item)).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderAdminRow(key, item) {
  const config = entityConfig[key];
  return `
    <tr>
      ${config.columns.map((column) => {
        const value = column.formatter ? column.formatter(item[column.key], item) : item[column.key];
        return `<td>${escapeHtml(value || "")}</td>`;
      }).join("")}
      <td>
        <div class="row-actions">
          <button class="secondary-button" type="button" data-edit-entity="${key}" data-edit-id="${escapeAttribute(item.id)}">Editar</button>
          <button class="danger-button" type="button" data-delete-entity="${key}" data-delete-id="${escapeAttribute(item.id)}">Borrar</button>
        </div>
      </td>
    </tr>
  `;
}

function saveSettings(form) {
  const formData = new FormData(form);
  appData.settings = {
    choirName: cleanValue(formData.get("choirName")) || defaultData.settings.choirName,
    subtitle: cleanValue(formData.get("subtitle")),
    parishPlace: cleanValue(formData.get("parishPlace"))
  };
  persistData();
  renderAdmin();
}

function saveEntity(key, form) {
  const config = entityConfig[key];
  const formData = new FormData(form);
  const values = {};

  config.fields.forEach((field) => {
    values[field.name] = cleanValue(formData.get(field.name));
  });

  const requiredMissing = config.fields.some((field) => field.required && !values[field.name]);
  if (requiredMissing) {
    alert("Completa los campos obligatorios.");
    return;
  }

  const editId = editIds[key];
  if (editId) {
    appData[key] = appData[key].map((item) => (
      item.id === editId
        ? { ...item, ...values, updatedAt: new Date().toISOString() }
        : item
    ));
    editIds[key] = null;
  } else {
    appData[key].push({
      id: createId(key),
      ...values,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  }

  persistData();
  renderAdmin();
}

function deleteEntity(key, id) {
  const config = entityConfig[key];
  const ok = confirm(`Borrar este ${config.singular}?`);
  if (!ok) return;
  appData[key] = appData[key].filter((item) => item.id !== id);
  if (editIds[key] === id) editIds[key] = null;
  persistData();
  renderAdmin();
}

function getTodayEvents() {
  const today = todayLocalDateString();
  const savedEvents = appData.events.filter((event) => String(event.date || "").slice(0, 10) === today);
  return [...savedEvents, ...getFixedEventsForDate(today)];
}

function getUpcomingFixedEvents() {
  const events = [];
  const start = parseDateOnly(todayLocalDateString());
  for (let offset = 0; offset < 56; offset += 1) {
    const date = new Date(start);
    date.setDate(start.getDate() + offset);
    events.push(...getFixedEventsForDate(dateToInputValue(date)));
  }
  return events;
}

function getFixedEventsForDate(dateString) {
  const date = parseDateOnly(dateString);
  if (!date) return [];

  const day = date.getDay();
  if (day === 6) {
    return [{
      id: `fixed-rehearsal-${dateString}`,
      fixed: true,
      title: "Ensayo general",
      date: `${dateString}T16:00:00`,
      place: "Salon parroquial",
      note: "Ensayo fijo de 4:00 p. m. a 7:30-8:30 p. m."
    }];
  }

  if (day === 0) {
    return [{
      id: `fixed-mass-${dateString}`,
      fixed: true,
      title: "Misa dominical",
      date: `${dateString}T18:30:00`,
      place: "Templo parroquial",
      note: "Participacion fija de 6:30 p. m. a 8:30-9:00 p. m."
    }];
  }

  return [];
}

function showTodayEvents() {
  const todayEvents = getTodayEvents();
  if (!todayEvents.length) {
    alert("No hay eventos para hoy.");
    return;
  }

  const message = todayEvents.map((event) => {
    const time = event.date ? formatDateTime(event.date) : "Sin hora";
    const place = event.place ? ` - ${event.place}` : "";
    const note = event.note ? `\n${event.note}` : "";
    return `${event.title || "Evento"}\n${time}${place}${note}`;
  }).join("\n\n");

  alert(`Eventos de hoy:\n\n${message}`);
}

function downloadJson() {
  const dataToDownload = normalizeData(appData);
  dataToDownload.updatedAt = new Date().toISOString();
  const blob = new Blob([JSON.stringify(dataToDownload, null, 2)], {
    type: "application/json"
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "app-data.json";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function importJson(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      appData = normalizeData(JSON.parse(reader.result));
      persistData();
      currentAdminTab = "settings";
      renderAdmin();
      alert("JSON cargado correctamente.");
    } catch (error) {
      console.error(error);
      alert("No se pudo cargar el JSON. Revisa que sea el archivo correcto.");
    }
  };
  reader.readAsText(file);
}

function clearLocalData() {
  const ok = confirm("Esto dejara en blanco los datos guardados en este dispositivo. Continuar?");
  if (!ok) return;
  localStorage.removeItem(STORAGE_KEY);
  appData = normalizeData(defaultData);
  currentAdminTab = "settings";
  Object.keys(editIds).forEach((key) => { editIds[key] = null; });
  render();
}

function renderEmpty(title, text) {
  return `
    <div class="empty-state">
      <img src="assets/logo-coro.jpeg" alt="">
      <h2>${escapeHtml(title)}</h2>
      <p>${escapeHtml(text)}</p>
      <div class="button-row">
        <button class="primary-button" type="button" data-view-link="admin">Ir a Administrador</button>
      </div>
    </div>
  `;
}

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function cleanValue(value) {
  return String(value || "").trim();
}

function formatDateTime(value) {
  if (!value) return "Sin fecha";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat("es-US", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(date);
}

function parseDateOnly(value) {
  if (!value) return null;
  const parts = String(value).slice(0, 10).split("-").map(Number);
  if (parts.length !== 3 || parts.some((part) => !Number.isFinite(part))) {
    return null;
  }
  const [year, month, day] = parts;
  return new Date(year, month - 1, day);
}

function todayLocalDateString() {
  return dateToInputValue(new Date());
}

function dateToInputValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function toDateTimeInput(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value).slice(0, 16);
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);
  return localDate.toISOString().slice(0, 16);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value);
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").then((registration) => {
      registration.update().catch((error) => console.warn(error));
      window.setInterval(() => {
        registration.update().catch((error) => console.warn(error));
      }, 60 * 60 * 1000);
    }).catch((error) => console.warn(error));
  });
}
