const createClause = (query) => {
    let orClausses = [];
    let typeA = query.typeA;
    let typeB = query.typeB;

    if (typeA || typeB){
        if(typeA){
            typeA.forEach(type => {
                orClausses.push({ type: type })
            })
        }
        if(typeB){
            typeB.forEach(type => {
                orClausses.push({ type: type })
            })
        }
    } else {
        orClausses = undefined;
    }

    return orClausses;
}

module.exports = {createClause}