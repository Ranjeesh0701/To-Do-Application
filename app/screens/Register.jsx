import { StyleSheet, Text, TextInput, View, Dimensions, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';
import { auth } from '../config/firebase';

const Register = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signUp = () => {
        auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
            userCredential.user.displayName = username;
        }).catch((error) => {
        Alert.alert('Error', 'User creation failed')
        })
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
      <View>
        <Text style={styles.notAMember}>Not a member? <Text style={styles.registerNow}>Register now</Text></Text>
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
    notAMember: {
      paddingVertical: 25,
      fontSize: 12,
      fontWeight: '600'
    },
    registerNow: {
    }
  
})