import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router';

import Text from './Text';
import theme from '../theme';
import useSignIn from '../hooks/useSignIn';

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
  error: {
    color: theme.colors.error,
    borderColor: theme.colors.error,
  },
});

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const SignIn = () => {
  const [signIn] = useSignIn();
  let navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      await signIn(values);
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        style={[
          styles.item,
          styles.input,
          formik.errors.username && styles.error,
        ]}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.error}>{formik.errors.username}</Text>
      )}
      <TextInput
        secureTextEntry
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        style={[
          styles.item,
          styles.input,
          formik.errors.password && styles.error,
        ]}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.error}>{formik.errors.password}</Text>
      )}
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
