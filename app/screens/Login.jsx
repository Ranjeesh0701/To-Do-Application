import { StyleSheet, Text, TextInput, View, Dimensions, TouchableOpacity, KeyboardAvoidingView, Alert, Pressable } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';
import { auth } from '../config/firebase';

const Login = ({navigation}) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {
    auth.signInWithEmailAndPassword(email, password).then((userCredential) => {

    }).catch((error) => {
      Alert.alert('Error', 'Authentication failed')
    })
  }

  const navigateToRegister = () => {
    navigation.replace('Register');
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <StatusBar />
      <View style={styles.welcomeContainer}>
        <Text style={styles.helloText}>Hello Again!</Text>
        <Text style={styles.welcomeDescription}>Welcome back you've {'\n'} been missed!</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput placeholder='Enter email' style={styles.input} defaultValue={email} onChangeText={(value) => setEmail(value)} />
        <TextInput placeholder='Enter password' style={styles.input} defaultValue={password} onChangeText={(value) => setPassword(value)} secureTextEntry={true} />
        <Text style={styles.recovery}>Recovery Password</Text>
        <TouchableOpacity style={styles.signInBtn} onPress={signIn}>
          <Text style={styles.signInBtnTxt}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <View><Text style={styles.orContinueWith}>Or continue with</Text></View>
      <View style={styles.iconSection}>
        <View style={styles.iconContainer}>
          
        </View>
        <View style={styles.iconContainer}></View>
        <View style={styles.iconContainer}></View>
      </View>
      <View style={styles.redirectToRegister}>
        <Text style={styles.notAMember}>Not a member?</Text><Pressable style={styles.registerNowPressHandler}><Text style={styles.registerNow} onPress={navigateToRegister}>Register now</Text></Pressable>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Login

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
  signInBtn: {
    padding: 20,
    width: Dimensions.get('window').width - 50,
    marginTop: 15,
    borderRadius: 10,
    backgroundColor: '#1c1c1c',
  },
  signInBtnTxt: {
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
  signInImage: {
  },  
  orContinueWith: {
    paddingVertical: 25,
    fontSize: 12,
    fontWeight: '600'
  },
  redirectToRegister: {
    flexDirection: "row",
    alignItems: "center"
  }, 
  notAMember: {
    paddingVertical: 25,
    fontSize: 12,
    fontWeight: '600'
  },
  registerNowPressHandler: {
    marginLeft: 5
  },
  registerNow: {
    fontSize: 12,
    fontWeight: '600'
  }

})