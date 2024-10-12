// dashboard/src/components/SliderPage.js
import React, { useEffect, useState } from 'react';
import {
    getAllSliders,
    createSlider,
    updateSliderById,
    deleteSliderById,
} from '../utils/sliderApi';
import './Slider.css'; // Import the CSS file

const SliderPage = () => {
    const [sliders, setSliders] = useState([]);
    const [sliderData, setSliderData] = useState({ title: '', type: '', media: null });
    const [editingSliderId, setEditingSliderId] = useState(null);

    useEffect(() => {
        fetchSliders();
    }, []);

    const fetchSliders = async () => {
        try {
            const data = await getAllSliders();
            setSliders(data);
        } catch (error) {
            console.error('Error fetching sliders:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSliderData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e) => {
        setSliderData((prevData) => ({ ...prevData, media: e.target.files[0] }));
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            setSliderData((prevData) => ({ ...prevData, media: files[0] }));
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingSliderId) {
            await updateSlider();
        } else {
            await createNewSlider();
        }
        resetForm();
        fetchSliders();
    };

    const createNewSlider = async () => {
        try {
            await createSlider(sliderData);
        } catch (error) {
            console.error('Error creating slider:', error);
        }
    };

    const updateSlider = async () => {
        try {
            await updateSliderById(editingSliderId, sliderData);
        } catch (error) {
            console.error('Error updating slider:', error);
        }
    };

    const handleEdit = (slider) => {
        setSliderData({ title: slider.title, type: slider.type, media: null });
        setEditingSliderId(slider.id);
    };

    const handleDelete = async (sliderId) => {
        try {
            await deleteSliderById(sliderId);
            fetchSliders();
        } catch (error) {
            console.error('Error deleting slider:', error);
        }
    };

    const resetForm = () => {
        setSliderData({ title: '', type: '', media: null });
        setEditingSliderId(null);
    };

    return (
        <div className="slider-management">
            <h1>Slider Management</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Slider Title"
                    value={sliderData.title}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                />
                <select
                    name="type"
                    value={sliderData.type}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                >
                    <option value="">Select Type</option>
                    <option value="project">Project</option>
                    <option value="home">Home</option>
                </select>
                <div
                    className="dropzone"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    {sliderData.media ? (
                        <p>{sliderData.media.name}</p>
                    ) : (
                        <p>Drag and drop an image or click to select</p>
                    )}
                    <input
                        type="file"
                        name="media"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        accept="image/*,video/*"
                    />
                </div>
                <button type="submit" className="create-button">{editingSliderId ? 'Update Slider' : 'Create Slider'}</button>
                <button type="button" onClick={resetForm} className="cancel-button">Cancel</button>
            </form>

            <h2>Existing Sliders</h2>
            <ul className="sliders-table">
                {sliders.map((slider) => (
                    <li key={slider.id}>
                        <h3>{slider.title}</h3>
                        <p>Type: {slider.type}</p>
                        <button onClick={() => handleEdit(slider)} className="edit-button">Edit</button>
                        <button onClick={() => handleDelete(slider.id)} className="delete-button">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SliderPage;
