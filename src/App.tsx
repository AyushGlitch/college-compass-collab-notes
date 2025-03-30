import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Editor from './components/Editor';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/editor" element={<Editor />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
