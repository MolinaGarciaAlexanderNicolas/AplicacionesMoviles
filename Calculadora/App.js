import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  var [num1, setNum1] = useState('');
  var [num2, setNum2] = useState('');
  var [resultado, setResultado] = useState('');

  var agregarNumero = function(num) {
    if (!num1 || resultado) {
      setNum1(num1 + num);
      setResultado('');
    } else {
      setNum2(num2 + num);
    }
  };

  var sumar = function() {
    setResultado(parseFloat(num1) + parseFloat(num2));
  };

  var restar = function() {
    setResultado(parseFloat(num1) - parseFloat(num2));
  };

  var multiplicar = function() {
    setResultado(parseFloat(num1) * parseFloat(num2));
  };

  var dividir = function() {
    if (parseFloat(num2) === 0) setResultado('Error');
    else setResultado(parseFloat(num1) / parseFloat(num2));
  };

  var limpiar = function() {
    setNum1('');
    setNum2('');
    setResultado('');
  };

  return (
    <View style={styles.container}>
      <Text>Calculadora simple</Text>

      <Text>Numero 1: {num1}</Text>
      <Text>Numero 2: {num2}</Text>
      <Text>Resultado: {resultado}</Text>

      <View style={styles.fila}>
        <Button title="1" onPress={() => agregarNumero('1')} />
        <Button title="2" onPress={() => agregarNumero('2')} />
        <Button title="3" onPress={() => agregarNumero('3')} />
      </View>
      <View style={styles.fila}>
        <Button title="4" onPress={() => agregarNumero('4')} />
        <Button title="5" onPress={() => agregarNumero('5')} />
        <Button title="6" onPress={() => agregarNumero('6')} />
      </View>
      <View style={styles.fila}>
        <Button title="7" onPress={() => agregarNumero('7')} />
        <Button title="8" onPress={() => agregarNumero('8')} />
        <Button title="9" onPress={() => agregarNumero('9')} />
      </View>
      <View style={styles.fila}>
        <Button title="0" onPress={() => agregarNumero('0')} />
        <Button title="C" onPress={limpiar} />
      </View>

      <View style={styles.fila}>
        <Button title="+" onPress={sumar} />
        <Button title="-" onPress={restar} />
        <Button title="*" onPress={multiplicar} />
        <Button title="/" onPress={dividir} />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
});
