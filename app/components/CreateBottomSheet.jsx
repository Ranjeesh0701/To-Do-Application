import { Dimensions, StyleSheet, Text, useAnimatedValue, View, Animated, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-native-datepicker';

const {height:SCREEN_HEIGHT} = Dimensions.get('window');
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CreateBottomSheet = (props) => {
    var _translateY = new Animated.Value(0); 
    var _lastOffset = {y: 0};
    const [date, setDate] = useState('09-10-2021');

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

    useEffect(() => {
        if(props.visible) {
            Animated.timing(_translateY, {
                toValue: -SCREEN_HEIGHT + 120,
                duration: 600,
                useNativeDriver: true
            }).start()
            _lastOffset.y = -SCREEN_HEIGHT + 120;
        }
    } ,[props.visible])

  return (
    // onGestureEvent={_panGestureEvent} onHandlerStateChange={_panEventHandler}
    <PanGestureHandler>
        <Animated.View style={[styles.bottomSheetContainer, {transform: [{translateY: _translateY}]}]}>
            <View style={styles.line}></View>
            <View style={styles.container}>
                <View>
                    <TextInput placeholder='What do you need to do?' style={styles.taskInput} />
                </View>
                <View style={styles.timingContainer}>
                    <View style={[styles.timingSection, styles.leftSection]}>
                        <Text style={styles.inputHeader}>Time</Text>
                       <TextInput placeholder='mm-dd-yyyy' style={styles.input} />
                    </View>
                    <View style={[styles.timingSection, styles.rightSection]}>
                        <Text style={styles.inputHeader}>Due by</Text>
                       <TextInput placeholder='mm-dd-yyyy' style={styles.input} />
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
                    <Pressable>
                        <View style={styles.createBtn}><Text style={styles.createText}>Create Task</Text></View>
                    </Pressable>
                </View>
            </View>
        </Animated.View>
    </PanGestureHandler>
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