"use client";
import Image from "next/image";
import type { ReactNode, SVGProps } from "react";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Clock, MapPin, Star } from "lucide-react";

type MenuItem = {
  name: string;
  price: string;
  desc?: string;
  details?: string[];
};

type MenuSection = {
  title: string;
  subtitle?: string;
  items: MenuItem[];
};

type VisualAsset = {
  alt: string;
  label: string;
  src: string;
  eager?: boolean;
};

const lunchSpecial: MenuItem = {
  name: "Meal Deal",
  price: "£10.00",
  desc: "House Cheese Sauce Beef Burger, Seasoned Fries and a can of drink.",
};

const menuSections: MenuSection[] = [
  {
    title: "Steak & ShortRib Burgers",
    subtitle: "4oz Steak & ShortRib Burger, in a brioche bun served with:",
    items: [
      { name: "Ketchup, Mustard & Pickles", price: "£6.50" },
      { name: "House Cheese Sauce", price: "£7.50" },
      { name: "Burger Mayo, House Cheese Sauce, Tomato, Lettuce & Pickles", price: "£8.00" },
      { name: "Bacon Jam, House Cheese Sauce, Cheddar Cream Cheese", price: "£9.95" },
      { name: "BBQ Pulled Pork, House Cheese Sauce & Pickles", price: "£9.95" },
      { name: "Double the Load to 8oz", price: "+£3.00" },
    ],
  },
  {
    title: "Tofu Burger + Crispy Tofu",
    items: [
      {
        name: "Tofu Burger",
        price: "£6.50",
        desc: "Burger Mayo, Lettuce, Tomato & Pickles",
      },
      {
        name: "Marinated Crispy Tofu",
        price: "£6.00",
        details: [
          "Sauce Options:",
          "Coconut Sriracha",
          "BBQ",
          "Hot Korean",
          "Reloaded Sauce",
        ],
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
    title: "Reloaded House Fries",
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
        desc: "House Cheese Sauce, Jalapeños",
      },
      {
        name: "Crispy Calamari",
        price: "£6.00",
        desc: "Served with Tartare Sauce",
      },
      {
        name: "Halloumi Bites",
        price: "£7.00",
        desc: "Served with Hot Honey",
      },
    ],
  },
];

const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com/reloadeddawlish",
  },
  {
    label: "Facebook",
    href: "https://facebook.com/reloadeddawlish",
  },
];

const starPositions = [
  "top-16 left-[8%]",
  "top-32 right-[12%]",
  "top-[42%] left-[4%]",
  "top-[58%] right-[6%]",
  "bottom-24 left-[16%]",
  "bottom-32 right-[18%]",
];

const heroLogo: VisualAsset = {
  label: "ReLoaded Logo",
  alt: "ReLoaded Dawlish logo",
  src: "/ReLoaded-Red-on-White-Transp.png",
};

const galleryAssets: VisualAsset[] = [
  {
    label: "Tofu Burger",
    alt: "ReLoaded tofu burger in a brioche bun",
    src: "/reloaded_crispy_tofu_burger_square.jpg",
    eager: true,
  },
  {
    label: "Loaded Fries",
    alt: "ReLoaded loaded fries topped with bacon jam and pickled onion",
    src: "/reloaded-loaded-fries-bacon-jam-and-pickled-onion-square.jpg",
  },
  {
    label: "Beef Burger",
    alt: "ReLoaded beef burger",
    src: "/beef-burger.jpg",
  },
];

const mealDealAsset: VisualAsset = {
  label: "Meal Deal",
  alt: "ReLoaded meal deal burger and fries",
  src: "/meal-deal.jpg",
};

const wingsSpecial: MenuItem = {
  name: "Wings Wednesday",
  price: "£6",
  desc: "Boneless Chicken Wings",
};

const wingsSpecialAsset: VisualAsset = {
  label: "Wings Wednesday",
  alt: "Boneless chicken wings",
  src: "/boneless-wings.jpeg",
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

function getCurrentOpenStatus(date: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
    timeZone: "Europe/London",
  }).formatToParts(date);

  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? "0");
  const totalMinutes = hour * 60 + minute;
  const isLunch = totalMinutes >= 12 * 60 && totalMinutes < 15 * 60;
  const isEvening = totalMinutes >= 17 * 60 && totalMinutes < 20 * 60;

  return isLunch || isEvening;
}

function SocialIconInstagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true" {...props}>
      <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.35" cy="6.65" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function SocialIconFacebook(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.85 20v-7.12h2.4l.36-2.78h-2.76V8.33c0-.8.22-1.35 1.38-1.35h1.47V4.5c-.7-.1-1.41-.15-2.12-.15-2.1 0-3.55 1.28-3.55 3.64V10.1H8.67v2.78h2.36V20z" />
    </svg>
  );
}

function VisualPlaceholder({
  asset,
  className = "",
  labelClassName = "",
  imageClassName = "object-cover",
}: {
  asset: VisualAsset;
  className?: string;
  labelClassName?: string;
  imageClassName?: string;
}) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden border-8 border-black bg-white shadow-2xl ${className}`}>
      {!hasError ? (
        <Image
        src={asset.src}
        alt={asset.alt}
        fill
        sizes="(max-width: 768px) 78vw, 33vw"
        className={imageClassName}
        unoptimized
        loading={asset.eager ? "eager" : "lazy"}
        priority={asset.eager}
        onError={() => {
          setHasError(true);
        }}
        />
      ) : null}
      {hasError ? (
        <div className="absolute inset-0 flex h-full w-full items-end bg-[repeating-linear-gradient(45deg,#e30613_0_18px,#ffffff_18px_36px,#000000_36px_54px)] p-1.5">
          <div className={`w-full border-4 border-black bg-white px-4 py-3 text-center text-xl font-black uppercase text-black ${labelClassName}`}>
            {asset.label}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function PopStar({ className = "" }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`absolute text-white ${className}`}
      animate={shouldReduceMotion ? undefined : { rotate: [0, 12, -8, 0], scale: [1, 1.18, 0.96, 1] }}
      transition={shouldReduceMotion ? undefined : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
    >
      <Star aria-hidden="true" className="h-8 w-8 fill-current" />
    </motion.div>
  );
}

function Brush({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`relative inline-block -rotate-1 bg-black px-5 py-2 text-white shadow-xl ${className}`}>
      <span className="relative z-10">{children}</span>
      <span className="absolute -left-3 top-1/2 h-8 w-7 -translate-y-1/2 bg-black blur-[1px]" />
      <span className="absolute -right-3 top-1/2 h-8 w-7 -translate-y-1/2 bg-black blur-[1px]" />
    </span>
  );
}

export default function ReLoadedOnePage() {
  const shouldReduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(() => getCurrentOpenStatus(new Date()));
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const updateStatus = () => setIsOpen(getCurrentOpenStatus(new Date()));

    updateStatus();
    const intervalId = window.setInterval(updateStatus, 60_000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#e30613] text-black">
      <div className="fixed inset-0 pointer-events-none opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 0 2px, transparent 3px), radial-gradient(circle at 80% 40%, white 0 2px, transparent 3px)", backgroundSize: "54px 54px" }} />

      {starPositions.map((pos) => <PopStar key={pos} className={pos} />)}

      <section className="relative min-h-screen px-5 py-8 md:px-12 md:py-12">
        <motion.div
          initial={{ y: -80, rotate: -5, opacity: 0 }}
          animate={{ y: 0, rotate: -2, opacity: 1 }}
          transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 90, damping: 12 }}
          className="mx-auto max-w-6xl bg-white p-5 shadow-2xl md:p-10"
        >
          <div className="grid items-center gap-8 md:grid-cols-[1.05fr_0.95fr]">
            <div>
              <motion.p
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.25 }}
                className="mb-3 text-2xl font-black uppercase tracking-tight text-[#e30613] md:text-4xl"
              >
                Dawlish... it&apos;s time.
              </motion.p>

              <motion.h1
                initial={{ scale: 0.86, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.35, type: "spring", stiffness: 120 }}
                className="text-6xl font-black uppercase leading-[0.9] tracking-[-0.06em] md:text-8xl lg:text-9xl"
              >
                Get<br />ReLoaded
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.55 }}
                className="mt-7"
              >
                <Brush className="text-xl font-black uppercase md:text-3xl">Stop settling for boring food</Brush>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.7 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <a href="#menu" className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#e30613] px-7 py-4 text-center text-lg font-black uppercase text-white shadow-xl transition hover:-translate-y-1 hover:rotate-1 hover:scale-105 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-black">View the menu</a>
                <a href="#visit" className="inline-flex min-h-14 items-center justify-center rounded-full border-4 border-black bg-white px-7 py-4 text-center text-lg font-black uppercase transition hover:-translate-y-1 hover:-rotate-1 hover:scale-105 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-black">Find us</a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, rotate: 4, x: 40 }}
              animate={{ opacity: 1, rotate: 0, x: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.45, type: "spring", stiffness: 80 }}
              className="relative flex min-h-[420px] items-center justify-center"
            >
              <motion.div
                animate={shouldReduceMotion ? undefined : { y: [0, -10, 0], scale: [1, 1.02, 1], rotate: [-1, 1, -1] }}
                transition={shouldReduceMotion ? undefined : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="relative flex w-full items-center justify-center"
              >
                <VisualPlaceholder
                  asset={heroLogo}
                  className="h-56 w-full max-w-[24rem] border-0 bg-transparent shadow-none"
                  labelClassName="bg-[#fff2b8] py-10 text-3xl md:text-4xl"
                  imageClassName="object-contain"
                />
              </motion.div>
              <motion.div
                animate={shouldReduceMotion ? undefined : { rotate: [0, 4, -3, 0], scale: [1, 1.05, 1] }}
                transition={shouldReduceMotion ? undefined : { duration: 2.2, repeat: Infinity }}
                className="absolute right-0 top-0 rounded-full bg-black p-6 text-center text-3xl font-black uppercase text-white shadow-xl"
              >
                Come<br />and<br />see us!
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <div className="mx-auto mt-5 max-w-6xl">
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible">
            {galleryAssets.map((asset, index) => (
              <motion.div
                key={asset.label}
                initial={{ opacity: 0, y: 30, rotate: index % 2 === 0 ? -2 : 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.1 * index, type: "spring", stiffness: 110, damping: 16 }}
                className="aspect-square min-w-[78vw] snap-center md:min-w-0"
              >
                <VisualPlaceholder asset={asset} className="h-full w-full" labelClassName="py-3" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="relative rotate-[-1deg] overflow-hidden bg-black py-4 text-white">
        <motion.div
          animate={shouldReduceMotion ? undefined : { x: [0, -900] }}
          transition={shouldReduceMotion ? undefined : { duration: 18, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap text-3xl font-black uppercase tracking-tight"
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="mx-6">
              {marqueeItems.join(" • ")} •
            </span>
          ))}
        </motion.div>
      </div>

      <section id="menu" className="relative px-5 py-20 md:px-12">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={shouldReduceMotion ? { duration: 0 } : undefined}
            className="mb-10 rotate-1 bg-white p-6 shadow-2xl md:p-8"
          >
            <p className="text-2xl font-black uppercase text-[#e30613]">Everything cooked fresh.</p>
            <h2 className="text-5xl font-black uppercase leading-none tracking-[-0.05em] md:text-8xl">Everything packed with flavour.</h2>
          </motion.div>

          <div className="mb-8 grid gap-6 md:grid-cols-2">
            <motion.article
              initial={{ opacity: 0, y: 60, rotate: -3 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 110, damping: 16 }}
              className="border-8 border-black bg-[#fff2b8] p-6 shadow-2xl"
            >
              <div className="mb-4 inline-flex rotate-[-2deg] bg-[#e30613] px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-white shadow-lg">
                Lunchtime Special
              </div>
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1">
                  <h3 className="text-4xl font-black uppercase leading-none text-black md:text-5xl">{lunchSpecial.name}</h3>
                  <p className="mt-3 text-lg font-bold text-neutral-800">{lunchSpecial.desc}</p>
                </div>
                <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
                  <VisualPlaceholder asset={mealDealAsset} className="aspect-square w-36 sm:w-44" labelClassName="bg-[#fff2b8] py-8 text-sm" />
                  <p className="text-3xl font-black text-[#e30613] md:text-4xl">{lunchSpecial.price}</p>
                </div>
              </div>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 60, rotate: 3 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 110, damping: 16, delay: 0.05 }}
              className="border-8 border-black bg-white p-6 shadow-2xl"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1">
                  <h3 className="text-4xl font-black uppercase leading-none text-[#e30613] md:text-5xl">{wingsSpecial.name}</h3>
                  <p className="mt-3 text-lg font-bold text-neutral-800">{wingsSpecial.desc}</p>
                </div>
                <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
                  <VisualPlaceholder asset={wingsSpecialAsset} className="aspect-square w-36 sm:w-44" labelClassName="py-8 text-sm" />
                  <p className="text-3xl font-black text-[#e30613] md:text-4xl">{wingsSpecial.price}</p>
                </div>
              </div>
            </motion.article>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {menuSections.map((section, index) => (
              <motion.article
                key={section.title}
                initial={{ opacity: 0, y: 70, rotate: -4 }}
                whileInView={{ opacity: 1, y: 0, rotate: index % 2 ? 2 : -2 }}
                whileHover={shouldReduceMotion ? undefined : { y: -8, rotate: 0, scale: 1.02 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 100, damping: 14 }}
                className="bg-white p-5 shadow-2xl"
              >
                <div className="mb-5 flex items-center gap-3 border-b-4 border-black pb-4">
                  <span className="h-4 w-4 shrink-0 rotate-45 bg-[#e30613]" aria-hidden="true" />
                  <div>
                    <h3 className="text-2xl font-black uppercase leading-none text-[#e30613]">{section.title}</h3>
                    {section.subtitle ? (
                      <p className="mt-2 max-w-md text-sm font-bold normal-case text-neutral-700">{section.subtitle}</p>
                    ) : null}
                  </div>
                </div>
                <div className="space-y-5">
                  {section.items.map((item) => (
                    <div key={item.name}>
                      <div className="flex items-start justify-between gap-4">
                        <h4 className="max-w-[18rem] text-xl font-black uppercase">{item.name}</h4>
                        <p className="min-w-[5.5rem] shrink-0 text-right text-xl font-black">{item.price}</p>
                      </div>
                      {item.desc ? (
                        <p className="mt-1 text-sm font-bold leading-snug text-neutral-700">{item.desc}</p>
                      ) : null}
                      {item.details ? (
                        <ul className="mt-2 space-y-1 text-sm font-bold leading-snug text-neutral-700">
                          {item.details.map((detail) => (
                            <li
                              key={detail}
                              className={
                                detail === "Sauce Options:"
                                  ? "pt-1 font-black uppercase text-[#e30613]"
                                  : detail === "or"
                                    ? "py-1 text-center uppercase text-black"
                                    : ""
                              }
                            >
                              {detail}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="visit" className="relative bg-white px-5 py-20 md:px-12">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : undefined}
            className="bg-[#e30613] p-8 text-white shadow-2xl"
          >
            <Clock className="mb-4 h-12 w-12" />
            <div className={`mb-5 inline-flex rounded-full px-4 py-2 text-base font-black uppercase shadow-lg ${isOpen ? "bg-[#fff2b8] text-black" : "bg-black text-white"}`}>
              {isOpen ? "Currently Open" : "Currently Closed"}
            </div>
            <div className="space-y-1">
              <p className="text-5xl font-black uppercase tracking-[-0.05em] md:text-7xl">12-3pm</p>
              <p className="text-5xl font-black uppercase tracking-[-0.05em] md:text-7xl">5-8pm</p>
            </div>
            <p className="mt-5 max-w-md text-xl font-black uppercase">Late opening may flex depending on demand - keep an eye on socials.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : undefined}
            className="border-8 border-black bg-white p-8 shadow-2xl"
          >
            <MapPin className="mb-4 h-12 w-12 text-[#e30613]" />
            <p className="text-2xl font-black uppercase text-[#e30613]">Find us</p>
            <h2 className="text-5xl font-black uppercase tracking-[-0.05em] md:text-6xl">3 Piermont Place</h2>
            <p className="mt-3 text-3xl font-black uppercase">Dawlish</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {socials.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} (opens in a new tab)`}
                  className="group inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-lg font-black uppercase text-white transition hover:-translate-y-1 hover:bg-[#e30613] focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#e30613]"
                >
                  {label === "Instagram" ? (
                    <SocialIconInstagram className="h-5 w-5 transition group-hover:rotate-12" />
                  ) : (
                    <SocialIconFacebook className="h-5 w-5 transition group-hover:rotate-12" />
                  )}{" "}
                  {label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="relative overflow-hidden bg-black px-5 py-12 text-center text-white">
        <motion.p
          animate={shouldReduceMotion ? undefined : { scale: [1, 1.05, 1] }}
          transition={shouldReduceMotion ? undefined : { duration: 1.8, repeat: Infinity }}
          className="text-5xl font-black uppercase tracking-[-0.06em] md:text-8xl"
        >
          Let&apos;s get ReLoaded
        </motion.p>
        <div className="mt-5 space-y-2 text-sm font-bold uppercase tracking-[0.14em] text-white/80">
          <p>© {currentYear} ReLoaded Dawlish</p>
          <p>
            Design by{" "}
            <a href="mailto:info@onecre8tive.co.uk" className="text-white underline decoration-[#e30613] underline-offset-4">
              One Cre8tive
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}
