import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Container, Button, Header, Content, Item, Input } from 'native-base';
import { StyleSheet, Text } from 'react-native';

// this function might go on its own page- poll should probably be on a separate screen
function createPoll(choices){
  //console.log("THIS ONE", choices)
  let arrayValues = [];
  choices.forEach(option => {
    arrayValues.push(document.getElementById(option).value)
  });
  console.log(arrayValues)
  //direct to next page to render the whole poll and pass values as props
}

export default class RoundedTextboxExample extends React.Component {
  state = {optionsArray: ["option-1", "option-2"]}
  count = 2

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
        <Header />
        <Content>
          <h3> Let's start creating your poll!</h3>
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
          <Button rounded light onPress={this.handleNewInput}>
            <Text>Add another option</Text>
          </Button>
          <br></br>
          <Button rounded light onPress={()=>{createPoll(this.state.optionsArray)}}>
            <Text>Create my poll!</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    
  });