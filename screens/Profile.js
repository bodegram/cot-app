import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import React, {useEffect, useState} from "react";
import {
  FontAwesome,
  Entypo,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import ProfileItem from "../components/ProfileItem";
import { logout } from "../redux/slices/authSlice";
import {useDispatch, useSelector} from 'react-redux'
import { api } from '../utils/api'


export default function Profile({navigation}) {
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
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.profile}>
          <View style={styles.profileImage}>
            <FontAwesome name="user-circle" size={24} color="black" />
          </View>
          <View>
            <Text style={styles.username}>Hi {profileData?.firstname}</Text>
          </View>
        </View>
        <View style={styles.profileMenu}> 
         
          <ProfileItem
            name="Account"
            icon={<FontAwesome name="user-circle" size={20} color="green" />}
            action={()=>navigation.navigate('Account')}
          />
           <ProfileItem
            name="Update Profile"
            icon={<Entypo name="pencil" size={20} color="green" />}
            action={()=>navigation.navigate('UpdateProfile')}

          />
           <ProfileItem
            name="Update Password"
            icon={<MaterialCommunityIcons name="onepassword" size={20} color="green" />}
            action={()=>navigation.navigate('UpdatePassword')}
          />
       
       
  
           <ProfileItem
            name="Sign out"
            icon={
              <Entypo name="log-out" size={20} color="green" />
            
            }
            action={()=>dispatch(logout())}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  username: {
    color:'green',
    paddingTop:5
  },
  profile: {
    paddingHorizontal:10,
    paddingVertical:25,
    flexDirection:'row',
    gap:10,
    marginBottom:10,
    backgroundColor:'white'
  },
  profileMenu: {
    backgroundColor:'white',
    paddingVertical:20
  },
});
