import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/client"; 


export default async function handler(req,res){
    const querySnapshot = await getDocs(collection(db, "badges"));
    const result = querySnapshot.docs.map((doc) => {
        const data = doc.data()
        const id = doc.id
        return{
            id,
            ...data
        }
    });

    return res.status(200).json(result)
}
