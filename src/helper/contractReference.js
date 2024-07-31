import { ethers } from 'ethers';
const DEFAULT_CURRENCY_DECIMALS = 18
const DEFAULT_PRECISION = 4

export const erc20USDC = {
    'gnosis': '0x199DeFb50a0b0Fef6036858fdBe6d54E2932028E',
    'ethereum': '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    '': ''
};

export const decimalContractAddress = {
    'gnosis': '0xB265924b3F036fc2b1A0477E576Da502b6980e79',
    'ethereum': '0xB265924b3F036fc2b1A0477E576Da502b6980e79',
    '': ''
};

export const DECIMALS = {
    'gnosis': 18,
    'ethereum': 18
};

export const JOB_CREATION_GAS = {
    'gnosis': 100000,
    'ethereum': 100000
};

export const BASE_TOKEN_DECIMALS = {
    'gnosis': 9,
    'ethereum': 9
};


// Return BigNumber from string with decimal

export function isInputAmountValid(amount) {
    if (!amount) return true;

    const containsSpecialCharsOrAlphabets = /[^\d.]/.test(amount);
    if (containsSpecialCharsOrAlphabets) return false;

    const containsMoreThanOneDecimal = (amount.match(/\./g) || []).length > 1;
    if (containsMoreThanOneDecimal) return false;

    const integerPart = amount.split('.')[0];
    const decimalPart = amount.split('.')[1];

    if (integerPart.length > 50) return false;
    if (decimalPart && decimalPart.length > 18) return false;
    if (!decimalPart && BigInt(integerPart) === BigInt(0)) return false;
    if (decimalPart && BigInt(integerPart) === BigInt(0) && BigInt(decimalPart) === BigInt(0)) return false;

    return true;
}



export const stringToBigNumber = (value, bigNumberDecimal = DEFAULT_CURRENCY_DECIMALS) => {
    if (!value) return BigInt(0);
    if (!isInputAmountValid(value)) return BigInt(0);
    let newValue = value;
    let [integer, fraction] = value.split('.');

    if (fraction && fraction.length > bigNumberDecimal) {
        fraction = fraction.slice(0, bigNumberDecimal);
        newValue = integer + '.' + fraction;
    }
    return ethers.parseUnits(newValue, bigNumberDecimal)
    // return ethers.utils.parseUnits(newValue, bigNumberDecimal);
};


export const bigNumberToString = (
    value,
    bigNumberDecimal = DEFAULT_CURRENCY_DECIMALS,
    precision = DEFAULT_PRECISION,
    commify = true
) => {
    if (value === undefined || value === null) {
        throw new Error('Invalid value');
    }
    if (value === 0n) {
        return '0.00';
    }

    const formattedValue = ethers.formatUnits(value, bigNumberDecimal);
    const [integerPart, decimalPart] = formattedValue.split('.');
    const commifiedIntegerPart = commify ? BigInt(integerPart).toLocaleString() : integerPart;
    const truncatedDecimalPart = decimalPart.slice(0, precision).padEnd(precision, '0');

    return `${commifiedIntegerPart}.${truncatedDecimalPart}`;
};

