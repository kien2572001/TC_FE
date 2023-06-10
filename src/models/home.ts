export interface Restaurant {
    id: number;
    name: string;
    address: string;
    photoUrl: string;
    active_time: string;
    is_draft: boolean;
    rating: number;
}

export interface Food {
    id: number;
    name: string;
    price: number;
    photoUrl: string;
    is_draft: boolean;
    is_food: boolean;
    rating: number;
}