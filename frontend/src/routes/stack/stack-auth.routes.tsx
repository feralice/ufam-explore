import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useSelector } from 'react-redux';
import Login from '../../pages/auth/login';
import { ResetPasswordEmailScreen } from '../../pages/auth/reset-email';
import { ResetPasswordScreen } from '../../pages/auth/reset-password';
import { UserOption } from '../../pages/auth/user-option';
import ExternalSignUpScreen from '../../pages/auth/user-registration/external-sign-up';
import InternalSignUpScreen from '../../pages/auth/user-registration/internal-sign-up';
import { IStore } from '../../store';
import { TabNavigator } from '../tab.routes';

const Stack = createStackNavigator();

const AuthStackNavigator: React.FC = () => {
  const isAuth = useSelector(
    (state: IStore) => state.user.user.isAuthenticated
  );

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuth ? (
        <Stack.Screen name="App" component={TabNavigator} />
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="UserOption" component={UserOption} />
          <Stack.Screen
            name="InternalSignUp"
            component={InternalSignUpScreen}
          />
          <Stack.Screen
            name="ExternalSignUp"
            component={ExternalSignUpScreen}
          />
          <Stack.Screen
            name="ResetEmail"
            component={ResetPasswordEmailScreen}
          />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
