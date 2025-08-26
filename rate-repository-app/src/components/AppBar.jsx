import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';

import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#24292e',
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <AppBarTab title="Repositories" />
        </Link>
        <Link to="/signin">
          <AppBarTab title="Sign in" />
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
