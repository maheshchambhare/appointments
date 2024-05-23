import Footer from "@/app/components/Layouts/Footer";
import Navbar from "@/app/components/Layouts/Navbar";
import ScreenWrapper from "@/app/components/Layouts/ScreenWrapper";
import React from "react";

function page() {
  return (
    <main className="flex bg-background flex-col w-[100vw] min-h-[100vh]">
      <ScreenWrapper>
        <Navbar />
        <div className="shadow-md text-textPrimary rounded-lg p-8">
          <h1 className="text-3xl text-center font-bold mb-10">Contact Us</h1>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Registered Name</h2>
            <p>Appointify</p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Operating Address</h2>
            <p>F-2-4,Vajpayee Awas,Surat,394210</p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Support Contact</h2>
            <p>Email : chambharem1@gmail.com</p>
            <p>Phone : +91 8767431997</p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Hours of Operation</h2>
            <p>Monday - Saturday: 8:00 AM - 8:00 PM</p>
          </section>
        </div>
      </ScreenWrapper>
      <Footer />
    </main>
  );
}

export default page;
