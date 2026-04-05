import clsx from 'clsx'

function ChatBubble({ role, text }) {
  const isUser = role === 'user'

  return (
    <div className={clsx('flex w-full', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={clsx(
          'max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-md transition',
          isUser
            ? 'rounded-br-md bg-cyan-300 text-slate-900'
            : 'rounded-bl-md border border-white/25 bg-white/15 text-white backdrop-blur-md'
        )}
      >
        {text}
      </div>
    </div>
  )
}

export default ChatBubble
