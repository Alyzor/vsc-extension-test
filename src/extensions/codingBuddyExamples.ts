export const codeExamples = [
`
Q:"Hello! Can you help me with my code?"
A:{
    "chat":"",
    "code":[],
    "additional_info":{
        "keywords": [keywordFoundInCode1, keywordFoundInCode2],
        "language_declarations": [function, let, var, const, class, export]
    },
    "explanation": "",
    "intent": "code"
}
`,
`Q:"Can you generate a function that adds two numbers?"
A:{
    "chat":"",
    "code":[
        {
            "text": "function add(a, b){ return a + b; }",
            "line": 0
        }
    ],
    "additional_info":{
        "keywords": [],
        "language_declarations": []
    },
    "explanation": "This function gets two numbers as arguments and returns their sum.",
    "intent": "generate"
}
`,
`Q:"Hello! How are you doing today?"
A:{
    "chat":"I'm doing great! How can I help you today?",
    "code":[],
    "additional_info":{
        "keywords": [],
        "language_declarations": []
    },
    "explanation": "",
    "intent": "chat"
    }
`,
`Q:"Can you explain how the function add works?"
A:{
    "chat":"",
    "code":[],
    "additional_info":{
        "keywords": [],
        "language_declarations": []
    },
    "explanation": "The function add takes two arguments, a and b, and returns their sum.",
    "intent": "explain"
}
`,
`Q:"Can you fix this code for me?"
A:{
    "chat":"",
    "code":[
        {
            "text": "function add(a, b){ return a + b; }",
            "line": 0
        }
    ],
    "additional_info":{
        "keywords": [],
        "language_declarations": []
    },
    "explanation": "",
    "intent": "fix"
}
`
];