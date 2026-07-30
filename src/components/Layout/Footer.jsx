import { PinIcon } from "lucide-react";
import { Phone } from "lucide-react";
import { MailIcon } from "lucide-react";

function Footer() {
    return (
        <footer className="bg-slate-900 text-white mt-16">
            <div className="container mx-auto px-6 py-12 grid gap-10 md:grid-cols-3">
                {/* Logo */}
                <div>
                    <h2 className="text-3xl font-bold text-blue-500">
                        BOOM <span className="text-white">STORE</span>
                    </h2>
                    <p className="mt-4 text-slate-300 leading-7">
                        Your one-stop shop for the latest products with the best quality and
                        affordable prices.
                    </p>
                </div>

                {/* Links */}
                <div>
                    <h3 className="mb-4 text-xl font-semibold">Quick Links</h3>

                    <ul className="space-y-3 text-slate-300">
                        <li>
                            <a to="/" className="hover:text-blue-400 transition">
                                Home
                            </a>
                        </li>

                        <li>
                            <a to="/products" className="hover:text-blue-400 transition">
                                Products
                            </a>
                        </li>

                        <li>
                            <a to="/cart" className="hover:text-blue-400 transition">
                                Cart
                            </a>
                        </li>

                        <li>
                            <a to="/contact" className="hover:text-blue-400 transition">
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Contact */}
                <div >
                    <h3 className="mb-4 text-xl font-semibold">Contact</h3>

                    <div className="flex items-center gap-2 text-slate-300 mb-2">
                        <MailIcon />
                        <p> support@boomstore.com</p>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300 mt-2">
                        <Phone />
                        <p> +20123456789</p>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300 mt-4 ">
                        <PinIcon />
                        <p> Cairo, Egypt</p>
                    </div>

                </div>
            </div>

            <div className="border-t border-slate-700 py-5 text-center text-sm text-slate-400">
                © {new Date().getFullYear()} BOOM STORE. All Rights Reserved.
            </div>
        </footer>
    );
}

export default Footer;