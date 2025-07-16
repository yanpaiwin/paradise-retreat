export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    user_type: string;
    phone?: string;
    is_active: boolean;
    role?: {
        id: number;
        name: string;
        display_name: string;
        description?: string;
        permissions?: string[];
    };
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
