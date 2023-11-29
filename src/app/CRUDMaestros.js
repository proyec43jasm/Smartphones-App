import { deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "./firebase.js";

const SmartphonesContainer = document.querySelector('.Smartphones');
const FormularioActualizarSmartphone = document.querySelector('#Formulario-ActualizarSmartphone');

const obtenerSmartphone = (id) => getDoc(doc(db, 'Smartphones', id));

let id = '';

// Nueva función para actualizar smartphone
const actualizarSmartphone = async (id, nuevosValores) => {
    try {
        await updateDoc(doc(db, 'Smartphones', id), nuevosValores);
        alert('Smartphone actualizado correctamente');
    } catch (error) {
        alert('Error al actualizar el smartphone', 'error');
    }
};

export const MostrarListaSmartphones = (Datos) => {
    if (Datos.length) {
        let html = '';
        Datos.forEach(documento => {
            const Smartphone = documento.data();
            const idDocumento = documento.id; // Obtén el identificador del documento
            const li = `
                <li class="list-group-item list-group-item-action">
                    <h5> Nombre del smartphone: ${Smartphone.Nombre} </h5>
                    <p> Fabricante: ${Smartphone.Fabricante} </p>
                    <p> Precio: ${Smartphone.Precio} </p>
                    <p> Fecha de Lanzamiento: ${Smartphone.FechaLanzamiento} </p>
                    <p> Características Técnicas: ${Smartphone.CaracteristicasTecnicas} </p>
                    <button class="btn btn-outline-warning w-100 mb-2 botoneSinSesion Eliminar-Smartphone" data-id="${idDocumento}"> Eliminar </button>
                    <button class="btn btn-outline-success w-100 mb-2 botoneSinSesion Actualizar-Smartphone" data-id="${idDocumento}" data-bs-toggle="modal" data-bs-target="#ActualizarSmartphone"> Actualizar </button>
                </li>
            `;
            html += li;
        });
        SmartphonesContainer.innerHTML = html;

        const BotonesEliminar = SmartphonesContainer.querySelectorAll('.Eliminar-Smartphone');

        // ELIMINAR SMARTPHONES
        BotonesEliminar.forEach(BotonEliminarIndividual => {
            BotonEliminarIndividual.addEventListener('click', async (event) => {
                const Documento = event.target.dataset.id;
                try {
                    await deleteDoc(doc(db, 'Smartphones', Documento));
                    // Puedes agregar aquí algún código adicional después de eliminar el documento, si es necesario
                } catch (error) {
                    alert('Error al eliminar el smartphone:', 'error');
                }
            });
        });

        const BotonesActualizar = SmartphonesContainer.querySelectorAll('.Actualizar-Smartphone');

        BotonesActualizar.forEach(BotonActualizarIndividual => {
            BotonActualizarIndividual.addEventListener('click', async (e) => {
                const identificadorDocumento = await obtenerSmartphone(e.target.dataset.id);

                // Accede a los datos del documento utilizando el método data()
                const DATOSDOCUMENTO = identificadorDocumento.data();

                // Ahora puedes acceder a las propiedades del documento
                const NOMBRE = FormularioActualizarSmartphone['Actualizar-Nombre'];
                const FABRICANTE = FormularioActualizarSmartphone['Actualizar-Fabricante'];
                const PRECIO = FormularioActualizarSmartphone['Actualizar-Precio'];
                const FECHA_LANZAMIENTO = FormularioActualizarSmartphone['Actualizar-FechaLanzamiento'];
                const CARACTERISTICAS_TECNICAS = FormularioActualizarSmartphone['Actualizar-CaracteristicasTecnicas'];

                NOMBRE.value = DATOSDOCUMENTO.Nombre;
                FABRICANTE.value = DATOSDOCUMENTO.Fabricante;
                PRECIO.value = DATOSDOCUMENTO.Precio;
                FECHA_LANZAMIENTO.value = DATOSDOCUMENTO.FechaLanzamiento;
                CARACTERISTICAS_TECNICAS.value = DATOSDOCUMENTO.CaracteristicasTecnicas;

                id = identificadorDocumento.id;
            });
        });

        // Evento para actualizar el smartphone al enviar el formulario
        FormularioActualizarSmartphone.addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                // Validar campos aquí si es necesario
                const NOMBRE = FormularioActualizarSmartphone['Actualizar-Nombre'].value;
                const FABRICANTE = FormularioActualizarSmartphone['Actualizar-Fabricante'].value;
                const PRECIO = FormularioActualizarSmartphone['Actualizar-Precio'].value;
                const FECHA_LANZAMIENTO = FormularioActualizarSmartphone['Actualizar-FechaLanzamiento'].value;
                const CARACTERISTICAS_TECNICAS = FormularioActualizarSmartphone['Actualizar-CaracteristicasTecnicas'].value;

                await actualizarSmartphone(id, {
                    Nombre: NOMBRE,
                    Fabricante: FABRICANTE,
                    Precio: PRECIO,
                    FechaLanzamiento: FECHA_LANZAMIENTO,
                    CaracteristicasTecnicas: CARACTERISTICAS_TECNICAS,
                });

                // Cerrar el modal (si es un modal)
                const actualizarModal = document.querySelector('#ActualizarSmartphone');
                const modal = bootstrap.Modal.getInstance(actualizarModal);
                modal.hide();
            } catch (error) {
                alert(error.message, 'error');
            }
        });

    } else if (Datos.length === 0) {
        SmartphonesContainer.innerHTML = `
            <h1>
                No hay smartphones registrados.
            </h1>
        `;
    }
};
