import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

export default function Button({ text, handlePress, bg, textColor  }) {
  return (
    <TouchableOpacity
      style={{ backgroundColor: `${bg}`, width: "100%", padding:18, borderRadius:30, borderColor:'gray', marginBottom:15 }}
      onPress={handlePress}
    >
      <Text style={{ textAlign: "center", color:`${textColor}` }}>{text}</Text>
    </TouchableOpacity>
  );
}
