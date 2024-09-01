import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import HomeLayout from "../components/layouts/HomeLayout";
import { loginAsync,clearLog } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {useToast} from 'react-native-toast-notifications'
import Loader from "../components/Loader";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const {error, errorMessage,loading, isAuthenticated} = useSelector(state=>state.auth)
  const toast = useToast()
  const handleSubmit = () => {
    dispatch(loginAsync({email, password}))
    console.log('login dispatched'); 
  };
  useEffect(()=>{
     if(error){
      toast.show(errorMessage, {
        type:'danger',
        placement:'bottom'
      })
        dispatch(clearLog())
     }

  }, [error])

  useEffect(()=>{
    if(isAuthenticated){
      toast.show('Logged in', {
        type:'success',
        placement:'bottom'
      })
      setTimeout(()=>{
        navigation.navigate('Home')
      }, 2000)
    }

  }, [isAuthenticated])
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="green" />
      
        <View style={styles.loginFields}>
          <Image
            source={require("../assets/funaab.png")}
            style={{
              width: 100,
              height: 100,
              alignSelf: "center",
              marginTop: 20,
            }}
          />
          <Text
            style={{
              textAlign: "center",
              fontSize: 22,
              marginBottom: 25,
              marginTop: 10,
              color: "green",
              fontWeight: "bold",
            }}
          >
            Login
          </Text>
          <View style={styles.inputContainer}>
          <FontAwesome name="user-circle-o" size={20} color="green" style={{position:'absolute', top:15, left:10, zIndex:10}} />
            <TextInput style={styles.input} placeholder="Email" onChangeText={(text)=>setEmail(text)} cursorColor='black' />
          </View>
          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 10,
                marginTop: 20,
                zIndex: 1,
              }}
              onPress={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FontAwesome name="eye-slash" size={24} color="black" />
              ) : (
                <FontAwesome name="eye" size={24} color="black" />
              )}
            </TouchableOpacity>
            <FontAwesome name="lock" size={24} color="green" style={{position:'absolute', top:15, left:10, zIndex:10}} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={(text)=>setPassword(text)}
              cursorColor='black'
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 14,
            }}
          >
           
           
          </View>
          <View>
            <Button
              text="Sign in"
              handlePress={handleSubmit}
              bg="green"
              textColor="white"
            />
          </View>
          <View style={{marginBottom:10}}>
              <TouchableOpacity
                onPress={() => navigation.navigate("ForgetPassword")}
              >
                <Text style={{ textDecorationStyle: "solid", textAlign:'center', color:'green' }}>
                  Forgot Password
                </Text>
              </TouchableOpacity>
            </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text>No account yet? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={{ color: "green" }}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    flex: 1,
    backgroundColor: "white",
  },
  loginFields: {},
  input: {
    backgroundColor: "ghostwhite",
    paddingVertical: 14,
    borderRadius: 30,
    paddingHorizontal:35
  },
  inputContainer: {
    marginBottom: 15,
    position:'relative'
  },
});
