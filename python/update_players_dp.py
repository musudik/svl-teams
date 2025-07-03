import json
import os

# Read the current players.json
with open('data/players.json', 'r') as f:
    data = json.load(f)

# Function to update players with dp attribute
def add_dp_attribute(players_list):
    for player in players_list:
        # Get the original image path
        original_image = player.get('image', '')
        
        # Create the dp image path by replacing the directory
        if original_image:
            # Replace 'assets/images/players/' with 'assets/images/players/dp/'
            dp_image = original_image.replace('assets/images/players/', 'assets/images/players/dp/')
            player['dp'] = dp_image
        else:
            player['dp'] = ''

# Update all teams
for team_name, team_data in data['teams'].items():
    if 'players' in team_data:
        add_dp_attribute(team_data['players'])

# Write the updated data back to the file
with open('data/players.json', 'w') as f:
    json.dump(data, f, indent=2)

print("Successfully added 'dp' attribute to all players in players.json")
print("Each player now has a 'dp' field pointing to their cropped face image in the dp folder.") 