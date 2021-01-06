import React from 'react';
import ImagePreview from './ImagePreview';

const ImagesPreviews = ({ images, setImages }) => {

	if (!images?.length) return <div className="mb-3 mt-2">
		<h3> No images in gallery </h3>
	</div>

	return <>
		<div className="container my-3">
			<h3>Gallery</h3>
			<div className="row">
				{
					images.map((image, i) =>
						<div className="col-6" key={`prev-${i}`}>
							<ImagePreview images={images} image={image} setImages={setImages} />
						</div>
					)
				}
			</div>
		</div>
	</>
}

export default ImagesPreviews;