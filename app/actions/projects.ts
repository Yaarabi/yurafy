'use server';

export async function getProjects() {
    try {
        const res = await fetch("https://yurafy.com/api/projects", {
            next: { revalidate: 3600 } // Cache for 1 hour
        });
        if (!res.ok) throw new Error("Failed to fetch projects");
        return await res.json();
    } catch (err) {
        console.error("Error fetching projects:", err);
        return { projects: [] };
    }
}
