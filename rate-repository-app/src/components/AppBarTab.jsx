import { StyleSheet, Pressable } from 'react-native';

import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: 15
  },
});


const AppBarTab = ({ title }) => {
  return (
    <Pressable onPress={() => console.log('Pressed!')} style={styles.container}>
      <Text fontSize="subheading" fontWeight="bold" color="secondary">
        {title}
      </Text>
    </Pressable>
  );
};

export default AppBarTab;