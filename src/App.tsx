import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ReadingHistoryProvider } from './contexts/ReadingHistoryContext';
import { ToastProvider } from './contexts/ToastContext';
import { ConnectedToast } from './components/Toast';
import { PageErrorBoundary } from './components/PageErrorBoundary';
import HomePage from './pages/HomePage';
import ReaderPage from './pages/ReaderPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ReadingHistoryProvider>
          <ToastProvider>
            <Routes>
              <Route path="/" element={<PageErrorBoundary><HomePage /></PageErrorBoundary>} />
              <Route path="/reader/:novelId" element={<PageErrorBoundary><ReaderPage /></PageErrorBoundary>} />
              <Route path="/profile" element={<PageErrorBoundary><ProfilePage /></PageErrorBoundary>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <ConnectedToast />
          </ToastProvider>
        </ReadingHistoryProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
