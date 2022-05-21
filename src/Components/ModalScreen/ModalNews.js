import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";

const ModalNewsScreen = ({ route }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{
          uri: `https://app.jala.tech/web_view/posts/${route.params.id}`,
        }}
      />
    </SafeAreaView>
  );
};

export default ModalNewsScreen;

const styles = StyleSheet.create({});
