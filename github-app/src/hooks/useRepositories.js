import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_REPOS } from "../graphql/queries";

const useRepositories = (orderBy) => {
  const response = useQuery(GET_REPOS, {
    variables: { orderBy },
    fetchPolicy: "cache-and-network",
  });

  return {
    repositories: response.data?.repositories
      ? response.data.repositories
      : undefined,
    loading: response.loading,
    refetch: response.refetch,
  };
};

export default useRepositories;
