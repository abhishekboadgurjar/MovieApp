import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import axios from "axios";

const OMDB_API_KEY = "b3978b6a";

const DetailsScreen = ({ route }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${movieId}&plot=full`
      );
      setMovie(response.data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {movie.Poster !== "N/A" && (
        <Image source={{ uri: movie.Poster }} style={styles.poster} />
      )}
      <Text style={styles.title}>
        {movie.Title} ({movie.Year})
      </Text>
      <Text style={styles.info}>
        <Text style={styles.bold}>Genre:</Text> {movie.Genre}
      </Text>
      <Text style={styles.info}>
        <Text style={styles.bold}>Director:</Text> {movie.Director}
      </Text>
      <Text style={styles.info}>
        <Text style={styles.bold}>IMDB Rating:</Text> ⭐ {movie.imdbRating}
      </Text>
      <Text style={styles.plot}>{movie.Plot}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  poster: {
    width: "100%",
    height: 400,
    resizeMode: "contain",
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
  bold: {
    fontWeight: "bold",
  },
  plot: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 22,
    color: "#444",
  },
});

export default DetailsScreen;
