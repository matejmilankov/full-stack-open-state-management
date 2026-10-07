import { useAnecdotes } from "../store";
import { useActions } from "../store";

export function AnecdoteList() {
    const anecdotes = useAnecdotes();
    const { vote } = useActions();

    return (
        <>
            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            ))}
        </>
    )
}