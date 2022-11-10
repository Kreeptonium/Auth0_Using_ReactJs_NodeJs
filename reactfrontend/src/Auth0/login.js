import React from "react";
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

const LoginComponent = () =>{

    const{
        loginWithPopup,
        loginWithRedirect,
        logout,
        user,
        isAuthenticated,
        getAccessTokenSilently
      } = useAuth0();

    function callAPI(){
        
            axios
              .get("http://localhost:4000/")
              .then(response => console.log(response.data))
              .catch(error => console.log(error.message))
          };
        
          async function  callProtectedAPI(){
            try {
              const token = await getAccessTokenSilently();
              const response = await axios.get('http://localhost:4000/protected',{
                headers: {
                  authorization: `Bearer ${token}`
                }
              })
              console.log(response.data);
            } catch (error) {
              
              console.log(error.message)
            }

          };


    
    
    return(
        
    <div>
    <ul >
    <li> <button onClick={loginWithPopup}>Login with Popup</button> </li>
    <li> <button onClick={loginWithRedirect}>Login with Redirect</button> </li>
    <li> <button onClick={logout}>Logout</button> </li>
    </ul> 
     <h3> User is {isAuthenticated? "Logged In" : "Not Logged In" }</h3>
     <ul>
      <li><button onClick={callAPI}> Call API Route</button></li>
      <li><button onClick={callProtectedAPI}> Call Protected API Route</button></li>
     </ul>
     {isAuthenticated && (
        <pre style={{ textAlign: 'start'}}>
         {JSON.stringify(user, null, 2)}
         </pre>
         )}
    </div>
        );
        
    
};

export default LoginComponent;