import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

import api from "../services/api";

import { FoodProps, AddFoodProps } from "../types";

interface MenuProviderProps {
  children: ReactNode;
}

interface MenuContextData {
  foods: FoodProps[];
  editingFood: FoodProps;
  addFoodModalOpen: boolean;
  editFoodModalOpen: boolean;
  setEditingFood: (food: FoodProps) => void;
  addFood: (food: AddFoodProps) => void;
  updateFood: (food: FoodProps) => void;
  deleteFood: (foodId: number) => void;
  toggleAddFoodModal: () => void;
  toggleEditFoodModal: () => void;
  editFood: (food: FoodProps) => void;
}

const MenuContext = createContext<MenuContextData>({} as MenuContextData);

export function MenuProvider({ children }: MenuProviderProps): JSX.Element {
  const [foods, setFoods] = useState<FoodProps[]>([]);
  const [editingFood, setEditingFood] = useState<FoodProps>({} as FoodProps);
  const [addFoodModalOpen, setAddFoodModalOpen] = useState<boolean>(false);
  const [editFoodModalOpen, setEditFoodModalOpen] = useState<boolean>(false);

  async function addFood(food: AddFoodProps) {
    try {
      const response = await api.post("/foods", {
        ...food,
        available: true,
      });

      setFoods((prevState) => [...prevState, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function updateFood(food: FoodProps) {
    try {
      const foodUpdated = await api.put(`/foods/${editingFood.id}`, {
        ...editingFood,
        ...food,
      });

      const foodsUpdated = foods.map((f) =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteFood(id: number) {
    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter((food) => food.id !== id);

    setFoods(foodsFiltered);
  }

  function toggleAddFoodModal() {
    setAddFoodModalOpen(!addFoodModalOpen);
  }

  function toggleEditFoodModal() {
    setEditFoodModalOpen(!editFoodModalOpen);
  }

  function editFood(food: FoodProps) {
    setEditingFood(food);
    setEditFoodModalOpen(true);
  }

  async function loadFoods() {
    const response = await api.get("/foods");

    setFoods(response.data);
  }

  useEffect(() => {
    loadFoods();
  }, []);

  return (
    <MenuContext.Provider
      value={{
        foods,
        addFood,
        editingFood,
        addFoodModalOpen,
        editFoodModalOpen,
        setEditingFood,
        updateFood,
        deleteFood,
        toggleAddFoodModal,
        toggleEditFoodModal,
        editFood,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);

  return context;
}
