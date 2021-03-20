let googleMap
let myPlaces = []

export const init = ()  => {
  googleMap = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 0, lng: 0 },
    zoom: 3
  })
  googleMap.markerList = []
  googleMap.addListener('click', addPlace)
  const placesFromLocalstorage = JSON.parse(localStorage.getItem('myPlaces'))
  // localStorage에 뭔가 있으면 현재 장소 리스트로 설정한다
  if (Array.isArray(placesFromLocalstorage)) {
    myPlaces = placesFromLocalstorage
    renderMarkers()
  }
}

function addPlace (event) {
  myPlaces.push({
    position: event.latLng
  })
  // 마커가 추가되면 랜더링하면서 localStorage와 동기화한다
  localStorage.setItem('myPlaces', JSON.stringify(myPlaces))
  renderMarkers()
}

function renderMarkers () {
  googleMap.markerList.forEach(m => m.setMap(null)) // 모든 마커 제거
  googleMap.markerList = []
  // myPlaces 배열의 요소를 기반으로 마커를 추가한다
  myPlaces.forEach(place => {
    const marker = new google.maps.Marker({
      position: place.position,
      map: googleMap
    })
    googleMap.markerList.push(marker)
  })
}

init()
