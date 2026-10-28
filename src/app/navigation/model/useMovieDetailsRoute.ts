import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';

export const useMovieDetailsRoute = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'MovieDetails'>>();

  const movieId = route.params.movieId;

  const handleGoBack = () => {
    navigation.goBack();
  };

  return {
    movieId,
    handleGoBack,
  };
};
