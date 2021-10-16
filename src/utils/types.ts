export type Post = {
    author: string | null,
    comment_text: string | null,
    created_at: string | null,
    created_at_i: number | null,
    num_comments: number | null,
    objectID: string | null,
    parent_id: number | null,
    points: number | null,
    story_id: string | null,
    story_text: string | null,
    story_title: string | null,
    story_url: string | null,
    title: string | null,
    url: string | null,
    _highlightResult: any,
    _tags: any,
}

export type Page = {
    currentPage: number, 
    minPages: number, 
    maxPages: number,
}

export type FilterOptions = {
    by: string,
    label: string,
    selected: boolean,
}

