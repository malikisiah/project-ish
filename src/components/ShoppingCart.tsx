"use client";

import { CheckIcon, ClockIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useState } from "react";
import EmbeddedCheckoutModal from "./EmbeddedCheckoutModal";

const products = [
  {
    id: 1,
    name: "Artwork Tee",
    href: "#",
    price: "$32.00",
    color: "Mint",
    size: "Medium",
    inStock: true,
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/checkout-page-03-product-04.jpg",
    imageAlt: "Front of mint cotton t-shirt with wavey lines pattern.",
  },
  {
    id: 2,
    name: "Basic Tee",
    href: "#",
    price: "$32.00",
    color: "Charcoal",
    inStock: false,
    leadTime: "7-8 years",
    size: "Large",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-01-product-02.jpg",
    imageAlt: "Front of charcoal cotton t-shirt.",
  },
  {
    id: 3,
    name: "Basic Tee",
    href: "#",
    price: "$32.00",
    color: "Sienna",
    inStock: true,
    size: "Large",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-01-product-01.jpg",
    imageAlt: "Front of sienna cotton t-shirt.",
  },
];

export default function ShoppingCart() {
  const [open, setOpen] = useState(false);
  return (
    <div className="">
      <main>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
          <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Shopping Cart
          </h1>

          <form className="mt-12">
            <section aria-labelledby="cart-heading">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>

              <ul
                role="list"
                className="divide-y divide-gray-200 border-b border-t border-gray-200"
              >
                {products.map((product) => (
                  <li key={product.id} className="flex py-6">
                    <div className="shrink-0">
                      <Image
                        width={500}
                        height={500}
                        alt={product.imageAlt}
                        src={product.imageSrc}
                        className="size-24 rounded-md object-cover sm:size-32"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="text-sm">
                            <a
                              href={product.href}
                              className="font-medium text-gray-700 hover:text-gray-800"
                            >
                              {product.name}
                            </a>
                          </h4>
                          <p className="ml-4 text-sm font-medium text-gray-900">
                            {product.price}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {product.color}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {product.size}
                        </p>
                      </div>

                      <div className="mt-4 flex flex-1 items-end justify-between">
                        <p className="flex items-center space-x-2 text-sm text-gray-700">
                          {product.inStock ? (
                            <CheckIcon
                              aria-hidden="true"
                              className="size-5 shrink-0 text-green-500"
                            />
                          ) : (
                            <ClockIcon
                              aria-hidden="true"
                              className="size-5 shrink-0 text-gray-300"
                            />
                          )}

                          <span>
                            {product.inStock
                              ? "In stock"
                              : `Will ship in ${product.leadTime}`}
                          </span>
                        </p>
                        <div className="ml-4">
                          <button
                            type="button"
                            className="text-primary-600 text-sm font-medium hover:text-neutral-500"
                          >
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Order summary */}
            <section aria-labelledby="summary-heading" className="mt-10">
              <h2 id="summary-heading" className="sr-only">
                Order summary
              </h2>

              <div>
                <dl className="space-y-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-base font-medium text-gray-900">
                      Subtotal
                    </dt>
                    <dd className="ml-4 text-base font-medium text-gray-900">
                      $96.00
                    </dd>
                  </div>
                </dl>
                <p className="mt-1 text-sm text-gray-500">
                  Shipping and taxes will be calculated at checkout.
                </p>
              </div>

              <div className="mt-10">
                <button
                  onClick={() => setOpen(true)}
                  className="focus:ring-primary-500 w-full rounded-md border border-transparent bg-primary px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Checkout
                </button>
              </div>

              <div className="mt-6 text-center text-sm text-gray-500">
                <p>
                  or
                  <a
                    href="#"
                    className="text-primary-600 hover:text-primary-500 font-medium"
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </a>
                </p>
              </div>
            </section>
          </form>
        </div>
      </main>
      <EmbeddedCheckoutModal open={open} setOpen={setOpen} />
    </div>
  );
}
