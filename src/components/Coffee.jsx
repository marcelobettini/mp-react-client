import React from 'react'


import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { useState } from 'react';



function Coffee() {
    const [preferenceId, setPreferenceId] = useState(null)
    initMercadoPago('APP_USR-e4583866-44b9-4f26-beae-1254e4f2e75d', { locale: 'es-AR' });

    const createPreference = async () => {
        try {
            const res = await fetch('https://mp-node-server.onrender.com/create-preference', {
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
            });
            const parsed = await res.json()
            const { id } = parsed
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
                <Wallet initialization={{ preferenceId: preferenceId }} customization={{ texts: { valueProp: 'smart_option' } }} />

            }
        </main>
    )
}

export default Coffee