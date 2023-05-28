import React from 'react'
import { TodoItem } from '@/components/ServerComponents';
import { cookies } from "next/headers"

const fetchTodo = async (token) => {
    try {
        const res = await fetch(`${process.env.URL}/api/mytask`, {
            cache: "no-cache",
            headers: {
                cookie: `token=${token}`
            }
        });
        const data = await res.json();
        if (!data.success) return [];

        return data.tasks;
    } catch (error) {
        return [];
    }
}

const todos = async() => {
    const token = cookies().get("token")?.value;
    const tasks = await fetchTodo(token);
    return (
        <section className="todosContainer">
            {
                tasks?.map((task) => (
                    <TodoItem
                        key={task._id}
                        title={task.title}
                        description={task.description}
                        id={task._id}
                        completed={task.isCompleted}
                    />
                ))
            }
        </section>
    )
}

export default todos
