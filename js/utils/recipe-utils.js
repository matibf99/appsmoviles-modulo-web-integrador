const uriToRecipeId = (uri) => {
    return uri.substring(uri.indexOf("#")+1);
}

const calculatePrice = (calories) => {
    return (calories * 0.008).toFixed(2);
}

export { uriToRecipeId, calculatePrice }