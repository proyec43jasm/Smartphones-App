import { deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "./firebase.js";

const Organizaciones = document.querySelector('.Organizaciones');
const FormularioActualizarOrganizacion = document.querySelector('#Formulario-ActualizarOrganizacion');

const obtenerOrganizacion = (id) => getDoc(doc(db, 'Organizaciones', id));

let id = '';

// Nueva función para actualizar organización
const actualizarOrganizacion = async (id, nuevosValores) => {
    try {
        await updateDoc(doc(db, 'Organizaciones', id), nuevosValores);
        alert('Organización actualizada correctamente');
    } catch (error) {
        alert('Error al actualizar la organización', 'error');
    }
};

export const MostrarListaOrganizaciones = (Datos) => {
    if (Datos.length) {
        let html = '';
        Datos.forEach(documento => {
            const Organizacion = documento.data();
            const idDocumento = documento.id; // Obtén el identificador del documento
            const li = `
                <li class="list-group-item list-group-item-action">
                    <h5> Nombre de la organización: ${Organizacion.Nombre} </h5>
                    <p> Integrantes: ${Organizacion.Integrantes} </p>
                    <p> Líder: ${Organizacion.Lider} </p>
                    <p> Número de Aliados: ${Organizacion.NumeroAliados} </p>
                    <p> Fecha de Contratación: ${Organizacion.FechaContratacion} </p>
                    <button class="btn btn-outline-warning w-100 mb-2 botoneSinSesion Eliminar-Organizacion" data-id="${idDocumento}"> Eliminar </button>
                    <button class="btn btn-outline-success w-100 mb-2 botoneSinSesion Actualizar-Organizacion" data-id="${idDocumento}" data-bs-toggle="modal" data-bs-target="#ActualizarOrganizacion"> Actualizar </button>
                </li>
            `;
            html += li;
        });
        Organizaciones.innerHTML = html;

        const BotonesEliminar = Organizaciones.querySelectorAll('.Eliminar-Organizacion');

        // ELIMINAR ORGANIZACIONES
        BotonesEliminar.forEach(BotonEliminarIndividual => {
            BotonEliminarIndividual.addEventListener('click', async (event) => {
                const Documento = event.target.dataset.id;
                try {
                    await deleteDoc(doc(db, 'Organizaciones', Documento));
                    // Puedes agregar aquí algún código adicional después de eliminar el documento, si es necesario
                } catch (error) {
                    alert('Error al eliminar la organización:', 'error');
                }
            });
        });

        const BotonesActualizar = Organizaciones.querySelectorAll('.Actualizar-Organizacion');

        BotonesActualizar.forEach(BotonActualizarIndividual => {
            BotonActualizarIndividual.addEventListener('click', async (e) => {
                const identificadorDocumento = await obtenerOrganizacion(e.target.dataset.id);

                // Accede a los datos del documento utilizando el método data()
                const DATOSDOCUMENTO = identificadorDocumento.data();

                // Ahora puedes acceder a las propiedades del documento
                const NOMBRE = FormularioActualizarOrganizacion['Actualizar-Nombre'];
                const INTEGRANTES = FormularioActualizarOrganizacion['Actualizar-Integrantes'];
                const LIDER = FormularioActualizarOrganizacion['Actualizar-Lider'];
                const NUMERO_ALIADOS = FormularioActualizarOrganizacion['Actualizar-NumeroAliados'];
                const FECHA_CONTRATACION = FormularioActualizarOrganizacion['Actualizar-FechaContratacion'];

                NOMBRE.value = DATOSDOCUMENTO.Nombre;
                INTEGRANTES.value = DATOSDOCUMENTO.Integrantes;
                LIDER.value = DATOSDOCUMENTO.Lider;
                NUMERO_ALIADOS.value = DATOSDOCUMENTO.NumeroAliados;
                FECHA_CONTRATACION.value = DATOSDOCUMENTO.FechaContratacion;

                id = identificadorDocumento.id;
            });
        });

        // Evento para actualizar la organización al enviar el formulario
        FormularioActualizarOrganizacion.addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                // Validar campos aquí si es necesario
                const NOMBRE = FormularioActualizarOrganizacion['Actualizar-Nombre'].value;
                const INTEGRANTES = FormularioActualizarOrganizacion['Actualizar-Integrantes'].value;
                const LIDER = FormularioActualizarOrganizacion['Actualizar-Lider'].value;
                const NUMERO_ALIADOS = FormularioActualizarOrganizacion['Actualizar-NumeroAliados'].value;
                const FECHA_CONTRATACION = FormularioActualizarOrganizacion['Actualizar-FechaContratacion'].value;

                await actualizarOrganizacion(id, {
                    Nombre: NOMBRE,
                    Integrantes: INTEGRANTES,
                    Lider: LIDER,
                    NumeroAliados: NUMERO_ALIADOS,
                    FechaContratacion: FECHA_CONTRATACION,
                });

                // Cerrar el modal (si es un modal)
                const actualizarModal = document.querySelector('#ActualizarOrganizacion');
                const modal = bootstrap.Modal.getInstance(actualizarModal);
                modal.hide();
            } catch (error) {
                alert(error.message, 'error');
            }
        });

    } else if (Datos.length === 0) {
        Organizaciones.innerHTML = `
            <h1>
                Para visualizar el contenido es necesario que inicies sesión
                <br><br>
                Si no tienes una cuenta, regístrate para continuar
            </h1>
        `;
    }
};
