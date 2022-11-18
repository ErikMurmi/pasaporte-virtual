import { keys } from "@mui/system";
import { collection, getDocs, addDoc, doc, getDoc, setDoc, QuerySnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../../config/client";

const Collections = {
    USERS: 'users',
    BADGES: 'badges'
}

export const getAllUsers = async () => {
    const querySnapshot = await getDocs(collection(db, Collections.USERS));
    const coleccion = collection(db, 'users');
    console.log(coleccion)
 

    var users = [];
    querySnapshot.docs.forEach(doc => {

        if(doc.data().type=="client"){

            users.push(doc.data());
        }


    });
    let usersBonus = users.sort(
        (p1, p2) => (p1.bonos < p2.bonos) ? 1 : (p1.bonos > p2.bonos) ? -1 : 0);

    console.log(usersBonus);

    let usersNormales = users.sort(
        (p1, p2) => (p1.normales < p2.normales) ? 1 : (p1.normales > p2.normales) ? -1 : 0);

    console.log(usersNormales);

    return users;
}


export async function getUser(id) {
    const docRef = doc(db, Collections.USERS, id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        console.log('No user info found')
    }
}

export const getUserUnlockedBadges = async (id) => {
    const queryBadges = await getDocs(collection(db, `${Collections.USERS}/${id}/unlockedBadges`));
    let result = []
    for (let i = 0; i < queryBadges.docs.length; i++) {
        let data = queryBadges.docs[i].data()
        let id = queryBadges.docs[i].id
        let badge_doc = await getDoc(data.badge)
        let badge = badge_doc.data()
        result.push({ id, ...badge });
    }
    return result
}

export const addUser = async (user) => {
    await setDoc(doc(db, Collections.USERS, user.id), user)
}

export default async function handler(req, res) {
    const { method, body } = req
    switch (method) {
        case 'GET':
            const sol = await getAllUsers()
            return res.status(200).json(sol)
        case 'POST':
            console.log("body ", body)
            //const result = await addDoc(collection(db, Collections.USERS),body)
            const result = await getUser(body.id)
            console.log(result)
            return res.status(200).json(result)
        default:
            return res.status(400).json({
                msg: 'This method does not exits'
            })
    };
}


