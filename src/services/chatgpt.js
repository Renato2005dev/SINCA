import OpenAI from "openai";

const client = new OpenAI({
apiKey: import.meta.env.VITE_OPENAI_KEY,
dangerouslyAllowBrowser: true
});

export const preguntarIA = async (mensaje) => {

try{

const res =
await client.chat.completions.create({

model:"gpt-4.1-mini",

messages:[

{
role:"system",
content:
"Responde siempre en español."
},

{
role:"user",
content:mensaje
}

]

});

return (
res?.choices?.[0]?.message?.content
||
"No hubo respuesta."
);

}
catch(error){

console.log(
"ERROR IA:",
error
);

return (
"Error al conectar con IA"
);

}

};