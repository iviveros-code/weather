import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

const Clima = ({ resultado }) => {
  const { name, main } = resultado;

  if (!name) return null;

  //grados kelvin

  const kelvin = 273.15;
  return (
    <View style={styles.clima}>
      <Text style={[styles.text, styles.actual]}>
        {parseInt(main.temp - kelvin)}
        <Text style={styles.temperatura}>&#x2103;</Text>
        <Image
          style={{ width: 66, height: 58 }}
          source={{
            uri: `http://openweathermap.org/img/w/${resultado.weather[0].icon}.png`,
          }}
        />
      </Text>
      <View style={styles.temperaturas}>
        <Text style={styles.text}>
          Min {"   "}
          <Text style={styles.temperatura}>
            {parseInt(main.temp_min - kelvin)} &#x2103;
          </Text>
        </Text>
        <Text style={styles.text}>
          Max {"   "}
          <Text style={styles.temperatura}>
            {parseInt(main.temp_max - kelvin)} &#x2103;
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Clima;

const styles = StyleSheet.create({
  clima: {
    marginBottom: 20,
  },
  text: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    marginRight: 20,
  },
  actual: {
    fontSize: 80,
    marginRight: 0,
    fontWeight: "bold",
  },
  temperatura: {
    fontSize: 24,
    fontWeight: "bold",
  },
  temperaturas: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
