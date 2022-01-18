import { useState, useEffect } from 'react';

// NOTE: this does not perform requests in parallel, i'm keeping it simple
const getCoingecko = () => new Promise(async (resolve, reject) => {
    try {
        const statusResponse = await fetch(
            `https://api.coingecko.com/api/v3/ping`,
            { headers: { accept: `application/json` } }
        );
        if (statusResponse.status !== 200) {
            return reject(statusResponse);
        }
        const statusJson = await statusResponse.json();
        let status;
        if (statusJson && statusJson.gecko_says === '(V3) To the Moon!') {
            status = true;
        } else {
            status = false;
        }
        const priceResponse = await fetch(
            `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`,
            { headers: { accept: `application/json` } }
        );
        if (priceResponse.status !== 200) {
            return reject(priceResponse);
        }
        const priceJson = await priceResponse.json();
        resolve({
            status,
            bitcoinPrice: priceJson.bitcoin.usd
        });
    } catch (err) {
        reject(err);
    }
});

const useBitcoinPrice = () => {
    const [price, setPrice] = useState({
        usd: null,
        increased: null,
        error: null,
        coingeckoStatus: null
    });
    const checkPrice = async () => {
        try {
            const coingecko = await getCoingecko();
            setPrice(last => ({
                error: null,
                coingeckoStatus: coingecko.status,
                usd: coingecko.bitcoinPrice,
                increased: typeof last.usd === 'number' && (last.usd < coingecko.bitcoinPrice)
            }))
        } catch (err) {
            setPrice(last => ({
                ...last,
                error: err
            }))
        }
    };
    useEffect(() => {
        checkPrice();
        let interval = setInterval(checkPrice, 20000);
        return () => clearInterval(interval);
    }, []);

    return {
        loading: typeof price.usd !== 'number',
        ...price
    };
};

export default useBitcoinPrice;