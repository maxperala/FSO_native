import { RepositoryListContainer } from "../../components/RepositoryList";
import { render, screen, within } from "@testing-library/react-native";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };

      render(<RepositoryListContainer repositories={repositories} />);
      const items = screen.getAllByTestId("repositoryItem");
      for (const item of items) {
        const { getByTestId } = within(item);
        const name = getByTestId("name");

        const itemFormRepo = repositories.edges.find(
          (edge) => edge.node.fullName === name.props.children
        )?.node;

        const modifiedItem = {};
        for ([key, value] of Object.entries(itemFormRepo)) {
          if (typeof value === "number" && value >= 1000) {
            modifiedItem[key] = `${(value / 1000).toPrecision(3)}k`;
            continue;
          }
          modifiedItem[key] = value;
        }

        expect(name).toHaveTextContent(modifiedItem.fullName);
        const desc = getByTestId("desc");
        expect(desc).toHaveTextContent(modifiedItem.description);
        const lang = getByTestId("lang");
        expect(lang).toHaveTextContent(modifiedItem.language);
        const forks = getByTestId("forks");
        expect(forks).toHaveTextContent(modifiedItem.forksCount.toString());
        const stars = getByTestId("stars");
        expect(stars).toHaveTextContent(
          modifiedItem.stargazersCount.toString()
        );
        const rating = getByTestId("rating");
        expect(rating).toHaveTextContent(modifiedItem.ratingAverage.toString());
        const review = getByTestId("reviews");
        expect(review).toHaveTextContent(modifiedItem.reviewCount.toString());
      }
    });
  });
});
