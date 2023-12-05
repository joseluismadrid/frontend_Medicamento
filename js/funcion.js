// const url = 'http://localhost:8081/medicamento'
const url= 'https://api-medicamento.onrender.com/medicamento'
const regresarListar = () => {
    window.location.href = 'index.html';
}

const listaMedicamento = async () => {
    let objetId = document.getElementById('contenido')
    let contenido = ''

    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: { "Content-type": "appication/json; charset=UFT-8" }
    })
        .then((res) => res.json())
        .then(function (info) {
            let listaMedicamento = info.msg
            // console.log('listaMedicamento')
            listaMedicamento.map(function (medicamento) {
                objetoMedicamento = Object.keys(medicamento).map(key => key + '=' + encodeURIComponent(medicamento[key])).join('&')
                // console.log(medicamento)
                contenido = contenido + `<tr>` +
                    `<td>` + medicamento.idMedicamento + `</td>` +
                    `<td>` + medicamento.nombre + `</td>` +
                    `<td>` + medicamento.stock + `</td>` +
                    `<td>` + medicamento.medicion + `</td>` +
                    `<td>` + medicamento.gramaje + `</td>` +
                    `<td><button type="button" onclick="redireccionarEditar('${objetoMedicamento}')" class="btn btn-primary" >Editar</button>
                   <button type="button" onclick=" confirmarEliminar('${medicamento.idMedicamento}')"" class="btn btn-danger">Eliminar</button></td>` +
                    `</tr>`
            })
            objetId.innerHTML = contenido
        })

}
const registrarMedicamento = () => {
    const ids = document.getElementById('id').value
    const nombres = document.getElementById('nombre').value
    const stocks = document.getElementById('stock').value
    const mediciones = document.getElementById('medicion').value
    const gramajes = document.getElementById('gramaje').value

    if (ids.length == 0) {
        document.getElementById('idhelpId').innerHTML = 'Dato requerido'
    }
    if (nombres.length == 0) {
        document.getElementById('nombrehelpId').innerHTML = 'Dato requerido'
    }
    if (stocks.length == 0) {
        document.getElementById('stockhelpId').innerHTML = 'Dato requerido'
    } else if (stocks < 0) {
        document.getElementById('stockhelpId').innerHTML = 'Dato requerido'
    }
    if (mediciones.length == 0) {
        document.getElementById('mediciohelpId').innerHTML = 'Dato requerido'
    }
    if (gramajes.length == 0) {
        document.getElementById('gramajehelpId').innerHTML = 'Dato requerido'
    } else {
        let Medicamento = {
            idMedicamento: ids,
            nombre: nombres,
            stock: stocks,
            medicion: mediciones,
            gramaje: gramajes
        }
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(Medicamento),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then((res) => res.json())
            .then(json => {
                setTimeout(() => {
                    regresarListar();
                }, 1000);
            })


    }


}
const actualizarMedicamento = () => {
    const ids = document.getElementById('id').value
    const nombres = document.getElementById('nombre').value
    const stocks = document.getElementById('stock').value
    const mediciones = document.getElementById('medicion').value
    const gramajes = document.getElementById('gramaje').value

    if (ids.length == 0) {
        document.getElementById('idhelpId').innerHTML = 'Dato requerido'
    }
    if (nombres.length == 0) {
        document.getElementById('nombrehelpId').innerHTML = 'Dato requerido'
    }
    if (stocks.length == 0) {
        document.getElementById('stockhelpId').innerHTML = 'Dato requerido'
    } else if (stocks < 0) {
        document.getElementById('stockhelpId').innerHTML = 'Dato requerido'
    }
    if (mediciones.length == 0) {
        document.getElementById('mediciohelpId').innerHTML = 'Dato requerido'
    }
    if (gramajes.length == 0) {
        document.getElementById('gramajehelpId').innerHTML = 'Dato requerido'
    } else {
        let Medicamento = {
            idMedicamento: ids,
            nombre: nombres,
            stock: stocks,
            medicion: mediciones,
            gramaje: gramajes
        }
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(Medicamento),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then((res) => res.json())
            .then(json => {
                setTimeout(() => {
                    regresarListar();
                }, 1000);
            })


    }


}
const redireccionarEditar = (medicamento) => {
    document.location.href = "editar.html?medicamentos" + medicamento
}
const editarMedicamento = () => {
    var urlparams = new URLSearchParams(window.location.search);
    document.getElementById('id').value = urlparams.get('idMedicamento')
    document.getElementById('nombre').value = urlparams.get('nombre')
    document.getElementById('stock').value = urlparams.get('stock ')
    document.getElementById('medicion').value = urlparams.get('medicion')
    document.getElementById('gramaje').value = urlparams.get('gramaje')
}
const eliminarMedicamento = async (idMedicamento) => {
    try {
        const deleteUrl = `${url}`;  // Solo la ruta base, ya que el ID irá en el cuerpo de la solicitud

        const response = await fetch(deleteUrl, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({ idMedicamento })  // Incluye el ID en el cuerpo de la solicitud
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar. Código de respuesta: ${response.status}`);
        }

        const json = await response.json();
        alert(json.msg)
        setTimeout(() => {
            regresarListar();
        }, 1000);


    } catch (error) {
        console.error('Error al eliminar la Historia Clinica:', error.message);
        alert('Error al dar de baja al medicamento. Por favor, inténtalo de nuevo más tarde.');
    }

};
function confirmarEliminar(idMedicamento) {
    const confirmacion = confirm('¿Estás seguro de que deseas Dar de baja?');

    if (confirmacion) {
        eliminarMedicamento(idMedicamento);
    } else {
        console.log('Dar de baja cancelada por el usuario.');
    }
}

if (document.querySelector('#btnRegistrar')) {
    document.querySelector('#btnRegistrar')
        .addEventListener('click', registrarMedicamento)

}
if (document.querySelector('#btnActualizar')) {//Si objeto existe
    document.querySelector('#btnActualizar')
        .addEventListener('click', actualizarMedicamento,)

}

