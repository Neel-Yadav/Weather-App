import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface weatherData {
  temp: number;
  heatindex: number;
  dewpoint: number;
  wind_kph: number;
  conditionText: string;
  humidity: number;
  feelslike: number;
}
const WeatherSummary: React.FC<weatherData> = ({
  temp,
  heatindex,
  dewpoint,
  wind_kph,
  conditionText,
  humidity,
  feelslike,
}) => {
  const [time, setTime] = useState("");

  const getLocalTime = () => {
    const currentDate = new Date();

    // Get the month name in short form
    const month = currentDate.toLocaleString("default", { month: "short" });

    // Get the day of the month
    const day = currentDate.getDate();

    // Format the time in HH:mm format
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");

    // Combine into the desired format: "Nov 25, 10:52"
    const formattedTime = `${month} ${day}, ${hours}:${minutes}`;

    setTime(formattedTime);
  };

  useEffect(() => {
    getLocalTime();
    // Update time every minute (optional)
    const timer = setInterval(() => getLocalTime(), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <View
      style={{
        width: "100%",
        paddingHorizontal: 20,
      }}
    >
      {/* App Body Top */}
      <View style={{ width: "100%", flexDirection: "row" }}>
        {/* App Body Left */}
        <View style={{ width: "80%", flexDirection: "column" }}>
          <Text
            style={{
              color: "#fff",
              fontWeight: "600",
              marginTop: 5,
              marginLeft: 5,
            }}
          >
            {`Today ${time}`}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: 120,
                marginLeft: 5,
              }}
            >
              {temp || "10"}
              <Text style={{ fontSize: 30, fontWeight: "600" }}>&deg;C</Text>
            </Text>
          </View>
          <View
            style={{
              width: 140,
              height: 50,
              backgroundColor: "rgba(255,255,255,0.2)",
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.6)",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 15,
              gap: 4,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign name="arrowup" size={18} color="white" />
              <Text style={{ color: "#fff", fontWeight: "500", fontSize: 17 }}>
                {heatindex}&deg;
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign name="arrowdown" size={18} color="white" />
              <Text style={{ color: "#fff", fontWeight: "500", fontSize: 17 }}>
                {dewpoint}&deg;
              </Text>
            </View>
          </View>
        </View>
        {/* App Body Right */}
        <View style={{ width: "20%" }}>
          <MaterialCommunityIcons name="terrain" size={24} color="white" />
          <Text style={{ color: "white", fontWeight: "500" }}>
            {conditionText}
          </Text>
        </View>
      </View>
      {/* App Body Bottom */}
      <View
        style={{
          width: "100%",
          height: 120,
          marginTop: 40,
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.6)",
          backgroundColor: "rgba(0,0,0,0.5)",
          flexDirection: "row",
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 15,
          paddingVertical: 10,
          gap: 10,
        }}
      >
        {/* wind_kph */}
        <View
          style={{
            width: "30%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
          }}
        >
          <FontAwesome5 name="wind" size={30} color="white" />
          <Text style={{ color: "#fff", fontWeight: "500", fontSize: 15 }}>
            {wind_kph} km/h
          </Text>
        </View>
        {/* humidity */}
        <View
          style={{ width: 2, height: "80%", backgroundColor: "#fff" }}
        ></View>
        <View
          style={{
            width: "30%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
          }}
        >
          <Ionicons name="water-sharp" size={30} color="white" />
          <Text style={{ color: "#fff", fontWeight: "500", fontSize: 15 }}>
            {humidity}%
          </Text>
        </View>
        <View
          style={{ width: 2, height: "80%", backgroundColor: "#fff" }}
        ></View>
        {/* feelslike_c */}
        <View
          style={{
            width: "30%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
          }}
        >
          <MaterialCommunityIcons
            name="weather-sunny-alert"
            size={30}
            color="white"
          />
          <Text style={{ color: "#fff", fontWeight: "500", fontSize: 15 }}>
            {feelslike}&deg;
          </Text>
        </View>
      </View>
    </View>
  );
};

export default WeatherSummary;
