import { Dimensions, StyleSheet, Text, useAnimatedValue, View, Animated, TextInput, Alert, Platform, PanResponder, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react';
import DatePicker from '@react-native-community/datetimepicker';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
import { PanGestureHandler, State, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

import { Ionicons } from '@expo/vector-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { auth, db } from '../config/firebase';
import { Portal } from '@gorhom/portal';
import Task from '../model/Task';

const CustomBottomSheet = (props) => {

    const [visible, setVisible] = useState(false);

    const closeModal = () => {
        setVisible(false);
    }

    const openModal = () => {
        setVisible(true);
    }

    const _panGestureEvent = Animated.event([{ nativeEvent: { translationY: props._translateY } }], {
        useNativeDriver: true
    })

    const _panEventHandler = (event) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            console.log('Screen Height: ', SCREEN_HEIGHT);
            if (props._lastOffset.y + event.nativeEvent.translationY <= -SCREEN_HEIGHT + 120) {
                return;
            }
            console.log(props._lastOffset.y);
            props._lastOffset.y += event.nativeEvent.translationY;
            props._translateY.setOffset(props._lastOffset.y);
            props._translateY.setValue(0);
        }
    }

    const [task, setTask] = useState("");

    const [time, setTime] = useState(new Date());

    const [due, setDue] = useState(new Date());

    const [tags, setTags] = useState([]);

    const [members, setMembers] = useState([]);

    const taskRef = db.collection('tasks');
    const userId = auth.currentUser.uid;

    const onChangeTime = (event, selectedTime) => {
        const currentTime = selectedTime || time;
        setTime(currentTime);
    }

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDue(currentDate);
    }

    const createTask = () => {
        if (task && task.length > 0 && userId) {
            const timestamp = new Date();
            if (userId) {
                members.push(userId);
            }
            const _data = new Task({_title: task, _members: members, _time: time, _dueBy: due, _tags: tags, _createdBy: userId, _createdAt: timestamp, _updatedAt: timestamp}).getDetails();

            taskRef
                .add(_data)
                .then(_doc => {
                    db.collection('tasks').doc(_doc.id).update('id', _doc.id).then(() => {
                        setTask('');
                        setMembers([]);
                        members.push(userId);
                        setTags({});
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

    const openBottomSheet = () => {
        setTime(new Date());
        setDue(new Date());
        Animated.timing(props._translateY, {
            toValue: -SCREEN_HEIGHT + 120,
            duration: 600,
            useNativeDriver: true
        }).start()
        props._lastOffset.y = -SCREEN_HEIGHT + 120;
    }

    const closeBottomSheet = () => {
        Animated.timing(props._translateY, {
            toValue: SCREEN_HEIGHT,
            duration: 600,
            useNativeDriver: true
        }).start()
        props._lastOffset.y = SCREEN_HEIGHT;
    }



    return (
        // onGestureEvent={_panGestureEvent} onHandlerStateChange={_panEventHandler}
        <>
            <TouchableWithoutFeedback onPress={openBottomSheet}>
                <Ionicons size={40} name="add-circle" color={'#1c1c1ccc'} style={{paddingTop: 2}} />
            </TouchableWithoutFeedback>
            <Portal>
                <PanGestureHandler style={{ flex: 1 }}>
                    <Animated.View style={[styles.bottomSheetContainer, { transform: [{ translateY: props._translateY }] }]}>
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
                                        value={time}
                                        mode='time'
                                        is24Hour={false}
                                        display='default'
                                        onChange={onChangeTime}
                                        style={{ alignSelf: 'left', marginTop: 10 }}
                                    />
                                </View>
                                <View style={[styles.timingSection, styles.rightSection]}>
                                    <Text style={styles.inputHeader}>Due by</Text>
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
                                        style={{ alignSelf: 'left', marginTop: 10 }}
                                    />
                                </View>
                            </View>
                            <View style={styles.tagsContainer}>
                                <Text style={styles.addTags}>Add tags</Text>
                                <View style={styles.allTagsContainer}>
                                    {/* <ScrollView horizontal={true} style={styles.tagContainer}>
                                        <View style={styles.tag}>
                                            <View style={styles.name}>
                                                <Text style={styles.nameText}>Hello</Text>
                                            </View>
                                            <View style={styles.tagDeleteContainer}>
                                                <Ionicons style={styles.tagDeleteIcon} name='close' />
                                            </View> 
                                        </View>
                                        <View style={[styles.tag, {marginLeft: 10}]}>
                                            <View style={styles.name}>
                                                <Text style={styles.nameText}>Hello</Text>
                                            </View>
                                            <View style={styles.tagDeleteContainer}>
                                                <Ionicons style={styles.tagDeleteIcon} name='close' />
                                            </View> 
                                        </View>
                                    </ScrollView> */}
                                    <View style={styles.createTagContainer}>
                                        <View style={styles.createTagInputContainer}>
                                            <TextInput style={styles.createTagInput} placeholder='Enter tag' />
                                        </View>
                                        <Pressable style={styles.createTagBtnContainer}>
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
                                <Pressable onPress={closeBottomSheet} style={[styles.customBtn]}>
                                    <View style={styles.cancelBtn}><Text style={styles.cancelText}>Cancel</Text></View>
                                </Pressable>
                                <Pressable onPress={createTask} style={styles.customBtn}>
                                    <View style={styles.createBtn}><Text style={styles.createText}>Create Task</Text></View>
                                </Pressable>
                            </View>
                        </View>

                    </Animated.View>
                </PanGestureHandler>
            </Portal>
        </>
    )
}

export default CustomBottomSheet

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
        width: 25,
        height: 4,
        backgroundColor: '#1c1c1ccc',
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
    allTagsContainer: {
        flexDirection: 'row',
        alignItems: 'center'
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
    tagDeleteIcon: {
        color: 'white',
        paddingLeft: 4
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
    createTagContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    createTagInput: {
        backgroundColor:'whitesmoke',
        padding: 10,
        borderRadius: 20,
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
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    customBtn: {
        flex: 0.48
    },  
    cancelBtn: {
        borderTopColor: 'gray',
        borderBottomColor: 'gray',  
        borderRightColor: 'gray',
        borderLeftColor: 'gray',
        borderWidth: 1,
        padding: 13,
        borderRadius: 15,
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
    cancelText: {
        fontWeight: '600',
        color: '#1c1c1ccc',
        textAlign: 'center',
        fontSize: 16
    }
})