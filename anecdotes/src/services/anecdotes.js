const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
    const response = await fetch(baseUrl);

    if(!response.ok)
        throw Error('Error while getting anecdotes');

    return await response.json();
}

const create = async (content) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ content, votes: 0 })
    }
    const response = await fetch(baseUrl, options);

    if(!response.ok)
        throw Error('Failed to create new anecdote');

    return await response.json();
}

export default { getAll, create }