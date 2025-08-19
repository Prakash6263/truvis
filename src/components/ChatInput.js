"use client"

import { useState } from "react"

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message)
      setMessage("")
    }
  }

  return (
    <div className="chat-input">
      <form onSubmit={handleSubmit} className="d-flex align-items-center fill-width" style={{width:"-webkit-fill-available"}}>
        <input
          type="text"
          placeholder="Type to ask our ai.."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <i className="fas fa-paperclip" style={{marginRight:"10px"}}></i>
        <button type="submit">
          <i className="fa fa-paper-plane text-white"></i>
        </button>
      </form>
    </div>
  )
}

export default ChatInput
