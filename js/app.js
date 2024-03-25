function guardarNota() {
    let nota = document.getElementById("escribirNota").value;
    if(nota === ''){
      alert('Caja Vacia. Ingrese texto.')
    }else{
      // Recuperar las notas guardadas del localStorage, o inicializar un arreglo vacío si no hay ninguna nota guardada
      let notasGuardadas = localStorage.getItem("notas") ? JSON.parse(localStorage.getItem("notas")) : []; // condición ? valor verdadero : valor falso;
  
  /*let notasGuardadas = localStorage.getItem("notas");              
    if (!notasGuardadas) { // si notasGuardadas es null, undefined, 0, false, NaN, o una cadena de longitud cero (''), entonces !notasGuardadas será true
        notasGuardadas = []; // Inicializar un arreglo vacío si no hay ninguna nota guardada
        } else {
          notasGuardadas = JSON.parse(notasGuardadas);  // Convertir las notas guardadas de JSON a un arreglo
    }*/

      notasGuardadas.push(nota); // Agregar la nueva nota al arreglo de notas guardadas
        localStorage.setItem("notas", JSON.stringify(notasGuardadas)); // Guardar el arreglo actualizado de notas en el localStorage, convirtiéndolo a formato JSON
    // Limpiar el campo de entrada para que esté listo para la próxima nota
        let input = document.getElementById("escribirNota"); 
        input.value = '';
        alert("Nota Guardada");
        mostrarNotas();
    }
}
// Dar click en ENTER para guardar nota. 
document.getElementById("escribirNota").addEventListener("keypress", function(event) {
  if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      guardarNota(); 
  }
});

const btnEliminarTodo = document.getElementById('btnEliminarTodo');
btnEliminarTodo.addEventListener('click', clickbtnEliminarTodo)

function clickbtnEliminarTodo() {
  localStorage.clear();
  mostrarNotas(); 
}


function mostrarNotas() {
  let notasContainer = document.getElementById("notasContainer");
  notasContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar las nuevas notas

  let notas = localStorage.getItem("notas") ? JSON.parse(localStorage.getItem("notas")) : [];
  notas.forEach((nota, index) => { // Iterar sobre las notas y obtener el índice
      let notaElement = document.createElement("p");
      notaElement.textContent = `Nota ${index + 1}:${nota}`; // Agregar el índice y el contenido de la nota
      notasContainer.appendChild(notaElement);
  });
}


document.addEventListener('DOMContentLoaded', function() {
  mostrarNotas(); // Llamar a mostrarNotas una vez que el DOM esté completamente cargado
});