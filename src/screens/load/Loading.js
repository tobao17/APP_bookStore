import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

export default function Loading() {
  return (
    <>
      <View style={styles.fullscreen}>
        <ActivityIndicator size="large" color="#f00" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
