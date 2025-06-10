import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import CompactGameCard from './CompactGameCard';

export default function GamesSlider({ games, title = "Scopri altri giochi" }) {
  return (
    <div className="mt-8 mb-4">
      <h2 className="mb-4 text-xl font-semibold text-white">{title}</h2>
      <Swiper
        slidesPerView={5}
        spaceBetween={15}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
      >
        {games?.map((game) => (
          <SwiperSlide key={game.id}>
            <CompactGameCard game={game} height="120px" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}