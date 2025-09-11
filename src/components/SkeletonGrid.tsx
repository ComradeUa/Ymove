import { FC } from 'react';
import { Skeleton } from './ui/skeleton';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const SkeletonSwiper: FC = () => {
  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={10}
      slidesPerView={5}
      navigation
      breakpoints={{
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 5 },
      }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <SwiperSlide key={i}>
          <div className="flex flex-col items-center justify-center mt-4 w-full">
            <div className="w-full max-w-[200px] aspect-[2/3] rounded-xl overflow-hidden">
              <Skeleton className="w-full h-full rounded-xl" />
            </div>
            <div className="w-full max-w-[200px] mt-2">
              <Skeleton className="h-4 w-full rounded" />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SkeletonSwiper;
