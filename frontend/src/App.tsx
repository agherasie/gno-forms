import {
  Box,
  ChakraProvider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import theme, { colors } from "./theme";
import FormCreation from "./pages/FormCreation";
import { useProviderStore } from "./store";
import { GnoJSONRPCProvider } from "@gnolang/gno-js-client";
import { constants } from "./constants";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FormSubmit from "./pages/FormSubmit";
import FormSubmission from "./pages/FormResults/Details";
import FormResults from "./pages/FormResults";
import WalletDrawer from "./components/WalletDrawer";
import WalletIndicator from "./components/WalletDrawer/WalletIndicator";

const Layout: FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Drawer size="md" isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent onMouseLeave={onClose}>
          <DrawerBody
            p="16px"
            border={`1px solid ${colors.gray[300]}`}
            bg="gray.100"
          >
            <WalletDrawer />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <HStack w="100%" h="100vh" align="start" justify="space-between">
        <Outlet />
        <Box
          onMouseEnter={onOpen}
          right="0px"
          position="fixed"
          h="100%"
          p="16px"
        >
          <WalletIndicator />
        </Box>
      </HStack>
    </>
  );
};

const queryClient = new QueryClient();

const App: FC = () => {
  const { setProvider } = useProviderStore();
  useEffect(() => {
    const provider = new GnoJSONRPCProvider(constants.chainRPC);
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
              <Route path="results/:id">
                <Route index element={<FormResults />} />
                <Route path=":author" element={<FormSubmission />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default App;
