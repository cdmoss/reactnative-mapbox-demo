# reactnative-mapbox-demo
A super basic implementation of mapbox in react-native using https://github.com/react-native-mapbox-gl/maps

Consumes an django rest API hosted on http://chasemossing.com:8000/api/places using djangorestframework's default viewset config.

- Short press on the map to add a temporary point that gets flushed when the app reloads.
- Long press on the map to add a detailed point to the api's database

Touch any existing point to see details or delete it.
