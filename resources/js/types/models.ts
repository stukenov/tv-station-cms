export interface News {
    id: number;
    title: string;
    slug: string;
    content: string;
    image_url?: string | null; // Add optional image_url
    created_at: string; // Or Date if you parse it
    updated_at: string; // Or Date if you parse it
    is_featured?: boolean; // Add optional featured flag
}

export interface Project {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    cover_image_url?: string | null; // Add optional cover_image_url for projects
    created_at: string;
    updated_at: string;
}

export interface ScheduleItem {
    id: number;
    title: string;
    start_time: string; // Keep as string for simplicity, format in component
    end_time: string;
    created_at: string;
    updated_at: string;
}

export interface Video {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    video_url: string | null;
    thumbnail_url: string | null;
    project_id: number | null;
    published_at: string | null;
    created_at: string;
    updated_at: string;
    // project?: Project; // We can add related project data if needed later
}

// Add other model types here as needed 