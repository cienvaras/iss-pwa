<template>
  <div class="station">
    <div class="map-container">
      <div class="connection-error" v-if="connError">
        <p class="error-message">Unable to update position</p>
        <p class="error-position">Position unknown</p>
      </div>
      <div class="station-coordinates" v-if="!connError">
        <p class="station-latitude">Lat: {{ station.latitude | round(3) }}</p>
        <p class="station-longitude">Lon: {{ station.longitude | round(3) }}</p>
      </div>
      <button @click="updateStationPosition" class="refresh-button">Refresh</button>
      <div id="map" class="map"></div>
    </div>
  </div>
</template>

<script>
import 'd3'
import Datamap from 'datamaps'
import round from 'vue-round-filter'

export default {
  name: 'station',
  filters: {
    round
  },
  data () {
    return {
      connError: false,
      station: {
        longitude: undefined,
        latitude: undefined
      }
    }
  },
  methods: {
    updateStationPosition () {
      console.log('Update ISS position')
      fetch('https://api.wheretheiss.at/v1/satellites/25544').then(response => {
        if (response.status !== 200) {
          if (this.connError) {
            return
          }
          this.connError = true
          console.log('Error getting data from API')
          window.map.bubbles([])
          return
        }
        if (this.connError) {
          this.connError = false
        }
        response.json().then(data => {
          this.station.latitude = data.latitude
          this.station.longitude = data.longitude
        })
      })
    }
  },
  watch: {
    station: {
      handler: function (newVal) {
        let iss = [{
          name: 'ISS',
          radius: 8,
          latitude: newVal.latitude,
          longitude: newVal.longitude,
          fillKey: 'ISS'
        }]
        window.map.bubbles(iss)
      },
      deep: true
    }
  },
  mounted () {
    window.map = new Datamap({
      element: document.getElementById('map'),
      responsive: true,
      geographyConfig: {
        borderWidth: 0,
        popupOnHover: false,
        highlightOnHover: false
      },
      fills: {
        ISS: '#eb6350',
        defaultFill: '#56c0a3'
      }
    })
    // Resize map on window resize.
    window.addEventListener('resize', () => {
      window.map.resize()
    })
    // Get the ISS position using Fetch API.
    this.updateStationPosition()
  }
}
</script>

<style>
.station {
  margin: 15px;
}
.refresh-button {
  background-color: #465f71;
  color: #fff;
  width: 100%;
  padding: 8px 0;
  font-size: 1.6rem;
  border: none;
  outline: none;
}
@media (min-width: 620px) {
  .refresh-button {
    width: 300px;
  }
  .station-coordinates p {
    display: inline-block;
    font-size: 2rem;
  }
  .station-latitude:after {
    content: '/';
    margin-left: 4px;
  }
}
.map-container {
  font-size: 1.6em;
}
.datamap {
  left: 0;
}
</style>
