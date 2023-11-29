import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "./firebase.js";

window.addEventListener('DOMContentLoaded', () => {
    const formularioOrganizacion = document.querySelector('#Formulario-Organizacion');

    formularioOrganizacion.addEventListener('submit', async (e) => {
        e.preventDefault();

        const NOMBRE = formularioOrganizacion['Nombre-Organizacion'].value;
        const INTEGRANTES = parseInt(formularioOrganizacion['Integrantes-Organizacion'].value);
        const LIDER = formularioOrganizacion['Lider-Organizacion'].value;
        const NUMERO_ALIADOS = parseInt(formularioOrganizacion['NumeroAliados-Organizacion'].value);
        const FECHA_CONTRATACION = formularioOrganizacion['Fecha-Contratacion-Organizacion'].value;

        try {
            // Utiliza addDoc para agregar un documento con un identificador generado automáticamente
            const nuevaOrganizacionRef = await addDoc(collection(db, 'Organizaciones'), {
                Nombre: NOMBRE,
                Integrantes: INTEGRANTES,
                Lider: LIDER,
                NumeroAliados: NUMERO_ALIADOS,
                FechaContratacion: FECHA_CONTRATACION
            });

            // Muestra un mensaje si todo sale bien
            alert(`La organización ${NOMBRE} ha sido registrada exitosamente`);

            // Limpia el formulario
            formularioOrganizacion.reset();
        } catch (error) {
            // Maneja el error y muestra un mensaje con el error
            alert('Error al registrar la organización:', 'noValido');
        }
    });
});
