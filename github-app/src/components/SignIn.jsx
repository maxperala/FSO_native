import { useFormik } from "formik";
import * as yup from "yup";
import Text from "./Text";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";

const validation = yup.object().shape({
  username: yup
    .string()
    .min(4, "Username too short")
    .required("Username is required"),
  password: yup
    .string()
    .min(4, "Password too short")
    .required("Password is required"),
});

const initial = {
  username: "",
  password: "",
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    flexDirection: "column",
    padding: "4%",
    gap: 16,
  },
  input: {
    width: "100%",
    height: "8%",
    borderWidth: 1,
    paddingLeft: "3%",
    borderRadius: 4,
    fontSize: 20,
  },
  btn: {
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    width: "100%",
    height: "8%",
  },
});

export const SignInContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: initial,
    onSubmit,
    validationSchema: validation,
  });
  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          { borderColor: formik.errors.username ? "red" : "grey" },
        ]}
        placeholder="Username"
        value={formik.values.username}
        testID="username"
        onChangeText={formik.handleChange("username")}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: "red" }}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={[
          styles.input,
          { borderColor: formik.errors.password ? "red" : "grey" },
        ]}
        placeholder="Password"
        testID="password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        secureTextEntry
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: "red" }}>{formik.errors.password}</Text>
      )}
      <Pressable
        style={styles.btn}
        onPress={formik.handleSubmit}
        testID="submitButton"
      >
        <Text
          style={{ color: "white" }}
          fontSize="subheading"
          fontWeight="bold"
        >
          Sign In
        </Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navi = useNavigate();
  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const { data } = await signIn({ username, password });
      navi("/");
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;
