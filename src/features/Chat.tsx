

import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import { red } from "@mui/material/colors";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io"
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { deleteUserChats, getUserChats, sendChatRequest } from "../helpers/api-communicator";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// const chatMessages = [
//   {
//     role: "user",
//     content: "Hello, can you tell me the weather forcast for tomorrow?",

//   },
//   {
//     role: 'assistant',
//     content: "Sure! I can help with that. Please provide me with your location.",
//   },
//   {
//     role: "user",
//     content: "I'm in New York City",
//   },
//   {
//     role: "assistant",
//     content: "Great! Give me a moment to fetch the weather information for New York City.",
//   },
//   {
//     role: "assistant",
//     content: "The weather forcast for New York City tomorrow is: Sunny with a high of 78°F and a low of 60°F."
//   },
//   {
//     role: "user",
//     content: "That sounds perfect! Thanks for the information.",
//   },
//   {
//     role: "assistant",
//     content: "You're welcome! If you have any more questions, feel free to ask."
//   }
// ]
type Message = {
  role: "user" | "assistant";
  content: string;
}

export default function Chat() {
const navigate=useNavigate()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const auth = useAuth()
  const [chatMessages, setChatMessages] = useState<Message[]>([]);


  const handleSubmit = async () => {
    // console.log(inputRef.current?.value)
    const content = inputRef.current?.value as string;

    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage])
    const chatData = await sendChatRequest(content)

    if(chatData.success===true){

      setChatMessages([...chatData.chats])
    }

  }

  const handleDeleteChats=async()=>{
    try {
      toast.loading("Deleting Chats",{id:"deletechats"})
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Deleted Chats Successfully ",{id:"deletechats"})
    } catch (error) {
      console.log(error)
      toast.error("Deleting Chats Failed",{id:"deletechats"})
    }
  }

useEffect(()=>{
  if(!auth?.user){
return navigate("/sign-in")
  }
},[auth])


// useEffect(()=>{
//   if(auth?.user){
// console.log(auth.user)
//   }
// },[auth])

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadchats" })
      getUserChats().then((data) => {
        setChatMessages([...data.chats]);
        toast.success("Successfully loaded chats", { id: "loadchats" })
      }).catch(err => {
        console.log(err)
        toast.error("Loading Failed", { id: "loadchats" })
      })
    }
  }, [auth])

  
  return (
    <>

      <Header />
      <Box
        sx={{
          display: "flex",
          flex: 1,
          width: "100%",
          height: "100%",
          mt: 3,
          gap: 3,
        }}
      >
        <Box sx={{ display: { md: "flex", xs: "none", sm: "none" }, flex: 0.2, flexDirection: "column" }}>
          <Box sx={{ display: "flex", width: "100%", height: "60vh", bgcolor: "rgb(17,29,39)", borderRadius: 5, flexDirection: "column", mx: 3 }}>
            <Avatar
              sx={{
                mx: "auto",
                my: 2,
                bgcolor: "white",
                color: "black",
                fontWeight: 700,
              }}
            >{auth?.user?.name[0]}
            {/* {auth?.user?.name.split(" ")[1][0]} */}
            </Avatar>
            
            <Typography sx={{ mx: 'auto', fontFamily: "work sans" }}>
              You are talking to a ChatBOT
            </Typography>
            <Typography sx={{ mx: 'auto', fontFamily: "work sans", my: 4, p: 3 }}>
              You can ask some questions related to knowledge,Business,Advices,Education,etc. But avoid sharing personal information
            </Typography>
            <Button onClick={handleDeleteChats} sx={{
              width: "200px", my: "auto", color: "white", fontWeight: "700", borderRadius: 3, mx: 'auto', bgcolor: red[300], ":hover": {
                bgcolor: red.A400,
              }
            }}>
              Clear Conversation
            </Button>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flex: { md: 0.8, xs: 1, sm: 1 }, flexDirection: "column", px: 3 }}>
          <Typography
            sx={{
              // textAlign: "center",
              fontSize: "40px",
              color: "white",
              mb: 2,
              mx: "auto",
              fontWeight: "600"
            }}
          >
            Model-GPT 3.5 Turbo
          </Typography>

          <Box
            sx={{
              width: "100%",
              height: "60vh",
              borderRadius: 3,
              mx: "auto",
              display: "flex",
              flexDirection: "column",
              overflow: "scroll",
              overflowX: "hidden",
              overflowY: "auto",
              scrollBehavior: "smooth",
            }}>
            {/* {chatMessages.map((chat)=>{
                <div>{chat.content}</div>
              })} */}
            {chatMessages.map((chat, index) => (
              // @ts-ignore
              <ChatItem content={chat.content} role={chat.role} key={index} />
            ))}
          </Box>
          <div style={{ width: "100%", 
          // padding: "20px", 
          borderRadius: 8, backgroundColor: "rgb(17,27,39)", display: "flex", margin: "auto" }}>
            {" "}
            <input type="text"
              /// <reference path="" />
              ref={inputRef}

              style={{ width: "100%", background: "transparent", padding: "30px", border: "none", outline: "none", color: "white", fontSize: "20px" }} />
            <IconButton onClick={handleSubmit} sx={{ 
              ml: "auto", 
              mx:1,
            color: "white"
             }}><IoMdSend /></IconButton>
          </div>
        </Box>
      </Box>
    </>
  )
}
