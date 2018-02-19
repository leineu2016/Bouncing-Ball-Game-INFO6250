//service call to retrieve the score of a specific user
export const getScores = (name) => {
  return fetch(`http://localhost:8000/data?name=${name}`)
    .then( (response) => { 
      return response.json(); 
    })
    .catch( (e) => { 
      console.log(`failed to reach server: ${e}`); 
    });
};
//service call to retrieve the three users whose scores are in top 3
export const getScoresRanked = (name) => {
  return fetch('http://localhost:8000/data/ranked')
    .then( (response) => { 
      return response.json(); 
    })
    .catch( (e) => { 
      console.log(`failed to reach server: ${e}`); 
    });
};
//service call to create a user name with score into database
export const createUser = (name) => {
  return fetch('http://localhost:8000/data', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(name)
  })
    .then( (response) => {
      return response.json();
    })
    .catch( (error) => {
      console.log('failed to load', error);
    });
};
//service call to update the score for a specific user name
export const updateScores = (data) => {
  return fetch('http://localhost:8000/data', {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify( data )
  })
    .then( (response) => {
      return response.json();
    })
    .catch( (error) => {
      console.log('failed to load', error);
    });
};

