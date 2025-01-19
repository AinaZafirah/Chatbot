import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Message from "../Components/Message";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Link } from "react-router-dom";
import axios from "axios";
import { db } from "../Components/firebase-config.js";
import {
  addDoc,
  setDoc,
  collection,
  where,
  query,
  doc,
  onSnapshot,
  serverTimestamp,
  arrayUnion,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import Cookies from "universal-cookie";
import { ChatContext } from "./ChatContext.js";
import { v4 as uuid } from "uuid";
import { AuthContext } from "../context/authContext.js";
import DashboardIcon from "@mui/icons-material/Dashboard";


const cookies = new Cookies();

export default function ChatbotFrontEnd() {
  const [isAuth, setIsAuth] = React.useState(cookies.get("auth-token"));

  const drawerWidth = 240;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const [chats, setChatHistory] = React.useState([]);
  const { dispatch } = React.useContext(ChatContext);
  const [idl, setidl] = React.useState();

  useEffect(() => {
    const getChatHistory = () => {
      // const unsub = onSnapshot(doc(db, "History", isAuth), (doc) => {
      //   setChatHistory(doc.data());
      //   // console.log(doc.data());
      // });

      const a = query(
        collection(db, "NewChatwithId"),
        where("Username", "==", isAuth)
      );

      const unsubscribe = onSnapshot(a, (querySnapshot) => {
        const cities = [];
        querySnapshot.forEach((doc) => {
          cities.push(doc.data());
        });
        // console.log("Current cities in CA: ", cities.join(", "));
        console.log(cities);
        setChatHistory(cities);
      });

      return () => {
        unsubscribe();
      };
    };

    isAuth && getChatHistory();
  }, [isAuth]);

  const [input, setInput] = useState([]);

  const [subject, setSubject] = useState([
    "Science",
    "Mathematics",
    "Information Technology",
  ]);

  const [learningStyle, setLearningStyle] = useState([
    "Visual",
    "Verbal",
    "Active",
    "Reflective",
    "Intuitive",
    "Sensitive",
    "Sequential",
    "Global",
  ]);

  const [lessonPlan, setLessonPlan] = useState([
    "Lesson Plan",
    "Exercise",
    "Teaching Strategies",
    "Environment",
  ]);

  const [chooseSubject, setChooseSubject] = useState();
  const [chooseStyle, setChooseStyle] = useState();
  const [choosePlan, setChoosePlan] = useState();

  const handleSelect = (u) => {

    dispatch({ type: "CHANGE_USER", payload: u });
    setidl(u);

    const unSub = onSnapshot(doc(db, "Chats", u), (doc) => {
      doc.exists() && setInput(doc.data().messages);
    });

    return () => {
      unSub();
    };
  };

  console.log(input);

  const newChat = async (e) => {
    const mess = "Hello. Welcome to EduSys. Please choose a subject.";
    const ChatId = await addDoc(collection(db, "History"), {
      Username: isAuth,
      Date: serverTimestamp(),
      LastMessage: mess,
    });

    // setidl(ChatId.id);

    await setDoc(doc(db, "NewChatwithId", ChatId.id), {
      Username: isAuth,
      Date: serverTimestamp(),
      LastMessage: mess,
      Id: ChatId.id,
    });

    await setDoc(doc(db, "Chats", ChatId.id), {
      messages: arrayUnion({
        id: uuid(),
        text: mess,
        senderId: 1,
        date: Timestamp.now(),
      }),
    });
  };

  const historyDisplay = (h) => {
    let responseArray = h.split("**");
    if (responseArray[0].length === 0) {
      // console.log(responseArray[1]);
      return responseArray[1];
    } else {
      // console.log(responseArray[0]);
      return responseArray[0];
    }
  };

  const drawer = (
    <div>
      <Toolbar />

      <Divider />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mx: 1,
        }}
      >
        <Link to="/Chats" style={{ textDecoration: "none" }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            startIcon={<AddCircleIcon sx={{ fontSize: "large" }} />}
            sx={{
              mt: 2,
              mb: 2,
              width: "200px",
              backgroundColor: "#FFD500",
              "&:hover": {
                backgroundColor: "#FFD500",
              },
              fontFamily: "Calistoga",
              borderRadius: "30px",
              fontSize: "18px",
            }}
            onClick={newChat}
          >
            New Chat
          </Button>
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mx: 1,
        }}
      >
        {/* <Link to="/Editor" style={{ textDecoration: "none" }}> */}
        <Link to="/notes" style={{ textDecoration: "none" }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            startIcon={<EditNoteIcon sx={{ fontSize: "large" }} />}
            sx={{
              mt: 2,
              mb: 2,
              width: "200px",
              backgroundColor: "#FFD500",
              "&:hover": {
                backgroundColor: "#FFD500",
              },
              fontFamily: "Calistoga",
              borderRadius: "30px",
              fontSize: "18px",
            }}
          >
            Editor
          </Button>
        </Link>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mx: 1,
        }}
      >
        {/* <Link to="/Editor" style={{ textDecoration: "none" }}> */}
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            startIcon={<DashboardIcon sx={{ fontSize: "large" }} />}
            sx={{
              mt: 2,
              mb: 2,
              width: "200px",
              backgroundColor: "#FFD500",
              "&:hover": {
                backgroundColor: "#FFD500",
              },
              fontFamily: "Calistoga",
              borderRadius: "30px",
              fontSize: "18px",
            }}
          >
            Dashboard
          </Button>
        </Link>
      </Box>

      <Divider />

      <List>
        <Typography
          variant="h6"
          sx={{ fontFamily: "Calistoga", mb: 1, my: 1, mx: 2 }}
        >
          Chat History
        </Typography>
        {chats.map((item, index) => (
          <Link
            key={index}
            to={`/Chats/${item.Id}`}
            style={{ textDecoration: "none" }}
          >
            <ListItem sx={{ py: 0 }} component="div">
              <ListItemButton>
                <ListItemText
                  onClick={() => {
                    handleSelect(item.Id);
                    // setidl(item.Id);
                  }}
                  primary={
                    <Typography component="h8" sx={{ fontFamily: "Calistoga" }}>
                      {/* {item.Date} */}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      sx={{ fontFamily: "Calistoga" }}
                    >
                      {/* {item.LastMessage} */}
                      {historyDisplay(item.LastMessage)}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  const messagesListRef = React.createRef();
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([
    {
      content:
        "Hello. Welcome to EduSys. Please choose an learning styles option below?",
      isCustomer: false,
      choices: [
        "Visual",
        "Verbal",
        "Active",
        "Reflective",
        "Intuitive",
        "Sensitive",
        "Sequential",
        "Global",
      ],
    },
    {
      content: "Visual",
      isCustomer: true,
    },
    {
      content:
        "Visual learning is one of the three primary learning styles, along with auditory and kinesthetic learning. People who are visual learners often find it easier to understand and remember information when it is presented to them visually, rather than through verbal or written means. Here are key aspects of visual learning styles, along with some strategies that visual learners can use to enhance their educational experience:",
      isCustomer: false,
    },
    {
      content: "Choose an action",
      isCustomer: false,
      choices: ["LO", "Exercise", "Teaching Strategies", "Environment"],
    },
  ]);
  const [answer, setAnswer] = useState("");

  const sendMessage = (content) => {
    setMessageInput(content);
    setNewMessage(content);

    switch (content) {
      case subject.includes(content):
        setChooseSubject(content);
        break;
      case learningStyle.includes(content):
        setChooseStyle(content);
        break;
      case lessonPlan.includes(content):
        setChoosePlan(content);
        break;

      default:
        break;
    }
  };

  const { currentUser } = useContext(AuthContext);

  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    sendMessage(messageInput);
    setMessageInput("");

    if (subject.includes(messageInput)) {
      setChooseSubject(messageInput);
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDMd1u72JRH-_T6Fc_8BZP_SOtLo6yNLS4",
        method: "post",
        data: {
          contents: [
            {
              parts: [
                {
                  text: messageInput + " subject in primary school in malaysia",
                },
              ],
            },
          ],
        },
      });

      const ans =
        response["data"]["candidates"][0]["content"]["parts"][0]["text"];

      await updateDoc(doc(db, "Chats", idl), {
        messages: arrayUnion({
          id: uuid(),
          text: messageInput,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });

      await updateDoc(doc(db, "Chats", idl), {
        messages: arrayUnion({
          id: uuid(),
          text: ans,
          senderId: 1,
          date: Timestamp.now(),
        }),
      });

      await updateDoc(doc(db, "NewChatwithId", idl), {
        LastMessage: ans,
      });

      setMessages([
        ...messages,
        {
          content: messageInput,
          isCustomer: true,
        },
        {
          content:
            response["data"]["candidates"][0]["content"]["parts"][0]["text"],
          isCustomer: false,
        },
      ]);

      console.log(
        response["data"]["candidates"][0]["content"]["parts"][0]["text"]
      );
      console.log(answer);

    } else if (learningStyle.includes(messageInput)) {
      setChooseStyle(messageInput);
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDMd1u72JRH-_T6Fc_8BZP_SOtLo6yNLS4",
        method: "post",
        data: {
          contents: [
            {
              parts: [
                {
                  text:
                    messageInput +
                    " learning style for " +
                    chooseSubject +
                    " subject in primary school in malaysia",
                },
              ],
            },
          ],
        },
      });

      const ans =
        response["data"]["candidates"][0]["content"]["parts"][0]["text"];

      await updateDoc(doc(db, "Chats", idl), {
        messages: arrayUnion({
          id: uuid(),
          text: messageInput,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });

      await updateDoc(doc(db, "Chats", idl), {
        messages: arrayUnion({
          id: uuid(),
          text: ans,
          senderId: 1,
          date: Timestamp.now(),
        }),
      });

      await updateDoc(doc(db, "NewChatwithId", idl), {
        LastMessage: ans,
      });

      setMessages([
        ...messages,
        {
          content: messageInput,
          isCustomer: true,
        },
        {
          content:
            response["data"]["candidates"][0]["content"]["parts"][0]["text"],
          isCustomer: false,
        },
      ]);

      console.log(
        response["data"]["candidates"][0]["content"]["parts"][0]["text"]
      );
      console.log(answer);
      // return;
    } else if (lessonPlan.includes(messageInput)) {
      setChoosePlan(messageInput);
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDMd1u72JRH-_T6Fc_8BZP_SOtLo6yNLS4",
        method: "post",
        data: {
          contents: [
            {
              parts: [
                {
                  text:
                    messageInput +
                    " for " +
                    chooseStyle +
                    " learning style for " +
                    chooseSubject +
                    " subject in primary school in malaysia",
                },
              ],
            },
          ],
        },
      });

      const ans =
        response["data"]["candidates"][0]["content"]["parts"][0]["text"];

      await updateDoc(doc(db, "Chats", idl), {
        messages: arrayUnion({
          id: uuid(),
          text: messageInput,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });

      await updateDoc(doc(db, "Chats", idl), {
        messages: arrayUnion({
          id: uuid(),
          text: ans,
          senderId: 1,
          date: Timestamp.now(),
        }),
      });

      await updateDoc(doc(db, "NewChatwithId", idl), {
        LastMessage: ans,
      });

      setMessages([
        ...messages,
        {
          content: messageInput,
          isCustomer: true,
        },
        {
          content:
            response["data"]["candidates"][0]["content"]["parts"][0]["text"],
          isCustomer: false,
        },
      ]);

      console.log(
        response["data"]["candidates"][0]["content"]["parts"][0]["text"]
      );
      console.log(answer);
      // return;
    }
  };


  const chatDisplay = (c) => {
    const sections = c.split("\n").map((section) => section.trim());

    const formattedSections = sections.map((section, index) => {
      // Check if the section is a bullet point with nested bold text
      if (section.startsWith("* ") && section.includes("**")) {
        const boldPart = section.match(/\*\*(.*?)\*\*/)[1]; // Extract the bold text
        const restPart = section.replace(`**${boldPart}**`, "").slice(2).trim(); // Remove the bold text from the section
        return (
          <li key={index}>
            <b>{boldPart}</b>
            {restPart}
          </li>
        );
      }
      // Check if the section is a bullet point
      else if (section.startsWith("* ")) {
        return <li key={index}>{section.slice(2).trim()}</li>;
      }
      // Check if the section has *** or ** formatting
      else if (section.startsWith("***") && section.endsWith("***")) {
        return <b key={index}>{section.slice(3, -3).trim()}</b>;
      } else if (section.startsWith("**") && section.endsWith("**")) {
        return <b key={index}>{section.slice(2, -2).trim()}</b>;
      } else {
        // Handle regular text
        return <div key={index}>{section}</div>;
      }
    });

    // Ensure the formattedSections array correctly renders as React components
    return <div>{formattedSections}</div>;
  };

  return (
    <Box Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      ></AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#53A2BE",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />

        <Box>
          <Box
            ref={messagesListRef}
            sx={{
              overflow: "scroll",
              overflowX: "hidden",
              flex: 1,
              height: "80vh",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ m: 1, mr: 2 }}>
              {input.map((item, index) => (
                <Message
                  key={index}
                  content={
                    item.senderId === 1 ? chatDisplay(item.text) : item.text
                  }
                  // content={item.text}
                  // image={message.image}
                  isCustomer={item.senderId === 1 ? false : true}
                  choices={
                    // input[4].text === "Science" ? subject : lessonPlan
                    item.text ===
                    "Hello. Welcome to EduSys. Please choose a subject."
                      ? // index === 0 ? choice1 : choice2

                        // subject.includes("Science") ? subject : learningStyle
                        // input[index]
                        subject
                      : subject.includes(input[index - 1].text)
                      ? learningStyle
                      : learningStyle.includes(input[index - 1].text)
                      ? lessonPlan
                      : subject
                  }
                  handleChoice={sendMessage}
                />
              ))}
            </Box>
          </Box>
          <Box
            component="form"
            sx={{
              mt: 2,
              display: "flex",
              flexFlow: "row",
              gap: 1,
            }}
          >
            <TextField
              variant="outlined"
              size="small"
              value={messageInput}
              onChange={(event) => setMessageInput(event.target.value)}
              inputProps={{ readOnly: true }}
              fullWidth
            />
            <Button onClick={handleSubmit} type="submit">
              <SendIcon />
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
