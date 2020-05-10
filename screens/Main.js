import { TextInput, TouchableOpacity, View } from "react-native-gesture-handler";

class Main extends React.Component{
    static navigationOptions = {
        title: 'Chatter',
    };

    state = {
        name: "",
    };
    
    onPress = () => 
    this.props.navigation.navigate("Chat", {name: this.state.name})



onChangeText = name => this.ListeningStateChangedEvent({ name });

render () {
    return(
        <View>
            <Text style={StyleSheet.title}>Enter your name:</Text>
            <TextInput 
            style={StyleSheet.nameInput}
            placeHolder="Name"
            onChangeText={this.onChangeText}
            value={this.state.name}
            />
            <TouchableOpacity onPress={this.onPress}>
                <Text style={StyleSheet.buttonText}></Text>
            </TouchableOpacity>
        </View> 
    )
}
}