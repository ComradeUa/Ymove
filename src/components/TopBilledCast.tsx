import React, { FC } from 'react';
import { useCasts } from '@/hooks/useCasts';
import { Card, CardFooter, CardTitle } from './ui/card';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
const TopBilledCast: FC = () => {
  const params = useParams();
  const { id } = params;
  const { casts, loading, error } = useCasts(Number(id));

  return (
    <>
      <div className="mt-10">
        <h1
          className="text-3xl font-bold mb-5 flex justify-center
        ">
          Top Billed Cast
        </h1>
        <div className="mx-auto max-w-6xl">
          <Swiper
            modules={[Navigation]}
            spaceBetween={10}
            slidesPerView={3}
            navigation
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
            }}>
            {casts.map((cast) => (
              <SwiperSlide key={cast.id}>
                <Card className="inline-flex flex-col items-center  overflow-hidden w-[13rem] max-h-120">
                  {cast.profile_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`}
                      alt={cast.name}
                      width={200}
                      height={350}
                      className="rounded-md object-cover w-full"
                    />
                  ) : (
                    <div className="w-full h-[19.3rem] bg-gray-300 rounded-md flex items-center justify-center">
                      <span>No Image</span>
                    </div>
                  )}
                  <CardTitle className="text-center font-medium truncate w-full mt-2">
                    {cast.name}
                  </CardTitle>
                  <p className="text-center text-sm text-gray-400 w-full line-clamp-2">
                    {cast.character}
                  </p>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default TopBilledCast;
