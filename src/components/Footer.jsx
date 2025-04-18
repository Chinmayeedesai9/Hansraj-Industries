import { Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-white py-12 px-4 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Logo and Brand Info */}
        <div className="flex flex-col items-start">
          <img
            src="/sticker.png"
            alt="Hansraj Industries"
            className="w-80 md:w-90 mb-4"
          />
          <p className="text-sm text-zinc-300 max-w-md">
            Hansraj Industries, established in 1968, is a pioneer in industrial equipment manufacturing — blending legacy with innovation.
          </p>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-4 text-sm text-zinc-300">
          <div className="flex items-center gap-3">
            <Phone size={18} /> <span>+91 98765 43210</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail size={18} /> <span>info@hansraj.com</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin size={18} /> <span>Pune, Maharashtra, India</span>
          </div>
        </div>
      </div>

      <hr className="my-8 border-zinc-700" />

      <p className="text-center text-xs text-zinc-500">
        &copy; {new Date().getFullYear()} Hansraj Industries. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
