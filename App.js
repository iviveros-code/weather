import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import Formulario from "./src/components/Formulario";
import Clima from "./src/components/Clima";

export default function App() {
  const [busqueda, setBusqueda] = useState({
    ciudad: "",
    pais: "",
  });

  const { ciudad, pais } = busqueda;
  const [consultar, setConsultar] = useState(false);
  const [resultado, setResultado] = useState({});
  const [bgColor, setBgColor] = useState("#0984e3");

  const bgColorApp = {
    backgroundColor: bgColor,
  };

  useEffect(() => {
    const consultarClima = async () => {
      if (consultar) {
        console.log("consultando Api");
        const appId = "829a804b37692d616f79ba7fd6b96a82";
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
        console.log(url);
        //con fetch se usa doble await
        try {
          const respuesta = await fetch(url);
          const resultado = await respuesta.json();
          setResultado(resultado);
          setConsultar(false);
          //Modifica los colores según Temperatura
          const kelvin = 273.15;
          const { main } = resultado;
          const actual = main.temp - kelvin;

          if (actual < 10) {
            setBgColor("#636e72");
          } else if (actual >= 10 && actual < 25) {
            setBgColor("#0984e3");
          } else {
            setBgColor("#d63031");
          }
        } catch (error) {
          mostrarAlerta();
        }
      }
    };
    consultarClima();
  }, [consultar]);

  const mostrarAlerta = () => {
    Alert.alert("Alerta", "No hay resultados, intenta con otros datos", [
      {
        text: "OK!!",
      },
    ]);
  };

  const ocultarTeclado = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={ocultarTeclado}>
      <View style={[styles.app, bgColorApp]}>
        <View style={styles.contenido}>
          <Clima resultado={resultado} />
          <Formulario
            busqueda={busqueda}
            setBusqueda={setBusqueda}
            setConsultar={setConsultar}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,

    justifyContent: "center",
  },
  contenido: {
    marginHorizontal: "2.5%",
  },
});
