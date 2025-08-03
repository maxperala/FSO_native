import { useFormik } from "formik";
import * as yup from "yup";
import Text from "./Text";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import useSignUp from "../hooks/useSignUp";
import { useNavigate } from "react-router-native";

const validation = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username must be at least 5 characters")
    .max(30, "Username must be at most 30 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters")
    .max(50, "Password must be at most 50 characters")
    .required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});

const initial = {
  username: "",
  password: "",
  passwordConfirmation: "",
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

export const SignUpContainer = ({ onSubmit }) => {
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
        autoCapitalize="none"
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
        autoCapitalize="none"
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: "red" }}>{formik.errors.password}</Text>
      )}
      <TextInput
        style={[
          styles.input,
          { borderColor: formik.errors.passwordConfirmation ? "red" : "grey" },
        ]}
        placeholder="Password confirmation"
        testID="passwordConfirmation"
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange("passwordConfirmation")}
        secureTextEntry
        autoCapitalize="none"
      />
      {formik.touched.passwordConfirmation &&
        formik.errors.passwordConfirmation && (
          <Text style={{ color: "red" }}>
            {formik.errors.passwordConfirmation}
          </Text>
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
          Sign Up
        </Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signUp({ username, password });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
