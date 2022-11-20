//scan.js

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { QrReader } from "react-qr-reader";
import styles from "../styles/Home.module.css";
import Barra from "../components/Barra";
import useUser from "../hooks/useUser";
import { addUnlockedBadge, getBadge } from "./api/badges";
import { Button } from "@mui/material";
import { async } from "@firebase/util";
import { fontSize } from "@mui/system";
import { states } from "./inicio";
import { AiFillHome } from "react-icons/ai"

function Scan(props) {
  const [data, setData] = useState("No hay insignia");
  // const [badge, setBadge] = useState(null);
  const [visible, setVisible] = useState(false)
  const user = useUser()
  const router = useRouter()

  function changeData(texto) {
    setData(texto);
    props.onScanChange(false);
    addUnlockedBadge(user.uid, { "name": data });
  }

  function checkBadgesUnlocked(badgeCheck) {
    console.log(badgeCheck);
    // props.unlockedBadges.forEach(element => {
    //   if (element.name === badgeCheck.name) {
    //     alert("Ya desbloqueaste esta insignia");
    //     return false;
    //   }
    // }
    for (let i = 0; i < props.unlockedBadges.length; i++) {
      if (props.unlockedBadges[i].name === badgeCheck.name) {
        alert("Ya desbloqueaste esta insignia");
        return false;
      }
    }


    return true;
  }

  async function updateUser() {
    // addUnlockedBadge(user.uid, { "name": data })
    console.log('Data enviada:', data);
    if (data !== "No hay insignia") {
      let badge = await getBadge(data);
      console.log(`badge obtenida${badge.name}`);
      if (checkBadgesUnlocked(badge)) {
        addUnlockedBadge(user.uid, badge);
        props.onScanChange(states.RELOAD);
      }

    }
    props.onScanChange(states.RELOAD);

  }

  useEffect(() => {
    if (user !== null && user !== undefined) {
      setVisible(true)
    }
  }, [user])

  useEffect(() => { console.log('Data:', data) }, [data])

  return (
    <>
      <div className={styles.container}>
        <h2>Escanea tu insignia</h2>
        {visible && <>
          <QrReader
            onResult={(result, error) => {
              if (!!result) {
                // setData(result?.text);
                let word = result?.text;
                let lastWord = word.split(' ').pop();
                console.log("Palabra", word);
                console.log("ultima", lastWord)
                if (word === "Acción por el clima BONUs") {
                  setData("Acción por el clima Bonus");

                }
                else if (word === "Acción por el clima") {
                  setData("Acción por el clima");

                } else if (word === "Agua limpia y Saneamiento BONUs") {
                  setData("Agua limpia y Saneamiento Bonus");

                } else if (lastWord === "BONUs") {

                  var lastIndex = word.lastIndexOf(" ");

                  word = word.substring(0, lastIndex);
                  console.log("borrada ", word);
                  setData(word);
                } else {
                  setData(word);
                }
                // console.log(data);
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

          {data != "No hay insignia" && <Button style={{
            backgroundColor: "#1ee064",
            borderRadius: "15px",
            height: "auto",
            alignSelf: "center",
            maxWidth: "90%",
            textAlign: "center",
            padding: "0.5rem",
            color: "white",
            fontSize: "1rem",
            marginBottom: "6%",
            marginTop: "-5%"

            // }} onClick={() => {console.log('Data enviada:',data);addUnlockedBadge(user.uid, { "name": data });props.onScanChange(states.RELOAD); }}>DESBLOQUEAR {data}</Button>}
          }} onClick={updateUser}>DESBLOQUEAR {data}</Button>}
        </>}
        <Button href="/inicio" onClick={() => { props.onScanChange(states.waiting) }}
          style={{
            width: "70%",
            display: "flex",
            backgroundColor: "#8D2331",
            border: "2px solid #8D2331",
            color: "white",
            borderRadius: "10px",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 0",
            fontSize: "2vh"
          }}>

          <div>
            <AiFillHome style={{
              width: "3vh",
              height: "3vh"
            }} />
          </div>
          &nbsp;Volver al inicio
        </Button>
      </div>
    </>
  );

}
export default Scan;
