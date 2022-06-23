import { FiPlusSquare } from "react-icons/fi";

import { useMenu } from "../../hooks/useMenu";

import Logo from "../../assets/logo.svg";

import { Container } from "./styles";

function Header() {
  const { toggleAddFoodModal } = useMenu();

  return (
    <Container>
      <header>
        <img src={Logo} alt="GoRestaurant" />
        <nav>
          <div>
            <button type="button" onClick={toggleAddFoodModal}>
              <div className="text">Novo Prato</div>
              <div className="icon">
                <FiPlusSquare size={24} />
              </div>
            </button>
          </div>
        </nav>
      </header>
    </Container>
  );
}

export { Header };
