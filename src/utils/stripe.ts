import Stripe from "stripe";
import { env } from "~/env";

const stripe = new Stripe(env.STRIPE_KEY);

export default stripe;
