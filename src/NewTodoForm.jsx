import { useState } from "react"

export default function NewTodoForm({ onSubmit }) {
    const [newItem, setNewItem] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        if(newItem.trim() === "") return
        onSubmit(newItem.trim())
        setNewItem("")
    }

    return(
        <form className="new-item-form" onSubmit={handleSubmit}>
            <div className="form-row">
                <label htmlFor="item">Add New Todo</label>
                <div className="input-group">
                    <input 
                        type="text" 
                        id="item" 
                        value={newItem}
                        onChange={e => setNewItem(e.target.value)}
                        placeholder="What needs to be done?"
                        autoFocus
                    />
                    <button 
                        type="submit" 
                        className="btn"
                        disabled={newItem.trim() === ""}
                    >
                        Add Todo
                    </button>
                </div>
            </div>
        </form>
    )
}
