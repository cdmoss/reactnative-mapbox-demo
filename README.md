# reactnative-mapbox-demo
A super basic implementation of mapbox in react-native using https://github.com/react-native-mapbox-gl/maps

It is preconfigured to consume a django rest API (https://github.com/cdmoss/django-map-demo) using djangorestframework's default viewset config.

- Short press on the map to add a temporary point that gets flushed when the app reloads.
- Long press on the map to add a detailed point to the api's database

Touch any existing point to see details or delete it.
