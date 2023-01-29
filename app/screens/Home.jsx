import { Pressable, ScrollView, StyleSheet, Text, TextInput, View, Dimensions, Modal, Animated, Platform, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../config/firebase'
import { SafeAreaView, withSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CreateBottomSheet from '../components/CreateBottomSheet';
import {Ionicons} from '@expo/vector-icons';

const Home = ({navigation, user}) => {

  var _translateY = new Animated.Value(0); 
  var _lastOffset = {y: 0};

  const [visible, setVisible] = useState(false);

  const [tasks, setTasks] = useState([]);

  const closeModal = () => {
    setVisible(false);
  }

  const openModal = () => {
    setVisible(true);
  }

  const taskRef = db.collection('tasks');
  const userId = auth.currentUser.uid;

  // getting all the tasks from db
  useEffect(() => {
    taskRef
      .where("userId", "==", userId)
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const newTasks = [];
        querySnapshot.forEach(doc => {
          const task = doc.data();
          task.id = doc.id;
          newTasks.push(task);
        });
        setTasks(newTasks);
      }, err => {
        console.log(err);
      })
  },[]);

  const username = user?.username || auth?.currentUser?.displayName;

  return (
    <GestureHandlerRootView style={styles.container}>
      {
        // visible && <View style={styles.overlay}></View>)
      }
      <SafeAreaView style={styles.safeContainer}>
        <StatusBar />
        <ScrollView style={styles.innerContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.headerLeftSection}>
              <Text style={styles.greetingUser}>Hi {username}</Text>
              <Text style={styles.pendingTasks}>
                {tasks && tasks.length || 0} {tasks.length === 1 ? 'task' : 'tasks'} pending
              </Text>
            </View>
            <View style={styles.headerRightSection}>
              <View style={styles.profileImageContainer}>
                <FontAwesome name='user' style={styles.profileImageIcon} />
              </View>
            </View>
          </View> 
          <View style={styles.searchContainer}>
            <View style={styles.searchBox}>
              <FontAwesome name='search' style={styles.searchIcon} />
              <TextInput placeholder='Search' style={styles.searchInput} />
            </View>
            <View style={styles.filter}>
              <View style={styles.filterContainer}><FontAwesome name='sort' style={styles.filterIcon} /></View>
            </View>
          </View>
          <View style={styles.onGoingTaskContainer}>
            <View style={styles.onGoingTaskHeader}>
              <View style={styles.onGoingTaskTitle}>
                <Text style={styles.onGoingTaskTitleText}>Ongoing Task</Text>
              </View>
              <Pressable style={styles.seeAllTasks}>
                <Text style={styles.seeAllTasksText}>See all</Text>
              </Pressable>
            </View>
            <View style={styles.tasksContianer}>
              {
                tasks && tasks.length > 0 ? (
                  tasks.map(task => (
                    <View style={styles.taskCard} key={task.id}>
                      <View style={styles.cardHeader}>
                        <View style={styles.cardTitle}>
                          <Text style={styles.cardTitleText}>{task.task}</Text>
                        </View>
                        <View style={styles.dueIn}>
                          <Text style={styles.dueInText}>6d</Text>
                        </View>
                      </View>
                      <View style={styles.cardDesc}>
                        <View style={styles.timing}>
                          <Text style={styles.timeText}>2:30 PM - 6:00 PM</Text>
                        </View>
                      </View>
                      <View style={styles.teamContainer}>
                        <View style={styles.teamMember}></View>
                        <View style={styles.options}>
                          <View style={styles.editOption}>
                            <FontAwesome name='edit' style={styles.editOptionIcon} />
                          </View>
                          <View style={styles.starOption}>
                            <FontAwesome name='trash' style={styles.editOptionIcon} />
                          </View>
                        </View>
                      </View>
                    </View>
                  ))
                )
                :
                (
                  <View style={styles.noOnGoingTasksContainer}>
                    <Text style={styles.noOnGoingTaskText}>No ongoing tasks</Text>
                  </View>
                )
              }
            </View>
          </View>
          
          <View style={styles.endContainer}>

          </View>
        </ScrollView>
        {/* <TouchableOpacity style={styles.floatingCreateContainer}>
              <View style={styles.floatingContainer}>
                <View style={styles.createIconContainer}>
                  <FontAwesome name='plus' style={styles.createTaskIcon} />
                  <Ionicons name='create' style={styles.createTaskIcon} />
                </View>
                <Text style={styles.createTaskText}>Create Task</Text>
              </View>
        </TouchableOpacity> */}
        {/* <View style={styles.footer}>
          <View style={styles.homeContainer}>
            <FontAwesome name='home' style={styles.homeIcon} />
          </View>
          <View style={styles.createContainer}>
            <TouchableOpacity onPress={openModal}>
              <FontAwesome name='plus' style={styles.plusIcon} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.profileContainer}>
            <FontAwesome name='user' style={styles.userIcon} />
          </TouchableOpacity>
        </View> */}
        <CreateBottomSheet visible={visible} closeModal={closeModal} setVisible={setVisible} _translateY={_translateY} _lastOffset={_lastOffset} />
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },  
  overlay: {
    position: 'absolute',
    flex: 1,
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
    zIndex: 1,
    opacity: 0.5
  },
  safeContainer: {
    flex: 1,
  },  
  innerContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center'
  },
  greetingUser: {
    fontSize: 24,
    fontWeight: '600',
  },
  pendingTasks: {
    paddingTop: 5,
    fontWeight: '500'
  },
  profileImageContainer: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileImageIcon: {
    fontSize: 20,
    color: '#1c1c1ccc'
  },  
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    paddingVertical: 25
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: "center",
    backgroundColor: 'white',
    width: "77%",
    paddingVertical: 18,
    paddingHorizontal: 15,
    borderRadius: 30
  },
  searchIcon: {
    fontSize: 18,
    color: "#ccc"
  },
  searchInput: {
    paddingLeft: 10,
    width: "100%"
  },
  filterContainer: {
    width: 45,
    height: 45,
    backgroundColor: '#1c1c1ccc',
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center'
  },
  filterIcon: {
    fontSize: 20,
    color: 'white'
  },
  onGoingTaskContainer: {

  },
  onGoingTaskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  onGoingTaskTitle: {

  },
  onGoingTaskTitleText: {
    fontSize: 18,
    fontWeight: '600'
  },
  seeAllTasks: {

  },
  seeAllTasksText: {
    fontSize: 12,
    fontWeight: '500',
  },
  tasksContianer: {
    
  },
  taskCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 20
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 17,
    paddingLeft: 20,
    paddingRight: 20
  },
  cardTitleText: {
    fontSize: 15,
    fontWeight: '600'
  },
  dueIn: {
    backgroundColor: "#1c1c1c",
    borderRadius: 6,
  },
  dueInText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
    paddingHorizontal: 5,
    paddingVertical: 2
  },
  cardDesc: {
    paddingTop: 6,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 12
  },
  timeText: {
    fontSize: 12,
  },
  teamContainer: {
    backgroundColor: '#1c1c1ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  teamMember: {
    width: 20,
    height: 20,
    backgroundColor: 'whitesmoke',
    borderRadius: 20,
  },
  options: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  editOptionIcon: {
    color: 'white',
    fontSize: 20
  },
  starOption: {
    paddingLeft: 15
  },  
  starOptionIcon: {
    color: 'white',
    fontSize: 20
  },
  footer: {
    backgroundColor: 'whitesmoke',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: "100%",
    paddingHorizontal: 40,
    paddingBottom: 30,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopColor: '#eee',
    borderTopWidth: 1
  },
  homeIcon: {
    fontSize: 25,
    color: '#1c1c1ccc'
  },
  userIcon: {
    fontSize: 25,
    color: '#1c1c1ccc',
  },
  plusIcon: {
    fontSize: 25,
    color: '#1c1c1ccc'
  },
  createModal: {
    
  },
  endContainer: {
    paddingBottom: 40
  },
  noOnGoingTasksContainer: {
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    marginTop: 20,
    borderRadius: 6
  },
  noOnGoingTaskText: {
    fontWeight: '700',
    color: '#aaa'
  },
  floatingCreateContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20
  },
  floatingContainer: {
    backgroundColor: '#1c1c1ccc',
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  createTaskText: {
    color: 'white',
    fontWeight: '700',
  },
  createIconContainer: {
    // marginRight: 5,
    position: 'relative'
  },
  createTaskIcon: {
    color: 'white',
    fontSize: 20,
    position: 'absolute',
    top: -12,
    left: -8
  }

})