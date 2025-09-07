import { FlatList } from 'react-native';

import { ReviewItem } from './Repository';
import { ItemSeparator } from './RepositoryList';
import useMe from '../hooks/useMe';

const MyReviews = () => {
  const { me } = useMe(true);

  if (!me) {
    return null;
  }

  return (
    <FlatList
      data={me.reviews.edges.map((edge) => edge.node)}
      renderItem={({ item }) => <ReviewItem review={item} myReviews />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;
