import { Text, StyleSheet, View } from "react-native";
import RepositoryList from "./components/RepositoryList";
import AppBar from "./components/AppBar";
import { Route, Routes, Navigate } from "react-router-native";
import SignIn from "./components/SignIn";
import SingleRepoView from "./components/SingleRepoView";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="repos/:id" element={<SingleRepoView />} />
      </Routes>
    </View>
  );
};

export default Main;
