import React from 'react';
import EditableImagePreview from './EditableImagePreview';

const EditableImagesPreviews = (props) => {

	const { images, setImages } = props;

	if (!images?.length) return <div className="mb-3 mt-2">
		<p> No images in gallery </p>
	</div>

	return <>
		<div className="container my-3 px-0">
			<p>Gallery</p>
			<div className="row">
				{
					images.map((image, i) =>
						<div className="col-4" key={`prev-${i}`}>
							<EditableImagePreview
								imageId={image.id}
								images={images}
								setImages={setImages}
							/>
						</div>
					)
				}
			</div>
		</div>
	</>
}

export default EditableImagesPreviews;