// "use client"

// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// export default function Register(){
//     const [email, setEmail] = useState<string>();
//     const [password, setPassword] = useState<string>();
//     const [confirmPassword, setConfirmPassword] = useState<string>();
//     const router = useRouter();

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         if(password != confirmPassword){
//             alert("Passwords don't match");
//             return;
//         }

//         try{
//             const res = await fetch("/api/auth/register", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({
//                     email,
//                     password
//                 })

//             });

//             const data = await res.json();

//             if(!res.ok){
//                 throw new Error(data?.error || "Registration Failed");
//             }

//             console.log(data);
//             router.push('/login');
//         }

//         catch(error){
//             console.error(error);
//         }
//     }

//     return <div className="container">
//         <form className="form" onSubmit={handleSubmit}>
//             <input type="email" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//             <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//             <input type="password" className="input" placeholder="Conform Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
//             <button type="submit" className="button">Register</button>
//             <p className="text-white">Already have an account ? <Link href="/login" className="underline">Sign in</Link></p>
//         </form>

//         <style jsx>{`
//                 .container {
//                     min-height: 100vh;
//                     min-width: 100vw;
//                     display: flex;
//                     align-items: center;
//                     justify-content: center;
//                     background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//                     padding: 20px;
//                     font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//                 }

//                 .form-card {
//                     background: white;
//                     padding: 40px;
//                     border-radius: 12px;
//                     box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
//                     width: 100%;
//                     max-width: 400px;
//                 }

//                 .title {
//                     text-align: center;
//                     margin: 0 0 30px 0;
//                     color: #333;
//                     font-size: 28px;
//                     font-weight: 600;
//                 }

//                 .form {
//                     display: flex;
//                     flex-direction: column;
//                     gap: 20px;
//                 }

//                 .input {
//                     padding: 14px 16px;
//                     border: 2px solid #e1e5e9;
//                     border-radius: 8px;
//                     font-size: 16px;
//                     transition: border-color 0.2s ease;
//                     outline: none;
//                 }

//                 .input:focus {
//                     border-color: #667eea;
//                     box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
//                 }

//                 .button {
//                     background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//                     color: white;
//                     border: none;
//                     padding: 14px 20px;
//                     border-radius: 8px;
//                     font-size: 16px;
//                     font-weight: 600;
//                     cursor: pointer;
//                     transition: transform 0.2s ease, box-shadow 0.2s ease;
//                 }

//                 .button:hover {
//                     transform: translateY(-1px);
//                     box-shadow: 0 8px 15px rgba(102, 126, 234, 0.3);
//                 }

//                 .button:active {
//                     transform: translateY(0);
//                 }
//             `}</style>
//     </div>
// }

"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register(){
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');
    
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        
        if(password !== confirmPassword){
            setError("Passwords don't match");
            return;
        }

        setIsLoading(true);

        try{
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await res.json();

            if(!res.ok){
                throw new Error(data?.error || "Registration Failed");
            }

            console.log(data);
            router.push('/login');
        }
        catch(error: any){
            console.error(error);
            setError(error.message || "Registration failed. Please try again.");
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="register-container">
            {/* Background elements */}
            <div className="bg-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
            </div>

            {/* Main register card */}
            <div className="register-card">
                {/* Logo section */}
                <div className="logo-section">
                    <div className="logo">
                        <div className="logo-icon">R</div>
                    </div>
                    <h1 className="brand-name">ReelHub</h1>
                    <p className="brand-tagline">Join the creative community</p>
                </div>

                {/* Register form */}
                <form className="register-form" onSubmit={handleSubmit}>
                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}
                    
                    <div className="input-group">
                        <input 
                            type="email" 
                            className="form-input" 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                        <div className="input-border"></div>
                    </div>
                    
                    <div className="input-group">
                        <input 
                            type="password" 
                            className="form-input" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                        <div className="input-border"></div>
                    </div>

                    <div className="input-group">
                        <input 
                            type="password" 
                            className="form-input" 
                            placeholder="Confirm Password" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required 
                        />
                        <div className="input-border"></div>
                    </div>

                    <button type="submit" className="register-button" disabled={isLoading}>
                        {isLoading ? (
                            <div className="loading-spinner"></div>
                        ) : (
                            'Create Account'
                        )}
                    </button>

                    <div className="form-footer">
                        <p className="signin-text">
                            Already have an account? 
                            <Link href="/login" className="signin-link"> Sign in</Link>
                        </p>
                    </div>
                </form>
            </div>

            <style jsx>{`
                .register-container {
                    min-height: 100vh;
                    width: 100vw;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #0f0f23;
                    position: relative;
                    overflow: hidden;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                }

                .bg-shapes {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 1;
                }

                .shape {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(100px);
                    animation: float 20s ease-in-out infinite;
                }

                .shape-1 {
                    width: 350px;
                    height: 350px;
                    background: radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 70%);
                    top: -175px;
                    right: -175px;
                    animation-delay: 0s;
                }

                .shape-2 {
                    width: 400px;
                    height: 400px;
                    background: radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%);
                    bottom: -200px;
                    left: -200px;
                    animation-delay: -10s;
                }

                .shape-3 {
                    width: 280px;
                    height: 280px;
                    background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
                    top: 40%;
                    right: 15%;
                    animation-delay: -5s;
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    33% { transform: translateY(-35px) rotate(120deg); }
                    66% { transform: translateY(25px) rotate(240deg); }
                }

                .register-card {
                    background: rgba(255, 255, 255, 0.02);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 24px;
                    padding: 48px;
                    width: 100%;
                    max-width: 460px;
                    box-shadow: 
                        0 25px 50px -12px rgba(0, 0, 0, 0.25),
                        0 0 0 1px rgba(255, 255, 255, 0.05);
                    position: relative;
                    z-index: 2;
                    animation: slideUp 0.8s ease-out;
                }

                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .logo-section {
                    text-align: center;
                    margin-bottom: 40px;
                }

                .logo {
                    margin: 0 auto 16px;
                    position: relative;
                }

                .logo-icon {
                    width: 64px;
                    height: 64px;
                    background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 28px;
                    font-weight: 700;
                    margin: 0 auto;
                    box-shadow: 0 8px 32px rgba(99, 102, 241, 0.3);
                    position: relative;
                }

                .logo-icon::before {
                    content: '';
                    position: absolute;
                    top: -2px;
                    left: -2px;
                    right: -2px;
                    bottom: -2px;
                    background: linear-gradient(135deg, #6366f1, #a855f7, #3b82f6);
                    border-radius: 18px;
                    z-index: -1;
                    opacity: 0.5;
                    filter: blur(8px);
                }

                .brand-name {
                    font-size: 32px;
                    font-weight: 700;
                    color: #ffffff;
                    margin: 0 0 8px 0;
                    letter-spacing: -0.5px;
                }

                .brand-tagline {
                    color: rgba(255, 255, 255, 0.6);
                    font-size: 16px;
                    margin: 0;
                    font-weight: 400;
                }

                .register-form {
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }

                .error-message {
                    background: rgba(239, 68, 68, 0.1);
                    border: 1px solid rgba(239, 68, 68, 0.3);
                    border-radius: 8px;
                    padding: 12px 16px;
                    color: #fca5a5;
                    font-size: 14px;
                    text-align: center;
                    animation: shake 0.5s ease-in-out;
                }

                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }

                .input-group {
                    position: relative;
                }

                .form-input {
                    width: 100%;
                    padding: 16px 20px;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    font-size: 16px;
                    color: #ffffff;
                    transition: all 0.3s ease;
                    outline: none;
                    box-sizing: border-box;
                }

                .form-input::placeholder {
                    color: rgba(255, 255, 255, 0.4);
                }

                .form-input:focus {
                    border-color: #6366f1;
                    background: rgba(255, 255, 255, 0.05);
                    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
                }

                .input-border {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    height: 2px;
                    width: 0;
                    background: linear-gradient(90deg, #6366f1, #a855f7);
                    transition: width 0.3s ease;
                    border-radius: 1px;
                }

                .form-input:focus + .input-border {
                    width: 100%;
                }

                .register-button {
                    background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
                    color: white;
                    border: none;
                    padding: 16px 24px;
                    border-radius: 12px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                    min-height: 56px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .register-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 20px 40px rgba(99, 102, 241, 0.4);
                }

                .register-button:active {
                    transform: translateY(0);
                }

                .register-button:disabled {
                    cursor: not-allowed;
                    opacity: 0.7;
                }

                .loading-spinner {
                    width: 20px;
                    height: 20px;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    border-top: 2px solid white;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                .form-footer {
                    text-align: center;
                    margin-top: 8px;
                }

                .signin-text {
                    color: rgba(255, 255, 255, 0.6);
                    font-size: 14px;
                    margin: 0;
                }

                .signin-link {
                    color: #6366f1;
                    text-decoration: none;
                    font-weight: 600;
                    margin-left: 6px;
                    transition: color 0.3s ease;
                }

                .signin-link:hover {
                    color: #a855f7;
                    text-decoration: underline;
                }

                /* Responsive design */
                @media (max-width: 480px) {
                    .register-card {
                        padding: 32px 24px;
                        margin: 16px;
                        border-radius: 20px;
                    }
                    
                    .brand-name {
                        font-size: 28px;
                    }
                    
                    .logo-icon {
                        width: 56px;
                        height: 56px;
                        font-size: 24px;
                    }
                }
            `}</style>
        </div>
    );
}