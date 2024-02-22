const API_BASE_URL= import.meta.env.VITE_API_BASE_URL;

// export const loginUser=async (email:string,password:string)=>{
// const res=await axios.post("/user/sign-in",{email,password});
// if(res.status!==200){
//     throw new Error("Unable to login");
// }
// const data=await res.data;
// return data;
// }



// export const loginUser = async (email: string, password: string) => {
//     const res = await fetch('/api/v1/user/sign-in', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password })
//     })
//     const data = await res.json()
//     return data;
// }
export const loginUser = async (email: string, password: string) => {
    const res = await fetch(`${API_BASE_URL}/api/v1/user/sign-in`, {
        method: 'POST',
        credentials:'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    })
    const data = await res.json()
    return data;
}


// export const signupUser=async (name:string,email:string,password:string)=>{
// const res=await axios.post("/user/sign-up",{name,email,password});
// if(res.status!==201){
//     throw new Error("Unable to signup");
// }
// const data=await res.data;
// return data;
// }

// export const signupUser = async (name: string, email: string, password: string) => {
//     const res = await fetch('/api/v1/user/sign-up', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ name, email, password })
//     })
//     const data = await res.json()
//     console.log(data)
//     return data;

// }
export const signupUser = async (name: string, email: string, password: string) => {
    const res = await fetch(`${API_BASE_URL}/api/v1/user/sign-up`, {
        method: 'POST',
        credentials:'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password })
    })
    const data = await res.json()
    console.log(data)
    return data;

}



// export const checkAuthStatus=async ()=>{
// const res=await axios.get("/user/auth-status");
// if(res.status!==200){
//     throw new Error("Unable to authenticate");
// }
// const data=await res.data;
// return data;
// }

// export const checkAuthStatus = async () => {
//     const res = await fetch('/api/v1/user/auth-status', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     })
//     const data = await res.json()
//     return data;
// }
export const checkAuthStatus = async () => {
    const res = await fetch(`${API_BASE_URL}/api/v1/user/auth-status`, {
        method: 'GET',
        credentials:'include',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const data = await res.json()
    return data;
}


// export const sendChatRequest=async (message:string)=>{
// const res=await axios.post("/chat/new",{message});
// if(res.status!==200){
//     throw new Error("Unable to send chat");
// }
// const data=await res.data;
// return data;
// }


// export const sendChatRequest = async (message: string) => {
//     const res = await fetch('/api/v1/chat/new', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ message })
//     })
//     const data = await res.json();
//     return data;
// }
export const sendChatRequest = async (message: string) => {
    const res = await fetch(`${API_BASE_URL}/api/v1/chat/new`, {
        method: 'POST',
        credentials:'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message })
    })
    const data = await res.json();
    return data;
}


// export const getUserChats=async ()=>{
// const res=await axios.get("/chat/all-chats");
// if(res.status!==200){
//     throw new Error("Unable to send chat");
// }
// const data=await res.data;
// return data;
// }



// export const getUserChats = async () => {
//     const res = await fetch('/api/v1/chat/all-chats', {
//         method: 'GET',
//         headers: {
//             'Content-Type': "application/json"
//         }
//     })
//     const data = await res.json()
//     if(data.success===true){

//         return data;
//     }
// }
export const getUserChats = async () => {
    const res = await fetch(`${API_BASE_URL}/api/v1/chat/all-chats`, {
        method: 'GET',
        credentials:'include',
        headers: {
            'Content-Type': "application/json"
        }
    })
    const data = await res.json()
    if(data.success===true){

        return data;
    }
}

// export const deleteUserChats=async ()=>{
// const res=await axios.delete("/chat/delete");
// if(res.status!==200){
//     throw new Error("Unable to delete chat");
// }
// const data=await res.data;
// return data;
// }


// export const deleteUserChats = async () => {
//     const res = await fetch('/api/v1/chat/delete', {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     const data = res.json()
//     return data;
// }
export const deleteUserChats = async () => {
    const res = await fetch(`${API_BASE_URL}/api/v1/chat/delete`, {
        method: 'DELETE',
        credentials:'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = res.json()
    return data;
}

// export const logoutUser=async ()=>{
// const res=await axios.get("/user/logout");
// if(res.status!==200){
//     throw new Error("Unable to logout");
// }
// const data=await res.data;
// return data;
// }


// export const logoutUser = async () => {
//     const res = await fetch('/api/v1/user/logout', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     })
//     const data = await res.json()
//     return data;
// }
export const logoutUser = async () => {
    const res = await fetch(`${API_BASE_URL}/api/v1/user/logout`, {
        method: 'GET',
        credentials:'include',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const data = await res.json()
    return data;
}