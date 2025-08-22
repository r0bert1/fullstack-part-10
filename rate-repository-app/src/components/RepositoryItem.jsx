import { View, Text } from 'react-native';

const RepositoryItem = ({ repository }) => {
  const repositoryData = {
    "Full name": repository.fullName,
    "Description": repository.description,
    "Language": repository.language,
    "Stars": repository.stargazersCount,
    "Forks": repository.forksCount,
    "Reviews": repository.reviewCount,
    "Rating": repository.ratingAverage,
  }

  return (
    <View key={repository.id}>
      {Object.entries(repositoryData).map(([key, value]) => (
        <Text key={key}>
          {key}: {value}
        </Text>
      ))}
    </View>
  );
};

export default RepositoryItem;