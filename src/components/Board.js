import React, { useMemo } from 'react';
import { useRuntime } from '../lib.js';

const Tile = ({ tile, gameState }) => {
    const {
        tickTackToe
    } = useRuntime();
    const moveFound = gameState[tile[1]][tile[0]];
    if (!moveFound) {
        return (
            <div
                style={{
                    cursor: tickTackToe.inTimeout ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '100%', height: '100%'
                }}
                onClick={() => tickTackToe.runtimeOnMove({
                    player: tickTackToe.turn,
                    tile
                })}>
                EMPTY
            </div>
        );
    }
    return (
        <div style={{
            cursor: 'not-allowed',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '100%', height: '100%',
            backgroundColor: moveFound.player === 1 ? 'rgba(255, 255, 255, .4)' : 'rgba(0, 0, 0, .4)'
        }}>
            {'PLAYER ' + moveFound.player}
        </div>
    )
}

const Board = (props) => {
    const {
        tickTackToe,
        bitcoinPrice
    } = useRuntime();
    return useMemo(
        () => {
            return (
                <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    marginTop: 10
                }}>
                    {tickTackToe.winner ? (
                        <h2>PLAYER {tickTackToe.winner} WON. Reload to play again</h2>
                    ) : (
                        tickTackToe.inTimeout ? <h2>PLAYER {tickTackToe.turn} you're in timeout</h2> : <h2>PLAYER {tickTackToe.turn}'s turn</h2>
                    )}
                    <div style={{
                        display: 'flex', flexDirection: 'column',
                        marginTop: 10,
                        width: 300,
                        height: 300,
                        backgroundColor: tickTackToe.inTimeout ? 'rgba(0, 0, 0, .5)' : (bitcoinPrice.increased ? '#49FF00' : '#FF0000'),
                        borderRadius: 3
                    }}>
                        <div style={{
                            display: 'flex',
                            width: '100%',
                            height: 100
                        }}>
                            <div style={{
                                display: 'flex',
                                width: 100,
                                height: '100%',
                                backgroundColor: 'rgba(0, 0, 0, .2)',
                                borderWidth: 2, borderColor: 'white', borderStyle: 'solid'
                            }}>
                                <Tile gameState={tickTackToe.gameState} tile={[0, 0]} />
                            </div>
                            <div style={{
                                display: 'flex',
                                width: 100,
                                height: '100%',
                                backgroundColor: 'rgba(0, 0, 0, .2)',
                                borderWidth: 2, borderColor: 'white', borderStyle: 'solid'
                            }}>
                                <Tile gameState={tickTackToe.gameState} tile={[1, 0]} />
                            </div>
                            <div style={{
                                display: 'flex',
                                width: 100,
                                height: '100%',
                                backgroundColor: 'rgba(0, 0, 0, .2)',
                                borderWidth: 2, borderColor: 'white', borderStyle: 'solid'
                            }}>
                                <Tile gameState={tickTackToe.gameState} tile={[2, 0]} />
                            </div>
                        </div>
                        <div style={{
                            display: 'flex',
                            width: '100%',
                            height: 100
                        }}>
                            <div style={{
                                display: 'flex',
                                width: 100,
                                height: '100%',
                                backgroundColor: 'rgba(0, 0, 0, .2)',
                                borderWidth: 2, borderColor: 'white', borderStyle: 'solid'
                            }}>
                                <Tile gameState={tickTackToe.gameState} tile={[0, 1]} />
                            </div>
                            <div style={{
                                display: 'flex',
                                width: 100,
                                height: '100%',
                                backgroundColor: 'rgba(0, 0, 0, .2)',
                                borderWidth: 2, borderColor: 'white', borderStyle: 'solid'
                            }}>
                                <Tile gameState={tickTackToe.gameState} tile={[1, 1]} />
                            </div>
                            <div style={{
                                display: 'flex',
                                width: 100,
                                height: '100%',
                                backgroundColor: 'rgba(0, 0, 0, .2)',
                                borderWidth: 2, borderColor: 'white', borderStyle: 'solid'
                            }}>
                                <Tile gameState={tickTackToe.gameState} tile={[2, 1]} />
                            </div>
                        </div>
                        <div style={{
                            display: 'flex',
                            width: '100%',
                            height: 100
                        }}>
                            <div style={{
                                display: 'flex',
                                width: 100,
                                height: '100%',
                                backgroundColor: 'rgba(0, 0, 0, .2)',
                                borderWidth: 2, borderColor: 'white', borderStyle: 'solid'
                            }}>
                                <Tile gameState={tickTackToe.gameState} tile={[0, 2]} />
                            </div>
                            <div style={{
                                display: 'flex',
                                width: 100,
                                height: '100%',
                                backgroundColor: 'rgba(0, 0, 0, .2)',
                                borderWidth: 2, borderColor: 'white', borderStyle: 'solid'
                            }}>
                                <Tile gameState={tickTackToe.gameState} tile={[1, 2]} />
                            </div>
                            <div style={{
                                display: 'flex',
                                width: 100,
                                height: '100%',
                                backgroundColor: 'rgba(0, 0, 0, .2)',
                                borderWidth: 2, borderColor: 'white', borderStyle: 'solid'
                            }}>
                                <Tile gameState={tickTackToe.gameState} tile={[2, 2]} />
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        [
            tickTackToe.gameState,
            tickTackToe.turn,
            tickTackToe.winner,
            tickTackToe.inTimeout,
            bitcoinPrice.increased
        ]
    );
};

export default Board;