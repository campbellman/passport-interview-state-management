import { useEffect, useState } from 'react';
import { store } from '../lib.js'

const getWinner = (gameState) => {
    // No need to dynamically generate this
    const winPatterns = [
        // rows
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],

        // columns
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],

        // diaganals
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
    ];

    // Get a list of each player's move history for this game
    const { playerOne, playerTwo } = gameState.reduce((accum, row, y) => {
        row.forEach((move, x) => {
            if (!!move === false) {
                return;
            }
            if (move.player === 1) {
                accum.playerOne.push([x, y])
            }
            if (move.player === 2) {
                accum.playerTwo.push([x, y])
            }
        });
        return accum;
    }, { playerOne: [], playerTwo: [] });

    // Check to see if a player's moves contain a winning pattern
    const isWinner = (playerMoves) => {
        return winPatterns.reduce((accum, pattern) => {
            if (accum) {
                return true;
            }
            let found = true;
            pattern.forEach(move => {
                if (!playerMoves.some(playerMove => JSON.stringify(move) === JSON.stringify(playerMove))) {
                    found = false;
                }
                return found;
            });
            return found;
        }, false)
    };

    // Return winning player number, and null if no one has
    const playerOneWins = isWinner(playerOne);
    if (playerOneWins) {
        return 1;
    }
    const playerTwoWins = isWinner(playerTwo);
    if (playerTwoWins) {
        return 2;
    }
    return null;
};


const useTickTackToe = (channel) => {
    const playerInTimeout = channel.sub('timeout')[0];
    const [locked, setLocked] = useState(null);
    const [winner, setWinner] = useState(null);
    const [turn, setTurn] = useState(1);
    const [gameState, setGameState] = useState([
        [null, null, null], 
        [null, null, null], 
        [null, null, null]
    ]);

    // We have to use store.get() to ensure we're working with the freshest data
    // This ensures that calling runtimeOnMove() inside a memoized component still works
    // See the warning comment at the top of src/runtime/useTaunt.js 
    const runtimeOnMove = (_move) => {
        if (store.get().tickTackToe.locked) {
            return;
        }
        if (!!store.get().tickTackToe.gameState[_move.tile[1]][_move.tile[0]]) {
            return;
        }
        if (store.get().tickTackToe.inTimeout) {
            return;
        }
        setGameState(last => {
            let next = last.slice();
            next[_move.tile[1]][_move.tile[0]] = _move;
            return next;
        });
        setTurn(_move.player === 1 ? 2 : 1)
    };

    useEffect(() => {
        const winner = getWinner(gameState);
        if (winner) {
            setWinner(winner);
            setLocked(true);
        }
    }, [gameState]);
    
    return {
        inTimeout: playerInTimeout === turn,
        turn,
        runtimeOnMove,
        winner,
        gameState,
        locked
    }
};

export default useTickTackToe;