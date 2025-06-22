import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

export default function GamesSlider({
  items,
  renderItem,
  title = "Scopri altri giochi",
  slidesPerView = 5,
  enableLightbox = false
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const handleClick = (i) => {
    if (enableLightbox) {
      setIndex(i);
      setOpen(true);
    }
  };

  return (
    <div className="mt-8 mb-4">
      {title && (
        <h2 className="mb-4 text-xl font-bold text-white relative inline-block">
          {title}
        </h2>
      )}
      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={15}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView },
        }}
      >
        {items?.map((item, i) => (
          <SwiperSlide key={item.id} onClick={() => handleClick(i)}>
            {renderItem(item)}
          </SwiperSlide>
        ))}
      </Swiper>

      {enableLightbox && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={index}
          slides={items.map((item) => ({ src: item.image || item }))}
          plugins={[Zoom]}
        />
      )}
    </div>
  );
}