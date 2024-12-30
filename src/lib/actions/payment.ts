"use server"

import Stripe from 'stripe'

export const createPaymentIntent = async (amount: number, description: string) => {
    const stripe = new Stripe(process.env.STRIPE_SECERET_KEY!, {
        typescript: true,
        apiVersion: '2024-12-18.acacia',
    });

    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        description,
        currency: "USD",
    });
    return { ...paymentIntent };
}