import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {RootStackParamList, MainTabParamList} from './types';

export const useHomeRoute = () => {
  const rootNavigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const tabNavigation =
    useNavigation<BottomTabNavigationProp<MainTabParamList>>();

  const handleNavigateToDetails = (movieId: number) => {
    rootNavigation.navigate('MovieDetails', {movieId});
  };

  const handleNavigateToSearch = () => {
    tabNavigation.navigate('Search');
  };

  return {
    handleNavigateToDetails,
    handleNavigateToSearch,
  };
};
