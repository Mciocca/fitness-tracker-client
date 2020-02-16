import React from 'react';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper
} from '@material-ui/core';

interface CalorieTable {
  BMR: number,
  TDEE: number,
  goalCalories: number
}

const CalorieTable: React.FC<CalorieTable> = ({ BMR, TDEE, goalCalories}) => {
  return (
    <>
      <Paper>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Your estimated basal metabolic rate</TableCell>
              <TableCell>{BMR}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Your estimated total daily energy expenditure</TableCell>
              <TableCell>{TDEE}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><b>Estimated daily calories for your goal</b></TableCell>
              <TableCell><b>{goalCalories}</b></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </>
  )
}

export default CalorieTable;
