const redis = require('redis')

const client = redis.createClient(6379, 'localhost')

client.set('name', 'jerry')
client.get('name', (err, data) => {
    console.log('redis get', data)
})
