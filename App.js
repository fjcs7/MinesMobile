
import React, {Component} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import params from './src/params'
import MineField from './src/componentes/MineFields'
import Header from './src/componentes/Header'
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

  isWinner = (board) => {
    const won = wonGame(board)
    if (won) {
      Alert('Parabéns!', 'Se esquivou de todas as Minas! xD')
    }
    return won
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

    this.setState({board, lost, won : () => isWinner(board)})
  }

  onSelectField = (row,column) => {
    const board = cloneBoard(this.state.board)
    invertFlag(board, row, column)
    this.setState({board, won: () => isWinner(board)})
  }

  flagsLeft = () => this.minesAmount() - flagsUsed(this.state.board)

  
  render() {
    return (
      
        <View style={styles.container}>
          <Header flagsLeft={this.flagsLeft()} 
                  onNewGame={()=> this.setState(this.createState())}/>
          <View style={styles.board}>
            <MineField board={this.state.board} 
                  onOpenField={this.onOpenField}
                  onSelectField={this.onSelectField} />
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
