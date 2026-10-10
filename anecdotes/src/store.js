import { create } from 'zustand';
import ancedotService from './services/anecdotes';

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    vote: async (id) => {
      const anecdoteToUpdate = get().anecdotes.find(a => a.id === id);
      const updatedAnecdote = await ancedotService.update(
        id,
        { ...anecdoteToUpdate, votes: anecdoteToUpdate.votes + 1 }
      );

      const updatedAncedotes = get().anecdotes.map(a => (
        a.id === id ? updatedAnecdote : a
      ));

      set(() => ({
        anecdotes: updatedAncedotes.toSorted((a, b) => b.votes - a.votes)
      }))
    },
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
    },
    remove: async (id) => {
      await ancedotService.remove(id);
      set(state => ({
        anecdotes: state.anecdotes.filter(a => a.id !== id)
      }));
    }
  },
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore(state => state.anecdotes);
  const filter = useAnecdoteStore(state => state.filter);

  if (filter !== '')
    return anecdotes.filter(a => (
      a.content.toLowerCase().includes(filter.toLowerCase())
    ));

  return anecdotes;
}
export const useActions = () => useAnecdoteStore(state => state.actions)
