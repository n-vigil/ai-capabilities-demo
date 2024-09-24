import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'

export function EmptyScreen({ text }: { text: JSX.Element }) {
  return (
    <div className="mx-auto max-w-2xl px-4 px-8">
      {text}
    </div>
  )
}
