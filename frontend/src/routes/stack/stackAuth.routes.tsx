import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import Login from "../../pages/login";
import { UserOption } from "../../pages/user-option";
import { UserRegistration } from "../../pages/user-registration";
import { isAuthenticated } from "../../utils/isAuthenticated";
import { TabNavigator } from "../tab.routes";

const Stack = createStackNavigator();

const AuthStackNavigator = () => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const auth = await isAuthenticated();
      setIsAuth(auth);
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuth ? (
        <Stack.Screen name="App" component={TabNavigator} />
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="UserOption" component={UserOption} />
          <Stack.Screen name="UserRegistration" component={UserRegistration} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
