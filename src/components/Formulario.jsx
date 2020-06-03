import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Picker,
  TouchableWithoutFeedback,
  Animated,
  Alert,
} from "react-native";

const Formulario = ({ busqueda, setBusqueda, setConsultar }) => {
  const { ciudad, pais } = busqueda;
  const [animacionBtn] = useState(new Animated.Value(1));

  const animacionEntrada = () => {
    Animated.spring(animacionBtn, {
      toValue: 0.9,
    }).start();
  };
  const animacionSalida = () => {
    Animated.spring(animacionBtn, {
      toValue: 1,
      friction: 3,
    }).start();
  };

  const estiloAnimacion = {
    transform: [{ scale: animacionBtn }],
  };

  const consultarClima = () => {
    if (pais.trim() === "" || ciudad.trim() === "") {
      Alert.alert("Alerta", "Ambos campos son obligatorios", [
        {
          text: "OK!!",
        },
      ]);
      return;
    }
    setConsultar(true);
  };
  return (
    <View style={styles.formulario}>
      <View>
        <TextInput
          placeholder="Ciudad"
          placeholderTextColor="#fff"
          style={styles.input}
          value={ciudad}
          onChangeText={(ciudad) => setBusqueda({ ...busqueda, ciudad })}
        />
      </View>
      <View>
        <Picker
          itemStyle={{ height: 120, backgroundColor: "#fff" }}
          selectedValue={pais}
          onValueChange={(pais) => setBusqueda({ ...busqueda, pais })}
        >
          <Picker.Item label="--Seleccione un País--" value="" />
          <Picker.Item label="Estados Unidos" value="US" />
          <Picker.Item label="Mexico" value="MX" />
          <Picker.Item label="Argentina" value="AR" />
          <Picker.Item label="Colombia" value="CO" />
          <Picker.Item label="Costa Rica" value="CR" />
          <Picker.Item label="España" value="ES" />
          <Picker.Item label="Peru" value="PE" />
        </Picker>
      </View>
      <TouchableWithoutFeedback
        onPressIn={animacionEntrada}
        onPressOut={animacionSalida}
        onPress={consultarClima}
      >
        <Animated.View style={[styles.btn, estiloAnimacion]}>
          <Text style={styles.texto}>Buscar Clima</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Formulario;

const styles = StyleSheet.create({
  input: {
    padding: 10,
    height: 50,
    backgroundColor: "#74b9ff",
    fontSize: 20,
    textAlign: "center",
  },
  btn: {
    marginTop: 50,
    backgroundColor: "#00cec9",
    padding: 10,
    justifyContent: "center",
  },
  texto: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
});
