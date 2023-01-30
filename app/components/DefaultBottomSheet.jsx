import BottomSheet from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Portal, PortalHost } from '@gorhom/portal';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { auth, db } from '../config/firebase';
import { TextInput } from 'react-native-gesture-handler';
import DatePicker from '@react-native-community/datetimepicker';
import { FontAwesome } from '@expo/vector-icons';

const DefaultBottomSheet = () => {
	// Creates a reference to the DOM element that we can interact with
	const bottomSheetRef = useRef(null);

	// Setting the points to which we want the bottom sheet to be set to
	// Using '-30' here so that it is not seen when it is not presented
	const snapPoints = useMemo(() => ['75%'], []);

	// Callback function that gets called when the bottom sheet changes
	const handleSheetChanges = useCallback((index) => {
		console.log('handleSheetChanges', index);
	}, []);

	// Expands the bottom sheet when our button is pressed
	const onAddButtonPress = () => {
		bottomSheetRef?.current?.expand();
	}


	const [date, setDate] = useState(new Date());

	const onChangeDate = (event, selectedDate) => {
		const currentDate = date || selectedDate;
		setDate(currentDate);
	}

	const [task, setTask] = useState("");

	const [time, setTime] = useState("");

	const [due, setDue] = useState("");

	const [tags, setTags] = useState([]);

	const [members, setMembers] = useState([]);

	const taskRef = db.collection('tasks');
	const userId = auth.currentUser.uid;

	const createTask = () => {
		if (task && task.length > 0 && userId) {
			const timestamp = new Date();
			if (userId) {
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

	return (
		<>
			<TouchableWithoutFeedback onPress={onAddButtonPress}>
				<Ionicons size={40} name="add-circle" color={'#00a16e'} />
			</TouchableWithoutFeedback>
			{/* <Portal> */}
				<BottomSheet
					ref={bottomSheetRef}
					index={-1} // Hide the bottom sheet when we first load our component 
					snapPoints={snapPoints}
					enablePanDownToClose={true}
					onChange={handleSheetChanges}
				>
					<View style={styles.bottomSheetContainer}>
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
										style={{ alignSelf: 'left', marginTop: 10 }}
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
								<Pressable>
									<View style={styles.createBtn}><Text style={styles.createText}>Create Task</Text></View>
								</Pressable>
							</View>
						</View>

					</View>
				</BottomSheet>
			{/* </Portal> */}
		</>
	)
}

export default DefaultBottomSheet;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		backgroundColor: 'grey',
	},
	contentContainer: {
		flex: 1,
		paddingLeft: 50
	},
	bottomSheetTitle: {
		fontSize: 24,
		fontWeight: '500'
	},
	bottomSheetContainer: {
	},
	container: {
		padding: 20,
		height: '100%',
		justifyContent: 'space-between',
		paddingBottom: 75
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
});