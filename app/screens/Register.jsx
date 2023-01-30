import { StyleSheet, Text, TextInput, View, Dimensions, TouchableOpacity, KeyboardAvoidingView, Alert, Pressable } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';
import { auth, db } from '../config/firebase';
import User from '../model/User';

const Register = ({navigation}) => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signUp = () => {
        auth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
            auth.currentUser.updateProfile({
              displayName: username
            });
            const _uid = auth.currentUser.uid;
            const _user = new User(_uid, email, username)._getDetails();
            const usersRef = db.collection('users');
            usersRef.doc(_uid).set(_user).then(() => {
              // navigation.navigate('Home', {_user});
            })
            .catch((error) => {
              Alert.alert('Error', 'User creation failed');
            })
        }).catch((error) => {
          Alert.alert('Error', 'User already exists')
        })
    }

    const navigateToLogin = () => {
      navigation.replace('Login');
    }

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <StatusBar />
      <View style={styles.welcomeContainer}>
        <Text style={styles.helloText}>Hello Friend</Text>
        <Text style={styles.welcomeDescription}>Create account and start{'\n'} your journey with us!</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput placeholder='Enter username' style={styles.input} defaultValue={username} onChangeText={(value) => setUsername(value)} />
        <TextInput placeholder='Enter email' style={styles.input} defaultValue={email} onChangeText={(value) => setEmail(value)} />
        <TextInput placeholder='Enter password' style={styles.input} defaultValue={password} onChangeText={(value) => setPassword(value)} secureTextEntry={true} />
        <Text style={styles.recovery}>Recovery Password</Text>
        <TouchableOpacity style={styles.signUpBtn} onPress={signUp}>
          <Text style={styles.signUpBtnTxt}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View><Text style={styles.orContinueWith}>Or continue with</Text></View>
      <View style={styles.iconSection}>
        <View style={styles.iconContainer}>
          
        </View>
        <View style={styles.iconContainer}></View>
        <View style={styles.iconContainer}></View>
      </View>
      <View style={styles.redirectToLogin}>
        <Text style={styles.alreadyAMember}>Already a member?</Text>
        <Pressable onPress={navigateToLogin}><Text style={styles.loginNow}>Login now</Text></Pressable>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Register

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    welcomeContainer: {
    },
    helloText: {
      textAlign: 'center',
      fontSize: 25,
      fontWeight: '500'
    },
    welcomeDescription: {
      padding: 20,
      paddingTop: 15,
      fontSize: 16,
      textAlign: 'center',
    },
    inputContainer: {
    },
    input: {
      backgroundColor: 'white',
      padding: 20,
      width: Dimensions.get('window').width - 50,
      marginTop: 15,
      borderRadius: 10
    },
    recovery: {
      paddingTop: 15,
      marginLeft: 'auto',
      fontWeight: '600',
      fontSize: 12
    },
    signUpBtn: {
      padding: 20,
      width: Dimensions.get('window').width - 50,
      marginTop: 15,
      borderRadius: 10,
      backgroundColor: '#1c1c1c',
    },
    signUpBtnTxt: {
      textAlign: 'center',
      fontWeight: '600',
      color: 'white'
    },
    iconSection: {
      flexDirection: 'row',
    },  
    iconContainer: {
      width: 40,
      height: 40,
      marginHorizontal: 15,
      backgroundColor: '#1c1c1c',
      borderRadius: 40
    },  
    signUpImage: {
    },  
    orContinueWith: {
      paddingVertical: 25,
      fontSize: 12,
      fontWeight: '600'
    },
    redirectToLogin: {
      flexDirection: "row",
      alignItems: 'center'
    },
    alreadyAMember: {
      paddingVertical: 25,
      fontSize: 12,
      fontWeight: '600'
    },
    loginNow: {
      fontSize: 12,
      fontWeight: '600',
      marginLeft: 5
    }
  
})