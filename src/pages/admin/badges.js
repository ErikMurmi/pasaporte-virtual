import Barra from "../../components/Barra";
import style from "../../styles/admin.module.css"
import React, { useState, Component } from "react";
import { addBadge } from "../api/badges";
import { storage } from "../../config/client";
import { ref, uploadBytes, get, getDownloadURL, uploadBytesResumable } from "firebase/storage";

export default function badges() {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [tipo, setTipo] = useState(true);
    const [imagen, setImagen] = useState(null);
    const [imagenRef, setImagenRef] = useState(null);
    const [newBadge, setNewBadge] = useState();


    const handleSubmitBadge = async (e) => {
        e.preventDefault();
        console.log()
        let badge = await addBadge({ description: descripcion, image: imagenRef, name: nombre, qr: "qr3", type: tipo ? "bono" : "normal" });
        alert("Insignia Guardada")
    };
    console.log(imagen);
    console.log(tipo);
    console.log(nombre);


    // const uploadImage = () => {
    //     if (imagen == null) return;
    //     const imageRef = ref(storage, `images/badges/${nombre}`);
    //     // setImagenRef(ref(storage, `images/badges/${imagen.name}`));
    //     uploadBytes(imageRef, imagen).then(() => {
    //         getDownloadURL(imageRef).then((url) => { setImagenRef(url); console.log(imagenRef) })
    //             .catch((error) => {
    //                 // A full list of error codes is available at
    //                 // https://firebase.google.com/docs/storage/web/handle-errors
    //                 switch (error.code) {
    //                     case 'storage/object-not-found':
    //                         // File doesn't exist
    //                         break;
    //                     case 'storage/unauthorized':
    //                         // User doesn't have permission to access the object
    //                         break;
    //                     case 'storage/canceled':
    //                         // User canceled the upload
    //                         break;

    //                     // ...

    //                     case 'storage/unknown':
    //                         // Unknown error occurred, inspect the server response
    //                         break;
    //                 }
    //             });
    //         alert("Imagen guardada");
    //     });


    // };
    const uploadImage = () => {
        const imageRef = ref(storage, `images/badges/${nombre}`);
        const uploadTask = uploadBytesResumable(imageRef, imagen);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setImagenRef(downloadURL);
                    alert("Imagen Guardada");
                });
            }
        );
    }

    return (
        <>
            <Barra></Barra>
            <h2 style={{ margin: "5vw", alignSelf: "center" }}>Crear Insignia</h2>
            <form className={style.form} onSubmit={handleSubmitBadge}>
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
                {nombre!="" &&  <input type={"file"} id="image" onChange={(e) => { setImagen(e.target.files[0]) }} />}
                {imagen!= null && <button type="button" onClick={uploadImage}>Guardar Imagen</button>}
                
                <input type={"submit"} value="Crear" />

            </form>
        </>
    )
    // return (
    //     <div>
    //         <Barra></Barra>
    //         <h2 style={{ margin: "5vw", alignSelf: "center" }}>Crear Insignia</h2>
    //         <Formik
    //             initialValues={{ name: nombre, description: descripcion, type: tipo }}
    //             validate={values => {
    //                 const errors = {};
    //                 if (!values.name) {
    //                     errors.name = 'Campo obligatorio';

    //                 }

    //                 if (!values.description) {
    //                     errors.description = 'Campo obligatorio';
    //                 }
    //                 return errors;
    //             }}



    //             onSubmit={(values, actions) => {
    //                 setTimeout(() => {
    //                     alert(JSON.stringify(values, null, 2));
    //                     actions.setSubmitting(false);
    //                 }, 1000);
    //                 handleSubmitBadge;
    //                 alert("La insignia se ha creado");


    //             }}
    //         >
    //             {props => (
    //                 <form onSubmit={props.handleSubmit}>
    //                     <input
    //                         type="text"
    //                         onChange={setNombre(props.handleChange)}
    //                         // onChange={setNombre(props.values.name)}
    //                         onBlur={props.handleBlur}
    //                         value={props.values.name}
    //                         name="name"
    //                         placeholder="FACEA"
    //                     /><br />
    //                     {props.errors.name && <div id="feedback">{props.errors.name}</div>}
    //                     <input
    //                         type="text"
    //                         onChange={setDescripcion(props.handleChange)}
    //                         onBlur={props.handleBlur}
    //                         value={props.values.description}
    //                         name="description"
    //                         placeholder="Facultad de Ciencias Economicas y Administrativas" />
    //                     {props.errors.description && <div id="feedback">{props.errors.description}</div>}
    //                     <br /><label>Insignia Bonus</label>
    //                     <input
    //                         type="radio"
    //                         onChange={setTipo(props.handleChange)}
    //                         onBlur={props.handleBlur}
    //                         value={true}
    //                         name="type"
    //                         defaultChecked
    //                     /><br />
    //                     <label>Insignia Normal</label>
    //                     <input
    //                         type="radio"
    //                         onChange={setTipo(props.handleChange)}
    //                         onBlur={props.handleBlur}
    //                         value={false}
    //                         name="type"

    //                     /><br />
    //                     <input
    //                         type="file"
    //                         name="image"
    //                         onChange={(e) => { setImagen(e.target.files[0]) }} />
    //                     <button type="button" onClick={uploadImage}>Guardar</button>
    //                     {props.errors.description && <div id="feedback2">{props.errors.description}</div>}
    //                     <button type="submit">Submit</button>
    //                 </form>
    //             )}
    //         </Formik>
    //     </div>

        //             <button onClick={uploadImage}>Guardar</button>

   // )
}