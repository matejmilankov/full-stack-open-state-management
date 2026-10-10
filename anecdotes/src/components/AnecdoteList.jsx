import { useAnecdotes } from "../store";
import { useActions } from "../store";
import { useNotificationActions } from "../notificationStore";

export function AnecdoteList() {
    const anecdotes = useAnecdotes();
    const { vote, remove } = useActions();

    const { notify } = useNotificationActions();

    const handleVote = (id, content) => {
        vote(id);
        notify(`You voted ${content}`, 5);
    }

    return (
        <>
            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote.id, anecdote.content)}>vote</button>
                        {anecdote.votes === 0 && (
                            <button onClick={() => remove(anecdote.id)}>remove</button>
                        )}
                    </div>
                </div>
            ))}
        </>
    )
}