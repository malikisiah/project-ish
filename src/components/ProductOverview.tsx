"use client";

import type { Product } from "@prisma/client";
import { ArrowDownOnSquareIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useCartStore } from "~/store/cartStore";
import { toast } from "sonner";

export default function ProductOverview({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addItem);
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
                  Digital Download
                  <ArrowDownOnSquareIcon className="size-5" />
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
          <div className="mt-10">
            <button
              onClick={() => {
                addToCart(product);
                toast("Added to Bag");
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
