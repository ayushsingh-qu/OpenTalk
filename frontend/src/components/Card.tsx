import { Clock } from "lucide-react";
import { Link } from "react-router";

interface CardData {
  id: string;
  name: string;
  title: string;
  content: string;
  imageUrl?: string | null;
}

const Card = ({ id, name, title, content, imageUrl }: CardData) => {
  const readTime = Math.max(1, Math.round(content.length / 500));

  return (
    <Link to={`/blog/${id}`} className="block group">
      <div className="px-6 py-5 my-2 shadow-2xl rounded-2xl bg-(--bg-card) text-(--text-body) border border-stone-800 transition-all duration-300 group-hover:border-amber-400/40 group-hover:shadow-amber-900/20 group-hover:translate-y-0.5">
        <div className="flex flex-col-reverse sm:flex-row gap-5 items-start justify-between">
          <div className="flex-1 min-w-0">
            {/* Author row */}
            <div className="flex gap-3 justify-start items-center py-2 text-(--primary-color) font-semibold">
              <div className="rounded-full ring ring-(--primary-color)/60 bg-(--primary-color)/10 flex items-center justify-center w-8 h-8 text-sm font-bold shrink-0">
                {name[0].toUpperCase()}
              </div>
              <span className="text-sm">{name}</span>
            </div>

            {/* Title */}
            <h2 className="text-xl text-(--text-main) font-bold pt-2 pb-1 group-hover:text-amber-400 transition-colors duration-200 line-clamp-2">
              {title}
            </h2>

            {/* Excerpt */}
            <p className="text-sm leading-relaxed line-clamp-3 mt-1">
              {content.slice(0, 200)}…
            </p>

            {/* Footer */}
            <div className="flex items-center gap-2 text-xs mt-4 text-(--primary-color)/60">
              <Clock size={12} />
              <span>{readTime} min read</span>
            </div>
          </div>

          {/* Optional Blog Image */}
          {imageUrl && (
            <div className="w-full sm:w-44 sm:h-32 h-44 shrink-0 overflow-hidden rounded-xl border border-stone-800 bg-stone-900">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Card;
