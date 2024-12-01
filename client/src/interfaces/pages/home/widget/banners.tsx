import { useGetBannerQuery } from "../../../../cores/apis/api";
import { Fetchingdata } from "../../../components/fetching_data";
import { BannerItem } from "./banner_item";
import { Carousel } from "@mantine/carousel";

export const Banners = () => {
  const banners = useGetBannerQuery("");
  return (
    <Fetchingdata {...banners}>
      {banners.data?.data && banners.data?.data?.length > 0 && (
        <div className="bg-transparent bg-amber-100 ">
          <div className="bg-white/20 backdrop-blur-sm ">
            <Carousel
              withIndicators
              h={{ base: 125, md: 240 }}
              // p={10}
              // pt={20}
              // px={10}
              classNames={{ indicator: "bg-secondary-400/0 bottom-0" }}
              className="bg-transparent content-center "
              slideSize={{ base: "100%", md: "49%" }}
              slideGap="sm"
              withControls={false}
              align="start"
              slidesToScroll={"auto"}
            >
              {banners.data?.data.map((banner) => (
                <Carousel.Slide px={10} h={{ base: 125, md: 220 }}>
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
