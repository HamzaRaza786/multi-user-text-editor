'use client'
import { Socket } from 'dgram';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
let socket: any;
const socketInitializer = async () => {
  socket = io('ws://127.0.0.1:3001/ws'); // Adjust the URL to match your server
  socket.on('connect', () => {
    console.log('Connected to socket server');
  });
  // Add any other socket event listeners here
};
export default function Editor() {
  useEffect(() => { socketInitializer(); }, [])
  const [input, setInput] = useState('');
  const onChangeHandler = (e) => {
    setInput(e.target.value);
    socket.emit('input-change', msg => {
      socket.broadcast.emit('update-input', msg)
    });
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Text Editor</h1>
      <textarea
        className="p-4 text-lg border-2 border-gray-300 rounded-lg w-full max-w-4xl h-96 resize-none focus:outline-none focus:border-blue-500 leading-relaxed"
        placeholder="Start typing here..."
        onChange={onChangeHandler}
        value={input}
      />
    </div>
  );
}
