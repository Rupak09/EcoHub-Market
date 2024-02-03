import { useState } from 'react';
import axios from 'axios';

function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [resetToken, setResetToken] = useState('');

    const handleSubmitEmail = async (event) => {
        event.preventDefault();
    
        try {
            // Make a POST request to the backend route '/forgot_password'
            const response = await axios.post('http://localhost:5001/forgot_password', { email });
    
            // Handle the response from the server
            if (response.status === 201) {
                alert('Email sent successfully. Check your email for the reset link.');
                alert("check your email before entering the new password");
                // You can update your state or show a success message to the user
                setIsEmailSent(true);
            } else {
                console.log('Email sending failed.');
                // Handle the error case, show an error message, or take appropriate action
            }
        } catch (error) {
            console.error('Error sending email:', error);
            // Handle the error case, show an error message, or take appropriate action
        }
    };

    const handleSubmitPasswordReset = async (event) => {
        event.preventDefault();
       
        try {
           
            // Make a POST request to the backend route '/reset-password'
            const response = await axios.post('http://localhost:5001/reset-password', { token: resetToken, newPassword, email });
    
            // Handle the response from the server
            if (response.status === 200) {
                alert('Password successfully updated.');
                // You can update your state or show a success message to the user
            } else {
                console.log('Password reset failed.');
                // Handle the error case, show an error message, or take appropriate action
            }
        } catch (error) {
            console.error('Error resetting password:', error);
            // Handle the error case, show an error message, or take appropriate action
        }
    };
    

    return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-800">
            <form
                onSubmit={!isEmailSent ? handleSubmitEmail : handleSubmitPasswordReset}
                className="p-6 bg-zinc-900 rounded shadow-md w-1/2"
            >
                <h2 className="text-lg font-semibold mb-4 text-white">
                    {!isEmailSent ? 'Forgot Password' : 'Reset Password'}
                </h2>

                {!isEmailSent ? (
                    <>
                        <p className="text-white mb-4">
                            Enter your email address below, and we will send you a link to reset your password.
                        </p>
                        <div className="mb-4 flex items-center">
                            <label htmlFor="email" className="text-sm font-medium text-white">Email</label>
                        </div>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="px-3 py-2 mb-4 border border-gray-300 rounded w-full"
                        />
                        <button type="submit" className="px-4 py-2 text-white bg-emerald-600 rounded hover:bg-green">
                            Send Reset Link
                        </button>
                    </>
                ) : (
                    <>
                        <p className="text-white mb-4">
                            Enter a new password below to complete the password reset process.
                        </p>
                        <div className="mb-4 flex items-center">
                            <label htmlFor="email" className="text-sm font-medium text-white">Email</label>
                        </div>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="px-3 py-2 mb-4 border border-gray-300 rounded w-full"
                        />
                        <div className="mb-4 flex items-center">
                            <label htmlFor="newPassword" className="text-sm font-medium text-white">New Password</label>
                        </div>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="px-3 py-2 mb-4 border border-gray-300 rounded w-full"
                        />
                        <button type="submit" className="px-4 py-2 text-white bg-emerald-600 rounded hover:bg-green">
                            Reset Password
                        </button>
                    </>
                )}

            </form>
        </div>
    );
}

export default ForgotPasswordPage;


