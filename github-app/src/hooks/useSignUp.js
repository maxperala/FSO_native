import { useApolloClient, useMutation } from "@apollo/client";
import {
  CREATE_USER_MUTATION,
  AUTHENTICATE_MUTATION,
} from "../graphql/queries";
import useAuthStorage from "./useAuthStorage";

const useSignUp = () => {
  const [createUser, createUserResult] = useMutation(CREATE_USER_MUTATION);
  const [authenticate, authenticateResult] = useMutation(AUTHENTICATE_MUTATION);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signUp = async ({ username, password }) => {
    try {
      const createUserRes = await createUser({
        variables: {
          username,
          password,
        },
      });

      if (!createUserRes?.data?.createUser) {
        throw new Error("Failed to create user");
      }

      const authRes = await authenticate({
        variables: {
          username,
          password,
        },
      });

      if (!authRes?.data?.authenticate?.accessToken) {
        throw new Error("Failed to authenticate user");
      }

      await authStorage.setAccessToken(authRes.data.authenticate.accessToken);
      await apolloClient.resetStore();

      return authRes;
    } catch (error) {
      throw error;
    }
  };

  return [signUp, { createUserResult, authenticateResult }];
};

export default useSignUp;
