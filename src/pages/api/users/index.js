import { async } from "@firebase/util";
import { collection, getDocs,addDoc,doc,getDoc} from "firebase/firestore";
import { db } from "../../../config/client"; 

const Collections ={
    USERS : 'users',
    BADGES:'badges'
}

export const getAllUsers=async()=>{
    const querySnapshot = await getDocs(collection(db, Collections.USERS));
    const users = await  querySnapshot.docs.map(async (docp) => {
        const data = docp.data()
        const id = docp.id
        //console.log('llegue')
        const badges = await getUserUnlockedBadges(id)
        console.log('badges ', badges)
        return{
            id,
            ...data
        }
    })
    return users
}

export const getUserUnlockedBadges=async(id)=>{
    const queryBadges = await getDocs(collection(db,`${Collections.USERS}/${id}/unlockedBadges`));
        //console.log(queryBadges.docs.length)
    let badgesRq = []
    queryBadges.docs.forEach(async (docu)=>{
        const data = docu.data()
        const badge_doc = await getDoc(data.badge)
        const id = docu.id
        const badge = badge_doc.data()
        badgesRq.push(badge)
        console.log("badges iteration ",badgesRq)
    })
    console.log('br ', badgesRq)
    return badgesRq
}

export const addUser=async()=>{
    await addDoc(collection(db, Collections.USERS),body)
}

export default async function handler(req,res){
    const {method,body} = req
    switch(method){
        case 'GET':
            // const querySnapshot = await getDocs(collection(db, Collections.USERS));
            // const sol = querySnapshot.docs.map((doc) => {
            // const data = doc.data()
            // const id = doc.id
            // return{
            //     id,
            //     ...data
            // }})
            const sol = await getAllUsers()
            return res.status(200).json(sol)
        case 'POST':
            console.log("body ",body)
            const result = await addDoc(collection(db, Collections.USERS),body)
            console.log(result)
            return res.status(200).json(result)
        default:
            return res.status(400).json({
                msg:'This method does not exits'
            })
    };
} 


