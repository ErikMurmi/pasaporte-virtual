//scan.js

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { QrReader } from "react-qr-reader";
import styles from "../styles/Home.module.css";
import Barra from "../components/Barra";
import useUser from "../hooks/useUser";
import { addUnlockedBadge } from "./api/badges";
import { Button } from "@mui/material";
import { async } from "@firebase/util";
import { fontSize } from "@mui/system";
import { states } from "./inicio";
import {AiFillHome} from "react-icons/ai"

function Scan(props) {
  const [data, setData] = useState("No hay insignia");
  const [visible, setVisible] = useState(false)
  const user = useUser()
  const router = useRouter()

  function changeData(texto) {
    setData(texto);
    props.onScanChange(false);
    addUnlockedBadge(user.uid, { "name": data });
  }

  async function updateUser() {
    addUnlockedBadge(user.uid, { "name": data })
  }
  useEffect(() => {
    if (user !== null && user !== undefined) {
      setVisible(true)
    }
  }, [user])

  useEffect(()=>{console.log('Data:',data)},[data])

  return (
    <>
      <div className={styles.container}>
        <h2>Escanea tu insignia</h2>
        {visible && <>
          <QrReader
            onResult={(result, error) => {
              if (!!result) {
                // ()=>{changeData(result?.text)};
                setData(result?.text);
                console.log(data)
                // updateUser;
                // props.onScanChange(false);

                // ()=>{props.onScanChange(false); addUnlockedBadge(user.uid, { "name": data }) } 
              }

              if (!!error) {
                console.info(error);
              }

            }
            }
            //this is facing mode : "environment " it will open backcamera of the smartphone and if not found will 
            // open the front camera
            constraints={{ facingMode: "environment" }}
            style={{ width: "40%", height: "40%" }}
          />


          {/*           
          
            <Button onClick={()=>{addUnlockedBadge(user.uid,{"name":"FACEA"})}}  >FACEA</Button>
            <Button onClick={()=>{addUnlockedBadge(user.uid,{"name":"FICA"})}}  >FICA</Button> */}
          {/* {data!= "No hay insignia" && <Button onClick={()=>{addUnlockedBadge(user.uid,{"name":data}), props.onScanChange(true)}}  >{data}</Button>} */}
          {data != "No hay insignia" && <Button style={{
            backgroundColor: "#8D2331",
            border: "2px solid #8D2331",
            borderRadius: "9vh",
            height: "7vh",
            alignSelf:"center",
            maxWidth: "90%",
            textAlign: "center",
            padding: "2rem",
            color:"white",
            fontSize: "3rem"

          }} onClick={() => {console.log('Data enviada:',data);addUnlockedBadge(user.uid, { "name": data });props.onScanChange(states.RELOAD); }}>DESBLOQUEAR {data}</Button>}
          {/* <input type={"text"} value={data} onChange={(e)=>{ props.onScanChange(false); addUnlockedBadge(user.uid, { "name": data }) } }readonly></input> */}
        </>}
        {/* <button onClick={() => { router.push('/inicio') }}> Volver inicio</button> */}
        <Button href="/inicio" onClick={() => {props.onScanChange(states.waiting)}} 
          style={{
            width:"70%",
            display: "flex",
            backgroundColor: "#8D2331",
            border: "2px solid #8D2331",
            color: "white",
            borderRadius: "10px",
            alignItems: "center",
            justifyContent: "center",
            margin: "2vh auto 0",
            fontSize: "2vh"
        }}>

          <div> 
            <AiFillHome style={{
                width: "3vh",
                height: "3vh"
            }}/>
          </div>
          &nbsp;Volver al inicio
        </Button>
      </div>
    </>
  );
}

export default Scan;
