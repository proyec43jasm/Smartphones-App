import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "./firebase.js";

window.addEventListener('DOMContentLoaded', () => {
    const formularioSmartphone = document.querySelector('#Formulario-Smartphone');

    formularioSmartphone.addEventListener('submit', async (e) => {
        e.preventDefault();

        const NOMBRE = formularioSmartphone['Nombre-Smartphone'].value;
        const FABRICANTE = formularioSmartphone['Fabricante-Smartphone'].value;
        const PRECIO = parseFloat(formularioSmartphone['Precio-Smartphone'].value);
        const FECHA_LANZAMIENTO = formularioSmartphone['Fecha-Lanzamiento-Smartphone'].value;
        const CARACTERISTICAS_TECNICAS = formularioSmartphone['CaracteristicasTecnicas-Smartphone'].value;

        try {
            // Utiliza addDoc para agregar un documento con un identificador generado automáticamente
            const nuevoSmartphoneRef = await addDoc(collection(db, 'Smartphones'), {
                Nombre: NOMBRE,
                Fabricante: FABRICANTE,
                Precio: PRECIO,
                FechaLanzamiento: FECHA_LANZAMIENTO,
                CaracteristicasTecnicas: CARACTERISTICAS_TECNICAS
            });

            // Muestra un mensaje si todo sale bien
            alert(`El smartphone ${NOMBRE} ha sido registrado exitosamente`);

            // Limpia el formulario
            formularioSmartphone.reset();
        } catch (error) {
            // Maneja el error y muestra un mensaje con el error
            alert('Error al registrar el smartphone:', 'noValido');
        }
    });
});
