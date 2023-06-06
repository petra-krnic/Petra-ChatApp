import './App.css';
import React, { Component } from 'react';
import { MessageList, Input } from "./Components";


function userName(){
  const adjectives = ["Divine", "Silent", "Yellow", "Peaceful", "Dry", "Light", "Delicate", "Funky", "Crazy", "Boring", "Interesting", "Hard", "Proud", "Floral", "Black","Sunny", "Snowy"];
  const nouns = ["Eye", "Tree", "Dream", "Wave", "Sound", "Star", "Wave", "Glass", "Book", "Summer", "Water", "Machine", "Star", "Flower", "Snow", "Sun", "Soul"];

  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + " " + noun;
}

function userIcon(){
  var icons = ["\\user_Icon\\icon1.svg","\\user_Icon\\icon2.svg", "\\user_Icon\\icon3.svg"];
  var icon = icons[Math.floor(Math.random() * 3)];
  return icon;
}


class App extends Component {
  state = {
    messages: [],
    member: {
      userName: userName(),
      icon: userIcon()
    }
  };

  scaledroneConnection(){
     this.drone = new window.Scaledrone("PX26GIr3AseZm3Q1", {
      data: this.state.member
    });

    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.setState({member}) ;
    });

    const room = this.drone.subscribe("observable-room");

    room.on('data', (data, member) => {
      
      const mcopy = this.state.messages;
      mcopy.push({member, text: data});
      this.setState({mcopy});
    });
  }

  componentDidMount(){
    this.scaledroneConnection();
  }

    render(){

      return (
        <div className="App">
          <header className="App-header"> 
            <h1>Petra's ChatApp</h1>
          </header> 
        
          <MessageList userMessageList={this.state.member} messagesMessageList={this.state.messages}/>
          <Input sendMessage={this.sendMessage}/>
        </div>
      )}
  
    sendMessage = (message) => { 

      this.drone.publish(
        {
          room:"observable-room", 
          message
        }
      )
    };

}

export default App;
