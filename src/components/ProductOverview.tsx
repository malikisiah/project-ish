"use client";

import type { Product } from "@prisma/client";
import {
  ArrowDownOnSquareIcon,
  ShoppingBagIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import { useCartStore } from "~/store/cartStore";
import { toast } from "sonner";
import { Radio, RadioGroup } from "@headlessui/react";
import { useState } from "react";

export default function ProductOverview({ product }: { product: Product }) {
  const { items, addItem, updateItemQuantity } = useCartStore();
  const [size, setSelectedSize] = useState<"small" | "medium" | "large">(
    "medium",
  );
  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        {/* Product details */}
        <div className="lg:max-w-lg lg:self-end">
          <div className="mt-4">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {product.name.toLocaleUpperCase()}
            </h1>
          </div>

          <section aria-labelledby="information-heading" className="mt-4">
            <div className="flex items-center">
              <p className="text-lg text-gray-900 sm:text-xl">
                {`$${Math.trunc(product.priceInCents / 100)}`}
              </p>

              <div className="ml-4 border-l border-gray-300 pl-4">
                <p className="ml-1 flex items-center gap-1 align-middle text-sm text-gray-500">
                  {product.type === "music" || product.type === "media" ? (
                    <span className="flex items-center gap-2">
                      <ArrowDownOnSquareIcon className="size-5" />
                      Digital Download
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <ShoppingBagIcon className="size-5" />
                      Merch Item
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-6">
              <p className="text-base text-gray-500">{product.description}</p>
            </div>
          </section>
        </div>

        {/* Product image */}
        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
          <Image
            width={1000}
            height={1000}
            alt={""}
            src={product.image}
            className="aspect-square w-full rounded-lg object-cover"
          />
        </div>

        <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
          {/* Size Picker */}
          {product.type === "merch" ? (
            <div className="mt-8">
              <fieldset aria-label="Choose a size" className="mt-2">
                <RadioGroup
                  defaultValue={size}
                  onChange={setSelectedSize}
                  className="grid grid-cols-3 gap-3 text-center sm:grid-cols-3"
                >
                  <Radio
                    value="small"
                    className={
                      "flex cursor-pointer items-center justify-center rounded-md border border-gray-200 bg-white px-3 py-3 text-sm font-medium uppercase text-gray-900 hover:bg-gray-100 focus:outline-none data-[checked]:border-transparent data-[checked]:bg-primary data-[checked]:text-white data-[focus]:ring-2 data-[focus]:ring-primary data-[focus]:ring-offset-2 data-[checked]:hover:bg-secondary sm:flex-1"
                    }
                  >
                    S
                  </Radio>
                  <Radio
                    value="medium"
                    className={
                      "flex cursor-pointer items-center justify-center rounded-md border border-gray-200 bg-white px-3 py-3 text-sm font-medium uppercase text-gray-900 hover:bg-gray-100 focus:outline-none data-[checked]:border-transparent data-[checked]:bg-primary data-[checked]:text-white data-[focus]:ring-2 data-[focus]:ring-primary data-[focus]:ring-offset-2 data-[checked]:hover:bg-secondary sm:flex-1"
                    }
                  >
                    M
                  </Radio>
                  <Radio
                    value="large"
                    className={
                      "flex cursor-pointer items-center justify-center rounded-md border border-gray-200 bg-white px-3 py-3 text-sm font-medium uppercase text-gray-900 hover:bg-gray-100 focus:outline-none data-[checked]:border-transparent data-[checked]:bg-primary data-[checked]:text-white data-[focus]:ring-2 data-[focus]:ring-primary data-[focus]:ring-offset-2 data-[checked]:hover:bg-secondary sm:flex-1"
                    }
                  >
                    L
                  </Radio>
                </RadioGroup>
              </fieldset>
            </div>
          ) : null}

          <div className="mt-10">
            <button
              onClick={() => {
                const checkoutItem = {
                  ...product,
                  quantity: 1,
                  size: product.digital ? undefined : size,
                };

                const exists = items.find(
                  (item) =>
                    checkoutItem.uuid === item.uuid &&
                    checkoutItem.size === item.size,
                );

                if (exists) {
                  if (!product.digital) {
                    updateItemQuantity(exists, exists.quantity + 1);
                    toast("Added to Bag");
                  } else {
                    toast.error("Item already in bag");
                  }
                } else {
                  addItem(checkoutItem);
                  toast("Added to Bag");
                }
              }}
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary-content focus:ring-offset-2 focus:ring-offset-gray-50"
            >
              Add to bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
