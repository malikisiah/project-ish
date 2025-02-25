"use client";

import Image from "next/image";
import { useState } from "react";
import EmbeddedCheckoutModal from "./EmbeddedCheckoutModal";
import { useCartStore } from "~/store/cartStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Select } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function ShoppingCart() {
  const [open, setOpen] = useState(false);
  const { items, removeItem, updateItemQuantity } = useCartStore();

  const router = useRouter();

  return (
    <div className="min-h-screen">
      <main>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
          <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Shopping Bag
          </h1>

          <div className="mt-12">
            <section aria-labelledby="cart-heading">
              <ul
                role="list"
                className="divide-y divide-gray-200 border-b border-t border-gray-200"
              >
                {items.map((product, idx) => (
                  <li key={idx} className="flex py-6">
                    <div className="shrink-0">
                      <Image
                        width={200}
                        height={200}
                        alt={""}
                        src={product.image}
                        className="size-24 rounded-md object-cover sm:size-32"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="text-sm">
                            <div className="font-medium text-gray-700 hover:text-gray-800">
                              {product.name}
                            </div>
                          </h4>
                          <p className="ml-4 text-sm font-medium text-gray-900">
                            {`$${(product.priceInCents / 100).toFixed(2)}`}
                          </p>
                        </div>
                        <div className="mt-2 flex justify-between">
                          <p className="mt-1 text-sm text-gray-500">
                            {product.size
                              ? product.size?.charAt(0).toUpperCase() +
                                product.size?.slice(1)
                              : ""}
                          </p>
                          <Select
                            defaultValue={product.quantity}
                            className={"bg-transparent"}
                            disabled={product.digital}
                            onChange={(e) =>
                              updateItemQuantity(
                                product,
                                Number(e.target.value),
                              )
                            }
                          >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                          </Select>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-1 items-end justify-end">
                        <div className="ml-4 flex items-center gap-3"></div>
                      </div>

                      <div className="mt-4 flex flex-1 items-end justify-end">
                        <div className="ml-4">
                          <button
                            onClick={() => removeItem(product)}
                            className="text-primary-600 text-sm font-medium hover:text-neutral-500"
                          >
                            <span className="flex items-center gap-1">
                              Remove <TrashIcon className="size-5" />
                            </span>
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
                      {`$${(
                        items.reduce(
                          (total, item) =>
                            total + item.priceInCents * item.quantity,
                          0,
                        ) / 100
                      ).toFixed(2)}`}
                    </dd>
                  </div>
                </dl>
                <p className="mt-1 text-sm text-gray-500">
                  Shipping and taxes will be calculated at checkout.
                </p>
              </div>

              <div className="mt-10">
                <button
                  onClick={() => {
                    if (items.length === 0) {
                      toast.error("No items in bag!");
                    } else {
                      setOpen(true);
                    }
                  }}
                  className="focus:ring-primary-500 w-full rounded-md border border-transparent bg-primary px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Checkout
                </button>
              </div>

              <div className="mt-6 text-center text-sm text-gray-500">
                <p>
                  or{" "}
                  <button
                    onClick={() => router.back()}
                    className="text-primary-600 hover:text-primary-500 font-medium"
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <EmbeddedCheckoutModal
        checkoutItems={items}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}
