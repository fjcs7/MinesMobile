
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import params from './src/params'
import Field from './src/componentes/Field'
import MineField from './src/componentes/MineFields'
import { createMinedBoard } from './src/functions'
export default class App extends Component {
  
  constructor(props){
    super(props)
    this.state = this.createState();
  }

  minesAmount = () => {
    const  rows = params.getRowsAmount()
    const  cols = params.getColumnsAmount()
    return Math.ceil(cols * rows * params.difficultLevel) 
  }

  createState = () => {
    const rows = params.getRowsAmount()
    const cols = params.getColumnsAmount()
    return {
      board: createMinedBoard(rows,cols, this.minesAmount())
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Iniciando o Mines!</Text>
        <Text style={styles.instructions}>Tamanho da grade: {params.getRowsAmount()} x {params.getColumnsAmount()}</Text>
        <View style={styles.board}>
          <MineField board={this.state.board} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA',
  },
});
