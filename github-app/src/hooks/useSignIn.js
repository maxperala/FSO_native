import { useApolloClient, useMutation } from "@apollo/client";
import { AUTHENTICATE_MUTATION } from "../graphql/queries";
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE_MUTATION);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const res = await mutate({
      variables: {
        username,
        password,
      },
    });
    if (!res) throw new Error("Invalid credentials");
    if (!res.data?.authenticate?.accessToken)
      throw new Error("Something went wrong");
    await authStorage.setAccessToken(res.data.authenticate.accessToken);
    await apolloClient.resetStore();
    return res;
  };
  return [signIn, result];
};

export default useSignIn;
