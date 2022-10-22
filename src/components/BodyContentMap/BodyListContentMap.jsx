import { CardContent, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ScrollPanel } from 'primereact/scrollpanel';
import React from 'react';
import { Card } from 'reactstrap';
import { useBodyListStyles } from './BodyListStyles';

export default function BodyListContentMap(props) {
  const { stationList, routerList, setShowDetail } = props;

  const styles = useBodyListStyles();
  return (
    /*stationList ?*/ <div className={styles.boxBodyList}>
      <div className={styles.contentBoxBody}>
        <h4 className={styles.boxBodyTitle}>Danh sách trạm </h4>
        <ScrollPanel
          style={{ width: '100%', height: '100%' }}
          className={styles.scrollBodyContent}
        >
          <Box className={styles.cardBodyList}>
            <Card
              variant='outlined'
              sx={{ display: 'flex' }}
              onClick={() => {
                setShowDetail(false);
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography component='div' variant='h6'>
                    Live From Space
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    color='text.secondary'
                    component='div'
                  >
                    Mac Miller
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Box>
        </ScrollPanel>
      </div>
      <div className={styles.bottomContentBody}></div>
    </div>
  );
  // : (
  //   <div className={styles.boxBodyList}>
  //     <div className={styles.contentBoxBody}>
  //       <h4 className={styles.boxBodyTitle}>Danh sách Tuyến </h4>
  //       <ScrollPanel
  //         style={{ width: '100%', height: '100%' }}
  //         className={styles.scrollBodyContent}
  //       >
  //         <div>
  //           The story begins as Don Vito Corleone, the head of a New York Mafia
  //           family, oversees his daughter's wedding. His beloved son Michael has
  //           just come home from the war, but does not intend to become part of
  //           his father's business. Through Michael's life the nature of the
  //           family business becomes clear. The business of the family is just
  //           like the head of the family, kind and benevolent to those who give
  //           respect, but given to ruthless violence whenever anything stands
  //           against the good of the family. The story begins as Don Vito
  //           Corleone, the head of a New York Mafia family, oversees his
  //           daughter's wedding. His beloved son Michael has just come home from
  //           the war, but does not intend to become part of his father's
  //           business. Through Michael's life the nature of the family business
  //           becomes clear. The business of the family is just like the head of
  //           the family, kind and benevolent to those who give respect, but given
  //           to ruthless violence whenever anything stands against the good of
  //           the family. The story begins as Don Vito Corleone, the head of a New
  //           York Mafia family, oversees his daughter's wedding. His beloved son
  //           Michael has just come home from the war, but does not intend to
  //           become part of his father's business. Through Michael's life the
  //           nature of the family business becomes clear. The business of the
  //           family is just like the head of the family, kind and benevolent to
  //           those who give respect, but given to ruthless violence whenever
  //           anything stands against the good of the family.
  //         </div>
  //       </ScrollPanel>
  //     </div>
  //     <div className={styles.bottomContentBody}></div>
  //   </div>
  // );
}
