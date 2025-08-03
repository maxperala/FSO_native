import { FlatList, View, StyleSheet, Pressable, TextInput } from "react-native";
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
  search: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginHorizontal: 8,
    marginVertical: 8,
    backgroundColor: "white",
    fontSize: 16,
    justifyContent: "center",
  },
  filter: {
    height: 40,
    display: "flex",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 12,
    marginHorizontal: 8,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: "white",
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
  searchWord,
  setSearchWord,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const sortedRepositoryNodes =
    filter === "RATING_AVERAGE_DESC"
      ? [...repositoryNodes].reverse()
      : repositoryNodes;

  const [filterMenuOpen, setFilterMenuOpen] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput
          value={searchWord}
          onChangeText={setSearchWord}
          autoCapitalize="none"
          placeholder="Search for a repo..."
        />
      </View>
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
  const [searchWord, setSearchWord] = useState("");

  // Just reverse for lowest :)
  const orderBy = filter === "RATING_AVERAGE_DESC" ? "RATING_AVERAGE" : filter;
  const { repositories } = useRepositories(orderBy, searchWord || undefined);

  return (
    <RepositoryListContainer
      repositories={repositories}
      filter={filter}
      setFilter={setFilter}
      searchWord={searchWord}
      setSearchWord={setSearchWord}
    />
  );
};

export default RepositoryList;
