import { Text, StyleSheet, View } from "react-native";
import RepositoryList from "./components/RepositoryList";
import AppBar from "./components/AppBar";
import { Route, Routes, Navigate } from "react-router-native";
import SignIn from "./components/SignIn";
import SingleRepoView from "./components/SingleRepoView";
import ReviewForm from "./components/ReviewForm";
import SignUp from "./components/SignUp";
import MyReviews from "./components/MyReviews";

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
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="repos/:id" element={<SingleRepoView />} />
        <Route path="/review" element={<ReviewForm />} />
        <Route path="/myreviews" element={<MyReviews />} />
      </Routes>
    </View>
  );
};

export default Main;
