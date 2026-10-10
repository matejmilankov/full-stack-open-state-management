import { useEffect } from "react";
import { AnecdoteForm } from "./components/AnecdoteForm";
import { AnecdoteList } from "./components/AnecdoteList";
import { useActions } from "./store";
import Filter from "./components/Filter";

const App = () => {
  const { initialize } = useActions();
  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <div>
      <Filter />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
