import { Alert, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

import DatePicker from '@react-native-community/datetimepicker';

import { Ionicons } from '@expo/vector-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { auth, db } from '../config/firebase';
import Task from '../model/Task';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

const CreateTask = () => {

  const [visible, setVisible] = useState(false);

  const closeModal = () => {
    setVisible(false);
  }

  const openModal = () => {
    setVisible(true);
  }


  const [task, setTask] = useState("");

  const [desc, setDesc] = useState("");

  const [time, setTime] = useState(new Date());

  const [due, setDue] = useState(new Date());

  const [endTime, setEndTime] = useState(new Date());

  const [endDate, setEndDate] = useState(new Date());

  const [currentTag, setCurrentTag] = useState("");

  const [tags, setTags] = useState([]);

  const [members, setMembers] = useState([]);

  const taskRef = db.collection('tasks');
  const userId = auth.currentUser.uid;

  const onChangeTime = (event, selectedTime) => {
    const currentTime = new Date(selectedTime) || time;
    setTime(currentTime);
  }

  const onChangeDate = (event, selectedDate) => {
    const currentDate = new Date(selectedDate) || date;
    setDue(currentDate);
  }

  const onChangeEndTime = (event, selectedTime) => {
    const currentTime = selectedTime || endTime;
    setEndTime(currentTime);
  }

  const onChangeEndDate = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setEndDate(currentDate);
  }

  const addTag = () => {
    if (!currentTag || currentTag.length == 0) return;
    tags.push({
      id: tags.length + 1,
      tag: currentTag
    });
    setTags([...tags]);
    setCurrentTag("");
  }

  const deleteTag = (id) => {

    setTags(tags.filter(tag => tag.id != id).map((tag, index) => {
      tag.id = index;
    }));
  }

  const createTask = () => {
    if (task && task.length > 0 && userId) {
      const timestamp = new Date();
      if (userId) {
        members.push(userId);
      }
      console.log(tags);
      const _data = new Task({ _title: task, _desc: desc, _members: members, _time: time, _dueBy: due, _endTime: endTime, _endDate: endDate, _tags: tags, _createdBy: userId, _createdAt: timestamp, _updatedAt: timestamp }).getDetails();

      taskRef
        .add(_data)
        .then(_doc => {
          db.collection('tasks').doc(_doc.id).update('id', _doc.id).then(() => {
            setTask('');
            setMembers([]);
            members.push(userId);
            setTags([]);
            setDesc('');
            Alert.alert('Task created successfully.');
          })
            .catch((err) => {
              Alert.alert('Something went wrong.');
            })

        })
        .catch((err) => {
          Alert.alert('Something went wrong.');
        })
    }
  }


  return (
    <SafeAreaView style={[styles.bottomSheetContainer]} edges={['right', 'left', 'top']}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView>
          <View style={styles.container}>
            <View>
              <TextInput placeholder='What do you need to do?' style={styles.taskInput} value={task} onChangeText={text => setTask(text)} />
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.inputHeader}>Description</Text>
              <TextInput style={styles.descriptionInput} numberOfLines={10}
                multiline={true} value={desc} onChangeText={text => setDesc(text)} />
            </View>
            <View>
              <View style={styles.startDateTimeText}>
                <Text style={styles.inputHeader}>Date & Time</Text>
              </View>

              <View style={styles.timingContainer}>
                <View style={[styles.timingSection, styles.rightSection]}>
                  {/* <Text style={styles.inputHeader}>Due by</Text> */}
                  {/* <TextInput placeholder='mm-dd-yyyy' style={styles.input} value={due} onChangeText={text => setDue(text)} /> */}
                  <DatePicker
                    testID='dateTimePicker'
                    accentColor='#1c1c1ccc'
                    value={due}
                    mode='date'
                    minimumDate={new Date()}
                    is24Hour={true}
                    display='default'
                    onChange={onChangeDate}
                    style={{ alignSelf: 'left' }}
                  />
                </View>
                <View style={[styles.timingSection, styles.leftSection]}>
                  {/* <Text style={styles.inputHeader}>Time</Text> */}
                  {/* <TextInput placeholder='00:00' style={styles.input} value={time} onChangeText={text => setTime(text)} /> */}
                  <DatePicker
                    testID='dateTimePicker'
                    accentColor='#1c1c1ccc'
                    value={time}
                    mode='time'
                    is24Hour={false}
                    display='default'
                    onChange={onChangeTime}
                    style={{ alignSelf: 'left' }}
                  />
                </View>

              </View>
            </View>

            {/* <View>
              <View style={styles.endDateTimeText}>
                <Text style={styles.inputHeader}>End Date & Time</Text>
              </View>

              <View style={styles.timingContainer}>
                <View style={[styles.timingSection, styles.rightSection]}>
                  <Text style={styles.inputHeader}>Due by</Text>
                  <TextInput placeholder='mm-dd-yyyy' style={styles.input} value={due} onChangeText={text => setDue(text)} />
                  <DatePicker
                    testID='dateTimePicker'
                    accentColor='#1c1c1ccc'
                    value={endDate}
                    mode='date'
                    minimumDate={due}
                    is24Hour={true}
                    display='default'
                    onChange={onChangeEndDate}
                    style={{ alignSelf: 'left' }}
                  />
                </View>
                <View style={[styles.timingSection, styles.leftSection]}>
                  <Text style={styles.inputHeader}>Time</Text>
                  <TextInput placeholder='00:00' style={styles.input} value={time} onChangeText={text => setTime(text)} />
                  <DatePicker
                    testID='dateTimePicker'
                    accentColor='#1c1c1ccc'
                    value={endTime}
                    mode='time'
                    minimumDate={time}
                    is24Hour={false}
                    display='default'
                    onChange={onChangeEndTime}
                    style={{ alignSelf: 'left' }}
                  />
                </View>

              </View>
            </View> */}

            <View style={styles.tagsContainer}>
              <Text style={styles.addTags}>Add tags</Text>
              <ScrollView horizontal={true} style={styles.tagContainer}>
                {
                  tags.length > 0 && tags.map(tag => (
                    <View style={styles.tag} key={tag.id}>
                      <View style={styles.name}>
                        <Text style={styles.nameText}>{tag.tag}</Text>
                      </View>
                      <Pressable style={styles.tagDeleteContainer} onPress={() => deleteTag(tag.id)}>
                        <Ionicons style={styles.tagDeleteIcon} name='close' />
                      </Pressable>
                    </View>
                  ))
                }
              </ScrollView>
              <View style={styles.allTagsContainer}>

                <View style={styles.createTagContainer}>
                  <View style={styles.createTagInputContainer}>
                    <TextInput style={styles.createTagInput} value={currentTag} onChangeText={text => setCurrentTag(text)} placeholder='Enter tag' />
                  </View>
                  <Pressable style={styles.createTagBtnContainer} onPress={addTag}>
                    <View style={styles.createTag}>
                      <FontAwesome style={styles.addIcon} name='plus' />
                      <Text style={styles.addTagText}>Add tag</Text>
                    </View>
                  </Pressable>
                </View>
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
              <Pressable onPress={createTask} style={styles.customBtn}>
                <View style={styles.createBtn}><Text style={styles.createText}>Create Task</Text></View>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

    </SafeAreaView>
  )
}

export default CreateTask

const styles = StyleSheet.create({
  bottomSheetContainer: {
    flex: 1,
    borderRadius: 20,
  },
  container: {
    padding: 20,
    justifyContent: 'space-between',
    flex: 1
  },
  allTagsContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  tagContainer: {
    paddingTop: 10
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1c1c1ccc',
    borderRadius: 30,
    padding: 10
  },
  nameText: {
    color: 'white',
    fontWeight: '600'
  },
  descriptionContainer: {
    paddingTop: 20
  },
  descriptionInput: {
    width: '100%',
    fontSize: 17,
    backgroundColor: 'white',
    paddingVertical: 17,
    paddingTop: 17,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginTop: 10
  },
  tagDeleteIcon: {
    color: 'white',
    paddingLeft: 4
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
    paddingTop: 10,
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
    marginRight: 5
  },
  leftSection: {
    marginLeft: 5
  },
  tagsContainer: {
    paddingTop: 20
  },
  addTags: {
    fontWeight: '700'
  },
  createTag: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 6,
    marginVertical: 10,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  addIcon: {
    color: '#bbb'
  },
  createTagContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  createTagInput: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 6,
    marginRight: 10,
    width: 70
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
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  customBtn: {
    flex: 1
  },
  createBtn: {
    borderWidth: 1,
    borderTopColor: 'gray',
    borderBottomColor: 'gray',
    borderRightColor: 'gray',
    borderLeftColor: 'gray',
    backgroundColor: '#1c1c1ccc',
    padding: 13,
    borderRadius: 15,
  },
  createText: {
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    fontSize: 16
  },
  startDateTimeText: {
    paddingTop: 20
  },
  endDateTimeText: {
    paddingTop: 20
  }
})