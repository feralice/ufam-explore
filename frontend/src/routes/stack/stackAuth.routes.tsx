import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import Login from "../../pages/login";
import { UserOption } from "../../pages/user-option";
import { UserRegistration } from "../../pages/user-registration";
import { isAuthenticated } from "../../utils/isAuthenticated";
import { TabNavigator } from "../tab.routes";

const Stack = createStackNavigator();

// Este componente de navegação de autenticação é uma solução temporária.
// Ele verifica o status de autenticação ao montar o componente e periodicamente,
// mas há uma necessidade de revisão para encontrar uma solução mais eficiente.
const AuthStackNavigator = () => {
  const [authenticated, setIsAuthenticated] = useState(false);

  const checkAuthStatus = async () => {
    const auth = await isAuthenticated();
    setIsAuthenticated(auth);
  };

  useEffect(() => {
    checkAuthStatus();

    const interval = setInterval(() => {
      checkAuthStatus();
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {authenticated ? (
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
