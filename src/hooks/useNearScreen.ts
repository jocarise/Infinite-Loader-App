import {useEffect, useState, useRef} from 'react'

export type UseNearScreenProps = {
  distance?: string, 
  externalRef?: any, 
  once?: boolean
}

/**
 * Check if a element is near of the viewport screen
 *
 * @param {string} distance distance between element and screen
 * @param {Object} externalRef useRef assigned to a element for check if it is near of the screen
 * @param {boolean} once TRUE: isNearScreen change to true one time and dont execute again, FALSE: isNearScreen change to true multiple times
 * @return {Object} "isNearScreen" boolean value to check when the screen is near of the given element with the ref "fromRef" 
 */
export default function useNearScreen ({ distance = '100px', externalRef, once = true }:UseNearScreenProps = {}) {
  const [isNearScreen, setShow] = useState(false)
  const fromRef = useRef()

  useEffect(() => {
    let observer: IntersectionObserver

    const element = externalRef ? externalRef.current : fromRef.current

    const onChange = (entries:any, observer: any) => {
      const el = entries[0]
      if (el.isIntersecting) {
        setShow(true)
        once && observer.disconnect()
      } else {
        !once && setShow(false)
      }
    }

    Promise.resolve(
      typeof IntersectionObserver !== 'undefined'
      //@ts-ignore 
      ? IntersectionObserver : import('intersection-observer')
        
    ).then(() => {
      observer = new IntersectionObserver(onChange, {
        rootMargin: distance
      })
  
      if (element) observer.observe(element)
    })

    return () => observer && observer.disconnect()
  })

  return {isNearScreen, fromRef}
}