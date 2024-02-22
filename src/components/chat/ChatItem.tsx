import { Avatar, Box, Typography } from '@mui/material';
// import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useAuth } from '../../context/AuthContext';

function extractCodeFromString(message: string) {
    if (message.includes("```")) {
        const blocks = message.split('```');
        // console.log(blocks[1])
        return blocks;
    }
}

function isCodeBlock(str: string) {
    if (
        str.includes("=") ||
        str.includes(";") ||
        str.includes("[") ||
        str.includes("]") ||
        str.includes("{") ||
        str.includes("}") ||
        str.includes("#") ||
        str.includes("//")
    ) {
        console.log(str.split('\n')[0])
        return true;
    }
    return false;
}

function ChatItem({ content, role }: { content: string; role: "user" | "assistant"; }) {
    const auth = useAuth()
    const messageBlocks = extractCodeFromString(content)
    return (
        role === "assistant" ? (
            <Box
                sx={{
                    display: "flex",
                    p: 2,
                    bgcolor: "#004d5612",
                    gap: 2,
                    borderRadius: 2,
                    my: 1,
                }}
            >
                <Avatar sx={{ ml: "0" }}>
                    <img src="openai.png" alt="openai" width={"30px"} />
                </Avatar>
                <Box>
                    {!messageBlocks && (
                        <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
                    )}
                    {messageBlocks &&
                        messageBlocks.length &&
                        messageBlocks.map((block) =>
                        
                            isCodeBlock(block) ? (
                                
                                <SyntaxHighlighter style={coldarkDark} language={block.split("\n")[0]}>
                                    {block}
                                </SyntaxHighlighter>
                            ) : (
                                <Typography sx={{ fontSize: "20px" }}>{block}</Typography>
                            )
                        )}
                </Box>
            </Box>
        ) : (

            // <Box sx={{ display: "flex", p: 2, bgcolor: "#004d5612", my: 2, gap: 2 }}>
            //     <Avatar sx={{ ml: 0 }}>
            //         <img src="openai.png" alt="openai" width={"30px"} />
            //     </Avatar>
            //     <Box>
            //         <Typography fontSize={"20px"}>{content}</Typography>
            //     </Box>
            // </Box> :
            <Box sx={{ display: "flex",
             p: 2,
              bgcolor: "#004d56",
               gap: 2,
            //    my:2 ,
               borderRadius:2
               }}>
                <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
                    {auth?.user?.name[0]}
                    {/* {auth?.user?.name.split(" ")[1][0]} */}
                </Avatar>
                <Box>
                    {/* <Typography fontSize={"20px"}>{content}</Typography> */}
                    {!messageBlocks && (<Typography fontSize={"20px"}>{content}</Typography>)}
                    {messageBlocks && messageBlocks.length && messageBlocks.map((block) => (isCodeBlock(block) ?
                        (<SyntaxHighlighter style={coldarkDark} language='javascript'>
                            {block}
                        </SyntaxHighlighter>
                        ) :
                        (
                            <Typography fontSize={"20px"}>{block}</Typography>

                        )))}
                </Box>
            </Box>
        )
    )
}

export default ChatItem
