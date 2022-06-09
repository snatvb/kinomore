import logoUrl from '@/public/logo.svg'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

interface LogoProps {
  classN?: string
}

export const Logo: FC<LogoProps> = ({classN}) => {
  return (
    <Link href='/'>
      <a className={classNames('g-logo', classN)}>
        <Image
          layout="fill"
          src={logoUrl}
          alt="Kinomore"
        />
      </a>
    </Link>
  )
}