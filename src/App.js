import './App.css';
import HomePage from './components/homepage';
import Passwords from './components/passwords';
import { useState} from 'react';









function App() {

  let [login, updateLogin] = useState([0, -1]);
  

  console.log("Are you loggged in?: " + login)
  return (
    <div>
      {login[0] <= 0 ? 
      (login[0] === -1 ? (
          <div className='App'>
            <Passwords onLogin={(param) => {
              updateLogin(param);
            }}></Passwords>
            <br/>
            <br/>
            <label>Sorry, your login sucks!</label>
          </div>
      ) : (<div className='App'>
            <Passwords onLogin={(param) => {
                updateLogin(param);
              }}></Passwords>
        </div>
        )) 
      :
      (<HomePage onChange={() => updateLogin([0,-1])} newState={login}></HomePage>)}  
    </div>
  );
}
 



export default App;
