const tanque1 = document.getElementById("tanque1");
const tanque2 = document.getElementById("tanque2");
const tanque3 = document.getElementById("tanque3");
const tanque4 = document.getElementById("tanque4");
const tanque5 = document.getElementById("tanque5");
const tanque6 = document.getElementById("tanque6");
const tanque7 = document.getElementById("tanque7");
const relogio = document.getElementById("relogio");

horas_finais = {
    finalTanque1: null,
    finalTanque2: null,
    finalTanque3: null,
    finalTanque4: null,
    finalTanque5: null,
    finalTanque6: null,
    finalTanque7: null,
}

function executaAudio(){
    bip = new Audio("alert/bip.mp3")
    bip.play();
}

function confereHora(){
    let hora_atual = new Date();
    let hora_atual_formatada = hora_atual.toTimeString().slice(0, 8)
    for(i = 0; i < 7; i++){
        if(!horas_finais[i] == []){
            if(horas_finais[i][0] == hora_atual_formatada || horas_finais[i][0] < hora_atual_formatada){
                executaAudio();
                horas_finais[i][1].style.backgroundColor = "red"
                horas_finais[i][2].innerHTML = ""
                horas_finais[i][2].innerHTML = "RESETAR"
                horas_finais[i] = null
            }
        }
    }
    relogio.innerHTML = "";
    relogio.innerHTML = hora_atual_formatada;
}

function iniciar(tanque){
    let tempo_final = tanque.querySelector(".t");
    let tempo_inicial = tanque.querySelector(".i");
    let select = tanque.querySelector("select");

    tempo_final.style.backgroundColor = "#00FF00";

    let hora_select = new Date();
    let value_select = select.options[select.selectedIndex].value;
    console.log(value_select)
    let split_value_select = value_select.split(":");
    hora_select.setHours(parseInt(split_value_select[0]));
    hora_select.setMinutes(parseInt(split_value_select[1]));
    hora_select.setSeconds(parseInt(split_value_select[2]));
    console.log(hora_select)
    
    let hora_inicial = new Date();
    let split_tempo_inicial = tempo_inicial.value.split(":");
    let h_inicial = parseInt(split_tempo_inicial[0]);
    let m_inicial = parseInt(split_tempo_inicial[1]);
    let s_inicial = parseInt(split_tempo_inicial[2])
    hora_inicial.setHours(h_inicial);
    hora_inicial.setMinutes(m_inicial);
    hora_inicial.setSeconds(s_inicial)

    let hora_final = new Date();
    hora_final.setHours(hora_inicial.getHours() + hora_select.getHours());
    hora_final.setMinutes(hora_inicial.getMinutes() + hora_select.getMinutes());
    hora_final.setSeconds(hora_inicial.getSeconds() + hora_select.getSeconds());

    if(tempo_inicial.value != ""){
        if(tempo_final.value === ""){
            tempo_final.value = `${hora_final.toTimeString().slice(0, 8)}`
        }
        else{
            tempo_final.value = ""
            tempo_final.value = `${hora_final.toTimeString().slice(0, 8)}`
        }
    }

    let index = parseInt(tanque.id.slice(6) - 1);
    let botao_cancelar = tanque.querySelector(".cancelar");

    horas_finais[index] = [hora_final.toTimeString().slice(0, 8), tempo_final, botao_cancelar];
    tempo_inicial.setAttribute('disabled', '');
}

function salvarEnter(tanque){
    let tempo_inicial = tanque.querySelector(".i");
    tempo_inicial.onfocus = ()=>{
        let hora_atual = new Date();
        let hora_atual_formatada = hora_atual.toTimeString().slice(0, 8)
        tempo_inicial.value = hora_atual_formatada
        tempo_inicial.addEventListener("keydown", (e)=>{
            if(e.key === "Enter"){
                iniciar(tanque);
                confereHora();
            }
        });
    }
}

function eventosBotoes(tanque){

    let botaoIniciar = tanque.querySelector(".iniciar");
    salvarEnter(tanque);
    botaoIniciar.addEventListener("click", ()=>{
        iniciar(tanque);
        confereHora();
    })

    let botaoCancelar = tanque.querySelector(".cancelar");

    botaoCancelar.addEventListener("click", ()=>{
        tempo_inicial = tanque.querySelector(".i");
        tempo_final = tanque.querySelector(".t");
        tempo_inicial.value = "";
        tempo_final.value = "";
        tempo_final.style.backgroundColor = "white";
        if(botaoCancelar.innerHTML == "RESETAR"){
            botaoCancelar.innerHTML = "";
            botaoCancelar.innerHTML = "CANCELAR";
        }
        tempo_inicial.removeAttribute('disabled');
    });
}



eventosBotoes(tanque1);
eventosBotoes(tanque2);
eventosBotoes(tanque3);
eventosBotoes(tanque4);
eventosBotoes(tanque5);
eventosBotoes(tanque6);
eventosBotoes(tanque7);


controle_de_tempo = setInterval(()=>{
    confereHora()    
}, 1000);