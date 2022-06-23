export interface FoodProps {
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
  image: string;
}

export type AddFoodProps = Omit<FoodProps, "id" | "available">;
