export interface Author {
    id: number;
    name: string;
    username: string;
    state: string;
    avatar_url: string;
    web_url: string;
}

export interface MergeRequest {
    id: number;
    project_id: number;
    title: string;
    description: string;
    state: string;
    created_at: string;
    updated_at: string;
    merged_at: string;
    author: Author;
    work_in_progress: boolean;
    merge_status: string;
    referebce: string;
    web_url: string;
}
