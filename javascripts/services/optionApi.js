import { getResponseReqAuthJson } from "./apiBase.js";

export async function createOption(stockBrokerAccountId, tickerId, date, callPutType, longShortType, numberOfContracts, numberOfSharesPerContract, premiumPrice, premiumPriceCurrency, strikePrice, strikePriceCurrency, expireDate, costs, costsCurrency, isExercised, exerciseDate, exerciseCosts, exerciseCostsCurrency, exchangeRateInfos, exerciseExchangeRateInfos, message) {
    const obj = {
        stockBrokerAccountId: stockBrokerAccountId,
        tickerId: tickerId,
        date: date,
        callPutType: callPutType,
        longShortType: longShortType,
        numberOfContracts: numberOfContracts,
        numberOfSharesPerContract: numberOfSharesPerContract,
        premiumPrice: premiumPrice,
        premiumPriceCurrency: premiumPriceCurrency,
        strikePrice: strikePrice,
        strikePriceCurrency: strikePriceCurrency,
        expireDate: expireDate,
        costs: costs,
        costsCurrency: costsCurrency,
        isExercised: isExercised,
        exerciseDate: exerciseDate,
        exerciseCosts: exerciseCosts,
        exerciseCostsCurrency: exerciseCostsCurrency,
        exchangeRateInfos: exchangeRateInfos,
        exerciseExchangeRateInfos: exerciseExchangeRateInfos
    };

    const endpoint = "Option/create";
    const method = "POST";
    
    return await getResponseReqAuthJson(endpoint, method, obj, message);
}

export async function updateOption(id, stockBrokerAccountId, tickerId, date, callPutType, longShortType, numberOfContracts, numberOfSharesPerContract, premiumPrice, premiumPriceCurrency, strikePrice, strikePriceCurrency, expireDate, costs, costsCurrency, isExercised, exerciseDate, exerciseCosts, exerciseCostsCurrency, exchangeRateInfos, exerciseExchangeRateInfos, latestUpdate, message) {
    const obj = {
        id: id,
        stockBrokerAccountId: stockBrokerAccountId,
        tickerId: tickerId,
        date: date,
        callPutType: callPutType,
        longShortType: longShortType,
        numberOfContracts: numberOfContracts,
        numberOfSharesPerContract: numberOfSharesPerContract,
        premiumPrice: premiumPrice,
        premiumPriceCurrency: premiumPriceCurrency,
        strikePrice: strikePrice,
        strikePriceCurrency: strikePriceCurrency,
        expireDate: expireDate,
        costs: costs,
        costsCurrency: costsCurrency,
        isExercised: isExercised,
        exerciseDate: exerciseDate,
        exerciseCosts: exerciseCosts,
        exerciseCostsCurrency: exerciseCostsCurrency,
        exchangeRateInfos: exchangeRateInfos,
        exerciseExchangeRateInfos: exerciseExchangeRateInfos,
        latestUpdate: latestUpdate
    };

    const endpoint = "Option/update";
    const method = "POST";
    
    return await getResponseReqAuthJson(endpoint, method, obj, message);
}

export async function deleteOption(id, latestUpdate, message) {
    const obj = {
        id: id,
        latestUpdate: latestUpdate
    };

    const endpoint = "Option/delete";
    const method = "POST";
    
    return await getResponseReqAuthJson(endpoint, method, obj, message);
}

export async function getOption(id, message) {
    const endpoint = "Option/" + id;
    const method = "GET";
    
    return await getResponseReqAuthJson(endpoint, method, null, message);
}

