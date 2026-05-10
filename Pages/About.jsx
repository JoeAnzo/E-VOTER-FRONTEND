import React from 'react'
import illustration from '../src/assets/vote-online.jpg'
function About() {
  return (
    <section className='dark:text-white text-slate-900 px-2 text-left ml-4 space-y-8 sm:mx-auto  max-w-200'>
        <h2 className="text-2xl mt-4">About Evoter – Digitizing Student Leadership in Uganda</h2>
        <div>
            <img src={illustration} className='w-full object-cover h-90 rounded-md'/>
        </div>
        <h2 className="text-2xl">Our Story</h2>
        <p className='leading-relaxed'>
            Evoter was born in a Senior 5 classroom. After watching a school election take an entire day to count paper ballots—with issues of lost papers, unclear marks, and fatigue—the founder realized there had to be a better way. In an era where Ugandan students are increasingly comfortable with technology, Evoter bridges the gap between traditional paper voting and a secure, instant, and transparent digital future.
        </p>
        <h2 className="text-2xl">
            What We Do
        </h2>
        <p className='leading-relaxed'>
            Evoter is a secure, school-based digital voting platform designed specifically for primary and secondary schools in Uganda. Teachers and administrators upload student and staff lists, and the system instantly generates unique, 6-digit One-Time Passwords (OTPs). These OTPs expire immediately after a vote is cast, ensuring that each eligible person votes only once.
        </p>
        <h2 className="text-2xl">Our Mission</h2>
        <p className='leading-relaxed'>
            To make school elections free, fair, and fast. By eliminating manual counting, we reduce the risk of human error, cut down election time from hours to minutes, and restore trust in the student leadership process.
        </p>
        <h2 className="text-2xl">
            Why Evoter?
        </h2>
        <p className='leading-relaxed'>
            Speed: Results are available instantly after voting closes.Integrity: OTPs expire upon use, preventing double-voting.
            Accessibility: Works on basic smartphones, tablets, or school computer labs.
            Local Focus: Built with the Ugandan school calendar, network conditions, and administrative structure in mind.
        </p>
        <h2 className="text-2xl">
            Our Vision
        </h2>
        <p className='leading-relaxed'>
            A Uganda where every primary and secondary school student experiences fair digital elections, preparing them for a tech-driven future. 
        </p>
    </section>
  )
}

export default About