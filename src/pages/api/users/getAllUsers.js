import { collection, getDocs} from "firebase/firestore";
import { db } from "../../../config/client";
const Collections = {
    USERS: 'users'
    // ARTISTS: 'artists',
    // ALBUMS: 'albums'
}

export default async function getAllUsers (req,res){
    const querySnapshot = await getDocs(collection(db, Collections.USERS));
    const coleccion = collection(db, 'users');
    //console.log(coleccion)

    var users = [];
    querySnapshot.docs.forEach(doc => {

        if(doc.data().type=="client"){

            users.push(doc.data());
        }


    });
    let usersBonus = users.sort(
        (p1, p2) => (p1.bonos < p2.bonos) ? 1 : (p1.bonos > p2.bonos) ? -1 : 0);

    //console.log(usersBonus);

    let usersNormales = users.sort(
        (p1, p2) => (p1.normales < p2.normales) ? 1 : (p1.normales > p2.normales) ? -1 : 0);

    //console.log(usersNormales);

    return res.status(200).json(users) 
}