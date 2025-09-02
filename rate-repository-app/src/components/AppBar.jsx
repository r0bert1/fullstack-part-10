import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useApolloClient } from '@apollo/client';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import { useNavigate } from 'react-router';

import AppBarTab from './AppBarTab';
import useMe from '../hooks/useMe';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#24292e',
  },
});

const AppBar = () => {
  const { me } = useMe();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate('/');
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <AppBarTab title="Repositories" />
        </Link>
        {me ? (
          <Pressable onPress={signOut}>
            <AppBarTab title="Sign out" />
          </Pressable>
        ) : (
          <Link to="/signin">
            <AppBarTab title="Sign in" />
          </Link>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
