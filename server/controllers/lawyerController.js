import Lawyer from '../models/Lawyer.js';
import { getCoordinatesFromCity } from '../utils/geoService.js';


// 🔹 Default: Get lawyers from user's current city
export const getLawyersByCity = async (req, res) => {
  const { city } = req.body;

  if (!city) return res.status(400).json({ message: "City is required" });

  try {
    const lawyers = await Lawyer.find({ city: city.trim().toLowerCase() });
    res.status(200).json({ lawyers });
  } catch (error) {
    console.error("Error fetching lawyers by city:", error);
    res.status(500).json({ message: "Failed to fetch lawyers" });
  }
};

// 🔸 Manual: Get lawyers within 50km of selected city
export const getLawyersByCityRadius = async (req, res) => {
  const { city } = req.body;

  if (!city) return res.status(400).json({ message: "City is required" });

  try {
    const coordinates = await getCoordinatesFromCity(city);
    if (!coordinates) return res.status(404).json({ message: "City not found" });

    const lawyers = await Lawyer.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: coordinates
          },
          $maxDistance: 50000 // 50km radius
        }
      }
    });

    res.status(200).json({ lawyers });
  } catch (error) {
    console.error("Error fetching lawyers by radius:", error);
    res.status(500).json({ message: "Failed to fetch lawyers near selected city" });
  }
};
