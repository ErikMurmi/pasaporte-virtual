import { ClassNames } from "@emotion/react";
import styles from "../styles/components.module.css"
import Barra from "../../components/Barra.js"

const tablaUsuarios = [
  { estudiante: "Tito Jaramilloo", normales: 8, bonus: 2, },
  { estudiante: "Roberto Salazar", normales: 8, bonus: 2, },
  { estudiante: "Fernando Jaramillo", normales: 8, bonus: 2, },
  { estudiante: "Roberto Salazar", normales: 8, bonus: 2, },
  { estudiante: "Tito Jaramilloo", normales: 8, bonus: 2, },
  { estudiante: "Roberto Salazar", normales: 8, bonus: 2, },
  { estudiante: "Tito Jaramilloo", normales: 8, bonus: 2, },
  { estudiante: "Roberto Salazar", normales: 8, bonus: 2, },
];

export const usuarios = () => {
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
            {tablaUsuarios.map((usuariosMap) => (
              <tr>
                <th>{usuariosMap.estudiante}</th>
                <th>{usuariosMap.normales}</th>
                <th>{usuariosMap.bonus}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default usuarios;