import { StyleSheet } from 'react-native';

import Text from './Text';

const styles = StyleSheet.create({
  tab: {
    padding: 15
  },
});


const AppBarTab = ({ title }) => {
  return (
    <Text style={styles.tab} fontSize="subheading" fontWeight="bold" color="secondary">
      {title}
    </Text>
  );
};

export default AppBarTab;