
import React, {Component} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import params from './src/params'
import MineField from './src/componentes/MineFields'
import { 
  createMinedBoard, 
  cloneBoard,
  openField,
  wonGame,
  showMines,
  hadExplosion,
  invertFlag,
  flagsUsed
 } from './src/functions'
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
      board: createMinedBoard(rows,cols, this.minesAmount()),
      won: false,
      lost: false
    }
  }

  onOpenField = (row, column) => {
    
    if (this.state.lost){
      return;
    }
    
    const board = cloneBoard(this.state.board)
    openField(board, row, column)
    const lost = hadExplosion(board)

    if (lost) {
      showMines(board)
      Alert.alert('Perdeu!!!', 'Opps!!! Clicou aonde não devia!!')
    }

    this.setState({board, lost, won : isWinner(board)})
  }

  onSelectField = (row,column) => {
    const board = cloneBoard(this.state.board)
    invertFlag(board, row, column)
    const won = isWinner(board)
    this.setState({board, won})
  }


  
  render() {
    return (
      
        <View style={styles.container}>
          <Text style={styles.welcome}>Iniciando o Mines!</Text>
          <Text style={styles.instructions}>Tamanho da grade: {params.getRowsAmount()} x {params.getColumnsAmount()}</Text>
          <View style={styles.board}>
            <MineField board={this.state.board} 
                  onOpenField={this.onOpenField}
                  onSelectField={this.onSelectField} />
          </View>
        </View>
    );
  }
}

const isWinner = (board) => {
  const won = wonGame(board)
  if (won) {
    Alert('Parabéns!', 'Se esquivou de todas as Minas! xD')
  }
  return won
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
