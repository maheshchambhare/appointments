import Image from "next/image";
import Link from "next/link";
import React from "react";

import {
  FacebookIcon,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
  Youtube,
} from "lucide-react";

function LinksSidebar({ website }: any) {
  const links = [
    {
      name: "phone",
      link: `tel:${website.mobile}`,
      Icon: <Phone size={25} className="text-foreground text-sm" />,
    },
    {
      name: "whatsapp",
      link: `https://wa.me/+91${website.whatsapp}`,
      Icon: <MessageCircle size={25} className="text-foreground text-sm" />,
    },
    {
      name: "maps",
      link: website.maps,
      Icon: <MapPin size={25} className="text-foreground text-sm" />,
    },
    {
      name: "facebook",
      link: website.facebook,
      Icon: <FacebookIcon size={25} className="text-foreground text-sm" />,
    },
    {
      name: "instagram",
      link: website.instagram,
      Icon: <Instagram size={25} className="text-foreground text-sm" />,
    },

    {
      name: "facebook",
      link: website.youtube,
      Icon: <Youtube size={25} className="text-foreground text-sm" />,
    },
  ];

  return (
    <div className="hidden md:flex fixed right-4   px-2 rounded-3xl md:flex-col top-1/2  transform  -translate-y-1/2">
      <div className="py-1">
        {links.map((link: any, ind: any) => {
          return (
            <div
              key={ind}
              className="my-2  hover:scale-110 hover:translate-x-[-2px] transition-all duration-200 ease-in-out"
            >
              <Link href={link.link}>{link.Icon}</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LinksSidebar;
