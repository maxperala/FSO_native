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
    <View style={styles.container}>
      <View style={styles.topDiv}>
        <View style={styles.topLeftDiv}>
          <Image src={data.ownerAvatarUrl} style={styles.image} />
        </View>
        <View style={styles.topRightDiv}>
          <Text color={"textPrimary"} fontSize={"subheading"}>
            {data.fullName}
          </Text>
          <Text color={"textSecondary"}>{data.description}</Text>
          <View style={styles.lngSegment}>
            <View style={styles.lng}>
              <Text fontWeight={"bold"} style={{ color: "white" }}>
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
          name="Stars"
          amount={data.stargazersCount}
          style={styles.bottomSegment}
        />

        <DataItem
          name="Forks"
          amount={data.forksCount}
          style={styles.bottomSegment}
        />
        <DataItem
          name="Reviews"
          amount={data.reviewCount}
          style={styles.bottomSegment}
        />

        <DataItem
          name="Rating"
          amount={data.ratingAverage}
          style={styles.bottomSegment}
        />
      </View>
    </View>
  );
};

/*
        <View>
            <Text>Full name: {data.fullName}</Text>
            <Text>Description: {data.description}</Text>
            <Text>Language: {data.language}</Text>
            <Text>Stars: {data.stargazersCount}</Text>
            <Text>Forks: {data.forksCount}</Text>
            <Text>Reviews: {data.reviewCount}</Text>
            <Text>Rating: {data.ratingAverage}</Text>
        </View>
*/

export default RepositoryItem;
