import ImageLink from "../../utils/ImageLink"




/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
const plats = [
    {
      id: 1,
      name: 'Mbakhalou Saloum',
      href: '#',
      price: '2500 Fcfa',
      imageSrc: ImageLink.mbakhalsaloum,
      imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    },
    {
      id: 2,
      name: 'Maffé',
      href: '#',
      price: '3000 Fcfa',
      imageSrc: ImageLink.mafe,
      imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    },
    {
      id: 3,
      name: 'Riz au poisson braisé',
      href: '#',
      price: '3000 Fcfa',
      imageSrc: ImageLink.poissonBraise,
      imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    },
    {
      id: 4,
      name: 'C Bon',
      href: '#',
      price: '4000 Fcfa ',
      imageSrc: ImageLink.cBon,
      imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    },

    {
      id: 1,
      name: 'Mbakhalou Saloum',
      href: '#',
      price: '2500 Fcfa',
      imageSrc: ImageLink.mbakhalsaloum,
      imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    },
    {
      id: 2,
      name: 'Maffé',
      href: '#',
      price: '3000 Fcfa',
      imageSrc: ImageLink.mafe,
      imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    },
    {
      id: 3,
      name: 'Riz au poisson braisé',
      href: '#',
      price: '3000 Fcfa',
      imageSrc: ImageLink.poissonBraise,
      imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    },
    {
      id: 4,
      name: 'C Bon',
      href: '#',
      price: '4000 Fcfa ',
      imageSrc: ImageLink.cBon,
      imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    },
    {
      id: 1,
      name: 'Mbakhalou Saloum',
      href: '#',
      price: '2500 Fcfa',
      imageSrc: ImageLink.mbakhalsaloum,
      imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    },
    {
      id: 2,
      name: 'Maffé',
      href: '#',
      price: '3000 Fcfa',
      imageSrc: ImageLink.mafe,
      imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    },
    {
      id: 3,
      name: 'Riz au poisson braisé',
      href: '#',
      price: '3000 Fcfa',
      imageSrc: ImageLink.poissonBraise,
      imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    },
    {
      id: 4,
      name: 'C Bon',
      href: '#',
      price: '4000 Fcfa ',
      imageSrc: ImageLink.cBon,
      imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    },
    
    
    // More products...
  ]
  
  export default function Home() {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-2 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-4">
          <h2 className="sr-only">Products</h2>
  
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {plats.map((plat) => (
              <a key={plat.id} href={plat.href} className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src={plat.imageSrc}
                    alt={plat.imageAlt}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{plat.name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">{plat.price}</p>
                <div className="mt-6">
                <a
                  href="#"
                  className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-300 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
                >
                  commander
                </a>
              </div>
              </a>
              
            ))}
          </div>
        </div>
      </div>
    )
  }
  