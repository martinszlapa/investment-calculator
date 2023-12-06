const GetJSON = async (stock) => {
    const jsonPath = `./JSON/${stock.symbol}.json`
    return await require(`${jsonPath}`)
}

export default GetJSON;