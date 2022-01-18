import React, { useMemo } from 'react';
import { useRuntime } from '../lib.js';
import TauntButton from './TauntButton.js';

const Board = (props) => {
    const {
        bitcoinPrice
    } = useRuntime();
    return useMemo(
        () => {
            return (
                <div style={{
                    position: 'relative',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '100%',
                    height: 70,
                    backgroundColor: 'rgba(0, 0, 0, .2)',
                    fontFamily: 'arial',
                    color: 'rgba(0, 0, 0, .8)',
                    fontWeight: 'bold',
                    borderWidth: 1, borderStyle: 'solid', borderColor: 'rgba(0, 0, 0, .1)'
                }}>
                    BTC PRICE {bitcoinPrice.increased ? `INCREASED TO` : `DROPPED TO`}: {bitcoinPrice.usd || 'loading'}
                    <div style={{
                        display: 'flex',
                        position: 'absolute', right: 10, height: 40, top: 15
                    }}>
                        <TauntButton />
                    </div>
                </div>
            );
        },
        [
            bitcoinPrice.usd,
            bitcoinPrice.increased
        ]
    );
};

export default Board;