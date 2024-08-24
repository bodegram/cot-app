import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { api } from '../utils/api'
import { useSelector } from 'react-redux'
import {useToast} from 'react-native-toast-notifications'


export default function UpdatePassword() {
  const { data: accessToken } = useSelector(state => state.auth)
  const [profileData, setProfileData] = useState(null)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [cpassword, setCpassword] = useState('')
  const toast = useToast()




  const handleSubmit = async () => {
    if (oldPassword === '' || newPassword === '' || cpassword === '') {
      toast.show('Field is blank', {
        type:'danger',
        placement:'bottom'
      })

    }
    else {
      if (newPassword !== cpassword) {
        toast.show('Password does not match', {
          type:'danger',
          placement:'bottom'
        })
      }
      else {
        try {
       
          api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
          const { data } = await api.post('/user/change-password', {oldPassword, newPassword})
          toast.show(data.message, {
            type:'success',
            placement:'bottom'
          })

        }
        catch (error) {
          toast.show(error.response.data.message, {
            type:'danger',
            placement:'bottom'
          })

        }
      }
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginBottom: 10, marginTop: 10 }}>
        <Text>Old Password</Text>
        <TextInput secureTextEntry cursorColor='black' defaultValue={oldPassword} onChangeText={(text) => setOldPassword(text)} style={styles.input} />
      </View>
      <View style={{ marginBottom: 10 }}>
        <Text>New Password</Text>
        <TextInput secureTextEntry cursorColor='black' defaultValue={newPassword} onChangeText={(text) => setNewPassword(text)} style={styles.input} />
      </View>
      <View style={{ marginBottom: 10 }}>
        <Text>Confirm Password</Text>
        <TextInput secureTextEntry cursorColor='black' defaultValue={cpassword} onChangeText={(text) => setCpassword(text)} style={styles.input} />
      </View>
      <View style={{ marginBottom: 10 }}>
        <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
          <Text style={{ textAlign: 'center', color: 'white' }}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10
  },
  input: {
    marginTop: 1,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
    padding: 14
  },
  btn: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'green',
    padding: 14,
    backgroundColor: 'green'
  }
})