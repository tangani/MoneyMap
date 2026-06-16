export async function authenticatedFetch(
    path: string,
    options: RequestInit = {}
) {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${path}`,
        {
            ...options,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                ...(options.headers ?? {}),
            },
        }
    );

    if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/login";
    }

    return response;
}