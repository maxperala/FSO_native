import { View, StyleSheet } from "react-native";
import { useParams } from "react-router-native";
import useRepositories from "../hooks/useRepositories";
import { useMemo } from "react";
import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
  loadContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flexGrow: 1,
  },
});

const SingleRepoView = () => {
  const { id } = useParams();
  const { repositories } = useRepositories();
  const repoData = useMemo(() => {
    if (!repositories) return undefined;
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];
    return repositoryNodes.find((r) => r.id === id);
  }, [repositories]);

  if (!id) {
    return <View style={styles.loadContainer}>Repo not found</View>;
  }
  if (!repoData) return <View style={styles.loadContainer}>Loading...</View>;

  return (
    <View style={styles.container}>
      <RepositoryItem data={repoData} single={true} />
    </View>
  );
};

export default SingleRepoView;
