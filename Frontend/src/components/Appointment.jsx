import React, { useState } from 'react';
import { createPublicAppointment } from '../utils/api';
import './Appointment.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const Appointment = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobileNo: '',
        country: 'in', // Default country code
        budget: '',
        message: '',
        appointmentDate: new Date().toISOString().slice(0, 10),
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePhoneChange = (phone, countryData) => {
        console.log('Phone:', phone); // Log the phone number
        console.log('Country Data:', countryData); // Log country data to check values
        console.log('Country ISO2:', countryData.iso2); // Log the ISO2 code specifically
        setFormData((prev) => ({
            ...prev,
            mobileNo: phone,
            country: countryData.iso2 || 'in', // Capture the country code (ISO 3166-1 alpha-2), default to 'in' if undefined
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData); // Log the form data to check values
        try {
            await createPublicAppointment(formData); // Ensure formData includes country
            alert('Appointment created successfully!');
            setFormData({
                fullName: '',
                email: '',
                mobileNo: '',
                country: 'in', // Reset to default country code
                budget: '',
                message: '',
                appointmentDate: new Date().toISOString().slice(0, 10),
            });
        } catch (error) {
            console.error('Error creating appointment:', error);
            alert('Failed to create appointment. Please try again.');
        }
    };

    return (
        <section id="discuss" className="discuss-section mod--discuss text-white">
      <div className="container mod--discuss">
        <div className="discuss-card">
          <div className="discuss__text-wrap">
            <div className="heading-3 is--h4-mobile">
              Ready to discuss<br />your project with us?
            </div>
            <div className="discuss__text">
              Let’s talk about how we can craft a user experience that not only looks great but drives real growth for your product.
            </div>
          </div>
        </div>
        <div className="container">
          <div data-swiper="runawards" className="swiper mod--runawards">
            <div className="swiper-wrapper mod--runawards">
              <div className="swiper-slide mod--runawards">
                <img src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/66e0344627580704633cecfb_award-color-clutch.svg" loading="lazy" alt="" className="runawards__img" />
                <div className="runawards__text">4.9 AVG. SCORE<br />Based on 80+ reviews</div>
              </div>
              <div className="swiper-slide mod--runawards">
                <img src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/66d9d649ca478502f2b11fc1_award-color-upwork.svg" loading="lazy" alt="" className="runawards__img" />
                <div className="runawards__text">TOP RATED COMPANY <br />with 100% Job Success</div>
              </div>
              <div className="swiper-slide mod--runawards">
                <img src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/66d9d649c65781f52fc3f9ff_award-color-sortlist.svg" loading="lazy" alt="" className="runawards__img" />
                <div className="runawards__text">FEATURED Web Design<br />AgencY IN UAE</div>
              </div>
              <div className="swiper-slide mod--runawards">
                <img src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/66e41801230bc5baa05c898b_award-color-dribbble.svg" loading="lazy " alt="" className="runawards__img" />
                <div className="runawards__text">TOP DESIGN AGENCY<br />WORLDWIDE</div>
              </div>
            </div>
          </div>
          <div className="discuss__bg-wrap">
            <img className="discuss__bg-spin" src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/67333c3b3a53afcafb3be763_bg-discuss.avif" alt="" decoding="async" sizes="100vw" loading="lazy" srcSet="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/67333c3b3a53afcafb3be763_bg-discuss-p-500.avif 500w, https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/67333c3b3a53afcafb3be763_bg-discuss-p-800.avif 800w, https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/67333c3b3a53afcafb3be763_bg-discuss-p-1080.avif 1080w, https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/67333c3b3a53afcafb3be763_bg-discuss.avif 3474w" />
          </div>
        </div>
      </div>
    </section>
    );
};

export default Appointment;
