import { View, Image, StyleSheet } from 'react-native';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  flexContainerRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  flexContainer: {
    display: 'flex',
    gap: 10,
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  data: {
    marginLeft: 20,
    marginBottom: 5,
    flex: 1,
  },
  stats: {
    marginTop: 15,
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  badge: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.secondary,
    alignSelf: 'flex-start',
    padding: 4,
    borderRadius: 4,
  }
});

const RepositoryItem = ({ repository }) => {
  const repositoryData = {
    "Stars": repository.stargazersCount,
    "Forks": repository.forksCount,
    "Reviews": repository.reviewCount,
    "Rating": repository.ratingAverage,
  }

  const formatNumber = number => {
    return number >= 1000 ? (number / 1000).toFixed(1) + 'k' : number;
  }

  return (
    <View key={repository.id} style={styles.container}>
      <View style={styles.flexContainerRow}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: repository.ownerAvatarUrl,
          }}
        />
        <View style={[ styles.flexContainer, styles.data ]}>
          <Text fontWeight="bold">{repository.fullName}</Text>
          <Text color="textSecondary">{repository.description}</Text>
          <Text style={styles.badge}>{repository.language}</Text>
        </View>
      </View>
      <View style={[ styles.flexContainerRow, styles.stats ]}>
        {Object.entries(repositoryData).map(([key, value]) => (
          <View style={[ styles.flexContainer, styles.stat ]} key={key}>
            <Text fontWeight="bold">
              {formatNumber(value)}
            </Text>
            <Text color="textSecondary">
              {key}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default RepositoryItem;