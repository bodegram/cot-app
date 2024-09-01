import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity
} from "react-native";
import React, { useState } from "react";
import Button from "../components/Button";
import { FontAwesome } from '@expo/vector-icons';
import { useToast } from 'react-native-toast-notifications'
import { api } from "../utils/api";
import { Picker } from '@react-native-picker/picker';




export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const [showCpassword, setShowCpassword] = useState(false)
  const [account, setAccount] = useState('')
  const toast = useToast()

  const handleSubmit = async () => {
    if (email === '' || password === '' || cpassword === '') {
      toast.show('Field is blank', {
        type: 'danger',
        placement: 'bottom'
      })
    }
    else {
      if (cpassword !== password) {
        toast.show('Password does not match', {
          type: 'danger',
          placement: 'bottom'
        })
      }
      else {
        try {
          const { data } = await api.post('/user/register', { email, password })
          toast.show('Account successfully created', {
            type: 'success',
            placement: 'bottom'
          })
          navigation.navigate('Login')

        }
        catch (error) {
          console.log(error);

          toast.show(error.response.data.message, {
            type: 'danger',
            placement: 'bottom'
          })
        }
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginBottom: 14, marginTop: 25 }}>
          <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
            Email & Password
          </Text>
          <Text style={{ fontSize: 15 }}>
            Create a profile with a few details. Your password must have at 8
            characters including letters and a number.
          </Text>
        </View>
        <View>
          <View style={styles.inputContainer}>
            <Text style={{ marginBottom: 4 }}>Email address</Text>
            <TextInput style={styles.input} placeholder="youremail@here.com" onChangeText={(text) => setEmail(text)} defaultValue={email} />
          </View>
          <Picker
          style={{
            backgroundColor: "ghostwhite",
            padding: 14,
            borderRadius: 5,
          }}
            selectedValue={setAccount}
            onValueChange={(itemValue, itemIndex) =>
              setAccount(itemValue)
            }>
              <Picker.Item label="Select Account" value="" enabled={false} />
            <Picker.Item label="Student" value="Student" />
            <Picker.Item label="Admin" value="Admin" />
          </Picker>
          <View style={styles.inputContainer}>
            <Text style={{ marginBottom: 4 }}>Password</Text>
            <TouchableOpacity style={{ position: 'absolute', right: 10, marginTop: 36, zIndex: 1 }} onPress={() => setShowPassword(!showPassword)}>
              {!showPassword ? <FontAwesome name="eye-slash" size={24} color="black" /> : <FontAwesome name="eye" size={24} color="black" />}
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="********"
              secureTextEntry={showPassword ? true : false}
              defaultValue={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={{ marginBottom: 4 }}>Confirm Password</Text>
            <TouchableOpacity style={{ position: 'absolute', right: 10, marginTop: 36, zIndex: 1 }} onPress={() => setShowCpassword(!showCpassword)}>
              {!showCpassword ? <FontAwesome name="eye-slash" size={24} color="black" /> : <FontAwesome name="eye" size={24} color="black" />}
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="********"
              secureTextEntry={showCpassword ? true : false}
              defaultValue={cpassword}
              onChangeText={(text) => setCpassword(text)}
            />
          </View>
          <View>
            <Text style={{ textAlign: 'center', marginVertical: 10, fontSize: 16 }}>By tapping "Next", you agree to our <Text style={{ color: 'green' }}>Terms & Conditions and Privacy.</Text> </Text>
          </View>
          <View>
            <Button
              text="Next"
              handlePress={handleSubmit}
              bg="green"
              textColor="white"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    flex: 1,
    backgroundColor: "white",
  },
  input: {
    backgroundColor: "ghostwhite",
    padding: 14,
    borderRadius: 5,
  },
  inputContainer: {
    marginBottom: 15,
  },
});
