import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title: "NutroChart",
  description: "Empowering Nutrologists for Enhanced Patient Care",
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <body>
      <div className="flex flex-col min-h-screen">
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>

          <footer className="footer mt-auto">
            {/* Add your footer content here */}
            <p>
              &copy; {new Date().getFullYear()} NutroChart. All rights reserved.
            </p>
          </footer>
        </Provider>
      </div>
    </body>
  </html>
);

export default RootLayout;
