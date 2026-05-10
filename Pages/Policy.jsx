import React from 'react'

function Policy() {
  return (
    <section className='dark:text-white text-slate-900 px-2 text-left ml-4 space-y-4 sm:mx-auto max-w-200'>
        <div>
            <h1 className="text-2xl mt-4">Privacy Policy</h1>
            <h2 className="text-2xl">
                Effective Date: Sunday,10th May 2026
            </h2>
            <h2 className="text-2xl">
                Our Commitment: Protecting the privacy of Ugandan students and teachers is our highest priority.
            </h2>
        </div>
        <div>
            <h2 className="text-2xl my-4">1.Information We Collect</h2>
            <h3>From Schools (Administrators):</h3>
            <p>
                School name, registration number, district, and contact details (headteacher’s email, phone).<br/>
                Staff names and roles (e.g., “Mr. Okello – IT Teacher”).
            </p>
            <h3>
                From Voters (Students & Staff):
            </h3>
            <ul>
                <li>Name (as provided by school).</li>
                <li>Class or staff ID (no national ID numbers)</li>
                <li>Voting timestamp (date and time of vote but not how you voted).</li>
            </ul>
            <h3>
                System Data:
            </h3>
            <ul>
                <li>6-digit OTPs (hashed and encrypted after expiration).</li>
                <li>Device type (e.g., phone, laptop) and browser version (for technical support).</li>
            </ul>
            <div>
                <ul>
                    <h2 className="text-2xl my-4">
                        2. How We Use Information
                    </h2>
                    <li>To generate and deliver unique OTPs.</li>
                    <li>To ensure each person votes only once.</li>
                    <li>To display real-time (anonymous) vote counts to authorized school admins.</li>
                    <li>To troubleshoot technical problems.</li>
                    <li>To comply with a lawful request from Ugandan law enforcement (e.g., election fraud investigation).</li>
                </ul>
            </div>
            <div>
                <ul>
                    <h2 className="text-2xl my-8">
                        3. Data Retention
                    </h2>
                    <li>OTPs and voter lists: Deleted 30 days after an election ends.</li>
                    <li>Aggregate results (e.g., “Candidate A: 120 votes”): Kept for school record-keeping indefinitely.</li>
                    <li>School contact information: Kept until the school terminates its Evoter account.</li>
                </ul>
            </div>
            <div>
                <h2 className="text-2xl my-8">
                    4. Data Sharing
                </h2>
                <p>
                    We do not sell voter data to third parties. We may share anonymized statistics (e.g., “80% of schools use OTPs by SMS”) with education partners. We share data only with:
                </p>
                <ul>
                    <li>The school’s own designated admin panel (visible only to that school).</li>
                    <li>Technical service providers (e.g., SMS gateway) who are contractually bound to destroy data after delivery.</li>
                    <li>Law enforcement if presented with a valid court order from a Ugandan magistrate.</li>
                </ul>
            </div>
            <div>
                <h2 className="text-2xl my-8">5. Parental & Guardian Rights (For Primary Schools)</h2>
                <p>For primary schools (students typically aged 6–13):</p>
                <ul>
                    <li>Schools must notify parents before using Evoter.</li>
                    <li>A parent can request deletion of their child’s data by contacting the school. The school will then submit a request to privacy@evoter.ug.</li>
                </ul>
            </div>
            <div>
                <ul>
                    <h2 className="text-2xl my-8">6. Security Measures</h2>
                    <li>OTPs are one-time and time-limited.</li>
                    <li>All data transmitted via HTTPS (encryption).</li>
                    <li>No “backdoor” access for Evoter staff to see individual student votes.</li>
                    <li>Regular security audits by a Ugandan IT security firm.</li>
                </ul>
            </div>
            <div>
                <h2 className="text-2xl my-8">7. Your Rights (Under Uganda Data Protection Act 2019)</h2>
                <p>You have the right to:</p>
                <ul>
                    <li>Ask what data we hold about you (or your child).</li>
                    <li>Correct inaccurate data.</li>
                    <li>Request deletion of data that is no longer needed for an election.</li>
                    <li>Lodge a complaint with the Uganda Personal Data Protection Office (PDPO).</li>
                </ul>
            </div>
            <div>
                <h2 className="text-2xl my-8">8. Breach Notification</h2>
                <p>
                    If a data breach (e.g., OTP list exposed) occurs, we will notify the affected school and the PDPO within 72 hours.
                </p>
            </div>
            <div>
                <h2 className="text-2xl my-8">9. Contact Our Data Protection Officer</h2>
                <h3>DPO Name: Ms. Aisha Nambi</h3>
                <h3>Email: dpo@evoter.ug</h3>
                <h3>Phone: +256 780 111 222</h3>
            </div>
        </div>
    </section>
  )
}

export default Policy