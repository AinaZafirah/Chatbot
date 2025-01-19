import React from "react";
import Login from "./View/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./View/Register";
import ForgotPassword from "./View/ForgotPassword";
import Dashboard from "./View/Dashboard";
import LandingPage from "./View/Landing";
import Chats from "./View/Chats";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import AllNotes from "./View/Notes/pages/AllNotes/AllNotes";
import ArchiveNotes from "./View/Notes/pages/ArchieveNotes/ArchieveNotes";
import TrashNotes from "./View/Notes/pages/TrashNotes/TrashNotes";
import TagNotes from "./View/Notes/pages/TagNotes/TagNotes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { CreateNoteModal, TagsModal } from "./View/Notes/components";
import Analytics from "./View/Analytics";

function App() {
  const { currentUser } = useContext(AuthContext);
    const { viewEditTagsModal, viewCreateNoteModal } = useSelector(
    (state) => state.modal)

  return (
     <div className="app">
      {/* modals */}
      {viewCreateNoteModal && <CreateNoteModal />}
      {viewEditTagsModal && <TagsModal type="edit" />}

      <ToastContainer
        position="bottom-right"
        theme="light"
        pauseOnHover
        autoClose={1500}
      />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Register" element={<Register />}></Route>
        <Route path="/PasswordReset" element={<ForgotPassword />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        {/* <Route path="/Chatbot" element={<ChatbotFrontEnd />}></Route> */}
        <Route path="/Chats" element={<Chats />}></Route>
        <Route path="/Chats/:id" element={<Chats />}></Route>
        <Route path="/analytics" element={<Analytics />}></Route>

        {/* <Route path="/Chats/:idl" element={<Chats />}></Route> */}

     
        <Route path="/notes" element={<AllNotes />} ></Route>
         <Route path="/tag/:name" element={<TagNotes />} />
        <Route path="/archive" element={<ArchiveNotes />}> </Route>
        <Route path="/trash" element={<TrashNotes />}> </Route>
        {/* <Route path="/404" element={<ErrorsPage />} /> */}
        {/* <Route path="/*" element={<Navigate to={"/404"} replace />} /> */}

      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
