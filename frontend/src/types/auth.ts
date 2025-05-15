export interface RegisterData{
    username: string;
    email: string;
    password: string;
    role: 'ADMIN' | 'OWNER' | 'TENANT';
}

export interface LoginData{
    email: string;
    password: string;
}