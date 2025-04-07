/**
 * Solution for resolving promises that is the one from the labs. 
 * 
 */
export function resolvePromise(prms, promiseState){
    promiseState.promise = prms;
    promiseState.data = null;
    promiseState.error = null;
    function passDataACB(data){
        //race condition
        if(promiseState.promise == prms){
            promiseState.data = data;
        }
    }
    function passErrorACB(error){
        if(promiseState.promise == prms){
            promiseState.error = error;
        }
    }
    if(prms){
        return prms.then(passDataACB).catch(passErrorACB)
    }
}