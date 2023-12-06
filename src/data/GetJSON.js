const GetJSON = async (stock) => {
    const jsonPath = `../data/JSON/${stock.symbol}.json`
    return await require(`${jsonPath}`)
}

export default GetJSON;