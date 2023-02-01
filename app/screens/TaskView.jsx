import { Alert, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Ionicons } from '@expo/vector-icons'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import { TextInput } from 'react-native-gesture-handler'
import { FontAwesome } from '@expo/vector-icons';
import DatePicker from '@react-native-community/datetimepicker';
import { auth, db } from '../config/firebase'
import Task from '../model/Task'
import ModalDropdown from 'react-native-modal-dropdown';

const TaskView = (props) => {

  const _taskId = props.route.params._taskId;
  const _taskRef = db.collection('tasks');
  const userId = auth.currentUser.uid;

  const [currentTask, setCurrentTask] = useState(null);

  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState(new Date());

  const [taskObj, setTaskObj] = useState(null);

  useEffect(() => {
    _taskRef
      .where("createdBy", "==", userId)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach(doc => {
          const task = doc.data();
          if(doc.id === _taskId) {
            setCurrentTask(task);
            setTaskObj(new Task({_id: _taskId, _title: task.title, _desc: task.desc, _dueBy: task.dueBy, _createdBy: task.createdBy, _time: task.time, _createdAt: task.createdAt, _updatedAt: task._updatedAt, _members: task._members, _tags: task._tags}));
            const fireBaseTime = new Date(
              doc.data().time.seconds * 1000 + doc.data().time.nanoseconds / 1000000
            );
            setTime(fireBaseTime);
            const firebaseDate = new Date(
              doc.data().dueBy.seconds * 1000 + doc.data().dueBy.nanoseconds / 1000000
            )
            setDate(firebaseDate);
          }
        });
      }, err => {
        console.log(err);
      })
  }, [])

  const [editMode, setEditMode] = useState(false);

  const onChangeTime = (event, selectedTime) => {
    const currentTime = date || selectedTime;
    setDate(currentTime);
  }

  const onChangeDate = (event, selectedDate) => {
    const currentDate = date || selectedDate;
    setDate(currentDate);
  }

  const handleTitleChange = (value) => {
    currentTask.title = value;
    setCurrentTask({...currentTask});
  } 

  const updateTask = () => {
    if(taskObj) {
      setEditMode(false);
      if(taskObj._title != currentTask.title) {
        taskObj.setTitle(currentTask.title);
      } 
      const data = taskObj.getDetails();
      
      console.log(data.id);
      db.collection('tasks').doc(data.id).update('title', taskObj._title).then(() => {
        Alert.alert('Task updated successfully');
      }).catch(err => {
        console.log(err.message);
        Alert.alert('Error', 'Something went wrong');
      })

    }
    
  }  

  const completeTask = () => {
    db.collection('tasks')
  }
  

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar />
      <View style={styles.header}>
          <Pressable styles={styles.backContainer} onPress={() => props.navigation.goBack()}>
            <Ionicons name='chevron-back' style={styles.backIcon} />
          </Pressable>
          <Pressable style={styles.editContainer} onPress={() => setEditMode(!editMode)}>
            {
              !editMode ? (
                <>
                <View><Ionicons name='create-outline' style={styles.editIcon} /></View>
                <Text style={styles.editText}>Edit</Text>
                </>
              )
              :
              (
                <>
                  <View><Ionicons name='close-outline' style={styles.editIcon} /></View>
                  <Text style={styles.editText}>Cancel</Text>
                </>
              )
            }
          </Pressable>
        </View>
      <ScrollView style={styles.innerContainer}> 
        <View style={styles.container}>
          <View>
            <TextInput placeholder='What do you need to do?' style={[styles.taskInput, {color: editMode ? 'black': '#ccc'}]} editable={editMode} value={currentTask && currentTask.title} onChangeText={value => handleTitleChange(value)} />
          </View>
          <View style={styles.timingContainer}>
            <View style={[styles.timingSection, styles.leftSection]}>
              <Text style={styles.inputHeader}>Time</Text>
              {/* <TextInput placeholder='00:00' style={styles.input} value={time} onChangeText={text => setTime(text)} /> */}
              <DatePicker
                testID='dateTimePicker'
                accentColor='#1c1c1ccc'
                mode='time'
                value={time || new Date()}
                is24Hour={true}
                display='default'
                onChange={onChangeTime}
                disabled={!editMode}
                style={{ alignSelf: 'left', marginTop: 10 }}
              />
            </View>
            <View style={[styles.timingSection, styles.rightSection]}>
              <Text style={styles.inputHeader}>Due by</Text>
              {/* <TextInput placeholder='mm-dd-yyyy' style={styles.input} value={due} onChangeText={text => setDue(text)} /> */}
              <DatePicker
                testID='dateTimePicker'
                accentColor='#1c1c1ccc'
                value={date || new Date()}
                mode='date'
                is24Hour={true}
                display='default'
                onChange={onChangeDate}
                disabled={!editMode}
                style={{ alignSelf: 'left', marginTop: 10 }}
              />
            </View>
          </View>
          <View style={styles.tagsContainer}>
            <Text style={styles.addTags}>Add tags</Text>
            <View style={styles.allTagsContainer}>
              <Pressable style={styles.createTagContainer}>
                <View style={styles.createTag}>
                  <FontAwesome style={styles.addIcon} name='plus' />
                  <Text style={styles.addTagText}>Add tag</Text>
                </View>
              </Pressable>
            </View>
          </View>
          <View style={styles.inviteContainer}>
            <Text style={styles.inputHeader}>Invite</Text>
            <View style={styles.assingedMembers}>
              <View style={styles.member}>
                <FontAwesome name='user' style={styles.userAvatar} />
              </View>
              <View style={styles.assignMember}>
                <FontAwesome name='plus' style={styles.addIcon} />
              </View>
            </View>
          </View>
          <View style={styles.createBtnContainer}>
            <Text style={styles.inputHeader}>Status</Text>
            {/* <TouchableOpacity disabled={!editMode} onPress={completeTask}> */}
            <View style={styles.statusBarContainer}>
              <ModalDropdown disabled={!editMode} options={['Not yet started', 'In Progress', 'Completed']} textStyle={{paddingHorizontal: 10, color: editMode ? '#1c1c1ccc': '#ccc', fontWeight: '700', fontSize: 13}} style={{backgroundColor: 'white', paddingVertical: 15, borderRadius: 10, width: '100%'}} dropdownStyle={{width: Dimensions.get('window').width - 40, borderRadius: 5, marginTop: 20, height: 35 * 3}} dropdownTextStyle={{fontSize: 13}} />
            </View>
            {/* </TouchableOpacity> */}
          </View>
          <View style={styles.createBtnContainer}>
            <TouchableOpacity disabled={!editMode} onPress={updateTask}>
              <View style={[styles.createBtn, {backgroundColor: !editMode ? '#ccc' : '#1c1c1ccc'}]}><Text style={[styles.createText]}>Update Task</Text></View>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default TaskView

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  innerContainer: {
    paddingHorizontal: 20,
    flex: 1
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  backIcon: {
    fontSize: 24
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  editIcon: {
    fontSize: 24,
    paddingRight: 5
  },
  editText: {
    fontSize: 16,
    fontWeight: '700'
  },
  container: {
    paddingVertical: 20,
    height: '100%',
    justifyContent: 'space-between',
  },
  taskInput: {
    width: '100%',
    fontSize: 17,
    backgroundColor: 'white',
    paddingVertical: 17,
    paddingHorizontal: 10,
    borderRadius: 6
  },
  timingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  inputHeader: {
    fontWeight: '700'
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
    padding: 10,
    borderRadius: 6,
    marginVertical: 10
  },
  timingSection: {
    flex: 0.5,
  },
  rightSection: {
    marginLeft: 5
  },
  leftSection: {
    marginRight: 5
  },
  tagsContainer: {
    paddingTop: 10
  },
  addTags: {
    fontWeight: '700'
  },
  createTag: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    marginVertical: 10,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  addIcon: {
    color: '#bbb'
  },
  addTagText: {
    paddingLeft: 5,
    color: '#bbb'
  },
  inviteContainer: {
    paddingTop: 10,
  },
  assingedMembers: {
    flexDirection: 'row',
    paddingTop: 10
  },
  member: {
    width: 35,
    height: 35,
    borderRadius: 35,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  userAvatar: {
    fontSize: 14,
    color: '#bbb'
  },
  assignMember: {
    width: 35,
    height: 35,
    borderRadius: 35,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  createBtnContainer: {
    paddingTop: 20
  },
  createBtn: {
    padding: 15,
    borderRadius: 20,
  },
  createText: {
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    fontSize: 17
  },
  statusBarContainer: {
    paddingTop: 10
  },
  statusBar: {

  }
});