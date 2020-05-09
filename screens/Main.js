import { TouchableOpacity } from "react-native-gesture-handler";

class Chatroom extends React.Component{

}

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
