"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

type MenuSection = {
  title: string;
  subtitle?: string;
  items: {
    name: string;
    price?: string;
    description?: string;
    details?: string[];
  }[];
};

type VisualAsset = {
  label: string;
  src: string;
  alt: string;
  eager?: boolean;
};

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/reloadeddawlish",
  },
  {
    label: "Facebook",
    href: "https://facebook.com/reloadeddawlish",
  },
] as const;

const lunchSpecial = {
  badge: "Lunchtime Special",
  title: "Meal Deal",
  price: "£10.00",
  description:
    "House Cheese Sauce Beef Burger, Seasoned Fries and a can of drink.",
};

const wingsSpecial = {
  badge: "Midweek Special",
  title: "Wings Wednesday",
  price: "£6",
  description: "Boneless Chicken Wings",
};

const menuSections: MenuSection[] = [
  {
    title: "Steak & ShortRib Burgers",
    subtitle: "4oz Steak & ShortRib Burger, in a brioche bun served with:",
    items: [
      { name: "Ketchup, Mustard & Pickles", price: "£6.50" },
      { name: "House Cheese Sauce", price: "£7.50" },
      {
        name: "Burger Mayo, House Cheese Sauce, Tomato, Lettuce & Pickles",
        price: "£8.00",
      },
      {
        name: "Bacon Jam, House Cheese Sauce, Cheddar Cream Cheese",
        price: "£9.95",
      },
      {
        name: "BBQ Pulled Pork, House Cheese Sauce & Pickles",
        price: "£9.95",
      },
      { name: "Double the Load to 8oz", price: "+£3.00" },
    ],
  },
  {
    title: "Tofu Burger + Crispy Tofu",
    items: [
      {
        name: "Tofu Burger",
        price: "£6.50",
        description: "Burger Mayo, Lettuce, Tomato & Pickles",
      },
      {
        name: "Marinated Crispy Tofu",
        price: "£6.00",
        details: ["Sauce Options:", "Coconut Sriracha", "BBQ", "Hot Korean", "Reloaded Sauce"],
      },
    ],
  },
  {
    title: "Chicken",
    items: [
      {
        name: "Crispy Breaded Chicken Tenders",
        price: "£7.00",
        details: [
          "Sauce Options:",
          "House Cheese Sauce",
          "Coconut Sriracha",
          "BBQ",
          "Hot Korean & Reloaded Sauce",
        ],
      },
      {
        name: "Chicken Burger served in a Brioche Bun",
        price: "£7.95",
        details: [
          "Lettuce, Coleslaw, Hot Korean & ReLoaded Sauce",
          "or",
          "Lettuce, BBQ Sauce & Jalapeños",
        ],
      },
    ],
  },
  {
    title: "ReLoaded House Fries",
    subtitle: "Cut, fried & seasoned with our house blend",
    items: [
      { name: "Regular", price: "£3.50" },
      { name: "Large", price: "£4.50" },
    ],
  },
  {
    title: "Loaded Fries",
    items: [
      { name: "House Cheese Sauce", price: "£5.50" },
      {
        name: "Bacon Jam, House Cheese Sauce, Reloaded Sauce, Pickled Red Onion",
        price: "£7.25",
      },
      {
        name: "BBQ Pulled Pork, House Cheese Sauce, Reloaded Sauce & Jalapeños",
        price: "£7.25",
      },
    ],
  },
  {
    title: "Sides",
    items: [
      {
        name: "Jalapeño Cheese Poppers",
        price: "£5.25",
        description: "House Cheese Sauce, Jalapeños",
      },
      {
        name: "Crispy Calamari",
        price: "£6.00",
        description: "Served with Tartare Sauce",
      },
      {
        name: "Halloumi Bites",
        price: "£7.00",
        description: "Served with Hot Honey",
      },
    ],
  },
];

const heroLogo: VisualAsset = {
  label: "ReLoaded Logo",
  src: "/ReLoaded-Red-on-White-Transp.png",
  alt: "ReLoaded Dawlish logo",
};

const galleryAssets: VisualAsset[] = [
  {
    label: "Tofu Burger",
    src: "/reloaded_crispy_tofu_burger_square.jpg",
    alt: "ReLoaded tofu burger",
    eager: true,
  },
  {
    label: "Loaded Fries",
    src: "/reloaded-loaded-fries-bacon-jam-and-pickled-onion-square.jpg",
    alt: "ReLoaded loaded fries",
  },
  {
    label: "Beef Burger",
    src: "/beef-burger.jpg",
    alt: "ReLoaded beef burger",
  },
];

const mealDealAsset: VisualAsset = {
  label: "Meal Deal",
  src: "/meal-deal.jpg",
  alt: "ReLoaded meal deal burger and fries",
};

const wingsSpecialAsset: VisualAsset = {
  label: "Wings Wednesday",
  src: "/boneless-wings.jpeg",
  alt: "Boneless chicken wings from ReLoaded",
};

const marqueeItems = [
  "RELOADED DAWLISH",
  "LOADED FRIES",
  "STEAK & SHORTRIB BURGERS",
  "CRISPY CHICKEN",
  "CRISPY TOFU",
  "HOUSE FRIES",
  "SERIOUS FLAVOUR",
  "COOKED FRESH",
];

function getCurrentOpenStatus() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const weekday = parts.find((part) => part.type === "weekday")?.value ?? "";
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? "0");
  const totalMinutes = hour * 60 + minute;
  const lunchWindow = totalMinutes >= 12 * 60 && totalMinutes < 15 * 60;
  const eveningWindow = totalMinutes >= 17 * 60 && totalMinutes < 20 * 60;
  const openDay = ["Wed", "Thu", "Fri", "Sat", "Sun"].includes(weekday);

  return openDay && (lunchWindow || eveningWindow);
}

function VisualCard({
  asset,
  frameClassName = "",
  imageClassName = "",
  showLabel = false,
}: {
  asset: VisualAsset;
  frameClassName?: string;
  imageClassName?: string;
  showLabel?: boolean;
}) {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden rounded-[1.75rem] border border-black/10 bg-white ${frameClassName}`}
    >
      {!hasError ? (
        <Image
          src={asset.src}
          alt={asset.alt}
          fill
          priority={asset.eager}
          loading={asset.eager ? "eager" : "lazy"}
          sizes="(min-width: 1024px) 30vw, 90vw"
          className={`object-cover ${imageClassName}`}
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-black p-6 text-center text-lg font-black uppercase tracking-[0.35em] text-white">
          {asset.label}
        </div>
      )}

      {showLabel ? (
        <div className="absolute inset-x-0 bottom-0 bg-white/95 px-4 py-3 text-center text-sm font-black uppercase tracking-[0.3em] text-black backdrop-blur">
          {asset.label}
        </div>
      ) : null}
    </div>
  );
}

function SocialIcon({ label }: { label: string }) {
  if (label === "Instagram") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
    >
      <path d="M14 8h2.5V4.5H14c-2.8 0-4.5 1.8-4.5 4.8V12H7v3.5h2.5V22H13v-6.5h3l.5-3.5H13V9.8c0-1.1.3-1.8 1-1.8Z" />
    </svg>
  );
}

export default function HomePage() {
  const prefersReducedMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const updateStatus = () => setIsOpen(getCurrentOpenStatus());

    updateStatus();
    const interval = window.setInterval(updateStatus, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  const heroAnimation = prefersReducedMotion
    ? undefined
    : {
        y: [0, -10, 0],
        scale: [1, 1.02, 1],
        transition: {
          duration: 5.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut" as const,
        },
      };

  const marqueeAnimation = prefersReducedMotion
    ? undefined
    : {
        x: ["0%", "-50%"],
        transition: {
          duration: 24,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear" as const,
        },
      };

  return (
    <main className="min-h-screen bg-[#d11018] text-black">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 pb-12 pt-5 sm:px-6 lg:px-8">
        <motion.section
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="rounded-[2rem] bg-white p-6 shadow-[0_18px_0_#000] sm:p-8 lg:p-10"
        >
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <motion.div animate={heroAnimation} className="mx-auto w-full max-w-md">
              <div className="relative aspect-[1.1/1] w-full">
                <Image
                  src={heroLogo.src}
                  alt={heroLogo.alt}
                  fill
                  priority
                  loading="eager"
                  sizes="(min-width: 1024px) 38vw, 90vw"
                  className="object-contain"
                />
              </div>
            </motion.div>

            <div className="space-y-5 text-center lg:text-left">
              <p className="text-sm font-black uppercase tracking-[0.45em] text-[#d11018]">
                Dawlish Street Food
              </p>
              <h1 className="text-4xl font-black uppercase leading-[0.88] tracking-tight text-black sm:text-5xl lg:text-7xl">
                Loaded fries,
                <br />
                burgers and
                <br />
                serious flavour.
              </h1>
              <p className="mx-auto max-w-2xl text-base font-medium text-black/75 lg:mx-0 lg:text-lg">
                Fresh-cooked comfort food at 3 Piermont Place, Dawlish. Swing by for
                steak &amp; shortrib burgers, crispy chicken, tofu and stacked loaded fries.
              </p>
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <a
                  href="#menu"
                  className="inline-flex min-h-14 items-center justify-center rounded-full bg-black px-8 py-4 text-center text-sm font-black uppercase tracking-[0.28em] text-white transition hover:-translate-y-0.5 hover:bg-[#1a1a1a] focus:outline-none focus:ring-4 focus:ring-black/20"
                >
                  View The Menu
                </a>
                <a
                  href="#visit"
                  className="inline-flex min-h-14 items-center justify-center rounded-full border-4 border-[#d11018] px-8 py-4 text-center text-sm font-black uppercase tracking-[0.28em] text-[#d11018] transition hover:-translate-y-0.5 hover:bg-[#d11018] hover:text-white focus:outline-none focus:ring-4 focus:ring-[#d11018]/20"
                >
                  Find Us
                </a>
              </div>
              {/* TODO: Add a mobile click-to-call button here once the live ReLoaded phone number is confirmed. */}
            </div>
          </div>
        </motion.section>

        <section className="grid gap-4 md:grid-cols-3">
          {galleryAssets.map((asset) => (
            <div key={asset.label} className="relative aspect-square">
              <VisualCard
                asset={asset}
                showLabel
                frameClassName="h-full w-full border-8 border-white bg-white shadow-[0_14px_0_#000]"
              />
            </div>
          ))}
        </section>

        <section className="overflow-hidden rounded-full border-4 border-black bg-black py-4 text-white shadow-[0_10px_0_#fff]">
          <motion.div
            animate={marqueeAnimation}
            className="flex w-max min-w-full gap-6 whitespace-nowrap pl-6 text-sm font-black uppercase tracking-[0.35em] sm:text-base"
          >
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <span key={`${item}-${index}`} className="flex items-center gap-6">
                <span>{item}</span>
                <span className="text-[#d11018]">•</span>
              </span>
            ))}
          </motion.div>
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          <article className="rounded-[2rem] bg-white p-6 shadow-[0_14px_0_#000]">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div className="space-y-3">
                <span className="inline-flex rounded-full bg-[#d11018] px-4 py-2 text-xs font-black uppercase tracking-[0.3em] text-white">
                  {lunchSpecial.badge}
                </span>
                <h2 className="text-3xl font-black uppercase tracking-tight text-[#d11018]">
                  {lunchSpecial.title}
                </h2>
              </div>
              <p className="shrink-0 text-2xl font-black text-black">{lunchSpecial.price}</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_10rem] sm:items-start">
              <p className="text-base font-medium leading-relaxed text-black">
                {lunchSpecial.description}
              </p>
              <div className="relative aspect-square w-full max-w-[12rem] justify-self-start sm:justify-self-end">
                <VisualCard asset={mealDealAsset} frameClassName="h-full w-full border-4 border-black" />
              </div>
            </div>
          </article>

          <article className="rounded-[2rem] bg-white p-6 shadow-[0_14px_0_#000]">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div className="space-y-3">
                <span className="inline-flex rounded-full bg-[#d11018] px-4 py-2 text-xs font-black uppercase tracking-[0.3em] text-white">
                  {wingsSpecial.badge}
                </span>
                <h2 className="text-3xl font-black uppercase tracking-tight text-[#d11018]">
                  {wingsSpecial.title}
                </h2>
              </div>
              <p className="shrink-0 text-2xl font-black text-black">{wingsSpecial.price}</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_10rem] sm:items-start">
              <p className="text-base font-medium leading-relaxed text-black">
                {wingsSpecial.description}
              </p>
              <div className="relative aspect-square w-full max-w-[12rem] justify-self-start sm:justify-self-end">
                <VisualCard asset={wingsSpecialAsset} frameClassName="h-full w-full border-4 border-black" />
              </div>
            </div>
          </article>
        </section>

        <section id="menu" className="space-y-5">
          <div className="text-center text-white">
            <p className="text-sm font-black uppercase tracking-[0.4em]">Menu</p>
            <h2 className="mt-2 text-4xl font-black uppercase tracking-tight sm:text-5xl">
              Get ReLoaded
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {menuSections.map((section) => (
              <article
                key={section.title}
                className="rounded-[2rem] bg-white p-6 shadow-[0_14px_0_#000]"
              >
                <header className="mb-5">
                  <h3 className="text-2xl font-black uppercase tracking-tight text-[#d11018]">
                    {section.title === "Tofu Burger + Crispy Tofu" ? (
                      <>
                        Tofu Burger
                        <br />
                        + Crispy Tofu
                      </>
                    ) : (
                      section.title
                    )}
                  </h3>
                  {section.subtitle ? (
                    <p className="mt-2 text-sm font-medium leading-relaxed text-black/70">
                      {section.subtitle}
                    </p>
                  ) : null}
                </header>

                <div className="space-y-5">
                  {section.items.map((item) => (
                    <div key={`${section.title}-${item.name}`} className="border-t border-black/10 pt-4 first:border-t-0 first:pt-0">
                      <div className="flex items-start justify-between gap-4">
                        <h4 className="max-w-[75%] text-base font-black uppercase leading-snug text-black">
                          {item.name}
                        </h4>
                        {item.price ? (
                          <p className="shrink-0 text-right text-base font-black text-[#d11018]">
                            {item.price}
                          </p>
                        ) : null}
                      </div>
                      {item.description ? (
                        <p className="mt-2 text-sm font-medium leading-relaxed text-black/70">
                          {item.description}
                        </p>
                      ) : null}
                      {item.details ? (
                        <div className="mt-3 space-y-1 text-sm font-medium leading-relaxed text-black/75">
                          {item.details.map((detail) => {
                            if (detail === "Sauce Options:") {
                              return (
                                <p key={detail} className="font-black uppercase tracking-[0.2em] text-[#d11018]">
                                  {detail}
                                </p>
                              );
                            }

                            if (detail.toLowerCase() === "or") {
                              return (
                                <p key={detail} className="py-1 text-center font-black uppercase tracking-[0.35em] text-black">
                                  OR
                                </p>
                              );
                            }

                            return <p key={detail}>{detail}</p>;
                          })}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="visit" className="grid gap-5 lg:grid-cols-3">
          <article className="rounded-[2rem] bg-white p-6 shadow-[0_14px_0_#000]">
            <div className="mb-4 flex items-center gap-3">
              <Clock className="h-6 w-6 text-[#d11018]" />
              <h3 className="text-2xl font-black uppercase tracking-tight text-black">
                Opening Times
              </h3>
            </div>
            <div
              className={`inline-flex rounded-full border-2 border-black px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-black ${
                isOpen ? "animate-pulse bg-white" : "bg-white"
              }`}
            >
              {isOpen ? "Currently Open" : "Currently Closed"}
            </div>
            <div className="mt-5 space-y-1 text-lg font-black uppercase text-[#d11018]">
              <p>Wed-Sun</p>
              <p>12-3pm</p>
              <p>5-8pm</p>
            </div>
            <p className="mt-4 text-sm font-medium leading-relaxed text-black/70">
              Late opening may flex depending on demand - keep an eye on socials.
            </p>
          </article>

          <article className="rounded-[2rem] bg-white p-6 shadow-[0_14px_0_#000]">
            <div className="mb-4 flex items-center gap-3">
              <MapPin className="h-6 w-6 text-[#d11018]" />
              <h3 className="text-2xl font-black uppercase tracking-tight text-black">
                Location
              </h3>
            </div>
            <div className="space-y-1 text-lg font-black uppercase text-[#d11018]">
              <p>3 Piermont Place</p>
              <p>Dawlish</p>
            </div>
          </article>

          <article className="rounded-[2rem] bg-white p-6 shadow-[0_14px_0_#000]">
            <h3 className="mb-4 text-2xl font-black uppercase tracking-tight text-black">
              Socials
            </h3>
            <div className="flex flex-col gap-3">
              {socialLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between rounded-full bg-black px-5 py-4 text-sm font-black uppercase tracking-[0.28em] text-white transition hover:-translate-y-0.5 hover:bg-[#1a1a1a] focus:outline-none focus:ring-4 focus:ring-black/20"
                >
                  <span>{label}</span>
                  <SocialIcon label={label} />
                </a>
              ))}
            </div>
          </article>
        </section>

        <footer className="rounded-[2rem] bg-black px-6 py-5 text-center text-sm font-medium text-white shadow-[0_10px_0_#fff]">
          <p>© {currentYear} ReLoaded Dawlish</p>
          <p className="mt-2">
            Design by{" "}
            <a
              href="mailto:info@onecre8tive.co.uk"
              className="font-black uppercase tracking-[0.2em] text-[#d11018] underline decoration-transparent transition hover:decoration-current"
            >
              One Cre8tive
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
