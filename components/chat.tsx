'use client'

import { cn } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { EmptyScreen } from '@/components/empty-screen'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { useEffect, useState } from 'react'
import { useUIState, useAIState } from 'ai/rsc'
import { Message, Session } from '@/lib/types'
import { usePathname, useRouter } from 'next/navigation'
import { useScrollAnchor } from '@/lib/hooks/use-scroll-anchor'
import { toast } from 'sonner'

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
  session?: Session
  missingKeys: string[]
}

export function Chat({ id, className, session, missingKeys }: ChatProps) {
  const router = useRouter()
  const path = usePathname()
  const [input, setInput] = useState('')
  const [messages] = useUIState()
  const [aiState] = useAIState()

  const [_, setNewChatId] = useLocalStorage('newChatId', id)

  useEffect(() => {
    if (session?.user) {
      if (!path.includes('chat') && messages.length === 1) {
        window.history.replaceState({}, '', `/chat/${id}`)
      }
    }
  }, [id, path, session?.user, messages])

  useEffect(() => {
    const messagesLength = aiState.messages?.length
    if (messagesLength === 2) {
      router.refresh()
    }
  }, [aiState.messages, router])

  useEffect(() => {
    setNewChatId(id)
  })

  useEffect(() => {
    missingKeys.map(key => {
      toast.error(`Missing ${key} environment variable!`)
    })
  }, [missingKeys])

  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor()

  const exampleText = (
        <div className="mx-auto max-w-2xl px-4 px-8">
      <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
        <h1 className="text-lg font-semibold">
        </h1>
        <p className="leading-normal text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
          incididuntut labore et dolore magna aliqua.
          This is an AI chatbot app that will help you understand the importance of
          aligning AI to human values.

        </p>
        <p className="leading-normal text-muted-foreground">
          Here we will explore the concepts of goal misgeneralization, goal misspecification,
          and specification gaming.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
          incididuntut labore et dolore magna aliqua.

          Testing block. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
          incididuntut labore et dolore magna aliqua.

          Try asking the chatbot about these concepts to learn more or make a wish to see
          how the AI can interpret or misinterpret your intentions. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
          incididuntut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
  )
  const shortEx = (
    <div className="mx-auto max-w-2xl px-4 px-8">
      <h1>Lorem ipsum</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
  );

  return (
    <div
      className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]"
      ref={scrollRef}
    >
      <div
        className={cn('pb-[200px] pt-4 md:pt-10', className)}
        ref={messagesRef}
      >
        <EmptyScreen text={exampleText} />
        <EmptyScreen text={exampleText} />
        <EmptyScreen text={exampleText} />
        <EmptyScreen text={exampleText} />
        {messages.length ? (
          <ChatList messages={messages} isShared={false} session={session} />
        ) : null}
        
        <div className="w-full h-px" ref={visibilityRef} />
      </div>
      <ChatPanel
        id={id}
        input={input}
        setInput={setInput}
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />
    </div>
  )
}
