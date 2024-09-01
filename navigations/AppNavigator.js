import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Room from "../screens/Room";
import Account from "../screens/Account";
import UpdateProfile from "../screens/UpdateProfile";
import UpdatePassword from "../screens/UpdatePassword";
import Home from '../screens/Home'
import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Feather } from "@expo/vector-icons";
import Search from '../screens/Search'
import { useNavigation } from "@react-navigation/native";
import Notifications from "../screens/Notifications";
import Profile from "../screens/Profile";
import {api} from '../utils/api'
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";


const Stack = createNativeStackNavigator();


function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{
        headerLeft: () =>{
          const navigation = useNavigation()
          const { data: accessToken } = useSelector(state => state.auth)
          const [profileData, setProfileData] = useState(null)
          const dispatch = useDispatch()
          
          const fetchData = async () => {
            try {
              api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
              const { data } = await api.get('/user/profile')
              setProfileData(data.data)
            }
            catch (error) {
              console.log(error.response.data.message)
            }
          }
        
          useEffect(() => {
            fetchData()
          }, [])

          return(
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TouchableOpacity onPress={()=>navigation.navigate('Profile')}>
              <FontAwesome name="user" size={24} color="white" />
            </TouchableOpacity>
            <Text style={{ fontSize: 20, color: 'white' }}>Welcome {profileData?.firstname}</Text>
          </View>
        )},
        headerTitle: '',
        headerStyle: {
          backgroundColor: 'green',


        },
        headerRight: ({ }) => {
          const navigation = useNavigation()
          return (
            <View style={{ flexDirection: 'row', gap: 7 }}>
              <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                <Feather name="search" size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
                <Feather name="bell" size={20} color="white" />
              </TouchableOpacity>
            </View>
          )
        }
      }} />
      <Stack.Screen name="Room" component={Room} options={{
        headerStyle: {
          backgroundColor: 'green'

        },
        headerTintColor: 'white',
        headerTitle: 'Classroom'

      }} />
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} options={{ headerTitle: 'Update Profile' }} />
      <Stack.Screen name="UpdatePassword" component={UpdatePassword} options={{ headerTitle: 'Update Password' }} />



    </Stack.Navigator>
  );
}

export default AppNavigator;
