//displayable message handling
window.addEventListener('message', event =>{
    const message = event.data;
    switch(message.type){
        case 'display-message':
            addNewChatBox(message.value, false);
        break;
    }
});

function addNewChatBox(message, isUser){
    let chatBox = document.createElement('div');
    chatBox.className = 'message-chat-box';
    let name = document.createElement('p');
    name.innerHTML = isUser ? 'You' : 'Coding Buddy';
    
    let messageBox = document.createElement('p');
    messageBox.innerHTML = message;

    chatBox.appendChild(name);
    chatBox.appendChild(messageBox);

    document.getElementById('chat-container').appendChild(chatBox);
}

(function(){
const vscode = acquireVsCodeApi();

document.getElementById('send-button').addEventListener('click', ()=>{
    console.log("clicked!");
    let messageBox = document.getElementById('message-box');
    if(!messageBox.value){ return; }
    messageBox.ariaDisabled = true;
    vscode.postMessage({type: 'user-prompt', value: messageBox.value});
    addNewChatBox(messageBox.value, true);
    messageBox.value = '';
});

document.getElementById('message-box').addEventListener('keypress', (e)=>{
    if(e.key === 'Enter'){
        document.getElementById('send-button').click();
    }
});

window.addEventListener('message', event =>{
    const message = event.data;
    switch(message.type){
        case 'response':
            processLLMResponse(message.value);
            document.getElementById('message-box').ariaDisabled = false;
        break;
    }
});
console.log(document.getElementById('send-button'));
}());

function processLLMResponse(response){
    ///document.getElementById('info-container').classList.add("hidden");
    if(response.chat){
        addNewChatBox(response.chat, false);
    }
//else if(response.additional_info_needed){
//    showNeededInfo(response.additional_info_needed);
//}
}

function showNeededInfo(info){
    let infoContainer = document.getElementById('info-container');
    infoContainer.classList.remove("hidden");
    infoContainer.innerHTML = '';
    info.forEach(element =>{
        let wrapper = document.createElement('div');
        wrapper.className = 'info-wrapper';
        let text = document.createElement('p');
        text.innerHTML = "Searching for '" + element.keyword + "' in your code...";
    });
}