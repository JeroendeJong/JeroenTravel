

# TODO

**Day 1:**

- Map shall react to UI behaviour more appropriatley
-- Scrolling through a trip shall update the map position to the corresponding trip_segment geometries in the centre of the current scroll view port. 
-- Map shall resize accordingly to the different screen UI positions.

- ensure switching flight -> travel -> flight cleans up before the change happens ensure proper isolation between "app modes"

**Day 2:**

- Service Worker to add push notification abilities. on a new "trip segment publish event"

- Lazy mode: Only show images and ensure a "TLDR" version of my travel journey exists. 
-- This would be a button on the trip detail page that reformats the view in such a way that images and the map take the space. 
-- Small descriptions would exist with a picture to provide some form of context. 
-- Though the focus will be around images and not text. 

**Day 3:**

- CMS to manage stories and images in a neat way. This shall be an app on my phone that i can use to
-- Create new trip segments (geometry, photos, description, etc.)
-- Create new trips
-- Edit existing trips and trip segments.