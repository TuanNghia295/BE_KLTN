import axios from 'axios';

//Hàm phân loại tỉnh/thành phố theo miền
//  API key của Goong.io
const GOONG_API_KEY = 'VPm5NokrnVUxZcWC3tWKf6ImVSweqe3pPyq47U5S';

// Hàm chuyển đổi địa chỉ thành tọa độ bằng Goong Geocoding API
const geocodeAddress = async (address) => {
  try {
    const response = await axios.get('https://rsapi.goong.io/Geocode', {
      params: {
        address: address,
        api_key: GOONG_API_KEY,
      },
    });

    if (response.data.results && response.data.results.length > 0) {
      const location = response.data.results[0].geometry.location;
      return { lat: location.lat, lng: location.lng };
    } else {
      throw new Error('Không tìm thấy địa chỉ');
    }
  } catch (error) {
    console.error('Lỗi khi geocode địa chỉ:', error);
    throw error;
  }
};

// Hàm tính khoảng cách bằng Goong Distance Matrix API
const calculateDistance = async (origin, destination) => {
  try {
    const response = await axios.get('https://rsapi.goong.io/DistanceMatrix', {
      params: {
        origins: `${origin.lat},${origin.lng}`,
        destinations: `${destination.lat},${destination.lng}`,
        vehicle: 'car', // Loại phương tiện (có thể thay đổi)
        api_key: GOONG_API_KEY,
      },
    });

    if (response.data.rows && response.data.rows.length > 0) {
      const distance = response.data.rows[0].elements[0].distance.value; // Khoảng cách tính bằng mét
      return distance / 1000; // Chuyển đổi sang km
    } else {
      throw new Error('Không thể tính khoảng cách');
    }
  } catch (error) {
    console.error('Lỗi khi tính khoảng cách:', error);
    throw error;
  }
};

// Hàm tính phí vận chuyển dựa trên khoảng cách và trọng lượng
const calculateShippingFee = (weight, distance) => {
  // Giả sử phí vận chuyển là 10,000 VNĐ/km cho mỗi kg
  const baseRate = 10000; // Phí cơ bản cho mỗi km
  return weight * distance * baseRate;
};

// API endpoint để tính phí vận chuyển
export const shippingFee = async (req, res) => {
  const { weight, fromAddress, toAddress, isReturn } = req.body;

  try {
    // Chuyển đổi địa chỉ thành tọa độ
    const fromLocation = await geocodeAddress(fromAddress);
    const toLocation = await geocodeAddress(toAddress);

    // Tính khoảng cách giữa hai điểm
    const distance = await calculateDistance(fromLocation, toLocation);

    // Tính toán phí vận chuyển
    let totalFee = calculateShippingFee(weight, distance);

    // Tính phí trả hàng (nếu có)
    if (isReturn) {
      totalFee *= 1.5; // Tăng 50% phí vận chuyển nếu có trả hàng
    }

    res.json({ totalFee, distance: `${distance.toFixed(2)} km` });
  } catch (error) {
    console.error('Lỗi:', error);
    res.status(500).json({ error: 'Lỗi khi tính toán phí vận chuyển' });
  }
};
