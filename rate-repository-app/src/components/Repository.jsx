import { View, StyleSheet, Pressable, Text } from 'react-native';
import { useParams } from 'react-router-native';
import * as Linking from 'expo-linking';

import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import useRepository from '../hooks/useRepository';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.secondary,
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
});

const Repository = () => {
  let { id } = useParams();
  const { repository } = useRepository(id);

  if (!repository) return null;

  return (
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
};

export default Repository;
