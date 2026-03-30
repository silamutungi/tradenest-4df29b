import { type ReactNode } from 'react'
import { cn } from '../../lib/utils'

function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('rounded-lg border border-border bg-card text-card-foreground', className)}>{children}</div>
}

function CardHeader({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('flex flex-col space-y-1.5 p-6', className)}>{children}</div>
}

function CardTitle({ className, children }: { className?: string; children: ReactNode }) {
  return <h3 className={cn('text-2xl font-semibold leading-none tracking-tight', className)}>{children}</h3>
}

function CardContent({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('p-6 pt-0', className)}>{children}</div>
}

export { Card, CardHeader, CardTitle, CardContent }
