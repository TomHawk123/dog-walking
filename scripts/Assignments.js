import { getPets, getWalkers, getWalkerCities, getCities } from "./database.js"

// Get copy of state for use in this module
const pets = getPets()
const walkers = getWalkers()
const walkerCities = getWalkerCities()
const cities = getCities()

// The function need the walker information, so define a parameter
export const filterWalkerCitiesByWalker = (walker) => {
    // Define an empty array to store all of the assignment objects
    const assignments = []
    // Iterate the array value of walkerCities
    for (const assignment of walkerCities) {
        // Check if the primary key of the walker equals the foreign key on the assignment
        if (assignment.walkerId === walker.id) {
            assignments.push(assignment)
        }
        // If it does, add the current object to the array of assignments
    }
    // After the loop is done, return the assignments array
    return assignments
}



// Define a function that builds a string of city names. Needs a paramter for assignments array.
export const assignedCityNames = (assignmentsArray) => {
    // Define an empty string that will get appended with matching cities
    let cityNames = ""
    // Iterate the array of assignment objects
    for (const assignment of assignmentsArray) {
        // For each assignment, iterate the cities array to find the match
        for (const city of cities) {
            // Add the name of the matching city to the array of city names
            if (city.id === assignment.cityId) {
                if (cityNames === '') {
                    cityNames += `${city.name}`
                } else {
                cityNames += ` and ${city.name}`
                }
            }
        }
        // After the loop is done, return the string
        return cityNames
    }
}


// Function whose responsibility is to find the walker assigned to a pet
const findWalker = (pet, allWalkers) => {
    let petWalker = null

    for (const walker of allWalkers) {
        if (walker.id === pet.walkerId) {
            petWalker = walker
        }
    }

    return petWalker
}

export const Assignments = () => {
    let assignmentHTML = ""
    assignmentHTML += "<ul>"

    for (const currentPet of pets) {
        const currentPetWalker = findWalker(currentPet, walkers)
        const filteredCities = filterWalkerCitiesByWalker(currentPetWalker)
        assignmentHTML += `
            <li>
                ${currentPet.name} is being walked by
                ${currentPetWalker.name} in ${assignedCityNames(filteredCities)}
            </li>
        `
    }

    assignmentHTML += "</ul>"

    return assignmentHTML
}



