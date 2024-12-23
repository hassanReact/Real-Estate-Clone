import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Get the user session from Kinde
    const { getUser, isAuthenticated } = await getKindeServerSession();
    const isAuthenticatedUser = await isAuthenticated();
    const user = await getUser();

    // Ensure the user is authenticated and has a valid ID
    if (!isAuthenticatedUser || !user || !user.id) {
      throw new Error("User authentication failed or user ID is missing.");
    }

    // Check if the user exists in the database
    const dbUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    // If the user exists, redirect to the homepage (or dashboard)
    if (dbUser) {
      return NextResponse.redirect('http://localhost:3000');
    }

    // If the user doesn't exist, create a new user
    await prisma.user.create({
      data: {
        id: user.id,
        firsName: user.given_name ?? "",  // Fallback to empty if no given name
        lastName: user.family_name ?? "",  // Fallback to empty if no family name
        email: user.email ?? "",           // Fallback to empty if no email
      },
    });

    // After creating a new user, redirect to the homepage
    return NextResponse.redirect('http://localhost:3000');
  } catch (error) {
    console.error("Error during authentication:", error);
    return new NextResponse("An error occurred", { status: 500 });
  }
}
