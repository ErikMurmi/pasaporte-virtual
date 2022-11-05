//scan.js

import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import { QrReader } from "react-qr-reader";
import styles from "../styles/Home.module.css";
import Barra from "../components/Barra";

function Scan() {
  const [data, setData] = useState("No result");
  const router = useRouter()

  return (
    <>
      <Barra/>
      <div className={styles.container}>
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
        <button onClick={()=>{router.replace('/inicio')}}> Volver inicio</button>
        <p>{data}</p>
      </div>
    </>
  );
}

export default Scan;
