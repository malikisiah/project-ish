import Image from "next/image";

export default function Page() {
  const incentives = [
    {
      name: "Free shipping",
      imageSrc:
        "https://tailwindui.com/plus-assets/img/ecommerce/icons/icon-shipping-simple.svg",
      description:
        "Lorem ipsum odor amet, consectetuer adipiscing elit. Nascetur torquent bibendum praesent vestibulum cursus. Lacus libero tellus suspendisse dapibus fusce ex dictum class.",
    },
    {
      name: "10-year warranty",
      imageSrc:
        "https://tailwindui.com/plus-assets/img/ecommerce/icons/icon-warranty-simple.svg",
      description:
        "Lorem ipsum odor amet, consectetuer adipiscing elit. Penatibus ad felis torquent tempus felis semper faucibus. Venenatis aenean penatibus senectus porttitor arcu lacus.",
    },
    {
      name: "Exchanges",
      imageSrc:
        "https://tailwindui.com/plus-assets/img/ecommerce/icons/icon-exchange-simple.svg",
      description:
        "Lorem ipsum odor amet, consectetuer adipiscing elit. Porta eleifend faucibus aliquet condimentum nascetur arcu habitant. Potenti blandit integer himenaeos fermentum ac suscipit morbi odio.",
    },
  ];
  return (
    <>
      {/* Header */}
      <div className="px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
            Media
          </h2>
          <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
            lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
            fugiat.
          </p>
        </div>
      </div>

      {/* Incentive */}

      <div className="">
        <div className="mx-auto max-w-7xl py-24 sm:px-2 sm:py-32 lg:px-4">
          <div className="mx-auto max-w-2xl px-4 lg:max-w-none">
            <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
              <div>
                <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                  Lorem ipsum odor amet, consectetuer adipiscing elit.
                </h2>
                <p className="mt-4 text-gray-500">
                  Lorem ipsum odor amet, consectetuer adipiscing elit. Imperdiet
                  efficitur tempus ornare posuere turpis lectus dapibus
                  pellentesque. Massa vulputate mus massa quisque leo nulla.
                  Cursus nunc hac tincidunt; blandit habitasse venenatis. Purus
                  curae finibus sapien in himenaeos. Curabitur ut elementum
                  luctus varius vitae sem ligula.
                </p>
              </div>
              <Image
                width={800}
                height={800}
                alt=""
                src="https://pbs.twimg.com/media/EE784ftXUAIEPa0.jpg"
                className="aspect-[3/2] w-full rounded-lg bg-gray-100 object-cover"
              />
            </div>
            <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
              {incentives.map((incentive) => (
                <div key={incentive.name} className="sm:flex lg:block">
                  <div className="sm:shrink-0">
                    <Image
                      width={500}
                      height={500}
                      alt=""
                      src={incentive.imageSrc}
                      className="size-16"
                    />
                  </div>
                  <div className="mt-4 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-6">
                    <h3 className="text-sm font-medium text-gray-900">
                      {incentive.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      {incentive.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
