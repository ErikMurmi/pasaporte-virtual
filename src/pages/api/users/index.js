import { collection, getDocs,addDoc,doc,getDoc} from "firebase/firestore";
import { db } from "../../../config/client"; 

const Collections ={
    USERS : 'users',
    BADGES:'badges'
}

export const getAllUsers=async()=>{
    const querySnapshot = await getDocs(collection(db, Collections.USERS));
    var users = await querySnapshot.docs.reduce(async function(total,item){
        var user = item.data()
        var id = item.id
        var badges = await getUserUnlockedBadges(id)
        user.unlockedBadges = badges
        total.push(user)
        return total
    },[]);
    console.log('user: ', users)
    return users
}


export async function getUser (id){
    const docRef = doc(db,Collections.USERS,id)
    const docSnap = await getDoc(docRef)
    if(docSnap.exists()){
        return docSnap.data()
    }else{
        console.log('No user info found')
    }
}

export const getUserUnlockedBadges=async(id)=>{
    const queryBadges = await getDocs(collection(db,`${Collections.USERS}/${id}/unlockedBadges`));
    console.log('badges # ',queryBadges.docs.length)
    var result = queryBadges.docs.reduce(async function(total, item) {
        const data = item.data()
        const badge_doc = await getDoc(data.badge)
        const id = item.id
        const badge = badge_doc.data()
        total.push({id,...badge});
        return total;
    }, []);
    return result
}

export const addUser=async()=>{
    await addDoc(collection(db, Collections.USERS),body)
}

export default async function handler(req,res){
    const {method,body} = req
    switch(method){
        case 'GET':
            const sol = await getAllUsers()
            return res.status(200).json(sol)
        case 'POST':
            console.log("body ",body)
            //const result = await addDoc(collection(db, Collections.USERS),body)
            const result = await getUser(body.id)
            console.log(result)
            return res.status(200).json(result)
        default:
            return res.status(400).json({
                msg:'This method does not exits'
            })
    };
} 


