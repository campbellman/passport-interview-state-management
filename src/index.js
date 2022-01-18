import React from 'react';
import ReactDOM from 'react-dom';
import { useWindowSize } from 'react-use';
import { RuntimeTracker, useChannel } from './lib.js';
import useRuntimeHooks from './runtime/index.js'
import PriceBanner from './components/PriceBanner.js';
import Board from './components/Board.js';

function Page() {
    const size = useWindowSize();
    return (
        <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            width: size.width, height: size.height,
            position: 'relative'
        }}>
            <PriceBanner />
            <Board />
        </div>
    );
};

function App() {
    const channel = useChannel();
    const runtime = useRuntimeHooks(channel);
    return (
        <RuntimeTracker runtime={runtime}>
            <Page />
        </RuntimeTracker>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
