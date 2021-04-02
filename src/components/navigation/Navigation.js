import React from 'react';

const Navigation =({onRouteChnage,isSignedIn})=>{
 
        if(isSignedIn) {
            return(
        <nav style={{display:'flex', justifyContent:'flex-end'}}>
            <p className='f3 link dim black underline pa3 pointer' onClick={()=>onRouteChnage('signin')}>Sign Out</p>
        </nav>)
        }else
        {  return (
                    <nav style={{display:'flex', justifyContent:'flex-end'}}>
                    <p className='f3 link dim black underline pa3 pointer' onClick={()=>onRouteChnage('signin')}>Sign In</p>
                    <p className='f3 link dim black underline pa3 pointer' onClick={()=>onRouteChnage('register')}>Register</p>
                    </nav>
                    
                   
              )

        }
    
}

export default Navigation;