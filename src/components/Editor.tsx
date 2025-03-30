import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useLocation } from 'react-router-dom';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { QuillBinding } from 'y-quill';


const Editor: React.FC = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const creatorId = searchParams.get('creatorId') ?? '';
    const roomName = searchParams.get('roomName') ?? '';
    const editorRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<Quill | null>(null);

    const saveContent = async () => {
        if (quillRef.current) {
            const content = quillRef.current.getText();
            const response = await fetch('/api/saveDocument', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ creatorId, roomName, content }),
            });

            if (!response.ok) {
                console.error('Failed to save document.');
            }
        }
    };

    const loadContent = async () => {
        const response = await fetch(
            `/api/loadDocument?creatorId=${creatorId}&roomName=${roomName}`
        );
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            if (quillRef.current) {
                quillRef.current.setText(data.content);
            }
        } else {
            console.error('Failed to load document.');
        }
    };

    useEffect(() => {
        if (editorRef.current) {
            const quill = new Quill(editorRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: [
                        [{ header: [1, 2, false] }],
                        ['bold', 'italic', 'underline'],
                        ['image', 'code-block'],
                    ],
                    history: {
                        userOnly: true,
                    },
                },
                placeholder: 'Start collaborating...',
            });

            quillRef.current = quill;

            const ydoc = new Y.Doc();
            const provider = new WebrtcProvider(`${creatorId}-${roomName}`, ydoc);
            const ytext = ydoc.getText('quill');
            const binding = new QuillBinding(ytext, quill, provider.awareness);

            loadContent();

            return () => {
                binding.destroy();
                provider.disconnect();
            };
        }
    }, [creatorId, roomName]);

    return (
        <div>
            <h1>Editor</h1>
            <h2>Creator ID: {creatorId}</h2>
            <h2>Room Name: {roomName}</h2>
            <div
                className="bg-emerald-200 text-black"
                ref={editorRef}
                style={{ height: '300px' }}
            />
            <div>
                <button onClick={saveContent}>Save Content</button>
            </div>
        </div>
    );
};

export default Editor;
