import { useEffect, useMemo, useRef, useState } from 'react'
import { Bot, SendHorizonal } from 'lucide-react'
import ChatBubble from './ChatBubble'
import { sendChatMessage } from '../services/api'

const CHAT_STORAGE_KEY = 'ai-weather-chat-history'

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="rounded-2xl rounded-bl-md border border-white/25 bg-white/15 px-4 py-3 text-sm text-white backdrop-blur-md">
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    </div>
  )
}

function Chatbot({ city, fixed = true }) {
  const [messages, setMessages] = useState(() => {
    const stored = localStorage.getItem(CHAT_STORAGE_KEY)
    return stored
      ? JSON.parse(stored)
      : [
          {
            id: crypto.randomUUID(),
            role: 'bot',
            text: 'Hello! Ask me about weather plans, outfit ideas, or rain chances.'
          }
        ]
  })
  const [input, setInput] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState('')
  const chatEndRef = useRef(null)

  const suggestions = useMemo(
    () => [
      'Should I carry an umbrella today?',
      'Is this a good evening for a walk?',
      'What should I wear outside right now?'
    ],
    []
  )

  useEffect(() => {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages))
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (text) => {
    if (!text.trim()) {
      return
    }

    setError('')
    const userMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      text
    }

    setMessages((prev) => [...prev, userMessage])
    setIsSending(true)

    try {
      const result = await sendChatMessage(text, city)
      const botMessage = {
        id: crypto.randomUUID(),
        role: 'bot',
        text: result.reply
      }
      setMessages((prev) => [...prev, botMessage])
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to reach assistant right now.')
    } finally {
      setIsSending(false)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const text = input.trim()
    if (!text) {
      return
    }

    setInput('')
    await sendMessage(text)
  }

  return (
    <aside
      className={`glass-panel ${
        fixed
          ? 'fixed bottom-4 left-4 right-4 z-30 flex h-[60vh] flex-col rounded-3xl p-4 text-white shadow-2xl lg:bottom-6 lg:left-auto lg:right-8 lg:top-24 lg:h-[78vh] lg:w-[390px]'
          : 'flex h-[68vh] flex-col rounded-3xl p-4 text-white shadow-2xl'
      }`}
    >
      <div className="mb-3 flex items-center justify-between border-b border-white/20 pb-3">
        <div className="inline-flex items-center gap-2">
          <div className="rounded-xl bg-cyan-300/80 p-2 text-slate-900">
            <Bot size={16} />
          </div>
          <div>
            <p className="text-sm font-semibold">Weather Copilot</p>
            <p className="text-xs text-white/70">Context-aware AI assistant</p>
          </div>
        </div>
      </div>

      <div className="hide-scrollbar flex-1 space-y-3 overflow-y-auto rounded-2xl border border-white/15 bg-slate-950/20 p-3">
        {messages.map((message) => (
          <ChatBubble key={message.id} role={message.role} text={message.text} />
        ))}

        {isSending && <TypingIndicator />}
        <div ref={chatEndRef} />
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {suggestions.map((question) => (
          <button
            key={question}
            type="button"
            onClick={() => sendMessage(question)}
            className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs text-white/90 transition hover:bg-white/20"
          >
            {question}
          </button>
        ))}
      </div>

      {error ? <p className="mt-2 text-xs text-rose-200">{error}</p> : null}

      <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={city ? `Ask about ${city} weather...` : 'Ask your weather question...'}
          className="w-full rounded-2xl border border-white/25 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/60 outline-none focus:border-cyan-200/80"
        />
        <button
          type="submit"
          disabled={isSending}
          className="inline-flex items-center justify-center rounded-2xl bg-cyan-300/90 px-4 text-slate-900 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <SendHorizonal size={18} />
        </button>
      </form>
    </aside>
  )
}

export default Chatbot
