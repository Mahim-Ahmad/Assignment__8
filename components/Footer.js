import Link from "next/link";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <Link href="/" className="flex items-center gap-2 font-display text-xl">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent text-[15px] font-bold text-[#14110f]">
              Q
            </span>
            QurbaniHat
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-muted">
            A trusted marketplace connecting families with verified, healthy
            cows, goats and sheep for Qurbani — every season, without the
            hassle of the physical haat.
          </p>
        </div>

        <div>
          <h3 className="font-display text-base text-text">Contact</h3>
          <ul className="mt-4 space-y-2 text-sm text-text-muted">
            <li>support@qurbanihat.com</li>
            <li>+880 1XXX-XXXXXX</li>
            <li>Mirzapur, Dhaka Division, Bangladesh</li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base text-text">Follow us</h3>
          <div className="mt-4 flex gap-3">
            {[FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social link"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
          <p className="mt-6 text-sm text-text-muted">
            Built as a Next.js coursework project — QurbaniHat, 2026.
          </p>
        </div>
      </div>

      <div className="border-t border-border px-5 py-5 text-center text-xs text-text-muted">
        © {new Date().getFullYear()} QurbaniHat. All rights reserved.
      </div>
    </footer>
  );
}
