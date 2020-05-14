import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Container, Header, Content, Toast, Button, Text, Root} from 'native-base';
import { StyleSheet, ActivityIndicator } from 'react-native';
import CreatePoll from "../screens/CreatePoll"
import firebase from "firebase";

// when page is loaded, call firebase to obtain the optionObject to get the values the host entered for the poll
// render optionsObject to page with "toast" for each option in the array
    // when the option or "toast" is clicked, count for that option will increase by 1 and user will receive a message that says "thanks for voting"
        // require event listener for the click
    // users can only vote for one option
        // require event listener to listen for only 1 click
        // multiple clicks will be ignored for the count increase and user will receive a message that says "you already voted!"
// display count by each option
    // would like this to show in real-time if possible

var optionObject = {}
  
export default class ToastExample extends React.Component {
  state = {
    pollOptions: {},
    name: ""
  }

  updateVote = ({option}) => {
    
    console.log("Button: ", option)
    // this.setState(event.target.value +1)
    console.log("HERE", event.target.firstChild.innerHTML)

    console.log(this.state.pollOptions)
    //setState for this.state.pollOptions.[option] ++
    //First step is to find out how to call the data from state dynamically
    //Second step is to figure out how to store the data dynamically
    /*
    this.setState({pollOptions.optionObject.hasChild(option): pollOptions.optionObject.hasChild(option)++ })
    */
    
    firebase.database().ref("Poll/optionObject/" + option).once("value").then((snapshot) => {
      firebase.database().ref("Poll/optionObject/").update({[option]: snapshot.val()+1})
    })
    .then(e => (this.props.navigation.navigate('ChatScreen', {name: this.props.route.params.name})))
  }

  getOptions() {
    firebase.database().ref("Poll").once('value').then((snapshot) => {
      optionObject = (snapshot.val())  
      this.updateState(optionObject)
    })
    
  }

  updateState = (optionObject) =>{
    this.setState({pollOptions: optionObject})
  }

  componentWillMount(){
  this.getOptions()
 
  // console.log("optionObject3: ", optionObject)
  // this.setState({pollOptions: optionObject})
  // firebase.database().ref("Poll").once('value').then(function(snapshot){
  //   optionObject = (snapshot.val())
  //   console.log("OptionsObject1: ", optionObject)
  // })
    
 } 

 
// in database (could store in state)- use signin to get the user name and see if they voted (Set inital to false)... once voted, set to true which will prevent the second vote... set this by chatroom so user is not prevented from voting again in another poll 
// this.updateVote(event)
  render() {
    const movies = this.state.pollOptions.optionObject
    console.log("line 64: ", movies)
    return (
      <Container style={styles.body}>
      
      <Text  style={styles.mainText} >Vote for one option: </Text>
        <Content padder>
          {/* .keys will take the property of the object and turn it into an array (example- [Jaws, Titanic]*/}
          {movies? Object.keys(movies).map((option, index)=>{
            return( 
              <>
              <Button rounded style={styles.button} key={index} value={option} onPress={(event)=> {
              console.log("event: ", {option})
                this.updateVote({option})
            }
              
              }>
              <Text>{option}</Text>
              </Button>
              
              </>
            )
          })
          :<ActivityIndicator size="small" color="#00ff00" />
        }

        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    backgroundColor: '#8CBCCC',
    color: '#8CBCCC',
    alignItems: "center",
    marginTop: 10,
  },
  mainText: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    fontWeight: 'bold'
  },
  body: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});