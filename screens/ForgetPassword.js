import { View, Text, SafeAreaView, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import Button from "../components/Button";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const handleSubmit = () => {};
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginBottom: 24, marginTop: 16 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 5 }}>
          Reset your password
        </Text>
        <Text>Please enter your email addess on your account.</Text>
      </View>
      <View>
        <Text style={{ marginBottom: 4 }}>Email address</Text>
        <TextInput style={styles.input} defaultValue={email} onChangeText={(text)=>setEmail(text)} placeholder="youremail@here.com" />
      </View>
      <View style={{position:'absolute', bottom:1, left:18, right:18}}>
        <Button
          text="Done"
          handlePress={handleSubmit}
          bg="green"
          textColor="white"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
    backgroundColor: "white",
  },
  input: {
    backgroundColor: "ghostwhite",
    padding: 14,
    borderRadius: 5,
  },
});
