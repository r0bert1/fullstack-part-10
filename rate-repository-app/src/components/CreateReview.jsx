import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router';

import Text from './Text';
import theme from '../theme';
import useReview from '../hooks/useReview';

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
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .required('Rating is required')
    .min(0, 'Rating must be at least 0')
    .max(100, 'Rating must be at most 100'),
  text: yup.string().optional(),
});

export const CreateReview = () => {
  const [sendReview] = useReview();
  let navigate = useNavigate();

  const onSubmit = async (values) => {
    const { repositoryId } = await sendReview(values);
    navigate(`/repository/${repositoryId}`);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Repository owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
        style={[
          styles.item,
          styles.input,
          formik.errors.ownerName && styles.error,
        ]}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={styles.error}>{formik.errors.ownerName}</Text>
      )}
      <TextInput
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
        style={[
          styles.item,
          styles.input,
          formik.errors.repositoryName && styles.error,
        ]}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={styles.error}>{formik.errors.repositoryName}</Text>
      )}
      <TextInput
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        style={[
          styles.item,
          styles.input,
          formik.errors.rating && styles.error,
        ]}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={styles.error}>{formik.errors.rating}</Text>
      )}
      <TextInput
        placeholder="Review"
        value={formik.values.text}
        onChangeText={formik.handleChange('text')}
        style={[styles.item, styles.input]}
      />
      <Pressable
        onPress={formik.handleSubmit}
        style={[styles.item, styles.button]}
      >
        <Text fontWeight="bold" style={styles.buttonText}>
          Create review
        </Text>
      </Pressable>
    </View>
  );
};

export default CreateReview;
