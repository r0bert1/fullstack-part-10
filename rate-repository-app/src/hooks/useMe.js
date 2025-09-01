import { useQuery } from '@apollo/client';

import { GET_ME } from '../graphql/queries';

const useMe = () => {
  const { data, loading } = useQuery(GET_ME, {
    fetchPolicy: 'cache-and-network',
  });

  return { me: loading ? null : data.me };
};

export default useMe;
