import Link from "next/link";
import { useRouter } from "next/router";
import { UserContextProvider } from "../lib/user";
import classNames from "classnames";

import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const items = [
    {
      text: "Gallery",
      href: "/",
    },
    {
      text: "Upload",
      href: "/upload",
    },
  ];

  return (
    <UserContextProvider>
      <div className="flex flex-col bg-gray-200 min-h-screen">
        <nav className="bg-blue-500 p-4 flex justify-between">
          <Link href="/">
            <a className="text-white uppercase">Catstagram</a>
          </Link>
          <div>
            {items.map((item) => {
              const classes = classNames({
                "text-white": true,
                "ml-4": true,
                "font-bold": router.pathname === item.href,
              });
              return (
                <Link key={item.href} href={item.href}>
                  <a className={classes}>{item.text}</a>
                </Link>
              );
            })}
          </div>
        </nav>
        <Component {...pageProps} />
      </div>
    </UserContextProvider>
  );
}

export default MyApp;
