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
            Terms and Conditions
          </h1>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
            <p>
              Welcome to Appointify. These terms and conditions outline the
              rules and regulations for the use of our appointment management
              solution, a B2B SaaS platform. By accessing or using our services,
              you agree to comply with and be bound by these terms. If you do
              not agree with any part of these terms, you must not use our
              services.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Account Terms</h2>
            <p>
              To use our services, you must create an account. You are
              responsible for maintaining the confidentiality of your account
              information and for all activities that occur under your account.
              You agree to provide accurate and complete information and to
              update it as necessary.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Use of Services</h2>
            <p>
              You agree to use our services only for lawful purposes and in
              accordance with these terms. You must not use our services to
              engage in any illegal or harmful activities, including but not
              limited to spamming, hacking, or distributing malware.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              Subscription and Payment
            </h2>
            <p>
              Our services are offered on a subscription basis. You agree to pay
              all fees associated with your subscription plan. We reserve the
              right to change our subscription plans and pricing at any time.
              Any changes to pricing will be communicated to you in advance.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              Cancellation and Termination
            </h2>
            <p>
              You may cancel your subscription at any time. Upon cancellation,
              your account will remain active until the end of the current
              billing period. We reserve the right to terminate or suspend your
              account for any reason, including but not limited to a violation
              of these terms.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              Intellectual Property
            </h2>
            <p>
              All content and materials included in our services, including but
              not limited to text, graphics, logos, and software, are the
              property of Appointify or its licensors and are protected by
              intellectual property laws. You may not use, reproduce, or
              distribute any content from our services without our prior written
              consent.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              Disclaimer of Warranties
            </h2>
            <p>
              {`Our services are provided "as is" and "as available" without any
              warranties of any kind, either express or implied. We do not
              warrant that our services will be uninterrupted or error-free, and
              we are not responsible for any issues that may arise from your use
              of our services.`}
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              Limitation of Liability
            </h2>
            <p>
              In no event shall Appointify be liable for any indirect,
              incidental, special, consequential, or punitive damages, including
              but not limited to loss of profits, data, or use, arising out of
              or in connection with your use of our services.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Governing Law</h2>
            <p>
              These terms and conditions shall be governed by and construed in
              accordance with the laws of India. Any disputes arising under or
              in connection with these terms shall be subject to the exclusive
              jurisdiction of the courts of India.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
            <p>
              If you have any questions about these Terms and Conditions, please
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
