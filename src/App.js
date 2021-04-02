import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import './App.css';
import Particles from 'react-particles-js';





const particlesOptions = {
  particles:{
    number:{
      value:150,
      density:true,
      value_area:900
    }
  }
 
}
const initialState ={
      input:'',
      imageUrl:'',
      box:{},
      route:'signin',
      isSignedIn:false,
      user:{
            id:'',
            name:'',
            email:'',
            enteries:0,
            joined: ''
          }
}
class App extends Component {
  constructor(){
    super();
    this.state= initialState;
  }

  loadUser= (data)=>{
    this.setState({user:{
      id:data.id,
      name:data.name,
      email:data.email,
      enteries:data.enteries,
      joined: data.joined
    }})
  }


  calculateFacelocation=(response)=>{
      const charifaiFace =response.outputs[0].data.regions[0].region_info.bounding_box;
      const image= document.getElementById('inputimage');
      const width= Number(image.width);
      const height= Number(image.height);
    
      return{
        leftCol:charifaiFace.left_col * width,
        topRow:charifaiFace.top_row * height,
        rightCol: width -( charifaiFace.right_col * width),
        bottoRow: height -(charifaiFace.bottom_row * height)
      }

  }

  displayFaceBox=(box)=>{
    
      this.setState({box:box});
  }

  onInputChange=(event)=>{
    this.setState({input:event.target.value});

  }
  onButtonSubmit=()=>{
      this.setState({imageUrl:this.state.input});
      fetch('https://facerecognition-milind.herokuapp.com/imageurl',{
        method:'post',
        headers:{'Content-Type':'application/json'},
        body :JSON.stringify({
          inputUrl:this.state.input               
        })
      }) 
      .then(response =>response.json())
        .then(response =>{
          if(response){
            fetch('https://facerecognition-milind.herokuapp.com/image',{
              method:'put',
              headers:{'Content-Type':'application/json'},
              body :JSON.stringify({
                id:this.state.user.id               
              })
            })
            .then(resonse => resonse.json())
            .then(count =>{
              this.setState(Object.assign(this.state.user,{entries:count}))
            })
          }
           this.displayFaceBox(  this.calculateFacelocation(response))
          })
         // console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        .catch(err => console.log(err));
          // there was an error
        
    }

    onRouteChnage=(route)=>{
      if(route==='signout')
      {
        this.setState(initialState)
       
      }else if(route==='home')
      {
        this.setState({isSignedIn:true})
      }
      this.setState({route:route});
    }
  
  render(){ 
    const {isSignedIn,imageUrl,route,box}=this.state;
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions}  />
        <Navigation isSignedIn={isSignedIn} onRouteChnage={this.onRouteChnage}/>
          {route==='home' 
          ? <div>  <Logo/>
          <Rank  name={this.state.user.name} entries={this.state.user.enteries}/>
          <ImageLinkForm 
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
          />
          <FaceRecognition box={box} imageUrl={imageUrl}/>
          </div>
          :(
             route==='signin'
             ?<SignIn loadUser={this.loadUser} onRouteChnage={this.onRouteChnage} />
             :<Register loadUser={this.loadUser} onRouteChnage={this.onRouteChnage} />
          )
          
      }
      
      </div>
    );
 }
}

export default App;
