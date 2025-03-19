import { useQuery } from "@apollo/client";
import { GET_REPOSITORY_REVIEWS } from "../graphql/queries";
import { useMemo } from "react";

const useReviews = (id) => {
  const resp = useQuery(GET_REPOSITORY_REVIEWS, {
    variables: {
      repoId: id,
    },
  });

  const reviews = useMemo(() => {
    return resp.data?.repository.reviews.edges.map((obj) => {
      return { ...obj.node };
    });
  }, [resp.data]);

  return {
    reviews,
    loading: resp.loading,
    refetch: resp.refetch,
  };
};

export default useReviews;
