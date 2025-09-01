import { render, screen, within } from '@testing-library/react-native';

import { RepositoryListContainer } from '../components/RepositoryList';
import { formatNumber } from '../components/RepositoryItem';

describe('RepositoryListContainer', () => {
  const repositories = {
    totalCount: 8,
    pageInfo: {
      hasNextPage: true,
      endCursor: 'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
      startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
    },
    edges: [
      {
        node: {
          id: 'jaredpalmer.formik',
          fullName: 'jaredpalmer/formik',
          description: 'Build forms in React, without the tears',
          language: 'TypeScript',
          forksCount: 1619,
          stargazersCount: 21856,
          ratingAverage: 88,
          reviewCount: 3,
          ownerAvatarUrl:
            'https://avatars2.githubusercontent.com/u/4060187?v=4',
        },
        cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
      },
      {
        node: {
          id: 'async-library.react-async',
          fullName: 'async-library/react-async',
          description: 'Flexible promise-based React data loader',
          language: 'JavaScript',
          forksCount: 69,
          stargazersCount: 1760,
          ratingAverage: 72,
          reviewCount: 3,
          ownerAvatarUrl:
            'https://avatars1.githubusercontent.com/u/54310907?v=4',
        },
        cursor: 'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
      },
    ],
  };

  it('renders repository information correctly', () => {
    render(<RepositoryListContainer repositories={repositories} />);
    const repositoryItems = screen.getAllByTestId('repositoryItem');
    expect(repositoryItems).toHaveLength(2);

    repositories.edges.forEach((edge, index) => {
      const item = repositoryItems[index];
      expect(within(item).getByText(edge.node.fullName)).toBeDefined();
      expect(within(item).getByText(edge.node.description)).toBeDefined();
      expect(within(item).getByText(edge.node.language)).toBeDefined();
      expect(
        within(item).getByText(
          formatNumber(edge.node.stargazersCount).toString(),
        ),
      ).toBeDefined();
      expect(
        within(item).getByText(formatNumber(edge.node.forksCount).toString()),
      ).toBeDefined();
      expect(
        within(item).getByText(
          formatNumber(edge.node.ratingAverage).toString(),
        ),
      ).toBeDefined();
      expect(
        within(item).getByText(formatNumber(edge.node.reviewCount).toString()),
      ).toBeDefined();
    });
  });
});
