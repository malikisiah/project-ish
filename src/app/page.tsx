import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <Image
            src="/FIsJjEmXIAYItjI.jpeg"
            className="max-w-sm rounded-lg shadow-2xl"
            quality={100}
            alt=""
            width={1000}
            height={1000}
          />
          <div>
            <h1 className="text-5xl font-bold">
              LA-BASED PHOTOGRAPHY <br></br> BY SOFIA PARAZI
            </h1>
            <p className="py-6"></p>
            <Link className="btn btn-primary" href="/contact">
              Contact Me
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
