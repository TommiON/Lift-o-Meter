const GenerateTokenizedHeader = () => {
    const accessToken = window.localStorage.getItem('accessToken')
    let config = null
    if(accessToken) {
        const headerLine = 'bearer '.concat(accessToken)
        config = {
            headers: { Authorization: headerLine }
        }
    }
    
    return config
}

export default GenerateTokenizedHeader