import React, {useEffect, useRef} from "react";
import {View, StyleSheet, TouchableOpacity, Modal, Dimensions, TouchableWithoutFeedback, TextInput } from "react-native";
import { MaterialIcons  } from '@expo/vector-icons'; 

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const TaskInputModal = (props) => {
    const {onClosePopup, handleNewTask, handleAddTask, title} = props;
    const taskInput = useRef(null);
    useEffect(() => {
        setTimeout(() => {
            taskInput.current.focus();
        }, 200);
    }, [taskInput]);
    return(
        <Modal animationType={'fade'} 
        transparent={true} 
        visible={true}
        >
            <TouchableWithoutFeedback onPress={()=>onClosePopup()}>
                <View style={{
                    flex: 1, 
                    backgroundColor: '#000000AA', 
                    justifyContent: 'flex-end', 
                    alignItems: 'center',
                    }}
                    >
                    <TouchableWithoutFeedback onPress={()=> {return}}>
                        <View style={styles.addTaskWrapper}>
                            <TextInput ref={taskInput} style={styles.input} placeholder={'Write a task...'} value={title} onChangeText={text => handleNewTask(text)}  />
                            <TouchableOpacity style={styles.sendBtn} onPress={()=> {
                                handleAddTask();
                            }}>
                                <MaterialIcons name="send" size={28} color="#2b97f5" />
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center'
    },
    addTaskWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: deviceWidth,
        borderTopRightRadius: 10, 
        borderTopLeftRadius: 10,
        paddingHorizontal: 10,
        maxHeight: deviceHeight * 0.4
    },
    input: {
        fontSize: 18,
        padding: 5,
        width: 250,
        backgroundColor: '#fff',
        marginHorizontal: 10
    },
    addBtn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'gray',
    },
    addText: {
        color: '#fff',
        fontSize: 36,
        lineHeight: 45,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    sendBtn: {
        padding: 15,
    }
})

export default TaskInputModal;
