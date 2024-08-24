import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";

export default function Time() {
  const [time, setTime] = useState("");
  const hour = new Date().getHours();

  useEffect(() => {
    if (hour >= 12 && hour < 16) {
      setTime("Good Afternoon!");
    } else if (hour >= 16 && hour <= 24) {
      setTime("Good Evening!");
    } else {
      setTime("Good Morning!");
    }
  });
  return (
    <View style={{paddingHorizontal:18}}>
      <Text style={{fontWeight:'bold', fontSize:23, color:'green'}}>{time}</Text>
    </View>
  );
}
