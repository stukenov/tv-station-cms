// Represents a link in Laravel's pagination
export interface PaginatorLink {
    url: string | null;
    label: string;
    active: boolean;
}

// Represents the meta information in Laravel's pagination
export interface PaginatorMeta {
    current_page: number;
    from: number | null;
    last_page: number;
    links?: PaginatorLink[]; // Links can also be nested under meta sometimes
    path: string;
    per_page: number;
    to: number | null;
    total: number;
}

// Generic Paginator interface
export interface Paginator<T> {
    data: T[];
    links: PaginatorLink[];
    meta: PaginatorMeta;
} 