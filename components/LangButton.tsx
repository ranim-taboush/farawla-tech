"use client";

import Image from 'next/image';
import { FC } from 'react'

import en from '@/public/assets/icons/en.png'
import ar from '@/public/assets/icons/ar.png'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
interface LangButtonProps {
  lng: string;
}

const LangButton: FC<LangButtonProps> = ({ lng }) => {
  const router = usePathname()
  // get the last part of the path
  const path = router.split('/')
  // rejected paths
  const rejected = ['ar', 'en', 'favicon.ico']
  // initial href
  let href = `/${lng}`
  // check if the last part of the path is a language
  const isLang = rejected.includes(path[path.length - 1])
  // if it is not a language, add the last part of the path to the href
  if (!isLang) {
    href += `/${path[path.length - 1]}`
  }
  return <Link
    href={href}
    className='bg-white text-black  rounded-3xl sm:rounded-md flex items-center gap-1 py-1 px-3 text-xs sm:text-base'>
    <Image src={lng === 'ar' ? ar : en} alt={lng} className='w-5 h-3 sm:w-6 sm:h-6' />
    {lng === 'ar' ? 'العربية' : 'English'}
  </Link>
}

export default LangButton