import { useActions } from "../store";

export function AnecdoteForm() {
    const { add } = useActions();

    const addAnecdote = (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        add(content);
        event.target.reset();
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                    <input data-testid="new" name="anecdote" />
                </div>
                <button>create</button>
            </form>
        </>
    )
}