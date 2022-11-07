import { async } from "@firebase/util";
import { collection, getDocs,addDoc,doc, setDoc,serverTimestamp} from "firebase/firestore";
import { db } from "../../../config/client"; 

const Collections ={
    USUARIOS : 'users',
    BADGES:'badges'
}

export const addUnlockedBadge=async(uid,badge)=>{
    const docRef =  doc(db,Collections.USUARIOS,uid,"unlockedBadges",badge.name)
    return await setDoc(docRef,{badge:doc(db,`badges/${badge.name}`),timestamp:serverTimestamp()})
}

export const getAllBadges=async()=>{
    const querySnapshot = await getDocs(collection(db, Collections.BADGES));
    const badges = querySnapshot.docs.map((doc) => {
        const data = doc.data()
        const id = doc.id
        return{
            id,
            ...data
        }
    })
    return badges
}

export const addBadge=async(badge)=>{
    await setDoc(doc(db, Collections.BADGES,badge.name),badge)
}

export default async function handler(req,res){
    const {method,body} = req
    switch(method){
        case 'GET':
            const querySnapshot = await getDocs(collection(db, Collections.BADGES));
            const sol = querySnapshot.docs.map((doc) => {
            const data = doc.data()
            const id = doc.id
            return{
                id,
                ...data
            }})
            return res.status(200).json(sol)
        case 'POST':
            console.log("body ",body)
            //const result = await addDoc(collection(db, Collections.BADGES),body)
            const result = await addUnlockedBadge(body)
            console.log(result)
            return res.status(200).json(result)
        default:
            return res.status(400).json({
                msg:'This method does not exits'
            })
    };
} 


