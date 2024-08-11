import React, { useState } from 'react';
import styles from '@/styles/Forms.module.css';
import SelectEstate from '@/components/UtilsComponents/SelectEstate';

const Form = ({ company_id }) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState(""); // Estado para manejar el estado seleccionado
    const [interest, setInterest] = useState("");
    const [message, setMessage] = useState("");
    const [source, setSource] = useState("");

    return (
        <div className={styles.Formulario} data-theme="light">
            <h2 className="text-center font-bold text-3xl">¿Deseas información? <br />¡Contáctanos!</h2>
            <form onSubmit={e => {
                e.preventDefault();
                const data = {
                    name,
                    email,
                    phone,
                    address: `Estado: ${state}, Ciudad: ${city}`,
                    message: `Los encontré por: ${source}, Estoy interesado en ${interest}, Información adicional: ${message}`,
                    subject: `Estoy interesado en ${interest}`
                };
                fetch("https://formspree.io/f/xkndlean", {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        'Accept': 'application/json'
                    }
                }).then(response => {
                    if (response.ok) {
                        window.location.href = "/agradecimiento"; 
                    } else {
                        response.json().then(data => {
                            if (Object.hasOwn(data, 'errors')) {
                                alert(data["errors"].map(error => error["message"]).join(", "))
                            } else {
                                alert("Hubo un error al enviar el formulario");
                            }
                        });
                    }
                }).catch(error => {
                    alert("Error: Hubo un error al enviar el formulario");
                });

                const payloadLead = {
                    name,
                    phone: phone,
                    mail: email,
                    state: state, // Usando el estado seleccionado aquí
                    city,
                    source: source,
                    interest: interest,
                    message: message,
                    status_id: "2",
                    company_id: company_id
                };

                fetch(`${process.env.NEXT_PUBLIC_API_KEY}/leadsfront`, {
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
                    alert("Error: Hubo un error al registrar el lead" + error);
                });
            }}>
                <div>
                    <label htmlFor="">Nombre: </label>
                    <input type="text" value={name} onChange={
                        e => {
                            setName(e.target.value);
                        }
                    } />
                </div>
                <div className={styles.cont}>
                    <div className={styles.form1}>
                        <label htmlFor="">Teléfono: </label>
                        <input type="text" name="phone" value={phone} onChange={
                            e => {
                                setPhone(e.target.value);
                            }
                        } />
                        <label htmlFor="">Estado</label>
                        <SelectEstate
                            value={state}
                            onChange={e => {
                                setState(e.target.value);
                            }}
                        />
                        <label htmlFor="">¿De dónde nos conoces? *:</label>
                        <select id="source" name="source" required value={source} onChange={
                            e => {
                                setSource(e.target.value);
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
                                setEmail(e.target.value);
                            }
                        } />
                        <label htmlFor="">Ciudad: </label>
                        <input type="text" value={city} onChange={
                            e => {
                                setCity(e.target.value);
                            }
                        } />
                        <label htmlFor="interest">Interés *: </label>
                        <select name="interest" value={interest} required onChange={
                            e => {
                                setInterest(e.target.value);
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
                            setMessage(e.target.value);
                        }
                    } />
                </div>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
};

export default Form;
