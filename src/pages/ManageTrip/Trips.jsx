import React, { useState } from 'react';
import Mapbox from '../../components/Mapbox/Mapbox';
import { useTripStyles } from './TripStyles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box, Button, FormControl, Icon, IconButton } from '@mui/material';

import BodyListContentMap from '../../components/BodyContentMap/BodyListContentMap';
import BodyDetailMap from '../../components/BodyContentMap/BodyDetailMap';
const Trips = () => {
  const styles = useTripStyles();
  const [showDetail, setShowDetail] = useState(false);
  const [checked, setChecked] = useState({
    station: true,
    route: true,
  });
  const handleChangeCheckBox = (event) => {
    setChecked({
      ...checked,
      [event.target.name]: event.target.checked,
    });
  };
  const { station, route } = checked;
  return (
    <div className={styles.tripWrap}>
      <div className={styles.boxHeader}>
        <Box pl={2} pt={1.5}>
          <FormControl component='fieldset' variant='standard'>
            <FormGroup>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      name='station'
                      checked={station}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label='Trạm xe buýt'
                />
                <IconButton>
                  <Icon color='primary'>add_circle</Icon>
                </IconButton>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      name='route'
                      checked={route}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label='Tuyến xe buýt'
                />
                <IconButton>
                  <Icon color='primary'>add_circle</Icon>
                </IconButton>
              </div>
            </FormGroup>
          </FormControl>
        </Box>
      </div>
      {showDetail ? (
        <BodyListContentMap setShowDetail={setShowDetail} />
      ) : (
        <BodyDetailMap setShowDetail={setShowDetail} />
      )}
      <Mapbox />
    </div>
  );
};

export default Trips;
