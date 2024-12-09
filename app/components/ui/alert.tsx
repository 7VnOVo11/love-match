import * as React from 'react'

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive'
}

export function Alert({ variant = 'default', className, ...props }: AlertProps) {
  return (
    <div
      role="alert"
      className={`rounded-lg border p-4 ${
        variant === 'destructive' 
          ? 'border-red-500 bg-red-50 text-red-700' 
          : 'border-gray-200 bg-gray-50'
      }`}
      {...props}
    />
  )
} 