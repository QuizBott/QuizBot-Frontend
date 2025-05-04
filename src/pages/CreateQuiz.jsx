import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/CreateQuiz.module.css';
import api from "../api"
import Loader from '../components/Loader';

function CreateQuiz() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [category, setCategory] = useState('Programming');
    const [numberAttempts, setNumberAttempts] = useState('');
    const [currentTag, setCurrentTag] = useState('');
    const [tags, setTags] = useState([]);
    const [singleAnswerQuestions, setSingleAnswerQuestions] = useState('');
    const [multiAnswerQuestions, setMultiAnswerQuestions] = useState('');
    const [promptText, setPromptText] = useState('');
    const [image, setImage] = useState(null);
    const [documents, setDocuments] = useState([]);

    const [loading, setLoading] = useState(false);


    const handleAddTag = (e) => {
        e.preventDefault();
        if (currentTag && !tags.includes(currentTag)) {
            setTags([...tags, currentTag]);
            setCurrentTag('');
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setImage(file);
            console.log("Image selected:", file.name);
            event.target.value = null;
        }
    };

    const removeImage = () => {
        setImage(null);
    }

    const handleDocumentChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const newFiles = Array.from(event.target.files);
            setDocuments(prevDocs => [...prevDocs, ...newFiles]);
            console.log("Documents selected:", newFiles.map(f => f.name));
            event.target.value = null;
        }
    };

    const removeDocument = (docToRemove) => {
        setDocuments(documents.filter(doc => doc.name !== docToRemove.name));
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);

        const quizData = {
            name: name,
            description: description,
            duration: parseInt(duration, 10) || 0,
            category: category,
            numberAttempts: parseInt(numberAttempts, 10) || 1,
            tags: tags.map(tag => ({ name: tag.startsWith('#') ? tag.substring(1) : tag })),
            singleAnswerQuestions: parseInt(singleAnswerQuestions, 10) || 0,
            multiAnswerQuestions: parseInt(multiAnswerQuestions, 10) || 0,
            promptText: promptText
        };

        const formData = new FormData();

        formData.append('quiz', JSON.stringify(quizData));

        if (image) {
            formData.append('image', image, image.name);
        }

        if (documents.length > 0) {
            formData.append('file', documents[0], documents[0].name);
            if (documents.length > 1) {
                console.warn("Multiple documents selected, but endpoint currently configured for only one ('file'). Sending only the first document.");
            }
        } else {
            console.warn("No document selected for the 'file' part.");
        }



        try {
            const response = await api.post("/quiz/generate/gemini", formData);
            console.log('Quiz generation successful:', response.data);
            navigate("/edit", { state: { data: response.data } });
        } catch (error) {
            setLoading(false);
            if (error.response) {
                console.error('Quiz generation failed:', error.response.status, error.response.statusText, error.response.data);
                alert(`Quiz generation failed: ${error.response.status} ${error.response.statusText}\n${error.response.data}`);
            } else {
                console.error('Network or other error during quiz generation:', error);
                alert(`An error occurred: ${error.message}`);
            }
        }
    };



    return (
        <div className={styles.createQuizContainer}>
            <div className="text-center mb-4">
                <h1 className="fw-bold">Create Quiz</h1>
            </div>
            <form className={styles.quizForm} onSubmit={handleSubmit}>
                {/* Left Column */}
                <div className={`${styles.formColumn} ${styles.formLeftColumn}`}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Quiz Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter quiz name..."
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="category">Category</label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        >
                            <option value="Programming">Programming</option>
                            <option value="Science">Science</option>
                            <option value="Math">History</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="tags">Tags</label>
                        <div className={styles.tagsInputContainer}>
                            <input
                                type="text"
                                id="tags"
                                value={currentTag}
                                onChange={(e) => setCurrentTag(e.target.value)}
                                placeholder="Add a tag..."
                            />
                            <button type="button" onClick={handleAddTag} className={styles.addTagButton}>+</button>
                        </div>
                        <div className={styles.tagsDisplayArea}>
                            {tags.map((tag) => (
                                <span key={tag} className={styles.tagItem}>
                                    {tag}
                                    <button type="button" onClick={() => removeTag(tag)} className={styles.removeTagButton}>×</button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter description..."
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="singleAnswerQuestions">Single-Answer Questions</label>
                        <input
                            type="number"
                            id="singleAnswerQuestions"
                            value={singleAnswerQuestions}
                            onChange={(e) => setSingleAnswerQuestions(e.target.value)}
                            placeholder="Enter number..."
                            min="0"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="multiAnswerQuestions">Multiple-Answer Questions</label>
                        <input
                            type="number"
                            id="multiAnswerQuestions"
                            value={multiAnswerQuestions}
                            onChange={(e) => setMultiAnswerQuestions(e.target.value)}
                            placeholder="Enter number..."
                            min="0"
                            required
                        />
                    </div>

                    <div style={{ display: 'flex', gap: "15px" }}>
                        <div className={styles.formGroup}>
                            <label htmlFor="duration">Duration</label>
                            <input
                                type="number"
                                id="duration"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                placeholder="Enter number..."
                                min="0"
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="numberAttempts">Number of Attempts</label>
                            <input
                                type="number"
                                id="numberAttempts"
                                value={numberAttempts}
                                onChange={(e) => setNumberAttempts(e.target.value)}
                                placeholder="Enter number..."
                                min="0"
                                required
                            />
                        </div>
                    </div>

                </div>

                {/* Right Column */}
                <div className={`${styles.formColumn} ${styles.formRightColumn}`}>
                    <div className={styles.formGroup}>
                        <label htmlFor="imageInput">Quiz Image</label>
                        <div className={`${styles.uploadPlaceholder} ${styles.imagePlaceholder}`} onClick={() => document.getElementById('imageInput').click()}>
                            {image ? (
                                <div className={styles.imagePreviewContainer}>
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt="Quiz Preview"
                                        className={styles.imagePreview}
                                    />
                                    <span className={styles.fileNameDisplay}>{image.name}</span>
                                </div>
                            ) : (
                                <span>Click to upload Image</span>
                            )}
                        </div>
                        <input
                            type="file"
                            id="imageInput"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                        />
                        {image && <button type="button" className={styles.removeFileButton} onClick={removeImage}>Remove Image</button>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="prompt">Prompt</label>
                        <textarea
                            id="prompt"
                            value={promptText}
                            onChange={(e) => setPromptText(e.target.value)}
                            placeholder="Generate easy questions for my students from the documents I sent you..."
                            rows="5"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="documentInput">Add Documents</label>
                        <div className={`${styles.uploadPlaceholder} ${styles.documentPlaceholder}`} onClick={() => document.getElementById('documentInput').click()}>
                            Click to upload Documents (PDF, DOCX, etc.)
                        </div>
                        <input
                            type="file"
                            id="documentInput"
                            multiple
                            accept=".pdf,.doc,.docx,.txt"
                            onChange={handleDocumentChange}
                            style={{ display: 'none' }}
                        />
                        <div className={styles.documentList}>
                            {documents.map((doc, index) => (
                                <div key={index} className={styles.docItem}>
                                    <span>📄 {doc.name}</span>
                                    <button type="button" className={styles.removeDocButton} onClick={() => removeDocument(doc)}>×</button>
                                </div>
                            ))}
                            {documents.length === 0 && (
                                <div className={`${styles.docItem} ${styles.exampleDoc}`}>
                                    <span>📄 Doc1.pdf (Example)</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className={styles.formSubmitArea}>
                    {!loading ? (
                        <button type="submit" className="btn btn-dark px-5 rounded-pill mb-3">
                            Submit
                        </button>
                    ) : (
                        <Loader />
                    )}
                </div>
            </form>
        </div>
    );
}

export default CreateQuiz;