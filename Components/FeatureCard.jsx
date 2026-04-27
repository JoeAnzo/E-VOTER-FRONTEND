import useInView from '../Hooks/useInView.jsx'

function FeatureCard({textHeading,textParagraph,icon,index = 0}) {
  const [ref, isVisible] = useInView({
    threshold:0.5
  })

  // Calculate delay for stagger effect (only on desktop screens)
  const delay =  index * 200  // 200ms delay between each card on desktop

  return (
     <div ref={ref} className='flex flex-col items-center h-full justify-center'>
        <div 
          style={{
            transform: isVisible ? 'translateX(0)' : 'translateX(-5rem)',
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 500ms ease-out, transform 500ms ease-out',
            transitionDelay: `${delay}ms`,
            willChange: 'opacity, transform'
          }}
        >
          {icon}
        </div>
        <h2 
          className='my-2 text-slate-900 dark:text-white'
          style={{
            transform: isVisible ? 'translateY(0)' : 'translateY(2rem)',
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 500ms ease-out, transform 500ms ease-out',
            transitionDelay: `${delay + 100}ms`,
            willChange: 'opacity, transform'
          }}
        >
          {textHeading}
        </h2>
        <p 
          className='dark:text-white text-slate-900'
          style={{
            transform: isVisible ? 'translateY(0)' : 'translateY(2rem)',
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 500ms ease-out, transform 500ms ease-out',
            transitionDelay: `${delay + 200}ms`,
            willChange: 'opacity, transform'
          }}
        >
          {textParagraph}
        </p>
     </div>
  )
}

export default FeatureCard