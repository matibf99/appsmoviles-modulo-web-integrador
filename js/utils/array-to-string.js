const arrayToString = (array) => {
    let s = "";

    for (let i = 0; i < array.length; i++) {
        if (i < array.length-1)
            s += `${array[i]}, `;
        else
            s += `${array[i]}`;
    }

    return s;
}

const arrayToStringWithDash = (array) => {
    let s = "";

    for (let i = 0; i < array.length; i++) {
        let string = array[i];
        string = string[0].toUpperCase() + string.slice(1);

        if (i < array.length-1)
            s += `${string}/`;
        else
            s += `${string}`;
    }

    return s;
}


const htmlArrayToString = (array) => {
    let s = "";

    for (let i = 0; i < array.length; i++) {
        s += `${array[i]}`
    }

    return s;
}

export { arrayToString, arrayToStringWithDash, htmlArrayToString };