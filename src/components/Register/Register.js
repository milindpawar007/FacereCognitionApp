import React from 'react';

class Register extends React.Component {
  constructor(props){
    super();
    this.state={
      registerEmail:'',
      registerPassword:'',
      registerName:'',
    }
  }
   
  onEmailchange=(event)=>{
    this.setState({registerEmail:event.target.value});
  }

  onPasswordchange=(event)=>{
    this.setState({registerPassword:event.target.value});
  }

  onNamechange=(event)=>{
    this.setState({registerName:event.target.value});
  }

  onSubmitRegister=()=>{
    console.log(this.state);

    fetch('https://facerecognition-milind.herokuapp.com/register',{
      method:'post',
      headers:{'Content-Type':'application/json'},
      body :JSON.stringify({
        email:this.state.registerEmail,
        name:this.state.registerName,
        password:this.state.registerPassword
      })
    })
    .then(response=>response.json())
    .then(user=>{
            if (user.id){
              this.props.loadUser(user);
              this.props.onRouteChnage('home');
            }
    });



  }


    render(){
      const {onRouteChnage}= this.props;
    return(
      
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6  shadow-5 center">
        <main className="pa4 black-80">
        <div className="measure ">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
              <input  onChange={this.onNamechange}
               className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"/>
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input  onChange={this.onEmailchange}
              className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
            </div>
            <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
           <input onChange={this.onPasswordchange}
            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
           </div>
           
          </fieldset>
          <div className="">
            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
            onClick={this.onSubmitRegister} type="submit" value="Register"/>
          </div>
        
        </div>
      </main>
      </article>
      
        
        );
      }
}

export default Register;