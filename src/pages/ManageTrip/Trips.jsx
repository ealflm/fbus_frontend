import React from 'react';

import Mapbox from '../../components/mapbox/Mapbox';

// import '../components/trip/trips.css'

const Trips = () => {
  return (
    <div>
      <div className='page-header'>
        <h2>Chuyến xe</h2>

        <div className='row'>
          <div className='col-12'>
            <div className='card'>
              <div className='card__body'>
                <Mapbox />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trips;
