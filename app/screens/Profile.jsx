import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { auth, db } from '../config/firebase';

const Profile = () => {
    const userId = auth.currentUser.uid;
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        db.collection('users').where("id", '==', userId).onSnapshot((querySnapshot) => {
            querySnapshot.forEach(doc => {
                const user = doc.data();
                setCurrentUser(user);
            })
        })
    }, [])

  return (
    <View style={styles.container}>
        <SafeAreaView style={styles.safeContainer}>
            <StatusBar />
            <View style={styles.innerContainer}>
                <View style={styles.profileContainer}>
                    <View style={styles.myProfile}>
                        <View style={styles.profilePic}></View>
                    </View>
                    <View>
                        <View style={styles.followerContainer}>
                            <View style={styles.following}>
                                <Text style={styles.followingCount}>{currentUser ? currentUser.following : 0}</Text>
                                <Text style={styles.followingText}>Following</Text>
                            </View>
                            <View style={styles.followers}>
                                <Text style={styles.followersCount}>{currentUser ? currentUser.followers : 0}</Text>
                                <Text style={styles.followersText}>Followers</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.bio}>
                    <Text style={styles.name}>{currentUser ? currentUser.username : 'Loading...'}</Text>
                </View>
                <View style={styles.options}>
                    <TouchableOpacity style={styles.editProfileContainer}>    
                        <Text style={styles.editProfileText}>Edit Profile</Text>                
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.shareProfileContainer}>
                        <Text style={styles.shareProfileText}>Share Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    </View>
  )
}

export default Profile

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
        padding: 20
    },
    profileContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    myProfile: {

    },
    profilePic: {
        width: 80,
        height: 80,
        backgroundColor: 'white',
        borderRadius: 80
    },
    followerContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    following: {
        alignItems: 'center'
    },
    followingText: {
        fontSize: 12
    },
    followingCount: {
        fontSize: 16,
        fontWeight: '700'
    },
    followers: {
        alignItems: 'center',
        paddingLeft: 15
    },
    followersText: {
        fontSize: 12
    },
    followersCount: {
        fontSize: 16,
        fontWeight: '700'
    },
    bio: {
        paddingTop: 14
    },
    name: {
        fontWeight: '700'
    },
    options: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 20
    },
    editProfileContainer: {
        padding: 10,
        backgroundColor: '#1c1c1ccc',
        borderRadius: 6,
        flex: 0.48,
        alignItems: 'center'
    },
    editProfileText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 12
    },  
    shareProfileContainer: {
        padding: 10,
        backgroundColor: '#1c1c1ccc',
        borderRadius: 6,
        flex: 0.48,
        alignItems: 'center'
    },
    shareProfileText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 12
    }
})