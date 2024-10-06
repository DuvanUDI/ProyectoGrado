import React, {useState} from 'react';

const FileUploader = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [isUploaded, setIsUploaded] = useState(false);

    const handleFileChange = () => {
        // Upload file
        //setFile(e.target.files[0]);
    };

    const handleFileUpload = () => {
        if (!file) {
            setError('Please select a file');
            return;
        }

        alert('File uploaded'); // Replace this with actual file upload code.
        setIsUploaded(true);
    };

    return (
        <div>
            <input type="file" accept=".fbx" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Upload</button>
        </div>
    );
};

export default FileUploader;