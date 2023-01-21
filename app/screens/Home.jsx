import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { auth } from '../config/firebase'

const Home = () => {

  const user = auth.currentUser;

  return (
    <View>
      <Text>Welcome {user.displayName}</Text>
    </View>
  )
}

export default Home;

// const styles = StyleSheet.create({})