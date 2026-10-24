
/** Exercise 01 - Coins */

function calculate(amount) {
    // check the amount is greather than 100
    if (amount > 100) {
        // return the error message if the amount is too large
        return "Error: the number is too large";
    }
   // convert doller into sent and rount to avoid decimal
    let cents = Math.round(amount * 100);

    // calculate the number o whole doller
    let dollars = Math.floor(cents / 100);
    // keep the remaining cent after removing the doller
    cents = cents % 100;

     //  calculate the number of quarter
    let quarters = Math.floor(cents / 25);
    // keep the remaining cent after removing the quarter
    cents = cents % 25;
    
     //  calculate the number of dimes
    let dimes = Math.floor(cents / 10);
    // // keep the remaining cent after removing the quarter
    cents = cents % 10;
    
    //  calculate the number of nickels
    let nickels = Math.floor(cents / 5);
     // keep the remaining cent after removing the quarter
    cents = cents % 5;
   
     // remaining cents are pennies
    let pennies = cents;
    
    // create an empty array
    let result = [];
    // add the number of quarter, dimes, nickles, and pennies  if greather than zero
    if (dollars > 0) result.push(dollars + " dollars");
    if (quarters > 0) result.push(quarters + " quarters");
    if (dimes > 0) result.push(dimes + " dimes");
    if (nickels > 0) result.push(nickels + " nickels");
    if (pennies > 0) result.push(pennies + " pennies");
    
    // check the weather array is empty
    if (result.length === 0) {
        return "0 coins";
    }
    // join the result into one string
    return result.join(", ");
}

// Sample test cases
console.log(calculate(4.62));
// 4 dollars, 2 quarters, 1 dimes, 2 pennies

console.log(calculate(0.16));
// 1 dimes, 1 nickels, 1 pennies

console.log(calculate(150.11));
// Error: the number is too large

// Additional test cases
console.log(calculate(1.00));
console.log(calculate(0.05));
console.log(calculate(0.01));
console.log(calculate(0));
console.log(calculate(100));
