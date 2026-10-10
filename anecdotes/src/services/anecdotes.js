const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
    const response = await fetch(baseUrl);

    if(!response.ok)
        throw Error('Error while getting anecdotes');

    return await response.json();
}

export default { getAll }