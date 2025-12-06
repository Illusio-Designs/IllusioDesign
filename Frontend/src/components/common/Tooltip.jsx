'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import '@/styles/components/common/Tooltip.css';

export default function Tooltip({ children, text, position = 'top' }) {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState({});
  const wrapperRef = useRef(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (isVisible && wrapperRef.current) {
      const updatePosition = () => {
        if (!wrapperRef.current) return;
        
        const wrapperRect = wrapperRef.current.getBoundingClientRect();
        
        let top = 0;
        let left = 0;

        // Estimate tooltip size (will be adjusted after render)
        const estimatedHeight = 32;
        const estimatedWidth = text.length * 7 + 24; // Rough estimate

        switch (position) {
          case 'right':
            top = wrapperRect.top + (wrapperRect.height / 2) - (estimatedHeight / 2);
            left = wrapperRect.right + 8;
            break;
          case 'left':
            top = wrapperRect.top + (wrapperRect.height / 2) - (estimatedHeight / 2);
            left = wrapperRect.left - estimatedWidth - 8;
            break;
          case 'bottom':
            top = wrapperRect.bottom + 8;
            left = wrapperRect.left + (wrapperRect.width / 2) - (estimatedWidth / 2);
            break;
          case 'top':
          default:
            top = wrapperRect.top - estimatedHeight - 8;
            left = wrapperRect.left + (wrapperRect.width / 2) - (estimatedWidth / 2);
            break;
        }

        setTooltipStyle({ top: `${top}px`, left: `${left}px` });
        
        // Fine-tune position after tooltip is rendered
        if (tooltipRef.current) {
          requestAnimationFrame(() => {
            if (!wrapperRef.current || !tooltipRef.current) return;
            const tooltipRect = tooltipRef.current.getBoundingClientRect();
            const finalWrapperRect = wrapperRef.current.getBoundingClientRect();
            
            let finalTop = top;
            let finalLeft = left;
            
            switch (position) {
              case 'right':
                finalTop = finalWrapperRect.top + (finalWrapperRect.height / 2) - (tooltipRect.height / 2);
                finalLeft = finalWrapperRect.right + 8;
                break;
              case 'left':
                finalTop = finalWrapperRect.top + (finalWrapperRect.height / 2) - (tooltipRect.height / 2);
                finalLeft = finalWrapperRect.left - tooltipRect.width - 8;
                break;
              case 'bottom':
                finalTop = finalWrapperRect.bottom + 8;
                finalLeft = finalWrapperRect.left + (finalWrapperRect.width / 2) - (tooltipRect.width / 2);
                break;
              case 'top':
              default:
                finalTop = finalWrapperRect.top - tooltipRect.height - 8;
                finalLeft = finalWrapperRect.left + (finalWrapperRect.width / 2) - (tooltipRect.width / 2);
                break;
            }
            
            setTooltipStyle({ top: `${finalTop}px`, left: `${finalLeft}px` });
          });
        }
      };

      // Initial position calculation
      updatePosition();
      
      // Update on scroll/resize
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
      
      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [isVisible, position, text]);

  if (!text) return children;

  return (
    <>
      <div 
        ref={wrapperRef}
        className="tooltip-wrapper"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && typeof window !== 'undefined' && createPortal(
        <div 
          ref={tooltipRef}
          className={`tooltip tooltip-${position} tooltip-portal`}
          style={tooltipStyle}
        >
          {text}
        </div>,
        document.body
      )}
    </>
  );
}

