const express = require('express')
const cors = require('cors')

const PORT = process.env.PORT || 8000

const app = express()

app.use(cors())

app.get('/', (_, res) => {
    res.send(`
        <h1>SwG Clarín</h1>
        <p>OAuth Endpoint: &nbsp;{BASE_URL}/oauth/login</p>
        <p>Entitlements API: {BASE_URL}/api/entitlements</p>
    `)
})

app.get('/oauth/login', (req, res, next) => {
    try {
        const {
            client_id,
            redirect_uri,
            state,
            response_type
        } = req.query
    
        res.redirect(`${redirect_uri}#access_token=example_token&token_type=bearer&state=${state}`)
    } catch (error) {
        next(error)        
    }
})

app.get('/api/entitlements', (req, res, next) => {
    try {
        const {access_token} = req.query

        res.status(200).json({
            source: 'clarin.persiscalconsulting.com',
            products: ['clarin.persiscalconsulting.com:free'],
            subscriptionToken: 'eqwfasdfwevgfsdge',
            detail: 'Clarín Basic Access'
        })
    } catch (error) {
        next(error)
    }
})

app.use('*', (_, res) => {
    res.status(404).json({msg: 'Not found'})
})

app.use((err, _, res, __) => {
    res.status(500).json({
        error: true,
        message: err.message,
        stack: err.stack
    })
})

app.listen(PORT, () => console.log('server listening on port:8000'))