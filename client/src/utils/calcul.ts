export const reductionPrice=({price , reduction}:{price:number, reduction:number})=>{
    return              `${Math.round(price*(1-reduction/100))} ${import.meta.env.VITE_REACT_CURRENCY}`
}

export const priceFormated=({price}:{price:number})=>`${Math.round(price)} ${import.meta.env.VITE_REACT_CURRENCY}`;