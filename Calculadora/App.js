import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  var [entrada, setEntrada] = useState('');
  var [resultado, setResultado] = useState(''); 

  var presionar = function(valor) {
    if (valor === '=') {
      try {
        setResultado(eval(entrada).toString());
      } catch (e) {
        setResultado('Error');
      }
    } else if (valor === 'C') {
      setEntrada('');
      setResultado('');
    } else {
      setEntrada(entrada + valor);
    }
  };

  var botones = [
    ['7','8','9','/'],
    ['4','5','6','*'],
    ['1','2','3','-'],
    ['0','.','=','+'],
    ['C']
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.pantalla}>{entrada || '0'}</Text>
      <Text style={styles.resultado}>{resultado}</Text>

      {botones.map(function(fila, i){
        return (
          <View key={i} style={styles.fila}>
            {fila.map(function(btn){
              return (
                <Button key={btn} title={btn} onPress={() => presionar(btn)} />
              );
            })}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50
  },
  pantalla: {
    fontSize: 32,
    textAlign: 'right',
    marginBottom: 10
  },
  resultado: {
    fontSize: 24,
    textAlign: 'right',
    marginBottom: 20
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  }
});
