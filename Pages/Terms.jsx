import React from 'react'

function Terms() {
  return (
    <section className='dark:text-white sm:mx-auto text-slate-900 px-2 text-left ml-4 space-y-8  max-w-200'>
    <div>
        <h1 className='text-2xl my-4'>Terms & Conditions</h1>
        <h2 className='text-xl'>Effective Date: Sunday,10th May 2026</h2>
        <h2 className='text-xl'>Last Updated: Sunday,10th May 2026</h2>
        <h2 className='text-xl'>Entity: Evoter, Kampala, Uganda</h2>
    </div>
    <div>
        <h2 className='mb-4 text-xl'>
            1. Acceptance of Terms  
        </h2>
        <p className='leading-relaxed'>
            By using Evoter (the “Platform”) to create, manage, or participate in school elections, you agree to these Terms & Conditions. If you are a student under 18 years of age, your school's administration has obtained parental consent as required under Ugandan law.
        </p>
    </div>
    <div>
        <h2 className='mb-4 text-xl'>
            2. Eligibility 
        </h2>
        <p className='leading-relaxed'>
            Schools: Only registered primary or secondary schools in Uganda may use the full voting system.<br/>
            Voters: Only persons whose names are uploaded by authorized school staff are eligible to receive an OTP.<br/>
            Staff: Teachers and administrators must be verifiable through the school’s official records.
        </p>
    </div>
    <div>
        <h2 className='mb-4 text-2xl'>
            3. How Voting Works
        </h2>
        <p className='leading-relaxed'>
            The school uploads a list (e.g., Excel/CSV) of Voter Names + Class/Staff ID.<br/>
            Evoter generates a unique 6-digit OTP for each eligible person.<br/>
            The OTP is delivered via SMS or printed handout (school’s choice).<br/>
            The OTP expires immediately after vote submission.<br/>
            Any unused OTPs expire automatically 48 hours after the election window closes.
        </p>
    </div>
    <div>
        <h2 className='mb-4 text-2xl'>
            4. School Responsibilities
        </h2>
        <p className='leading-relaxed'>
            Ensure only legitimate students/staff are on the uploaded list.<br/>
            Provide adequate supervision during voting to prevent coercion.<br/>
            Keep OTPs confidential before voting begins.<br/>
            Pay any applicable service fees (if using the paid plan) on time.<br/>
        </p>
    </div>
    <div>
        <h2 className='mb-4 text-2xl'>
            5. Prohibited Activities
        </h2>
        <p className='leading-relaxed'>
            Sharing or selling OTPs to non-eligible persons.<br/>
            Attempting to vote more than once using the same OTP (system automatically rejects).<br/>
            Hacking, reverse-engineering, or attempting to manipulate vote counts.<br/>
            Using Evoter for any election outside of a school setting without written permission.<br/>
        </p>
    </div>
    <div>
    <h2 className='mb-4 text-2xl'>
        6. Results & Disputes
    </h2>
    <p className='leading-relaxed'>
        Results are final once the election is closed by the school admin.  
        If a technical glitch occurs (e.g., server failure), the school may request a re-vote for affected classes only. Evoter will provide logs.
        All disputes must be raised within 48 hours of election closing.
    </p>
    </div>
    <div>
        <h2 className='mb-4 text-2xl'>
            7. Fees & Cancellation
        </h2>
        <p className='leading-relaxed'>
            Basic plan (for schools with 200 voters): Free for first 2 elections, then e.g., UGX 50,000 per election.<br/>
            Schools may cancel an election before OTPs are generated for a full refund. No refund after OTPs are sent.
        </p>
    </div>
<div>
    <h2 className='mb-4 text-2xl'>
        8. Limitation of Liability
    </h2>
    <p className='leading-relaxed'>
        Evoter is not liable for:<br/>
        Loss of OTPs due to school's failure to distribute them.<br/>
        Internet outages at the school.<br/>
        Physical coercion or intimidation of voters (school is responsible for order).
    </p>
</div>
<div>
    <h2 className='mb-4 text-2xl'>
        9. Governing Law
    </h2>
    <p className='leading-relaxed'>
        These terms are governed by the laws of the Republic of Uganda, including the Data Protection and Privacy Act, 2019, and the Electronic Transactions Act, 2011.
    </p>
</div>
<div>
    <h2 className='mb-4 text-2xl'>
        10. Changes to Terms
    </h2>
    <p className='leading-relaxed'>
        Evoter may update terms; schools will be notified via email 15 days before changes take effect
    </p>
</div>
    </section>
  )
}

export default Terms