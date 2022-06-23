import { useState } from "react";
import { FiEdit3, FiTrash } from "react-icons/fi";

import { useMenu } from "../../hooks/useMenu";

import api from "../../services/api";

import { FoodProps } from "../../types";

import {
  Container,
  SectionBody,
  SectionFooter,
  AvailabilityContainer,
} from "./styles";

interface FoodComponentProps {
  food: FoodProps;
}

function Food({ food }: FoodComponentProps) {
  const { deleteFood, editFood } = useMenu();

  const [isAvailable, setIsAvailable] = useState(food.available);

  function handleDelete(id: number) {
    deleteFood(id);
  }

  async function toggleAvailable() {
    await api.put(`/foods/${food.id}`, {
      ...food,
      available: !isAvailable,
    });

    setIsAvailable((prevState) => !prevState);
  }

  function setEditingFood() {
    editFood(food);
  }

  return (
    <Container available={isAvailable}>
      <header>
        <img src={food.image} alt={food.name} />
      </header>

      <SectionBody>
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price">
          R$ <b>{food.price}</b>
        </p>
      </SectionBody>

      <SectionFooter>
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={setEditingFood}
            data-testid={`edit-food-${food.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(food.id)}
            data-testid={`remove-food-${food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <AvailabilityContainer>
          <p>{isAvailable ? "Disponível" : "Indisponível"}</p>

          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              checked={isAvailable}
              onChange={toggleAvailable}
              data-testid={`change-status-food-${food.id}`}
            />
            <span className="slider" />
          </label>
        </AvailabilityContainer>
      </SectionFooter>
    </Container>
  );
}

export default Food;
