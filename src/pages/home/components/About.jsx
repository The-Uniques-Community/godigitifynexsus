import React from 'react'

const About = () => {
    return (
        <section className="bg-white py-16 px-4 md:px-12 lg:px-24">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center gap-2 mb-4">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold shadow">Gurgaon, IN</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-gray-900">
                    <span className="block"><span className="text-[#47216b]">What Defines GoDigitfy</span></span>
                    <span className="block mt-2 text-3xl md:text-4xl font-semibold text-gray-800">From Spark to Scale</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-700 mb-6 ">
                    We are innovators by instinct, designers by passion, and technologists by choice.<br />
                    At <span className="font-semibold text-[#47216b]">GoDigitfy</span>, we fuse creativity with code to craft bold, high-performance digital solutions that deliver measurable business results.<br />
                    We don’t follow trends — <span className="font-semibold text-[#47216b]">we shape them</span>.
                </p>
                <p className="text-md md:text-lg text-gray-600 mb-8 ">
                    What makes us different? You simply provide the core details of your event, and we handle the rest.<br />
                    From digital branding and social media management, to website development, printable materials, and full-scale event execution — <span className="font-semibold text-[#47216b]">we’ve got it covered</span>.
                </p>
                <div className="flex gap-4 mb-10">
                    <a href="#" className="text-gray-500 hover:text-[#47216b] transition"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" className="text-gray-500 hover:text-[#47216b] transition"><i className="fab fa-twitter"></i></a>
                    <a href="#" className="text-gray-500 hover:text-[#47216b] transition"><i className="fab fa-linkedin-in"></i></a>
                </div>
                <div className="flex items-center justify-end gap-4 mb-12">
                    <button className="bg-[#47216b] text-white px-8 py-4 rounded-full font-semibold shadow hover:bg-black transition ">
                        About us
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 relative">
                    <div className="relative">
                        <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80" alt="Team" className="rounded-xl shadow-lg object-cover h-48 w-full" />
                        <div className="absolute inset-0 left-0 rounded-xl pointer-events-none" style={{
                            background: 'linear-gradient(to right, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%)'
                        }}></div>
                    </div>
                    <div className="relative">
                        <img src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=400&q=80" alt="Workspace" className="rounded-xl shadow-lg object-cover h-48 w-full" />
                    </div>
                    <div className="relative">
                        <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="Collaboration" className="rounded-xl shadow-lg object-cover h-48 w-full" />
                    </div>
                    <div className="relative">
                        <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80" alt="Meeting" className="rounded-xl shadow-lg object-cover h-48 w-full" />
                        <div className="absolute inset-0 right-0 rounded-xl pointer-events-none" style={{
                            background: 'linear-gradient(to left, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%)'
                        }}></div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default About