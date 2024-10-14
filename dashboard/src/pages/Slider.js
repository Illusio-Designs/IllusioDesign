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
                console.log('Fetched Sliders:', data);
                setSliders(data);
            } catch (err) {
                console.error('Error fetching sliders:', err);
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
        setNewSlider({
            title: '',
            type: '',
            media: null,
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewSlider((prev) => ({ ...prev, [name]: value }));
    };

    const handleDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        console.log('Dropped File:', file);
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
    
            // Logging form data values to check if they are correct
            console.log("Title:", newSlider.title);
            console.log("Type:", newSlider.type);
            console.log("Media:", newSlider.media);
    
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
            console.error("Error Saving Slider:", err);
            console.error("Full Error Object:", err.response);  // Log full error response for debugging
            setError(err.response?.data?.error || 'Failed to save slider.');
        }
    };
    

    const handleEdit = (slider) => {
        console.log('Editing Slider:', slider);
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
            console.log('Deleting Slider ID:', sliderId);
            await deleteSliderById(sliderId);
            setSliders((prev) => prev.filter((slider) => slider.id !== sliderId));
            setSuccess('Slider deleted successfully!');
        } catch (err) {
            console.error('Error Deleting Slider:', err.response?.data || err.message);
            setError(err.response?.data?.error || 'Failed to delete slider.');
        }
    };

    return (
        <div className="slider-management">
            <h2>Slider Management</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <button onClick={openModal} className="create-button">
                Create New Slider
            </button>

            <h3>Existing Sliders</h3>
            <table className="sliders-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sliders.map((slider) => (
                        <tr key={slider.id}>
                            <td>{slider.title}</td>
                            <td>{slider.type}</td>
                            <td>
                                <button onClick={() => handleEdit(slider)} className="edit-button">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(slider.id)} className="delete-button">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Slider Modal"
                className="slider-modal"
                overlayClassName="slider-modal-overlay"
            >
                <h2>{editSliderId ? 'Edit Slider' : 'Create New Slider'}</h2>
                <form onSubmit={handleSubmit} className="slider-form" encType="multipart/form-data">
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={newSlider.title}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                    <select
                        name="type"
                        value={newSlider.type}
                        onChange={handleChange}
                        required
                        className="form-input"
                    >
                        <option value="">Select Type</option>
                        <option value="project">Project</option>
                        <option value="home">Home</option>
                    </select>

                    <div {...getRootProps()} className="dropzone">
                        <input {...getInputProps()} />
                        <p>Drag & drop an image, or click to select one</p>
                    </div>

                    <button type="submit" className="submit-button">
                        {editSliderId ? 'Update' : 'Create'}
                    </button>
                    <button type="button" onClick={closeModal} className="cancel-button">
                        Cancel
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default SliderPage;
