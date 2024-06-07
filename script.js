document.getElementById("select-opt").addEventListener("change", e => { atualizar(e) });

const $campoResposta = (function () { return document.getElementById("result-camp") })();
const $parOuImpar = (function () { return document.getElementById("sect-PXI") })();
const $primo = (function () { return document.getElementById("sect-PXC") })();
const $modulo = (function () { return document.getElementById("sect-MOD") })();
const $fatorar = (function () { return document.getElementById("sect-FAT") })();
const $mmc = (function () { return document.getElementById("sect-MMC") })();
const $mdc = (function () { return document.getElementById("sect-MDC") })();


const $btnParOuImpar = (function () { return document.getElementById("btn-PXI") })();
const $btnPrimo = (function () { return document.getElementById("btn-PXC") })();
const $btnModulo = (function () { return document.getElementById("btn-MOD") })();
const $btnFatorar = (function () { return document.getElementById("btn-FAT") })();
const $btnMmc = (function () { return document.getElementById("btn-MMC") })();
const $btnMdc = (function () { return document.getElementById("btn-MDC") })();


function atualizar(e) {
    try {
        let opt = e.target.value;

        $campoResposta.style.display = (opt != "") ? "block" : "none";
        $parOuImpar.style.display = (opt == "PXI") ? "block" : "none";
        $primo.style.display = (opt == "PXC") ? "block" : "none";
        $modulo.style.display = (opt == "MOD") ? "block" : "none";
        $fatorar.style.display = (opt == "FAT") ? "block" : "none";
        $mmc.style.display = (opt == "MMC") ? "block" : "none";
        $mdc.style.display = (opt == "MDC") ? "block" : "none";

        $campoResposta.value = "";

        document.querySelector("#inp-PXI").value = "";
        document.querySelector("#inp-PXC").value = "";
        document.querySelector("#inp-FAT").value = "";

    } catch (e) {
        exibiErro(e)
    }
}

function exibiErro(e) {
    console.log(e.message)
}


$btnParOuImpar.addEventListener('click', e => {
    try {
        input = document.querySelector("#inp-PXI");

        if(input.value == null || input.value.trim() == "" || input.value == undefined) {
            $campoResposta.value = "DIGITE UM VALOR"
        } else if (input.value > 99999999) {
            $campoResposta.value = "LIMITE DE 99999999 QUEBRADO, ESSE VALOR É MUITO GRANDE"
        } else {
            if(ehPar(input.value)) {
                $campoResposta.value = "NÚMERO PAR"
            } else {
                $campoResposta.value = "NÚMERO IMPAR"
            }
        }
    } catch (e) {
        alert(e.message);
    }
});

$btnPrimo.addEventListener('click', e => {
    try {
        input = document.querySelector("#inp-PXC");

        if(input.value == null || input.value.trim() == "" || input.value == undefined) {
            $campoResposta.value = "DIGITE UM VALOR"
        } else if (input.value > 99999999) {
            $campoResposta.value = "LIMITE DE 99999999 QUEBRADO, ESSE VALOR É MUITO GRANDE"
        } else {
            if(ehPrimo(input.value)) {
                $campoResposta.value = "NÚMERO PRIMO"
            } else {
                $campoResposta.value = "NÚMERO COMPOSTO"
            }
        }
    } catch (e) {
        alert(e.message);
    }
});

$btnFatorar.addEventListener('click', e => {
    try {
        input = document.querySelector("#inp-FAT");
        if(input.value == null || input.value.trim() == "" || input.value == undefined) {
            $campoResposta.value = "DIGITE UM VALOR"
        } else if (input.value > 99999999) {
            $campoResposta.value = "LIMITE DE 99999999 QUEBRADO, ESSE VALOR É MUITO GRANDE"
        } else {
            $campoResposta.value = (fatorar(input.value)).join(" x ");
        }
    } catch (e) {
        alert(e.message);
    }
});

$btnModulo.addEventListener('click', e => {
    try {
        input1 = document.querySelector("#inp-MOD");
        input2 = document.querySelector("#inp-MOD2");

        if(input1.value == null || input1.value.trim() == "" || input1.value == undefined 
        || input2.value == null || input2.value.trim() == "" || input2.value == undefined) {
            $campoResposta.value = "DIGITE UM VALOR"
        } else if (input1.value > 99999999 || input2.value > 99999999) {
            $campoResposta.value = "LIMITE DE 99999999 QUEBRADO, ALGUM VALOR É MUITO GRANDE"
        } else {
            $campoResposta.value = "O RESTO DA DIVISÃO (MÓDULO) É: " + mod(input1.value, input2.value)
        }
    } catch (e) {
        alert(e.message);
    }
});

$btnMmc.addEventListener('click', e => {
    try {
        input1 = document.querySelector("#inp-MMC");
        input2 = document.querySelector("#inp-MMC2");

        if(input1.value == null || input1.value.trim() == "" || input1.value == undefined 
        || input2.value == null || input2.value.trim() == "" || input2.value == undefined) {
            $campoResposta.value = "DIGITE UM VALOR"
        } else if (input1.value > 99999999 || input2.value > 99999999) {
            $campoResposta.value = "LIMITE DE 99999999 QUEBRADO, ALGUM VALOR É MUITO GRANDE"
        } else {
            $campoResposta.value = calcularMMC(input1.value, input2.value)
        }
    } catch (e) {
        alert(e.message);
    }
});

$btnMdc.addEventListener('click', e => {
    try {
        input1 = document.querySelector("#inp-MDC");
        input2 = document.querySelector("#inp-MDC2");

        if(input1.value == null || input1.value.trim() == "" || input1.value == undefined 
        || input2.value == null || input2.value.trim() == "" || input2.value == undefined) {
            $campoResposta.value = "DIGITE UM VALOR"
        } else if (input1.value > 99999999 || input2.value > 99999999) {
            $campoResposta.value = "LIMITE DE 99999999 QUEBRADO, ALGUM VALOR É MUITO GRANDE"
        } else {
            $campoResposta.value = calcularMDC(input1.value, input2.value)
        }
    } catch (e) {
        alert(e.message);
    }
});

function fatorar(num) {
    let resp = [];

    if (num <= 0) {
        throw new Erro("Digite um número");
    }

    while (num != 1) {

        for (let i = 2; i <= num; i++) {
            let num2 = fatorarAux(num, i);

            if (num2 != num) {
                num = num2;
                resp.push(i);
                i = 1;
            }
        }
    }

    return resp;
}

function fatorarAux(n, i) {
    if (n % i == 0) {
        n = n / i;
    }
    return n;
}




function ehPar(num) {
	return (num % 2 == 0);
}	

function mod(a, b) {
	return a % b;
}

function ehPrimo(num) {
    if(num <= 1) return false; 
    for (var i = 2; i < num; i++) 
    if (num % i == 0) return false;
    return true;
}

function calcularMDC(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function calcularMMC(a, b) {
    let resto;
    let x = a;
    let y = b;
    while(resto != 0){
      resto = x % y;
      x = y;
      y = resto;
    }
    return (a * b) / x;
};