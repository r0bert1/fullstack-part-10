import { useMutation } from '@apollo/client';

import { CREATE_REVIEW } from '../graphql/mutations';

const useReview = () => {
  const [createReview, result] = useMutation(CREATE_REVIEW);

  const sendReview = async ({ ownerName, rating, repositoryName, text }) => {
    const { data } = await createReview({
      variables: {
        review: { ownerName, rating: Number(rating), repositoryName, text },
      },
    });
    return data.createReview;
  };

  return [sendReview, result];
};

export default useReview;
