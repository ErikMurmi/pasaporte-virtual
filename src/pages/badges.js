import Barra from "../components/Barra";
import style from "../styles/admin.module.css"
import Switch from '@mui/material/Switch'
import React, { useState, Component } from "react";
import { addBadge } from "./api/badges";

export default function badges() {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [tipo, setTipo] = useState(true);
    const [imagen, setImagen] = useState();
    const [newBadge, setNewBadge] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log()
        let badge = await addBadge({ description: descripcion, image: "imagen3", name: nombre , qr: "qr3", type: "bono" });
        alert("La insignia se ha creado");
    };
    console.log(imagen);
    console.log(tipo);
    console.log(nombre);
    // fileSelectedHandler= event => {
    //     console.log(event);
    // }
    // const createBadge = async () => {

    //     console.log(badge);
    //     // badgeList = badgeL;
    // }



    return (
        <>
            <Barra></Barra>
            <h2 style={{ margin: "5vw", alignSelf: "center" }}>Crear Insignia</h2>
            <form className={style.form} onSubmit={handleSubmit}>
                <label htmlFor="nombre">Ingresa el nombre de la Insignia</label><br />
                <input id="nombre" type="text" name="nombre"
                    placeholder="FICA" value={nombre} onChange={(e) => setNombre(e.target.value)}></input><br />
                <label htmlFor="descripcion">Ingresa la descripción de la Insignia</label><br />
                <input id="descripcion" type="text" name="descripcion"
                    placeholder="Facultad de Ingenieria y Ciencias" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></input><br />
                <label htmlFor="tipo">Escoge el tipo de insignia</label>
                {/* <Switch {...label} defaultChecked/> */}

                <label htmlFor="true">Insgignia Bonus</label>
                <input type={"radio"} id="true" name="tipo" value="True" onChange={(e) => setTipo(true)} defaultChecked />
                <label htmlFor="false">Insignia normal</label>
                <input type={"radio"} id="false" name="tipo" value="False" onChange={(e) => setTipo(false)} /><br />
                <label htmlFor="image">Seleccione una imagen</label>
                <input type={"file"} id="image" onChange={(e) => setImagen(e.target.files)} /><br />
                <input type={"submit"} value="Crear" />
            </form>
        </>
    )
}