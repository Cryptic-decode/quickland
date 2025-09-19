import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  showIcon?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function Logo({ className, showIcon = true, size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      {showIcon && (
        <div className="relative">
          {/* Abstract Q Icon */}
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>
          </div>
          {/* Landing strip accent */}
          <div className="absolute -bottom-1 -right-1 w-3 h-1 bg-primary/60 rounded-full"></div>
        </div>
      )}
      <span className={cn('font-bold gradient-text', sizeClasses[size])}>
        QuickLand
      </span>
    </div>
  )
}
