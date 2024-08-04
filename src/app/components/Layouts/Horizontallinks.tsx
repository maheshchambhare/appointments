import {
  FacebookIcon,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import React from "react";

function Horizontallinks({ website }: any) {
  const links = [
    {
      name: "phone",
      link: `tel:${website?.mobile}`,
      Icon: <Phone size={25} className="text-foreground text-sm" />,
    },
    {
      name: "whatsapp",
      link: `https://wa.me/+91${website?.whatsapp}`,
      Icon: <MessageCircle size={25} className="text-foreground text-sm" />,
    },
    {
      name: "maps",
      link: website?.maps,
      Icon: <MapPin size={25} className="text-foreground text-sm" />,
    },
    {
      name: "facebook",
      link: website?.facebook,
      Icon: <FacebookIcon size={25} className="text-foreground text-sm" />,
    },
    {
      name: "instagram",
      link: website?.instagram,
      Icon: <Instagram size={25} className="text-foreground text-sm" />,
    },

    {
      name: "facebook",
      link: website?.youtube,
      Icon: <Youtube size={25} className="text-foreground text-sm" />,
    },
  ];

  return (
    <div className="flex my-6 flex-wrap justify-center w-full  ">
      {links.map((link: any, ind: any) => {
        return (
          link.link && (
            <div
              key={ind}
              className="m-2 hover:scale-110 hover:translate-y-[-2px] transition-all duration-200 ease-in-out"
            >
              <Link href={link.link}>{link.Icon}</Link>
            </div>
          )
        );
      })}
    </div>
  );
}

export default Horizontallinks;
