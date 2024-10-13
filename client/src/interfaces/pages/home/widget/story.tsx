import { useRef, useState } from "react";
import { baseApi } from "../../../../cores/apis/api";
import { Fetchingdata } from "../../../components/fetching_data";
import { StoryGroupItem } from "./story_group_item";
import { Carousel } from "@mantine/carousel";
import { Avatar, Modal, rem, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Autoplay from "embla-carousel-autoplay";
import { StoryItem } from "./story_item";
export const Story = () => {
  const storyGroup = baseApi.useStoryQuery("");
  const [current, setCurrent] = useState<number>();
  const [opened, { open, close }] = useDisclosure(false);
  const autoplay = useRef(Autoplay({ delay: 1000 }));
  const company = storyGroup.data?.data[current!]?.partner!;

  return (
    <>
      <Modal
        fullScreen
        closeOnClickOutside
        styles={{
          body: { borderRadius: 20, overflow: "hidden" },
          root: { borderRadius: 20, overflow: "hidden" },
          content: { borderRadius: 20, overflow: "hidden" },
        }}
        withCloseButton={false}
        radius={100}
        classNames={{
          content: "p-0 m-0   ",
          header: "rounded-lg",
          body: "p-0 m-0  overflow-hidden",
          overlay: "backdrop-blur-md rounded-lg overflow-hidden bg-black/10",
        }}
        size={"md"}
        opened={opened}
        onClose={close}
      >
        <div className="relative">
          <div className="absolute z-50">
            {company && (
              <div className="z-10 p-2 w-full flex items-center ">
                <div className="h-14  flex  mr-2">
                  <Avatar
                    w={"auto"}
                    className="my-auto"
                    src={company.imagePath}
                  />
                </div>
                <Title className="text-white" order={3}>
                  {company.shortname}
                </Title>
              </div>
            )}
          </div>
          <Carousel
            withIndicators
            h={{ base: "75vh" }}
            height={"100%"}
            p={0}
            plugins={[autoplay.current]}
            className="h-[75vh] rounded-lg overflow-hidden  bg-slate-600"
            // onMouseEnter={autoplay.current.stop}
            // onMouseLeave={autoplay.current.reset}
          >
            {storyGroup.data?.data[current!]?.story?.map((s) => (
              <Carousel.Slide
                className="  overflow-hidden bg-green-600"
                h={"100%"}
              >
                <StoryItem
                  company={storyGroup.data?.data[current!]!.partner!}
                  story={s}
                />
              </Carousel.Slide>
            ))}

            {/* ...other slides */}
          </Carousel>
        </div>
      </Modal>

      <Fetchingdata {...storyGroup}>
        {storyGroup.data?.data?.length! > 0 && (
          <Carousel
            h={{ base: rem(120), sm: rem(350) }}
            p={10}
            pt={10}
            className="bg-transparent"
            slideSize={{ base: rem(90), sm: rem(250) }}
            // classNames={{slide:"size-[200px]"}}
            slideGap="lg"
            classNames={{ indicator: "bg-secondary-500 mt-10 bottom-0" }}
            align="start"
            slidesToScroll={1}
          >
            {storyGroup.data?.data.map((g, i) => (
              <Carousel.Slide
                p={4}
                mx={8}
                onClick={() => {
                  open();
                  setCurrent(i);
                }}
              >
                <StoryGroupItem storyGroup={g} />
              </Carousel.Slide>
            ))}
          </Carousel>
        )}
      </Fetchingdata>
    </>
  );
};
