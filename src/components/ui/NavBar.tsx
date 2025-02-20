"use client";

import Link from "next/link";
import { useCartStore } from "~/store/cartStore";
import Image from "next/image";

export default function NavBar() {
  const items = useCartStore((state) => state.items);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  return (
    <>
      <div className="navbar bg-accent text-accent-content">
        <div className="navbar-start">
          {/* Mobile */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content menu-sm z-50 mt-3 w-52 gap-2 rounded-box bg-base-100 p-2 text-black shadow"
            >
              <li>
                <Link href={"/music"}>Music</Link>
              </li>
              <li>
                <Link href={"/media"}>Media</Link>
              </li>
              <li>
                <Link href={"/merch"}>Merch</Link>
              </li>
            </ul>
          </div>

          <Link href={"/"} className="ml-20 size-10">
            <Image alt="" src={"/logo.svg"} width={500} height={500} />
          </Link>
        </div>

        {/* Desktop */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-10 px-1 text-2xl">
            <li>
              <Link href={"/music"} className="focus:text-white">
                Music{" "}
              </Link>
            </li>
            <li>
              <Link href={"/media"} className="focus:text-white">
                Media
              </Link>
            </li>
            <li>
              <Link href={"/merch"} className="focus:text-white">
                Merch
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {/* Shopping Cart */}
          <Link href={"/checkout"} className="btn btn-circle btn-ghost mr-20">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {itemCount > 0 ? (
                <span className="badge indicator-item badge-sm">
                  {itemCount}
                </span>
              ) : null}
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
