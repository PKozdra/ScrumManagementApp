import React, { useEffect, useState } from "react";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import DatePicker from 'react-date-picker';

function DatePickers(props) {
  const [value, onChange] = useState([new Date()]);

  return (
    <div>
      <DatePicker
        onChange={(value) => {
          onChange(value);
          props.onChange(value);
        }}
        value={value}
        minDate={new Date()}
        format="dd/MM/yyyy"
      />
    </div>
  );
}

export default DatePickers;
