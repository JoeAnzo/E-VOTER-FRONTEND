import { Section } from 'lucide-react'
import React from 'react'
import {Helmet} from 'react-helmet'
import {PhoneCallIcon,SendIcon,LucideMessageCircleMore} from 'lucide-react'
import contactUsIllustration from '../src/assets/contact-us.png'
import useInView from '../Hooks/useInView.jsx'
function ContactUs() {
  return (
    <section className='h-screen flex flex-col'>
        <h2 className="text-center text-3xl text-slate-900 my-8 dark:text-white">Contact us here</h2>
        <p className='dark:text-white text-xl px-4 text-center text-slate-900 mb-8'>Our team is live and ready to support you and your needs 24/7</p>
        <div className='flex flex-col sm:flex-row justify-center gap-8 items-center'>
        <div className='px-4'>
          <img src={contactUsIllustration} className='w-full object-cover h-100'/>
        </div>
        <form className='sm:w-100 px-4 w-full flex flex-col gap-4'>
          <h2 className='dark:text-white text-slate-900 text-left'>SEND US A MESSAGE</h2>
          <label className='dark:text-white text-slate-900' htmlFor="name">Your Name</label>
          <input id='name' className='dark:bg-white bg-gray-300 rounded-md p-2' type='text' placeholder='Name'/>
          <label className='dark:text-white text-slate-900' htmlFor="subject">Subject</label>
          <input name='subject' className='dark:bg-white bg-gray-300 rounded-md p-2' type='text' placeholder='Subject'/>
          <label className='dark:text-white text-slate-900' htmlFor="message">Your message</label>
          <textarea id='message' className='dark:bg-white bg-gray-300 h-50 rounded-md' type='text' placeholder='message'></textarea>
          <button type='text' className='flex justify-between px-2.5 py-2.5 text-white rounded-xl bg-[#5478FF]'>
            Send
            <SendIcon className='text-white'/>
          </button>
          <h2 className='text-center dark:text-white text-slate-900'>
            OR
          </h2>
          <div className='flex dark:text-white text-slate-900 justify-center gap-2'>
              <LucideMessageCircleMore/> <a href="">+2567754242865</a>
          </div>
        </form>
        </div>
    </section>
  )
}

export default ContactUs