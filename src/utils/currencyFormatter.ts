export const currencyFormatter = ( value: number ) => {
    return new Intl.NumberFormat( 'en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        currencyDisplay: 'code'
    } ).format( value );
};