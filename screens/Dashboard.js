import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import Profile from "./Profile";
import Time from "../utils/Time";
import { Feather, Ionicons, AntDesign } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Search from "./Search";
import Notifications from "./Notifications";

const Tab = createBottomTabNavigator();

function Dashboard() {
  const navigation = useNavigation()
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "green",
      
        tabBarShowLabel:false
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: "",
          headerLeft: () => <Time />,
          tabBarIcon: ({ focused }) => (
            <Feather
              name="home"
              size={24}
              color={focused ? "green" : "black"}
            />
          ),
          headerRight: () => {
            return (
              <View style={{ paddingHorizontal: 18, flexDirection: "row", gap:10 }}>
                <TouchableOpacity onPress={()=>navigation.navigate('Notifications')}>
                  <Ionicons
                    name="notifications-circle"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                <AntDesign name="customerservice" size={22} color="black" />
                </TouchableOpacity>
              </View>
            );
          },
        
        
        }}
      />
       <Tab.Screen name="Search" component={Search} options={{
         tabBarIcon: ({ focused }) => (
          <Feather
            name="search"
            size={24}
            color={focused ? "green" : "black"}
          />
        ),
        headerShown:false
       }}/>
      <Tab.Screen name="Notification" component={Notifications} options={{
         tabBarIcon: ({ focused }) => (
          <Feather
            name="bell"
            size={24}
            color={focused ? "green" : "black"}
          />
        ),
       }}/>
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name="user"
              size={24}
              color={focused ? "green" : "black"}
            />
          ),
          headerRight: () => {
            return (
              <View style={{ paddingHorizontal: 18 }}>
                <TouchableOpacity>
                  <Ionicons name="settings-sharp" size={24} color="black" />
                </TouchableOpacity>
              </View>
            );
          },
        
        }}
      />
     

    </Tab.Navigator>
  );
}

export default Dashboard;
