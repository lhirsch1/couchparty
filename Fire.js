import firebase from 'firebase'

class Fire {
    constructor() {
        this.init()
        this.checkAuth()
    }
    init = () => {
        if(!firebase.apps.length){
            firebase.initializeApp({
                apiKey: "AIzaSyB1KmSbJqwSNpyuw3AjcoMLu76MY8H5a7I",
                authDomain: "couchparty-d571d.firebaseapp.com",
                databaseURL: "https://couchparty-d571d.firebaseio.com",
                projectId: "couchparty-d571d",
                storageBucket: "couchparty-d571d.appspot.com",
                messagingSenderId: "821252602321",
                appId: "1:821252602321:web:385b04d72c079f3824c8f0",
                measurementId: "G-8NELRFXV6M",
            })
        }
    };

    checkAuth = () => {
        firebase.auth().onAuthStateChanged(user => {
            if(!user){
                firebase.auth().signInAnonymously();
            }
        })
    }

    send = messages => {
        console.log(messages)
        messages.forEach(item => {
            const message = {
                text: item.text,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: item.user
         }
         console.log(message)
         this.db.push(message)
        })
    }
    parse = message => {
        const {user, text, timestamp} = message.val()
        const {key: _id} = message
        const createdAt = new Date(timestamp)

        return {
            _id,
            createdAt,
            text,
            user
        };
        };

    get = callback => {
        this.db.on('child_added', snapshot => callback(this.parse(snapshot)));
    };

    getPollResults = callback => {
        return firebase.database().ref("Poll").on('value', snapshot => callback(snapshot.val()));
    };

    off() {
        this.db.off()
    }

    get db() {
        return firebase.database().ref("messages");
    }
    //add a path - messages/vote
    //create a method that is responsible for getting the poll and allow the user to post to the poll
    //firebase.database().ref('chatroom/poll') - here is wher eyou will set the poll with the values from the poll
    //keys will be movie/show name
    //pair is count
    //another method responsible for updating the poll - chatroom/poll/movieName
    get uid(){
        return(firebase.auth().currentUser || {}).uid
        
    }
}

export default new Fire();