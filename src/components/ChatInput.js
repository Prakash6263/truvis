// "use client"

// import { useState } from "react"

// const ChatInput = ({ onSendMessage }) => {
//   const [message, setMessage] = useState("")

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     if (message.trim()) {
//       onSendMessage(message)
//       setMessage("")
//     }
//   }

//   return (
//     <div className="chat-input">
//       <form onSubmit={handleSubmit} className="d-flex align-items-center fill-width" style={{width:"-webkit-fill-available"}}>
//         <input
//           type="text"
//           placeholder="Type to ask our ai.."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <i className="fas fa-paperclip" style={{marginRight:"10px"}}></i>
//         <button type="submit">
//           <i className="fa fa-paper-plane text-white"></i>
//         </button>
//       </form>
//     </div>
//   )
// }

// export default ChatInput



"use client"

import { useState, useRef } from "react"

const ChatInput = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState("")
  const [selectedFile, setSelectedFile] = useState(null)
  const fileInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if ((message.trim() || selectedFile) && !disabled) {
      onSendMessage(message, selectedFile)
      setMessage("")
      setSelectedFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10MB")
        return
      }
      setSelectedFile(file)
    }
  }

  const removeFile = () => {
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="chat-input">
      {selectedFile && (
        <div
          style={{
            padding: "10px",
            backgroundColor: "#f0f0f0",
            borderRadius: "5px",
            margin: "10px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>📎 {selectedFile.name}</span>
          <button
            type="button"
            onClick={removeFile}
            style={{
              background: "none",
              border: "none",
              color: "#999",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            ✕
          </button>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="d-flex align-items-center fill-width"
        style={{ width: "-webkit-fill-available" }}
      >
        <input
          type="text"
          placeholder={disabled ? "Select a chat to start messaging..." : "Type to ask our ai.."}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={disabled}
        />

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          style={{ display: "none" }}
          accept="image/*,.pdf,.doc,.docx,.txt"
        />

        <i
          className="fas fa-paperclip"
          style={{
            marginRight: "10px",
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.5 : 1,
          }}
          onClick={() => !disabled && fileInputRef.current?.click()}
        />

        <button
          type="submit"
          disabled={disabled || (!message.trim() && !selectedFile)}
          style={{
            opacity: disabled || (!message.trim() && !selectedFile) ? 0.5 : 1,
            cursor: disabled || (!message.trim() && !selectedFile) ? "not-allowed" : "pointer",
          }}
        >
          <i className="fa fa-paper-plane text-white"></i>
        </button>
      </form>
    </div>
  )
}

export default ChatInput

