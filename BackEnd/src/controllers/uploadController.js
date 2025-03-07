import cloudinary from '../config/cloudinary.js';

// upload img
export const uploadImg = async (req, res) => {
  const { width, height, img } = req.body;
  try {
    const result = await cloudinary.uploader.upload(
      './images/air-max-90-se-shoes-lZpTQK.png'
    );
    const url = cloudinary.url(result.public_id, {
      transformation: [
        {
          quality: 'auto',
          fetch_format: 'auto',
        },
        {
          width,
          height,
          crop: 'fill',
          gravity: 'auto',
        },
      ],
    });
    console.log('url', url);

    res
      .status(200)
      .json({ message: 'Image uploaded successfully', url: result.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
