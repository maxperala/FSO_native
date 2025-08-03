import { StyleSheet, View } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 5,
    padding: 10,
  },
  topContainer: {
    flexDirection: "row",
    gap: 15,
  },
  rating: {
    borderRadius: 100,
    minHeight: 60,
    borderWidth: 2,
    borderColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  NameRating: {
    flexDirection: "column",
    justifyContent: "center",
    gap: 5,

    flex: 6,
  },
  textContainer: {
    flexDirection: "row",
  },
  review: {
    flex: 6,
  },
});

const Review = ({ data, repoInsteadOfUsername = false }) => {
  if (!data) return;
  const date = new Date(data.createdAt);
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.rating}>
          <Text fontWeight="bold" style={{ color: "blue" }}>
            {data.rating}
          </Text>
        </View>
        <View style={styles.NameRating}>
          {repoInsteadOfUsername ? (
            <Text fontWeight="bold">{data.repository.fullName}</Text>
          ) : (
            <Text fontWeight="bold">{data.user.username}</Text>
          )}
          <Text fontWeight="bold">{date.toDateString()}</Text>
        </View>
      </View>
      <View style={styles.textContainer}>
        <View style={{ flex: 1 }} />
        <View style={styles.review}>
          <Text>{data.text}</Text>
        </View>
      </View>
    </View>
  );
};

export default Review;
