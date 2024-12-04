import { useGetBannerQuery } from "../../../../cores/apis/api";
import { Fetchingdata } from "../../../components/fetching_data";
import { BannerItem } from "./banner_item";
import { Carousel } from "@mantine/carousel";

export const Banners = () => {
  const banners = useGetBannerQuery("");
  return (
    <Fetchingdata {...banners}>
      {banners.data?.data && banners.data?.data?.length > 0 && (
        <div className="bg-transparent bg-white ">
          <div className="bg-white/20 backdrop-blur-sm ">
            <Carousel
              withIndicators
              h={{ base: 125, md: 200 ,lg:200 }}
              // p={10}
              // pt={20}
              // px={10}
              classNames={{ indicator: "bg-primary-600  -bottom-12 " }}
              className="bg-transparent content-center "
              slideSize={{ base: "98%", md: "49%" ,lg:'35%'}}
              slideGap="sm"
              withControls={false}
              align="start"
              initialSlide={0}
              slidesToScroll={"auto"}
            >
              {banners.data?.data.map((banner) => (
                <Carousel.Slide px={10} h={{ base: 125, md:140 }}>
                  <BannerItem banner={banner} />
                </Carousel.Slide>
              ))}
            </Carousel>
          </div>
        </div>
      )}
    </Fetchingdata>
  );
};
