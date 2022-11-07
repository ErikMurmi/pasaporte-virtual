//scan.js

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { QrReader } from "react-qr-reader";
import styles from "../styles/Home.module.css";
import Barra from "../components/Barra";
import useUser from "../hooks/useUser";
import { addUnlockedBadge } from "./api/badges";
import { Button } from "@mui/material";

function Scan() {
  const [data, setData] = useState("No result");
  const [visible,setVisible] = useState(false)
  const user = useUser()
  const router = useRouter()

  useEffect(()=>{
    if(user!== null && user!==undefined){
      setVisible(true)
    }
  },[user])

  return (
    <>
      <Barra/>
      <div className={styles.container}>
        {visible && <>
          <QrReader 
            onResult={(result, error) => {
              if (!!result) {
                setData(result?.text);
              }

              if (!!error) {
                console.info(error);
              }

            } 
          }
  //this is facing mode : "environment " it will open backcamera of the smartphone and if not found will 
  // open the front camera
          constraints    ={{ facingMode:  "environment"  }}
            style={{ width: "40%", height: "40%" }}
          />
          <p>{data}</p>
          
            <Button onClick={()=>{addUnlockedBadge(user.uid,{"name":"FACEA"})}}  >FACEA</Button>
            <Button onClick={()=>{addUnlockedBadge(user.uid,{"name":"FICA"})}}  >FICA</Button>
          </>}
        <button onClick={()=>{router.push('/inicio')}}> Volver inicio</button>
      </div>
    </>
  );
}

export default Scan;
