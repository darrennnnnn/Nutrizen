// Props Interface

export interface ProgressProps {
    value: number;
    color: string;
}

export interface CameraFileInputProps {
    onImageCapture: (imageUrl: string, file: File) => void;
}

export interface MenubarProps {
    onImageCapture: (imageUrl: string, file: File) => void;
}

export interface DashboardProps {
    currentCalories: number;
    currentProteins: number;
    currentFat: number;
    currentCarbs: number;
    currentFiber: number;

    targetCalories: number;
    targetProteins: number;
    targetFat: number;
    targetCarbs: number;
    targetFiber: number;

    foodData: NutritionInfo[];
    coins: number;
}

export interface NutrientSummaryProps {
    currentProteins: number;
    currentFat: number;
    currentCarbs: number;
    currentFiber: number;

    targetProteins: number;
    targetFat: number;
    targetCarbs: number;
    targetFiber: number;
}

export interface NutrientProgressProps {
    name: string;
    current: number;
    target: number;
    color: string;
}

export interface CalorieIntakeSummaryProps {
    current: number;
    target: number;
}

// Types Interface
export interface NutritionInfo {
    name: string;
    calories: number;
    proteins: number;
    carbs: number;
    fiber: number;
    fat: number;
}

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
