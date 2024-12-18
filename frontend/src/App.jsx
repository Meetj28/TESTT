// import { useEffect, useState } from "react";
// import "./App.css";
// import io from "socket.io-client";
// import Editor from "@monaco-editor/react";

// const socket = io("https://realtime-code-editor-utu5.onrender.com");

// const App = () => {
//   const [joined, setJoined] = useState(false);
//   const [roomId, setRoomId] = useState("");
//   const [userName, setUserName] = useState("");
//   const [language, setLanguage] = useState("javascript");
//   const [code, setCode] = useState("// start code here");
//   const [copySuccess, setCopySuccess] = useState("");
//   const [users, setUsers] = useState([]);
//   const [typing, setTyping] = useState("");

//   useEffect(() => {
//     socket.on("userJoined", (users) => {
//       setUsers(users);
//     });

//     socket.on("codeUpdate", (newCode) => {
//       setCode(newCode);
//     });

//     socket.on("userTyping", (user) => {
//       setTyping(`${user.slice(0, 8)}... is Typing`);
//       setTimeout(() => setTyping(""), 2000);
//     });

//     socket.on("languageUpdate", (newLanguage) => {
//       setLanguage(newLanguage);
//     });

//     return () => {
//       socket.off("userJoined");
//       socket.off("codeUpdate");
//       socket.off("userTyping");
//       socket.off("languageUpdate");
//     };
//   }, []);

//   useEffect(() => {
//     const handleBeforeUnload = () => {
//       socket.emit("leaveRoom");
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);

//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, []);

//   const joinRoom = () => {
//     if (roomId && userName) {
//       socket.emit("join", { roomId, userName });
//       setJoined(true);
//     }
//   };

//   const leaveRoom = () => {
//     socket.emit("leaveRoom");
//     setJoined(false);
//     setRoomId("");
//     setUserName("");
//     setCode("// start code here");
//     setLanguage("javascript");
//   };

//   const copyRoomId = () => {
//     navigator.clipboard.writeText(roomId);
//     setCopySuccess("Copied!");
//     setTimeout(() => setCopySuccess(""), 2000);
//   };

//   const handleCodeChange = (newCode) => {
//     setCode(newCode);
//     socket.emit("codeChange", { roomId, code: newCode });
//     socket.emit("typing", { roomId, userName });
//   };

//   const handleLanguageChange = (e) => {
//     const newLanguage = e.target.value;
//     setLanguage(newLanguage);
//     socket.emit("languageChange", { roomId, language: newLanguage });
//   };

//   if (!joined) {
//     return (
//       <div className="join-container">
//         <div className="join-form">
//           <h1>Join Code Room</h1>
//           <input
//             type="text"
//             placeholder="Room Id"
//             value={roomId}
//             onChange={(e) => setRoomId(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Your Name"
//             value={userName}
//             onChange={(e) => setUserName(e.target.value)}
//           />
//           <button onClick={joinRoom}>Join Room</button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="editor-container">
//       <div className="sidebar">
//         <div className="room-info">
//           <h2>Code Room: {roomId}</h2>
//           <button onClick={copyRoomId} className="copy-button">
//             Copy Id
//           </button>
//           {copySuccess && <span className="copy-success">{copySuccess}</span>}
//         </div>
//         <h3>Users in Room:</h3>
//         <ul>
//           {users.map((user, index) => (
//             <li key={index}>{user.slice(0, 8)}...</li>
//           ))}
//         </ul>
//         <p className="typing-indicator">{typing}</p>
//         <select
//           className="language-selector"
//           value={language}
//           onChange={handleLanguageChange}
//         >
//           <option value="javasript">JavaScript</option>
//           <option value="python">Python</option>
//           <option value="java">Java</option>
//           <option value="cpp">C++</option>
//         </select>
//         <button className="leave-button" onClick={leaveRoom}>
//           Leave Room
//         </button>
//       </div>

//       <div className="editor-wrapper">
//         <Editor
//           height={"100%"}
//           defaultLanguage={language}
//           language={language}
//           value={code}
//           onChange={handleCodeChange}
//           theme="vs-dark"
//           options={{
//             minimap: { enabled: false },
//             fontSize: 14,
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default App;



// import { useEffect, useState } from "react";
// import "./App.css";
// import io from "socket.io-client";
// import Editor from "@monaco-editor/react";

// const socket = io("https://realtime-code-editor-utu5.onrender.com");

// const App = () => {
//   const [joined, setJoined] = useState(false);
//   const [roomId, setRoomId] = useState("");
//   const [userName, setUserName] = useState("");
//   const [language, setLanguage] = useState("javascript");
//   const [code, setCode] = useState("// start code here");
//   const [copySuccess, setCopySuccess] = useState("");
//   const [users, setUsers] = useState([]);
//   const [typing, setTyping] = useState("");
//   const [output, setOutput] = useState("");

//   useEffect(() => {
//     socket.on("userJoined", (users) => {
//       setUsers(users);
//     });

//     socket.on("codeUpdate", (newCode) => {
//       setCode(newCode);
//     });

//     socket.on("userTyping", (user) => {
//       setTyping(`${user.slice(0, 8)}... is Typing`);
//       setTimeout(() => setTyping(""), 2000);
//     });

//     socket.on("languageUpdate", (newLanguage) => {
//       setLanguage(newLanguage);
//     });

//     return () => {
//       socket.off("userJoined");
//       socket.off("codeUpdate");
//       socket.off("userTyping");
//       socket.off("languageUpdate");
//     };
//   }, []);

//   useEffect(() => {
//     const handleBeforeUnload = () => {
//       socket.emit("leaveRoom");
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);

//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, []);

//   const joinRoom = () => {
//     if (roomId && userName) {
//       socket.emit("join", { roomId, userName });
//       setJoined(true);
//     }
//   };

//   const leaveRoom = () => {
//     socket.emit("leaveRoom");
//     setJoined(false);
//     setRoomId("");
//     setUserName("");
//     setCode("// start code here");
//     setLanguage("javascript");
//     setOutput("");
//   };

//   const copyRoomId = () => {
//     navigator.clipboard.writeText(roomId);
//     setCopySuccess("Copied!");
//     setTimeout(() => setCopySuccess(""), 2000);
//   };

//   const handleCodeChange = (newCode) => {
//     setCode(newCode);
//     socket.emit("codeChange", { roomId, code: newCode });
//     socket.emit("typing", { roomId, userName });
//   };

//   const handleLanguageChange = (e) => {
//     const newLanguage = e.target.value;
//     setLanguage(newLanguage);
//     socket.emit("languageChange", { roomId, language: newLanguage });
//   };

//   const runCode = async () => {
//     try {
//       const response = await fetch("https://emkc.org/api/v2/piston/execute", {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           language: language,
//           version: "*", // Use "*" to select the latest version, or specify a version like "3.10.0"
//           files: [
//             {
//               content: code, // 'code' holds the source code from your editor
//             },
//           ],
//         }),
//       });
  
//       const result = await response.json();
  
//       // Concatenate and display the output from the API response
//       setOutput(result.run.output || "No output received.");
//     } catch (error) {
//       setOutput("Error running code: " + error.message);
//     }
//   };
  

//   if (!joined) {
//     return (
//       <div className="join-container">
//         <div className="join-form">
//           <h1>Join Code Room</h1>
//           <input
//             type="text"
//             placeholder="Room Id"
//             value={roomId}
//             onChange={(e) => setRoomId(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Your Name"
//             value={userName}
//             onChange={(e) => setUserName(e.target.value)}
//           />
//           <button onClick={joinRoom}>Join Room</button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="editor-container">
//       <div className="sidebar">
//         <div className="room-info">
//           <h2>Code Room: {roomId}</h2>
//           <button onClick={copyRoomId} className="copy-button">
//             Copy Id
//           </button>
//           {copySuccess && <span className="copy-success">{copySuccess}</span>}
//         </div>
//         <h3>Users in Room:</h3>
//         <ul>
//           {users.map((user, index) => (
//             <li key={index}>{user.slice(0, 8)}...</li>
//           ))}
//         </ul>
//         <p className="typing-indicator">{typing}</p>
//         <select
//           className="language-selector"
//           value={language}
//           onChange={handleLanguageChange}
//         >
//           <option value="javascript">JavaScript</option>
//           <option value="python">Python</option>
//           <option value="java">Java</option>
//           <option value="cpp">C++</option>
//         </select>
//         <button className="leave-button" onClick={leaveRoom}>
//           Leave Room
//         </button>
//       </div>

//       <div className="editor-wrapper">
//         <Editor
//           height={"80%"}
//           defaultLanguage={language}
//           language={language}
//           value={code}
//           onChange={handleCodeChange}
//           theme="vs-dark"
//           options={{
//             minimap: { enabled: false },
//             fontSize: 14,
//           }}
//         />
//         <button className="run-button" onClick={runCode}>
//           Run Code
//         </button>
//         <div className="output-container">
//           <h3>Output:</h3>
//           <pre>{output}</pre>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;




import { useEffect, useState, useRef } from "react";
import "./App.css";
import io from "socket.io-client";
import Editor from "@monaco-editor/react";

const socket = io("https://realtime-code-editor-utu5.onrender.com");

const App = () => {
  const [joined, setJoined] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("// start coding here");
  const [users, setUsers] = useState([]);
  const [typing, setTyping] = useState("");
  const [output, setOutput] = useState("");
  const [userCursors, setUserCursors] = useState({});
  const editorRef = useRef(null);

  const userColors = useRef({}); // Map to store colors for each user

  useEffect(() => {
    socket.on("userJoined", (users) => {
      setUsers(users);
    });

    socket.on("codeUpdate", (newCode) => {
      setCode(newCode);
    });

    socket.on("userTyping", (user) => {
      setTyping(`${user.slice(0, 8)}... is Typing`);
      setTimeout(() => setTyping(""), 2000);
    });

    socket.on("languageUpdate", (newLanguage) => {
      setLanguage(newLanguage);
    });

    socket.on("updateCursors", (cursors) => {
      setUserCursors(cursors);
    });

    return () => {
      socket.off("userJoined");
      socket.off("codeUpdate");
      socket.off("userTyping");
      socket.off("languageUpdate");
      socket.off("updateCursors");
    };
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      socket.emit("leaveRoom");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const joinRoom = () => {
    if (roomId && userName) {
      socket.emit("join", { roomId, userName });
      setJoined(true);
    }
  };

  const leaveRoom = () => {
    socket.emit("leaveRoom");
    setJoined(false);
    setRoomId("");
    setUserName("");
    setCode("// start coding here");
    setLanguage("javascript");
    setOutput("");
    setUserCursors({});
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    socket.emit("codeChange", { roomId, code: newCode });
    socket.emit("typing", { roomId, userName });
  };

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    socket.emit("languageChange", { roomId, language: newLanguage });
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;

    editor.onDidChangeCursorPosition(() => {
      const position = editor.getPosition();
      socket.emit("cursorChange", { roomId, userName, position });
    });
  };

  useEffect(() => {
    if (editorRef.current) {
      const decorations = Object.entries(userCursors).map(([user, position]) => {
        if (!userColors.current[user]) {
          // Assign a random color to the user if not already assigned
          userColors.current[user] = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        }

        return {
          range: new monaco.Range(
            position.lineNumber,
            position.column,
            position.lineNumber,
            position.column
          ),
          options: {
            className: "remote-cursor",
            glyphMarginClassName: "remote-cursor-marker",
            isWholeLine: false,
            inlineClassName: "remote-cursor-inline",
            afterContentClassName: "remote-cursor-content",
            hoverMessage: { value: `**${user}**` },
            beforeContentClassName: `cursor-${userColors.current[user]}`,
          },
        };
      });

      editorRef.current.deltaDecorations([], decorations);
    }
  }, [userCursors]);

  const runCode = async () => {
    try {
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: language,
          version: "*",
          files: [{ content: code }],
        }),
      });

      const result = await response.json();
      setOutput(result.run.output || "No output received.");
    } catch (error) {
      setOutput("Error running code: " + error.message);
    }
  };

  if (!joined) {
    return (
      <div className="join-container">
        <div className="join-form">
          <h1>Join Code Room</h1>
          <input
            type="text"
            placeholder="Room Id"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Your Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button onClick={joinRoom}>Join Room</button>
        </div>
      </div>
    );
  }

  return (
    <div className="editor-container">
      <div className="sidebar">
        <div className="room-info">
          <h2>Code Room: {roomId}</h2>
          <h3>Users:</h3>
          <ul>
            {users.map((user, index) => (
              <li key={index}>{user}</li>
            ))}
          </ul>
          <button onClick={leaveRoom}>Leave Room</button>
        </div>
      </div>
      <div className="editor-wrapper">
        <Editor
          height="80%"
          defaultLanguage={language}
          language={language}
          value={code}
          onChange={handleCodeChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
          }}
          onMount={handleEditorDidMount}
        />
        <button onClick={runCode}>Run Code</button>
        <div>
          <h3>Output:</h3>
          <pre>{output}</pre>
        </div>
      </div>
    </div>
  );
};

export default App;
