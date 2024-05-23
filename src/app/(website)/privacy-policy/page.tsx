import Footer from "@/app/components/Layouts/Footer";
import Navbar from "@/app/components/Layouts/Navbar";
import ScreenWrapper from "@/app/components/Layouts/ScreenWrapper";
import React from "react";

function page() {
  return (
    <main className="flex bg-background flex-col w-[100vw] min-h-[100vh] ">
      <ScreenWrapper>
        <Navbar />
        <div className="shadow-md text-textPrimary rounded-lg p-8">
          <h1 className="text-3xl text-center font-bold mb-10">
            Privacy Policy
          </h1>

          <section className="mb-6">
            <h2 className="text-2xl  font-semibold mb-2">Introduction</h2>
            <p>
              Welcome to Appointify. We value your privacy and strive to protect
              your personal information. This Privacy Policy outlines the types
              of information we collect, how we use it, and the measures we take
              to safeguard it.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              Information Collection
            </h2>
            <p>
              We collect information you provide directly to us, such as when
              you create an account, update your profile, use our services, or
              communicate with us. The types of information we may collect
              include your name, email address, phone number, and any other
              information you choose to provide.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Use of Information</h2>
            <p>
              We use the information we collect to provide, maintain, and
              improve our services, to communicate with you, and to personalize
              your experience. We may also use the information to send you
              technical notices, updates, security alerts, and support messages.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              Sharing of Information
            </h2>
            <p>
              We do not share your personal information with third parties
              except as described in this Privacy Policy. We may share
              information with vendors, consultants, and other service providers
              who need access to such information to carry out work on our
              behalf.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Data Security</h2>
            <p>
              We take reasonable measures to protect your information from
              unauthorized access, use, or disclosure. However, no internet or
              email transmission is ever fully secure or error-free, so please
              take special care in deciding what information you send to us.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Your Choices</h2>
            <p>
              You may update or correct your account information at any time by
              logging into your account. You may also opt out of receiving
              promotional communications from us by following the instructions
              in those communications.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              Changes to this Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. If we make
              significant changes, we will notify you of the changes through our
              services or by other means.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at chambharem1@gmail.com.
            </p>
          </section>
        </div>
      </ScreenWrapper>
      <Footer />
    </main>
  );
}

export default page;
