import React from 'react';
import styles from '@/styles/Forms.module.css'

const Formulario = () => {
    return (
        
        <div className={styles.Formulario}>
            <h1>Formulario de Contacto</h1>

            <label htmlFor="name">Nombre:</label>
            <input type="text" id="name" name="name" required />
            <label htmlFor="numero">Numero de contacto:</label>
            <input type="text" id="numero" name="numero" required />
            <label htmlFor="edad">Edad</label>
            <input type="text" id="edad" name="edad" required />
            <label htmlFor="email">Correo Electrónico:</label>
            <input type="email" id="email" name="email" required />
            <label htmlFor="message">Porque deberiamos contactarte:</label>
            <textarea id="message" name="message" rows="4" required></textarea>

            <button type="submit">Enviar</button>
        </div>  
    )
}

export default Formulario;
