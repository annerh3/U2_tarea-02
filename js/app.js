// esta funcion la llamaré (o ya he llamado) en diferentes partes del codigo, para actualizar la lista en cada accción (actualizar la visualización de las notas en la página)
function mostrarNotas() {  
  let notasContainer = document.getElementById("notasContainer");
  notasContainer.innerHTML = ''; //  se limpia el contenido para asegurarse de que esté vacio antes de agregar las nuevas notas.

  let notas = localStorage.getItem("notas") ? JSON.parse(localStorage.getItem("notas")) : [];
  notas.forEach((nota, index) => { // Iterar sobre las notas y obtener el índice
      let notaElement = document.createElement("p");
      notaElement.textContent = `Nota ${index + 1}: ${nota}`;
      notasContainer.appendChild(notaElement);  // agrega un nuevo elemento como hijo de notasContainer
  });
}


// ----------- INICIO SECCION CREAR_NOTA ----------- //
function guardarNota() 
{
  let inputBuscarNotaTxt = document.getElementById("buscarNotaTxt"); // ignorar (limpia el textbox del cuadro del centro)
  inputBuscarNotaTxt.value = ''; // ignorar
  
  let nota = document.getElementById("escribirNota").value;
    if(nota === ''){
      alert('Caja Vacia. Ingrese texto.')
    }else{
      // recuperar las notas guardadas del localStorage, o inicializar un arreglo vacio si no hay ninguna nota guardada
      let notasGuardadas = localStorage.getItem("notas") ? JSON.parse(localStorage.getItem("notas")) : []; // condición ? valor verdadero : valor falso;
                          // apartar espacio
                           // JSON.parse(localStorage.getItem("notas")) = se parsea el JSON devuelto para convertirlo en un objeto JavaScript                                              
      notasGuardadas.push(nota); 

      localStorage.setItem("notas", JSON.stringify(notasGuardadas)); // Guardar el arreglo actualizado de notas en el localStorage, convirtiéndolo a formato JSON
        let input = document.getElementById("escribirNota");  // Limpiar el campo de entrada para que esté listo para la próxima nota
        input.value = '';
      
        alert("Nota Guardada");
        mostrarNotas();
    }
}
// Dar click en ENTER desde escribirNota para guardar nota. 
document.getElementById("escribirNota").addEventListener("keypress", function(event) 
{ if (event.key === "Enter" && !event.shiftKey) 
  {   event.preventDefault();
      guardarNota(); 
  }
}                                                       );
/***********************  FIN DE SECCION CREAR_NOTA  ***********************************  */


// ----------- INICIO SECTION SECTION_BUSCAR_NOTA ----------- //
document.getElementById("buscarNotaTxt").addEventListener("keypress", function(event)  // dar click en ENTER desde buscarNotaTxt para buscar nota
{
  if (event.key === "Enter") 
  {   event.preventDefault();
      console.log('Desde el eventListener ENTER (fuera de funcion)');
      mostrarContenidoPorIndice(); 
  }
});

function mostrarContenidoPorIndice() // funcion para BUSCAR nota (usando la posicion en el arreglo)
{
  let notaBuscadaPorUsuario =  document.getElementById("buscarNotaTxt").value;
  if(notaBuscadaPorUsuario === '')
  {
    alert('Caja Vacia. Ingrese el número de la Nota a buscar.')
  } else{
            let indice = parseInt(notaBuscadaPorUsuario - 1);
            let notas = localStorage.getItem("notas") ? JSON.parse(localStorage.getItem("notas")) : [];

            if (indice >= 0 && indice < notas.length) //verificar si existe esa nota
            {
              let elementoEspecifico = notas[indice];
              alert(`La nota ${notaBuscadaPorUsuario} dice:\n\n "${elementoEspecifico}"`);
              console.log('Desde la funcion. al hacer CLICK en btnBuscar');
            } else {
                    alert("Esta Nota No Existe.");
                   }
         }
}


function eliminarNotaPorIndice() // funcion ELIMINAR una nota en especifica (usando la posicion en el arreglo)
{     
      let notaAEliminar = document.getElementById("buscarNotaTxt").value;
      // Verificar si el campo buscarNotaTxt está vacío
      if (notaAEliminar === '') {
          alert("Por favor ingresa número de la nota que desea eliminar.");
          return; // salir de la funcion sin ejecutar el resto del codigo
      }
              // verificar si el numero ingresado por el usuario existe en el indice del arreglo.
              let indice = parseInt(notaAEliminar - 1);
              let notas = localStorage.getItem("notas") ? JSON.parse(localStorage.getItem("notas")) : [];
                  if (indice < 0 || indice >= notas.length) 
                  {
                    alert("Esta Nota No Existe.");
                    mostrarNotas();
                    return;
                  }
      let preguntaAlUsuario = parseInt(prompt(`¿Está seguro de eliminar esta nota?\n0. NO.\n1. Si.`))

      switch (preguntaAlUsuario) 
        {  case 1:   const indice = parseInt(notaAEliminar-1); // convrtir la nota a eliminar a un numero entero (-1 para coincidir con lo que hay en html)

                    let notas = localStorage.getItem("notas") ? JSON.parse(localStorage.getItem("notas")) : [];
                    if (indice >= 0 && indice < notas.length) 
                    {   notas.splice(indice, 1); // eliminar el elemento específico del arreglo utilizando el metodo splice  [  .splice(indice, numero de elementos despues del indice)   ]
                        
                        localStorage.setItem("notas", JSON.stringify(notas)); // guardar el arreglo actualizado en el localStorage
                        
                        alert(`La nota ${notaAEliminar} fue eliminada correctamente. Presione OK para actualizar lista.`)
                        mostrarNotas();
                        return;
                    }
                      break;
          case 0: alert("Cancelado...")
                  break;
          default: alert('Opción no válida.');
                  break;
        }
     
      return;
}

function editarNota()  // funcion para editar nota en especifico (usando la posicion en el arreglo)
{ let notaA_editar = document.getElementById('buscarNotaTxt').value;
  if (notaA_editar === '') {
    alert("Por favor, ingrese un número de la nota que desea editar.");
    return; // salir de la funcion sin ejecutar el resto del codigo
  }
  let indice = parseInt(notaA_editar - 1);
  let notas = localStorage.getItem("notas") ? JSON.parse(localStorage.getItem("notas")) : [];
      if (indice < 0 || indice >= notas.length) 
      { alert("Esta Nota No Existe.");
        mostrarNotas();
        return;
      }
  let preguntaAlUsuario = parseInt(prompt(`¿Está seguro que quiere editar esta nota?\n0. NO.\n1. Si.`))
  switch (preguntaAlUsuario) 
  { case 1:      let nuevaNota = prompt("Ingrese la nueva nota:");
                  if (nuevaNota === null || nuevaNota.trim() === '') {
                      alert("La nota no puede estar vacía. Operación cancelada.");
                      return;
                  }
                  notas[indice] = nuevaNota; // Modificar la nota en el arreglo
                  localStorage.setItem("notas", JSON.stringify(notas)); // actualizar el arreglo en el localStorage

                  alert(`La nota ${notaA_editar} fue editada correctamente. Presione OK para actualizar lista.`);
                  mostrarNotas(); // actualizar la visualización de las notas en la página
                  return;  
    case 0: alert("Cancelado...")
            break;
    default: alert('Opción no válida.');
             break;
  }
mostrarNotas();
}
/***********************  FIN SECTION SECTION_BUSCAR_NOTA  ***********************************  */


// ----------- INCIO ASIDE LISTA_NOTAS ----------- //
const btnEliminarTodo = document.getElementById('btnEliminarTodo');
btnEliminarTodo.addEventListener('click', clickbtnEliminarTodo)

function clickbtnEliminarTodo() {
  let inputBuscarNotaTxt = document.getElementById("buscarNotaTxt");  // ignorar (limpia el textbox del cuadro del centro)
  inputBuscarNotaTxt.value = '';

  let preguntaAlUsuario = parseInt(prompt(`¿Está seguro de eliminar todas las notas? Esto es algo permanente.\n0. NO.\n1. Si.`))

      switch (preguntaAlUsuario) 
        { case 1:   localStorage.clear();
                    mostrarNotas();
                    break;
          case 0: alert("Cancelado...")
                  break;
          default: alert('Opción no válida.');
            break;
        }
  return;
}
/***********************  FIN DE ASIDE LISTA_NOTAS  ***********************************  */
//para asegurarse de que la función mostrarNotas(); se ejecute cuando la pagina se haya cargado completamente...
window.onload = mostrarNotas; // ...se logra utilizando el evento 'window.onload'