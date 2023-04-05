import React from 'react';
import {FilePond, registerPlugin} from "react-filepond";
import styles from "./dragAndDrop.module.scss"
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginImageEdit from "filepond-plugin-image-edit";
import {FilePondFile} from "filepond";

registerPlugin(
    FilePondPluginFileValidateType,
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginImageCrop,
    FilePondPluginImageResize,
    FilePondPluginImageTransform,
    FilePondPluginImageEdit
);

type DragAndDropProps = {
    image: Array<any>,
    setImage: Function,
    editor: object,
    filePondRef: React.RefObject<any>,
    avatar?: boolean
}

const DragAndDrop = ({image, setImage, editor, filePondRef, avatar}: DragAndDropProps) => {
    return (
        <div>
            <div className={styles.dragAndDropWrapper}>
                <FilePond
                    ref={filePondRef}
                    files={image}
                    //@ts-ignore
                    onupdatefiles={setImage}
                    allowMultiple={false}
                    maxFiles={1}
                    name="files"
                    labelIdle={`Drag & Drop your picture or <span class="filepond--label-action">Browse</span>`}
                    imagePreviewHeight={250}
                    imageCropAspectRatio='1:1'
                    imageResizeTargetWidth={300}
                    imageResizeTargetHeight={300}
                    stylePanelLayout={avatar ? 'compact circle' : 'compact'}
                    styleLoadIndicatorPosition='center bottom'
                    styleProgressIndicatorPosition='right bottom'
                    styleButtonRemoveItemPosition='left bottom'
                    styleButtonProcessItemPosition='right bottom'
                    imageEditEditor={editor}
                    allowImageEdit={true}
                />
            </div>

        </div>
    );
};

export default DragAndDrop;
