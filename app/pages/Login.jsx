import { StyleSheet, Text, TextInput, View, Dimensions, TouchableOpacity, KeyboardAvoidingView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Login = () => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <View style={styles.welcomeContainer}>
        <Text style={styles.helloText}>Hello Again!</Text>
        <Text style={styles.welcomeDescription}>Welcome back you've {'\n'} been missed!</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput placeholder='Enter username' style={styles.input} />
        <TextInput placeholder='Enter password' style={styles.input} secureTextEntry={true} />
        <Text style={styles.recovery}>Recovery Password</Text>
        <TouchableOpacity style={styles.signInBtn}>
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
      <View>
        <Text style={styles.notAMember}>Not a member? <Text style={styles.registerNow}>Register now</Text></Text>
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
  notAMember: {
    paddingVertical: 25,
    fontSize: 12,
    fontWeight: '600'
  },
  registerNow: {
  }

})