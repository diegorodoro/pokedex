import {Nav_bar} from './components/Nav_bar'
import { Pokedex } from './components/Pokedex'
import {Selection} from './components/Selection'
import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {db, auth} from "./firebase/firebaseConfig";
import './App.css'
import email_icon from './assets/emailImg.png';
import password_icon from './assets/passwordImg.png';
import go from './assets/pokego.png'
import GoogleButton from 'react-google-button';

function App (){
  const [email1, setEmail1] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password, setPassword] = useState("");
  const [authUser, setAuthUser] = useState(null);
  const [action, setAction] = useState("Sign Up");
  const [state, setState] = useState("welcome")
  const[page,setPage]=useState(1);
  const[team,setTeam]=useState([]);

  const pagination =(page)=>{
    switch (page) {
      case 1:
        return(<Pokedex key={"pokedex"}  />)
      
      case 2:
        return(<Selection key={"selection"} setPage={setPage}/>)
      
      default:
          
      break;
     }
  }


  const signInHandler = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email1, password1)
      .then((userCredential) => {
        console.log(userCredential);
        setEmail1("");
        setPassword1("");
        alert('Account successfully signed in');
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  const signUpHandler = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setEmail("");
        setPassword("");
        alert('Account successfully created');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);
    } catch (error) {
      console.log(error);
      alert('Failed to sign in with Google');
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign out successful");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
    {state === "welcome"? <>
    <div className="logo-container">
    <img src={go} className="logo" alt="" onClick={()=>{
      setState("after-welcome")
    }}/>
    </div> 
    </>: 
    <>
    <div>
      <div>
        {authUser ? (
          <>
            <div>
                <Nav_bar key={0} page={setPage} signout={userSignOut} email={authUser.email}/>
              </div>
              <div>
                {pagination(page)}      
            </div>
          </>
        ) : (
          <div className='cont-gen'>
            <div className='cont-login'>
              <div className='row'>
                <form onSubmit={action === "Sign In" ? signInHandler : signUpHandler}>
                  <div className="header">
                    <div className="text">{action}</div>
                  </div>
                  <div className="underline"></div>
                  {action === "Sign In" ? (
                    <div className="inputs">
                      <div className="input">
                        <img src={email_icon} alt="" />
                        <input
                          type="email"
                          placeholder="Enter your email"
                          value={email1}
                          onChange={(e) => setEmail1(e.target.value)}
                        />
                      </div>
                      <div className="input">
                        <img src={password_icon} alt="" />
                        <input
                          type="password"
                          placeholder="Enter your password"
                          value={password1}
                          onChange={(e) => setPassword1(e.target.value)}
                        />
                      </div>
                      <div className="google-container">
                      <GoogleButton onClick={signInWithGoogle}></GoogleButton>
                      </div>
                    </div>
                  ) : (
                    <div className="inputs">
                      <div className="input">
                        <img src={email_icon} alt="" />
                        <input
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="input">
                        <img src={password_icon} alt="" />
                        <input
                          type="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                  
                    </div>
                  )}
                  <div className="submit-container">
                    
                    <button type="submit">Go to Pokedex</button>
                  </div>
                </form>
                <div className="submit-container">
                  {action === "Sign Up" ? <div className={action === "Sign In" ? "submit gray" : "submit"} onClick={() => setAction("Sign In")}>Sign In</div> : <div />}
                  {action === "Sign In" ? <>
                  
                  <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => setAction("Sign Up")}>Sign Up</div>
                  </>: <div />}
              
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </>}
    </>
  );
}
//const userId = setUserId(null)[0]; // O utiliza setUserId directamente si prefieres

//export { App as default, userId };
export default App