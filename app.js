
//#region Definições gerais

const vogais = {
  'a': 'AI',
  'e': 'ENTER',
  'i': 'IMES',
  'o': 'OBER',
  'u': 'UFAT',
};

const vogaisEncriptadas = {
  'ai': 'a',
  'enter': 'e',
  'imes': 'i',
  'ober': 'o',
  'ufat': 'u',
};

const tipoNotificacao ={
  'Aviso' : 1,
  'Erro': 2,
};

//#endregion

//#region Funções

function encriptaTexto(){
  
  let textoDigitado = document.querySelector('input').value;

  if(inputEstaVazio(textoDigitado)){
    exibirNotificacao(1, 'Aviso', 'Antes de encriptar, informe um valor!');
  }

  else{
    if(existeLetraMaiusculaOuCaracterEspcial(textoDigitado)){    
      exibirNotificacao(2, 'Erro', 'Não é possível encriptar com letras maiúsculas ou caracteres especiais!');
    }
    else{
      let textoEncriptado = textoDigitado;  

      for (let letra in vogais) {
        if (textoEncriptado.toLowerCase().includes(letra)) {
          textoEncriptado = textoEncriptado.replace(new RegExp(letra, 'g'), vogais[letra]);
        }
      }
      exibirTextoEncriptado(textoEncriptado.toLowerCase());
    }
  }
}

function desencriptaTexto(){
  let textoEncriptado = document.querySelector('input').value;

  if(inputEstaVazio(textoEncriptado)){
    exibirNotificacao(1, 'Aviso', 'Antes de desencriptar, informe um valor!');
  }

  else{
    if(existeLetraMaiusculaOuCaracterEspcial(textoEncriptado)){    
      exibirNotificacao(2, 'Erro', 'Não é possível desencriptar com letras maiúsculas ou caracteres especiais!');
    }
    else{  
      let textoDesencriptado = textoEncriptado;
    
      for (let letraEncriptada in vogaisEncriptadas) {
        if (textoDesencriptado.includes(letraEncriptada)) {
          textoDesencriptado = textoDesencriptado.replace(new RegExp(letraEncriptada, 'g'), vogaisEncriptadas[letraEncriptada]);
        }
      }
      exibirTextoEncriptado(textoDesencriptado);
    }     
  }
}

function copiaTextoAreaDeTrabalho(){  
  let textoEncriptado = document.getElementById('idLabelEncriptado').textContent;

  if(textoEncriptado == 'Sua encriptação aqui'){
    exibirNotificacao(1, 'Aviso', 'Não é possível copiar, informe um valor!');
  }
  else{
    navigator.clipboard.writeText(textoEncriptado);
    var notificacao = document.getElementById("idNotificacaoCopiado");
    notificacao.style.display = "block";

    setTimeout(function() {
        notificacao.style.display = "none";
    }, 2500);
  }  
}

function existeLetraMaiusculaOuCaracterEspcial(textoDigitadoOuEncriptado){
  return (/[A-Z-À-ÖØ-öø-ÿ]/.test(textoDigitadoOuEncriptado) || /[~!@"#$%^&*(),.?´':{}|<>]/.test(textoDigitadoOuEncriptado));
}

function inputEstaVazio(textoDigitadoOuEncriptado){
  if(!/[A-Z-a-z-à-ö-ø-ÿ~!@#$%"^&*(),´.?':{}|<>]/.test(textoDigitadoOuEncriptado)){
    return true;
  }
  return false;
}

function exibirNotificacao(numeroTipoNotificacao, tituloNotificacao, textoNotificacao){

  let cardNotificacao = document.getElementById("idnotificacaoAlertaErro");
  let titulo = document.querySelector('h3');  
  let texto = document.querySelector('p');

  titulo.innerHTML = tituloNotificacao;
  texto.innerHTML =  textoNotificacao;

  //Customização das caixas de diálogo
  //Obs: Foi notado que as expressões aqui definidas sobrescrevem o css raiz
  if(numeroTipoNotificacao === tipoNotificacao.Aviso){    
    cardNotificacao.style.opacity = "1";
    cardNotificacao.style.backgroundColor = '#f6c635b9';
    setTimeout(function() {
      cardNotificacao.style.top = "10%"; 
      cardNotificacao.style.opacity = "0";
    }, 4000);
  }

  if (numeroTipoNotificacao === tipoNotificacao.Erro){
    cardNotificacao.style.opacity = "1";
    cardNotificacao.style.backgroundColor = '#ff000064';
    setTimeout(function() {
      cardNotificacao.style.top = "10%"; 
      cardNotificacao.style.opacity = "0";
    }, 4500);
  }
}

function exibirTextoEncriptado(textoEncriptadoDesencriptado) {
    document.querySelector('label').textContent = textoEncriptadoDesencriptado;
}

//#endregion