export interface FoodApiResponse {
    food: Array<{
        food_info: {
            g_per_serving: number;
            display_name: string;
            nutrition: {
                calories_100g: number;
                proteins_100g: number;
                carbs_100g: number;
                fibers_100g: number;
                fat_100g: number;
            };
        };
    }>;
}
