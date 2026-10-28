import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';

export const useSearchRoute = () => {
  const rootNavigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleNavigateToDetails = (movieId: number) => {
    rootNavigation.navigate('MovieDetails', {movieId});
  };

  return {
    handleNavigateToDetails,
  };
};
