import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import ForgetPassword from "../screens/ForgetPassword";
import Intro from "../screens/Intro";
import { useSelector } from "react-redux";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

function AuthNavigator() {
  const { isAppReady } = useSelector((state) => state.app);

  const HeaderRight = () => {
    return (
      <TouchableOpacity>
        <AntDesign name="questioncircle" size={24} color="green" />
      </TouchableOpacity>
    );
  };
  return (
    <Stack.Navigator initialRouteName={isAppReady ? "Login" : "Intro"}>
      <Stack.Screen
        name="Intro"
        component={Intro}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerTitle: "", headerRight: () => <HeaderRight /> }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerTitle: "", headerRight: () => <HeaderRight /> }}
      />
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{ headerTitle: "", headerRight: () => <HeaderRight /> }}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
