const client = require('client');

const UsersSchema = new client.Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    contacs: [
        {
            telephone: String,
            email: String,
            whats: String
        }
    ],
    balance: Decimal128
});