import { Dimensions, StyleSheet, Text, useAnimatedValue, View, Animated, TextInput, Alert, Platform } from 'react-native'
import React, { useEffect, useState } from 'react';
import DatePicker from '@react-native-community/datetimepicker';

const {height:SCREEN_HEIGHT} = Dimensions.get('window');
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { auth, db } from '../config/firebase';

const CreateBottomSheet = (props) => {
    
    const [date, setDate] = useState(new Date());

    const onChangeDate = (event, selectedDate) => {
        const currentDate = date || selectedDate;
        setDate(currentDate);
    }   

    const showMode = (currentMode) => {
        console.log(currentMode);
        setShow(true);
        setMode(currentMode);
    }

    // const _panGestureEvent = Animated.event([{ nativeEvent: {translationY: _translateY} }], {
    //     useNativeDriver: true
    // })
    
    // const _panEventHandler = (event) => {
    //     if (event.nativeEvent.oldState === State.ACTIVE) {
    //         console.log('Screen Height: ', SCREEN_HEIGHT);
    //         if(_lastOffset.y + event.nativeEvent.translationY <= -SCREEN_HEIGHT + 120) {
    //             return;
    //         }
    //         _lastOffset.y += event.nativeEvent.translationY;
    //         _translateY.setOffset(_lastOffset.y);
    //         _translateY.setValue(0);
    //     }
    //     console.log(_translateY);
    // }
    
    const [task, setTask] = useState("");

    const [time, setTime] = useState("");

    const [due, setDue] = useState("");

    const [tags, setTags] = useState([]);

    const [members, setMembers] = useState([]);
    
    const taskRef = db.collection('tasks');
    const userId = auth.currentUser.uid;

    

    const createTask = () => {
        if(task && task.length > 0 && userId) {
            const timestamp = new Date();
            if(userId) {
                members.push(userId);
            }
            const _data = {
                task: task,
                members: members,
                time: time,
                due_by: due,
                tags: tags,
                userId: userId,
                createdAt: timestamp,
            }
            taskRef
                .add(_data)
                .then(_doc => {
                    setTask('');
                    setMembers([]);
                    members.push(userId);
                    setTags({});
                    setTime('');
                    setDue('');
                    props.setVisible(false);
                    Alert.alert('Task created successfully.');
                })
                .catch((err) => {
                    Alert.alert('Something went wrong.');
                })
        }
    }

    useEffect(() => {
        if(props.visible) {
            Animated.timing(props._translateY, {
                toValue: -SCREEN_HEIGHT + 120,
                duration: 600,
                useNativeDriver: true
            }).start()
            props._lastOffset.y = -SCREEN_HEIGHT + 120;
        }
    } ,[props.visible])

  return (
    // onGestureEvent={_panGestureEvent} onHandlerStateChange={_panEventHandler}
    <View>
        <PanGestureHandler>
            <Animated.View style={[styles.bottomSheetContainer, {transform: [{translateY: props._translateY}]}]}>
                <View style={styles.line}></View>
                <View style={styles.container}>
                    <View>
                        <TextInput placeholder='What do you need to do?' style={styles.taskInput} value={task} onChangeText={text => setTask(text)} />
                    </View>
                    <View style={styles.timingContainer}>
                        <View style={[styles.timingSection, styles.leftSection]}>
                            <Text style={styles.inputHeader}>Time</Text>
                        {/* <TextInput placeholder='00:00' style={styles.input} value={time} onChangeText={text => setTime(text)} /> */}
                            <DatePicker 
                                testID='dateTimePicker'
                                accentColor='#1c1c1ccc'
                                value={date}
                                mode='time'
                                is24Hour={true}
                                display='default'
                                onChange={onChangeDate}
                                style={{alignSelf: 'left', marginTop: 10}}
                            />
                        </View>
                        <View style={[styles.timingSection, styles.rightSection]}>
                            <Text style={styles.inputHeader}>Due by</Text>
                            {/* <TextInput placeholder='mm-dd-yyyy' style={styles.input} value={due} onChangeText={text => setDue(text)} /> */}
                            <DatePicker       
                                testID='dateTimePicker'
                                accentColor='#1c1c1ccc'
                                value={date}
                                mode='date'
                                is24Hour={true}
                                display='default'
                                onChange={onChangeDate}
                                style={{alignSelf: 'left', marginTop: 10}}
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
                        <Pressable onPress={() => showMode('date')}>
                            <View style={styles.createBtn}><Text style={styles.createText}>Create Task</Text></View>
                        </Pressable>
                    </View>
                </View>
                
            </Animated.View>
        </PanGestureHandler>
    </View>
  )
}

export default CreateBottomSheet

const styles = StyleSheet.create({
    bottomSheetContainer: {
        width: "100%",
        height: SCREEN_HEIGHT,
        backgroundColor: 'white',
        position: 'absolute',
        top: SCREEN_HEIGHT,
        borderRadius: 20,
        paddingBottom: 120,
    },
    line: {
        width: 30,
        height: 4,
        backgroundColor: 'grey',
        alignSelf: 'center',
        marginVertical: 15,
        borderRadius: 40
    },
    container: {
        padding: 20,
        height: '100%',
        justifyContent: 'space-between',
        paddingBottom: 100
    },
    taskInput: {
        width: '100%',
        fontSize: 17,
        backgroundColor: 'whitesmoke',
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
        backgroundColor: 'whitesmoke',
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
        backgroundColor: 'whitesmoke',
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
        backgroundColor: 'whitesmoke',
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
        backgroundColor: 'whitesmoke',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
    },
    createBtnContainer: {
        paddingTop: 20
    },
    createBtn: {
        backgroundColor: '#1c1c1ccc',
        padding: 15,
        borderRadius: 20,
    },
    createText: {
        fontWeight: '700',
        color: 'white',
        textAlign: 'center',
        fontSize: 17
    }
})