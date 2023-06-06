import React, { Component } from "react";

class MessageList extends Component{

    static messagesEnd = React.createRef()

    functionBottomScroll = () => {
        if (this.messagesEnd !== ""  && this.messagesEnd !== undefined){
            this.messagesEnd.scrollIntoView({ behavior: "smooth" });
        }      	
      }

        componentDidMount() {
            this.functionBottomScroll();
        }
        componentDidUpdate() {
            this.functionBottomScroll();
        }

    render(){ 
        
        const { messagesMessageList, userMessageList } = this.props;

        return(
            <ul className="messagesContainer">
                {/* iteracija preko objekata u nizu poruke */}
                {
                    messagesMessageList.map((poruka, index) => {
                        const {member, text} = poruka;
                        if (member.clientData.userName === userMessageList.userName){
                            return (
                                <li key={Math.random().toString(36).substr(2, 5)}  className="alignMessageToTheRight message">
                                   
                                    <div className="content" >
                                        <h4>{member.clientData.userName}</h4>
                                        <p>{text}</p>
                                    </div>
                                    <span className="iconStyle">
                                        <img src={member.clientData.icon} alt="user_Icon"/>
                                    </span>
                                     <div ref={(el) => { this.messagesEnd = el; }}></div>
                                     {/* prazni spremnik do kojega se scroll pomice nakon primanja/slanja poruke */}
                                </li>
                                
                            )
                        }
                        
                        else {
                            return (
                                <li key={Math.random().toString(36).substr(2, 5)} className="alignMessageToTheLeft message" >
                                  <span className="iconStyle">
                                        <img src={member.clientData.icon} alt="user_Icon" />
                                    </span>
                                    <div className="content">
                                        <h4>{member.clientData.userName}</h4>
                                        <p>{text}</p>
                                    </div>
                                    <div ref={(el) => { this.messagesEnd = el; }}></div>
                                    {/* prazni spremnik do kojega se scroll pomice nakon primanja/slanja poruke */}
                                </li>
                            )
                        }
                      
                    })
                }
            </ul>
        )
    }
}

export default MessageList;