"use client";

import { useState } from "react";
import { CheckIcon } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const tiers = [
  {
    name: "Hobby",
    id: "hobby",
    priceMonthly: "$15",
    priceYearly: "$150",
    description: "All the basics for starting a new business",
    features: ["5 videos per month", "Basic editing tools", "720p video quality"],
    stripePriceIdMonthly: "price_hobby_monthly123",
    stripePriceIdYearly: "price_hobby_yearly123",
  },
  {
    name: "Pro",
    id: "pro",
    priceMonthly: "$50",
    priceYearly: "$500",
    description: "Everything in Hobby plus advanced features",
    features: [
      "Unlimited videos",
      "Advanced editing tools",
      "1080p video quality",
      "Priority support",
    ],
    stripePriceIdMonthly: "price_pro_monthly456",
    stripePriceIdYearly: "price_pro_yearly456",
  },
];

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );

  const handleSubscription = async (stripePriceId: string) => {
    setLoading(stripePriceId);
    const stripeCheckoutUrl = "https://buy.stripe.com/test_8wMbJq4te2WAgWQcMN";
    window.open(stripeCheckoutUrl, "_blank");
    setLoading(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Pricing Plans</h1>
          <div className="mt-4 flex items-center">
            <span
              className={`cursor-pointer px-3 py-2 rounded-md ${
                billingCycle === "monthly" ? "bg-blue-500 text-white" : "text-gray-700"
              }`}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly
            </span>
            <span
              className={`cursor-pointer px-3 py-2 rounded-md ml-2 ${
                billingCycle === "yearly" ? "bg-blue-500 text-white" : "text-gray-700"
              }`}
              onClick={() => setBillingCycle("yearly")}
            >
              Yearly
            </span>
          </div>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid md:grid-cols-2 gap-6">
              {tiers.map((tier) => (
                <Card key={tier.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle>{tier.name}</CardTitle>
                    <CardDescription>{tier.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-4xl font-extrabold">
                      {billingCycle === "monthly"
                        ? tier.priceMonthly
                        : tier.priceYearly}
                    </p>
                    <p className="text-gray-500">
                      per {billingCycle === "monthly" ? "month" : "year"}
                    </p>
                    <ul className="mt-6 space-y-4">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <div className="flex-shrink-0">
                            <CheckIcon className="h-6 w-6 text-green-500" />
                          </div>
                          <p className="ml-3 text-base text-gray-700">
                            {feature}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={() =>
                        handleSubscription(
                          billingCycle === "monthly"
                            ? tier.stripePriceIdMonthly
                            : tier.stripePriceIdYearly
                        )
                      }
                      disabled={loading === tier.stripePriceIdMonthly || loading === tier.stripePriceIdYearly}
                    >
                      {loading === tier.stripePriceIdMonthly ||
                      loading === tier.stripePriceIdYearly
                        ? "Processing..."
                        : `Subscribe to ${tier.name}`}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
