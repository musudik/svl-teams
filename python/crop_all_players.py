import os
from PIL import Image

# Define the input and output directories
input_dir = "assets/images/players"
output_dir = "assets/images/players/dp"

# Define the bounding box for the face (left, upper, right, lower)
left = 15
upper = 140  # Final user-provided value
right = 90
lower = 290

# Create output directory if it doesn't exist
os.makedirs(output_dir, exist_ok=True)

# Get all jpg files from the input directory
image_files = [f for f in os.listdir(input_dir) if f.lower().endswith('.jpg') and not f.endswith('_cropped.jpg')]

print(f"Found {len(image_files)} images to crop")

# Process each image
for image_file in image_files:
    try:
        # Define input and output paths
        input_path = os.path.join(input_dir, image_file)
        output_path = os.path.join(output_dir, image_file)
        
        # Open the image
        img = Image.open(input_path)
        
        # Crop the image
        cropped_img = img.crop((left, upper, right, lower))
        
        # Save the cropped image
        cropped_img.save(output_path)
        
        print(f"Cropped: {image_file}")
        
    except Exception as e:
        print(f"Error processing {image_file}: {e}")

print(f"\nAll images cropped and saved to {output_dir}") 