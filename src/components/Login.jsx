import { useState } from 'react'
import { initializeApp } from 'firebase/app'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyByt46sXna60D7VPmwWg3uEOY84ytOplSA',
  authDomain: 'first-login-je.firebaseapp.com',
  projectId: 'first-login-je',
  storageBucket: 'first-login-je.appspot.com',
  messagingSenderId: '962251831350',
  appId: '1:962251831350:web:0a18eb31d71ba117090097',
}

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const connectAuth = () => {
    //connect to our firebase project
    const app = initializeApp(firebaseConfig)
    //connect to auth
    return getAuth(app)
  }

  const handleLogin = async () => {
    const auth = await connectAuth()
    const user = await signInWithEmailAndPassword(auth, email, password).catch(
      (err) => alert(err.message)
    )
    if (user) {
      console.log(user.user)
      setIsLoggedIn(true)
    }
  }

  const handleGoogleLogin = async () => {
    const auth = await connectAuth()
    const provider = new GoogleAuthProvider()
    const user = await signInWithPopup(auth, provider)
        .catch(err => alert(err.message))
    if(user) {
        console.log(user.user)
        setIsLoggedIn(true)
    }
  }

  const handleSignUp = async () => {
    const auth = await connectAuth()
    // send email and password to firebase auth
    const user = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).catch((err) => alert(err.message))
    //if all ok...
    if (user) setIsLoggedIn(true)
    //if error
    //popup error
  }
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="email">
        Email:
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="email"
          placeholder="you@there.com"
        />
      </label>
      <br />
      <label htmlFor="password">
        Password:
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          type="password"
        />
      </label>
      <br />
      <button onClick={handleLogin}>Login</button>&nbsp;
      <button onClick={handleSignUp}>Sign Up</button>
      <br />
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </form>
  )
}

export default Login
