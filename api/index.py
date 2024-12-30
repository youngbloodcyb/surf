from flask import Flask, jsonify
from surf.location import Location
from surf.buoystation import BuoyStation
from surf.wavemodel import us_west_coast_gfs_wave_model
from surf.buoydata import BuoyData
from surf.tools import simple_serialize, dump_json
from surf.weatherapi import WeatherApi
from surf.units import Units
from surf.buoyspectra import BuoySpectra
from surf.buoydata import merge_wave_weather_data
import json

app = Flask(__name__)

@app.route("/api/p/python")
def hello_world():
    ri_wave_location = Location(32.868, -117.267, altitude=30.0, name='Scripps Pier')
    ri_wave_location.depth = 46.0
    # ri_wave_location.angle = 145.0
    # ri_wave_location.slope = 0.02
    atlantic_wave_model = us_west_coast_gfs_wave_model()
    block_island_buoy = BuoyStation('46254', ri_wave_location)

    print('Fetching GFS Wave Data')
    data = block_island_buoy.fetch_wave_forecast_bulletin(atlantic_wave_model)

    print('Fetching local weather data')
    ri_wind_location = Location(32.868, -117.267, altitude=0.0, name='Scripps Pier')
    weather_data = WeatherApi.fetch_hourly_forecast(ri_wind_location)
    merge_wave_weather_data(data, weather_data)

    print('Solving Breaking Wave Heights')
    for dat in data:
        dat.solve_breaking_wave_heights(ri_wave_location)
        dat.change_units(Units.english)
    json_data = dump_json(data)
    with open('forecast.json', 'w') as outfile:
        outfile.write(json_data)

    maxs = [x.maximum_breaking_height for x in data]
    mins = [x.minimum_breaking_height for x in data]
    summary = [x.wave_summary.wave_height for x in data]
    
    return json.loads(json_data)