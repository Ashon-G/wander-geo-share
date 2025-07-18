
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin } from 'lucide-react';

interface MapboxMapProps {
  onLocationSelect?: (coordinates: [number, number]) => void;
  markers?: Array<{
    id: string;
    coordinates: [number, number];
    title: string;
    imageUrl?: string;
  }>;
}

const MapboxMap: React.FC<MapboxMapProps> = ({ onLocationSelect, markers = [] }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Set the Mapbox access token
    mapboxgl.accessToken = 'pk.eyJ1IjoiYXNob25nIiwiYSI6ImNtNW9oZ2dwbzBvNXYyanE2bWN3cXJnengifQ.Mes_K-zB-JyYwF3LKzRcng';
    
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords: [number, number] = [position.coords.longitude, position.coords.latitude];
          setUserLocation(coords);
          initializeMap(coords);
        },
        (error) => {
          console.log('Geolocation error:', error);
          // Default to San Francisco if geolocation fails
          const defaultCoords: [number, number] = [-122.4194, 37.7749];
          setUserLocation(defaultCoords);
          initializeMap(defaultCoords);
        }
      );
    } else {
      // Default location if geolocation is not supported
      const defaultCoords: [number, number] = [-122.4194, 37.7749];
      setUserLocation(defaultCoords);
      initializeMap(defaultCoords);
    }

    function initializeMap(center: [number, number]) {
      if (!mapContainer.current) return;

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: center,
        zoom: 12,
        pitch: 0,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      // Add geolocate control
      const geolocateControl = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
      });
      map.current.addControl(geolocateControl, 'top-right');

      // Add click handler for location selection
      if (onLocationSelect) {
        map.current.on('click', (e) => {
          const coordinates: [number, number] = [e.lngLat.lng, e.lngLat.lat];
          onLocationSelect(coordinates);
          
          // Add temporary marker
          const marker = new mapboxgl.Marker({ color: '#3b82f6' })
            .setLngLat(coordinates)
            .addTo(map.current!);
          
          // Remove marker after 3 seconds
          setTimeout(() => {
            marker.remove();
          }, 3000);
        });
      }

      // Add markers for photos
      markers.forEach((marker) => {
        const markerElement = document.createElement('div');
        markerElement.className = 'custom-marker';
        markerElement.style.cssText = `
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: white;
          border: 3px solid #3b82f6;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        `;
        
        if (marker.imageUrl) {
          markerElement.style.backgroundImage = `url(${marker.imageUrl})`;
          markerElement.style.backgroundSize = 'cover';
          markerElement.style.backgroundPosition = 'center';
        } else {
          const icon = document.createElement('div');
          icon.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>';
          markerElement.appendChild(icon);
        }

        const popup = new mapboxgl.Popup({ offset: 25 })
          .setHTML(`<div class="p-2"><strong>${marker.title}</strong></div>`);

        new mapboxgl.Marker(markerElement)
          .setLngLat(marker.coordinates)
          .setPopup(popup)
          .addTo(map.current!);
      });
    }

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [onLocationSelect, markers]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
      {!userLocation && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg">
          <div className="text-center">
            <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2 animate-pulse" />
            <p className="text-muted-foreground">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapboxMap;
