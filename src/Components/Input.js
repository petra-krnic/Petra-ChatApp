import { useState } from "react";

function Input (props){

    const { sendMessage } = props;
    const [ messageText, setMessageText ] = useState("");

    const unosTeksta = e =>{
        setMessageText(e.target.value.toString());
    }

    const sendMessageSetState = e => {
        e.preventDefault();
        if (messageText.toString().trim() !== "")
            {
                sendMessage(messageText);
                setMessageText("");
            }
        else
        {
            alert("Hej, ostavljeno je prazno polje! :) Unesi poruku i pritisni gumbic 'Posalji' ili tipku 'Enter'.");
        }
    }

    return (
        <form className="form-Input" onSubmit={sendMessageSetState}>
            <input onChange={unosTeksta} value={messageText} autoFocus={true} type="text" maxLength={190} placeholder="Unesi i posalji poruku pritiskom na gumbic 'Posalji' ili tipke 'Enter'"/>
            <button>Posalji</button>
        </form>
    )
}

export default Input;