import '@/styles/components/Testimonial.css'

export default function Testimonial({ testimonial, author, role, image }) {
  return (
    <div className="testimonial">
      <div className="testimonial-content">
        <div className="quote-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
          </svg>
        </div>
        <p className="testimonial-text">"{testimonial}"</p>
        <div className="testimonial-author">
          {image && (
            <div className="author-image">
              <img src={image} alt={author} />
            </div>
          )}
          <div className="author-info">
            <h4 className="author-name">{author}</h4>
            <p className="author-role">{role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
