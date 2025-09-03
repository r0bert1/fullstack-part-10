import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router';

import Text from './Text';
import theme from '../theme';
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: 15,
    alignItems: 'stretch',
    gap: 15,
    backgroundColor: theme.colors.secondary,
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
  passwordConfirmation: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(5, 'Username must be at least 5 characters')
    .max(30, 'Username must be at most 30 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password must be at most 50 characters'),
  passwordConfirmation: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  let navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      await signUp(values);
      await signIn(values);
    } catch (e) {
      console.log(e);
    }

    navigate('/');
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
      <TextInput
        secureTextEntry
        placeholder="Password confirmation"
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange('passwordConfirmation')}
        style={[
          styles.item,
          styles.input,
          formik.errors.passwordConfirmation && styles.error,
        ]}
      />
      {formik.touched.passwordConfirmation &&
        formik.errors.passwordConfirmation && (
          <Text style={styles.error}>{formik.errors.passwordConfirmation}</Text>
        )}
      <Pressable
        onPress={formik.handleSubmit}
        style={[styles.item, styles.button]}
      >
        <Text fontWeight="bold" style={styles.buttonText}>
          Sign up
        </Text>
      </Pressable>
    </View>
  );
};

export default SignUp;
