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
            Cookie Policy
          </h1>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
            <p>
              {`This Cookie Policy explains how Appointify ("we", "us", or "our")
              uses cookies and similar technologies to recognize you when you
              visit our website at https://appointify.in. It explains what these
              technologies are and why we use them, as well as your rights to
              control our use of them.`}
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">What Are Cookies?</h2>
            <p>
              Cookies are small data files that are placed on your computer or
              mobile device when you visit a website. Cookies are widely used by
              website owners to make their websites work, or to work more
              efficiently, as well as to provide reporting information.
            </p>
            <p>
              {`Cookies set by the website owner (in this case, Appointify) are
              called "first-party cookies". Cookies set by parties other than
              the website owner are called "third-party cookies". Third-party
              cookies enable third-party features or functionality to be
              provided on or through the website (e.g., like advertising,
              interactive content, and analytics). The parties that set these
              third-party cookies can recognize your computer both when it
              visits the website in question and also when it visits certain
              other websites.`}
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              Why Do We Use Cookies?
            </h2>
            <p>
              {`We use first-party and third-party cookies for several reasons.
              Some cookies are required for technical reasons for our website to
              operate, and we refer to these as "essential" or "strictly
              necessary" cookies. Other cookies also enable us to track and
              target the interests of our users to enhance the experience on our
              website. Third parties serve cookies through our website for
              advertising, analytics, and other purposes. This is described in
              more detail below.`}
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              Types of Cookies We Use
            </h2>
            <p>
              The specific types of first- and third-party cookies served
              through our website and the purposes they perform are described
              below:
            </p>
            <ul className="list-disc list-inside">
              <li>
                <strong>Essential Cookies:</strong> These cookies are strictly
                necessary to provide you with services available through our
                website and to use some of its features, such as access to
                secure areas.
              </li>
              <li>
                <strong>Performance and Functionality Cookies:</strong> These
                cookies are used to enhance the performance and functionality of
                our website but are non-essential to their use. However, without
                these cookies, certain functionality may become unavailable.
              </li>
              <li>
                <strong>Analytics and Customization Cookies:</strong> These
                cookies collect information that is used either in aggregate
                form to help us understand how our website is being used or how
                effective our marketing campaigns are, or to help us customize
                our website for you.
              </li>
              <li>
                <strong>Advertising Cookies:</strong> These cookies are used to
                make advertising messages more relevant to you. They perform
                functions like preventing the same ad from continuously
                reappearing, ensuring that ads are properly displayed for
                advertisers, and in some cases selecting advertisements that are
                based on your interests.
              </li>
              <li>
                <strong>Social Networking Cookies:</strong> These cookies are
                used to enable you to share pages and content that you find
                interesting on our website through third-party social networking
                and other websites. These cookies may also be used for
                advertising purposes.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              How Can I Control Cookies?
            </h2>
            <p>
              You have the right to decide whether to accept or reject cookies.
              You can exercise your cookie preferences by clicking on the
              appropriate opt-out links provided below.
            </p>
            <p>
              {`You can set or amend your web browser controls to accept or refuse
              cookies. If you choose to reject cookies, you may still use our
              website though your access to some functionality and areas of our
              website may be restricted. As the means by which you can refuse
              cookies through your web browser controls vary from browser to
              browser, you should visit your browser's help menu for more
              information.`}
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              Updates to This Cookie Policy
            </h2>
            <p>
              We may update this Cookie Policy from time to time to reflect
              changes to the cookies we use or for other operational, legal, or
              regulatory reasons. Please revisit this Cookie Policy regularly to
              stay informed about our use of cookies and related technologies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
            <p>
              If you have any questions about our use of cookies or other
              technologies, please contact us at chambharem1@gmail.com.
            </p>
          </section>
        </div>
      </ScreenWrapper>
      <Footer />
    </main>
  );
}

export default page;
