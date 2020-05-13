import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Container, Button, Header, Content, Item, Input } from 'native-base';
import { StyleSheet, Text } from 'react-native';
import firebase from "firebase"


// function createPoll will pass in choices (list of options from the input boxes)
function createPoll(choices, navigation){
  //console.log("THIS ONE", choices)
  // set optionObject to an empty object
  let optionObject = {};
  // run a forEach loop so that optionObject will be a key pair (name of movie and number of votes) 
  choices.forEach(option => {
    // get name of movie
    optionObject[document.getElementById(option).value] = 0
  });

  console.log(optionObject) 

  writeUserData(optionObject, navigation)
  // save optionObject to firebase after chatroom database has been made
  // direct to next page to render the whole poll and pass values as props
}

function writeUserData(optionObject, navigation){

  firebase.database().ref("Poll").set({
    optionObject
  })
  .then(e => (navigation.navigate('Poll')))

}

export default class RoundedTextboxExample extends React.Component {
  // set state to be the key value pair optionsArray and the strings that are inputted for option
  state = {optionsArray: ["option-1", "option-2"]}
  // set initial count to be 2
  count = 2

  // handleNewPut will increase the count by 1 and push the new options into the optionsArray by setting the state to the new array
  handleNewInput=()=> {
    this.count ++;
    var optionsArrayCopy = [...this.state.optionsArray];
    optionsArrayCopy.push("option-" + this.count)
    //console.log("CHECK THIS ONE", optionsArrayCopy)
    this.setState({
      optionsArray: optionsArrayCopy
    })  
  }

  render() {
    //console.log(this.state.optionsArray)
    return (
      <Container>
        <Content>
          <h3> Let's start creating your poll!</h3>
          {/*will map through the options by allowing a new input field to be created and saving the input to the new array */}
          {this.state.optionsArray.map((option, index)=>{
            return(
            <>
            <Item rounded>
            <Input id= {option} placeholder='Enter in an option'/>
            </Item> 
            <br></br>
            </>
            )
          })}
          <br></br>
          {/* when Button is clicked, will call handleNewInput to create another input box */}
          <Button rounded light onPress={this.handleNewInput}>
            <Text>Add another option</Text>
          </Button>
          <br></br>
          {/* when Button is clicked, will call createPoll */}
          <Button rounded light onPress={()=>{createPoll(this.state.optionsArray, this.props.navigation)}}>
            <Text>Create my poll!</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    
  });