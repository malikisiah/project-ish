//Syncs the database to the Stripe dashboard
import stripe from "./stripe";
import { db } from "~/server/db";

const syncStripeProducts = async () => {
  const { data } = await stripe.products.list();
  console.log(data);

  for (const item of data) {
    //lookup price
    const { unit_amount } = await stripe.prices.retrieve(
      item.default_price as string,
    );
    const product = await db.product.findUnique({
      where: {
        priceId: item.id,
      },
    });

    if (product) {
      await db.product.update({
        where: {
          priceId: item.id,
        },
        data: {
          name: item.name,
          priceInCents: unit_amount!,
        },
      });
    } else {
      await db.product.create({
        data: {
          name: item.name,
          priceInCents: unit_amount!,
          digital: false,
          priceId: item.default_price as string,
          image: "",
        },
      });
    }
  }
};

await syncStripeProducts();
