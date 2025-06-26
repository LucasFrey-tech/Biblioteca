import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/dragAndDrop.module.css';
import Swal from 'sweetalert2';

interface Props {
  onFileDrop: (file: File) => void;
}

const DragAndDrop: React.FC<Props> = ({ onFileDrop }) => {
  const [previewFile, setPreviewFile] = useState<File | null>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setPreviewFile(file); // guardar para mostrar
      onFileDrop(file);     // avisar al padre
    }
  }, [onFileDrop]);

  const preventDefaults = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      className={styles.dropZone}
      onDrop={handleDrop}
      onDragOver={preventDefaults}
      onDragEnter={preventDefaults}
      onDragLeave={preventDefaults}
    >
      {!previewFile && <p>Arrastra una imagen aquí</p>}

      {previewFile && (
        <div className={styles.preview}>
          <p><strong>{previewFile.name}</strong></p>
            <Image
              src={URL.createObjectURL(previewFile)}
              alt="preview"
              className={styles.previewImage}
              width={200}
              height={200}
              unoptimized
            />
        </div>
      )}
    </div>
  );
};

export default DragAndDrop;

