import { ChakraProvider, HStack, VStack } from "@chakra-ui/react";
import { FC } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import theme, { colors } from "./theme";
import FormCreation from "./pages/FormCreation";
import ConnectWallet from "./components/ConnectWallet";

const Layout: FC = () => (
  <VStack w="100%" align="start" spacing={0}>
    <HStack
      w="100%"
      borderBottom={`1px solid ${colors.gray[300]}`}
      p="12px"
      justify="center"
      bg="gray.200"
    >
      <ConnectWallet />
    </HStack>
    <Outlet />
  </VStack>
);

const App: FC = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="create" element={<FormCreation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);

export default App;
