import { useQuery } from "@apollo/client";
import { ME_WITH_REVIEWS } from "../graphql/queries";
import { FlatList } from "react-native";
import { useMemo } from "react";
import { ItemSeparator } from "./RepositoryList";
import Review from "./Review";

const MyReviews = () => {
  const { data } = useQuery(ME_WITH_REVIEWS, {
    fetchPolicy: "network-only",
  });
  const reviewNodes = useMemo(() => {
    if (!data) return [];
    return data.me?.reviews?.edges.map((edge) => edge.node);
  }, [data]);
  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Review data={item} repoInsteadOfUsername={true} />
      )}
    />
  );
};

export default MyReviews;
