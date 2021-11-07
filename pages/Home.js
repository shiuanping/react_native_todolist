// src/screens/Home.js
import React,{useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, LogBox } from 'react-native';
import { MaterialIcons  } from '@expo/vector-icons'; 

import TaskInputModal from '../components/TaskInputModal';

import Task from '../components/Task';
export default function Home({ navigation }) {
  const [task, setTask] = useState({...emptyTask});
  const [taskItems, setTaskItems] = useState([]);
  const [visible, setVisible] = useState(false);
  const emptyTask = {
    title: '',
    desc: '',
    image: '',
    done: false
  };
  const onShowPopup = () =>{
    setVisible(true);
  }
  const onClosePopup = () =>{
      setVisible(false);
  }
  const handleAddTask = () =>{
    if(!task.title) return; 
    setTaskItems([ ...taskItems , {...task} ] );
    setTask({...emptyTask});
  };
  const completeTask = (index) =>{
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };
  const handleNewTask = (text) =>{
    const newTask = {
      ...task,
      title: text,
    };
    setTask(newTask);
  };
  const editTask = (index, EditItem) =>{
    let itemsCopy = [...taskItems];
    itemsCopy[index] = {...EditItem};
    setTaskItems(itemsCopy);
  };
  const setDone = (index) =>{
    let itemsCopy = [...taskItems];
    itemsCopy[index]['done'] = !itemsCopy[index]['done'];
    setTaskItems(itemsCopy);
  };
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: '今日任務',
      headerLeft: () => (
        <TouchableOpacity style={styles.menu} onPress={()=>{navigation.toggleDrawer()}}>
          <MaterialIcons name="menu" size={28} color="black" />
        </TouchableOpacity>
      )
    });
  }, [navigation]);
  
  return (
    <View style={styles.container}>
      <View style={styles.scrollWrapper}>
        <ScrollView style={styles.taskScroll} >
          { taskItems.length == 0 ?
            <View style={styles.noTaskWrapper}>
              <Text style={styles.noTaskText} >目前無代辦事項</Text>
            </View>:
            taskItems.map((item, index)=>{
              return(
                <TouchableOpacity key={index} onPress={() => {
                  navigation.navigate('Detail', { task: item, editTask: editTask, deleteTask: completeTask, key: index });
                }}>
                    <Task index={index} content={item} setDone={setDone} completeTask={completeTask} />
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>
      </View>
        <View style={styles.addBtnContainer}>
            {!visible && 
            <TouchableOpacity onPress={onShowPopup} style={styles.addBtn}>
                <Text style={styles.addText}>+</Text>
            </TouchableOpacity> }
            {visible && 
            <TaskInputModal onClosePopup={onClosePopup} handleNewTask={handleNewTask}
             title={task.title} handleAddTask={handleAddTask} /> }
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    height: '100%'
  },
  menu: {
      padding: 10
  },
  writeTaskWrapper:{
    backgroundColor: '#fff',
    position: 'absolute',
    paddingVertical: 10,
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: '#ddd',
    borderTopWidth: 1
  },
  addBtnContainer: {
    width: '100%',
    flexDirection: 'row-reverse',
    position: 'absolute',
    bottom: 0
  },
  addBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2b97f5',
    marginHorizontal: 20,
    marginBottom: 30
  },
  addText: {
      color: '#fff',
      fontSize: 36,
      lineHeight: 50,
      fontWeight: 'bold',
      textAlign: 'center'
  },
  input:{
    fontSize: 16,
    padding: 5,
    width: 250,
    backgroundColor: '#fff',
    marginHorizontal: 10
  },
  addWrapper:{
    justifyContent: 'center',
    alignItems: 'center',  
    paddingHorizontal: 10,
    borderRadius: 15
  },
  scrollWrapper: {
    height: '100%',
    marginTop: 20,
  },
  taskScroll: {
    paddingHorizontal: 20
  },
  noTaskWrapper: {
    marginTop: 200,
  },
  noTaskText: {
    color: '#aaa',
    fontSize: 15
  }
});