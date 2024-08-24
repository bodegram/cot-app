import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../screens/Dashboard";
import Room from "../screens/Room";
import Account from "../screens/Account";
import UpdateProfile from "../screens/UpdateProfile";
import UpdatePassword from "../screens/UpdatePassword";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown: false}} />
      <Stack.Screen name="Room" component={Room}/>
      <Stack.Screen name="Account" component={Account}/>
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} options={{headerTitle:'Update Profile'}}/>
      <Stack.Screen name="UpdatePassword" component={UpdatePassword} options={{headerTitle:'Update Password'}}/>



    </Stack.Navigator>
  );
}

export default AppNavigator;
