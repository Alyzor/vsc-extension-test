(function(){
    const vscode = acquireVsCodeApi();

    document.getElementById('send-button').addEventListener('click', ()=> {
        let messageBox = document.getElementById('message-box');
        
        if(!messageBox.innerText){ return; }
        
        messageBox.ariaDisabled = true;
        
        vscode.postMessage({type: 'user-prompt', value: messageBox.innerText});

        addNewChatBox(messageBox.innerText, true);
    });

    //displayable message handling
    window.addEventListener('message', event =>{
        const message = event.data;
        switch(message.type){
            case 'display-message':
                addNewChatBox(message.value, false);
            break;
        }
    });
});


function addNewChatBox(message, isUser){
    let chatBox = document.createElement('div');
    chatBox.className = isUser ? 'user-chat-box' : 'bot-chat-box';
    let name = document.createElement('p');
    name.innerHTML = isUser ? 'You' : 'Coding Buddy';
    
    let messageBox = document.createElement('p');
    messageBox.innerHTML = message;

    chatBox.appendChild(name);
    chatBox.appendChild(messageBox);
}
