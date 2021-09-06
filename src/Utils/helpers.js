		
class Helpers{
  constructor() {
    
  }  

  /*
  * Validate if an object is empty
  * @param {Object} data.
  * @param {Object} res.
  */
  isEmpty(data, res) {
    if(data === undefined || data.length === 0){
      return null;
    }else{
      return data;
    }
  }

  /*
  * Validate an incoming data properties
  * @param {Object} data.
  */
  validateTrailData(data) {
    if (!data.name.length) {
      return { status: false, err: 'Please insert a trail name' };
    }
  
    if (!data.description.length) { 
      return { status: false, err: 'Please insert a trail description' };
    }
  
    if (!data.latitude.length) { 
      return { status: false, err: 'Please insert a trail latitude' };
    }
  
    if (!data.longitude.length) { 
      return { status: false, err: 'Please insert a trail longitude' };
    }

    if (!data.difficulty.length) { 
      return { status: false, err: 'Please insert a trail difficulty' };
    }

    if (!data.lengthRate.length) { 
      return { status: false, err: 'Please insert a trail length' };
    }

    if (!data.rating.length) { 
      return { status: false, err: 'Please insert a trail rating number' };
    }
  
    return { status: true, err: '' };
  }

  /*
    * Return a response to the client
    * @param {Object} data.
    * @param {Object} res.
    */
  apiSendData(data, res) {
    res.status(200).json({
      'status': data.status, 
      'message': data.message,
      'data': data.data,
      'error': data.error,
    });
  }

}

module.exports = new Helpers();
