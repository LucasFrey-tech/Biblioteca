import React, { useCallback, useEffect, useState } from 'react';
import styles from '../../styles/dragAndDrop.module.css';
import Swal from 'sweetalert2';

interface Props {
  defaultFile: string | File | null;
  onSetCurrentFile: (file: File) => void;
  validFormats: string[]
}

const DragAndDropFile: React.FC<Props> = ({defaultFile, onSetCurrentFile, validFormats }) => {
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [firstTime, setFirstTime] = useState<boolean>(true)
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      if (!validFormats.some(format => file.name.endsWith(format))) {
        Swal.fire("Error", "Solo se acepta archivos: "+validFormats, "error");
        return
      }
      setPreviewFile(file); // guardar para mostrar
      onSetCurrentFile(file);     // avisar al padre
    }
  }, [onSetCurrentFile]);

  const preventDefaults = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    if(firstTime){
      setFirstTime(false);
      if (defaultFile instanceof File) {
        setPreviewFile(defaultFile);
      } else if(typeof defaultFile === "string"){
        setPreviewFile(new File([""], defaultFile));
      }
    }
  },[])

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
          <p><strong>{previewFile.name.substring(previewFile.name.lastIndexOf('/')+1)}</strong></p>
        </div>
      )}
    </div>
  );
};

export default DragAndDropFile;

