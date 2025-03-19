import { View, StyleSheet, Image, Pressable } from "react-native";
import Text from "./Text";
import DataItem from "./DataItem";
import * as Linking from "expo-linking";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: "5%",
    paddingTop: "2%",
    paddingBottom: "2%",
    width: "100%",
    backgroundColor: "white",
    minHeight: 230,
  },
  topDiv: {
    flexDirection: "row",
    flex: 1,
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
  openBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    borderRadius: 6,
  },
  openText: {
    color: "white",
  },
});

const RepositoryItem = ({ data, single = false }) => {
  const navigate = useNavigate();

  const content = (
    <>
      <View style={styles.topDiv}>
        <View style={styles.topLeftDiv}>
          <Image source={{ uri: data.ownerAvatarUrl }} style={styles.image} />
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
    </>
  );

  return (
    <View style={[styles.container]} testID="repositoryItem">
      {single ? (
        <>
          {content}
          <Pressable
            onPress={() => {
              Linking.openURL(data.url);
            }}
          >
            <View style={styles.openBtn}>
              <Text style={styles.openText}>Open in GitHub</Text>
            </View>
          </Pressable>
        </>
      ) : (
        <Pressable onPress={() => navigate(`/repos/${data.id}`)}>
          {content}
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;
