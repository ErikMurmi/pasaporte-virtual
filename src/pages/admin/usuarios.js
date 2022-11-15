import { ClassNames } from "@emotion/react";
import styles from "../../styles/components.module.css"
import Barra from "../../components/Barra.js"
import { getAllUsers } from "../api/users";
import { useState, useEffect } from "react";
// import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const tablaUsuarios = [
  { estudiante: "Tito Jaramilloo", normales: 8, bonus: 2, id:1},
  { estudiante: "Roberto Salazar", normales: 8, bonus: 2,  id:2},
  { estudiante: "Fernando Jaramillo", normales: 8, bonus: 2, id:3 },
  { estudiante: "Roberto Salazar", normales: 8, bonus: 2,  id:4},
  { estudiante: "Tito Jaramilloo", normales: 8, bonus: 2,  id:5},
  { estudiante: "Roberto Salazar", normales: 8, bonus: 2,  id:6},
  { estudiante: "Tito Jaramilloo", normales: 8, bonus: 2,  id:7},
  { estudiante: "Roberto Salazar", normales: 8, bonus: 2,  id:8},
];

export const Usuarios = () => {

  const [userList, setUserList] = useState([{
    email: "example@mail.com",
    highschool: "Colegio",
    name: "Ejemplo",
    qr: "qr_name.png",
    type: "normal"
  }
  ]);

  useEffect(() => {
    loadUsers();
  }, [])

  const loadUsers = async () => {
    let userL = await getAllUsers();
    // console.log(badgeL);
    setUserList(userL);
    // badgeList = badgeL;
  }
  return (
    <>
      <div className={styles.usuarios}>
        <h1>Lista de Usuarios</h1>
        <button >Decargar lista (.xsl)</button>
        <table>
          <thead>
            <tr>
              <th>Estudiante</th>
              <th>Insignias Normales</th>
              <th>Insignias Bonus</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((usuariosMap, index) => (
              <tr key={index}>
                <th>{usuariosMap.name}</th>
                <th>{usuariosMap.highschool}</th>
                <th>{usuariosMap.type}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Usuarios;