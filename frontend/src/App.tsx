import './App.css'
import GuessGrid from './Components/GuessGrid'
import VirtualKeyboard from './Components/VirtualKeyboard'

function App() {
  return (
    <>
      <h1>Wordle 2</h1>
      <GuessGrid />
      <VirtualKeyboard />
    </>
  )
}

export default App
