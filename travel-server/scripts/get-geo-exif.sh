lat=$(mdls $1 | grep Latitude | awk '{print $3}')
long=$(mdls $1 | grep Longitude | awk '{print $3}')

echo latitude: $lat
echo longitude: $long