export interface Restaurant {
    id: number;
    name: string;
    address: string;
    photo_url: string;
    active_time: string;
    is_draft: boolean;
}

export interface Food {
    id: number;
    name: string;
    price: number;
    photo_url: string;
    is_draft: boolean;
    is_food: boolean;
}