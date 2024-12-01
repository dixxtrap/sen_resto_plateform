import { useRef, useState } from "react";
import { baseApi } from "../../../../cores/apis/api";
import { Fetchingdata } from "../../../components/fetching_data";
import { StoryGroupItem } from "./story_group_item";
import { Carousel } from "@mantine/carousel";
import { ActionIcon, Avatar, Modal, rem, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Autoplay from "embla-carousel-autoplay";
import { StoryItem } from "./story_item";
import { XMarkIcon } from "@heroicons/react/24/solid";
export const Story = () => {
  const storyGroup = baseApi.useStoryQuery("");
  const [current, setCurrent] = useState<number>();
  const [opened, { open, close }] = useDisclosure(false);
  const autoplay = useRef(Autoplay({ delay: 5000 }));
  const company = storyGroup.data?.data[current!]?.partner!;

  return (
    <>
      <Modal
        fullScreen
        withCloseButton={false}
        classNames={{ body: "p-0 z-[2001]" }}
        opened={opened}
        onClose={close}
      >
        <div className="relative">
          <div className="absolute z-50 left-0 right-0 w-full">
            {company && (
              <div className="z-10 p-2 w-full  flex items-center ">
                <div className="h-14  flex  mr-2">
                  <Avatar
                    w={"auto"}
                    className="my-auto rounded-sm"
                    src={company.imagePath}
                  />
                </div>
                <Title className="text-white" order={3}>
                  {company.shortname}
                </Title>
                <div className="grow"></div>
                <ActionIcon color={"black"} onClick={close}>
                  <XMarkIcon />
                </ActionIcon>
              </div>
            )}
          </div>
          <Carousel
            withIndicators
            h={{ base: "100vh" }}
            height={"100%"}
            p={0}
            classNames={{ indicator: "bg-primary-500" }}
            plugins={[autoplay.current]}
            className="h-[100vh]  overflow-hidden  "
            // onMouseEnter={autoplay.current.stop}
            // onMouseLeave={autoplay.current.reset}
          >
            {storyGroup.data?.data[current!]?.story?.map((s) => (
              <Carousel.Slide className="  " h={"100%"}>
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
            h={{ base: '60px', sm: rem(350) }}
           m={10}
           
            className="bg-transparent"
            slideSize={{ base: '60px', sm: rem(250) }}
            // classNames={{slide:"size-[200px]"}}
            slideGap="lg"
            classNames={{ indicator: "bg-secondary-500 mt-10 bottom-0" }}
            align="center"
            slidesToScroll={"auto"}
          >
            {storyGroup.data?.data.map((g, i) => (
              <Carousel.Slide
                
                
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
