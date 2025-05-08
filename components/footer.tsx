import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="p-4 bg-[#0d0d0d] ">
      <div className="bg-[#151515] text-white py-9 px-6  rounded-lg ">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex flex-col items-start">
            <Image
              src="/sentigenText.png"
              alt="Sentigen Logo"
              width={240}
              height={70}
              className="mb-2 "
            />
            <p className="text-sm text-[#7A7A7A] mt-1">
              © 2025 Sentigen. All Rights Reserved.
            </p>
          </div>

          <div className="flex space-x-6 my-4 md:my-0 text-sm  text-[#7A7A7A] uppercase">
            <p className="text-[#7A7A7A] font-semibold">Terms of Use</p>
            <p className="text-[#7A7A7A] font-semibold">Privacy Policy</p>
            <p className="text-[#7A7A7A] font-semibold">Legal Disclaimer</p>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="#" target="_blank" rel="noopener noreferrer">
              <Image src="/twitter.png" alt="Twitter" width={28} height={28} />
            </Link>
            <Link href="#" target="_blank" rel="noopener noreferrer">
              <Image
                src="/telegram.png"
                alt="Telegram"
                width={28}
                height={28}
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
