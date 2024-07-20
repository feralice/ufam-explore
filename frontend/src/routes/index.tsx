import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigator from './stack/stack-auth.routes';

export const Routes = () => {
  return (
    <NavigationContainer>
      <AuthStackNavigator />
    </NavigationContainer>
  );
};
