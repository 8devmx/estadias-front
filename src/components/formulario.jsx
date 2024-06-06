import React from 'react';
import styles from '@/styles/Forms.module.css'

const Formulario = () => {
    return (
        <div className={styles.Formulario}>
            <h1>Formulario de Contacto</h1>
            <div className={styles.cont}>
                <div className={styles.form1}>
                    <label htmlFor="">Nombre: </label>
                    <input type="text" />
                    <label htmlFor="">telefono: </label>
                    <input type="text" /> 
                    <label htmlFor="">Correo Electronico: </label>
                    <input type="text" />
                </div>
                <div className={styles.form1}>
                    <label htmlFor="">Cuidad/Estado: </label>
                    <input type="text" />
                    <label htmlFor="">De donde nos conoces:</label>
                    <select id="message" name="message" required>
                        <option value="#">Seleccione su opcion</option>
                        <option value="#">Facebook</option>
                        <option value="#">Instagram</option>
                        <option value="#">X(twitter)</option>
                    </select>
                    <label htmlFor="message">interes: </label>
                    <select id="message" name="message" required>
                        <option value="#">Seleccione su opcion</option>
                        <option value="#">Contratación</option>
                        <option value="#">informes especificos</option>
                    </select>
                </div>
                
            </div>

            <button type="submit">Enviar</button>
        </div>  
    )
}

export default Formulario;
