import React, { Component } from 'react'
import Select from 'react-select'

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);


const years = [
  { value: '01', label: 'jan' },
  { value: '02', label: 'feb' },
  { value: '03', label: 'mar' },
  { value: '04', label: 'apr' },
  { value: '05', label: 'may' },
  { value: '06', label: 'jun' },
  { value: '07', label: 'jul' },
  { value: '08', label: 'aug' },
  { value: '09', label: 'sep' },
  { value: '10', label: 'oct' },
  { value: '11', label: 'nov' },
  { value: '12', label: 'dec' },
]

const months = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

var styles = {
  datePicker: { width: '100%' },
  year: { width: 125, marginRight: 16 },
  month: { width: 125 },
  
};

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }


const BulletinPeriodPicker = () => (
  <div>
    <div style={styles.year}>
    <Select options={years} />
    </div>

    <div style={styles.month}>
    <Select options={months} />
    </div>
  </div>
  
)

BulletinPeriodPicker.propTypes = {

  onPickPeriod: _propTypes2.default.func.isRequired
};

export default BulletinPeriodPicker;
