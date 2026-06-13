const APP_VERSION = "3.9.0";
const VERSION_PATH = "version.json";
const DATA_PATH = "data/app-data.json";
const STORAGE_KEY = "coro-paz-en-jesus-data-v2";
const EVENT_READ_KEY = "coro-paz-en-jesus-read-events-v1";
const FAVORITES_KEY = "coro-paz-en-jesus-favorite-songs-v1";
const LYRICS_SIZE_KEY = "coro-paz-en-jesus-lyrics-size-v1";
const SUNDAY_PERSONAL_KEY = "coro-paz-en-jesus-domingo-personal-v1";
const THEME_KEY = "coro-paz-en-jesus-theme-v1";
const UPDATE_CHECK_INTERVAL = 60 * 1000;
const MINIMUM_STARTUP_MS = 10000;
const APP_CACHE_PREFIX = "coro-paz-en-jesus-";
const CURRENT_CACHE_NAME = "coro-paz-en-jesus-v3-9-0";

const SONG_MOMENTS = [
  "Entrada",
  "Perdon",
  "Gloria",
  "Salmo",
  "Aleluya",
  "Ofertorio",
  "Santo",
  "Paz",
  "Comunion",
  "Salida",
  "Mariano",
  "Animacion",
  "Otro"
];

const SONG_MASS_STATUSES = ["Permitida", "No permitida"];

const SUNDAY_PLAN_MOMENTS = [
  "Entrada",
  "Perdon",
  "Gloria",
  "Salmo",
  "Aleluya",
  "Ofertorio",
  "Santo",
  "Paz",
  "Comunion",
  "Salida"
];

const SUNDAY_SHARE_LABELS = {
  Entrada: "E",
  Perdon: "P",
  Gloria: "G",
  Salmo: "Sal",
  Aleluya: "A",
  Ofertorio: "O",
  Santo: "S",
  Paz: "Paz",
  Comunion: "C",
  Salida: "S"
};

const defaultData = {
  version: APP_VERSION,
  updatedAt: new Date().toISOString(),
  settings: {
    choirName: "Coro Paz en Jesús",
    subtitle: "Aplicación del Coro Paz en Jesús",
    parishPlace: "Salon parroquial"
  },
  songs: [],
  readings: [],
  events: [],
  members: [],
  liturgy: []
};

const viewTitles = {
  home: "Coro Paz en Jesús",
  songs: "Canciones",
  readings: "Lecturas y Salmos",
  sunday: "Domingo",
  events: "Eventos",
  members: "Miembros",
  liturgy: "Calendario liturgico",
  admin: "Administrador"
};

const entityConfig = {
  songs: {
    label: "Canciones",
    singular: "cancion",
    emptyTitle: "Todavia no hay canciones",
    emptyText: "Entra al Administrador para agregar el repertorio, letras y notas musicales.",
    fields: [
      { name: "songNumber", label: "Numero de cancion", type: "number", min: 0, max: 1000, step: 1 },
      { name: "title", label: "Titulo", required: true },
      { name: "moment", label: "Momento de misa", type: "select", options: SONG_MOMENTS },
      { name: "massStatus", label: "Estado para misa", type: "select", options: SONG_MASS_STATUSES },
      { name: "musicalNotes", label: "Notas musicales", type: "textarea", full: true },
      { name: "lyrics", label: "Letra", type: "textarea", full: true, tall: true },
      { name: "notes", label: "Notas internas", type: "textarea", full: true }
    ],
    columns: [
      { key: "songNumber", label: "Numero" },
      { key: "title", label: "Titulo" },
      { key: "moment", label: "Momento" },
      { key: "massStatus", label: "Estado" },
      { key: "musicalNotes", label: "Notas musicales" }
    ]
  },
  readings: {
    label: "Lecturas y Salmos",
    singular: "lectura",
    emptyTitle: "Todavia no hay lecturas ni salmos",
    emptyText: "Agrega las lecturas y salmos por fecha desde el Administrador.",
    fields: [
      { name: "title", label: "Titulo del domingo", required: true },
      { name: "date", label: "Fecha", type: "date" },
      { name: "firstReading", label: "Primera lectura", type: "textarea", full: true },
      { name: "psalm", label: "Salmo", type: "textarea", full: true },
      { name: "secondReading", label: "Segunda lectura", type: "textarea", full: true },
      { name: "gospel", label: "Evangelio", type: "textarea", full: true },
      { name: "reflection", label: "Reflexion breve", type: "textarea", full: true },
      { name: "recommendedPsalm", label: "Salmo cantado recomendado" },
      { name: "notes", label: "Notas", type: "textarea", full: true }
    ],
    columns: [
      { key: "title", label: "Titulo" },
      { key: "date", label: "Fecha" },
      { key: "recommendedPsalm", label: "Salmo recomendado" }
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
    emptyText: "Agrega nombres, tipo de miembro, cargo y estado desde el Administrador.",
    fields: [
      { name: "name", label: "Nombre", required: true },
      { name: "memberType", label: "Tipo", type: "select", options: ["Miembro", "Cabeza de grupo"] },
      { name: "role", label: "Cargo" },
      { name: "group", label: "Grupo liturgico", type: "select", options: ["No", "Si"] },
      { name: "status", label: "Estado", type: "select", options: ["Activo", "Inactivo", "Descanso"] },
      { name: "contact", label: "Contacto" },
      { name: "note", label: "Nota", type: "textarea", full: true }
    ],
    columns: [
      { key: "name", label: "Nombre" },
      { key: "memberType", label: "Tipo" },
      { key: "role", label: "Cargo" },
      { key: "group", label: "Grupo liturgico" },
      { key: "status", label: "Estado" }
    ]
  },
  liturgy: {
    label: "Calendario liturgico",
    singular: "fecha liturgica",
    emptyTitle: "Todavia no hay tiempos liturgicos",
    emptyText: "Agrega semanas, dias, meses, fiestas marianas, solemnidades y tiempos liturgicos.",
    fields: [
      { name: "title", label: "Semana, dia o celebracion", required: true },
      { name: "season", label: "Tiempo liturgico", type: "select", options: ["Adviento", "Navidad", "Cuaresma", "Semana Santa", "Pascua", "Tiempo Ordinario", "Fiesta mariana", "Solemnidad", "Otro"] },
      { name: "startDate", label: "Fecha de inicio", type: "date" },
      { name: "endDate", label: "Fecha de fin", type: "date" },
      { name: "suggestions", label: "Sugerencias de canciones", type: "textarea", full: true, placeholder: "Ven Senor no tardes\nEsperando al Senor\nPreparen el camino" },
      { name: "notes", label: "Notas", type: "textarea", full: true }
    ],
    columns: [
      { key: "title", label: "Celebracion" },
      { key: "season", label: "Tiempo" },
      { key: "startDate", label: "Inicio" },
      { key: "endDate", label: "Fin" },
      { key: "suggestions", label: "Sugerencias" }
    ]
  }
};

let appData = structuredClone(defaultData);
let currentView = "home";
let currentAdminTab = "settings";
let currentSearch = "";
let currentSongMoment = "";
let currentSongDetailId = null;
let showFavoritesOnly = false;
let favoriteSongIds = new Set(readStoredArray(FAVORITES_KEY));
let largeLyricsMode = localStorage.getItem(LYRICS_SIZE_KEY) === "large";
let personalSundayPlan = readPersonalSundayPlan();
let currentTheme = localStorage.getItem(THEME_KEY) === "dark" ? "dark" : "light";
applyTheme(currentTheme);
const editIds = {
  songs: null,
  readings: null,
  events: null,
  members: null,
  liturgy: null
};

const content = document.querySelector("#appContent");
const screenTitle = document.querySelector("#screenTitle");
const dataStatus = document.querySelector("#dataStatus");
const eventBell = document.querySelector("#eventBell");
const eventCount = document.querySelector("#eventCount");
const themeToggle = document.querySelector("#themeToggle");
const moreToggle = document.querySelector("[data-more-toggle]");
const moreMenu = document.querySelector("#moreMenu");
const updateOverlay = document.querySelector("#updateOverlay");
const updateStep = document.querySelector("#updateStep");
const updateEta = document.querySelector("#updateEta");
let updateCountdownTimer = null;
let updateCheckRunning = false;

document.addEventListener("DOMContentLoaded", init);

async function init() {
  const startupStartedAt = Date.now();
  showUpdateOverlay("Borrando cache anterior", 10);
  await clearOldAppCaches();

  setUpdateMessage("Cargando datos de la app", "Tiempo estimado: unos segundos");
  appData = await loadData();

  setUpdateMessage("Revisando actualizacion desde la web", "Tiempo estimado: unos segundos");
  await checkRemoteVersionBeforeStart();

  setUpdateMessage("Preparando pantalla de inicio", "Tiempo estimado: unos segundos");
  bindNavigation();
  bindMoreMenu();
  bindContentEvents();
  bindEventBell();
  bindThemeToggle();
  registerServiceWorker();
  render();
  setUpdateMessage("Terminando carga de la app", "Tiempo estimado: unos segundos");
  await waitForMinimumStartup(startupStartedAt);
  hideUpdateOverlay();
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

async function checkRemoteVersionBeforeStart() {
  try {
    const response = await fetch(`${VERSION_PATH}?t=${Date.now()}`, {
      cache: "no-store"
    });
    if (!response.ok) return;
    const remote = await response.json();
    if (remote.version && remote.version !== APP_VERSION) {
      setUpdateMessage("Borrando cache anterior", "Tiempo estimado: unos segundos");
      await clearAppCaches();
      setUpdateMessage("Actualizando desde la web", "Tiempo estimado: unos segundos");
      window.location.reload();
    }
  } catch (error) {
    console.warn(error);
  }
}

async function clearOldAppCaches() {
  if (!("caches" in window)) return;
  const keys = await caches.keys();
  await Promise.all(
    keys
      .filter((key) => key.startsWith(APP_CACHE_PREFIX) && key !== CURRENT_CACHE_NAME)
      .map((key) => caches.delete(key))
  );
}

function waitForMinimumStartup(startedAt) {
  const elapsed = Date.now() - startedAt;
  const remaining = Math.max(0, MINIMUM_STARTUP_MS - elapsed);
  return delay(remaining);
}

function delay(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
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
  normalized.songs = normalized.songs.map(normalizeSong);
  normalized.readings = normalized.readings.map(normalizeReading);
  normalized.members = normalized.members.map(normalizeMember);
  normalized.liturgy = normalized.liturgy.map(normalizeLiturgy);
  delete normalized.inventory;
  delete normalized.sundayPlan;

  normalized.version = APP_VERSION;
  normalized.updatedAt = raw && raw.updatedAt ? raw.updatedAt : new Date().toISOString();
  const oldRemovedWord = "inven" + "tario";
  if (normalized.settings.subtitle.includes("administrar repertorio") && normalized.settings.subtitle.includes(oldRemovedWord)) {
    normalized.settings.subtitle = defaultData.settings.subtitle;
  }
  normalized.settings.choirName = fixJesusAccent(normalized.settings.choirName || defaultData.settings.choirName);
  normalized.settings.subtitle = fixJesusAccent(normalized.settings.subtitle || defaultData.settings.subtitle);
  return normalized;
}

function normalizeSong(song) {
  const normalized = {
    ...song,
    songNumber: normalizeSongNumber(song.songNumber),
    moment: SONG_MOMENTS.includes(song.moment) ? song.moment : inferSongMoment(song),
    massStatus: SONG_MASS_STATUSES.includes(song.massStatus) ? song.massStatus : "Permitida"
  };
  delete normalized["cat" + "egory"];
  return normalized;
}

function normalizeSongNumber(value) {
  const clean = cleanValue(value);
  if (!clean) return "";
  const number = Number(clean);
  if (!Number.isInteger(number) || number < 0 || number > 1000) return "";
  return String(number);
}

function normalizeSundayPlan(plan) {
  const rawSlots = Array.isArray(plan && plan.slots) ? plan.slots : [];
  return {
    date: plan && plan.date ? cleanValue(plan.date) : "",
    notes: plan && plan.notes ? cleanValue(plan.notes) : "",
    slots: SUNDAY_PLAN_MOMENTS.map((moment, index) => {
      const existing = rawSlots.find((slot) => slot && slot.moment === moment) || rawSlots[index] || {};
      const existingIds = Array.isArray(existing.songIds)
        ? existing.songIds
        : existing.songId
          ? [existing.songId]
          : [];
      return {
        moment,
        songIds: existingIds.map(cleanValue).filter(Boolean).slice(0, 3)
      };
    })
  };
}

function readPersonalSundayPlan() {
  try {
    const saved = localStorage.getItem(SUNDAY_PERSONAL_KEY);
    if (saved) return normalizeSundayPlan(JSON.parse(saved));

    const oldLocalData = localStorage.getItem(STORAGE_KEY);
    if (oldLocalData) {
      const parsed = JSON.parse(oldLocalData);
      if (parsed && parsed.sundayPlan) return normalizeSundayPlan(parsed.sundayPlan);
    }
  } catch (error) {
    console.warn(error);
  }
  return normalizeSundayPlan(null);
}

function persistPersonalSundayPlan() {
  localStorage.setItem(SUNDAY_PERSONAL_KEY, JSON.stringify(personalSundayPlan));
}

function normalizeMember(member) {
  const validTypes = ["Miembro", "Cabeza de grupo"];
  const validStatuses = ["Activo", "Inactivo", "Descanso"];
  const validGroups = ["No", "Si"];
  const nextType = validTypes.includes(member.memberType)
    ? member.memberType
    : member.memberType
      ? "Cabeza de grupo"
      : "";
  const nextStatus = validStatuses.includes(member.status) ? member.status : "Activo";
  const nextGroup = validGroups.includes(member.group) ? member.group : "No";
  return {
    ...member,
    memberType: nextType,
    status: nextStatus,
    group: nextGroup
  };
}

function normalizeReading(reading) {
  return {
    ...reading,
    title: cleanValue(reading.title || reading.name),
    date: cleanValue(reading.date),
    firstReading: cleanValue(reading.firstReading || reading.text),
    psalm: cleanValue(reading.psalm),
    secondReading: cleanValue(reading.secondReading),
    gospel: cleanValue(reading.gospel),
    reflection: cleanValue(reading.reflection || reading.note),
    recommendedPsalm: cleanValue(reading.recommendedPsalm),
    notes: cleanValue(reading.notes)
  };
}

function normalizeLiturgy(item) {
  return {
    ...item,
    title: cleanValue(item.title),
    season: cleanValue(item.season),
    startDate: cleanValue(item.startDate || item.date),
    endDate: cleanValue(item.endDate || item.startDate || item.date),
    suggestions: cleanValue(item.suggestions),
    notes: cleanValue(item.notes)
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
      currentSongMoment = "";
      currentSongDetailId = null;
      showFavoritesOnly = false;
      closeMoreMenu();
      render();
      scrollAppToTop();
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

function bindThemeToggle() {
  updateThemeToggle();
  if (!themeToggle) return;
  themeToggle.addEventListener("click", () => {
    currentTheme = currentTheme === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, currentTheme);
    applyTheme(currentTheme);
    updateThemeToggle();
  });
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme === "dark" ? "dark" : "light";
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) metaTheme.setAttribute("content", theme === "dark" ? "#050505" : "#1c19ff");
}

function updateThemeToggle() {
  if (!themeToggle) return;
  const isDark = currentTheme === "dark";
  themeToggle.textContent = isDark ? "Claro" : "Oscuro";
  themeToggle.setAttribute("aria-label", isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
}

function bindContentEvents() {
  content.addEventListener("click", (event) => {
    const viewLink = event.target.closest("[data-view-link]");
    if (viewLink) {
      currentView = viewLink.dataset.viewLink;
      currentSearch = "";
      currentSongMoment = "";
      currentSongDetailId = null;
      showFavoritesOnly = false;
      render();
      scrollAppToTop();
      return;
    }

    const songDetail = event.target.closest("[data-song-detail]");
    if (songDetail) {
      renderSongDetail(songDetail.dataset.songDetail);
      scrollAppToTop();
      return;
    }

    const favoriteButton = event.target.closest("[data-toggle-favorite]");
    if (favoriteButton) {
      toggleFavoriteSong(favoriteButton.dataset.toggleFavorite);
      return;
    }

    if (event.target.closest("[data-toggle-favorites-only]")) {
      showFavoritesOnly = !showFavoritesOnly;
      updatePublicList("songs");
      return;
    }

    if (event.target.closest("[data-clear-search]")) {
      currentSearch = "";
      currentSongMoment = "";
      showFavoritesOnly = false;
      renderPublicList("songs");
      scrollAppToTop();
      return;
    }

    if (event.target.closest("[data-clear-sunday]")) {
      clearPersonalSundayPlan();
      return;
    }

    if (event.target.closest("[data-share-sunday]")) {
      shareSundayRepertoire();
      return;
    }

    if (event.target.closest("[data-copy-sunday]")) {
      copySundayRepertoire();
      return;
    }

    if (event.target.closest("[data-download-sunday-pdf]")) {
      downloadSundayPdf();
      return;
    }

    if (event.target.closest("[data-toggle-lyrics-size]")) {
      largeLyricsMode = !largeLyricsMode;
      localStorage.setItem(LYRICS_SIZE_KEY, largeLyricsMode ? "large" : "normal");
      if (currentSongDetailId) renderSongDetail(currentSongDetailId);
      return;
    }

    const adminTab = event.target.closest("[data-admin-tab]");
    if (adminTab) {
      currentAdminTab = adminTab.dataset.adminTab;
      renderAdmin();
      scrollAppToTop();
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
      return;
    }

    if (event.target.matches("[data-sunday-personal-form]")) {
      savePersonalSundayPlan(event.target);
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

    if (event.target.matches("[data-moment-filter]")) {
      currentSongMoment = event.target.value;
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
    moreToggle.classList.toggle("active", ["sunday", "events", "members", "liturgy", "admin"].includes(currentView));
  }
  screenTitle.textContent = viewTitles[currentView] || viewTitles.home;

  if (currentView === "home") renderHome();
  if (currentView === "songs") renderPublicList("songs");
  if (currentView === "readings") renderPublicList("readings");
  if (currentView === "sunday") renderSundayPlan();
  if (currentView === "events") renderPublicList("events");
  if (currentView === "members") renderPublicList("members");
  if (currentView === "liturgy") renderPublicList("liturgy");
  if (currentView === "admin") renderAdmin();
}

function updateStatus() {
  dataStatus.textContent = `Version ${APP_VERSION}`;
  updateEventBell();
}

function scrollAppToTop() {
  requestAnimationFrame(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if (content) content.scrollTop = 0;
  });
}

function showUpdateOverlay(message, seconds = 20) {
  if (!updateOverlay) return;
  setUpdateMessage(message, "");
  updateOverlay.classList.remove("hidden");
  startUpdateCountdown(seconds);
}

function hideUpdateOverlay() {
  if (!updateOverlay) return;
  window.clearInterval(updateCountdownTimer);
  updateCountdownTimer = null;
  updateOverlay.classList.add("hidden");
}

function setUpdateMessage(message, etaText) {
  if (updateStep) updateStep.textContent = message;
  if (updateEta && etaText) updateEta.textContent = etaText;
}

function startUpdateCountdown(seconds) {
  if (!updateEta) return;
  window.clearInterval(updateCountdownTimer);
  let remaining = seconds;
  updateEta.textContent = formatRemainingTime(remaining);
  updateCountdownTimer = window.setInterval(() => {
    remaining = Math.max(0, remaining - 1);
    updateEta.textContent = formatRemainingTime(remaining);
    if (remaining === 0) {
      window.clearInterval(updateCountdownTimer);
      updateCountdownTimer = null;
    }
  }, 1000);
}

function formatRemainingTime(seconds) {
  if (seconds <= 0) return "Terminando...";
  if (seconds < 60) return `Tiempo estimado: ${seconds} segundos`;
  const minutes = Math.ceil(seconds / 60);
  return `Tiempo estimado: ${minutes} minuto${minutes === 1 ? "" : "s"}`;
}

function updateEventBell() {
  if (!eventBell || !eventCount) return;
  const todayEvents = getTodayEvents();
  const readIds = getReadEventIdsForToday();
  const unreadEvents = todayEvents.filter((event) => !readIds.includes(event.id));
  eventCount.textContent = String(unreadEvents.length);
  eventCount.classList.toggle("hidden", unreadEvents.length === 0);
  eventBell.classList.toggle("active", unreadEvents.length > 0);
}

function renderHome() {
  const settings = appData.settings;
  content.innerHTML = `
    <section class="hero">
      <img class="hero-logo" src="assets/logo-coro.jpeg" alt="Logo Coro Paz en Jesús">
      <div>
        <h2>${escapeHtml(settings.choirName)}</h2>
        <p>${escapeHtml(settings.subtitle)}</p>
      </div>
    </section>

    <section class="stats-grid" aria-label="Resumen">
      ${statCard(appData.songs.length, "Canciones")}
      ${statCard(appData.readings.length, "Lecturas y Salmos")}
      ${statCard(getSundayPlanSongs().length, "Domingo")}
      ${statCard(appData.events.length, "Eventos")}
      ${statCard(appData.members.length, "Miembros")}
      ${statCard(appData.liturgy.length, "Calendario")}
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
        ${homeCard("Domingo", "Repertorio personal guardado en este celular.", "sunday")}
        ${homeCard("Calendario liturgico", "Semanas, dias, meses y sugerencias confirmadas.", "liturgy")}
        ${homeCard("Eventos", "Ensayos, misas y actividades especiales.", "events")}
        ${homeCard("Miembros", "Integrantes, roles y ubicacion musical.", "members")}
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
        ${key === "songs" ? renderSongMomentFilter() : ""}
        ${key === "songs" ? `<button class="secondary-button ${showFavoritesOnly ? "active-filter" : ""}" type="button" data-toggle-favorites-only>Favoritos</button>` : ""}
        ${key === "songs" ? `<button class="secondary-button" type="button" data-clear-search>Limpiar</button>` : ""}
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
  const search = foldText(currentSearch);
  const items = key === "events"
    ? [...appData.events, ...getUpcomingFixedEvents()]
    : [...appData[key]];
  if (key === "events") {
    items.sort((a, b) => String(a.date || "").localeCompare(String(b.date || "")));
  }
  if (key === "liturgy") {
    items.sort((a, b) => String(a.startDate || "").localeCompare(String(b.startDate || "")));
  }
  if (key === "songs") {
    return items.filter((item) => {
      const title = foldText(item.title);
      const number = foldText(item.songNumber);
      const moment = foldText(getSongMoment(item));
      const matchesSearch = !search || title.includes(search) || number.includes(search) || moment.includes(search);
      const matchesMoment = !currentSongMoment || getSongMoment(item) === currentSongMoment;
      const matchesFavorite = !showFavoritesOnly || favoriteSongIds.has(item.id);
      return matchesSearch && matchesMoment && matchesFavorite;
    });
  }
  if (!search) return items;
  return items.filter((item) => foldText(JSON.stringify(item)).includes(search));
}

function searchPlaceholder(key) {
  if (key === "songs") return "Buscar por numero, nombre o momento";
  return "Buscar";
}

function renderSongMomentFilter() {
  return `
    <select class="search-input" data-moment-filter aria-label="Filtrar canciones por momento de misa">
      <option value="">Todos los momentos</option>
      ${SONG_MOMENTS.map((moment) => (
        `<option value="${escapeAttribute(moment)}" ${moment === currentSongMoment ? "selected" : ""}>${escapeHtml(moment)}</option>`
      )).join("")}
    </select>
  `;
}

function getSongsSortedByTitle() {
  return [...appData.songs].sort((a, b) => {
    const numberA = Number(a.songNumber);
    const numberB = Number(b.songNumber);
    if (Number.isInteger(numberA) && Number.isInteger(numberB) && numberA !== numberB) {
      return numberA - numberB;
    }
    return String(a.title || "").localeCompare(String(b.title || ""), "es");
  });
}

function getSundayPlanSongs() {
  if (!personalSundayPlan || !Array.isArray(personalSundayPlan.slots)) return [];
  return personalSundayPlan.slots.flatMap((slot) => {
    const ids = Array.isArray(slot.songIds)
      ? slot.songIds
      : slot.songId
        ? [slot.songId]
        : [];
    return ids
      .map((songId, songIndex) => ({
        moment: slot.moment,
        songIndex,
        song: appData.songs.find((song) => song.id === songId)
      }))
      .filter((item) => item.song);
  });
}

function buildSundayShareText() {
  const dateLabel = personalSundayPlan.date ? formatShortDate(personalSundayPlan.date) : "";
  const heading = dateLabel ? `Cantos de Domingo ${dateLabel}` : "Cantos de Domingo";
  const lines = personalSundayPlan.slots.flatMap((slot) => {
    const selectedSongs = getSongsForSundaySlot(slot);
    return selectedSongs.map((song, index) => {
      const label = index === 0 ? `${SUNDAY_SHARE_LABELS[slot.moment] || slot.moment} - ` : "  - ";
      return `${label}${formatSongShareTitle(song)}`;
    });
  });

  if (personalSundayPlan.notes) {
    lines.push("");
    lines.push(personalSundayPlan.notes);
  }

  return [heading, "", ...lines].join("\n").trim();
}

function getSongsForSundaySlot(slot) {
  if (!slot) return [];
  const ids = Array.isArray(slot.songIds)
    ? slot.songIds
    : slot.songId
      ? [slot.songId]
      : [];
  return ids
    .map((songId) => appData.songs.find((song) => song.id === songId))
    .filter(Boolean);
}

function formatSongShareTitle(song) {
  const number = song.songNumber !== "" && song.songNumber !== undefined ? `#${song.songNumber} ` : "";
  return `${number}${song.title || "Sin titulo"}`.trim();
}

function formatSongOption(song) {
  const number = song.songNumber !== "" && song.songNumber !== undefined ? `N. ${song.songNumber} - ` : "";
  const moment = getSongMoment(song) ? ` / ${getSongMoment(song)}` : "";
  return `${number}${song.title || "Sin titulo"} (${getSongMassStatus(song)}${moment})`;
}

function getSongMassStatus(song) {
  return SONG_MASS_STATUSES.includes(song && song.massStatus) ? song.massStatus : "Permitida";
}

function renderSongStatusBadge(song) {
  const status = getSongMassStatus(song);
  const className = status === "No permitida" ? "status-bad" : "status-ok";
  return `<span class="status-badge ${className}">${escapeHtml(status)}</span>`;
}

function toggleFavoriteSong(songId) {
  if (!songId) return;
  if (favoriteSongIds.has(songId)) {
    favoriteSongIds.delete(songId);
  } else {
    favoriteSongIds.add(songId);
  }
  localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favoriteSongIds]));
  if (currentSongDetailId) {
    renderSongDetail(currentSongDetailId);
    return;
  }
  updatePublicList("songs");
}

function publicSubtitle(key) {
  const subtitles = {
    songs: "Letras y notas musicales agregadas por el administrador.",
    readings: "Lecturas, salmos y reflexiones guardadas por fecha.",
    events: "Agenda general con hora, lugar y nota.",
    members: "Listado de integrantes, miembros y cargos.",
    liturgy: "Tiempos liturgicos, semanas, dias y sugerencias confirmadas."
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
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          ${items.map((member) => `
            <tr>
              <td>${escapeHtml(member.name || "Sin nombre")}</td>
              <td>${escapeHtml(member.memberType || "")}</td>
              <td>${escapeHtml(member.role || "")}</td>
              <td>${escapeHtml(member.group || "No")}</td>
              <td>${escapeHtml(member.status || "")}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderSundayPlan() {
  const planSongs = getSundayPlanSongs();
  const dateText = personalSundayPlan.date ? formatDateOnly(personalSundayPlan.date) : "Sin fecha";

  content.innerHTML = `
    <section>
      <div class="section-title">
        <div>
          <p class="eyebrow">Repertorio personal</p>
          <h2>Domingo</h2>
          <p>Escoge en este celular las canciones dadas para cada momento de la misa.</p>
        </div>
      </div>
      <div class="panel sunday-summary">
        <strong>${escapeHtml(dateText)}</strong>
        ${personalSundayPlan.notes ? `<p>${escapeHtml(personalSundayPlan.notes)}</p>` : `<p>Esta seleccion se guarda solo en este celular.</p>`}
      </div>
      ${renderSundayPersonalEditor()}
      ${renderSundaySharePanel(planSongs)}
      <div class="section-title compact-title">
        <div>
          <p class="eyebrow">Canciones escogidas</p>
          <h2>Mi repertorio</h2>
        </div>
      </div>
      ${planSongs.length ? renderSundayPlanCards(planSongs) : renderSundayEmpty()}
    </section>
  `;
}

function renderSundayPersonalEditor() {
  return `
    <section class="admin-section">
      <h3>Armar mi Domingo</h3>
      <p class="help-text">Elige las canciones desde el repertorio cargado en la app. Esto no cambia el JSON oficial.</p>
      <form data-sunday-personal-form>
        <div class="form-grid">
          <div class="form-field">
            <label for="personalSundayDate">Fecha</label>
            <input id="personalSundayDate" name="date" type="date" value="${escapeAttribute(personalSundayPlan.date || "")}">
          </div>
          <div class="form-field full">
            <label for="personalSundayNotes">Notas</label>
            <textarea id="personalSundayNotes" name="notes">${escapeHtml(personalSundayPlan.notes || "")}</textarea>
          </div>
          ${SUNDAY_PLAN_MOMENTS.map((moment, index) => renderSundaySlotField(moment, index)).join("")}
        </div>
        <div class="button-row">
          <button class="primary-button" type="submit">Guardar mi Domingo</button>
          <button class="secondary-button" type="button" data-clear-sunday>Limpiar Domingo</button>
        </div>
      </form>
    </section>
  `;
}

function renderSundaySharePanel(planSongs) {
  const shareText = buildSundayShareText();
  const disabled = planSongs.length ? "" : "disabled";
  return `
    <section class="admin-section share-panel">
      <h3>Vista para WhatsApp</h3>
      <p class="help-text">Asi se manda rapido al grupo del coro, parecido al formato que usan en WhatsApp.</p>
      <pre class="share-preview">${escapeHtml(shareText)}</pre>
      <div class="button-row">
        <button class="primary-button" type="button" data-share-sunday ${disabled}>Compartir repertorio</button>
        <button class="secondary-button" type="button" data-copy-sunday ${disabled}>Copiar texto</button>
        <button class="secondary-button" type="button" data-download-sunday-pdf ${disabled}>Descargar repertorio PDF</button>
      </div>
    </section>
  `;
}

function renderSundayEmpty() {
  return `
    <div class="empty-state">
      <img src="assets/logo-coro.jpeg" alt="">
      <h2>Todavia no hay canciones escogidas</h2>
      <p>Usa los selects de arriba y guarda tu Domingo en este celular.</p>
    </div>
  `;
}

function renderSundayPlanCards(items) {
  return `
    <div class="cards-grid sunday-plan-grid">
      ${items.map(({ moment, song }) => `
        <article class="card">
          <span class="tag">${escapeHtml(moment)}</span>
          <h3>${escapeHtml(song.title || "Sin titulo")}</h3>
          <p>${song.songNumber !== "" && song.songNumber !== undefined ? `N. ${escapeHtml(song.songNumber)}` : "Cancion escogida"}</p>
          <div class="card-meta">
            ${renderSongStatusBadge(song)}
            <button class="secondary-button" type="button" data-song-detail="${escapeAttribute(song.id)}">Ver letra</button>
          </div>
        </article>
      `).join("")}
    </div>
  `;
}

function renderPublicCard(key, item) {
  if (key === "songs") {
    const isFavorite = favoriteSongIds.has(item.id);
    return `
      <article class="card">
        <h3>${escapeHtml(item.title || "Sin titulo")}</h3>
        <p>${getSongMoment(item) ? escapeHtml(getSongMoment(item)) : "Sin momento"}</p>
        <div class="card-meta">
          ${item.songNumber !== "" && item.songNumber !== undefined ? `<span class="tag">N. ${escapeHtml(item.songNumber)}</span>` : ""}
          ${getSongMoment(item) ? `<span class="tag">${escapeHtml(getSongMoment(item))}</span>` : ""}
          ${renderSongStatusBadge(item)}
          ${item.musicalNotes ? `<span class="tag">Notas musicales</span>` : ""}
          ${isFavorite ? `<span class="tag">Favorito</span>` : ""}
          <button class="secondary-button" type="button" data-toggle-favorite="${escapeAttribute(item.id)}">${isFavorite ? "Quitar favorito" : "Favorito"}</button>
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
          ${item.group ? `<span class="tag">Grupo liturgico: ${escapeHtml(item.group)}</span>` : ""}
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
        <p>${escapeHtml(item.date ? formatDateOnly(item.date) : "Sin fecha")}</p>
        <div class="card-meta">
          ${item.recommendedPsalm ? `<span class="tag">Salmo: ${escapeHtml(item.recommendedPsalm)}</span>` : ""}
        </div>
        ${renderReadingSummary(item)}
      </article>
    `;
  }

  if (key === "liturgy") {
    const dateRange = formatDateRange(item.startDate, item.endDate);
    return `
      <article class="card liturgy-card ${liturgySeasonClass(item.season)}">
        <h3>${escapeHtml(item.title || "Sin celebracion")}</h3>
        <p>${escapeHtml(dateRange || "Sin fecha")}</p>
        <div class="card-meta">
          ${item.season ? `<span class="tag season-tag">${escapeHtml(item.season)}</span>` : ""}
        </div>
        ${item.suggestions ? `<h4>Sugerencias</h4><p>${escapeHtml(item.suggestions)}</p>` : ""}
        ${item.notes ? `<p class="help-text">${escapeHtml(item.notes)}</p>` : ""}
      </article>
    `;
  }

  return "";
}

function liturgySeasonClass(season) {
  const key = foldText(season).replace(/\s+/g, "-");
  const map = {
    adviento: "season-advent",
    navidad: "season-christmas",
    cuaresma: "season-lent",
    "semana-santa": "season-holy-week",
    pascua: "season-easter",
    "tiempo-ordinario": "season-ordinary",
    "fiesta-mariana": "season-marian",
    solemnidad: "season-solemnity"
  };
  return map[key] || "season-other";
}

function renderSongDetail(songId) {
  const song = appData.songs.find((item) => item.id === songId);
  if (!song) {
    renderPublicList("songs");
    return;
  }
  currentSongDetailId = songId;
  const isFavorite = favoriteSongIds.has(song.id);

  content.innerHTML = `
    <article class="song-detail ${largeLyricsMode ? "large-text" : ""}">
      <div class="button-row">
        <button class="secondary-button" type="button" data-view-link="songs">Volver</button>
        <button class="primary-button" type="button" data-view-link="admin">Editar en Admin</button>
        <button class="secondary-button" type="button" data-toggle-favorite="${escapeAttribute(song.id)}">${isFavorite ? "Quitar favorito" : "Favorito"}</button>
        <button class="secondary-button" type="button" data-toggle-lyrics-size>${largeLyricsMode ? "Letra normal" : "Letra grande"}</button>
      </div>
      <h2>${escapeHtml(song.title || "Sin titulo")}</h2>
      <div class="card-meta">
        ${song.songNumber !== "" && song.songNumber !== undefined ? `<span class="tag">N. ${escapeHtml(song.songNumber)}</span>` : ""}
        ${getSongMoment(song) ? `<span class="tag">${escapeHtml(getSongMoment(song))}</span>` : ""}
        ${renderSongStatusBadge(song)}
        ${isFavorite ? `<span class="tag">Favorito</span>` : ""}
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
          ${adminTab("liturgy", "Calendario")}
        </nav>
        <div class="admin-workspace" id="adminWorkspace">
          ${currentAdminTab === "settings" ? renderSettingsAdmin() : renderEntityAdmin(currentAdminTab)}
        </div>
      </div>
    </section>
  `;
}

function adminTab(key, label) {
  const count = key === "settings"
    ? ""
    : appData[key].length;
  return `
    <button class="admin-tab ${currentAdminTab === key ? "active" : ""}" type="button" data-admin-tab="${key}">
      <span>${label}</span>
      <strong>${count}</strong>
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

function renderSundaySlotField(moment, index) {
  const slot = personalSundayPlan.slots.find((item) => item.moment === moment) || {};
  const selectedIds = Array.isArray(slot.songIds)
    ? slot.songIds
    : slot.songId
      ? [slot.songId]
      : [];
  const options = getSongsSortedByTitle().map((song) => (
    `<option value="${escapeAttribute(song.id)}">${escapeHtml(formatSongOption(song))}</option>`
  )).join("");
  return `
    <div class="form-field sunday-slot-field">
      <label>${escapeHtml(moment)}</label>
      ${[0, 1, 2].map((slotIndex) => {
        const selectId = `sundaySlot${index}-${slotIndex}`;
        const selectedId = selectedIds[slotIndex] || "";
        const selectedSong = appData.songs.find((song) => song.id === selectedId);
        return `
          <div class="mini-select">
            <select id="${selectId}" name="slot-${index}-${slotIndex}" aria-label="${escapeAttribute(`${moment} ${slotIndex + 1}`)}">
              <option value="">Sin cancion</option>
              ${options.replace(`value="${escapeAttribute(selectedId)}"`, `value="${escapeAttribute(selectedId)}" selected`)}
            </select>
            ${selectedSong ? `<div class="field-hint">${renderSongStatusBadge(selectedSong)}</div>` : ""}
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function renderReadingSummary(item) {
  const parts = [
    item.firstReading ? `Primera lectura: ${item.firstReading}` : "",
    item.psalm ? `Salmo: ${item.psalm}` : "",
    item.secondReading ? `Segunda lectura: ${item.secondReading}` : "",
    item.gospel ? `Evangelio: ${item.gospel}` : "",
    item.reflection ? `Reflexion: ${item.reflection}` : "",
    item.notes ? `Notas: ${item.notes}` : ""
  ].filter(Boolean);

  if (!parts.length) return "";
  return `<p class="help-text reading-summary">${escapeHtml(parts.join("\n\n"))}</p>`;
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
  const numberAttrs = field.type === "number"
    ? `min="${field.min ?? 0}" max="${field.max ?? ""}" step="${field.step ?? 1}"`
    : "";
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
    choirName: fixJesusAccent(cleanValue(formData.get("choirName")) || defaultData.settings.choirName),
    subtitle: fixJesusAccent(cleanValue(formData.get("subtitle"))),
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
  const normalizedValues = normalizeEntityValues(key, values);
  if (editId) {
    appData[key] = appData[key].map((item) => (
      item.id === editId
        ? { ...item, ...normalizedValues, updatedAt: new Date().toISOString() }
        : item
    ));
    editIds[key] = null;
  } else {
    appData[key].push({
      id: createId(key),
      ...normalizedValues,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  }

  persistData();
  renderAdmin();
}

function normalizeEntityValues(key, values) {
  if (key === "songs") return normalizeSong(values);
  if (key === "readings") return normalizeReading(values);
  if (key === "members") return normalizeMember(values);
  if (key === "liturgy") return normalizeLiturgy(values);
  return values;
}

function savePersonalSundayPlan(form) {
  const formData = new FormData(form);
  personalSundayPlan = {
    date: cleanValue(formData.get("date")),
    notes: cleanValue(formData.get("notes")),
    slots: SUNDAY_PLAN_MOMENTS.map((moment, index) => {
      const songIds = [0, 1, 2]
        .map((slotIndex) => cleanValue(formData.get(`slot-${index}-${slotIndex}`)))
        .filter(Boolean);
      return {
        moment,
        songIds: [...new Set(songIds)]
      };
    })
  };
  persistPersonalSundayPlan();
  renderSundayPlan();
  scrollAppToTop();
}

function clearPersonalSundayPlan() {
  const ok = confirm("Borrar el repertorio de Domingo guardado en este celular?");
  if (!ok) return;
  personalSundayPlan = normalizeSundayPlan(null);
  localStorage.removeItem(SUNDAY_PERSONAL_KEY);
  renderSundayPlan();
  scrollAppToTop();
}

async function shareSundayRepertoire() {
  const text = buildSundayShareText();
  if (!getSundayPlanSongs().length) {
    alert("Primero guarda al menos una cancion en Domingo.");
    return;
  }

  if (navigator.share) {
    try {
      await navigator.share({ text });
      return;
    } catch (error) {
      if (error && error.name === "AbortError") return;
    }
  }

  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener");
}

async function copySundayRepertoire() {
  const text = buildSundayShareText();
  if (!getSundayPlanSongs().length) {
    alert("Primero guarda al menos una cancion en Domingo.");
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    alert("Repertorio copiado. Puedes pegarlo en WhatsApp.");
  } catch (error) {
    const area = document.createElement("textarea");
    area.value = text;
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    area.remove();
    alert("Repertorio copiado. Puedes pegarlo en WhatsApp.");
  }
}

function downloadSundayPdf() {
  const planSongs = getSundayPlanSongs();
  if (!planSongs.length) {
    alert("Primero guarda al menos una cancion en Domingo.");
    return;
  }

  const printWindow = window.open("", "_blank", "noopener");
  if (!printWindow) {
    alert("Permite ventanas emergentes para descargar o imprimir el repertorio.");
    return;
  }

  const dateLabel = personalSundayPlan.date ? formatShortDate(personalSundayPlan.date) : "Sin fecha";
  const rows = planSongs.map(({ moment, song }) => `
    <tr>
      <td>${escapeHtml(SUNDAY_SHARE_LABELS[moment] || moment)}</td>
      <td>${escapeHtml(moment)}</td>
      <td>${song.songNumber !== "" && song.songNumber !== undefined ? escapeHtml(song.songNumber) : ""}</td>
      <td>${escapeHtml(song.title || "Sin titulo")}</td>
      <td>${escapeHtml(getSongMassStatus(song))}</td>
    </tr>
  `).join("");

  printWindow.document.write(`
    <!doctype html>
    <html lang="es">
      <head>
        <meta charset="utf-8">
        <title>Repertorio Domingo</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 28px; color: #050505; }
          h1 { margin: 0 0 4px; color: #1c19ff; }
          p { margin: 0 0 18px; color: #5f6368; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #d9dce2; padding: 10px; text-align: left; vertical-align: top; }
          th { background: #eef0ff; }
          .notes { margin-top: 18px; white-space: pre-wrap; }
        </style>
      </head>
      <body>
        <h1>Cantos de Domingo ${escapeHtml(dateLabel)}</h1>
        <p>Coro Paz en Jesús</p>
        <table>
          <thead>
            <tr>
              <th>Letra</th>
              <th>Momento</th>
              <th>N.</th>
              <th>Cancion</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
        ${personalSundayPlan.notes ? `<div class="notes"><strong>Notas:</strong><br>${escapeHtml(personalSundayPlan.notes)}</div>` : ""}
        <script>window.onload = () => { window.print(); };</script>
      </body>
    </html>
  `);
  printWindow.document.close();
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

  markTodayEventsAsRead(todayEvents);
  updateEventBell();
  alert(`Eventos de hoy:\n\n${message}`);
}

function getReadEventIdsForToday() {
  try {
    const raw = localStorage.getItem(EVENT_READ_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (parsed.date !== todayLocalDateString()) return [];
    return Array.isArray(parsed.ids) ? parsed.ids : [];
  } catch (error) {
    console.warn(error);
    return [];
  }
}

function markTodayEventsAsRead(events) {
  const ids = events.map((event) => event.id).filter(Boolean);
  localStorage.setItem(EVENT_READ_KEY, JSON.stringify({
    date: todayLocalDateString(),
    ids
  }));
}

function downloadJson() {
  const dataToDownload = normalizeData(appData);
  dataToDownload.updatedAt = new Date().toISOString();
  delete dataToDownload.inventory;
  delete dataToDownload.sundayPlan;
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
  localStorage.removeItem(SUNDAY_PERSONAL_KEY);
  appData = normalizeData(defaultData);
  personalSundayPlan = normalizeSundayPlan(null);
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

function readStoredArray(key) {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn(error);
    return [];
  }
}

function getSongMoment(song) {
  return SONG_MOMENTS.includes(song.moment) ? song.moment : inferSongMoment(song);
}

function inferSongMoment(song) {
  const text = foldText(`${song.title || ""} ${song.notes || ""} ${song.musicalNotes || ""}`);
  if (text.includes("entrada") || text.includes("bienvenida")) return "Entrada";
  if (text.includes("perdon") || text.includes("perdÃ³n")) return "Perdon";
  if (text.includes("gloria")) return "Gloria";
  if (text.includes("salmo")) return "Salmo";
  if (text.includes("aleluya")) return "Aleluya";
  if (text.includes("ofertorio") || text.includes("dones") || text.includes("vino") || text.includes("pan")) return "Ofertorio";
  if (text.includes("santo")) return "Santo";
  if (text.includes("paz")) return "Paz";
  if (text.includes("comunion") || text.includes("comuniÃ³n")) return "Comunion";
  if (text.includes("salida")) return "Salida";
  if (text.includes("marian") || text.includes("virgen") || text.includes("marÃ­a")) return "Mariano";
  if (text.includes("animaci")) return "Animacion";
  return "";
}

function foldText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function fixJesusAccent(value) {
  return String(value || "")
    .replaceAll("JesÃºs", "Jesús")
    .replaceAll(`Jes${"?"}s`, "Jesús")
    .replaceAll("Jesus", "Jesús");
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

function formatDateOnly(value) {
  const date = parseDateOnly(value);
  if (!date) return String(value || "");
  return new Intl.DateTimeFormat("es-US", {
    dateStyle: "full"
  }).format(date);
}

function formatShortDate(value) {
  const date = parseDateOnly(value);
  if (!date) return String(value || "");
  return new Intl.DateTimeFormat("es-US", {
    day: "numeric",
    month: "numeric",
    year: "numeric"
  }).format(date);
}

function formatDateRange(startValue, endValue) {
  const start = startValue ? formatDateOnly(startValue) : "";
  const end = endValue ? formatDateOnly(endValue) : "";
  if (start && end && start !== end) return `${start} - ${end}`;
  return start || end;
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
    navigator.serviceWorker.register(`sw.js?v=${APP_VERSION}`, { updateViaCache: "none" }).then((registration) => {
      checkForAppUpdate(registration);
      window.setInterval(() => {
        checkForAppUpdate(registration);
      }, UPDATE_CHECK_INTERVAL);

      document.addEventListener("visibilitychange", () => {
        if (!document.hidden) {
          checkForAppUpdate(registration);
        }
      });

      window.addEventListener("focus", () => {
        checkForAppUpdate(registration);
      });

      window.addEventListener("pageshow", () => {
        checkForAppUpdate(registration);
      });
    }).catch((error) => console.warn(error));
  });

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (sessionStorage.getItem("coro-paz-reloaded-for-update") === APP_VERSION) return;
    sessionStorage.setItem("coro-paz-reloaded-for-update", APP_VERSION);
    window.location.reload();
  });
}

async function checkForAppUpdate(registration) {
  if (updateCheckRunning) return;
  updateCheckRunning = true;
  try {
    setUpdateMessage("Revisando actualizacion desde la web", "Tiempo estimado: unos segundos");
    await registration.update();
    const response = await fetch(`${VERSION_PATH}?t=${Date.now()}`, {
      cache: "no-store"
    });
    if (!response.ok) return;
    const remote = await response.json();
    if (remote.version && remote.version !== APP_VERSION) {
      showUpdateOverlay("Borrando cache anterior", 25);
      await clearAppCaches();
      setUpdateMessage("Actualizando desde la web", "Tiempo estimado: unos segundos");
      window.setTimeout(() => window.location.reload(), 500);
    }
  } catch (error) {
    console.warn(error);
  } finally {
    updateCheckRunning = false;
  }
}

async function clearAppCaches() {
  if (!("caches" in window)) return;
  setUpdateMessage("Borrando cache anterior", "Tiempo estimado: unos segundos");
  const keys = await caches.keys();
  await Promise.all(
    keys
      .filter((key) => key.startsWith(APP_CACHE_PREFIX))
      .map((key) => caches.delete(key))
  );
}
