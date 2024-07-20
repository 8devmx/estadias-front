import React, { useState } from 'react';
import styles from '@/styles/Forms.module.css'

const Form = () => {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [interest, setInterest] = useState("")
    const [message, setMessage] = useState("")
    const [source, setSource] = useState("")

    return (
        <div className={styles.Formulario} data-theme="light">
            <h2 className="text-center font-bold text-3xl">¿Deseas información? <br />¡Contáctanos!</h2>
            <form onSubmit={e => {
                e.preventDefault()
                const data = {
                    name,
                    email,
                    phone,
                    address: `Estado: ${state}, Ciudad: ${city}`,
                    message: `Los encontré por: ${source}, Estoy interesado en ${interest}, Información adicional: ${message}`,
                    subject: `Estoy interesado en ${interest}`
                }
                fetch("https://formspree.io/f/xkndlean", {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        'Accept': 'application/json'
                    }
                }).then(response => {
                    if (response.ok) {
                        alert("Gracias por registrarte en un momento nos pondremos en contacto contigo!");
                    } else {
                        response.json().then(data => {
                            if (Object.hasOwn(data, 'errors')) {
                                alert(data["errors"].map(error => error["message"]).join(", "))
                            } else {
                                alert("Hubo un error al enviar el formulario")
                            }
                        })
                    }
                }).catch(error => {
                    alert("Error: Hubo un error al enviar el formulario")
                });

                const payloadLead = {
                    name,
                    thone: phone,
                    mail: email,
                    state_id: state,
                    city,
                    sources_id: source,
                    interest_id: interest,
                    message: message,
                    status_id: "no_contacted",
                    company_id: "1"
                }

                fetch("http://localhost:8000/leads", {
                    method: "POST",
                    body: JSON.stringify(payloadLead),
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).then(response => {
                    if (response.ok) {
                        alert("Se ha registrado el lead correctamente");
                    }
                }).catch(error => {
                    alert("Error: Hubo un error al registrar el lead" + error)
                });
            }}>
                <div>
                    <label htmlFor="">Nombre: </label>
                    <input type="text" value={name} onChange={
                        e => {
                            setName(e.target.value)
                        }
                    } />
                </div>
                <div className={styles.cont}>
                    <div className={styles.form1}>
                        <label htmlFor="">Teléfono: </label>
                        <input type="text" name="name" value={phone} onChange={
                            e => {
                                setPhone(e.target.value)
                            }
                        } />
                        <label htmlFor="">Estado</label>
                        <select value={state} onChange={
                            e => {
                                setState(e.target.value)
                            }
                        }>
                            <option value="">Seleccione una opción</option>
                            <option value="Quintana Roo">Quintana Roo</option>
                        </select>
                        <label htmlFor="">¿De dónde nos conoces? *:</label>
                        <select id="source" name="source" required value={source} onChange={
                            e => {
                                setSource(e.target.value)
                            }
                        }>
                            <option value="">Seleccione su opción</option>
                            <option value="Televisión">Televisión</option>
                            <option value="Radio">Radio</option>
                            <option value="Publicidad impresa">Publicidad impresa</option>
                            <option value="WhatApp">WhatApp</option>
                            <option value="Facebook">Facebook</option>
                            <option value="Instagram">Instagram</option>
                            <option value="X">X(twitter)</option>
                        </select>
                    </div>
                    <div className={styles.form1}>
                        <label htmlFor="">Correo Electrónico: </label>
                        <input type="text" value={email} onChange={
                            e => {
                                setEmail(e.target.value)
                            }
                        } />
                        <label htmlFor="">Ciudad: </label>
                        <input type="text" value={city} onChange={
                            e => {
                                setCity(e.target.value)
                            }
                        } />
                        <label htmlFor="interest">Interés *: </label>
                        <select name="interest" value={interest} required onChange={
                            e => {
                                setInterest(e.target.value)
                            }
                        }>
                            <option value="">Seleccione su opción</option>
                            <option value="Informes">Informes</option>
                            <option value="Vacantes">Vacantes</option>
                            <option value="Productos/Servicios">Productos/Servicios</option>
                            <option value="Quiero Postularme">Quiero Postularme</option>
                        </select>
                    </div>

                </div>
                <div>
                    <label htmlFor="message">Comentarios</label>
                    <textarea name="message" value={message} onChange={
                        e => {
                            setMessage(e.target.value)
                        }
                    } />
                </div>
                <button type="submit">Enviar</button>
            </form >
        </div >
    )
}

export default Form;
