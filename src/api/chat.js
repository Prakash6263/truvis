// const API_URL = "https://truvis.onrender.com"
const API_URL = "http://localhost:5000"

// ----------------------
// 🟢 List all chats
// ----------------------
export async function listChats() {
  const res = await fetch(`${API_URL}/api/chats`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  })
  if (!res.ok) throw new Error("Failed to list chats")
  return res.json()
}

// ----------------------
// 🟢 Get chat by ID
// ----------------------
export async function getChat(id) {
  const res = await fetch(`${API_URL}/api/chats/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  })
  if (!res.ok) throw new Error("Failed to fetch chat")
  return res.json()
}

// ----------------------
// 🟢 Create new chat
// ----------------------
export async function createChat({ title, firstMessage, roleModule }) {
  const res = await fetch(`${API_URL}/api/chats`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      title,
      firstMessage,
      roleModule, // ✅ required
    }),
  })
  if (!res.ok) throw new Error("Failed to create chat")
  return res.json()
}

export async function deleteChat(chatId) {
  const res = await fetch(`${API_URL}/api/chats/${chatId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  })
  if (!res.ok) throw new Error("Failed to delete chat")
  return res.json()
}

export function streamMessage(chatId, content, onToken, onDone, onError, onTitleUpdate) {
  const url = `${API_URL}/api/chats/${chatId}/stream`

  fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
      Accept: "text/event-stream",
    },
    body: JSON.stringify({ content }),
  })
    .then(async (res) => {
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let assistantReply = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split("\n")

        for (const line of lines) {
          const trimmedLine = line.trim()
          if (!trimmedLine) continue

          if (trimmedLine === "event: end") {
            continue // Just acknowledge the event, wait for [DONE]
          }

          if (trimmedLine.startsWith("data:")) {
            const data = trimmedLine.replace("data:", "").trim()
            if (!data) continue

            if (data === "[DONE]") {
              onDone?.(assistantReply)
              return
            }

            try {
              const json = JSON.parse(data)
              if (json.titleUpdate) {
                onTitleUpdate?.(json.titleUpdate.chatId, json.titleUpdate.newTitle)
              } else if (json.token) {
                assistantReply += json.token
                onToken?.(json.token)
              }
            } catch (err) {
              console.warn("Parse error:", err)
            }
          }
        }
      }
    })
    .catch((err) => onError?.(err))
}

export function uploadMessageStream(chatId, content, file, onToken, onDone, onError, onTitleUpdate) {
  const url = `${API_URL}/api/chats/${chatId}/upload/stream`
  const formData = new FormData()
  if (content) formData.append("content", content)
  if (file) formData.append("file", file)

  fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "text/event-stream",
    },
    body: formData,
  })
    .then(async (res) => {
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let assistantReply = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split("\n")

        for (const line of lines) {
          const trimmedLine = line.trim()
          if (!trimmedLine) continue

          if (trimmedLine === "event: end") {
            continue // Just acknowledge the event, wait for [DONE]
          }

          if (trimmedLine.startsWith("data:")) {
            const data = trimmedLine.replace("data:", "").trim()
            if (!data) continue

            if (data === "[DONE]") {
              onDone?.(assistantReply)
              return
            }

            try {
              const json = JSON.parse(data)
              if (json.titleUpdate) {
                onTitleUpdate?.(json.titleUpdate.chatId, json.titleUpdate.newTitle)
              } else if (json.token) {
                assistantReply += json.token
                onToken?.(json.token)
              }
            } catch (err) {
              console.warn("Parse error:", err)
            }
          }
        }
      }
    })
    .catch((err) => onError?.(err))
}