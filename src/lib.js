import { useEffect, useState } from 'react';

// IIAF (immediately invoked arrow function)
// Holds a single reference to the latest runtime state and listener functions and returns an interface
export const store = (() => {
    let state = {
        deps: {},
        listeners: []
    };
    return {
        onChange: function (deps) {
            state.deps = Object.assign({}, state.deps, deps);
            state.listeners.forEach((func) => func && func(state.deps));
        },
        addListener: function (func) {
            state.listeners.push(func);
            return state.listeners.length - 1;
        },
        removeListener: function (index) {
            state.listeners[index] = null;
        },
        get: function () { return state.deps; }
    }
})();

// Pub/sub mechanism to enable bi-directional communication between runtime hooks
// Messages must go to the front of the channel so that any hook can call channel.sub('channel')[0] and know the latest message
// See src/runtime/useTaunt.js and src/runtime/useTickTackToe.js for examples
export const useChannel = () => {
    const [channels, setChannels] = useState({});
    return {
        sub: (channel) => channels[channel] || [],
        pub: (channel, message) => setChannels(last => Object.assign(
            {},
            last,
            { [channel]: [message].concat(last[channel] || []) }
        ))
    }
};

// Used within components to get access to the latest runtime state
export const useRuntime = (key = null) => {
    const [deps, setDeps] = useState(store.get());
    useEffect(() => {
        const index = store.addListener(setDeps);
        return () => store.removeListener(index);
    }, []);
    return deps;
};

// Tracks changes to our runtime state
export const RuntimeTracker = ({ children, runtime }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        store.onChange(runtime);
        setMounted(true);
    }, [runtime]);

    if (!mounted) {
        return null;
    }

    return children;
};