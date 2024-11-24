import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useRouter } from "expo-router";

interface navbarData {
  placeName: string;
  country: string;
}
const NavBar: React.FC<navbarData> = ({ placeName, country }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push("/search");
  };

  return (
    <View
      style={{
        width: "100%",
        height: 55,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 25,
      }}
    >
      {/* Nav Left */}
      <View
        style={{
          width: "90%",
          height: "100%",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <FontAwesome6 name="map-location-dot" size={25} color="white" />
        <Text
          style={{
            color: "white",
            fontWeight: "500",
            marginLeft: 10,
            fontSize: 20,
          }}
        >
          {`${placeName} , ${country}`}
        </Text>
        {/* Nav Right */}
      </View>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          handlePress();
        }}
      >
        <FontAwesome5 name="search" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};
export default NavBar;
