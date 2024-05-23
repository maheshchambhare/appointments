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
          <h1 className="text-3xl text-center font-bold mb-10">
            Refund and Cancellation Policy
          </h1>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
            <p>
              This Refund and Cancellation Policy outlines the policies and
              procedures regarding the refund and cancellation of subscriptions
              to our appointment management solution, Appointify. By subscribing
              to our services, you agree to the terms set forth in this policy.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">No Refund Policy</h2>
            <p>
              All subscription fees for our services are non-refundable. We do
              not provide refunds or credits for any partial subscription
              periods or unused services, regardless of the circumstances.
            </p>
            <p>
              Once a payment has been made, it is final and non-refundable. This
              includes, but is not limited to, situations where you choose to
              cancel your subscription before the end of the subscription term
              or where the services are unused.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Cancellation Policy</h2>
            <p>
              You may cancel your subscription at any time. If you choose to
              cancel your subscription, your account will remain active until
              the end of the current billing period. After the billing period
              ends, you will not be charged for the subsequent period, and your
              access to the services will be terminated.
            </p>
            <p>
              To cancel your subscription, please follow the instructions
              provided in your account settings or contact our support team at
              chambharem1@gmail.com.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              Changes to This Policy
            </h2>
            <p>
              We may update this Refund and Cancellation Policy from time to
              time. If we make significant changes, we will notify you of the
              changes through our services or by other means. Your continued use
              of our services after the changes take effect constitutes your
              acceptance of the revised policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
            <p>
              If you have any questions about this Refund and Cancellation
              Policy, please contact us at chambharem1@gmail.com.
            </p>
          </section>
        </div>
      </ScreenWrapper>
      <Footer />
    </main>
  );
}

export default page;
