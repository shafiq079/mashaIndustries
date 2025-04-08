const axios = require('axios');

// Function to handle virtual try-on using URLs
const tryOnImage = async (req, res) => {
    try {
        const { person_image_url, garment_image_url } = req.body;

        if (!person_image_url || !garment_image_url) {
            return res.status(400).json({ message: 'Both image URLs are required' });
        }

        // Set up the data as required by the API
        const data = JSON.stringify({
            person_image_url,
            garment_image_url,
        });

        // Configure the API request
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.developer.pixelcut.ai/v1/try-on',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-API-KEY': 'sk_2ec215a6bbc746138e2402c95ff5dd51',
            },
            data: data,
        };

        // Send the API request
        const response = await axios.request(config);

        if (response.data) {
            return res.status(200).json({ result_url: response.data.result_url });
        } else {
            return res.status(500).json({ message: 'Try-on failed', error: response.data.message });
        }
    } catch (error) {
        console.error('Error during try-on:', error.message);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    tryOnImage,
};
