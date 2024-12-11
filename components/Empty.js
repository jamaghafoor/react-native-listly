import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { scale } from "react-native-size-matters";

const styles = StyleSheet.create({
  container: {
    marginTop: "50%",
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // top: -50,
  },
  icon: {
    // height: scale(60),
    // width: scale(60),
    borderRadius: scale(50),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: scale(14),
    // top: -50,
  },
});

const Empty = ({ title, textStyle }) => (
  <View style={styles.container}>
    <View style={styles.icon}>
      <Icon name="cloud-drizzle" color={"#9a9a9a"} size={scale(60)} />
    </View>
    <Text
      style={{
        ...textStyle,
        // top: -50,
        color: "grey",
        fontFamily: "Poppins-SemiBold",
        fontSize: 14,
      }}
    >
      {title}
    </Text>
  </View>
);


export default Empty;
