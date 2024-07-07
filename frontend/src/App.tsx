import { ChakraProvider } from "@chakra-ui/react";
import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import theme from "./theme";
import FormCreation from "./pages/FormCreation";

const App: FC = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="create" element={<FormCreation />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);

export default App;
