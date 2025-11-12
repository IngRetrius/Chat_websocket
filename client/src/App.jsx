import { useEffect, useState, useRef } from 'react'
import { io } from 'socket.io-client'
import './App.css'

function App() {
  const [socket, setSocket] = useState(null)
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [username, setUsername] = useState('')
  const [usernameInput, setUsernameInput] = useState('')
  const [isJoined, setIsJoined] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isJoined) {
      const newSocket = io('http://localhost:3000')
      setSocket(newSocket)

      newSocket.on("initialMessages", (initialMessages) => {
        setMessages(initialMessages)
      })

      newSocket.on("newMessage", (message) => {
        setMessages((prev) => [...prev, message])
      })

      newSocket.emit("userJoined", username)

      return () => newSocket.disconnect()
    }
  }, [isJoined, username])

  const handleJoin = (event) => {
    event.preventDefault()
    if (usernameInput.trim()) {
      setUsername(usernameInput.trim())
      setIsJoined(true)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (socket && inputMessage.trim()) {
      socket.emit('sendMessage', {
        username: username,
        text: inputMessage.trim()
      })
      setInputMessage('')
    }
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    const hours = date.getHours()
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const ampm = hours >= 12 ? 'PM' : 'AM'
    const formattedHours = hours % 12 || 12
    return `${formattedHours}:${minutes} ${ampm}`
  }

  if (!isJoined) {
    return (
      <div className="join-container">
        <div className="join-card">
          <h1 className="join-title">Mini Chat con WebSockets</h1>
          <p className="join-subtitle">Ingresa tu nombre para comenzar</p>
          <form onSubmit={handleJoin} className="join-form">
            <input
              type="text"
              placeholder="Tu nombre"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              className="join-input"
              maxLength={20}
              autoFocus
            />
            <button type="submit" className="join-button">
              Unirse al Chat
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1 className="chat-title">Mini Chat con WebSockets</h1>
        <span className="username-display">Usuario: {username}</span>
      </div>

      <div className="messages-container">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-wrapper ${msg.isSystem ? 'system' : msg.username === username ? 'own' : 'other'}`}
          >
            {msg.isSystem ? (
              <div className="system-message">
                {msg.text}
              </div>
            ) : (
              <div className="message-bubble">
                <div className="message-header">
                  <span className="message-username">{msg.username}</span>
                  <span className="message-time">{formatTime(msg.timestamp)}</span>
                </div>
                <div className="message-text">{msg.text}</div>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="message-form">
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="message-input"
        />
        <button type="submit" className="send-button">
          Enviar
        </button>
      </form>
    </div>
  )
}

export default App
