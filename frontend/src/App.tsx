import { ChakraProvider, HStack, VStack } from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import theme, { colors } from "./theme";
import FormCreation from "./pages/FormCreation";
import ConnectWallet from "./components/ConnectWallet";
import { useProviderStore } from "./store";
import { GnoWSProvider } from "@gnolang/gno-js-client";
import { constants } from "./constants";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FormSubmit from "./pages/FormSubmit";
import FormResults from "./pages/FormResults";

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

const queryClient = new QueryClient();

const App: FC = () => {
  const { setProvider } = useProviderStore();
  useEffect(() => {
    const provider = new GnoWSProvider(constants.chainRPC);
    setProvider(provider);
  }, [setProvider]);

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="create" element={<FormCreation />} />
              <Route path="submit/:id" element={<FormSubmit />} />
              <Route path="results/:id/:author" element={<FormResults />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default App;
