export const priceFormatter = (num) => {
    return "$" + Number(num.toFixed(3).toLocaleString());
}

export const totalCartPriceNproducts = () => {
    const cartLists = JSON.parse(localStorage.getItem('savedCartItems')) ? JSON.parse(localStorage.getItem('savedCartItems')) : [];
    let amount = 0;
    let itemCount = 0;
    cartLists.map((cartItem) => {

        let c = cartItem.count * cartItem.price;

        return amount = parseFloat(amount + c), itemCount = cartLists.length;
    })

    return {
        totalCartPrice: priceFormatter(amount),
        totalCartProduct: itemCount
    };
}

export const fullSizeFormat = (size) => {
    switch (size) {
        case 'X':
            return 'X-Small';
        case 'S':
            return 'Small';
        case 'M':
            return 'Medium';
        case 'L':
            return 'Large';
        case 'XL':
            return 'X-Large';
        case 'XXL':
            return 'XX_Large'
        default:
            return " "

    }
}
export const numArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];