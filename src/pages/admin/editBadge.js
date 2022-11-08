import Barra from "../../components/Barra";
import style from "../../styles/admin.module.css"
import React, { useState, Component } from "react";
import { addBadge } from "../api/badges";
import { storage } from "../../config/client";
import { ref, uploadBytes, get, getDownloadURL, uploadBytesResumable } from "firebase/storage";

export default function editBadge() {

    return (
        <div>
            <Barra></Barra>
        </div>
    )

}

