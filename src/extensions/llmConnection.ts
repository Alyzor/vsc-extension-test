import OpenAI from "openai";
import * as vscode from "vscode";
import * as fileUtils from "../utils/fileManagement";
import { codeExamples } from "./codingBuddyExamples";
import * as os from 'os';
import fs from 'fs';

const openai = new OpenAI();

export async function getLLMJson(message:string) {

  if(!vscode.window.activeTextEditor){ return; }
  let editorText = fileUtils.readOpenedFile(vscode.window.activeTextEditor);
  if(!editorText){ return;}

  let prompt = `
  You are "Coding Buddy", a friendly AI that helps developers with their code.
  Users will send you messages, either to help them generate code, fix code or explain code.
  Users can also try to chat with you, and you can respond to them.

  In case the user's intent is to chat with you, you can respond to them with a message that is friendly and helpful.

  Otherwise, if the user's intent has to do with code, you can respond to them with code that is helpful and relevant to their request.
  In this case, you can read the user's code, which is delimited by "### CODE START" and "### CODE END".

  ### CODE START
  ${editorText}
  ### CODE END

  If you need more information that isn't provided in the code, you can ask for keywords to search for, including
  the declaration names based on the programming language. (example "var, function, class, etc.").
  
  Your response needs to be in the following JSON format (delimited by ---JSON Start and ---JSON End), as the application will parse it and display it to the user.
  
  ---JSON Start
  {
    "chat":"Your response here" // If the user's intent is to chat with you. Empty if the user's intent isn't to chat with you. This output needs to be in html format.
    "code":[
      {
        "text": "Your code here",
        "line": 0, // The line number where the code should be inserted
      }], // If the user's intent is to generate, fix or explain code. Empty if any more code is needed, or if the user's intent is to chat with you.

    "additional_info":{
      "keywords": ["keyword1", "keyword2", "keyword3"]
      "language_declarations": ["function", "class", "variable"]
    },// If you need more information that isn't provided in the code. Empty if no additional information is needed.
    "explanation": "Your explanation here", // If the user needs an explanation of the code, or if you have provided code. Empty if the user's intent isn't related to code. This output needs to be in html format.
    "intent": "Your intent here" // The user's intent. This can be "code", "fix", "explain" or "chat".
  }
  ---JSON End

  ###Examples (You can use these examples to help you generate your response.)
  ${codeExamples}
  `;
  let chatHistory = 'Message history: ' +  await getMessageHistory();

  const completion = await openai.chat.completions.create(
    {
      model: "gpt-4-1106-preview",
      response_format: {"type": "json_object"},
      messages: [
        { role: "system", content: prompt },
        {
          role: "system", content: chatHistory,
        },
        { role: "user", content: message },
      ],
    }
  );

  console.log(completion.usage?.total_tokens);

  if(!completion.choices[0].message.content){ return; }

  let response = JSON.parse(completion.choices[0].message.content);

  saveHistory(response, message);
  return response;
}

async function saveHistory(response:any, message:string){
  let chatHistory = await getMessageHistory();
  let jsonHistory = [];
  if(chatHistory !== ""){
    try{
      jsonHistory = JSON.parse(chatHistory.toString());
    }catch{}
  }
  let newMessage  = {
    "user-message": message,
    "llm-response": response
  };
  jsonHistory.push(newMessage);
  if(jsonHistory.length > 5){
    jsonHistory.shift();
  }
  fs.writeFileSync(os.tmpdir() + '\\CodingBuddy\\chatHistory.txt', JSON.stringify(jsonHistory));
}

export async function getMessageHistory(){

  try{
    let chatHistory = fs.readFileSync(os.tmpdir() + '\\CodingBuddy\\chatHistory.txt');
    if(chatHistory){
      return chatHistory.toString();
    }else{
      return "";
    }
  }catch(e){
    return "";
  }
}