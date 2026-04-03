import React,{useRef,useState,useEffect} from 'react'

export default function useInView(options) {
    const ref = useRef(null)
    const [isVisible,setisvisible] = useState(false)

    useEffect(()=>{
        const observer = new IntersectionObserver(([entry])=>{
            setisvisible(entry.isIntersecting)
        },options)
        if (ref.current){
            observer.observe(ref.current)
        }
        return () => {
            observer.disconnect()
        }
    },[options])
    return [ref, isVisible]
}
