// "use client"

// import { useNavigate } from "react-router-dom"
// import Swal from "sweetalert2"
// import { logout } from "../utils/auth"

// const Sidebar = ({ isCollapsed, onToggle }) => {
//   const navigate = useNavigate()

//   const handleLogout = () => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You will be logged out of your account",
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, logout",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         logout()
//         Swal.fire({
//           title: "Logged Out!",
//           text: "You have been successfully logged out",
//           icon: "success",
//           timer: 1500,
//           showConfirmButton: false,
//         }).then(() => {
//           navigate("/login")
//         })
//       }
//     })
//   }

//   return (
//     <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`} id="sidebar">
//       <div className="logo">
//         <img src="assets/img/logo/logo.png" alt="logo" />
//       </div>
//       <div className="d-flex justify-content-between">
//         <button className="theme-btn mb-3 w-100 btn btn-primary me-2">+ New Chat</button>
//         <a>
//           <img src="assets/img/search.png" alt="search" />
//         </a>
//       </div>

//       <ul className="chat-list">
//         <li>
//           <img src="assets/img/chaticon.png" style={{ width: "20px", marginRight: "10px" }} alt="chat" />
//           What is posh policy?
//         </li>
//         <li>
//           <img src="assets/img/chaticon.png" style={{ width: "20px", marginRight: "10px" }} alt="chat" />
//           What is sandwich rule?
//         </li>
//         <li className="active">
//           <img src="assets/img/chaticon.png" style={{ width: "20px", marginRight: "10px" }} alt="chat" />
//           Salary date?
//           <span className="trashed">
//             <i className="fa fa-trash text-white"></i>
//           </span>
//         </li>
//       </ul>

//       <div className="mt-4 text-muted small">Yesterday</div>
//       <ul className="chat-list">
//         <li>
//           <img src="assets/img/chaticon.png" style={{ width: "20px", marginRight: "10px" }} alt="chat" />
//           What's in your mind?
//         </li>
//         <li>
//           <img src="assets/img/chaticon.png" style={{ width: "20px", marginRight: "10px" }} alt="chat" />
//           What's in your mind?
//         </li>
//         <li>
//           <img src="assets/img/chaticon.png" style={{ width: "20px", marginRight: "10px" }} alt="chat" />
//           What's in your mind?
//         </li>
//       </ul>

//       <button className="btn logout-btn mt-4" onClick={handleLogout}>
//         <i className="fas fa-sign-out-alt me-2"></i> Log Out
//       </button>
//     </div>
//   )
// }

// export default Sidebar



"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { logout } from "../utils/auth"
import { listChats, createChat, deleteChat } from "../api/chat"

const Sidebar = ({
  isCollapsed,
  onToggle,
  onNewChat,
  onChatSelect,
  activeChatId,
  refreshTrigger,
  roleModule, // Removed default "risk" value to make it truly dynamic
}) => {
  const navigate = useNavigate()
  const [chats, setChats] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchChats()
  }, [])

  useEffect(() => {
    if (refreshTrigger) {
      fetchChats()
    }
  }, [refreshTrigger])

  const fetchChats = async () => {
    try {
      setLoading(true)
      const response = await listChats()
      setChats(response.chats || [])
    } catch (error) {
      console.error("Failed to fetch chats:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleNewChat = async () => {
    try {
      const newChat = await createChat({
        title: "New Chat",
        roleModule: roleModule, // Uses dynamic roleModule passed from parent
      })
      setChats((prev) => [newChat.chat, ...prev])
      if (onNewChat) {
        onNewChat(newChat.chat._id)
      }
    } catch (error) {
      console.error("Failed to create new chat:", error)
    }
  }

  const handleChatClick = (chatId) => {
    if (onChatSelect) {
      onChatSelect(chatId)
    }
  }

  const handleDeleteChat = async (e, chatId, chatTitle) => {
    e.stopPropagation() // Prevent chat selection when clicking delete

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You want to delete "${chatTitle}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    })

    if (result.isConfirmed) {
      try {
        await deleteChat(chatId)
        setChats((prev) => prev.filter((chat) => chat._id !== chatId))

        // If deleted chat was active, clear selection
        if (chatId === activeChatId && onChatSelect) {
          onChatSelect(null)
        }

        Swal.fire({
          title: "Deleted!",
          text: "Your chat has been deleted.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        })
      } catch (error) {
        console.error("Failed to delete chat:", error)
        Swal.fire({
          title: "Error!",
          text: "Failed to delete chat. Please try again.",
          icon: "error",
        })
      }
    }
  }

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
        Swal.fire({
          title: "Logged Out!",
          text: "You have been successfully logged out",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate("/login")
        })
      }
    })
  }

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`} id="sidebar">
      <div className="logo">
        <img src="assets/img/logo/logo.png" alt="logo" />
      </div>
      <div className="d-flex justify-content-between">
        <button className="theme-btn mb-3 w-100 btn btn-primary me-2" onClick={handleNewChat}>
          + New Chat
        </button>
        <a>
          <img src="assets/img/search.png" alt="search" />
        </a>
      </div>

      <ul className="chat-list">
        {loading ? (
          <li>Loading chats...</li>
        ) : chats.length > 0 ? (
          chats.map((chat) => (
            <li
              key={chat._id}
              className={chat._id === activeChatId ? "active" : ""}
              onClick={() => handleChatClick(chat._id)}
              style={{ cursor: "pointer" }}
            >
              <img src="assets/img/chaticon.png" style={{ width: "20px", marginRight: "10px" }} alt="chat" />
              {chat.title}
              <span
                className="trashed"
                onClick={(e) => handleDeleteChat(e, chat._id, chat.title)}
                style={{ cursor: "pointer" }}
              >
                <i className="fa fa-trash text-white"></i>
              </span>
            </li>
          ))
        ) : (
          <li>No chats yet</li>
        )}
      </ul>

      <div className="mt-4 text-muted small">Yesterday</div>
      <ul className="chat-list">
        <li>
          <img src="assets/img/chaticon.png" style={{ width: "20px", marginRight: "10px" }} alt="chat" />
          What's in your mind?
        </li>
        <li>
          <img src="assets/img/chaticon.png" style={{ width: "20px", marginRight: "10px" }} alt="chat" />
          What's in your mind?
        </li>
        <li>
          <img src="assets/img/chaticon.png" style={{ width: "20px", marginRight: "10px" }} alt="chat" />
          What's in your mind?
        </li>
      </ul>

      <button className="btn logout-btn mt-4" onClick={handleLogout}>
        <i className="fas fa-sign-out-alt me-2"></i> Log Out
      </button>
    </div>
  )
}

export default Sidebar


