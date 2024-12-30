"use server"

import prisma from "../prisma";

export const saveSubscription = async({
    paymentId,
    planId,
    userId
}: {
    paymentId: string;
    planId: number;
    userId: string;
}) => {
    try {
        await prisma.subscriptions.create({
            data: {
                paymentId: paymentId,
                user: { 
                    connect: {
                        id: userId
                    },
                },
                plan: {
                    connect: {
                        id: planId
                    }
                }
            }
        });

        return {
            message: "Subscription Saved Successfully"
        };
    } catch (e: unknown) {
        // Check if the error is an instance of Error
        if (e instanceof Error) {
            return {
                message: e.message
            };
        }
        // Fallback message if error is not of type Error
        return {
            message: "An unknown error occurred"
        };
    }
};
