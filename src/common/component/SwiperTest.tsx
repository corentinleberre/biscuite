import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-cards";
import "./carousel.scss";

import { useEffect, useState } from "react";
import { EffectCards } from "swiper";

function SwiperTest(props: { index: any[]; result: any }) {
  const [swiper, setSwiper] = useState<any>(null);

  useEffect(() => {
    slideLast();
  }, [props]);

  const slideLast = () => {
    if (swiper !== null) {
      swiper.slideNext();
    }
  };

  return (
    <>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        onInit={(s) => setSwiper(s)}
        allowTouchMove={false}
        className="mySwiper">
        {props.index?.map((i) => (
          <SwiperSlide key={i}>
            {i === props.index.length &&
              props.result?.actions?.map((slide: any, j: number) => (
                <p key={i + ":" + j} className="py-3">
                  {slide.label}
                </p>
              ))}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default SwiperTest;
