import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Editor from './components/Editor';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Editor />} />
                <Route path="/editor" element={<Editor />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
