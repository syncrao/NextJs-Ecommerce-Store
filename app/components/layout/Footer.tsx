import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-section border-t border-border text-text-muted overflow-hidden">

      <div className="absolute inset-0  animate-shimmer pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div>
            <h2 className="text-2xl font-extrabold text-accent tracking-wide">
              Bikaneri Bandhej House
            </h2>

            <p className="mt-4 text-sm leading-relaxed">
              Authentic Bandhej & traditional Rajasthani fashion crafted with
              heritage, elegance, and premium quality fabrics.
            </p>
          </div>


          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-text">
              Shop
            </h3>

            <ul className="mt-4 space-y-3">
              {["Poshak", "Odhna", "Suit", "New Arrivals"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="hover:text-brand transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-text">
              Support
            </h3>

            <ul className="mt-4 space-y-3">
              {["Contact Us", "Shipping", "Returns", "FAQs"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="hover:text-brand transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-text">
              Follow Us
            </h3>

            <div className="mt-4 flex space-x-6">

              <Link
                href="#"
                aria-label="Facebook"
                className="hover:scale-110 hover:text-accent transition-transform duration-300"
              >
                <Facebook size={22} />
              </Link>

              <Link
                href="#"
                aria-label="Instagram"
                className="hover:scale-110 hover:text-accent transition-transform duration-300"
              >
                <Instagram size={22} />
              </Link>

              <Link
                href="#"
                aria-label="Twitter"
                className="hover:scale-110 hover:text-accent transition-transform duration-300"
              >
                <Twitter size={22} />
              </Link>

            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-border pt-6 text-center text-sm">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-brand">
              Bikaneri Bandhej House
            </span>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
