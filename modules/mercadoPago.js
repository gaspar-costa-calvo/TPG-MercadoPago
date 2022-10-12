// Step 7
const { preferences } = require("mercadopago");
const mercadoPago = require("mercadopago")
const credential =  process.env.MP || "TEST-1964351841160851-101118-7129cb95948d595e3c0d58d023e4b039-243584127";
let server = process.env.SERVER || "http://localhost:3030"
const feedback = `${server}/checkout/feedback`

const mp  = async (items, cuotes, shipping) => {
    try {
        // Magic
        mercadoPago.configure({
            access_token: credential,
        })
        let config = {
            items: items,
            back_urls: {
                success: feedback,
                failure: feedback,
                pending: feedback
            },
            payment_methods: {
                installments: cuotes,
            },
            auto_return: "approved",
            shipments: {
                cost: shipping,
                mode: "not_specified"
            }
        } 

        let preference = await mercadoPago.preferences.create(config)

        return preference

    } catch (error) {
        throw new Error(error)
    }
}
module.exports = mp
