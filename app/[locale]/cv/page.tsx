"use client";

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { Link } from '@/routing';

export default function CV() {
    return (
        <>
            <style jsx global>{`
                @media print {
                    body {
                        background: white !important;
                    }
                    header, footer, nav, .no-print {
                        display: none !important;
                    }
                    .cv-container {
                        max-width: 100% !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        box-shadow: none !important;
                    }
                    .print-break {
                        page-break-before: always;
                    }
                    a {
                        color: inherit !important;
                        text-decoration: none !important;
                    }
                    .print-compact {
                        margin-top: 0.5rem !important;
                        margin-bottom: 0.5rem !important;
                    }
                }
            `}</style>

            <Header />



            <div className="min-h-screen bg-gray-50 py-8 print:py-0">

                <div className="cv-container max-w-4xl mx-auto bg-white shadow-lg print:shadow-none p-8 print:p-12">

                    {/* Print Button */}
                    <div className="no-print mb-6 flex justify-end">
                        <button
                            onClick={() => window.print()}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Download PDF
                        </button>
                    </div>

                    {/* Header */}
                    <header className="border-b-2 border-gray-300 pb-6 mb-6">
                        <div className="flex gap-6 items-start">
                            {/* Text Content */}
                            <div className="flex-1">
                                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                    MAXIMILIANO BRITO TORRES
                                </h1>
                                <h2 className="text-xl text-gray-700 mb-4">
                                    Full Stack Engineer | Cloud Solutions Architect
                                </h2>
                                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
                                    <span>📍 Vientiane, Laos (GMT+7)</span>
                                    <span>📞 +856 20 52 373 435</span>
                                    <span>📧 britomaximiliano83@outlook.com</span>
                                    <span>🔗 MaxonTorres.com</span>

                                    <Link 
                                        href="https://www.linkedin.com/in/maxontorres/" 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Visit Maximiliano Brito Torres on LinkedIn (opens in new tab)"
                                    >
                                        LinkedIn Profile
                                    </Link>
                                    
                                </div>
                            </div>

                            {/* Profile Picture */}
                            <div className="flex-shrink-0">
                                <img
                                    src="/cv-pic.png"
                                    alt="Maximiliano Brito Torres"
                                    className="w-30 h-40  object-cover border-4 border-gray-300"
                                />
                            </div>
                        </div>
                    </header>

                    {/* Professional Summary */}
                    <section className="mb-6 print-compact">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 uppercase border-b border-gray-300 pb-1">
                            Professional Summary
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                            Strategic Full Stack Developer with 8+ years of international experience (Mexico, Thailand, China, Laos)
                            building scalable web architectures. Expert in Modern JavaScript Ecosystems (Next.js, React, Node.js) and
                            AWS Serverless environments. Proven track record of transitioning traditional businesses into high-performance
                            digital entities and mentoring the next generation of technical talent.
                        </p>
                    </section>

                    {/* Technical Expertise */}
                    <section className="mb-6 print-compact">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 uppercase border-b border-gray-300 pb-1">
                            Technical Expertise
                        </h3>
                        <div className="space-y-2 text-gray-700">
                            <p><strong>Languages:</strong> JavaScript (ES6+), TypeScript, PHP, SQL, HTML5/CSS3.</p>
                            <p><strong>Frontend:</strong> Next.js (App Router), React, Vue.js, Angular, Tailwind CSS.</p>
                            <p><strong>Backend & API:</strong> Node.js, Express, GraphQL, Laravel, RESTful API Design.</p>
                            <p><strong>Cloud & DevOps:</strong> AWS (Lambda, API Gateway, DynamoDB, S3, Rekognition), Docker.</p>
                            <p><strong>Specialized:</strong> AI Integration (AWS Rekognition), Security 5, Technical Education.</p>
                        </div>
                    </section>

                    {/* Professional Experience */}
                    <section className="mb-6 print-compact">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 uppercase border-b border-gray-300 pb-1">
                            Professional Experience
                        </h3>

                        {/* Thavisub Group */}
                        <div className="mb-5">
                            <div className="flex justify-between items-baseline mb-2">
                                <h4 className="text-lg font-bold text-gray-900">Thavisub Group | Full Stack Engineer</h4>
                                <span className="text-sm text-gray-600">Oct 2025 – Present</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2 italic">Vientiane, Laos</p>
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                                <li>Architecting enterprise-level web applications using Next.js and GraphQL, focusing on modularity and high-speed data fetching.</li>
                                <li>Leading the digital transition of group assets by implementing a unified Node.js/Express backend ecosystem.</li>
                                <li>Optimizing frontend performance for the Southeast Asian market, ensuring high usability on low-bandwidth mobile networks.</li>
                            </ul>
                        </div>

                        {/* ComCenter College */}
                        <div className="mb-5">
                            <div className="flex justify-between items-baseline mb-2">
                                <h4 className="text-lg font-bold text-gray-900">ComCenter College | IT Lecturer & Technical Consultant</h4>
                                <span className="text-sm text-gray-600">Jan 2024 – Oct 2025</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2 italic">Vientiane, Laos</p>
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                                <li>Designed and delivered advanced curricula for Full Stack Development, bridging the gap between academic theory and 2026 industry standards.</li>
                                <li>Standardized internal web architecture practices (DNS, Server management) for the institution's digital infrastructure.</li>
                            </ul>
                        </div>

                        {/* Yango University */}
                        <div className="mb-5">
                            <div className="flex justify-between items-baseline mb-2">
                                <h4 className="text-lg font-bold text-gray-900">Yango University | IT Lecturer (Web & UI/UX)</h4>
                                <span className="text-sm text-gray-600">Aug 2023 – Jan 2024</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2 italic">Fuzhou, China</p>
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                                <li>Developed project-based learning modules for Responsive Web Design and SEO, resulting in a 30% increase in student portfolio placement.</li>
                                <li>Mentored 100+ students in modern UI/UX principles, emphasizing user-centric design in the Chinese tech ecosystem.</li>
                            </ul>
                        </div>

                        {/* TISCO Financial Group */}
                        <div className="mb-5 print-break">
                            <div className="flex justify-between items-baseline mb-2">
                                <h4 className="text-lg font-bold text-gray-900">TISCO Financial Group | Full Stack Developer (Cloud Focus)</h4>
                                <span className="text-sm text-gray-600">Oct 2019 – Jan 2021</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2 italic">Bangkok, Thailand</p>
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                                <li>Developed a high-security AI application utilizing AWS Rekognition for automated image analysis in financial processing.</li>
                                <li>Built and managed Serverless Architecture (Lambda, API Gateway, DynamoDB) to ensure 99.9% uptime for critical financial tools.</li>
                                <li>Collaborated on cross-functional Fintech squads to deploy secure, React-based dashboards for banking clients.</li>
                            </ul>
                        </div>

                        {/* Infinity IT Success / AD System Asia */}
                        <div className="mb-5">
                            <div className="flex justify-between items-baseline mb-2">
                                <h4 className="text-lg font-bold text-gray-900">Infinity IT Success / AD System Asia | Full Stack Developer</h4>
                                <span className="text-sm text-gray-600">Feb 2018 – Oct 2019</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2 italic">Bangkok, Thailand</p>
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                                <li>Engineered RESTful APIs and dynamic frontends using Angular, React, and Laravel for regional clients.</li>
                                <li>Optimized legacy PHP systems, improving server-side processing speeds by 25%.</li>
                            </ul>
                        </div>

                        {/* Anevi */}
                        <div className="mb-5">
                            <div className="flex justify-between items-baseline mb-2">
                                <h4 className="text-lg font-bold text-gray-900">Anevi | Full Stack Developer</h4>
                                <span className="text-sm text-gray-600">Aug 2015 – Dec 2017</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2 italic">Mexico City, Mexico</p>
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                                <li>Initiated full-lifecycle development of web apps using the PHP/JavaScript/AJAX stack for the Mexican market.</li>
                            </ul>
                        </div>
                    </section>

                    {/* Education & Certifications */}
                    <section className="mb-6 print-compact">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 uppercase border-b border-gray-300 pb-1">
                            Education & Certifications
                        </h3>
                        <ul className="space-y-2 text-gray-700">
                            <li><strong>Bachelor's Degree in Computer Systems Engineering</strong> | Universidad Tecmilenio, Mexico</li>
                            <li><strong>Security 5 V1</strong> | Certified Network Security Professional</li>
                            <li><strong>AWS Achievement:</strong> Deploying Windows Server 2008 & SQL Fundamentals</li>
                            <li><strong>Buzan Certified Mind Mapper</strong> | Creative Problem Solving & Strategy</li>
                        </ul>
                    </section>

                    {/* Languages */}
                    <section className="print-compact">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 uppercase border-b border-gray-300 pb-1">
                            Languages
                        </h3>
                        <div className="text-gray-700">
                            <p><strong>Español:</strong> Native</p>
                            <p><strong>English:</strong> Full Professional Proficiency</p>
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    )
}