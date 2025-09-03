import { View, StyleSheet, Pressable, FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import * as Linking from 'expo-linking';
import { format } from 'date-fns';

import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import useRepository from '../hooks/useRepository';
import { ItemSeparator } from './RepositoryList';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.secondary,
    marginBottom: 10,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
    height: 50,
    margin: 15,
  },
  buttonText: {
    color: theme.colors.secondary,
  },
  flexContainerRow: {
    display: 'flex',
    flexDirection: 'row',
    padding: 15,
    backgroundColor: theme.colors.secondary,
  },
  flexContainer: {
    display: 'flex',
    gap: 10,
  },
  ratingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  data: {
    marginLeft: 20,
    marginBottom: 5,
    flex: 1,
  },
});

const RepositoryInfo = ({ repository }) => (
  <View style={styles.container}>
    <RepositoryItem repository={repository} />
    <Pressable
      onPress={() => Linking.openURL(repository.url)}
      style={styles.button}
    >
      <Text fontWeight="bold" style={styles.buttonText}>
        Open in GitHub
      </Text>
    </Pressable>
  </View>
);

const ReviewItem = ({ review }) => {
  return (
    <View style={[styles.flexContainerRow]}>
      <View style={styles.ratingContainer}>
        <Text color="primary" fontWeight="bold">
          {review.rating}
        </Text>
      </View>
      <View style={[styles.flexContainer, styles.data]}>
        <Text fontWeight="bold">{review.user.username}</Text>
        <Text color="textSecondary">
          {format(review.createdAt, 'dd.MM.yyyy')}
        </Text>
        <Text style={styles.badge}>{review.text}</Text>
      </View>
    </View>
  );
};

const Repository = () => {
  let { id } = useParams();
  const { repository } = useRepository(id);

  if (!repository) return null;

  return (
    <FlatList
      data={repository.reviews.edges.map((edge) => edge.node)}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default Repository;
