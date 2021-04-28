



// form 

const watherForm = document.querySelector('form')
const search = document.querySelector('input')
const mag1 = document.querySelector('#para-1')
const locationSec = document.querySelector('#location')
const main = document.querySelector('#main')
const description = document.querySelector('#description')
const temp = document.querySelector('#temp')
const temp_min = document.querySelector('#temp_min')
const temp_max = document.querySelector('#temp_max')
const feels_like= document.querySelector('#feels_like')
const pressure= document.querySelector('#pressure')
const humidity= document.querySelector('#humidity')
const speed= document.querySelector('#speed')
const deg= document.querySelector('#deg')
const all= document.querySelector('#all')
const country= document.querySelector('#country')
const notFound= document.querySelector('#notFound')

// table hide show 
const x = document.querySelector('#dataSections')











watherForm.addEventListener('submit', (e) => {

    e.preventDefault()


 

    const location = search.value
    mag1.textContent="Loading..."

    fetch('/weather?location=' + location).then((response) => {

        response.json().then((data) => {

            if (data.error) {
                // console.log("You must provide a location")
                mag1.textContent = data.error
                x.style.display = "none";
            }
            else {
                if(data.wather.cod=="404")
                {
                    x.style.display = "none";
                     mag1.textContent = ""
                     notFound.textContent = (data.wather.message)
                }

              else
              {

          
                x.style.display = "block";
                mag1.textContent = ""
                notFound.textContent =""
                locationSec.textContent = "Location : " + location
                main.textContent =data.wather.weather[0].main
                description.textContent = "Description : "+ data.wather.weather[0].description
                temp.textContent = (data.wather.main.temp - 273).toFixed(2)+" °C"
                temp_min.textContent = (data.wather.main.temp_min - 273).toFixed(2)+" °C"
                temp_max.textContent = (data.wather.main.temp_max - 273).toFixed(2)+" °C"
                feels_like.textContent = (data.wather.main.feels_like - 273).toFixed(2)+" °C"
                pressure.textContent = (data.wather.main.pressure)+" hPa"
                humidity.textContent = (data.wather.main.humidity)+"%"
                speed.textContent = (data.wather.wind.speed)+"m/s"
                deg.textContent = (data.wather.wind.deg)+"°"
                all.textContent = (data.wather.clouds.all)+"%"
                country.textContent = (data.wather.sys.country)
               
            }

             










               
            }

        })
    })



})

