import { View, StyleSheet, Pressable, Text, ScrollView } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import { Link } from "react-router-native";

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
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/" style={styles.btn}>
          <Text style={styles.text}>Repositories</Text>
        </Link>
        <Link to="/login" style={styles.btn}>
          <Text style={styles.text}>Log in</Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
