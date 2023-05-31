import { Box, Button, Container, HStack, Input, VStack } from "@chakra-ui/react";
import { Message } from './Componente/Message'
import { GoogleAuthProvider, getAuth, signOut, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { app } from "./Firebase";
import { useEffect, useState } from "react";
import { getFirestore, addDoc, collection, serverTimestamp, onSnapshot ,query ,orderBy } from 'firebase/firestore'
function App() {
  const auth = getAuth(app);
  const db = getFirestore(app)
  const queryForMessage = query(collection(db, 'message'),orderBy('createdAt','asc'));
  /**stats and useEffect */
  const [textmessage, setTextmessage] = useState('')
  const [user, setUser] = useState(false);
  const [message, setMessage] = useState([])

  useEffect(() => {
    const subsciription = onAuthStateChanged(auth, (data) => {
      setUser(data);
    
    });
     const unsubscirve =onSnapshot(queryForMessage, (snap) => {
      // let d =
      setMessage(snap.docs.map((item) => {
        const id = item.id;
        return { id, ...item.data() }
      }))
    })
    return () => {
      subsciription();
      unsubscirve();
    };
  }, [])
  /**hanler function  */
  const loginHandler = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
  }

  const logOutHandler = () => {
    // const provider = new GoogleAuthProvider();
    signOut(auth)
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await addDoc( collection(db, "message"), {
        text: textmessage,
        uri: user.photoURL,
        uid: user.uid,
        createdAt: serverTimestamp()
      })
      setTextmessage('')
    }
    catch (error) {
      alert(error)
    }
  }
  return <Box bg={'red.50'}>
    {
      user ? (<Container h={'100vh'}>
        <VStack bg={''} h='full'>
          <Button onClick={logOutHandler} colorScheme="red" w='full' padding={4}>
            logOut
          </Button>
          <VStack bg='whiteAlpha.300' h='full' w='full' overflowY={'auto'} >
            { message && message.map((item) => (
              <Message key={item.id} text={item.text} user={item.uid === user.uid ? "me" : "other"} url={item.uri}  />
            ))}
          </VStack>
          <form onSubmit={submitHandler}>
            <HStack>
              <Input placeholder="enter your message" value={textmessage}
                onChange={(e) => { setTextmessage(e.target.value) }} />
              <Button type='submit' colorScheme="purple"> send</Button>
            </HStack>
          </form>
        </VStack>
      </Container>
      ) : (
        <VStack h='100vh' justifyContent='center' alignContent='center'> 
        <Container  textAlign={'center'} w='full'> <h2 style={{fontSize:"2rem",color:"red"}}>We Chat for Fun</h2><br/>
        <h4>join us</h4> </Container>
        <Button colorScheme="red" onClick={loginHandler} >login with Google Account </Button>
        </VStack>

      )
    }
  </Box>;
}

export default App;
