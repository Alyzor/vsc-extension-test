import OpenAI from "openai";
import * as vscode from "vscode";
import * as fileUtils from "../utils/fileManagement";

const openai = new OpenAI();

export async function gptTest1() {
  const message = await vscode.window.showInputBox({
    prompt: "Enter your message",
    placeHolder: "Type your message here",
  });

  if (!message) {
    return;
  }
  if(!vscode.window.activeTextEditor){ return; }
  let editorText = fileUtils.readOpenedFile(vscode.window.activeTextEditor);
  if(!editorText){ return;}

  let prompt = `
  You are "Coding Buddy", a friendly AI that helps developers with their code.
  Understand what the user needs with its message (if they need help with coding or just want to chat) and provide a response accordingly.
  User's message:
  ` + message + `

  User's code: 
  ` + editorText + `
  
  Your response should be in the following format:
  {
    "additional_info_needed":[ // if the AI needs more information to provide a better answer. If not, this field can be set as an empty array.
      {
        "keyword": "keyword", // a function, a variable, a class, etc.
        "possible_location": "location" // a file or a folder
      }
    ],
    "code": "code" // the code to be inserted
    "lines": number, // the line where the code should be inserted (vscode.Line)
    "explanation": "explanation" //simple explanation of the code. ONLY USED IF "code" IS NOT EMPTY. If you need any additional information, please use the "additional_info_needed" field.
    "chat":"chat" // in case you think the user only wants to chat, instead of coding help.
  }
  The response should only be in the above format, with no text outside the JSON object.
  `;

  console.log(prompt);
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: prompt
      },
    ],
    model: "gpt-4-turbo-preview",
  });

  console.log(completion.choices[0]);
}
