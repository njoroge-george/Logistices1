import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const linkStyle = ({ isActive }) => ({
        display: 'block',
        padding: '10px 20px',
        textDecoration: 'none',
        color: isActive ? '#fff' : '#ccc',
        backgroundColor: isActive ? '#333' : 'transparent',
        borderRadius: '4px',
        margin: '5px 0',
    });

    return (
        <div style={{
            width: '250px',
            height: '100vh',
            backgroundColor: '#222',
            padding: '20px',
            boxSizing: 'border-box',
        }}>
            <h2 style={{ color: '#fff', marginBottom: '20px' }}>Dashboard Menu</h2>
            <nav style={{ display: 'flex', flexDirection: 'column' }}>
                <NavLink to="/overview" style={linkStyle}>Overview</NavLink>
                <NavLink to="/finance" style={linkStyle}>Finance</NavLink>
                <NavLink to="/calendar" style={linkStyle}>Calendar</NavLink>

                <NavLink to="/fitness" style={linkStyle}>Fitness</NavLink>
                <NavLink to="/projects" style={linkStyle}>Projects</NavLink>
                <NavLink to="/journal" style={linkStyle}>Journal</NavLink>
                <NavLink to="/contacts" style={linkStyle}>Contacts</NavLink>
                <NavLink to="/skills" style={linkStyle}>Skills</NavLink>
                <NavLink to="/to_do" style={linkStyle}>To_do</NavLink>
                <NavLink to="/settings" style={linkStyle}>Settings</NavLink>
            </nav>
        </div>
    );
};

export default Sidebar;