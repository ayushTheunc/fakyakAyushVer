import {useState, useEffect} from 'react'
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

    




export default function HomePage({onChange, newState}){

    const [nodes, setNodes] = useState(undefined);
    
    const[postData, setPostData] = useState(undefined);

    const[openDialog, setOpenDialog] = useState([false,null]);


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
    
    if(nodes === undefined){
        
        fetch(`http://127.0.0.1:5000/getUser/${newState[1]}`, {
            headers : {
                'Content-Type' : 'application/json',
                'Access-Control-Allow-Origin' : '*'
            },
            method : 'GET',
            mode: 'cors',
        })
        .then(res => res.json()).then((data) => {
            setNodes(data)
        }
        )
        .catch(function(error) {
            console.log(error);
        });
        
    }
    if(postData === undefined){
        fetch('http://127.0.0.1:5000/interactPost', {
            headers : {
                'Content-Type' : 'application/json',
                'Access-Control-Allow-Origin' : '*'
            },
            method : 'GET',
            mode: 'cors',
        })
        .then(function (response){
    
            if(response.ok) {
                response.json()
                .then(function(response) {
                    setPostData(response)
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
    
   

    if(nodes === undefined || postData === undefined){
        return (<div></div>)
    }
    return (

        <>
            <div className='App'>

                <div style={{display: "grid", gridTemplateColumns: "1fr 2fr 1fr"}}>
                    <div></div>
                    <div><h1>Welcome {nodes[0][1]}</h1></div>
                    <div>
                    <button onClick={onChange}>LOG OUT</button>
                    </div>

                </div>


                <div>
                    <div>
                    <label>Post Content: </label>
                    </div>
                    <div>
                    <textarea id="postArea" rows="4" cols="50"></textarea>
                    </div>
                    
                    
                    <button onClick={() => {      
                        fetch('http://127.0.0.1:5000/interactPost', {
                            headers : {
                                'Content-Type' : 'application/json',
                                'Access-Control-Allow-Origin' : '*'
                            },
                            method : 'POST',
                            mode: 'cors',
                            body : JSON.stringify( {
                                'userid': nodes[0][0],
                                'content' : document.getElementById('postArea').value,
                                'createdAt': new Date().toLocaleString()
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
                        setPostData(undefined)
                    }}>POST</button>
                </div>

            </div>
            <div style={{paddingLeft: 200}}>
                <h1>POSTS: </h1>
                {
                    postData.map(data => {

                        return(
                        <div style={{display: "grid", gridTemplateColumns: "1fr 2fr 1fr 1fr"}} key={data[0]}>
                            <label>{data[5]}: </label>
                            <label>{data[2]}</label>
                            <label>{data[8]}</label>
                            {data[1] === nodes[0][0] ? 
                            (<div>
                                <button style={{display: 'inline'}} onClick={() =>{

                                    setOpenDialog([true, data])

                                }}>Update</button>
                                <button style={{display: 'inline', marginLeft: 5}} onClick={() =>{
                                    fetch('http://127.0.0.1:5000/deletePost', {
                                        headers : {
                                            'Content-Type' : 'application/json',
                                            'Access-Control-Allow-Origin' : '*'
                                        },
                                        method : 'POST',
                                        mode: 'cors',
                                        body : JSON.stringify( {
                                            'postid': data[0],
                                            
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

                                    setPostData(undefined)
                                    



                                }}>Delete</button>
                            </div>) : (<div></div>)
                            }
                            
                            <br/>
                            <br/>
                        </div>)
                        
                        
                    })
                }
                <Dialog onClose = {() => setOpenDialog([false,null])} open = {openDialog[0]}>
                    <DialogTitle>Please fill out the information</DialogTitle>
                    <div style={{padding: 100}}>
                    <div>
                        <div>
                            <label>Post Content: </label>
                        </div>
                        <div>
                        <textarea id="postArea" rows="4" cols="50" value={openDialog[1]}></textarea>
                        </div>
                        
                        
                        <button onClick={() => {      
                            fetch('http://127.0.0.1:5000/interactPost', {
                                headers : {
                                    'Content-Type' : 'application/json',
                                    'Access-Control-Allow-Origin' : '*'
                                },
                                method : 'POST',
                                mode: 'cors',
                                body : JSON.stringify( {
                                    'userid': nodes[0][0],
                                    'content' : document.getElementById('postArea').value,
                                    'createdAt': new Date().toLocaleString()
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
                            setPostData(undefined)
                        }}>POST</button>
                    </div>
                                    

                         
                    </div>
                    
                </Dialog>
            </div>
        </>
        
    )
}




  