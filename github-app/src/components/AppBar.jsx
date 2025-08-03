import { View, StyleSheet, Pressable, Text, ScrollView } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import { Link, useNavigate } from "react-router-native";
import { useApolloClient, useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";
import useAuthStorage from "../hooks/useAuthStorage";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.greyBg,
    height: "12%",
    justifyContent: "center",
    paddingLeft: "2%",
  },
  text: {
    color: "white",
    fontSize: 28,
    paddingLeft: "3%",
    paddingRight: "3%",
  },
  btn: {
    marginLeft: 10,
    marginRight: 10,
  },
});

const AppBar = () => {
  const { data } = useQuery(ME);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();
  const logout = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate("/login");
  };
  const logoutBtn = () => {
    return (
      <Pressable onPress={logout}>
        <Text style={styles.text}>Log out</Text>
      </Pressable>
    );
  };

  const loginBtn = () => {
    return (
      <Link to="/login" style={styles.btn}>
        <Text style={styles.text}>Log in</Text>
      </Link>
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/" style={styles.btn}>
          <Text style={styles.text}>Repositories</Text>
        </Link>
        <Link to="/review" style={styles.btn}>
          <Text style={styles.text}>Review</Text>
        </Link>
        {data?.me ? logoutBtn() : loginBtn()}
        {data?.me ? null : (
          <Link to="/signup" style={styles.btn}>
            <Text style={styles.text}>Sign up</Text>
          </Link>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
