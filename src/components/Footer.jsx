import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <section className="flex items-center text-white bg-[#333] justify-center">
            <div className="flex flex-col items-center py-20 px-40">
                {/* Newsletter Section */}
                <div className="flex flex-col items-center justify-center">
                    <h2 className="text-2xl mb-4 text-center">
                        Join our listing for exclusive discounts and new recipes
                    </h2>
                    <h3 className="text-xl font-light text-center mb-4">
                        We create new recipes every week and cooking tips
                    </h3>
                    <form className="flex justify-center items-center mt-8 flex-col md:flex-row">
                        <label htmlFor="email" className="sr-only">Email address</label>
                        <input
                            name="email"
                            id="email"
                            type="email"
                            placeholder="Email address"
                            className="px-6 py-2 bg-white text-[#333] border border-[#333] rounded-lg text-lg mb-4 md:mb-0 md:mr-4"
                        />
                        <button className="bg-white text-[#333] py-3 px-6 rounded-lg text-lg transition-transform transform hover:bg-[#E38B06] hover:text-white hover:scale-105 active:scale-95">
                            Submit
                        </button>
                    </form>
                </div>

                {/* Footer Links Section */}
                <div className="mt-20 flex justify-center items-center flex-wrap">
                    {/* About Us Links */}
                    <div className="flex flex-col items-start mr-40 mb-12 md:mr-20">
                        <h3 className="text-2xl mb-4">About Us</h3>
                        <Link to="#" className="text-white mb-2 hover:text-red-300">Our Chefs</Link>
                        <Link to="#" className="text-white mb-2  hover:text-red-300">Our Farm</Link>
                        <Link to="#" className="text-white mb-2  hover:text-red-300">Testimonials</Link>
                        <Link to="#" className="text-white mb-2  hover:text-red-300">Terms of Service</Link>
                    </div>

                    {/* Services Links */}
                    <div className="flex flex-col items-start mr-40 mb-12 md:mr-20">
                        <h3 className="text-2xl mb-4">Services</h3>
                        <Link to="#" className="text-white mb-2  hover:text-red-300">How it Works</Link>
                        <Link to="#" className="text-white mb-2  hover:text-red-300">Meal Prep Kit</Link>
                        <Link to="#" className="text-white mb-2  hover:text-red-300">Gift Cards</Link>
                        <Link to="#" className="text-white mb-2  hover:text-red-300">Orders</Link>
                    </div>

                    {/* Resources Links */}
                    <div className="flex flex-col items-start mr-40 mb-12 md:mr-20">
                        <h3 className="text-2xl mb-4">Resources</h3>
                        <Link to="#" className="text-white mb-2  hover:text-red-300">Kitchenware</Link>
                        <Link to="#" className="text-white mb-2  hover:text-red-300">Recipes</Link>
                        <Link to="#" className="text-white mb-2  hover:text-red-300">FAQ &amp; Support</Link>
                        <Link to="#" className="text-white mb-2  hover:text-red-300">Affiliate Program</Link>
                    </div>

                    {/* Contact Links */}
                    <div className="flex flex-col items-start mb-12">
                        <h3 className="text-2xl mb-4">Contact</h3>
                        <Link to="#" className="text-white mb-2  hover:text-red-300">Instagram</Link>
                        <Link to="#" className="text-white mb-2  hover:text-red-300">Facebook</Link>
                        <Link to="#" className="text-white mb-2  hover:text-red-300">YouTube</Link>
                        <Link to="#" className="text-white mb-2  hover:text-red-300">LinkedIn</Link>
                    </div>
                </div>

                {/* Footer Copyright */}
                <div className="mt-10 text-center">
                    <Link to="#" className="text-white  hover:text-red-300">
                        &copy; Copyright 2025, Designed and coded  by Prakriti!
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Footer;
