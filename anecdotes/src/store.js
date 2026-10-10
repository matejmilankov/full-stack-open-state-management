
import { create } from 'zustand';
import ancedotService from './services/anecdotes';

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => ({
  content: anecdote,
  id: getId(),
  votes: 0
})

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',
  actions: {
    vote: (id) => set(state => {
      const updated = state.anecdotes.map(a => 
        a.id === id ? { ...a, votes: a.votes + 1 } : a
      );

      return {
        anecdotes: updated.toSorted((a, b) => b.votes - a.votes)
      }
    }),
    add: async (content) => {
      const newAnecdot = await ancedotService.create(content);
      set(state => ({
        anecdotes: [...state.anecdotes, newAnecdot]
      }))
    },
    setFilter: value => set(() => ({ filter: value })),
    initialize: async () => {
      const anecdotes = await ancedotService.getAll();
      set(() => ({ anecdotes }));
    }
  },
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore(state => state.anecdotes);
  const filter = useAnecdoteStore(state => state.filter);

  if(filter !== '')
    return anecdotes.filter(a => (
      a.content.toLowerCase().includes(filter.toLowerCase())
  ));

  return anecdotes;
}
export const useActions = () => useAnecdoteStore(state => state.actions)
