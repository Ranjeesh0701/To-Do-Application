import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

const ProfileView = (props) => {
    const _profile = props?.route?.params?._profile;

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeContainer}>
                <StatusBar />
                <View style={styles.header}>
                    <Pressable styles={styles.backContainer} onPress={() => props.navigation.goBack()}>
                        <Ionicons name='chevron-back' style={styles.backIcon} />
                    </Pressable>
                    <Pressable style={styles.editContainer}>
                        <>
                            <View><Ionicons name='ellipsis-horizontal' style={styles.menuIcon} /></View>
                        </>
                    </Pressable>
                </View>
                <ScrollView style={styles.innerContainer}>
                    <View style={styles.profileContainer}>
                        <View style={styles.myProfile}>
                            <View style={styles.profilePic}></View>
                        </View>
                        <View>
                            <View style={styles.followerContainer}>
                                <View style={styles.following}>
                                    <Text style={styles.followingCount}>{_profile.following}</Text>
                                    <Text style={styles.followingText}>Following</Text>
                                </View>
                                <View style={styles.followers}>
                                    <Text style={styles.followersCount}>{_profile.followers}</Text>
                                    <Text style={styles.followersText}>Followers</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.bio}>
                        <Text style={styles.name}>{_profile.username}</Text>
                    </View>
                    <View style={styles.options}>
                        <TouchableOpacity style={styles.followContainer}>
                            <Text style={styles.followText}>Follow</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.messageContainer}>
                            <Text style={styles.messageText}>Message</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default ProfileView

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    menuIcon: {
        fontSize: 24,
        paddingRight: 5
    },
    safeContainer: {
        flex: 1,
    },
    innerContainer: {
        paddingHorizontal: 20
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
    followContainer: {
        padding: 10,
        backgroundColor: '#1c1c1ccc',
        borderRadius: 6,
        flex: 0.48,
        alignItems: 'center'
    },
    followText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 12
    },
    messageContainer: {
        padding: 10,
        backgroundColor: '#1c1c1c50',
        borderRadius: 6,
        flex: 0.48,
        alignItems: 'center'
    },
    messageText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 12
    }
})