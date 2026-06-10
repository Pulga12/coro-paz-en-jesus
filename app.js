const APP_VERSION = "1.2.0";
const DEFAULT_DATA_URL = "data/app-data.json";
const ADMIN_PASSCODE = "coropazenjesús";

const STORAGE_KEYS = {
  inventory: "coroPaz.localInventory",
  sharedData: "coroPaz.sharedData",
  dataUrl: "coroPaz.dataUrl",
  adminEndpoint: "coroPaz.adminEndpoint"
};

const NAV_ITEMS = [
  {
    id: "songs",
    label: "Canciones",
      description: "Repertorio, letras y notas musicales.",
    icon: "icon-music"
  },
  {
    id: "readings",
    label: "Lecturas",
    description: "Textos bíblicos, oración y reflexión.",
    icon: "icon-book"
  },
  {
    id: "events",
    label: "Eventos",
    description: "Ensayos, misas y actividades especiales.",
    icon: "icon-calendar"
  },
  {
    id: "members",
    label: "Miembros",
    description: "Roles y grupos del coro.",
    icon: "icon-users"
  },
  {
    id: "local-inventory",
    label: "Inventario local",
    description: "Objetos guardados en este dispositivo.",
    icon: "icon-box"
  },
  {
    id: "add-local",
    label: "Agregar local",
    description: "Crear un objeto temporal sin internet.",
    icon: "icon-plus"
  },
  {
    id: "cloud-inventory",
    label: "Actualizaciones",
    description: "Leer datos compartidos desde GitHub.",
    icon: "icon-cloud"
  },
  {
    id: "admin",
    label: "Administrador",
    description: "Editar canciones y preparar cambios.",
    icon: "icon-lock"
  }
];

const DEFAULT_DATA = {
  version: APP_VERSION,
  updatedAt: "2026-06-10T00:00:00.000Z",
  songs: [
    {
      id: "song-1",
      title: "Ansias de Paz y Ante ti Señor",
      image: "assets/logo-coro.jpeg",
      category: "Entrada",
      musicalNotes: "Tono sugerido: Re. Ritmo: balada suave.",
      notes: "Usar para momentos de oración y paz."
    },
    {
      id: "song-2",
      title: "Buscaba amor en el perfume de una flor",
      image: "assets/logo-coro.jpeg",
      category: "Reflexión",
      musicalNotes: "Tono sugerido: Do. Entrada tranquila.",
      notes: "Cuidar la respiración antes del estribillo."
    },
    {
      id: "song-3",
      title: "Canta trovador",
      image: "assets/logo-coro.jpeg",
      category: "Animación",
      musicalNotes: "Tono sugerido: Sol. Ritmo alegre.",
      notes: "Puede abrir un encuentro o ensayo."
    },
    {
      id: "song-4",
      title: "Ella es",
      image: "assets/logo-coro.jpeg",
      category: "Mariano",
      musicalNotes: "Tono sugerido: Mi menor.",
      notes: "Canto mariano."
    },
    {
      id: "song-5",
      title: "Este es el día y el lugar",
      image: "assets/logo-coro.jpeg",
      category: "Entrada",
      musicalNotes: "Tono sugerido: Sol. Palmas suaves.",
      notes: "Útil para inicio de celebración."
    },
    {
      id: "song-6",
      title: "Este vino y este pan te ofrecemos Señor",
      image: "assets/logo-coro.jpeg",
      category: "Ofertorio",
      musicalNotes: "Tono sugerido: Re.",
      notes: "Preparar entrada del instrumento antes de la estrofa."
    },
    {
      id: "song-7",
      title: "Hola, canción de bienvenida",
      image: "assets/logo-coro.jpeg",
      category: "Bienvenida",
      musicalNotes: "Tono sugerido: Do. Ritmo sencillo.",
      notes: "Canto para reuniones y encuentros."
    },
    {
      id: "song-8",
      title: "Hoy en oración quiero preguntar Señor",
      image: "assets/logo-coro.jpeg",
      category: "Oración",
      musicalNotes: "Tono sugerido: La menor.",
      notes: "Mantener volumen moderado."
    },
    {
      id: "song-9",
      title: "Hoy estoy de fiesta junto a ti",
      image: "assets/logo-coro.jpeg",
      category: "Animación",
      musicalNotes: "Tono sugerido: Sol.",
      notes: "Canto alegre para comunidad."
    },
    {
      id: "song-10",
      title: "Huayno de la Paz",
      image: "assets/logo-coro.jpeg",
      category: "Paz",
      musicalNotes: "Tono sugerido: Re. Ritmo huayno.",
      notes: "Marcar bien el pulso."
    },
    {
      id: "song-11",
      title: "María mírame, María mírame",
      image: "assets/logo-coro.jpeg",
      category: "Mariano",
      musicalNotes: "Tono sugerido: Do.",
      notes: "Cantar con fraseo suave."
    },
    {
      id: "song-12",
      title: "Oh Señora y Madre mía",
      image: "assets/logo-coro.jpeg",
      category: "Mariano",
      musicalNotes: "Tono sugerido: Re.",
      notes: "Canto de devoción mariana."
    },
    {
      id: "song-13",
      title: "Que alegría es venir a la casa de Dios",
      image: "assets/logo-coro.jpeg",
      category: "Entrada",
      musicalNotes: "Tono sugerido: Sol. Tempo vivo.",
      notes: "Ideal para entrada."
    },
    {
      id: "song-14",
      title: "Quiero ofrecerte Señor",
      image: "assets/logo-coro.jpeg",
      category: "Ofertorio",
      musicalNotes: "Tono sugerido: Do.",
      notes: "Cuidar cierre de frases."
    },
    {
      id: "song-15",
      title: "Santo Sentimiento",
      image: "assets/logo-coro.jpeg",
      category: "Santo",
      musicalNotes: "Tono sugerido: Re.",
      notes: "Canto para parte litúrgica."
    },
    {
      id: "song-16",
      title: "Theotokos",
      image: "assets/logo-coro.jpeg",
      category: "Mariano",
      musicalNotes: "Tono sugerido: Mi menor.",
      notes: "Revisar pronunciación y entradas."
    },
    {
      id: "song-17",
      title: "Un Día caminaba",
      image: "assets/logo-coro.jpeg",
      category: "Comunión",
      musicalNotes: "Tono sugerido: Sol.",
      notes: "Puede usarse como canto de meditación."
    },
    {
      id: "song-18",
      title: "Vino y Pan",
      image: "assets/logo-coro.jpeg",
      category: "Ofertorio",
      musicalNotes: "Tono sugerido: Do.",
      notes: "Entrada de guitarra o piano suave."
    },
    {
      id: "song-19",
      title: "Viviré 1",
      image: "assets/logo-coro.jpeg",
      category: "Comunión",
      musicalNotes: "Tono sugerido: Re.",
      notes: "Primera página."
    },
    {
      id: "song-20",
      title: "Viviré 2",
      image: "assets/logo-coro.jpeg",
      category: "Comunión",
      musicalNotes: "Tono sugerido: Re.",
      notes: "Segunda página."
    },
    {
      id: "song-21",
      title: "Yo tengo un nuevo amor",
      image: "assets/logo-coro.jpeg",
      category: "Animación",
      musicalNotes: "Tono sugerido: Sol. Ritmo alegre.",
      notes: "Canto juvenil."
    },
    {
      id: "song-22",
      title: "Yo tengo un nuevo amor 2",
      image: "assets/logo-coro.jpeg",
      category: "Animación",
      musicalNotes: "Tono sugerido: Sol.",
      notes: "Versión alternativa."
    }
  ],
  documents: [],
  readings: [
    {
      title: "Lectura del día",
      body: "Espacio para guardar el texto bíblico que se usará en la celebración o ensayo."
    },
    {
      title: "Reflexión breve",
      body: "Preparar el corazón antes de cantar: servir con alegría, escuchar al grupo y cuidar la oración."
    },
    {
      title: "Oración del coro",
      body: "Señor, que nuestra voz ayude a la comunidad a encontrarse contigo en cada celebración."
    }
  ],
  events: [
    {
      title: "Ensayo general",
      date: "2026-06-14T16:00:00",
      place: "Salón parroquial",
      note: "Revisar entradas, salmo y cantos de comunión."
    },
    {
      title: "Misa dominical",
      date: "2026-06-21T10:00:00",
      place: "Templo principal",
      note: "Llegar 30 minutos antes para sonido."
    },
    {
      title: "Revisión de inventario",
      date: "2026-06-28T15:30:00",
      place: "Bodega del coro",
      note: "Confirmar micrófonos, cables, carpetas y atriles."
    }
  ],
  members: [
    { name: "Dirección", role: "Coordinación musical" },
    { name: "Sopranos", role: "Voces agudas" },
    { name: "Contraltos", role: "Voces graves femeninas" },
    { name: "Tenores", role: "Voces agudas masculinas" },
    { name: "Bajos", role: "Voces graves masculinas" },
    { name: "Piano", role: "Acompañamiento" },
    { name: "Guitarra", role: "Acompañamiento" },
    { name: "Sonido", role: "Micrófonos y consola" }
  ],
  inventory: [
    {
      id: "official-1",
      name: "Micrófono principal",
      status: "Bueno",
      location: "Salón parroquial",
      note: "Inventario compartido desde GitHub."
    },
    {
      id: "official-2",
      name: "Atriles",
      status: "Regular",
      location: "Bodega del coro",
      note: "Revisar tornillos antes de misa."
    },
    {
      id: "official-3",
      name: "Biblias",
      status: "Bueno",
      location: "Estante de materiales",
      note: "Disponibles para lecturas y reflexión."
    }
  ]
};

const DEFAULT_LOCAL_INVENTORY = DEFAULT_DATA.inventory.map((item) => ({
  ...item,
  id: item.id.replace("official", "local"),
  note: item.note || "Guardado localmente."
}));

let appData = readSharedData();
let localInventory = readLocalInventory();
let adminUnlocked = false;
let currentSongFilter = "";

document.addEventListener("DOMContentLoaded", () => {
  renderAll();
  bindNavigation();
  bindForms();
  bindSearch();
  bindSongDialog();
  bindCloud();
  bindAdmin();
  updateConnectionStatus();
  registerServiceWorker();
  loadSharedData({ quiet: true });
});

window.addEventListener("online", updateConnectionStatus);
window.addEventListener("offline", updateConnectionStatus);

function icon(name) {
  return `<svg aria-hidden="true"><use href="#${name}"></use></svg>`;
}

function byId(id) {
  return document.getElementById(id);
}

function renderAll() {
  renderHome();
  renderSongs(filteredSongs());
  renderDocuments();
  renderReadings();
  renderEvents();
  renderMembers();
  renderLocalInventory();
  renderCloudInventory();
  renderAdminSongList();
}

function renderHome() {
  byId("homeStats").innerHTML = [
    ["Canciones", appData.songs.length],
    ["Eventos", appData.events.length],
    ["Versión", APP_VERSION]
  ]
    .map(([label, value]) => `<div class="stat-item"><strong>${value}</strong><span>${label}</span></div>`)
    .join("");

  byId("quickGrid").innerHTML = NAV_ITEMS.map(
    (item) => `
      <button class="quick-card" type="button" data-nav="${item.id}">
        ${icon(item.icon)}
        <span>
          <strong>${item.label}</strong>
          <span>${item.description}</span>
        </span>
      </button>
    `
  ).join("");
}

function renderSongs(items) {
  byId("songsCount").textContent = `${items.length} cantos`;
  byId("songGrid").innerHTML = items.map(
    (song) => `
      <button class="song-card" type="button" data-song-id="${escapeHtml(song.id)}">
        <span class="song-card__body">
          <span>
            <strong>${escapeHtml(song.title)}</strong>
            <small>${escapeHtml(song.category || "Repertorio")}</small>
            <em>${escapeHtml(lyricsPreview(song.lyrics))}</em>
          </span>
          ${icon("icon-music")}
        </span>
      </button>
    `
  ).join("");
}

function renderDocuments() {
  byId("documentList").innerHTML = appData.documents.map(
    (doc) => `
      <a class="document-row" href="${escapeHtml(doc.href)}" target="_blank" rel="noopener">
        ${icon("icon-file")}
        <span>
          <strong>${escapeHtml(doc.title)}</strong>
          <span>PDF local</span>
        </span>
        ${icon("icon-book")}
      </a>
    `
  ).join("");
}

function renderReadings() {
  byId("readingList").innerHTML = appData.readings.map(
    (reading) => `
      <article class="reading-item">
        <strong>${escapeHtml(reading.title)}</strong>
        <p>${escapeHtml(reading.body)}</p>
      </article>
    `
  ).join("");
}

function renderEvents() {
  const formatter = new Intl.DateTimeFormat("es-CO", {
    weekday: "short",
    day: "2-digit",
    month: "short"
  });
  const timeFormatter = new Intl.DateTimeFormat("es-CO", {
    hour: "numeric",
    minute: "2-digit"
  });

  byId("eventList").innerHTML = appData.events.map((event) => {
    const date = new Date(event.date);
    const parts = formatter.format(date).replace(".", "").split(", ");
    const weekday = parts[0] || "";
    const dayMonth = parts[1] || formatter.format(date);
    return `
      <article class="event-item">
        <div class="event-date">
          <span>${escapeHtml(dayMonth)}</span>
          <small>${escapeHtml(weekday)}</small>
        </div>
        <div>
          <strong>${escapeHtml(event.title)}</strong>
          <span>${escapeHtml(timeFormatter.format(date))} · ${escapeHtml(event.place)}</span>
          <p>${escapeHtml(event.note)}</p>
        </div>
      </article>
    `;
  }).join("");
}

function renderMembers() {
  byId("memberGrid").innerHTML = appData.members.map(
    (member) => `
      <article class="member-card">
        <div class="member-avatar">${escapeHtml(member.name.slice(0, 1))}</div>
        <strong>${escapeHtml(member.name)}</strong>
        <span>${escapeHtml(member.role)}</span>
      </article>
    `
  ).join("");
}

function renderLocalInventory() {
  const list = byId("localInventoryList");
  if (!localInventory.length) {
    list.innerHTML = `<div class="empty-state">No hay objetos guardados en este dispositivo.</div>`;
    return;
  }

  list.innerHTML = localInventory.map((item) => inventoryItemTemplate(item, true)).join("");
}

function renderCloudInventory() {
  const list = byId("cloudInventoryList");
  if (!list) return;

  if (!appData.inventory.length) {
    list.innerHTML = `<div class="empty-state">Todavía no hay objetos compartidos desde GitHub.</div>`;
    return;
  }

  list.innerHTML = appData.inventory.map((item) => inventoryItemTemplate(item, false)).join("");
}

function inventoryItemTemplate(item, removable) {
  const removeButton = removable
    ? `<button class="icon-button" type="button" data-delete-item="${escapeHtml(item.id)}" aria-label="Eliminar ${escapeHtml(item.name)}" title="Eliminar">${icon("icon-trash")}</button>`
    : "";
  return `
    <article class="inventory-item">
      <div class="inventory-item__top">
        <div>
          <strong>${escapeHtml(item.name)}</strong>
          <span>${escapeHtml(item.note || "Sin nota")}</span>
        </div>
        ${removeButton}
      </div>
      <div class="inventory-meta">
        <span class="status-pill" data-status="${escapeHtml(item.status)}">${escapeHtml(item.status)}</span>
        <span class="status-pill">${escapeHtml(item.location)}</span>
      </div>
    </article>
  `;
}

function bindNavigation() {
  document.addEventListener("click", (event) => {
    const navButton = event.target.closest("[data-nav]");
    if (navButton) {
      navigate(navButton.dataset.nav);
    }

    const deleteButton = event.target.closest("[data-delete-item]");
    if (deleteButton) {
      deleteLocalItem(deleteButton.dataset.deleteItem);
    }
  });

  const initialHash = window.location.hash.replace("#", "");
  if (initialHash && byId(`view-${initialHash}`)) {
    navigate(initialHash, false);
  }

  window.addEventListener("hashchange", () => {
    const route = window.location.hash.replace("#", "") || "home";
    if (byId(`view-${route}`)) {
      navigate(route, false);
    }
  });
}

function navigate(route, updateHash = true) {
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("is-active", view.id === `view-${route}`);
  });
  document.querySelectorAll(".bottom-nav button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.nav === route);
  });
  if (updateHash) {
    window.history.pushState(null, "", route === "home" ? location.pathname : `#${route}`);
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function bindSearch() {
  byId("songSearch").addEventListener("input", (event) => {
    currentSongFilter = event.target.value;
    renderSongs(filteredSongs());
  });
}

function filteredSongs() {
  const query = normalize(currentSongFilter);
  if (!query) return appData.songs;
  return appData.songs.filter((song) => {
    return [song.title, song.category, song.musicalNotes, song.lyrics, song.notes].some((value) => normalize(value || "").includes(query));
  });
}

function bindSongDialog() {
  const dialog = byId("songDialog");
  const title = byId("dialogTitle");
  const image = byId("dialogImage");
  const meta = byId("dialogSongMeta");

  byId("songGrid").addEventListener("click", (event) => {
    const card = event.target.closest("[data-song-id]");
    if (!card) return;

    const song = appData.songs.find((item) => item.id === card.dataset.songId);
    if (!song) return;

    title.textContent = song.title;
    image.src = song.image;
    image.alt = song.title;
    meta.innerHTML = `
      <div>
        <p class="section-label">Notas musicales</p>
        <pre>${escapeHtml(song.musicalNotes || "Sin notas musicales registradas.")}</pre>
      </div>
      <div>
        <p class="section-label">Letra</p>
        <pre>${escapeHtml(song.lyrics || "Sin letra registrada. Puedes escribirla desde Administrador.")}</pre>
      </div>
      <div>
        <p class="section-label">Notas del canto</p>
        <p>${escapeHtml(song.notes || "Sin notas adicionales.")}</p>
      </div>
    `;

    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      window.open(song.image, "_blank", "noopener");
    }
  });

  byId("closeDialog").addEventListener("click", () => dialog.close());
}

function bindForms() {
  byId("localItemForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const item = formToInventoryItem(event.currentTarget);
    localInventory = [item, ...localInventory];
    saveLocalInventory();
    renderLocalInventory();
    renderHome();
    event.currentTarget.reset();
    showToast("Ítem guardado en este dispositivo.");
    navigate("local-inventory");
  });
}

function bindCloud() {
  const dataUrlInput = byId("cloudEndpoint");
  dataUrlInput.value = getDataUrl();

  byId("saveCloudEndpoint").addEventListener("click", () => {
    const value = dataUrlInput.value.trim() || DEFAULT_DATA_URL;
    localStorage.setItem(STORAGE_KEYS.dataUrl, value);
    showCloudStatus("URL de datos guardada.", "success");
    loadSharedData({ quiet: false });
  });

  byId("refreshCloud").addEventListener("click", () => loadSharedData({ quiet: false }));
  showCloudStatus("Los datos compartidos se leen desde un archivo JSON publicado en GitHub.", "success");
}

function bindAdmin() {
  const loginForm = byId("adminLock");
  const songForm = byId("songAdminForm");
  const endpointInput = byId("adminEndpoint");

  endpointInput.value = localStorage.getItem(STORAGE_KEYS.adminEndpoint) || "";

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const passcode = String(new FormData(loginForm).get("passcode") || "");
    if (passcode !== ADMIN_PASSCODE) {
      showToast("Clave incorrecta.");
      return;
    }
    adminUnlocked = true;
    loginForm.reset();
    renderAdminAccess();
    renderAdminSongList();
  });

  byId("adminLockButton").addEventListener("click", () => {
    adminUnlocked = false;
    renderAdminAccess();
  });

  byId("newSongButton").addEventListener("click", () => {
    songForm.reset();
    songForm.elements.songId.value = "";
    songForm.elements.title.focus();
  });

  songForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const song = await formToSong(songForm);
    const existingIndex = appData.songs.findIndex((item) => item.id === song.id);
    if (existingIndex >= 0) {
      appData.songs[existingIndex] = song;
    } else {
      appData.songs = [song, ...appData.songs];
    }
    appData.updatedAt = new Date().toISOString();
    saveSharedData();
    renderAll();
    songForm.reset();
    showToast("Canción guardada.");
  });

  byId("adminSongList").addEventListener("click", (event) => {
    const editButton = event.target.closest("[data-edit-song]");
    const deleteButton = event.target.closest("[data-delete-song]");

    if (editButton) {
      fillSongForm(editButton.dataset.editSong);
    }

    if (deleteButton) {
      deleteSong(deleteButton.dataset.deleteSong);
    }
  });

  byId("exportData").addEventListener("click", exportSharedData);

  byId("importDataFile").addEventListener("change", importSharedData);

  byId("saveAdminEndpoint").addEventListener("click", () => {
    localStorage.setItem(STORAGE_KEYS.adminEndpoint, endpointInput.value.trim());
    showToast("Endpoint de publicación guardado.");
  });

  byId("publishData").addEventListener("click", publishSharedData);

  renderAdminAccess();
}

function renderAdminAccess() {
  byId("adminLock").hidden = adminUnlocked;
  byId("adminPanel").hidden = !adminUnlocked;
}

function renderAdminSongList() {
  const list = byId("adminSongList");
  if (!list || !adminUnlocked) return;

  list.innerHTML = appData.songs.map(
    (song) => `
      <article class="admin-song-row">
        <div>
          <strong>${escapeHtml(song.title)}</strong>
          <span>${escapeHtml(song.category || "Repertorio")} · ${escapeHtml(song.musicalNotes || "Sin notas musicales")}</span>
        </div>
        <div class="admin-song-row__actions">
          <button class="icon-button" type="button" data-edit-song="${escapeHtml(song.id)}" aria-label="Editar ${escapeHtml(song.title)}" title="Editar">
            ${icon("icon-edit")}
          </button>
          <button class="icon-button" type="button" data-delete-song="${escapeHtml(song.id)}" aria-label="Eliminar ${escapeHtml(song.title)}" title="Eliminar">
            ${icon("icon-trash")}
          </button>
        </div>
      </article>
    `
  ).join("");
}

async function formToSong(form) {
  const formData = new FormData(form);
  const currentId = String(formData.get("songId") || "").trim();
  let image = String(formData.get("image") || "").trim();

  return {
    id: currentId || `song-${Date.now()}`,
    title: String(formData.get("title") || "").trim(),
    image: image || "assets/logo-coro.jpeg",
    category: String(formData.get("category") || "Repertorio").trim(),
    musicalNotes: String(formData.get("musicalNotes") || "").trim(),
    lyrics: String(formData.get("lyrics") || "").trim(),
    notes: String(formData.get("notes") || "").trim(),
    updatedAt: new Date().toISOString()
  };
}

function fillSongForm(id) {
  const song = appData.songs.find((item) => item.id === id);
  if (!song) return;

  const form = byId("songAdminForm");
  form.elements.songId.value = song.id;
  form.elements.title.value = song.title || "";
  form.elements.image.value = song.image || "";
  form.elements.category.value = song.category || "";
  form.elements.musicalNotes.value = song.musicalNotes || "";
  form.elements.lyrics.value = song.lyrics || "";
  form.elements.notes.value = song.notes || "";
  form.elements.title.focus();
}

function deleteSong(id) {
  appData.songs = appData.songs.filter((song) => song.id !== id);
  appData.updatedAt = new Date().toISOString();
  saveSharedData();
  renderAll();
  showToast("Canción eliminada.");
}

function formToInventoryItem(form) {
  const formData = new FormData(form);
  return {
    id: `item-${Date.now()}`,
    name: String(formData.get("name") || "").trim(),
    status: String(formData.get("status") || "").trim(),
    location: String(formData.get("location") || "").trim(),
    note: String(formData.get("note") || "").trim(),
    updatedAt: new Date().toISOString()
  };
}

function readSharedData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.sharedData);
    return normalizeData(saved ? JSON.parse(saved) : DEFAULT_DATA);
  } catch {
    return normalizeData(DEFAULT_DATA);
  }
}

function saveSharedData() {
  localStorage.setItem(STORAGE_KEYS.sharedData, JSON.stringify(normalizeData(appData)));
}

function readLocalInventory() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.inventory);
    return saved ? JSON.parse(saved) : DEFAULT_LOCAL_INVENTORY;
  } catch {
    return DEFAULT_LOCAL_INVENTORY;
  }
}

function saveLocalInventory() {
  localStorage.setItem(STORAGE_KEYS.inventory, JSON.stringify(localInventory));
}

function deleteLocalItem(id) {
  localInventory = localInventory.filter((item) => item.id !== id);
  saveLocalInventory();
  renderLocalInventory();
  renderHome();
  showToast("Ítem local eliminado.");
}

function getDataUrl() {
  return localStorage.getItem(STORAGE_KEYS.dataUrl) || DEFAULT_DATA_URL;
}

async function loadSharedData({ quiet }) {
  const dataUrl = getDataUrl();
  if (!quiet) showCloudStatus("Buscando actualizaciones en GitHub...", "success");

  try {
    const response = await fetch(`${dataUrl}${dataUrl.includes("?") ? "&" : "?"}v=${Date.now()}`, {
      cache: "no-store"
    });
    if (!response.ok) throw new Error(`El archivo respondió ${response.status}.`);

    const data = normalizeData(await response.json());
    appData = data;
    saveSharedData();
    renderAll();
    if (!quiet) showCloudStatus(`Actualizado: ${appData.songs.length} canciones y ${appData.inventory.length} objetos.`, "success");
  } catch (error) {
    if (!quiet) showCloudStatus(`No se pudo actualizar desde GitHub. ${error.message}`, "error");
  }
}

async function publishSharedData() {
  const endpoint = byId("adminEndpoint").value.trim();
  const passcode = byId("publishPasscode").value;

  if (!endpoint) {
    showToast("Falta el endpoint seguro.");
    return;
  }
  if (!passcode) {
    showToast("Escribe la clave de administrador.");
    return;
  }

  localStorage.setItem(STORAGE_KEYS.adminEndpoint, endpoint);
  const payload = normalizeData({
    ...appData,
    updatedAt: new Date().toISOString(),
    version: APP_VERSION
  });

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Admin-Key": passcode
      },
      body: JSON.stringify({ data: payload })
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(result.error || `El servidor respondió ${response.status}.`);
    }
    appData = payload;
    saveSharedData();
    showToast("Cambios publicados para todos.");
    showCloudStatus("GitHub recibió la actualización. Los usuarios la verán al actualizar la app.", "success");
  } catch (error) {
    showToast("No se pudo publicar.");
    showCloudStatus(error.message, "error");
  }
}

function exportSharedData() {
  const payload = JSON.stringify(normalizeData(appData), null, 2);
  const blob = new Blob([payload], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "app-data.json";
  link.click();
  URL.revokeObjectURL(url);
}

async function importSharedData(event) {
  const file = event.target.files[0];
  if (!file) return;

  try {
    const text = await file.text();
    appData = normalizeData(JSON.parse(text));
    appData.updatedAt = new Date().toISOString();
    saveSharedData();
    renderAll();
    showToast("Datos importados.");
  } catch {
    showToast("El archivo no parece ser un JSON válido.");
  } finally {
    event.target.value = "";
  }
}

function normalizeData(data) {
  const source = data && typeof data === "object" ? data : {};
  return {
    version: String(source.version || APP_VERSION),
    updatedAt: String(source.updatedAt || new Date().toISOString()),
    songs: Array.isArray(source.songs) ? source.songs.map(normalizeSong) : DEFAULT_DATA.songs,
    documents: Array.isArray(source.documents) ? source.documents : DEFAULT_DATA.documents,
    readings: Array.isArray(source.readings) ? source.readings : DEFAULT_DATA.readings,
    events: Array.isArray(source.events) ? source.events : DEFAULT_DATA.events,
    members: Array.isArray(source.members) ? source.members : DEFAULT_DATA.members,
    inventory: Array.isArray(source.inventory) ? source.inventory : DEFAULT_DATA.inventory
  };
}

function normalizeSong(song, index) {
  return {
    id: String(song.id || `song-${index || Date.now()}`),
    title: String(song.title || "Canción sin título"),
    image: String(song.image || "assets/logo-coro.jpeg"),
    category: String(song.category || "Repertorio"),
    musicalNotes: String(song.musicalNotes || ""),
    lyrics: String(song.lyrics || ""),
    notes: String(song.notes || ""),
    updatedAt: String(song.updatedAt || "")
  };
}

function showCloudStatus(message, type = "success") {
  const status = byId("cloudStatus");
  status.textContent = message;
  status.className = `cloud-status is-visible is-${type}`;
}

function updateConnectionStatus() {
  const status = byId("connectionStatus");
  const online = navigator.onLine;
  status.textContent = online ? "En línea" : "Sin conexión";
  status.classList.toggle("is-online", online);
  status.classList.toggle("is-offline", !online);
}

function showToast(message) {
  const toast = byId("toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2800);
}

function normalize(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function lyricsPreview(value) {
  const compact = String(value || "")
    .replace(/\s+/g, " ")
    .trim();
  if (!compact) return "Letra pendiente de revisar";
  return compact.length > 92 ? `${compact.slice(0, 92)}...` : compact;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function registerServiceWorker() {
  if (!("serviceWorker" in navigator) || location.protocol === "file:") {
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register("sw.js");
    registration.addEventListener("updatefound", () => {
      const worker = registration.installing;
      if (!worker) return;
      worker.addEventListener("statechange", () => {
        if (worker.state === "installed" && navigator.serviceWorker.controller) {
          showUpdateBanner(registration);
        }
      });
    });

    if (registration.waiting) {
      showUpdateBanner(registration);
    }

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      window.location.reload();
    });
  } catch {
    showToast("La app funciona, pero el modo instalable no se pudo activar aquí.");
  }
}

function showUpdateBanner(registration) {
  if (document.querySelector(".update-banner")) return;

  const banner = document.createElement("div");
  banner.className = "update-banner";
  banner.innerHTML = `
    <p><strong>Actualización disponible.</strong> Hay una nueva versión de la app lista para usar.</p>
    <button class="button button--primary" type="button">Actualizar ahora</button>
  `;
  banner.querySelector("button").addEventListener("click", () => {
    if (registration.waiting) {
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
    } else {
      window.location.reload();
    }
  });
  document.body.appendChild(banner);
}
