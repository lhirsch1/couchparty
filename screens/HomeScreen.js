import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Icon, Text, TouchableOpacity, View } from 'react-native';
import { Container, Header, Content, Form, Item, Button, Input } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import * as firebase from 'firebase'


var firebaseConfig = {
  apiKey: "AIzaSyB1KmSbJqwSNpyuw3AjcoMLu76MY8H5a7I",
  authDomain: "couchparty-d571d.firebaseapp.com",
  databaseURL: "https://couchparty-d571d.firebaseio.com",
  projectId: "couchparty-d571d",
  storageBucket: "couchparty-d571d.appspot.com",
  messagingSenderId: "821252602321",
  appId: "1:821252602321:web:385b04d72c079f3824c8f0",
  measurementId: "G-8NELRFXV6M",
}; 
var email ='123@gmail.com';
var pass = 'abc'
firebase.initializeApp(firebaseConfig);

//firebase authenication with email
const auth = firebase.auth();

function createUser(user, pass, navigation){
  const auth = firebase.auth();
  //need to validate email input
  const promise = auth.createUserWithEmailAndPassword(user,pass);
  promise
  .then(e => (navigation.navigate('ChatMenu')))
  .catch(e => alert(e.message));
}

auth.onAuthStateChanged(firebaseUser => {

  if(firebaseUser){
    console.log('f b user');
    console.log(firebaseUser)
  }
  else{
    console.log('not logged in ')
  }
});

function handleSignOut(){
  auth.signOut()
  .then(console.log('signed out'))
  .catch(error => console.log(error))
}
console.log('env  ', process.env)

export default function HomeScreen({navigation}) {
  function handleCreateUser(event) {
    var user = document.getElementById('userName').value
    var pass =  document.getElementById('password').value
    createUser(user, pass, navigation)
  }

  function handleSignIn(event){
    var userSign = document.getElementById('userName').value
    var passSign =  document.getElementById('password').value
    auth.signInWithEmailAndPassword(userSign,passSign)
    .then(e => (navigation.navigate('ChatMenu')))
    .catch(err => alert("Email not found. Please create an account"))
  }
  
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          <Image
            source={
              __DEV__
                ? require('../assets/images/image.png')
                : require('../assets/images/image.png')
            }
            style={styles.welcomeImage}
          />
        </View>
        <View >

        <Container style={styles.container}>
        <Content>
          <Form>
            <Item>
              <Input id='userName' placeholder="Username" />
            </Item>
            <Item last>
              <Input id='password' placeholder="Password" />
            </Item>
            <Button small rounded  style={styles.button}
            onPress={handleCreateUser}
            >
              <Text>Create Account</Text>
            </Button>
           
            <Button rounded small style={styles.button}
            onPress={handleSignIn}
            >
              <Text>Log in</Text>
            </Button>
           
          </Form>
        </Content>
        <Content>
  
          {/* <Button rounded
          onPress={handleSignOut}
          >
            <Text>Log Out</Text>
          </Button> */}

          {/* <Button 
            title="Chat Room"
            onPress={()=> navigation.navigate('LoginScreen')}
          >
            <Text>
              Chat Room
            </Text>
          </Button>
          <Button 
            title="Poll"
            onPress={()=> navigation.navigate('Poll')}
          >
            <Text>
              Poll
            </Text>
          </Button>
          <Button 
            title="CreatePoll"
            onPress={()=> navigation.navigate('CreatePoll')}
          >
            <Text>
              Create Poll
            </Text>
          </Button>
          <Button 
            title="Chat Menu"
            onPress={()=> navigation.navigate('ChatMenu')}
          >
            <Text>
              Chat Menu
            </Text>
          </Button> */}

    
        </Content>
      </Container>
        </View>
      </ScrollView>

      <View style={styles.tabBarInfoContainer}>
        <Text style={styles.tabBarInfoText}>Created by Bethany, Cynthia, and Lukas</Text>
      </View>
    </View>
  );
}

// HomeScreen.navigationOptions = {
//   header: null,
// };

// function handleLearnMorePress() {
//   WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  button: {
    justifyContent: "center",
    backgroundColor: '#8CBCCC',
    color: '#8CBCCC',
    alignItems: "center",
  }
});
