import { useMenu } from "../../hooks/useMenu";

import Food from "../../components/Food";
import { Header } from "../../components/Header";
import ModalAddFood from "../../components/ModalAddFood";
import ModalEditFood from "../../components/ModalEditFood";

import { FoodsContainer } from "./styles";

function Dashboard() {
  const { foods } = useMenu();

  return (
    <>
      <Header />

      <ModalAddFood />
      <ModalEditFood />

      <FoodsContainer data-testid="foods-list">
        {foods && foods.map((food) => <Food key={food.id} food={food} />)}
      </FoodsContainer>
    </>
  );
}

export default Dashboard;
