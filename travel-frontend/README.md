

# TODO

**Day 1:**

- Map shall react to UI behaviour more appropriatley
-- Scrolling through a trip shall update the map position to the corresponding trip_segment geometries in the centre of the current scroll view port. 
-- Map shall resize accordingly to the different screen UI positions.

- ensure switching flight -> travel -> flight cleans up before the change happens ensure proper isolation between "app modes"

- ensure hover does not get triggered on a the phone. 

- CONTENT CONTENT CONTENT

- Header on topbar instead of top content on scroll fix. 
-- Current what happens is that the header will appear on the scrollbar if the header is outside the viewport. 
-- This causes issues because the content is often not at the top of the viewpoert meaning it will not be visible for quite a while.

- Better experience on mobile
-- Scroll bounce where possible
-- draggable window if possible
-- An icon shall exist that can be used for a PWA app. 

- Refactor React Hierarchy to be inline with React Router. Essentially a refresh should mean we are on the same page still. The intention is that when i am in a trip segment description page a refresh should show me the same description. 

- On trip click one will see the exact geometry data attached to this view. The map shall zoom in to this area, though it should provide enough context around it. 

**Day 2:**

- Service Worker to add push notification abilities. on a new "trip segment publish event"

- Lazy mode: Only show images and ensure a "TLDR" version of my travel journey exists. 
-- This would be a button on the trip detail page that reformats the view in such a way that images and the map take the space. 
-- Small descriptions would exist with a picture to provide some form of context. 
-- Though the focus will be around images and not text. 

- Research: Getting GPS data from photos and adding this to the mapview. 

**Day 3:**

- CMS to manage stories and images in a neat way. This shall be an app on my phone that i can use to
-- Create new trip segments (geometry, photos, description, etc.)
-- Create new trips
-- Edit existing trips and trip segments.