import type { Stripe } from "stripe";
import type { CheckoutItem } from "~/store/cartStore";

interface EmailTemplateProps {
  customerDetails: Stripe.Checkout.Session.CustomerDetails;

  products: CheckoutItem[];
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  customerDetails,
  products,
}) => (
  <>
    <div> {customerDetails.name} has placed an order!</div>

    <br />

    {products.map((item, idx) => (
      <div key={idx}>
        {item.name} - {item.size} <span> x {item.quantity}</span>
      </div>
    ))}

    <br />
    <br />

    {customerDetails.address && (
      <div>
        <p>
          {customerDetails.address.line1}
          <br />
          {customerDetails.address.line2}
        </p>
        <p>{`${customerDetails.address.city}, ${customerDetails.address.state} ${customerDetails.address.postal_code}`}</p>
      </div>
    )}
  </>
);
