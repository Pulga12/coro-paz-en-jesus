const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, X-Admin-Key"
};

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }

    if (request.method !== "POST") {
      return json({ error: "Método no permitido." }, 405);
    }

    const adminKey = request.headers.get("X-Admin-Key");
    if (!env.ADMIN_KEY || adminKey !== env.ADMIN_KEY) {
      return json({ error: "Clave de publicación incorrecta." }, 401);
    }

    const repo = env.GITHUB_REPO;
    const branch = env.GITHUB_BRANCH || "main";
    const path = env.DATA_PATH || "data/app-data.json";
    const token = env.GITHUB_TOKEN;

    if (!repo || !token) {
      return json({ error: "Faltan GITHUB_REPO o GITHUB_TOKEN en el servidor." }, 500);
    }

    const body = await request.json().catch(() => null);
    if (!body || !body.data) {
      return json({ error: "Falta data en el cuerpo de la solicitud." }, 400);
    }

    const content = JSON.stringify(body.data, null, 2);
    const apiBase = `https://api.github.com/repos/${repo}/contents/${path}`;
    const current = await githubFetch(`${apiBase}?ref=${encodeURIComponent(branch)}`, token);
    const currentJson = current.ok ? await current.json() : {};

    const update = await githubFetch(apiBase, token, {
      method: "PUT",
      body: JSON.stringify({
        message: "Actualizar datos de Coro Paz en Jesús",
        content: toBase64(content),
        branch,
        sha: currentJson.sha
      })
    });

    const result = await update.json().catch(() => ({}));
    if (!update.ok) {
      return json({ error: result.message || "GitHub no aceptó la actualización." }, update.status);
    }

    return json({ ok: true, commit: result.commit?.sha || null });
  }
};

function githubFetch(url, token, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      "Accept": "application/vnd.github+json",
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "coro-paz-app",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(options.headers || {})
    }
  });
}

function toBase64(value) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      ...CORS_HEADERS,
      "Content-Type": "application/json; charset=utf-8"
    }
  });
}
