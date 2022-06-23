import { BrowserRouter as Router } from "react-router-dom";

import Routes from "./routes";

import { MenuProvider } from "./hooks/useMenu";

import GlobalStyle from "./styles/global";

const App = () => (
  <MenuProvider>
    <GlobalStyle />
    <Router>
      <Routes />
    </Router>
  </MenuProvider>
);

export default App;
