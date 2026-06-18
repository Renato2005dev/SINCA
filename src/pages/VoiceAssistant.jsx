import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  RiArrowLeftLine,
  RiMicFill,
} from "react-icons/ri";

import {
  preguntarIA,
} from "../services/chatgpt";
import { useAccessibility } from "../hooks/useAccessibility"; // 👈 SOLO AGREGAR ESTO

const VoiceAssistant = () => {

const navigate =
useNavigate();

const { tema } = useAccessibility(); // 👈 SOLO AGREGAR ESTO

const [texto,setTexto]=
useState("");

const [respuesta,setRespuesta]=
useState("");

const [cargando,setCargando]=
useState(false);

const [escuchando,setEscuchando]=
useState(false);

const [zoom,setZoom]=
useState(100);

const [reconocimiento,
setReconocimiento]=
useState(null);

// 👇 AGREGAR ESTAS CLASES (no eliminar nada)
const temaClases = {
  normal: "bg-[#f5f7f8] text-gray-900",
  oscuro: "bg-gray-900 text-white",
  alto: "bg-black text-yellow-400",
};

const headerClases = {
  normal: "bg-white border-b border-gray-200",
  oscuro: "bg-gray-800 border-b border-gray-700",
  alto: "bg-black border-b border-yellow-500",
};

const textareaClases = {
  normal: "bg-white text-black border-green-700",
  oscuro: "bg-gray-800 text-white border-green-600",
  alto: "bg-black text-yellow-400 border-yellow-500",
};

const respuestaClases = {
  normal: "bg-white text-black border-green-700",
  oscuro: "bg-gray-800 text-white border-green-600",
  alto: "bg-black text-yellow-400 border-yellow-500",
};

const tituloClases = {
  normal: "text-[#165c36]",
  oscuro: "text-white",
  alto: "text-yellow-400",
};

const aumentar=()=>{

if(
zoom<150
){

setZoom(
prev=>prev+10
);

}

};

const disminuir=()=>{

if(
zoom>70
){

setZoom(
prev=>prev-10
);

}

};

const iniciarVoz=()=>{

if(
escuchando
){

if(
reconocimiento
){

reconocimiento.stop();

}

return;

}

const SpeechRecognition=

window.SpeechRecognition||

window.webkitSpeechRecognition;

if(
!SpeechRecognition
){

alert(
"Usa Google Chrome y permite micrófono"
);

return;

}

const rec=
new SpeechRecognition();

setReconocimiento(
rec
);

rec.lang=
"es-ES";

rec.continuous=
true;

rec.interimResults=
true;

rec.maxAlternatives=
1;

setEscuchando(
true
);

rec.start();

rec.onresult=
(event)=>{

let resultado="";

for(
let i=0;
i<
event.results.length;
i++
){

resultado+=
event
.results[i][0]
.transcript
+" ";

}

setTexto(
resultado
);

};

rec.onerror=
()=>{

setEscuchando(
false
);

};

rec.onend=
()=>{

setEscuchando(
false
);

};

};

const enviar=
async()=>{

if(
!texto.trim()
)return;

try{

setCargando(
true
);

const r=
await preguntarIA(
texto
);

setRespuesta(
r
);

const voz=

new SpeechSynthesisUtterance(
r
);

voz.lang=
"es-ES";

window
.speechSynthesis
.cancel();

window
.speechSynthesis
.speak(
voz
);

}
catch{

setRespuesta(
"Error al conectar con IA"
);

}
finally{

setCargando(
false
);

}

};

return(

<div

className={`
min-h-screen
${temaClases[tema] || temaClases.normal}
`}

style={{
zoom:
`${zoom}%`
}}

>

<header

className={`
flex
justify-between
items-start
px-8
py-4
${headerClases[tema]}
`}

>

<div

className={`
font-bold
text-2xl
${tema === "alto" ? "text-yellow-400" : tema === "oscuro" ? "text-white" : "text-[#165c36]"}
`}

>

❉ SINCA

</div>

<div

className="
flex
flex-col
items-end
gap-3
"

>

<button

onClick={()=>

navigate(
"/dashboard"
)

}

className={`
flex
gap-2
items-center
font-bold
${tema === "alto" ? "text-yellow-400" : tema === "oscuro" ? "text-white" : "text-[#165c36]"}
`}

>

<RiArrowLeftLine/>

Volver al Inicio

</button>

<div
className="
flex
gap-3
"
>

<button

onClick={
aumentar
}

className="
bg-green-700
text-white
px-4
py-2
rounded
"

>

A+

</button>

<button

onClick={
disminuir
}

className="
bg-red-600
text-white
px-4
py-2
rounded
"

>

A-

</button>

</div>

</div>

</header>

<div

className="
max-w-6xl
mx-auto
p-10
"

>

<h1

className={`
text-4xl
font-bold
mb-2
${tituloClases[tema]}
`}

>

Asistente IA

</h1>

{

escuchando && (

<div
className="
text-red-600
text-2xl
font-bold
mb-6
"
>

🎤 Escuchando...

</div>

)

}

<textarea

value={
texto
}

onChange={
(e)=>

setTexto(
e.target.value
)

}

placeholder="
Habla o escribe aquí tu pregunta...
"

className={`
w-full
h-[260px]
border-2
rounded-xl
p-8
text-3xl
shadow
resize-none
${textareaClases[tema]}
`}

/>

<div

className="
flex
gap-4
mt-6
"

>

<button

onClick={
iniciarVoz
}

className="
bg-blue-600
text-white
px-8
py-4
rounded
text-xl
flex
gap-3
items-center
"

>

<RiMicFill/>

{

escuchando

?

"Detener"

:

"Hablar"

}

</button>

<button

onClick={
enviar
}

disabled={
cargando
}

className="
bg-[#165c36]
text-white
px-8
py-4
rounded
"

>

{

cargando

?

"Pensando..."

:

"Enviar"

}

</button>

</div>

<div
className="
mt-10
"
>

<h2
className={`
text-3xl
font-bold
mb-4
${tituloClases[tema]}
`}
>

Respuesta

</h2>

<div

className={`
border-2
rounded-xl
p-8
text-2xl
min-h-[250px]
${respuestaClases[tema]}
`}

>

{

respuesta

||

"🔊 La respuesta aparecerá aquí..."

}

</div>

</div>

</div>

</div>

);

};

export default VoiceAssistant;