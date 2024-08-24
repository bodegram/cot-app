import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { api } from '../utils/api'
import Loader from '../components/Loader'

export default function Account() {
  const { data: accessToken } = useSelector(state => state.auth)
  const [profileData, setProfileData] = useState(null)

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
    <Fragment>
      {profileData === null && <Loader />}
      <SafeAreaView style={styles.container}>
        <View style={{marginBottom:20, marginTop:10}}>
          <Text style={{fontWeight:'bold'}}>Hi {profileData?.firstname}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
          <Text>First name</Text>
          <Text>{profileData?.firstname}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
          <Text>Last name</Text>
          <Text>{profileData?.lastname}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
          <Text>Email address</Text>
          <Text>{profileData?.email}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
          <Text>Account</Text>
          <Text>{profileData?.account}</Text>
        </View>
      </SafeAreaView>
    </Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: 'white'
  }
})