import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Container, Button, Header, Content, Item, Input } from 'native-base';
import { StyleSheet, Text } from 'react-native';
import firebase from "firebase"


// function createPoll will pass in choices (list of options from the input boxes)



export default class RoundedTextboxExample extends React.Component {
  // set state to be the key value pair optionsArray and the strings that are inputted for option
  state = {
    inputsArray: ['option-1', 'option-2'],
    optionsArray: [],
    currentInput: ''
  
  }
  // set initial count to be 2
  count = 2

  // handleNewPut will increase the count by 1 and push the new options into the optionsArray by setting the state to the new array
  handleNewInput=()=> {
    this.count ++;
    var inputsArrayCopy = [...this.state.inputsArray];
    inputsArrayCopy.push("option-" + this.count)
    //console.log("CHECK THIS ONE", optionsArrayCopy)
    this.setState({
      inputsArray: inputsArrayCopy,
      // currentInput: ''
    })  
  }

  handleInputChange = (text) => {
    this.setState({
      currentInput: text
    })

  }

  createPoll = (choices, navigation) => {
    //console.log("THIS ONE", choices)
    // set optionObject to an empty object
    let optionObject = {};
    // run a forEach loop so that optionObject will be a key pair (name of movie and number of votes) 
    choices.forEach(option => {
      // get name of movie
      optionObject[option] = 0
      
      
    });
  
    console.log(optionObject) 
  
    this.writeUserData(optionObject, navigation)
    // save optionObject to firebase after chatroom database has been made
    // direct to next page to render the whole poll and pass values as props
  }
  writeUserData = (optionObject, navigation) =>{

    firebase.database().ref("Poll").set({
      optionObject
    })
    .then(e => (navigation.navigate('LoginScreen')))
  
  }
  


  render() {
    //console.log(this.state.optionsArray)
    return (
      <Container style={styles.body}>
        <Content>
          <Text style={styles.mainText}>Let's start creating your poll!</Text>
          <>
          </>
          {/*will map through the options by allowing a new input field to be created and saving the input to the new array */}
          {this.state.inputsArray.map((option, index)=>{
            return(
            <>
            <Item rounded>
            <Input style={styles.input} id= {option} onChangeText={this.handleInputChange}
            placeholder='Enter in an option'
            onBlur={()=> this.setState({optionsArray: [...this.state.optionsArray, this.state.currentInput]}) }
            />
            </Item> 
            
            </>
            )
          })}
         
          {/* when Button is clicked, will call handleNewInput to create another input box */}
          <Button rounded light style={styles.button} onPress={this.handleNewInput}>
            <Text>Add another option</Text>
          </Button>
          
          {/* when Button is clicked, will call createPoll */}
          <Button rounded light style={styles.button} onPress={()=>{this.createPoll(this.state.optionsArray, this.props.navigation)}}>
            <Text>Create my poll!</Text>
          </Button>
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
    marginBottom: 5,
    marginTop: 10,
   
  },
  mainText: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  body: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  }
    
  });