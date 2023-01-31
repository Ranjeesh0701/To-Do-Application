import { ActivityIndicator, StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { auth, db } from '../config/firebase'

const Search = (props) => {

  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const searchContent = (value) => {
    setSearchText(value);
    if (value == '') {
      setSearchResults([]);
      return;
    }
    setSearchResults([]);
    setSearchLoading(true);
    const userId = auth.currentUser.uid;
    db.collection('users').where('username', '>=', value).where('username', '<=', value + "\uf8ff").onSnapshot((querySnapshot) => {
      searchResults.splice(0);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        searchResults.push(data);
        setSearchResults(searchResults);
      })
      setSearchLoading(false);
    })
  }

  const showProfile = (_profile) => {
    props.navigation.navigate('ProfileView', {
      _profile: _profile
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <TextInput placeholder='Search users, groups, projects...' style={styles.searchInput} onChangeText={(value) => searchContent(value)} />
        <View stlye={{flex: 1}}>
          <View style={styles.searchResultContainer}>
            {
              searchLoading ? (
                <ActivityIndicator color="#1c1c1ccc" />
              )
                :
                (
                  <>
                    {
                      searchResults && searchResults.length > 0 ? (
                        searchResults.map(searchResult => (
                          <Pressable style={styles.searchCardContainer} key={searchResult.id} onPress={() => showProfile(searchResult)}>
                            <View style={styles.searchResultCard}>
                              <View style={styles.profilePic}>
                                <View>

                                </View>
                              </View>
                              <View style={styles.profileDesc}>
                                <Text style={styles.profileName}>{searchResult.username}</Text>
                                {/* <Text></Text> */}
                              </View>
                            </View>
                          </Pressable>
                        ))
                      )
                        :
                        (
                          <>
                            {
                              searchText && searchText != '' && (
                                <View>
                                  <Text>No results found</Text>
                                </View>
                              )
                            }
                          </>
                        )
                    }
                  </>
                )
            }
          </View>

        </View>
      </View>
    </SafeAreaView>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flex: 1
  },
  searchInput: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 6,
  },
  searchResultContainer: {
    paddingTop: 20
  },
  searchResultCard: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  profilePic: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: '50%'
  },
  profileDesc: {
    paddingLeft: 10
  },
  profileName: {
    fontWeight: '700'
  }
})