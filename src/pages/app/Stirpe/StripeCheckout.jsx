import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useMemo, useState } from "react";

export default function StripeCheckout({
  clientSecret,
  stripeAccountId,
  dispensaryId,
  products,
  shippingAddress,
  paymentIntentId,
  phoneNumber,
  completeAddress
}) {
  const [stripePromise, setStripePromise] = useState(null);
  const publishableKey = import.meta.env.VITE_APP_STRIPE_API_KEY;
  useEffect(() => {
    if (!clientSecret || !stripeAccountId || !publishableKey) return;

    let cancelled = false;

    (async () => {
      try {
        const stripe = await loadStripe(publishableKey, {
          stripeAccount: stripeAccountId,
        });
        if (!cancelled) setStripePromise(stripe);
      } catch (e) {
        console.error(e);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [clientSecret, stripeAccountId]);

  const elementsOptions = useMemo(
    () => ({
      clientSecret,
      appearance: { theme: "stripe" },
    }),
    [clientSecret]
  );

  if (!clientSecret) return <div>Missing clientSecret</div>;
  if (!stripeAccountId) return <div>Missing stripeAccountId</div>;
  if (!publishableKey) return <div>Missing publishableKey (.env)</div>;
  if (!stripePromise) return <div>Loading payment form…</div>;

  return (
    <Elements stripe={stripePromise} options={elementsOptions}>
      <CheckoutForm
      completeAddress={completeAddress}
        dispensaryId={dispensaryId}
        products={products}
        stripeAccountId={stripeAccountId}
        clientSecret={clientSecret}
        shippingAddress={shippingAddress}
        paymentIntentId={paymentIntentId}
        phoneNumber={phoneNumber}
      />
    </Elements>
  );
}
