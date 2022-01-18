import useBitcoinPrice from './useBitcoinPrice.js'
import useTaunt from './useTaunt.js'
import useTickTackToe from './useTickTackToe.js'

const useRuntimeHooks = (channel) => {
    const bitcoinPrice = useBitcoinPrice(channel);
    const taunt = useTaunt(channel);
    const tickTackToe = useTickTackToe(channel);
    return {
        bitcoinPrice,
        taunt,
        tickTackToe
    };
};

export default useRuntimeHooks;