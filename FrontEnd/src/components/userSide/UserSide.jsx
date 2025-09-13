import React, { useState, useEffect } from 'react';

// --- Helper Components & Icons ---

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);

const BusIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M8 6v6" /><path d="M15 6v6" /><path d="M2 12h19.6" /><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" />
    </svg>
);

const ArrowDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-gray-400">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <polyline points="19 12 12 19 5 12"></polyline>
    </svg>
);

// --- Mock Data for User App ---
// This now represents a list of buses found for a specific search
const availableBusesData = [
    {
        id: 'R101-A',
        busNumber: 'KA-01-F-1234',
        name: 'Majestic to ITPL',
        platform: 5,
        status: 'On Time',
        etaMinutes: 5,
        stops: [
            { id: 1, name: 'Majestic Bus Station', time: '10:00 AM' },
            { id: 2, name: 'Corporation Circle', time: '10:10 AM' },
            { id: 3, name: 'Richmond Circle', time: '10:20 AM' },
            { id: 4, name: 'MG Road', time: '10:30 AM' },
            { id: 5, name: 'Indiranagar', time: '10:45 AM' },
            { id: 6, name: 'Marathahalli', time: '11:00 AM' },
            { id: 7, name: 'Graphite India', time: '11:10 AM' },
            { id: 8, name: 'ITPL', time: '11:20 AM' },
        ],
        initialStopIndex: 3 // Where the bus starts for the simulation
    },
    {
        id: 'R101-B',
        busNumber: 'KA-02-G-9101',
        name: 'Majestic to ITPL',
        platform: 5,
        status: 'Delayed',
        etaMinutes: 18,
        stops: [
            { id: 1, name: 'Majestic Bus Station', time: '10:05 AM' },
            { id: 2, name: 'Corporation Circle', time: '10:15 AM' },
            { id: 3, name: 'Richmond Circle', time: '10:25 AM' },
            { id: 4, name: 'MG Road', time: '10:35 AM' },
            { id: 5, name: 'Indiranagar', time: '10:50 AM' },
            { id: 6, name: 'Marathahalli', time: '11:05 AM' },
            { id: 7, name: 'Graphite India', time: '11:15 AM' },
            { id: 8, name: 'ITPL', time: '11:25 AM' },
        ],
        initialStopIndex: 1
    }
];

// --- Main Application Components ---

const SearchScreen = ({ onSearch }) => {
    return (
        <div className="p-4 bg-gray-50 min-h-screen font-sans">
            <header className="bg-blue-600 text-white p-4 rounded-lg shadow-md mb-6">
                <h1 className="text-2xl font-bold text-center">National Bus Tracker</h1>
            </header>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Find Your Bus</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">From Station</label>
                        <input type="text" defaultValue="Majestic Bus Station" className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div className="flex justify-center my-2">
                        <ArrowDownIcon />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">To Station</label>
                        <input type="text" defaultValue="ITPL" className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <button onClick={onSearch} className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition duration-300">
                        <SearchIcon />
                        Find Buses
                    </button>
                </div>
            </div>
        </div>
    );
};

const BusListScreen = ({ buses, onSelectBus, onBack }) => {
    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            <header className="bg-white shadow-md p-4 flex items-center sticky top-0 z-20">
                <button onClick={onBack} className="mr-4 text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <div>
                    <h1 className="text-lg font-bold text-gray-900">Available Buses</h1>
                    <p className="text-sm text-gray-600">Majestic to ITPL</p>
                </div>
            </header>
            <div className="p-4 space-y-4">
                {buses.map(bus => (
                    <div key={bus.id} onClick={() => onSelectBus(bus)} className="bg-white rounded-lg shadow p-4 border border-gray-200 cursor-pointer hover:shadow-lg hover:border-blue-500 transition">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-bold text-lg text-gray-800">{bus.busNumber}</p>
                                <p className="text-sm text-gray-500">{bus.name}</p>
                            </div>
                            <div className="text-right">
                                <p className={`font-semibold text-sm ${bus.status === 'Delayed' ? 'text-red-500' : 'text-green-600'}`}>{bus.status}</p>
                                <p className="text-gray-700">ETA: {bus.etaMinutes} min</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


const BusStatusScreen = ({ route, onBack }) => {
    const [currentStopIndex, setCurrentStopIndex] = useState(route.initialStopIndex || 0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentStopIndex(prevIndex => {
                if (prevIndex < route.stops.length - 1) {
                    return prevIndex + 1;
                }
                clearInterval(timer);
                return prevIndex;
            });
        }, 3000);

        return () => clearInterval(timer);
    }, [route.stops.length]);
    
    const busPositionPercentage = (currentStopIndex / (route.stops.length - 1)) * 100;

    return (
        <div className="bg-gray-100 min-h-screen font-sans">
            <header className="bg-white shadow-md p-4 flex items-center sticky top-0 z-20">
                <button onClick={onBack} className="mr-4 text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <div>
                    <h1 className="text-lg font-bold text-gray-900">{route.busNumber}</h1>
                    <p className="text-sm text-gray-600">{route.name}</p>
                </div>
            </header>
            
            <div className="p-4">
                <div className="bg-white rounded-lg shadow p-4 mb-4 text-center">
                    <p className="text-sm text-gray-500">Next stop in 5 mins</p>
                    <h2 className="text-xl font-bold text-blue-600">{route.stops[currentStopIndex + 1]?.name || 'Destination Reached'}</h2>
                    <p className="text-sm text-gray-500">Platform No: {route.platform}</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="relative">
                        {/* The gray line for the route */}
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                        {/* Bus Icon and its progress line */}
                        <div 
                            className="absolute left-[11px] top-0 h-full transition-all duration-1000" 
                            style={{ height: `${busPositionPercentage}%` }}
                        >
                             <div className="absolute top-0 w-2 h-full bg-blue-500 rounded"></div>
                             <BusIcon className="absolute right-[-14px] -bottom-3 w-8 h-8 text-white bg-blue-600 p-1 rounded-full shadow-lg z-10" />
                        </div>

                        {route.stops.map((stop, index) => {
                            const hasPassed = index < currentStopIndex;
                            const isCurrent = index === currentStopIndex;
                            
                            return (
                                <div key={stop.id} className="relative pl-12 py-3">
                                    <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                                        hasPassed ? 'bg-blue-500' : 'bg-gray-300'
                                    }`}>
                                        <div className="w-3 h-3 bg-white rounded-full"></div>
                                    </div>
                                    <div>
                                        <p className={`font-semibold ${hasPassed || isCurrent ? 'text-gray-900' : 'text-gray-500'}`}>{stop.name}</p>
                                        <p className="text-sm text-gray-500">Scheduled: {stop.time}</p>
                                        {isCurrent && <p className="text-xs text-blue-600 font-bold">Arrived</p>}
                                        {hasPassed && <p className="text-xs text-green-600 font-bold">Crossed</p>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- App Entry Point ---
export default function UserSide() {
    const [view, setView] = useState('search'); // 'search', 'busList', 'status'
    const [selectedRoute, setSelectedRoute] = useState(null);

    const handleSearch = () => {
        // In a real app, you'd fetch data based on search inputs
        setView('busList');
    };
    
    const handleSelectBus = (route) => {
        setSelectedRoute(route);
        setView('status');
    };

    const handleBack = () => {
        if(view === 'status'){
            setView('busList');
        } else if (view === 'busList') {
            setView('search');
        }
    };

    if (view === 'search') {
        return <SearchScreen onSearch={handleSearch} />;
    }
    
    if (view === 'busList') {
        return <BusListScreen buses={availableBusesData} onSelectBus={handleSelectBus} onBack={handleBack} />
    }
    
    return <BusStatusScreen route={selectedRoute} onBack={handleBack} />;
}
