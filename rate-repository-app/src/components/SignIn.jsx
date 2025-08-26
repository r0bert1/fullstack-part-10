import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: 15,
    alignItems: 'stretch',
    gap: 15,
  },
  item: {
    borderRadius: 3,
    height: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    paddingLeft: 10,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
  },
  buttonText: {
    color: theme.colors.secondary,
  },
});

const initialValues = {
  username: '',
  password: '',
};

const onSubmit = (values) => {
  console.log(values);
};

const SignIn = () => {
  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        style={[styles.item, styles.input]}
      />
      <TextInput
        secureTextEntry
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        style={[styles.item, styles.input]}
      />
      <Pressable
        onPress={formik.handleSubmit}
        style={[styles.item, styles.button]}
      >
        <Text fontWeight="bold" style={styles.buttonText}>
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
