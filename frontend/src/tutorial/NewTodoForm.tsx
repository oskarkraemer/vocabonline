import { useState } from "react";

export function NewTodoForm(props: { onSubmit: (newItemTitle: string) => void; }) {
    const [newItem, setNewItem] = useState("");

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
    
        props.onSubmit(newItem);
    
        setNewItem("");
    }

    return (
        <form onSubmit={handleSubmit} className="new-item-form">
            <div className='form-row'>
            <label>New Item</label>
            <input
                value={newItem}
                onChange={e => setNewItem(e.target.value)}
                type='text'
                id='item'
            />
            </div>
            <button className='btn'>Add</button>
        </form>
    );
}