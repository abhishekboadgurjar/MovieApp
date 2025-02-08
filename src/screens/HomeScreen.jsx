import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AllMovies from "../tabs/AllMovies";
import NewMovies from "../tabs/NewMovies";
import TrendingMovie from "../tabs/TrendingMovie";
import PopularMovies from "../tabs/PopularMovies";

const Tab = createMaterialTopTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "#fff" },
        tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
        tabBarIndicatorStyle: { backgroundColor: "#007AFF" },
      }}
    >
      <Tab.Screen name="All" component={AllMovies} />
      <Tab.Screen name="New" component={NewMovies} />
      <Tab.Screen name="Trending" component={TrendingMovie} />
      <Tab.Screen name="Popular" component={PopularMovies} />
    </Tab.Navigator>
  );
};

export default HomeScreen;
