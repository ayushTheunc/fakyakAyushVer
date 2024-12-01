import './App.css';
import HomePage from './components/homepage';
import Passwords from './components/passwords';
import { useState} from 'react';









function App() {

  let [login, updateLogin] = useState(0);
  

  console.log("Are you loggged in?: " + login)
  return (
    <div>
      {login <= 0 ? 
      (login < 0 ? (
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
      (<HomePage onChange={() => updateLogin(0)}></HomePage>)}  
    </div>
  );
}
 



export default App;
