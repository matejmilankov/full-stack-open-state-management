import { useActions } from "../store";
import { useNotificationActions } from "../notificationStore";

export function AnecdoteForm() {
    const { add } = useActions();
    const { notify } = useNotificationActions();

    const addAnecdote = (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        add(content);
        notify(`You added ${content}`, 5);
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