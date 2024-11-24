import { View, Text, Image, ScrollView, FlatList } from "react-native";
import React from "react";

import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const Footer = ({ forecasts }: { forecasts: any[] }) => {
  const topThreeForecasts = forecasts.slice(0, 3);
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        marginTop: "12%",
      }}
    >
      <View
        style={{
          width: "100%",
          height: "80%",
          backgroundColor: "#242424",
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "10%",
            height: 3,
            backgroundColor: "#fff",
            marginTop: 12,
            borderRadius: 100,
          }}
        ></View>
        <View
          style={{
            width: "100%",
            height: "40%",
            paddingHorizontal: 20,
            paddingVertical: 10,
            overflow: "hidden",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "600", color: "#fff" }}>
            Hourly Forecast
          </Text>
          <View
            style={{
              width: "100%",
              height: "80%",
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
            }}
          >
            {topThreeForecasts.map((hour, index) => (
              <View
                key={index}
                style={{
                  width: "30%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Image
                  source={{ uri: `https:${hour.condition.icon}` }}
                  style={{ width: 40 }}
                />
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <AntDesign
                    name="cloud"
                    size={34}
                    color="white"
                    style={{ marginBottom: 10 }}
                  />
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "500",
                      color: "#fff",
                    }}
                  >
                    {new Date(hour.time_epoch * 1000).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "600",
                      color: "#fff",
                    }}
                  >
                    {hour.temp_c}&deg;C
                  </Text>
                </View>
              </View>
            ))}
            ;
          </View>
        </View>
        <View
          style={{
            width: "100%",
            height: "40%",
            paddingHorizontal: 20,
            paddingVertical: 10,
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              color: "#fff",
            }}
          >
            Tomorrow Forecast
          </Text>
          {forecasts
            .filter((hour) => hour.is_day === 1)
            .splice(0, 1)
            .map((hour, index) => (
              <View
                key={index}
                style={{
                  width: "90%",
                  height: 80,
                  backgroundColor: "rgba(0,0,0,0.3)",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 15,
                  margin: "auto",
                  borderWidth: 1,
                  borderColor: "rgba(255,255,255,0.4)",
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                }}
              >
                <Entypo
                  name="cloud"
                  size={30}
                  color="#fff"
                  style={{ marginLeft: 5 }}
                />
                <View
                  style={{
                    width: "40%",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    marginLeft: 10,
                  }}
                >
                  <Text
                    style={{ fontSize: 20, fontWeight: "500", color: "#fff" }}
                  >
                    Tomorrow
                  </Text>
                  <Text
                    style={{ fontSize: 13, fontWeight: "500", color: "#fff" }}
                  >
                    {hour.condition.text}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AntDesign name="arrowup" size={18} color="white" />
                  <Text
                    style={{ color: "#fff", fontWeight: "500", fontSize: 17 }}
                  >
                    {hour.heatindex_c}&deg;
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
                  <Text
                    style={{ color: "#fff", fontWeight: "500", fontSize: 17 }}
                  >
                    {hour.dewpoint_c}&deg;
                  </Text>
                </View>
              </View>
            ))}
        </View>
      </View>
    </View>
  );
};

export default Footer;
