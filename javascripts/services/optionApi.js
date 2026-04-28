import { getResponseReqAuth } from "./apiBase.js";

export async function createOption(accountId, symbol, date, callPutType, longShortType, numberOfContracts, numberOfSharesPerContract, premiumPrice, strikePrice, expireDate, costs, isExercised, exerciseDate, exerciseCosts, message) {
    const obj = {
        accountId: accountId,
        symbol: symbol,
        date: date,
        callPutType: callPutType,
        longShortType: longShortType,
        numberOfContracts: numberOfContracts,
        numberOfSharesPerContract: numberOfSharesPerContract,
        premiumPrice: premiumPrice,
        strikePrice: strikePrice,
        expireDate: expireDate,
        costs: costs,
        isExercised: isExercised,
        exerciseDate: exerciseDate,
        exerciseCosts: exerciseCosts
    };

    const endpoint = "Option/create";
    const method = "POST";
    
    return await getResponseReqAuth(endpoint, method, obj, message);
}

export async function updateOption(id, accountId, symbol, date, callPutType, longShortType, numberOfContracts, numberOfSharesPerContract, premiumPrice, strikePrice, expireDate, costs, isExercised, exerciseDate, exerciseCosts, latestUpdate, message) {
    const obj = {
        id: id,
        accountId: accountId,
        symbol: symbol,
        date: date,
        callPutType: callPutType,
        longShortType: longShortType,
        numberOfContracts: numberOfContracts,
        numberOfSharesPerContract: numberOfSharesPerContract,
        premiumPrice: premiumPrice,
        strikePrice: strikePrice,
        expireDate: expireDate,
        costs: costs,
        isExercised: isExercised,
        exerciseDate: exerciseDate,
        exerciseCosts: exerciseCosts,
        latestUpdate: latestUpdate
    };
    console.info(obj);

    const endpoint = "Option/update";
    const method = "POST";
    
    return await getResponseReqAuth(endpoint, method, obj, message);
}

export async function deleteOption(id, latestUpdate, message) {
    const obj = {
        id: id,
        latestUpdate: latestUpdate
    };

    const endpoint = "Option/delete";
    const method = "POST";
    
    return await getResponseReqAuth(endpoint, method, obj, message);
}

export async function getOption(id, message) {
    const endpoint = "Option/" + id;
    const method = "GET";
    
    return await getResponseReqAuth(endpoint, method, null, message);
}

