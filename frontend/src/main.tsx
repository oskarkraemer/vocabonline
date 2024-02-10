import ReactDOM from 'react-dom/client'

import './app/globals.css'
import Dashboard from './pages/dashboard/Dashboard.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ListPage from './pages/list_page/ListPage.tsx'
import LearnPage from './pages/learn_page/LearnPage.tsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/list/:listId" element={<ListPage />} />

        <Route path="/learnList/:listId" element={<LearnPage onlyHard={false} />} />
        <Route path="/learnListHard/:listId" element={<LearnPage onlyHard={true} />} />

        <Route path='/translation/:translationId' element={<div>Translation: WIP</div>} />
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
)
