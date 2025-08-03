import { FlatList, View, StyleSheet, Pressable } from "react-native";
import Text from "./Text";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "grey",
  },
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  filter: {
    height: "5%",
    display: "flex",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "black",
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 2,
    marginRight: 2,
    borderRadius: 10,
    backgroundColor: "rgba(128, 128, 128, 0.2)",
  },
});

const FILTERS = [
  { value: "CREATED_AT", label: "Latest repositories" },
  { value: "RATING_AVERAGE", label: "Highest rated repositories" },
  { value: "RATING_AVERAGE_DESC", label: "Lowest rated repositories" },
];

export const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  filter,
  setFilter,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  // Reverse the array for "lowest" rating to get descending order
  const sortedRepositoryNodes =
    filter === "RATING_AVERAGE_DESC"
      ? [...repositoryNodes].reverse()
      : repositoryNodes;

  const [filterMenuOpen, setFilterMenuOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.filter}
        onPress={() => setFilterMenuOpen(!filterMenuOpen)}
      >
        <Text>Filter: {FILTERS.find((f) => f.value === filter)?.label}</Text>
      </Pressable>
      {filterMenuOpen && (
        <Picker selectedValue={filter} onValueChange={setFilter}>
          {FILTERS.map((f) => (
            <Picker.Item key={f.value} label={f.label} value={f.value} />
          ))}
        </Picker>
      )}
      <FlatList
        data={sortedRepositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RepositoryItem data={item} />}
      />
    </View>
  );
};

const RepositoryList = () => {
  const [filter, setFilter] = useState("CREATED_AT");

  // Just reverse for lowest :)
  const orderBy = filter === "RATING_AVERAGE_DESC" ? "RATING_AVERAGE" : filter;
  const { repositories } = useRepositories(orderBy);

  return (
    <RepositoryListContainer
      repositories={repositories}
      filter={filter}
      setFilter={setFilter}
    />
  );
};

export default RepositoryList;
