from flask import Flask, jsonify
from surf.location import Location
from surf.buoystation import BuoyStation
from surf.wavemodel import us_west_coast_gfs_wave_model
from surf.wavemodel import global_gfs_wave_model
from surf.buoydata import BuoyData
from surf.tools import simple_serialize, dump_json
from surf.units import Units
from surf.buoyspectra import BuoySpectra
from surf.buoydata import merge_wave_weather_data
import json

locations = {
    'scripps': {'location': Location(32.868, -117.267, altitude=30.0, name='Scripps Pier'), 'buoy': '46254', 'depth': 46.0},
    'imperial': {'location': Location(32.570, -117.169, altitude=30.0, name='Imperial Beach'), 'buoy': '46235', 'depth': 21.0},
    'torrey_pines': {'location': Location(32.930, -117.274, altitude=30.0, name='Torrey Pines'), 'buoy': '46273', 'depth': 20.0},
    'del_mar': {'location': Location(32.957, -117.279, altitude=30.0, name='Del Mar'), 'buoy': '46266', 'depth': 17.0},
    'encinitas': {'location': Location(33.062, -117.314, altitude=30.0, name='Encinitas'), 'buoy': '46274', 'depth': 17.0},
    'oceanside': {'location': Location(33.220, -117.439, altitude=30.0, name='Oceanside'), 'buoy': '46242', 'depth': 20.0},
}

app = Flask(__name__)

@app.route("/api/p/forecast/<location>")
def forecast(location):
    try:
        wave_location = locations[location]['location']
        wave_location.depth = locations[location]['depth']
        wave_model = global_gfs_wave_model()
        buoy = BuoyStation(locations[location]['buoy'], wave_location)

        data = buoy.fetch_wave_forecast_bulletin(wave_model)

        for dat in data:
            dat.solve_breaking_wave_heights(wave_location)
            dat.change_units(Units.english)

        summary = [{'time': x.date, 'height': x.wave_summary.wave_height} for x in data]
        return jsonify(summary)
    except:
        return jsonify({'error': 'No data available'})

@app.route("/api/p/current/<location>")
def current(location):
    try:
        wave_location = locations[location]['location']
        wave_location.depth = locations[location]['depth']
        buoy = BuoyStation(locations[location]['buoy'], wave_location)

        data = buoy.fetch_latest_reading()
        if data:
            data.change_units(Units.english)
            summary = {
                'height': data.wave_summary.wave_height,
                'period': data.wave_summary.period,
                'direction': data.wave_summary.compass_direction,
                'water_temperature': data.water_temperature,
            }
            return jsonify(summary)
        return jsonify({'error': 'No data available'})
    except:
        return jsonify({'error': 'No data available'})
