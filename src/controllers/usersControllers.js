const base_url=process.env.NEXT_PUBLIC_base_api_url


// export const deleteUser = async(selectedUser)=>{
//     try{
//       await fetch(`http://localhost:3000/api/users/${selectedUser._id}`,{
//       method:"DELETE",})
//     }catch (error){
//       console.log(error)
//     }
// }

// export const addUser = async (newUser)=>{
//     try{
//         await fetch('http://localhost:3000/api/users',{
//             method:'POST',
//             headers:{
//                 "Content-Type":"application/json"
//             },
//             body : JSON.stringify(newUser)
//         })
//     }catch(error){
//         console.log(error)
//     }
//   }
  
// export const updateUser = async ({query,newUser})=>{
// try{
//     await fetch('http://localhost:3000/api/users/'+query.id,{
//         method:'PUT',
//         headers:{
//             "Content-Type":"application/json"
//         },
//         body : JSON.stringify(newUser)
//     })
// }catch(error){
//     console.log(error)
// }
// }

// export const getUser = async(query)=>{
//     console.log('la query es : ', query )
//     const res = await fetch(`http://localhost:3000/api/users/getById?id=${query.id}`)
//     const data = await res.json()
//     return data   
// }


export const getAllUsers = async(query)=>{
    try{
        const res = await fetch(`${base_url}/users/getAllUsers`)
        const data = await res.json()
        return res.status(200).json(data)   
    }catch(error){
        console.log(error)
    }
    console.log('la query es : ', query )
    
}
