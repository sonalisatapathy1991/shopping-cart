const priceFormatter = (num) =>{
    return "$" + Number(num.toFixed(1).toLocaleString());
}

export default priceFormatter;