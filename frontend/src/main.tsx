import ReactDOM from 'react-dom/client'

import './app/globals.css'
import Dashboard from './Dashboard.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ListPage from './ListPage.tsx'
import LearnPage from './learn_page/LearnPage.tsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/list/:listId" element={<ListPage />} />
        <Route path="/learnList/:listId" element={<LearnPage />} />

        <Route path='/translation/:translationId' element={<div>Translation: WIP</div>} />
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
)
