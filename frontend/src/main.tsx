import ReactDOM from 'react-dom/client'

import './app/globals.css'
import Dashboard from './pages/dashboard/Dashboard.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ListPage from './pages/list_page/ListPage.tsx'
import LearnPage from './pages/learn_page/LearnPage.tsx'
import TranslationPage from './pages/translation_page/TranslationPage.tsx'
import ImportPage from './pages/import_page/ImportPage.tsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/list/:listId" element={<ListPage />} />

        <Route path="/learnList/:listId" element={<LearnPage onlyHard={false} />} />
        <Route path="/learnListHard/:listId" element={<LearnPage onlyHard={true} />} />

        <Route path='/translation/:translationId' element={<TranslationPage />} />

        <Route path="/import" element={<ImportPage />} />
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
)
