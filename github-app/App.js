import Main from "./src/Main";
import { NativeRouter } from "react-router-native";
import { ApolloProvider } from "@apollo/client";
import { StatusBar } from "expo-status-bar";
import createApolloClient from "./src/utils/apolloClient";
import Constants from "expo-constants";

const apolloClient = createApolloClient();

export default function App() {
  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <Main />
        </ApolloProvider>
      </NativeRouter>
      <StatusBar style="auto" />
    </>
  );
}
