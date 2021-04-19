# reactnative-mapbox-demo
A super basic implementation of mapbox using react native

Consumes an django rest API hosted on http://chasemossing.com:8000/api/places using djangorestframework's default viewset config.

- Short press will add a temporary point that gets flushed when the app reloads.
- Long press will prompt you to either add a temp point or add a detailed point to the api's database

Touch any existing point to see details or delete it.
