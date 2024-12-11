import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Empty from './components/Empty';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {scale} from 'react-native-size-matters';
import TaskModal from './components/taskModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
const windowHeight = Dimensions.get('window').height;

const heightPercentage = value => {
  return (windowHeight / 100) * value;
};

const App = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [inputData, setInputData] = useState({
    title: '',
    desc: '',
    completed: false,
  });
  const [subjactError, setSubjectError] = useState(null);
  const [messageError, setMessageError] = useState(null);
  const [vendorloading, setVendorLoading] = useState(false);

  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    (async () => {
      let allTasks = await AsyncStorage.getItem('tasks');
      let tasks = JSON.parse(allTasks);
      if (tasks) {
        setTasks(tasks);
      } else {
        await AsyncStorage.setItem('tasks', JSON.stringify([]));
        setTasks([]);
      }
    })();
    return () => {};
  }, []);

  const handleAddTask = async () => {
    let isValid = true;
    if (!inputData?.title) {
      setSubjectError({
        error: 'Title is required!',
      });
      isValid = false;
    }
    if (!inputData?.desc) {
      setMessageError({
        error: 'Description is required!',
      });
      isValid = false;
    }
    if (!isValid) {
      return;
    }
    if (editIndex !== -1) {
      // Edit existing task
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = inputData;
      setTasks(updatedTasks);
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setEditIndex(-1);
    } else {
      // Add new task
      await AsyncStorage.setItem(
        'tasks',
        JSON.stringify([...tasks, inputData]),
      );
      setTasks([...tasks, inputData]);
    }
    setInputData({
      title: '',
      desc: '',
      completed: false,
    });
    setIsVisible(false)
  };

  const handleEditTask = index => {
    const taskToEdit = tasks[index];
    setInputData(taskToEdit);
    setEditIndex(index);
    setIsVisible(true);
  };

  const handleDeleteTask = async index => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const markTaskAsCompleted = async (index) => {
    let updatedTasks = [...tasks]
    let isCompleted = updatedTasks[index].completed;
    updatedTasks[index].completed = !isCompleted;
    console.log("tasks[index].completed: ", updatedTasks)
    setTasks(updatedTasks)
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setEditIndex(-1)
  }

  const renderItem = ({item, index}) => (
    <View style={[styles.itemContainer, item?.completed && {backgroundColor: "#dbffe1", borderColor: "#42a355"}]}>
      <Text style={styles.itemtitle}>{item?.title}</Text>
      <Text style={styles.itemList}>{item?.desc}</Text>
      <View style={styles.task}>
        <TouchableOpacity
          style={item?.completed ? styles.completedCont : styles.doneContainer}
          onPress={() => markTaskAsCompleted(index)}>
          {item?.completed ? <Text style={styles.completedText}>Completed</Text>:<Text style={styles.doneText}>Mark as Completed</Text>}
        </TouchableOpacity>
        <View style={styles.taskButtons}>
          {!item?.completed && <TouchableOpacity
            style={{marginRight: 10}}
            onPress={() => handleEditTask(index)}>
            <Icon name="edit" color={'#21a9ff'} size={scale(20)} />
          </TouchableOpacity>}
          <TouchableOpacity onPress={() => handleDeleteTask(index)}>
            <MaterialIcons name="delete" color={'#F95454'} size={scale(20)} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TaskModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        inputData={inputData}
        setInputData={setInputData}
        subjactError={subjactError}
        messageError={messageError}
        vendorloading={vendorloading}
        onsaveData={handleAddTask}
        setSubjectError={setSubjectError}
        setMessageError={setMessageError}
      />
      <Image
        source={require('./assets/logo.png')}
        resizeMode="contain"
        style={styles.playIcon}
      />
      <Text style={styles.slogan}>Plan smarter, live better</Text>
      {tasks?.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Empty title={'No task added yet!'} />
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsVisible(true)}>
        <Icon name="plus" color={'white'} size={scale(20)} />
        <Text style={styles.addButtonText}>Create Task</Text>
      </TouchableOpacity>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#edf8ff',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#0D92F4',
  },
  container: {
    flex: 1,
    padding: 20,
    height: heightPercentage(100),
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 7,
    color: 'green',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 15,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#6495ED',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    position: 'absolute',
    bottom: 50,
    right: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  addButtonText: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    marginLeft: 5,
    color: 'white',
  },
  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    fontSize: 18,
  },
  itemList: {
    color: '#686D76',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  doneText: {
    color: '#73777B',
    fontSize: 13,
    fontFamily: 'Poppins-SemiBold',
  },
  completedText: {
    color: 'white',
    fontSize: 13,
    fontFamily: 'Poppins-SemiBold',
  },
  itemtitle: {
    color: '#424242',
    fontSize: 17,
    fontFamily: 'Poppins-SemiBold',
  },
  taskButtons: {
    flexDirection: 'row',
  },
  editButton: {
    marginRight: 10,
    color: 'green',
    fontWeight: 'bold',
    fontSize: 18,
  },
  deleteButton: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 18,
  },
  playIcon: {
    width: '70%',
    height: 50,
    alignSelf: 'center',
    marginVertical: 10,
  },
  slogan: {
    fontSize: 13,
    color: '#5a5a5a',
    fontFamily: 'Poppins-SemiBold',
    alignSelf: 'center',
  },
  doneContainer: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderColor: '#80C4E9',
    borderWidth: 1,
  },
  completedCont:{
    backgroundColor: '#42a355',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderColor: '#42a355',
    borderWidth: 1,
  }
});

export default App;
