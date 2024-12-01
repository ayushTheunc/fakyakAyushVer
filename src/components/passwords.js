import {useState} from 'react'
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";





export default function Passwords({onLogin}){

    
    const [buttonPopup, setButtonPopup] = useState(false)

    const buttonStyle = {
        width: "10rem",
        fontsize: "1.5rem",
        height: "2rem",
        padding: "5px",
        borderRadius: "10px",
        backgroundColor: "green",
        color: "White",
        border: "2px solid yellow",
     };
     const divStyle = {
        display: "flex",
        felxDirection: "row",
        position: "absolute",
        right: "0px",
        bottom: "0px",
        // padding: "1rem",
     };
     const confirmButtonStyle = {
        width: "5rem",
        height: "1.5rem",
        fontsize: "1rem",
        backgroundColor: "grey",
        color: "black",
        margin: "5px",
        borderRadius: "10px",
        border: "1px solid black",
     };




    return (
        <>
            <h1 style={{textAlign: "center"}}>Welcome to Fakyak!</h1>
            <h2 style={{textAlign: "center"}}><i>Please enter your username and password:</i></h2>
            <div style={{alignItems: "center", paddingTop: 100}}>
                <label>Username: </label>
                <input type="text" id="user101" name="user"/>
                <br/>
                <br/>
                <label>Password: </label>
                <input type="text" id="pass101" name="pass"/>
                <br/>
                <br/>
                <br/>
                <button onClick={() => {
                    
                    fetch('http://127.0.0.1:5000/checkUser', {
                        headers : {
                            'Content-Type' : 'application/json',
                            'Access-Control-Allow-Origin' : '*'
                        },
                        method : 'POST',
                        mode: 'cors',
                        body : JSON.stringify( {
                            'username': document.getElementById('user101').value,
                            'password': document.getElementById('pass101').value,
                        })
                    })
                    .then(function (response){

                        if(response.ok) {
                            response.json()
                            .then(function(response) {
                                console.log(response);
                                if(response.length !== 0){
                                    onLogin([1, response[0][0]])
                                }
                                else
                                    onLogin([-1,-1])
                            })

                        }
                        else {
                            throw Error('Something went wrong');
                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                    });

                    // let str = document.getElementById("user101").value;
                    // if(myMap.has(str)){
                    //     if (myMap.get(str) === document.getElementById("pass101").value){
                    //         onLogin(1);
                    //         return;
                    //     }
                    //     onLogin(-1);
                    //     return;
                    // } 
                    // onLogin(-1);
                    // return;
                }}>SUBMIT</button>

                <br/>
                <br/>
                <br/>
                <button style = {buttonStyle} onClick = {()=> setButtonPopup(true)}>
                    Create a Log-In
                </button>
                
                <Dialog onClose = {() => setButtonPopup(false)} open = {buttonPopup}>
                    <DialogTitle>Please fill out the information</DialogTitle>
                    <div style={{padding: 100}}>
                        
                                <label for="fname">Username:</label><br/>
                                <input type="text" id="userName"/><br/>
                                <label for="lname">Password:</label><br/>
                                <input type="text" id="passWord"/><br></br>
                                <label for="lname">Email:</label><br/>
                                <input type="text" id="email"/><br></br>
                                <div style = {divStyle}>
                                <button style = {confirmButtonStyle} onClick = {() => {
                                    let user = document.getElementById('userName').value;
                                    let pass = document.getElementById('passWord').value;
                                    let email = document.getElementById('email').value;
                                    if(user.trim() !== '' && pass.trim() !== '' && email.trim() !== ''){
                                        getData()
                                        setButtonPopup(false)
                                    }
                                }
                                }>
                                    Confirm
                                </button>
                                <button style = {confirmButtonStyle} onClick = {() => setButtonPopup(false)}>
                                    Cancel
                                </button>
                            </div>     

                         
                    </div>
                    
                </Dialog>
            </div>
        
        </>
    )
}

async function getData() {
    fetch('http://127.0.0.1:5000/interactUser', {
        headers : {
            'Content-Type' : 'application/json',
            'Access-Control-Allow-Origin' : '*'
        },
        method : 'POST',
        mode: 'cors',
        body : JSON.stringify( {
            'username': document.getElementById('userName').value,
            'password': document.getElementById('passWord').value,
            'email' : document.getElementById('email').value,
            'time': new Date().toLocaleString()
        })
    })
    .then(function (response){

        if(response.ok) {
            response.json()
            .then(function(response) {
                console.log(response);
            });
        }
        else {
            throw Error('Something went wrong');
        }
    })
    .catch(function(error) {
        console.log(error);
    });
    
}






