import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from "react-accessible-accordion"
import './forecast.css'

const Week_Days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday', 'Saturday', 'Sunday']

const Forecast = (data) => {

    const dayInAWeek = new Date().getDate(); //getting current day of the week
    //slicing day of the week from current day to total no. of day in week and concating it to total day in week
    const forecastDays = Week_Days.slice(dayInAWeek, Week_Days.length).concat(Week_Days.slice(0, dayInAWeek))

    console.log(forecastDays);

    return (
        <>
            <label className="title">Daily</label>
            <Accordion allowZeroExpanded>
                {data?.data?.list.splice(0, 7).map((item, idx) => (
                    <AccordionItem key={idx}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <div className="daily-item">
                                    <img alt="weather" className="icon-name" src={`icons/${item.weather[0].icon}.png`} />
                                    <label className="day">{forecastDays[idx]}</label>
                                    <label className="description">{item.weather[0].description}</label>
                                    <label className="min-max">{Math.round(item.main.temp_min)}°C/{Math.round(item.main.temp_max)}°C</label>
                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className="Daily-details-grid">
                                <div className="daily-details-grid-items">
                                     <label>Pressure</label>
                                     <label>{item.main.pressure}hpa</label>
                                </div>
                                <div className="daily-details-grid-items">
                                     <label>Humidity</label>
                                     <label>{item.main.humidity}%</label>
                                </div>
                                <div className="daily-details-grid-items">
                                     <label>Clouds</label>
                                     <label>{item.clouds.all}%</label>
                                </div>
                                <div className="daily-details-grid-items">
                                     <label>Wind speed</label>
                                     <label>{item.wind.speed} m/s</label>
                                </div>
                                <div className="daily-details-grid-items">
                                     <label>Feels like</label>
                                     <label>{Math.round(item.main.feels_like)}°C</label>
                                </div>
                            </div>
                        </AccordionItemPanel>
                    </AccordionItem>

                ))}
            </Accordion>
        </>
    )
}

export default Forecast