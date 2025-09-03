"use client"

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login(){
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = await signIn("credentials", {
            email,
            password
        })

        if(result?.error){
            console.log(result?.error);
        }

        else{
            console.log("Login successful");
        }
    }

    return <div className="container">
        <form className="form" onSubmit={handleSubmit}>
            <input type="email" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" className="button">Sign in</button>
            <p className="text-white">New User ? <Link href="/register" className="underline">Create Account</Link></p>

        </form>

        <style jsx>{`
                .container {
                    min-height: 100vh;
                    min-width: 100vw;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    padding: 20px;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }

                .form-card {
                    background: white;
                    padding: 40px;
                    border-radius: 12px;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                    width: 100%;
                    max-width: 400px;
                }

                .title {
                    text-align: center;
                    margin: 0 0 30px 0;
                    color: #333;
                    font-size: 28px;
                    font-weight: 600;
                }

                .form {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .input {
                    padding: 14px 16px;
                    border: 2px solid #e1e5e9;
                    border-radius: 8px;
                    font-size: 16px;
                    transition: border-color 0.2s ease;
                    outline: none;
                }

                .input:focus {
                    border-color: #667eea;
                    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
                }

                .button {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    padding: 14px 20px;
                    border-radius: 8px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }

                .button:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 8px 15px rgba(102, 126, 234, 0.3);
                }

                .button:active {
                    transform: translateY(0);
                }
            `}</style>
    </div>
}