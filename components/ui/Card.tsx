import { ReactNode } from 'react'
import { clsx } from 'clsx'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export default function Card({ children, className, hover = false }: CardProps) {
  return (
    <div className={clsx(
      'bg-white rounded-xl shadow-sm border border-gray-200 p-6',
      hover && 'hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer',
      className
    )}>
      {children}
    </div>
  )
}