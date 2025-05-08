import { Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <>
      {/* Soft gap between page and footer */}
      <div className=" w-full" />

      <footer className="bg-zinc-900 text-white py-8 px-4 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src="/sticker.png"
              alt="Hansraj Industries"
              className="w-60 md:w-90"
            />
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-3 text-sm font-small text-zinc-300 items-end text-right">
            <div className="flex items-center gap-2">
              <Phone size={16} />
              <a href="tel:+919822330411" className="hover:underline">
                +91 98223 30411
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <a href="mailto:hansrajind@gmail.com" className="hover:underline">
                hansrajind@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <a className="hover:underline"
              href="https://www.google.co.in/maps/dir//18.65542,73.86711/@18.655402,73.7847083,12z?entry=ttu&g_ep=EgoyMDI1MDUwNS4wIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer">
                Moshi, Pimpri Chinchwad, Pune,Maharashtra, India
              </a>
            </div>
          </div>
        </div>

        <hr className="my-6 border-zinc-700" />

        <p className="text-center text-xs text-zinc-500">
          &copy; {new Date().getFullYear()} Hansraj Industries. All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default Footer;
