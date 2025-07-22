import React from 'react'

const About = () => {
    return (
        <section className="bg-white py-16 px-4 md:px-12 lg:px-24">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-6xl md:text-7xl pb-5   font-bold leading-tight mb-4 text-gray-900">
                    <span className="block"><span className="text-[#47216b]">What Defines GoDigitfy</span></span>
                    <span className="block mt-2 text-3xl md:text-4xl font-semibold text-gray-800">From Spark to Scale</span>
                </h2>
                <p className="text-lg md:text-xl text-gray-700 mb-6 ">
                    We are innovators by instinct, designers by passion, and technologists by choice.<br />
                    At <span className="font-semibold text-[#47216b]">GoDigitfy</span>, we fuse creativity with code to craft bold, high-performance digital solutions that deliver measurable business results.<br />
                    We don’t follow trends — <span className="font-semibold text-[#47216b]">we shape them</span>.
                </p>
                <p className="text-md md:text-lg text-gray-600 mb-8 ">
                    What makes us different? You simply provide the core details of your event, and we handle the rest.<br />
                    From digital branding and social media management, to website development, printable materials, and full-scale event execution — <span className="font-semibold text-[#47216b]">we've got it covered</span>.
                </p>
                <div className="flex justify-between items-center mb-12">
                    <div className="flex gap-4">
                        <a href="#" className="text-gray-500 hover:text-[#47216b] transition">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 320 512">
                                <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                            </svg>
                        </a>
                        <a href="#" className="text-gray-500 hover:text-[#47216b] transition">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 512 512">
                                <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                            </svg>
                        </a>
                        <a href="#" className="text-gray-500 hover:text-[#47216b] transition">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 448 512">
                                <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                            </svg>
                        </a>
                    </div>
                    <div>
                        <button className="bg-[#47216b] text-white px-8 py-4 rounded-full font-semibold shadow hover:bg-black transition">
                            About us
                        </button>
                    </div>
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