import ChatLayoutRecruiter from '@/features/dashboard/components/chat/chat-layout-recruiter'
import React from 'react'

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <ChatLayoutRecruiter>
        {children}
    </ChatLayoutRecruiter>
  )
}
