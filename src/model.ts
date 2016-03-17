export interface User {
    name: string;
    languages: Language[];
    etag: string;
}

export interface Language {
    language: string;
    repository: string;
}