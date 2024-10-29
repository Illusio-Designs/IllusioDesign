import React, { useEffect, useState } from 'react';
import { listProjects, createProject, deleteProject, updateProject } from '../services/projectApi'; // Import the API functions
import QuillEditor from '../components/QuillEditor'; // Import the QuillEditor component
import DOMPurify from 'dompurify'; // Import DOMPurify for sanitizing HTML

const Project = () => {
  const [projects, setProjects] = useState([]); // State to hold the list of projects
  const [newProject, setNewProject] = useState({
    title: '',
    content: '',
    year: '',
    timeline: '',
    services: '',
    industry: '',
    website: '',
    slug: '',
    projectimage: null,
    meta_description: '',
    meta_keywords: '',
    canonical_url: '',
    focus_keyword: '',
    image_alt_text: ''
  }); // State for new project form
  const [showForm, setShowForm] = useState(false); // State to toggle the form visibility
  const [isEditing, setIsEditing] = useState(false); // State to check if we are in editing mode
  const [editProjectId, setEditProjectId] = useState(null); // Store project ID for editing

  // Fetch the list of projects when the component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await listProjects();
        setProjects(response); // Set the projects state with the fetched data
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  // Handle input changes for other form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  // Handle content change from QuillEditor
  const handleContentChange = (content) => {
    setNewProject((prev) => ({ ...prev, content }));
  };

  // Handle file input change for image upload
  const handleFileChange = (e) => {
    setNewProject((prev) => ({ ...prev, projectimage: e.target.files[0] })); // Store the file object
  };

  // Handle form submission to create or update a project
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(); // Create a FormData object to handle file uploads

    // Append project data to FormData except for the image if it hasn't been changed
    for (const key in newProject) {
      if (key !== 'projectimage') {
        formData.append(key, newProject[key]);
      }
    }

    // Only append the image if it's present (i.e., the user has uploaded a new one)
    if (newProject.projectimage) {
      formData.append('projectimage', newProject.projectimage); // Append the image file
    }

    try {
      if (isEditing) {
        await updateProject(editProjectId, formData); // Call update API if editing
        setProjects((prev) =>
          prev.map((proj) =>
            proj.id === editProjectId ? { ...proj, ...newProject } : proj
          )
        ); // Update the project list
        setIsEditing(false); // Reset editing state
      } else {
        const createdProject = await createProject(formData); // Send FormData to the API
        setProjects((prev) => [...prev, createdProject]); // Add the new project to the list
      }

      // Reset the form after submission
      setNewProject({
        title: '',
        content: '',
        year: '',
        timeline: '',
        services: '',
        industry: '',
        website: '',
        slug: '',
        projectimage: null,
        meta_description: '',
        meta_keywords: '',
        canonical_url: '',
        focus_keyword: '',
        image_alt_text: ''
      });
      setShowForm(false); // Hide the form after submission
    } catch (error) {
      console.error('Error submitting project:', error);
    }
  };

  // Handle edit button click
  const handleEdit = (project) => {
    console.log('Editing project:', project);
    setIsEditing(true);
    setEditProjectId(project.id); // Set project ID for editing
    setNewProject({
      title: project.title,
      content: project.content,
      year: project.year,
      timeline: project.timeline,
      services: project.services,
      industry: project.industry,
      website: project.website,
      slug: project.slug,
      projectimage: null, // Reset the image for editing
      meta_description: project.meta_description || '',
      meta_keywords: project.meta_keywords || '',
      canonical_url: project.canonical_url || '',
      focus_keyword: project.focus_keyword || '',
      image_alt_text: project.image_alt_text || ''
    });
    setShowForm(true); // Show the form in edit mode
  };

  // Handle delete button click
  const handleDelete = async (projectId) => {
    try {
      await deleteProject(projectId); // Call the API to delete the project
      setProjects((prev) => prev.filter((project) => project.id !== projectId)); // Remove the deleted project from the list
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div>
      <h1>Project Management</h1>
      <button onClick={() => setShowForm(true)}>Add New Project</button>

      {showForm && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={newProject.title}
            onChange={handleInputChange}
            required
          />
          <QuillEditor
            name="content"
            placeholder="Project Content"
            value={newProject.content}
            onChange={handleContentChange}
            required
          />
          <input
            type="text"
            name="year"
            placeholder="Year"
            value={newProject.year}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="timeline"
            placeholder="Timeline"
            value={newProject.timeline}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="services"
            placeholder="Services"
            value={newProject.services}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="slug"
            placeholder="Slug"
            value={newProject.slug}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="industry"
            placeholder="Industry"
            value={newProject.industry}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="website"
            placeholder="Website"
            value={newProject.website}
            onChange={handleInputChange}
            required
          />

          {/* Image Upload */}
          <input
            type="file"
            name="projectimage"
            onChange={handleFileChange}
            accept="image/*"
          />

          {/* SEO Fields */}
          <input
            type="text"
            name="meta_description"
            placeholder="Meta Description"
            value={newProject.meta_description}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="meta_keywords"
            placeholder="Meta Keywords"
            value={newProject.meta_keywords}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="canonical_url"
            placeholder="Canonical URL"
            value={newProject.canonical_url}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="focus_keyword"
            placeholder="Focus Keyword"
            value={newProject.focus_keyword}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="image_alt_text"
            placeholder="Image Alt Text"
            value={newProject.image_alt_text}
            onChange={handleInputChange}
          />

          <button type="submit">{isEditing ? 'Update' : 'Create'} Project</button>
        </form>
      )}

      {/* Project List */}
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <h2>{project.title}</h2>
            {/* Use dangerouslySetInnerHTML to render HTML content */}
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project.content) }} />
            <button onClick={() => handleEdit(project)}>Edit</button>
            <button onClick={() => handleDelete(project.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Project;
