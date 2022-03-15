"use strict";

//selecionando elementos
let x = document.querySelector(".x");
let o = document.querySelector(".o");
//selecionado todas as grades
let boxes = document.querySelectorAll(".box");
//selecionando os botoes
let buttons = document.querySelectorAll("button");
//selecionando o conteiner de mensagens
let messageContainer = document.querySelector("#message");
//selecionando o paragrafo que mostra a mensagem
let messageText = document.querySelector("#message p");
//variavel que controla o tipo de jogo escolhido
let secondPlayer;
  
//contador de jogadas
let player1 = 0;
let player2 = 0;

//adicionando o evento de click a  todas as grades
for(let i =0; i< boxes.length;i++){
    //quando alguma grade for clicada
    boxes[i].addEventListener("click", function(){
    
    let el = checkEl(player1,player2);

    //verifica se já tem x ou o
     if(this.childNodes.length == 0){
      //clonando o elemnto
      let clone = el.cloneNode(true);
      //adicionando o elemento as grades
      this.appendChild(clone);

      //compuatando a jogada
       if(player1 == player2){
           player1++;
       }
       else{
        player2++;
      }
        if(secondPlayer == "ai-player"){
            //funcão  que executa a jogada
            computerPlay();
            player2++;
        } 
         //identificando o vencedor
         getWinCondition();
     }
    
    })
}

// evento para saber se é 2 player ou IA
for(let i = 0; i < buttons.length;i++){
    
    buttons[i].addEventListener("click", function(){

        secondPlayer = this.getAttribute("id");

        //escondendo dos butoes
        for(let j = 0; j < buttons.length;j++){
            buttons[j].style.display = "none";
        }

        setTimeout(function(){
            let container = document.querySelector("#container");
            container.classList.remove("hide");
        },500)
    });
}

//Identifica o Elemento
function checkEl(player1,player2){
    let el;
    if(player1 == player2){
        // x
       el = x; 
    }else{
        // o
        el = o;
    }
     return el;
}
//ve quem venceu
function getWinCondition(){
    let b1 = document.querySelector("#block-1");
    let b2 = document.querySelector("#block-2");
    let b3 = document.querySelector("#block-3");
    let b4 = document.querySelector("#block-4");
    let b5 = document.querySelector("#block-5");
    let b6 = document.querySelector("#block-6");
    let b7 = document.querySelector("#block-7");
    let b8 = document.querySelector("#block-8");
    let b9 = document.querySelector("#block-9");
    
    //horizontal
    // checa o vencedor da 1 linha da horizontal
    checkLineWin(b1,b2,b3);
    //checa o vencedor da 2 linha da horizontal
    checkLineWin(b4,b5,b6);
   //checa o vencedor da 3 linha da horizontal
    checkLineWin(b7,b8,b9);
   //vertical
    //vertical o vencedor da 1 linha da vertical
    checkLineWin(b1,b4,b7);
   //vertical o vencedor da 2 linha da vertical
    checkLineWin(b2,b5,b8);
   //vertical o vencedor da 3 linha da vertical
    checkLineWin(b3,b6,b9);
   //diagonal
   // diagonal esquerda
    checkLineWin(b1,b5,b9);
   //diagonal direita
    checkLineWin(b3,b5,b7);

   // verificar se o jogo deu empate
   verificadorEmpate();
   
}

//pegando o vencedor da primeira linha da horizontal
function checkLineWin(b1,b2,b3){
    //pegando os filhos das grades
   let b1tm = b1.childNodes.length;
   let b2tm = b2.childNodes.length;
   let b3tm = b3.childNodes.length;
    
     if(b1tm > 0 && b2tm >0 && b3tm >0){
    //pegando as classes dos filhos das grades
    let b1Child = b1.childNodes[0].className;
    let b2Child = b2.childNodes[0].className; 
    let b3Child = b3.childNodes[0].className;

    if(b1Child == "x" && b2Child == "x" && b3Child == "x"){
         declareWinner("x");
      }     
    else if(b1Child == "o" && b2Child == "o" && b3Child == "o"){
        declareWinner("o");
       } 
    } 
}

//ve se deu empate
function verificadorEmpate(){
    let counter =0;
   for(let i = 0; i< boxes.length;i++){
       if(boxes[i].childNodes[0] != undefined)
       counter++;
   }
   if(counter ==9){
     declareWinner("Deu empate");
   }
   
}

//limpa o jogo, declara o vencedor e atualiza o placar
function declareWinner(winner){
    //selecionando dos placares
    let scoreboardx = document.querySelector("#scoreboard-1");
    let scoreboardy = document.querySelector("#scoreboard-2");
    //variavel que controla as mensagens
    let msg = "";

    if(winner == "x"){
        scoreboardx.textContent = parseInt(scoreboardx.textContent) + 1;
        msg = "O jogador 1 Venceu!";
    } else if(winner == "o"){
        scoreboardy.textContent = parseInt(scoreboardy.textContent) + 1;
        msg = "O jogador 2 venceu!";
    } else{
        msg = "Deu empate!";
    }

    //mostra mensagem
    messageText.innerHTML = msg;
    //esse metodo serve para remover as classes de um elemento 
    messageContainer.classList.remove("hide");
    //esconde mensagem
    setTimeout(function(){
      //adiciona a classe hide ao elemento  
      messageContainer.classList.add("hide");
    },2000)

    //zera as jogadas
    player1 =0
    player2 =0;  

    //limpando as grades
    let boxesRemove = document.querySelectorAll(".box div");
    for(let i = 0;i <boxesRemove.length; i++){
        boxesRemove[i].parentNode.removeChild(boxesRemove[i]);
    }
}

//executa a lógica da jogada CPU
function computerPlay(){
     let cloneO = o.cloneNode(true);
     let cont =0;
     let filled =0;

     for( let i = 0; i < boxes.length;i++){
        let aleatorio = Math.floor(Math.random() * 5);
        //só prencher se estiver vazio o filho
        if(boxes[i].childNodes[0] == undefined){
            
            if(aleatorio <= 1){
                boxes[i].appendChild(cloneO);
                cont++
                break;
            }
        } else
          filled++;
     }
 //verifica quantas grades estao preenchidas
  if(cont == 0 && filled < 9){
      computerPlay();
  }
  //zerando a jogadas
  player1 =0;
  player2 =0;

}