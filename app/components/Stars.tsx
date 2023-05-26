import Image from "next/image";
import fullStar from "../../public/icons/full-star.png";
import halfStar from "../../public/icons/half-star.png";
import emptyStar from "../../public/icons/empty-star.png";
import { avgRating } from "../../utils/calculateAverageRating";
import { Review } from "@prisma/client";

export default function Stars({ reviews }: { reviews: Review[] }) {
  const rating = avgRating(reviews);
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const diff = parseFloat((rating - i).toFixed(1));
      if (diff >= 1) {
        stars.push(fullStar);
      } else if (diff < 1 && diff > 0) {
        if (diff < 0.25) stars.push(emptyStar);
        else if (diff >= 0.25 && diff < 0.75) stars.push(halfStar);
        else stars.push(fullStar);
      } else stars.push(emptyStar);
    }
    return stars.map((star) => (
      <Image src={star} alt="rating star" className="w-4 h-4 mr-1" />
    ));
  };
  return <div className="flex items-center">{renderStars()}</div>;
}
