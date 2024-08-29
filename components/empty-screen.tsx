import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'

export function EmptyScreen({ text }: { text: string }) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
        <h1 className="text-lg font-semibold">
          {text}
        </h1>
        <p className="leading-normal text-muted-foreground">
          This is an AI chatbot app that will help you understand the importance of
          aligning AI to human values.

        </p>
        <p className="leading-normal text-muted-foreground">
          Here we will explore the concepts of goal misgeneralization, goal misspecification,
          and specification gaming.

          Testing block. 

          Try asking the chatbot about these concepts to learn more or make a wish to see
          how the AI can misinterpret your intentions.
        </p>
      </div>
    </div>
  )
}
