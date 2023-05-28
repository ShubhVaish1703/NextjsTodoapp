"use client"
import { Context } from '@/components/Clients';
import React from 'react'
import { useContext } from 'react';
import { redirect } from 'next/navigation';

const page = () => {
    const { user } = useContext(Context);

    if (!user._id) return redirect('/login');
    return (
        <div style={{textAlign:'center',marginTop:'2rem'}}>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
        </div>
    )
}

export default page
