import { useEffect, useRef } from 'react';
// import './HorizontalScrollSection.css';

const HorizontalScrollSection = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const items = [
        { id: 1, title: 'Item 1', color: '#ff6b6b' },
        { id: 2, title: 'Item 2', color: '#4ecdc4' },
        { id: 3, title: 'Item 3', color: '#45b7d1' },
        { id: 4, title: 'Item 4', color: '#96c93d' },
    ];

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let isAnimating = false;
        let scrollAccumulator = 0;
        let hasExited = false; // Cờ để theo dõi trạng thái thoát vùng

        const handleScroll = (e: WheelEvent) => {
            if (isAnimating || hasExited) return;

            const scrollPosition = window.scrollY;
            const containerTop = container.offsetTop;
            const windowHeight = window.innerHeight;

            // Khi scroll trong vùng component
            if (scrollPosition + windowHeight >= containerTop && scrollPosition <= containerTop) {
                e.preventDefault();
                isAnimating = true;

                // Giữ container ở đầu viewport
                window.scrollTo({
                    top: containerTop,
                    behavior: 'instant',
                });

                // Tích lũy scroll từ wheel
                scrollAccumulator += e.deltaY;
                const totalScrollDistance = windowHeight * items.length * 0.5; // Tốc độ scroll ngang
                const progress = Math.min(Math.max(scrollAccumulator / totalScrollDistance, 0), 1);

                // Dịch chuyển ngang
                const itemsContainer = container.querySelector('.items-container') as HTMLElement;
                if (itemsContainer) {
                    const maxTranslate = (items.length - 1) * window.innerWidth;
                    const translateX = progress * maxTranslate;
                    itemsContainer.style.transform = `translateX(-${translateX}px)`;
                }

                // Khi đến item cuối, thoát vùng
                if (progress >= 1) {
                    scrollAccumulator = 0;
                    hasExited = true; // Đánh dấu đã thoát
                    window.scrollTo({
                        top: containerTop + windowHeight,
                        behavior: 'instant',
                    });
                }

                requestAnimationFrame(() => {
                    isAnimating = false;
                });
            }
        };

        container.style.position = 'sticky';
        container.style.top = '0';

        window.addEventListener('wheel', handleScroll, { passive: false });
        return () => window.removeEventListener('wheel', handleScroll);
    }, [items.length]);

    return (
        <div className="scroll-section" ref={containerRef}>
            <div className="items-container">
                {items.map((item) => (
                    <div key={item.id} className="scroll-item" style={{ backgroundColor: item.color }}>
                        <h2>{item.title}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HorizontalScrollSection;