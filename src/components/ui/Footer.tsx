import { Film, Mail, Phone } from "lucide-react";

const socials = ["Facebook", "Instagram", "Twitter", "Youtube"];

export const Footer = () => {
  return (
    <footer className="flex w-full justify-center bg-[#4338CA] px-4 py-[40px] text-[#FAFAFA]">
      <div className="flex flex-col md:flex-row w-full max-w-[1280px] items-start gap-8 md:gap-[120px]">
        <div className="flex flex-col items-start gap-[12px]">
          <div className="flex items-center gap-2">
            <Film width={20} height={20} />
            <h2 className="text-[16px] font-bold italic leading-[20px] tracking-[0.32px]">
              Movie Z
            </h2>
          </div>
          <p className="text-[14px] leading-[20px]">
            © 2024 Movie Z. All Rights Reserved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row w-full md:flex-1 items-start md:justify-end gap-8 sm:gap-[96px]">
          <div className="flex flex-col items-start gap-[12px]">
            <p className="text-[14px] leading-[20px]">Contact Information</p>
            <div className="flex flex-col items-start gap-[24px]">
              <div className="flex items-center gap-[12px]">
                <Mail width={16} height={16} />
                <div className="flex flex-col text-[14px] leading-[20px]">
                  <p className="font-medium">Email:</p>
                  <p>support@movieZ.com</p>
                </div>
              </div>
              <div className="flex items-center gap-[12px]">
                <Phone width={16} height={16} />
                <div className="flex flex-col text-[14px] leading-[20px]">
                  <p className="font-medium">Phone:</p>
                  <p>+976 (11) 123-4567</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-[12px] text-[14px] leading-[20px]">
            <p>Follow us</p>
            <div className="flex items-center gap-[12px] font-medium">
              {socials.map((name) => (
                <p key={name}>{name}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
