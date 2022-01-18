import { store } from '../lib.js'

/*

    IMPORTANT! 
    
    For any functions that you include in a hooks output, like .runtimeExecute below, 
    never assume they have access to the freshest state in their scope at the time you call them in the UI.
    
    These types of functions are mostly useful for composing state setters.
    If you must have access to the latest state call store.get().hookName.prop

    To make it visually obvious which functions are constrained, I prefix them with 'runtime', like with runtimeExecute()

    Eventually a linter with access to a file's AST (abstract syntax tree) could make it really hard to mess this up

*/

const useTaunt = (channel) => {
    const runtimeExecute = (player) => {
        // lets the useTickTackToe hook know that we should prevent player moves while we're in timeout
        channel.pub('timeout', player);
        setTimeout(() => channel.pub('timeout', null), 10000);
        console.log('player ' + store.get().tickTackToe.turn + ' is in timeout')
    };

    return {
        phrase: `You're in timeout, now`,
        runtimeExecute
    }
};

export default useTaunt;