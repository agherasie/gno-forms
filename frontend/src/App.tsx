import { ChakraProvider } from "@chakra-ui/react";
import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import theme from "./theme";

const App: FC = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);

export default App;
