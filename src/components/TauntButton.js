import React, { useMemo } from 'react';
import { useRuntime } from '../lib.js';

const TauntButton = (props) => {
    const {
        taunt,
        tickTackToe
    } = useRuntime();
    return useMemo(
        () => {
            return (
                <button onClick={() => taunt.runtimeExecute(tickTackToe.turn)} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    height: '100%',
                    width: 200,
                    cursor: 'pointer',
                    backgroundColor: 'blue',
                    color: 'white',
                    fontSize: 14
                }}>
                    {tickTackToe.inTimeout ? taunt.phrase : `Taunt Opponent`}
                </button>
            );
        },
        // this is the rare case where exhaustive-deps linter does not help us
        // remember that we assume functions like .execute above don't need access to the freshest hook scope
        // see src/runtime/useTaunt.js for a more in depth comment
        [
            tickTackToe.turn,
            tickTackToe.turn,
            tickTackToe.inTimeout
        ]
    );
};

export default TauntButton;