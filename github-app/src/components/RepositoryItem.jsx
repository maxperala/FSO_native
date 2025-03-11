import { View, StyleSheet, Image } from "react-native";
import Text from "./Text";
import DataItem from "./DataItem";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: "5%",
    paddingTop: "2%",
    paddingBottom: "2%",
  },
  topDiv: {
    flex: 2,
    flexDirection: "row",
  },
  topLeftDiv: {
    flex: 1,
  },
  topRightDiv: {
    flex: 8,
    padding: "5%",
    gap: 4,
  },
  bottomDiv: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSegment: {
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  lngSegment: {
    width: "100%",
    borderRadius: 10,
    padding: "1%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  lng: {
    backgroundColor: "blue",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: "2%",
    borderRadius: 10,
  },
});

const RepositoryItem = ({ data }) => {
  return (
    <View style={styles.container} testID="repositoryItem">
      <View style={styles.topDiv}>
        <View style={styles.topLeftDiv}>
          <Image src={data.ownerAvatarUrl} style={styles.image} />
        </View>
        <View style={styles.topRightDiv}>
          <Text color={"textPrimary"} fontSize={"subheading"} testID="name">
            {data.fullName}
          </Text>
          <Text color={"textSecondary"} testID="desc">
            {data.description}
          </Text>
          <View style={styles.lngSegment}>
            <View style={styles.lng}>
              <Text
                fontWeight={"bold"}
                style={{ color: "white" }}
                testID="lang"
              >
                {data.language}
              </Text>
            </View>

            <View style={{ flex: 1 }} />
            <View style={{ flex: 1 }} />
          </View>
        </View>
      </View>
      <View style={styles.bottomDiv}>
        <DataItem
          testID="stars"
          name="Stars"
          amount={data.stargazersCount}
          style={styles.bottomSegment}
        />

        <DataItem
          testID="forks"
          name="Forks"
          amount={data.forksCount}
          style={styles.bottomSegment}
        />
        <DataItem
          testID="reviews"
          name="Reviews"
          amount={data.reviewCount}
          style={styles.bottomSegment}
        />

        <DataItem
          testID="rating"
          name="Rating"
          amount={data.ratingAverage}
          style={styles.bottomSegment}
        />
      </View>
    </View>
  );
};

export default RepositoryItem;
