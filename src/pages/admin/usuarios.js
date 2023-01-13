import { ClassNames } from "@emotion/react";
import styles from "../../styles/components.module.css"
import Barra from "../../components/Barra.js"
import { getAllUsers } from "../api/users";
import { useState, useEffect } from "react";
// import ReactHTMLTableToExcel from 'react-html-table-to-excel';
// import { read, writeFileXLSX, XLSX } from "xlsx";
import * as XLSX from 'xlsx/xlsx.mjs';
import { updateAllUsers } from "../api/users";

/* load 'fs' for readFile and writeFile support */
// import * as fs from 'fs';
// XLSX.set_fs(fs);

/* load 'stream' for stream support */
import { Readable } from 'stream';
XLSX.stream.set_readable(Readable);

/* load the codepage support library for extended support with older formats  */
import * as cpexcel from 'xlsx/dist/cpexcel.full.mjs';
import { async } from "@firebase/util";
XLSX.set_cptable(cpexcel);

export const Usuarios = () => {

  const [userList, setUserList] = useState([{
    email: "example@mail.com",
    highschool: "Colegio",
    name: "Ejemplo",
    qr: "qr_name.png",
    type: "normal"
  }
  ]);
  const [sheetData, setSheetData] = useState(null);

  useEffect(() => {
    loadUsers();
  }, [])

  const loadUsers = async () => {
    let userL = await getAllUsers();
    // console.log(badgeL);
    setUserList(userL);
    // console.log(userList)
    // badgeList = badgeL;
  }

  const updateUsers = async() => {
    await updateAllUsers();
  }

  const exportTable =()=>{
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.table_to_sheet(document.getElementById("tablaEstudiantes"));

    XLSX.utils.book_append_sheet(wb, ws, "estudiantes1");

    XLSX.writeFile(wb, "estudiantes.xlsx")
  }

  const colegios = {
    "isaac": "Isaac Newton",
    "william":"William Shakespeare",
    "letort":"Letort",
    "efrata":"Efrata",
    "rudolf":"Rudolf Steiner",
    "pedro":"Pedro Pablo Traversari"
  }

  return (
    <>
      <Barra logged="true"/>
      {/** <button onClick={async ()=>{await updateAllUsers()}}> Actualizar</button>  */}
      <div className={styles.usuarios}>
        <h1>Lista de Usuarios</h1>
        <button onClick={exportTable}>Decargar lista (.xsl)</button>
        <table id="tablaEstudiantes">
          <thead>
            <tr>
              <th>Estudiante</th>
              <th>Insignias Normales</th>
              <th>Insignias Bonus</th>
              <th>Correo</th>
              <th>Colegio</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((usuariosMap, index) => (
              <tr key={index}>
                <th>{usuariosMap.name}</th>
                <th>{usuariosMap.normales}</th>
                <th>{usuariosMap.bonos}</th>
                <th>{usuariosMap.email}</th>
                <th>{colegios[usuariosMap.colegio]}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Usuarios;