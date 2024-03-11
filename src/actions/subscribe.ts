"use server";
import nodemailer from "nodemailer";

// Replace with your actual email configuration
const transporter = nodemailer.createTransport({
  host: process.env.USER_HOST,
  port: 465, // or 465 for secure connection
  secure: true, // or true for secure connection
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const subscibe = async (email: string) => {
  try {
    // Basic validation (replace with more robust validation if needed)
    if (!email || !email.trim()) {
      throw new Error("Email is required");
    }

    // Generate a random verification code
    const verificationCode = Math.floor(Math.random() * 100000)
      .toString()
      .padStart(6, "0");

    // Create the email content
    const emailContent = `<div>
  <h1>Welcome to Briefology! 🚀</h1>
  <p>Verify your email to get started.</p>
  <!-- Placeholders for dynamic content -->
  <p>Welcome aboard the Briefology journey! 🌟 We're thrilled to have you join our community of curious minds eager to dive into the world of brief knowledge and endless possibilities.</p>
  <p>To ensure you don't miss out on any updates, exclusive content, and exciting opportunities, please take a moment to verify your email address</p>
  <p style="font-size:15px; font-weight:800">Verification Code</p>
  <p style="font-size:15px; font-weight:800">${verificationCode}</p>
</div>`;

    // Send the verification emailß
    await transporter.sendMail({
      from: `Briefology" ${process.env.USER_EMAIL}`,
      to: email,
      subject: "Email Verification",
      html: emailContent, // Use plain text for compatibility
    });

    return {
      message: "Verification email sent successfully.",
      code: verificationCode,
    };
  } catch (error) {
    console.error(error);
    return { message: "Error sending verification email." };
  }
};

export default subscibe;
