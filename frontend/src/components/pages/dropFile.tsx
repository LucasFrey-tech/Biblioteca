import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/dragAndDrop.module.css';
import Swal from 'sweetalert2';

interface Props {
  id: number;
  onFileDrop: (id: number, file: File) => void;
  validFormats: string[]
}

const DragAndDropFile: React.FC<Props> = ({id, onFileDrop, validFormats }) => {
  const [previewFile, setPreviewFile] = useState<File | null>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      if (!validFormats.some(format => file.name.endsWith(format))) {
        Swal.fire("Error", "Solo se acepta archivos: "+validFormats, "error");
        return
      }
      setPreviewFile(file); // guardar para mostrar
      onFileDrop(id,file);     // avisar al padre
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
      {!previewFile && <p>Arrastra una archivo aquí</p>}

      {previewFile && (
        <div className={styles.preview}>
          <p><strong>{previewFile.name}</strong></p>
        </div>
      )}
    </div>
  );
};

export default DragAndDropFile;

