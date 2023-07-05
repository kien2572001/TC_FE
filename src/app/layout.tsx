"use client";
import { useEffect, useLayoutEffect } from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";
import Header from "../common/Header";
import Footer from "../common/Footer";

import { Provider } from "react-redux";
import store from "../store";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const publicRoutes = ["/register", "/login", "/home", "/restaurant/[id]"];
  const routesWithoutHeaderFooter = [
    "/login",
    "/register",
    "/restaurant/register",
    "/restaurant/add-food",
  ];

  const adminRoutes = ["/admin"];

  useLayoutEffect(() => {
    if (
      !localStorage.getItem("refreshToken") &&
      !publicRoutes.includes(pathname)
    ) {
      router.push("/login");
    }
  }, []);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          {!routesWithoutHeaderFooter.includes(pathname) ? (
            <>
              <Header />
              {children}
              <Footer />
            </>
          ) : (
            children
          )}
        </Provider>
      </body>
    </html>
  );
}
