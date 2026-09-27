import type { ComponentPropsWithoutRef, ElementType } from 'react'

type TileProps<T extends ElementType> = {
  as?: T
  className?: string
} & ComponentPropsWithoutRef<T>

// Frosted card whose border lights up near the cursor (see .tile in index.css)
export function Tile<T extends ElementType = 'div'>({ as, className = '', ...rest }: TileProps<T>) {
  const Component = as ?? 'div'
  return <Component className={`tile ${className}`} {...rest} />
}
