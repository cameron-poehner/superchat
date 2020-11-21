import React from 'react'
import './App.css';

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

firebase.initializeApp({
    apiKey: "AIzaSyDMCDCxVqvW1INzSL-cA7ULPo3qcS3Jqa4",
    authDomain: "superchat-4a6cd.firebaseapp.com",
    databaseURL: "https://superchat-4a6cd.firebaseio.com",
    projectId: "superchat-4a6cd",
    storageBucket: "superchat-4a6cd.appspot.com",
    messagingSenderId: "373829690780",
    appId: "1:373829690780:web:25b35ab0ebeec6351ad459",
    measurementId: "G-GB4R8EQGML"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

const [user] = useAuthState(auth);

function App() {
  return (
    <div className="App">
      <header className="App-header">

      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return(
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function ChatRoom() {
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});
}

export default App;
