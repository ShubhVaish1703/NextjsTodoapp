"use client"

import { Context } from '@/components/Clients';
import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast';
import {redirect, useRouter} from 'next/navigation'

const addTodoForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const {user} = useContext(Context);
    
    const router = useRouter();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/newtask', {
                method: "POST",
                body: JSON.stringify({
                    title, description,
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const data = await res.json();
            if (!data.success) return toast.error(data.message)
            toast.success(data.message)
            setDescription('')
            setTitle('')
            router.refresh();
        }
        catch (error) {
            return toast.error(error)
        }
    };

    if(!user._id) return redirect('/login')

    return (
        <div className='login'>
            <section>
                <form onSubmit={submitHandler}>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required={true} name="title" placeholder='Task Title' />
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required={true} name="description" placeholder='Task Description' />
                    <button type="submit">Add Task</button>
                </form>
            </section>
        </div>
    )
}

export default addTodoForm
