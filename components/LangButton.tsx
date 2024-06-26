"use client";

import Image from 'next/image';
import { FC } from 'react'
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

import en from '@/public/assets/icons/en.png'
import ar from '@/public/assets/icons/ar.png'
interface LangButtonProps {
  lng: string;
}

const LangButton: FC<LangButtonProps> = ({ lng }) => {
  const router = useRouter()
  router.replace
  const pathName = usePathname()
  // get the last part of the path
  const path = pathName.split('/')
  // rejected paths
  const rejected = ['ar', 'en', 'favicon.ico', 'robots.txt', 'google2ac6b561a18c4332.html']
  // initial href
  let href = `/${lng}`
  // check if the last part of the path is a language
  const isLang = rejected.includes(path[path.length - 1])
  // if it is not a language, add the last part of the path to the href
  if (!isLang) {
    if(path.includes('blogs') && path.length > 3){
    href += `/blogs/${path[path.length - 1]}`
    }else
    href += `/${path[path.length - 1]}`
  }
  const onClickHandler = () => {
    router.replace(href)
  }
  return <button
    type='button'
    onClick={onClickHandler}
    className='bg-white hover:bg-red-600 text-black  rounded-3xl sm:rounded-md flex items-center gap-1 py-1 px-3 text-xs sm:text-base duration-300'>
    <Image src={lng === 'ar' ? ar : en} alt={lng} className='w-5 h-3 sm:w-6 sm:h-6' />
    {lng === 'ar' ? 'العربية' : 'English'}
  </button>
}

export default LangButton