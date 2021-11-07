// src/screens/Details.js
import React, {useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Image, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'; 




export default function Details({navigation, route}) {
  let params = route.params;
  let task = params.task;
  let index = params.key;
  let [editItem, setEditItem] = useState({
    title: task.title,
    desc: task.desc,
    image: task.image
  });
  useEffect(()=>{
    params.editTask(index, editItem);
  },[editItem]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.icon} onPress={()=>{
          params.deleteTask(index);
          navigation.navigate('HOME');
        }}>
          <MaterialIcons name="delete-outline" size={24} color="black" />
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setEditItem({
        ...editItem,
        image: result.uri
      });
    }
  }; 

  return (
    <View style={styles.container}>
      <TextInput style={styles.taskInput} placeholder={"輸入任務"}
       value={editItem.title} onChangeText={ title => {
        setEditItem({
          ...editItem,
          title: title,
        });
       }} ></TextInput>
      <TextInput style={styles.taskDesc} placeholder={"輸入描述"} 
      value={editItem.desc} multiline={true} onChangeText={ desc => {
        setEditItem({
          ...editItem,
          desc: desc,
        });
       }}></TextInput>
        {editItem.image ?
        <View style={styles.imageWrapper} >
          <View style={styles.image}>
            <Image source={{ uri: editItem.image }} style={{ width: 150, height: 120 }} resizeMode={'contain'} />
            <TouchableOpacity style={styles.imageDeleteBtn} onPress={()=>{
               setEditItem({
                ...editItem,
                image: '',
              });
            }}>
              <FontAwesome name="close" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>: null }
      <View style={styles.toolWrapper} >
        <TouchableOpacity  onPress={pickImage} >
          <FontAwesome name="image" size={24} color="#aaa" />
        </TouchableOpacity> 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    color: '#333',
    fontSize: 24,
    fontWeight: 'bold'
  },
  taskInput: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom:　15,
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  taskDesc: {
    fontSize: 15,
    paddingHorizontal: 20,
    marginBottom:　15
  },
  toolWrapper:{
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    marginTop: 'auto'
  },
  imageWrapper: {
    paddingHorizontal: 20,
    
  },
  icon: {
    paddingHorizontal: 20
  },
  image: {
    width: 150,
    height: 50,
    position: 'relative'
  },
  imageDeleteBtn: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: '#aaa',
    flex: 1,
    alignItems: 'center',
    paddingVertical: 2,
    position: 'absolute',
    right: -5,
    top: -5
  }
});