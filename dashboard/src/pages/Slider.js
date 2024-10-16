import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import {
    getAllSliders,
    createSlider,
    updateSliderById,
    deleteSliderById,
} from '../utils/sliderApi';
import { useDropzone } from 'react-dropzone';
import './Slider.css';

Modal.setAppElement('#root');

const SliderPage = () => {
    const [sliders, setSliders] = useState([]);
    const [newSlider, setNewSlider] = useState({
        title: '',
        type: '',
        media: null,
    });
    const [editSliderId, setEditSliderId] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchSliders = async () => {
            try {
                const data = await getAllSliders();
                setSliders(data);
            } catch (err) {
                setError('Failed to fetch sliders.');
            }
        };
        fetchSliders();
    }, []);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setEditSliderId(null);
        setNewSlider({ title: '', type: '', media: null });
        setError('');
        setSuccess('');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewSlider((prev) => ({ ...prev, [name]: value }));
    };

    const handleDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        setNewSlider((prev) => ({ ...prev, media: file }));
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!newSlider.media) {
            setError('No file uploaded');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('image', newSlider.media);
            formData.append('title', newSlider.title);
            formData.append('type', newSlider.type);

            let slider;
            if (editSliderId) {
                slider = await updateSliderById(editSliderId, formData);
                setSliders((prev) => prev.map((s) => (s.id === editSliderId ? slider : s)));
                setSuccess('Slider updated successfully!');
            } else {
                slider = await createSlider(formData);
                setSliders((prev) => [...prev, slider]);
                setSuccess('Slider created successfully!');
            }
            closeModal();
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to save slider.');
        }
    };

    const handleEdit = (slider) => {
        setNewSlider({
            title: slider.title,
            type: slider.type,
            media: null,
        });
        setEditSliderId(slider.id);
        openModal();
    };

    const handleDelete = async (sliderId) => {
        try {
            await deleteSliderById(sliderId);
            setSliders((prev) => prev.filter((slider) => slider.id !== sliderId));
            setSuccess('Slider deleted successfully!');
        } catch (err) {
            setError('Failed to delete slider.');
        }
    };

    return (
        <div className="slider-container">
            <h1>Slider Management</h1>
            <button className="create-button" onClick={openModal}>Add Slider</button>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <ul className="sliders-table">
                {sliders.map((slider) => (
                    <li key={slider.id}>
                        <h2>{slider.title}</h2>
                        <div className="slider-buttons">
                            <button className="edit-button" onClick={() => handleEdit(slider)}>Edit</button>
                            <button className="delete-button" onClick={() => handleDelete(slider.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="slider-modal" overlayClassName="slider-modal-overlay">
                <h2>{editSliderId ? 'Edit Slider' : 'Add Slider'}</h2>
                <form onSubmit={handleSubmit} className="slider-form">
                    <div>
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={newSlider.title}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </div>
                    <div>
                        <label>Type:</label>
                        <select name="type" value={newSlider.type} onChange={handleChange} required className="form-input">
                            <option value="">Select Type</option>
                            <option value="project">Project</option>
                            <option value="home">Home</option>
                        </select>
                    </div>
                    <div {...getRootProps()} className="dropzone">
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop a file here, or click to select a file</p>
                    </div>
                    {newSlider.media && <p>File: {newSlider.media.name}</p>}
                    <div className="form-buttons">
                        <button type="submit" className="submit-button">{editSliderId ? 'Update' : 'Create'}</button>
                        <button type="button" className="cancel-button" onClick={closeModal}>Cancel</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default SliderPage;
