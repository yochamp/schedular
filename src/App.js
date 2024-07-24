import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'https://5s8wfelaz8.execute-api.us-east-1.amazonaws.com/s1'; // Replace with your API URL

const Scheduler = () => {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState('');

    const fetchEvents = async () => {
        try {
            const response = await axios.get(API_URL);
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleAddEvent = async () => {
        if (newEvent.trim()) {
            try {
                await axios.post(API_URL, {
                    id: new Date().toISOString(), // Generate a unique ID
                    description: newEvent
                });
                setNewEvent('');
                fetchEvents(); // Refresh the event list
            } catch (error) {
                console.error('Error adding event:', error);
            }
        }
    };

    const handleDeleteEvent = async (id) => {
        try {
            await axios.delete(`${API_URL}?id=${id}`);
            fetchEvents(); // Refresh the event list
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div className="scheduler">
            <h2>Scheduler</h2>
            <input
                type="text"
                value={newEvent}
                onChange={(e) => setNewEvent(e.target.value)}
                placeholder="Enter new event"
            />
            <button onClick={handleAddEvent}>Add Event</button>
            <ul>
                {events.map((event) => (
                    <li key={event.id}>
                        {event.description}
                        <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const App = () => {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Simple Scheduler</h1>
            </header>
            <main>
                <Scheduler />
            </main>
        </div>
    );
};

export default App;
