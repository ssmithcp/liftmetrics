// consider using library https://moment.github.io/luxon/index.html for timezone handling

const auth = {
  ssmith: {
    id: 'ssmith',
    password: '8y3rhsuhdfbiahsudf',
    lastLogin: new Date(),
    failedLogins: [ ],
    roles: [ 'admin' ],
  }
}

const profile = {
  ssmith: {
    id: 'ssmith',
    email: 'ssmith.cp@gmail.com',
    firstName: 'Scott',
    lastName: 'Smith',
    preferredWorkoutWeightUnits: 'lb',
    preferredFoodWeightUnits: 'oz',
    preferredLegthUnits: 'in',
    timezone: 'America/Denver',
  }
}