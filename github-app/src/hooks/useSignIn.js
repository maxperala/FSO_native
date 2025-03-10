import { useMutation } from "@apollo/client";
import { AUTHENTICATE_MUTATION } from "../graphql/queries";

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE_MUTATION);

  const signIn = async ({ username, password }) => {
    const res = await mutate({
      variables: {
        username,
        password,
      },
    });
    if (!res) throw new Error("Invalid credentials");
    return res;
  };
  return [signIn, result];
};

export default useSignIn;
