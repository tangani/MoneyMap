const API_BASE_URL = "https://moneymap-backend-l90f.onrender.com";

export async function apiFetch(path: string, options: RequestInit = {}) {
    return fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers ?? {}),
        },
    });
}