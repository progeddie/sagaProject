import React, { useEffect, useRef } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const MaterialAlert = (object: any) => {
  const { type } = object;
  const { text } = object;
  const { text2 } = object;
  const { text3 } = object;
  const { text4 } = object;
  const { text5 } = object;
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        width: '98%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
      },
    })
  );

  const classes = useStyles();
  const cType = type || 'error';
  const cText =
    text ||
    '텍스트를 입력하세요. ex) text="첫줄" text2="두번째줄~다섯번째줄까지" type="error / warning / info / success"';
  // error / warning / info / success
  const cText2 = text2 || '';
  const cText3 = text3 || '';
  const cText4 = text4 || '';
  const cText5 = text5 || '';

  return (
    <div className={classes.root}>
      <Alert severity={cType} style={{ fontSize: '16px', fontWeight: 'bold' }}>
        <div>{cText}</div>
        <div>{cText2}</div>
        <div>{cText3}</div>
        <div>{cText4}</div>
        <div>{cText5}</div>
      </Alert>
    </div>
  );
};

export default MaterialAlert;
