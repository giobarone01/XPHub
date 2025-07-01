import { useState } from "react";
import PageTitle from "../../components/PageTitle";
import { toast } from "react-toastify";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the form data to your backend
        console.log("Form submitted:", formData);
        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({
            name: "",
            email: "",
            subject: "",
            message: ""
        });
    };
    
    return (
        <div className="min-h-screen bg-my-black text-white p-4 sm:p-6 md:p-8">
            <div className="container mx-auto max-w-4xl">
                <PageTitle title="Contact Us" />
                
                <div className="bg-my-dark rounded-xl p-6 shadow-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-2xl font-bold text-my-cyan mb-6">Get In Touch</h2>
                            <p className="mb-6">
                                Have questions, suggestions, or feedback? We'd love to hear from you! 
                                Fill out the form and our team will get back to you as soon as possible.
                            </p>
                            
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <svg className="w-6 h-6 text-my-cyan mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                    </svg>
                                    <span>contact@xphub.com</span>
                                </div>
                                <div className="flex items-center">
                                    <svg className="w-6 h-6 text-my-cyan mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                    <span>123 Gaming Street, Digital City</span>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        name="name" 
                                        value={formData.name} 
                                        onChange={handleChange} 
                                        required 
                                        className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-my-cyan"
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        name="email" 
                                        value={formData.email} 
                                        onChange={handleChange} 
                                        required 
                                        className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-my-cyan"
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
                                    <input 
                                        type="text" 
                                        id="subject" 
                                        name="subject" 
                                        value={formData.subject} 
                                        onChange={handleChange} 
                                        required 
                                        className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-my-cyan"
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                                    <textarea 
                                        id="message" 
                                        name="message" 
                                        value={formData.message} 
                                        onChange={handleChange} 
                                        required 
                                        rows="5" 
                                        className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-my-cyan"
                                    ></textarea>
                                </div>
                                
                                <button 
                                    type="submit" 
                                    className="w-full bg-my-purple hover:bg-my-purple/80 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}