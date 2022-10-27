import axios from "axios";
import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import io from "socket.io-client";

const Home = () => {
  const [document, setDocument] = useState("");
  const [user, setUser] = useState("");
  const [receivedDocu, setReceivedDocu] = useState("");
  const [sender, setSender] = useState("");
  // const [myId, setMyId] = useState(0);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001/login")
  //     .then((response) => {
  //       if (response) {
  //         setMyId(response.data.id);
  //         console.log(response.data.id);
  //       }
  //     })
  //     .catch((error) => console.log(error));
  // }, []);

  const item = JSON.parse(localStorage.getItem("userId"));
  const myId = item.id;
  const userName = item.name;

  // socket.emit("send_message", { sessionId });
  const socket = io.connect("http://localhost:3001");
  socket.emit("connected", myId);

  socket.on("document_received", (data) => {
    setSender(data.sender);
    setReceivedDocu(data.document);
  });

  const sendDocument = () => {
    socket.emit("send_document", {
      myId: myId,
      receiverId: user,
      document: document,
    });
  };

  return (
    <div className="bg-slate-50 w-full h-screen">
      <Nav />
      <div className="flex flex-col justify-center items-center pt-32 px-10">
        <div className="flex flex-col w-80">
          <h1>User: {userName}</h1>
          <label>To:</label>
          <input
            type="text"
            className="p-2 mb-5"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <label>Document type:</label>
          <input
            type="text"
            className="p-2 mb-5"
            value={document}
            onChange={(e) => setDocument(e.target.value)}
          />
          <button
            onClick={sendDocument}
            className="bg-indigo-600 rounded p-2 text-white"
          >
            Send Message
          </button>
        </div>
        <div>
          <h1>Sender: {sender}</h1>
          <h1>Documents received: {receivedDocu}</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
