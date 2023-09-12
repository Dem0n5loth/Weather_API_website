import { useState } from "react";
import{AsyncPaginate} from "react-select-async-paginate"
import { GEO_API_URL,geoApiOptions } from "../../api";

const Search= ({onSearchChange})=>{
    
    const [search, setSearch]= useState(null);  //state variable

    //Part3 --City api
    const loadOptions = (inputValue) => {
        const timestamp= Date.now();
        return fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}&timestamp=${timestamp}`, geoApiOptions)
        .then(response => response.json())
        .then(response => {
            return {
                options: response.data.map((city)=>{
                    return{
                        value: `${city.latitude} ${city.longitude}`,   //latitude and logintude are very important parameters cause weather api take it as input
                        label: `${city.name}, ${city.countryCode}`,
                    }
                })
            }
        })
        .catch(err=> console.error(err));
    }

    //2) Part
    const handleOnChange= (searchData) => {  //whatever we wrote in search bar ,will be stored in searchData
        setSearch(searchData);        //setting search state value as searchData
        onSearchChange(searchData);   //passing searchdata in ononSearchChange method which we took as prop from App.jsx and it will be called there
    }
    
    //1) Part
    // our search bar layout
    return(
        <AsyncPaginate            //feature of async paginate package
          placeholder="Search for city"
          debounceTimeout={600}
          value={search}             //this will have value of search state variable    
          onChange={handleOnChange}   //when we write anything in search bar it will call handleOnChange which sets value of state variable search
          loadOptions={loadOptions}
        />
    )
}

export default Search;