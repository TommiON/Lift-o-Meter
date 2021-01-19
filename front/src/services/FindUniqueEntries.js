const FindUniqueEntries = (entries) => {
    
    var seen = {}   
    return entries.filter(
        (item) => seen.hasOwnProperty(item) ? false : (seen[item] = true)
    )

    /*
    return entries.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    })
    */
}

export default FindUniqueEntries