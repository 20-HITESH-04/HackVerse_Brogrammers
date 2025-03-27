import json
import os
from ultralytics import YOLO
from collections import Counter

class VehicleDamageEstimator:
    def __init__(self, model_path):
        self.model = YOLO(model_path)
        with open('car_parts_prices.json', 'r') as file:
            self.car_parts_prices = json.load(file)
            self.normalized_prices = {
                brand.lower(): {
                    model.lower(): {
                        part.lower(): price 
                        for part, price in parts.items()
                    } 
                    for model, parts in models.items()
                } 
                for brand, models in self.car_parts_prices.items()
            }
        
        self.class_names = ['Bonnet', 'Bumper', 'Dickey', 'Door', 'Fender', 'Light', 'Windshield']
        
        # Define critical parts (more severe damage)
        self.critical_parts = ['windshield', 'light']
        
        # Vehicle base values (for severity calculation)
        self.vehicle_values = {
            'toyota': {'camry': 25000, 'corolla': 20000, 'rav4': 30000},
            'honda': {'accord': 28000, 'civic': 22000, 'cr-v': 32000}
            # Add more makes/models as needed
        }

    def detect_damage(self, image_path):
        """
        Detect vehicle damage using YOLO model
        
        :param image_path: Path to the input image
        :return: Dictionary of detected damage parts and their counts
        """
        # Perform object detection
        result = self.model(image_path)
        detected_objects = result[0].boxes
        
        # Count detected parts
        class_ids = [box.cls.item() for box in detected_objects]
        class_counts = Counter(class_ids)
        
        # Save detected image
        detected_image_path = os.path.join('static', 'detected_image.jpg')
        result[0].save(detected_image_path)
        
        return class_counts

    def get_part_prices(self, car_brand, car_model, class_counts):
        prices = {}
        total_repair_cost = 0
        missing_parts = []
        critical_damage_count = 0
        
        brand_lower = car_brand.strip().lower()
        model_lower = car_model.strip().lower()
        
        if brand_lower not in self.normalized_prices:
            raise ValueError(f"Brand '{car_brand}' not found")
        if model_lower not in self.normalized_prices[brand_lower]:
            raise ValueError(f"Model '{car_model}' not found")
        
        for class_id, count in class_counts.items():
            part_name = self.class_names[int(class_id)]
            part_lower = part_name.lower()
            
            matching_part = None
            for p in self.normalized_prices[brand_lower][model_lower]:
                if p.lower() == part_lower:
                    matching_part = p
                    break
            
            if matching_part:
                price_per_part = self.normalized_prices[brand_lower][model_lower][matching_part]
                total_part_cost = price_per_part * count
                
                prices[part_name] = {
                    'count': count, 
                    'price_per_part': price_per_part,
                    'total_part_cost': total_part_cost,
                    'is_critical': part_lower in self.critical_parts
                }
                
                total_repair_cost += total_part_cost
                if part_lower in self.critical_parts:
                    critical_damage_count += count
            else:
                missing_parts.append(part_name)
        
        # Calculate severity
        severity = self._calculate_severity(
            total_repair_cost=total_repair_cost,
            critical_count=critical_damage_count,
            total_damage_count=sum(class_counts.values()),
            brand=brand_lower,
            model=model_lower
        )
        
        return {
            'parts_breakdown': prices,
            'total_repair_cost': total_repair_cost,
            'missing_parts': missing_parts,
            'severity': severity
        }

    def _calculate_severity(self, total_repair_cost, critical_count, total_damage_count, brand, model):
        """Determine damage severity based on multiple factors"""
        try:
            vehicle_value = self.vehicle_values[brand][model]
            cost_ratio = total_repair_cost / vehicle_value
            
            # Severity rules
            if (cost_ratio > 0.3) or (critical_count >= 2):
                return "severe"
            elif (cost_ratio > 0.15) or (critical_count >= 1) or (total_damage_count >= 3):
                return "normal"
            else:
                return "minor"
        except KeyError:
            # Fallback if vehicle value not found
            if total_repair_cost > 5000 or critical_count >= 2:
                return "severe"
            elif total_repair_cost > 2000 or critical_count >= 1:
                return "normal"
            else:
                return "minor"
    def estimate_damage(self, image_path, car_brand, car_model):
        """
        Complete damage estimation process
        
        :param image_path: Path to the input image
        :param car_brand: Brand of the car
        :param car_model: Model of the car
        :return: Comprehensive damage estimation report
        """
        # Detect damage
        class_counts = self.detect_damage(image_path)
        
        # Calculate prices
        price_estimation = self.get_part_prices(car_brand, car_model, class_counts)
        
        return {
            'detected_parts': {self.class_names[int(k)]: v for k, v in class_counts.items()},
            'repair_estimate': price_estimation
        }

# Example usage
if __name__ == '__main__':
    # Initialize the estimator
    estimator = VehicleDamageEstimator("models/best.pt")
    
    # Example estimation
    result = estimator.estimate_damage(
        image_path='path/to/vehicle/image.jpg', 
        car_brand='Toyota', 
        car_model='Camry'
    )
    
    # Print the results
    print(json.dumps(result, indent=2))