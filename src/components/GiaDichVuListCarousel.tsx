import React, { useState, useEffect, useRef } from 'react';
import { GiaDichVu } from '../interface/InterfaceCommon';
import '../static/css/giadichvulistcarousel.scss';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Itemgiadichvu from './Itemgiadichvu';

interface GiaDichVuListCarouselProps {
    items: GiaDichVu[];
    onItemClick?: (item: GiaDichVu) => void;
    imageBaseUrl?: string;
}

const GiaDichVuListCarousel: React.FC<GiaDichVuListCarouselProps> = ({
    items,
    onItemClick,
    imageBaseUrl = '',
}) => {
    const [visibleSlides, setVisibleSlides] = useState(2); // 👉 cố định 2 item
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const trackRef = useRef<HTMLDivElement>(null);

    // 👉 Không cần resize nữa, nên bỏ đoạn này
    useEffect(() => {
        const updateVisibleSlides = () => {
            const width = window.innerWidth;
            if (width <= 768) {
                setVisibleSlides(1);
            } else if (width <= 1024) {
                setVisibleSlides(1);
            } else {
                setVisibleSlides(2);
            }
        };

        updateVisibleSlides();
        window.addEventListener('resize', updateVisibleSlides);
        return () => window.removeEventListener('resize', updateVisibleSlides);
    }, []);

    const clonedHead = items.slice(-visibleSlides);
    const clonedTail = items.slice(0, visibleSlides);
    const allItems = [...clonedHead, ...items, ...clonedTail];

    useEffect(() => {
        setCurrentIndex(visibleSlides);
    }, [visibleSlides, items]);

    const next = () => {
        setCurrentIndex((prev) => prev + 1);
        setIsTransitioning(true);
    };

    const prev = () => {
        setCurrentIndex((prev) => prev - 1);
        setIsTransitioning(true);
    };

    const handleTransitionEnd = () => {
        if (currentIndex >= items.length + visibleSlides) {
            setIsTransitioning(false);
            setCurrentIndex(visibleSlides);
        }
        if (currentIndex < visibleSlides) {
            setIsTransitioning(false);
            setCurrentIndex(items.length + visibleSlides - 1);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            next();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!isTransitioning) {
            const timeout = setTimeout(() => {
                setIsTransitioning(true);
            }, 20);
            return () => clearTimeout(timeout);
        }
    }, [isTransitioning]);

    return (
        <div className="custom-carousel">
            <div className="carousel-wrapper">
                <div className="carousel-track-wrapper">
                    <button className="nav-btn prev" onClick={prev}>
                        <FiChevronLeft size={24} />
                    </button>
                    <div
                        ref={trackRef}
                        className="carousel-track"
                        style={{
                            width: `${(allItems.length / visibleSlides) * 100}%`,
                            display: 'flex',
                            transform: `translateX(-${(100 / allItems.length) * currentIndex}%)`,
                            transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none',
                        }}
                        onTransitionEnd={handleTransitionEnd}
                    >
                        {allItems.map((item, index) => (
                            <div
                                key={index}
                                className="carousel-slide"
                                style={{ width: `${100 / allItems.length}%` }}
                                onClick={() => onItemClick?.(item)}
                            >
                                <Link
                                    to={`/gia-dich-vu/detail/${item.id}`}
                                    state={{ giadichvuItem: item }}
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                    onClick={() => window.scrollTo(0, 0)}
                                >
                                    <Itemgiadichvu
                                        name={item.title}
                                        desc={item.content}
                                        img={`${imageBaseUrl}/${item.image}`}
                                        pdfurl={item.pdfurl}
                                    />
                                </Link>
                            </div>
                        ))}
                    </div>
                    <button className="nav-btn next" onClick={next}>
                        <FiChevronRight size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GiaDichVuListCarousel;
