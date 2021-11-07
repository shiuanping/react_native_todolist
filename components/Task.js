import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { FontAwesome, Feather, AntDesign   } from '@expo/vector-icons'; 

const Task = (props) => {
    let content = props.content;
    let index = props.index;
    return(
        <View style={styles.item}>
                <View style={styles.checkWrapper}>
                    {content.done? 
                    <TouchableOpacity style={styles.done} onPress={()=>{props.setDone(index)}}>
                        <FontAwesome name="check" size={16} color="#fff" />
                    </TouchableOpacity> : 
                    <TouchableOpacity style={styles.undo}
                        onPress={()=>{
                            props.setDone(index);
                            setTimeout(()=>{
                                props.completeTask(index);
                            }, 230);
                        }}>
                    </TouchableOpacity>}
                </View>
                <View style={styles.textWrapper} >
                    <View style={styles.titleWrapper}>
                        {content.title?
                        <Text style={styles.itemTitle} numberOfLines={1} ellipsizeMode='tail'>{content.title}</Text>:
                        <Text style={styles.noTitle}>無標題</Text>}
                        {content.image? 
                        <View style={styles.titleIcon}><Feather name="paperclip" size={15} color="#aaa" /></View> : null }
                    </View>
                    {content.desc? <Text style={styles.itemDesc} numberOfLines={1}  >{content.desc}</Text>: null }
                </View>
                <TouchableOpacity onPress={()=>props.completeTask(index)} >
                    <View style={styles.deleteBtn}>
                        <AntDesign name="close" size={20} color="#999" />
                    </View>
                </TouchableOpacity>
        </View>

        
    )
}

const styles = StyleSheet.create({
    item:{
        width: '100%',
        backgroundColor: '#f8f8f8',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        marginBottom: 20,
        borderLeftWidth: 5,
        borderColor: '#2b97f5'
    },
    checkWrapper: {
        paddingVertical: 20,
        paddingHorizontal: 15
    },
    itemLeft:{
        flexDirection: 'row',
        alignContent: 'center',
        flexWrap: 'wrap',
    },
    undo:{
        width: 25,
        height: 25,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#ccc'
    },
    done:{
        width: 25,
        height: 25,
        backgroundColor: '#2b97f5',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textWrapper: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingVertical: 20
    },
    titleWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemTitle:{
        maxWidth: 200,
        color: '#333',
        fontSize: 15,
    },
    noTitle: {
        color: '#ccc',
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    titleIcon: {
        paddingHorizontal: 10
    },
    itemDesc: {
        width: 220,
        color: '#aaa',
        fontSize: 12,
        marginTop: 5
    },
    deleteBtn: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 15,
    }
});

export default Task;