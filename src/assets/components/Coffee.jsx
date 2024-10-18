import React from 'react'


import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { useState } from 'react';



function Coffee() {
    const [preferenceId, setPreferenceId] = useState(null)
    initMercadoPago(process.env.MP_PUBLIC_KEY, { locale: 'es-AR' });

    const createPreference = async () => {
        try {
            const res = await fetch('http://127.0.0.1:3000/create-preference', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: 'Cafecito para el profe',
                    quantity: 1,
                    unit_price: 1800
                }
                )
            })
            console.log(res)
            const { id } = res.data
            return id
        } catch (err) {
            console.error(err.message)

        }
    }

    const handleBuyingProcess = async () => {
        const id = await createPreference()
        if (id) setPreferenceId(id)
    }
    return (
        <main>
            <h3>Regalame un ☕️</h3>
            <button onClick={handleBuyingProcess}>Poniendo estaba la 🪿</button>
            {preferenceId &&
                <Wallet initialization={{ preferenceId: '<PREFERENCE_ID>' }} customization={{ texts: { valueProp: 'smart_option' } }} />

            }
        </main>
    )
}

export default Coffee