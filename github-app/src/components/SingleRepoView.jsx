import { View, StyleSheet, FlatList } from "react-native";
import { useParams } from "react-router-native";
import useRepositories from "../hooks/useRepositories";
import { useMemo } from "react";
import RepositoryItem from "./RepositoryItem";
import useReviews from "../hooks/useReviews";
import Review from "./Review";
import { ItemSeparator } from "./RepositoryList";

const styles = StyleSheet.create({
  loadContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
});

const SingleRepoView = () => {
  const { id } = useParams();
  const { repositories } = useRepositories();
  const { reviews } = useReviews(id);
  const repoData = useMemo(() => {
    if (!repositories) return undefined;
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];
    return repositoryNodes.find((r) => r.id === id);
  }, [repositories]);

  console.log(reviews);

  if (!id) {
    return <View style={styles.loadContainer}>Repo not found</View>;
  }
  if (!repoData || !reviews)
    return <View style={styles.loadContainer}>Loading...</View>;

  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        renderItem={({ item }) => <Review data={item} />}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={() => (
          <RepositoryItem data={repoData} single={true} />
        )}
      />
    </View>
  );
};

export default SingleRepoView;
