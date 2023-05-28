"use client";

import { Context } from '@/components/Clients';
import Link from 'next/link'
import { redirect } from 'next/navigation';
import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast';

const page = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const { user, setUser } = useContext(Context)

    const signupHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/auth/register', {
                method: "POST",
                body: JSON.stringify({
                    email, password, name
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const data = await res.json();
            if (!data.success) return toast.error(data.message)
            setUser(data.user)
            toast.success(data.message)
            // console.log(data);
        }
        catch (error) {
            return toast.error(error)
        }
    };

    if (user._id) return redirect('/')

    return (
        <div className='login'>
            <section>
                <form onSubmit={signupHandler}>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required={true} name="name" placeholder='Enter Name' />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required={true} name="email" placeholder='Enter Email' />
                    <input type="password" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} required={true} name="password" />
                    <button type="submit">Sign Up</button>
                    <p>Or</p>
                    <Link href={"/login"}>Already a User? Sign in</Link>
                </form>
            </section>
        </div>
    )
}

// export const metadata = {
//     title: 'Register',
//     description: 'This is the Register page of Todo App Project made with next.js',
// }

export default page
