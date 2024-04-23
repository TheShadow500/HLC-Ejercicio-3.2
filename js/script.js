// Inicializacion
let horaDiurna = 10;            // Hora Diurna
let horaNocturna = 13.5;        // Hora Nocturna
let suplementoDiurno = 1.10;    // Porcentaje Suplemento Hora Diurna
let suplementoNocturno = 1.15;  // Porcentaje Suplemento Hora Nocturna

let horaDiurnaFestivo = (horaDiurna * suplementoDiurno);       // Tarifa Diurna Festivo
let horaNocturnaFestivo = (horaNocturna * suplementoNocturno); // Tarifa Nocturna FeSTIVO

// Actualizar Información en pantalla para el cliente
obtenerHonorarios();

// Activar función del boton
const boton = document.getElementById("calcular");
boton.addEventListener("click", function(){
    let dia = document.getElementById("dia").value;
    let horas = document.getElementById("horas").value;
    
    let turnoselected = document.getElementsByName("turno");
    let turno;
    for(let i = 0; i < turnoselected.length; i++){
        if(turnoselected[i].checked){
            turno = turnoselected[i].value;
        }
    }
    
    let tiposelected = document.getElementsByName("tipo");
    let tipo;
    for(let i = 0; i < tiposelected.length; i++){
        if(tiposelected[i].checked){
            tipo = tiposelected[i].value;
        }
    }
    diadetrabajo(horas, turno, tipo, dia);
});

// Activar función del select de días
const domingo = document.getElementById("dia");
const tipodesactivado = document.querySelectorAll("input[name='tipo']");
domingo.addEventListener("change", function(){
    if(domingo.value == "Domingo"){
        tipodesactivado.forEach(function(radiobutton){
            radiobutton.disabled = true;
        })
    }
    else{
        tipodesactivado.forEach(function(radiobutton){
            radiobutton.disabled = false;
        })
    }
});

// Calcular total
function diadetrabajo(horas, turno, tipo, dia){
    let total;
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("errorNombre").innerHTML = "";

    if(document.getElementById("nombre").value === ""){
        errorNombre();
    }
    else{
        if(turno == "diurno"){
            (tipo == "festivo" || dia == "Domingo") ? (total = horas * horaDiurnaFestivo) : (total = horas * horaDiurna);
        }
        else{
            (tipo == "festivo" || dia == "Domingo") ? (total = horas * horaNocturnaFestivo) : (total = horas * horaNocturna);
        }

        mostrarHonorarios(total);
    }
}

// Mostrar error de no haber introducido el nombre
function errorNombre(){
    document.getElementById("errorNombre").innerHTML = "";
    let errorNombre = document.createElement("div");
    errorNombre.innerHTML = "DEBE INTRODUCIR EL NOMBRE DEL TRABAJADOR";
    document.getElementById("errorNombre").appendChild(errorNombre);
}

// Mostrar la tarifa diaria en pantalla
function obtenerHonorarios(){
    document.getElementById("honorarios").innerHTML = "";
    let honorarios = document.createElement("div");
    honorarios.innerHTML = "HONORARIOS PARA HOY<br>Hora Diurna: <b>" + horaDiurna.toFixed(2) + "€</b> (festivos: <b>" + horaDiurnaFestivo.toFixed(2) + "€</b>)<br>Hora Nocturna: <b>" + horaNocturna.toFixed(2) + "€</b> (festivos: <b>" + horaNocturnaFestivo.toFixed(2) + "€</b>)";
    document.getElementById("honorarios").appendChild(honorarios);
}

// Mostrar total a pagar en pantalla
function mostrarHonorarios(total){
    document.getElementById("resultado").innerHTML = "";
    let resultado = document.createElement("div");
    resultado.innerHTML = "TOTAL A PERCIBIR: <b>" + total.toFixed(2) + "€";
    document.getElementById("resultado").appendChild(resultado);
}