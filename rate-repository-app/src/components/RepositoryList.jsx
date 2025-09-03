import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const SORT_OPTIONS = {
  LATEST: { orderBy: 'CREATED_AT', orderDirection: 'DESC' },
  HIGHEST: { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' },
  LOWEST: { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' },
};

const ItemSorter = (selectedOrder, setSelectedOrder) => (
  <Picker
    selectedValue={selectedOrder}
    onValueChange={(itemValue) => setSelectedOrder(itemValue)}
  >
    <Picker.Item label="Latest repositories" value="LATEST" />
    <Picker.Item label="Highest rated repositories" value="HIGHEST" />
    <Picker.Item label="Lowest rated repositories" value="LOWEST" />
  </Picker>
);

export const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  selectedOrder,
  setSelectedOrder,
}) => {
  let navigate = useNavigate();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={ItemSorter(selectedOrder, setSelectedOrder)}
      renderItem={({ item }) => (
        <Pressable
          key={item.id}
          onPress={() => navigate(`/repository/${item.id}`)}
        >
          <RepositoryItem repository={item} />
        </Pressable>
      )}
    />
  );
};

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState('LATEST');

  const { repositories } = useRepositories(SORT_OPTIONS[selectedOrder]);

  return (
    <RepositoryListContainer
      repositories={repositories}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
    />
  );
};

export default RepositoryList;
