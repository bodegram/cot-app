import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { api } from '../utils/api'
import { useSelector } from 'react-redux'
import { useToast } from 'react-native-toast-notifications'


export default function UpdateProfile() {
  const { data: accessToken } = useSelector(state => state.auth)
  const [firstname, setFirstname] = useState(null)
  const [lastname, setLastname] = useState(null)
  const toast = useToast()







  const fetchData = async () => {
    try {
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
      const { data } = await api.get('/user/profile')
      setFirstname(data.data?.firstname)
      setLastname(data.data?.lastname)


    }
    catch (error) {
      toast.show(error.response.data.message, {
        type: 'danger',
        placement: 'bottom'
      })
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async () => {
    if (firstname === '' || lastname === '') {
      toast.show('Field is blank', {
        type: 'danger',
        placement: 'bottom'
      })
    }
    else {
      try {
        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
        const { data } = await api.put('/user/update-profile', { firstname, lastname })
        toast.show(data.message, {
          type: 'success',
          placement: 'bottom'
        })

      }
      catch (error) {
        toast.show(error.response.data.message, {
          type: 'danger',
          placement: 'bottom'
        })
      }
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginBottom: 10, marginTop: 10 }}>
        <Text>Firstname</Text>
        <TextInput cursorColor='black' defaultValue={firstname} onChangeText={(text) => setFirstname(text)} style={styles.input} />
      </View>
      <View style={{ marginBottom: 10 }}>
        <Text>Lastname</Text>
        <TextInput cursorColor='black' defaultValue={lastname} onChangeText={(text) => setLastname(text)} style={styles.input} />
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