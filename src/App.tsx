import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { EventLoggerProvider } from './context/EventLoggerContext'
import { FeedPage } from './pages/FeedPage'
import { AdminPage } from './pages/AdminPage'

/**
 * @returns {JSX.Element} 应用主入口
 */
const App = () => {
  return (
    <EventLoggerProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-rose-100">
          <Routes>
            <Route path="/" element={<FeedPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </EventLoggerProvider>
  )
}

export default App
