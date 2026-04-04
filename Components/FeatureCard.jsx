import useInView from '../Hooks/useInView.jsx'

function FeatureCard({textHeading,textParagraph,icon,index = 0}) {
  const [ref, isVisible] = useInView({
    threshold:1
  })

  // Calculate delay for stagger effect (only on desktop screens)
  const delay = window.innerWidth >= 640 ? index * 200 : 0; // 200ms delay between each card on desktop

  return (
     <div ref={ref} className='flex flex-col items-center h-full justify-center'>
        <div 
          className={`transition-all duration-500 -translate-x-20 opacity-0 ${isVisible ? 'opacity-100 translate-x-0' : ''}`}
          style={{ transitionDelay: `${delay}ms` }}
        >
          {icon}
        </div>
        <h2 
          className={`my-2 transition-all duration-500 text-white ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-30 opacity-0'}`}
          style={{ transitionDelay: `${delay + 100}ms` }}
        >
          {textHeading}
        </h2>
        <p 
          className={`text-white transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-30 opacity-0'}`}
          style={{ transitionDelay: `${delay + 200}ms` }}
        >
          {textParagraph}
        </p>
     </div>
  )
}

export default FeatureCard