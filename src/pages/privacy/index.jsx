import PageTitle from "../../components/PageTitle";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-my-black text-white p-4 sm:p-6 md:p-8">
            <div className="container mx-auto max-w-4xl">
                <PageTitle title="Privacy Policy" />
                
                <div className="bg-my-dark rounded-xl p-6 shadow-lg">
                    <p className="mb-6">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                    
                    <h2 className="text-2xl font-bold text-my-cyan mb-4">1. Introduction</h2>
                    <p className="mb-6">
                        Welcome to XPHub's Privacy Policy. This document outlines how we collect, use, and protect your personal information when you use our website and services.
                    </p>
                    
                    <h2 className="text-2xl font-bold text-my-cyan mb-4">2. Information We Collect</h2>
                    <p className="mb-3">We may collect the following types of information:</p>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li><strong>Personal Information:</strong> Name, email address, and profile information when you create an account.</li>
                        <li><strong>Usage Data:</strong> Information about how you interact with our website, including browsing history, game preferences, and search queries.</li>
                        <li><strong>Device Information:</strong> Information about your device, operating system, browser type, and IP address.</li>
                        <li><strong>Cookies and Similar Technologies:</strong> We use cookies to enhance your experience and collect information about your usage patterns.</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-my-cyan mb-4">3. How We Use Your Information</h2>
                    <p className="mb-3">We use the collected information for various purposes, including:</p>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li>Providing and maintaining our services</li>
                        <li>Personalizing your experience and content</li>
                        <li>Improving our website and services</li>
                        <li>Communicating with you about updates, news, and features</li>
                        <li>Analyzing usage patterns to enhance user experience</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-my-cyan mb-4">4. Data Security</h2>
                    <p className="mb-6">
                        We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                    </p>
                    
                    <h2 className="text-2xl font-bold text-my-cyan mb-4">5. Third-Party Services</h2>
                    <p className="mb-6">
                        We may use third-party services to facilitate our service, perform service-related functions, or assist in analyzing how our service is used. These third parties have access to your personal information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
                    </p>
                    
                    <h2 className="text-2xl font-bold text-my-cyan mb-4">6. Your Rights</h2>
                    <p className="mb-3">You have the following rights regarding your personal information:</p>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li>Access and update your personal information</li>
                        <li>Request deletion of your personal information</li>
                        <li>Object to processing of your personal information</li>
                        <li>Request restriction of processing your personal information</li>
                        <li>Data portability</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold text-my-cyan mb-4">7. Changes to This Privacy Policy</h2>
                    <p className="mb-6">
                        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this policy.
                    </p>
                    
                    <h2 className="text-2xl font-bold text-my-cyan mb-4">8. Contact Us</h2>
                    <p className="mb-6">
                        If you have any questions about this Privacy Policy, please contact us at privacy@xphub.com.
                    </p>
                </div>
            </div>
        </div>
    );
}