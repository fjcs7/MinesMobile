import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Modal} from 'react-native'

export default props => {
    return (
        <Modal onRequestClose={props.onCancel}
            visible={props.isVisible} animationType='slide'
            transparent={true}>
            <View style={styles.frame}>
                <View style={styles.container}>
                    <Text style={styles.title}>Selecione o Nível</Text>
    
                    <TouchableButton collor={styles.bgEasy} 
                                     onPress={() => props.onLevelSelected(0.1)}
                                     label={"Fácil"}/>
                    <TouchableButton collor={styles.bgNormal} 
                                     onPress={() => props.onLevelSelected(0.2)}
                                     label={"Intermediário"}/>
                    <TouchableButton collor={styles.bgHard} 
                                     onPress={() => props.onLevelSelected(0.3)}
                                     label={"Difícil"}/>                                     
                </View>
            </View>    
        </Modal>
    )
}

TouchableButton = (props) => {
    return(<TouchableOpacity 
                        style={[styles.button, props.collor]}
                        onPress={props.onPress}>
                        <Text style={styles.buttonLabel}>{props.label}</Text>    
            </TouchableOpacity>)
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EEE',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
    frame: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'rgba(0,0,0,0.6)'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    button:{
        marginTop: 10, 
        padding: 5,
    },
    buttonLabel: {
        fontSize: 20,
        color: '#EEE',
        fontWeight: 'bold'
    },
    bgEasy:{
        backgroundColor: '#49b65d'
    },
    bgNormal:{
        backgroundColor: '#2765F7'
    },
    bgHard:{
        backgroundColor: '#F26337'
    },
})