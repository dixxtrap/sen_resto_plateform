import { useEffect, useRef, useState } from "react";
import { CompanyCategoryDto } from "../../../../cores/models/company_category.dto";
import { TextInput, Text, SimpleGrid, Box } from "@mantine/core";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { ProductItem } from "../../product/widget/product_item";
import clsx from "clsx";

const CompanyProduct = ({ category }: { category: CompanyCategoryDto[] }) => {
  const sectionRefs = useRef<HTMLParagraphElement[]>([]);
  const [activeSection, setActiveSection] = useState('');

  // Intersection Observer Hook
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0 }
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);
  return (
    <div className="grid grid-cols-12 grid-rows-1 md:px-6  mt-4   justify-stretch  ">
      <div className="  h-[100%important] col-span-2  grow hidden lg:inline-block">
        <div className=" hidden md:flex py-2 sticky h-auto  w-min top-16 gap-4 flex-col">
          <Text className="text-3xl">Categories</Text>
          {
            category?.filter(e => e.product.length > 0)?.map(e => <Text
              component="a"
              key={e.id}
              href={`#${e.id!}`}
              className={clsx("text-2xl  w-min", { "border-b-8 border-primary-500": activeSection === `${e.id}` })}>{e.name}</Text>)
          }
        </div>
      </div>

      <div className="grow  col-span-12 lg:col-span-8 ">
        <div className="flex p-2 grow justify-end sticky bg-white  border-b z-50 top-14">
          <TextInput
            rightSection={<MagnifyingGlassIcon className="size-4" />}
            placeholder="search"
          />
        </div>

        <div>
          {category?.filter(e => e.product.length > 0)?.map((cat, index) => (<div className="mb-3 md:mb-10">
            <Text
              key={cat.id}
              id={`${cat.id}`}
              ref={(el) => {
                if ( el)
                  sectionRefs.current[index] = el
              }}
              className=" sticky top-[4.5rem]  z-50 text-lg mx-4 font-bold">{cat.name}</Text>
            <SimpleGrid
              cols={{ base: 1, sm: 2, md: 2 }}
              className=" p-1 gap-1 md:gap-2 mx-1 lg:mx-3   "
            >
              {cat.product?.map((e) => {
                return (
                  <ProductItem
                    product={{
                      ...e!,
                      id: e.id,


                    }}
                  />
                );
              })}
            </SimpleGrid>

          </div>))}
          
        </div>
      </div>
      <div className=" col-span-2 h-[100%important]  grow  hidden lg:inline-block">
        <div className=" hidden md:flex py-2 h-[500px] sticky bottom-0 top-16 gap-4 flex-col">
          <Text>Top</Text>
        </div>
      </div>
    </div>

  )
}

export default CompanyProduct